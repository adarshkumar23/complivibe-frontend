import React from "react";
import Link from "next/link";
import { headingSlug } from "@/lib/content";

/**
 * Minimal markdown renderer for CMS body content.
 *
 * A server component that builds JSX directly — no `dangerouslySetInnerHTML`,
 * no runtime markdown dependency, and nothing shipped to the browser. Supports
 * the subset the CMS actually authors: headings, paragraphs, ordered and
 * unordered lists, tables, blockquotes, fenced code, rules, and the inline
 * marks bold / italic / code / link.
 */

type InlineKey = string;

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string, keyPrefix: InlineKey): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const segments = text.split(INLINE_PATTERN);

  segments.forEach((segment, index) => {
    if (!segment) return;
    const key = `${keyPrefix}-${index}`;

    if (segment.startsWith("**") && segment.endsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-[var(--cv-ink)]">
          {segment.slice(2, -2)}
        </strong>,
      );
      return;
    }

    if (segment.startsWith("`") && segment.endsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded-md border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--cv-ink)]"
        >
          {segment.slice(1, -1)}
        </code>,
      );
      return;
    }

    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(segment);
    if (link) {
      const [, label, href] = link;
      const isInternal = href.startsWith("/");
      const className =
        "font-medium text-[#2563eb] underline underline-offset-4 transition-colors hover:text-[#1d4ed8] dark:text-[#3b82f6]";

      nodes.push(
        isInternal ? (
          <Link key={key} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a
            key={key}
            href={href}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ),
      );
      return;
    }

    // Single-asterisk emphasis is checked last so it cannot swallow bold.
    if (
      segment.startsWith("*") &&
      segment.endsWith("*") &&
      segment.length > 2
    ) {
      nodes.push(
        <em key={key} className="italic">
          {segment.slice(1, -1)}
        </em>,
      );
      return;
    }

    nodes.push(<React.Fragment key={key}>{segment}</React.Fragment>);
  });

  return nodes;
}

