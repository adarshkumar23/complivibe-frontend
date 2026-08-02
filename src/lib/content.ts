/**
 * Shared helpers for CMS content compiled in at build time.
 *
 * The generated modules under src/content/ declare their own structurally
 * identical `ContentItem` type, so values from them satisfy this one directly.
 */

export type ContentItem = {
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
};

/** Newest published first; undated items fall to the end, then sort by title. */
export function sortByPublished(
  collection: Record<string, ContentItem>,
): ContentItem[] {
  return Object.values(collection).sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return b.publishedAt.localeCompare(a.publishedAt);
    }
    if (a.publishedAt) return -1;
    if (b.publishedAt) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Fixed en-GB formatting in UTC. The site is a static export, so this runs at
 * build time — pinning locale and timezone keeps output identical regardless of
 * where the build happens.
 */
export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Rounded reading estimate at 200 words per minute, floored at 1. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Flattens markdown to a single plain-text string. Used for structured data
 * (JSON-LD answers), where markup would leak into search results.
 */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Prefers the CMS SEO overrides, falling back to the display fields. */
export function metaFor(item: ContentItem, suffix: string) {
  return {
    title: item.seoTitle ?? `${item.title} | CompliVibe`,
    description:
      item.seoDescription ??
      item.excerpt ??
      `${item.title} — ${suffix}`,
  };
}

// --------------------------------------------------------------------------
// Index-page helpers
// --------------------------------------------------------------------------

/**
 * Everything a card needs and nothing more — crucially, not `body`.
 *
 * The tag filter on the index pages is a client component, so whatever it
 * receives is serialised into the HTML payload. Summarising first keeps full
 * article bodies out of the wire.
 */
export type ContentSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  author: string | null;
  publishedAt: string | null;
  /** Pre-formatted at build time so client components never re-format dates. */
  date: string | null;
  minutes: number;
};

export function toSummary(item: ContentItem): ContentSummary {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    coverImage: item.coverImage,
    tags: item.tags,
    author: item.author,
    publishedAt: item.publishedAt,
    date: formatDate(item.publishedAt),
    minutes: readingMinutes(item.body),
  };
}

/** Every distinct tag, most-used first, then alphabetical for stable output. */
export function collectTags(items: { tags: string[] }[]): string[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

/**
 * Up to `limit` siblings, ranked by shared tags and then by recency. Items with
 * no tag overlap still qualify — a "related" rail that renders empty on a
 * lightly tagged post looks broken, and the next-newest post is a fine answer.
 */
export function relatedTo(
  current: ContentSummary,
  all: ContentSummary[],
  limit = 3,
): ContentSummary[] {
  const currentTags = new Set(current.tags);

  return all
    .filter((item) => item.slug !== current.slug)
    .map((item) => ({
      item,
      shared: item.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        (b.item.publishedAt ?? "").localeCompare(a.item.publishedAt ?? ""),
    )
    .slice(0, limit)
    .map((entry) => entry.item);
}

// --------------------------------------------------------------------------
// Heading anchors
// --------------------------------------------------------------------------

/**
 * The anchor id for a markdown heading. Shared by <Markdown>, which stamps the
 * id onto the rendered element, and the table of contents, which links to it —
 * one function so the two can never drift apart.
 */
export function headingSlug(text: string): string {
  return toPlainText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * The h2/h3 outline of a markdown body, mirroring how <Markdown> maps heading
 * levels (`#` and `##` both render as h2). Fenced code is skipped so a `# ` in
 * a shell snippet never becomes a table-of-contents entry.
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,3})\s+(.*)$/.exec(line);
    if (!match) continue;

    const text = toPlainText(match[2].trim());
    if (!text) continue;

    headings.push({
      id: headingSlug(match[2]),
      text,
      level: match[1].length <= 2 ? 2 : 3,
    });
  }

  return headings;
}
