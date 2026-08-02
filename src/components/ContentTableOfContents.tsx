import type { Heading } from "@/lib/content";

/**
 * "In this article" outline, rendered inline at the top of the body rather than
 * as a sticky side rail.
 *
 * The rail version needs its own grid column, which pulls the article out of
 * line with its own header, and it disappears entirely on mobile — a lot of
 * layout for something that then serves only wide screens. Inline, it sits in
 * the reading column, works at every width, and stays plain anchors: no
 * scroll-spy, no observers, no JavaScript.
 *
 * Numbered on purpose — articles are reference material, and a numbered outline
 * reads as structure rather than as a list of links.
 */
export default function ContentTableOfContents({
  headings,
}: {
  headings: Heading[];
}) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="In this article"
      className="mb-10 rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-5 py-4"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
        In this article
      </p>
      <ol className="mt-3 flex flex-col gap-2">
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-5" : undefined}
          >
            <a
              href={`#${heading.id}`}
              className="group inline-flex items-baseline gap-2.5 text-[14px] leading-snug text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
            >
              {heading.level === 2 && (
                <span className="font-mono text-[11px] tabular-nums text-[var(--cv-muted)] opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span className="underline-offset-4 group-hover:underline">
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