function splitRow(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

const isTableDivider = (line: string): boolean =>
  /^\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes("-");

export default function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let cursor = 0;

  const push = (node: React.ReactNode) => blocks.push(node);

  while (cursor < lines.length) {
    const line = lines[cursor];

    // Blank line — block separator.
    if (!line.trim()) {
      cursor += 1;
      continue;
    }

    // Fenced code block.
    if (line.trimStart().startsWith("```")) {
      const language = line.trim().slice(3).trim();
      const body: string[] = [];
      cursor += 1;
      while (cursor < lines.length && !lines[cursor].trimStart().startsWith("```")) {
        body.push(lines[cursor]);
        cursor += 1;
      }
      cursor += 1; // closing fence
      push(
        <pre
          key={`code-${cursor}`}
          className="my-6 overflow-x-auto rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4"
        >
          <code
            className="font-mono text-[13px] leading-relaxed text-[var(--cv-ink)]"
            data-language={language || undefined}
          >
            {body.join("\n")}
          </code>
        </pre>,
      );
      continue;
    }

    // Heading.
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const key = `h-${cursor}`;
      // Anchor ids come from the same helper the table of contents links to.
      const id = headingSlug(text) || undefined;

      if (level <= 2) {
        push(
          <h2
            key={key}
            id={id}
            className="mt-12 mb-4 scroll-mt-28 text-[1.6rem] font-bold tracking-tight text-[var(--cv-ink)] md:text-[1.85rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {renderInline(text, key)}
          </h2>,
        );
      } else if (level === 3) {
        push(
          <h3
            key={key}
            id={id}
            className="mt-9 mb-3 scroll-mt-28 text-[1.2rem] font-bold tracking-tight text-[var(--cv-ink)]"
          >
            {renderInline(text, key)}
          </h3>,
        );
      } else {
        push(
          <h4
            key={key}
            className="mt-7 mb-2 text-[1rem] font-semibold tracking-tight text-[var(--cv-ink)]"
          >
            {renderInline(text, key)}
          </h4>,
        );
      }
      cursor += 1;
      continue;
    }

    // Horizontal rule.
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      push(
        <hr
          key={`hr-${cursor}`}
          className="my-10 border-0 border-t border-[var(--cv-border)]"
        />,
      );
      cursor += 1;
      continue;
    }

    // Table — header row followed by a divider row.
    if (
      line.trim().startsWith("|") &&
      cursor + 1 < lines.length &&
      isTableDivider(lines[cursor + 1])
    ) {
      const headers = splitRow(line);
      cursor += 2;
      const rows: string[][] = [];
      while (cursor < lines.length && lines[cursor].trim().startsWith("|")) {
        rows.push(splitRow(lines[cursor]));
        cursor += 1;
      }

      push(
        <div
          key={`table-${cursor}`}
          className="my-8 overflow-x-auto rounded-xl border border-[var(--cv-border)]"
        >
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[var(--cv-bg-soft)]">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={`th-${i}`}
                    className="border-b border-[var(--cv-border)] px-4 py-3 font-semibold text-[var(--cv-ink)]"
                  >
                    {renderInline(header, `th-${cursor}-${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`td-${cellIndex}`}
                      className="border-b border-[var(--cv-border)] px-4 py-3 text-[var(--cv-muted)] last:border-b-0"
                    >
                      {renderInline(cell, `td-${cursor}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Blockquote.
    if (line.trimStart().startsWith(">")) {
      const quoted: string[] = [];
      while (cursor < lines.length && lines[cursor].trimStart().startsWith(">")) {
        quoted.push(lines[cursor].trimStart().replace(/^>\s?/, ""));
        cursor += 1;
      }
      push(
        <blockquote
          key={`quote-${cursor}`}
          className="my-6 border-l-2 border-[#2563eb] bg-[var(--cv-bg-soft)] py-3 pl-5 pr-4 text-[15px] italic leading-relaxed text-[var(--cv-muted)]"
        >
          {renderInline(quoted.join(" "), `quote-${cursor}`)}
        </blockquote>,
      );
      continue;
    }

    // Ordered list.
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (cursor < lines.length && /^\s*\d+\.\s+/.test(lines[cursor])) {
        let text = lines[cursor].replace(/^\s*\d+\.\s+/, "");
        cursor += 1;
        // Absorb indented continuation lines into the same item.
        while (
          cursor < lines.length &&
          /^\s{2,}\S/.test(lines[cursor]) &&
          !/^\s*\d+\.\s+/.test(lines[cursor])
        ) {
          text += ` ${lines[cursor].trim()}`;
          cursor += 1;
        }
        items.push(text);
      }
      push(
        <ol
          key={`ol-${cursor}`}
          className="my-5 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed text-[var(--cv-muted)] marker:font-semibold marker:text-[var(--cv-ink)] md:text-[16px]"
        >
          {items.map((item, i) => (
            <li key={`oli-${i}`}>{renderInline(item, `oli-${cursor}-${i}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Unordered list.
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (cursor < lines.length && /^\s*[-*+]\s+/.test(lines[cursor])) {
        let text = lines[cursor].replace(/^\s*[-*+]\s+/, "");
        cursor += 1;
        while (
          cursor < lines.length &&
          /^\s{2,}\S/.test(lines[cursor]) &&
          !/^\s*[-*+]\s+/.test(lines[cursor])
        ) {
          text += ` ${lines[cursor].trim()}`;
          cursor += 1;
        }
        items.push(text);
      }
      push(
        <ul
          key={`ul-${cursor}`}
          className="my-5 list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-[var(--cv-muted)] marker:text-[#2563eb] md:text-[16px]"
        >
          {items.map((item, i) => (
            <li key={`uli-${i}`}>{renderInline(item, `uli-${cursor}-${i}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph — consume until a blank line or the start of another block.
    const paragraph: string[] = [];
    while (
      cursor < lines.length &&
      lines[cursor].trim() &&
      !/^(#{1,4}\s|\s*[-*+]\s|\s*\d+\.\s|>|```)/.test(lines[cursor]) &&
      !lines[cursor].trim().startsWith("|") &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[cursor].trim())
    ) {
      paragraph.push(lines[cursor].trim());
      cursor += 1;
    }

    if (paragraph.length === 0) {
      // Nothing matched and nothing consumed — advance to stay safe.
      cursor += 1;
      continue;
    }

    const key = `p-${cursor}`;
    push(
      <p
        key={key}
        className="my-5 text-[15px] leading-[1.75] text-[var(--cv-muted)] md:text-[16px]"
      >
        {renderInline(paragraph.join(" "), key)}
      </p>,
    );
  }

  return <div className="cv-prose">{blocks}</div>;
}
