/**
 * Build-time content fetch from the CompliVibe CMS.
 *
 * This site is `output: "export"` — a pure static build. Content is pulled in
 * ONCE, here, before `next build`, and compiled into the bundle as plain TS
 * modules. Nothing in the browser ever talks to the CMS.
 *
 * Runs via the `prebuild` script, so `npm run build` always regenerates first.
 *
 * Environment:
 *   CMS_API_URL         Base URL including the /cms-api prefix.
 *                       Default: http://127.0.0.1:4000/cms-api
 *                       Deliberately not NEXT_PUBLIC_ — this must never be
 *                       inlined into a client bundle.
 *   CMS_API_TOKEN       Optional bearer token; only needed to preview drafts.
 *   CMS_FETCH_OPTIONAL  "true" => a CMS outage writes empty generated files and
 *                       lets the build continue. Default: fail the build.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const CMS_API_URL = (
  process.env.CMS_API_URL ?? "http://127.0.0.1:4000/cms-api"
).replace(/\/+$/, "");

const CMS_API_TOKEN = process.env.CMS_API_TOKEN;
const FETCH_OPTIONAL = process.env.CMS_FETCH_OPTIONAL === "true";

const PAGE_SIZE = 100;
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;

const PROJECT_ROOT = process.cwd();

// --------------------------------------------------------------------------
// CMS wire format
// --------------------------------------------------------------------------

interface ContentDTO {
  id: string;
  type: "POST" | "ARTICLE" | "FAQ";
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  tags: string[];
  author: string | null;
  status: "DRAFT" | "PUBLISHED";
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ListResponse {
  data: ContentDTO[];
  meta: { total: number; limit: number; offset: number; hasMore: boolean };
}

/** Written into the generated files — internal ids and status are dropped. */
interface GeneratedItem {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  tags: string[];
  author: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

interface Target {
  contentType: ContentDTO["type"];
  /** Name of the exported const in the generated module. */
  exportName: string;
  /** Path relative to the project root. */
  outputPath: string;
}

const TARGETS: Target[] = [
  {
    contentType: "POST",
    exportName: "posts",
    outputPath: "src/content/blog/posts.generated.ts",
  },
  {
    contentType: "ARTICLE",
    exportName: "articles",
    outputPath: "src/content/articles/articles.generated.ts",
  },
  {
    contentType: "FAQ",
    exportName: "faqs",
    outputPath: "src/content/faq/faq.generated.ts",
  },
];

// --------------------------------------------------------------------------
// HTTP
// --------------------------------------------------------------------------

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(CMS_API_TOKEN
            ? { Authorization: `Bearer ${CMS_API_TOKEN}` }
            : {}),
        },
      });

      if (response.ok) {
        return (await response.json()) as T;
      }

      const body = await response.text().catch(() => "");
      const error = new Error(
        `CMS responded ${response.status} ${response.statusText} for ${url}${
          body ? `\n${body.slice(0, 500)}` : ""
        }`,
      );
      // 4xx is a request bug (bad token, bad query) — retrying cannot fix it.
      if (response.status < 500) throw error;
      lastError = error;
    } catch (error) {
      if (error instanceof Error && /^CMS responded 4/.test(error.message)) {
        throw error;
      }
      // Network failure or timeout — worth another attempt.
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }

    if (attempt < MAX_RETRIES) {
      const backoff = 500 * 2 ** (attempt - 1);
      console.warn(
        `  retry ${attempt}/${MAX_RETRIES - 1} in ${backoff}ms — ${
          lastError instanceof Error ? lastError.message : String(lastError)
        }`,
      );
      await sleep(backoff);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Failed to fetch ${url}`);
}

/** Walks the paginated list endpoint until every published row is collected. */
async function fetchAllOfType(
  contentType: ContentDTO["type"],
): Promise<ContentDTO[]> {
  const collected: ContentDTO[] = [];
  let offset = 0;

  for (;;) {
    const params = new URLSearchParams({
      type: contentType,
      status: "PUBLISHED",
      limit: String(PAGE_SIZE),
      offset: String(offset),
    });

    const page = await fetchJson<ListResponse>(
      `${CMS_API_URL}/content?${params.toString()}`,
    );

    collected.push(...page.data);

    if (!page.meta.hasMore || page.data.length === 0) break;
    offset += page.data.length;

    // Guard against a server that always reports hasMore.
    if (collected.length > 10_000) {
      throw new Error(
        `Refusing to fetch more than 10000 ${contentType} items — check CMS pagination`,
      );
    }
  }

  return collected;
}

// --------------------------------------------------------------------------
// Code generation
// --------------------------------------------------------------------------

function toGeneratedItem(item: ContentDTO): GeneratedItem {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    coverImage: item.coverImage,
    tags: item.tags,
    author: item.author,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
  };
}

/**
 * JSON.stringify handles all escaping — including the backticks, `${` and
 * backslashes that appear in markdown code fences and would break a template
 * literal. The output stays valid TS for any body content.
 */
function serializeValue(value: unknown, indentLevel: number): string {
  const pad = "  ".repeat(indentLevel);
  const innerPad = "  ".repeat(indentLevel + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const entries = value
      .map((entry) => `${innerPad}${JSON.stringify(entry)}`)
      .join(",\n");
    return `[\n${entries},\n${pad}]`;
  }

  return JSON.stringify(value);
}

/**
 * Mirrors the convention in src/components/solutions-data.ts: an exported type
 * plus an exported `Record<string, T>` const keyed by slug. A default export is
 * included too, so either import style works.
 */
function renderModule(target: Target, items: ContentDTO[]): string {
  const lines: string[] = [
    "// ---------------------------------------------------------------------",
    "// AUTO-GENERATED by scripts/fetch-content.ts — DO NOT EDIT.",
    "// Source: CompliVibe CMS. Regenerate with `npm run fetch:content`.",
    "// This file is gitignored: it is a build artifact, not source.",
    "// ---------------------------------------------------------------------",
    "",
    "export type ContentItem = {",
    "  slug: string;",
    "  title: string;",
    "  excerpt: string | null;",
    "  body: string;",
    "  coverImage: string | null;",
    "  tags: string[];",
    "  author: string | null;",
    "  seoTitle: string | null;",
    "  seoDescription: string | null;",
    "  publishedAt: string | null;",
    "  updatedAt: string;",
    "};",
    "",
    `export const ${target.exportName}: Record<string, ContentItem> = {`,
  ];

  for (const raw of items) {
    const item = toGeneratedItem(raw);
    lines.push(`  ${JSON.stringify(item.slug)}: {`);
    for (const [key, value] of Object.entries(item)) {
      lines.push(`    ${key}: ${serializeValue(value, 2)},`);
    }
    lines.push("  },");
  }

  lines.push("};", "", `export default ${target.exportName};`, "");

  return lines.join("\n");
}

async function writeTarget(target: Target, items: ContentDTO[]): Promise<void> {
  const absolutePath = join(PROJECT_ROOT, target.outputPath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, renderModule(target, items), "utf8");
  console.log(
    `  ${String(items.length).padStart(3)} ${target.contentType.padEnd(7)} -> ${
      target.outputPath
    }`,
  );
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log(`Fetching content from ${CMS_API_URL}`);
  if (CMS_API_TOKEN) {
    console.log("  (authenticated — drafts may be included)");
  }

  try {
    // Sequential rather than parallel: three requests against a single-instance
    // CMS, and sequential failure output is far easier to read in CI logs.
    for (const target of TARGETS) {
      const items = await fetchAllOfType(target.contentType);
      await writeTarget(target, items);
    }
    console.log("Content fetch complete.");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (!FETCH_OPTIONAL) {
      console.error(`\nContent fetch failed: ${message}`);
      console.error(
        "The static export would ship with stale or missing content, so the build is being stopped.",
      );
      console.error(
        "Set CMS_FETCH_OPTIONAL=true to build with empty content instead.",
      );
      process.exit(1);
    }

    console.warn(`\nContent fetch failed: ${message}`);
    console.warn(
      "CMS_FETCH_OPTIONAL is set — writing empty content files so the build can continue.",
    );
    for (const target of TARGETS) {
      await writeTarget(target, []);
    }
  }
}

void main();
