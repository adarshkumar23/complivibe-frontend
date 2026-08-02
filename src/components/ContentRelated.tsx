import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { ContentSummary } from "@/lib/content";

/**
 * "Keep reading" rail at the foot of a post or article.
 *
 * Compact rows rather than full index cards: at the end of a long read the
 * question is "what next", and three scannable titles answer it faster than
 * three more excerpt-heavy cards. Always renders a way back to the index, even
 * when there are no siblings to suggest yet.
 */
export default function ContentRelated({
  items,
  basePath,
  accent,
  heading,
  backLabel,
}: {
  items: ContentSummary[];
  basePath: string;
  accent: string;
  heading: string;
  backLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[42rem]">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[1.15rem] font-bold tracking-tight text-[var(--cv-ink)]">
          {heading}
        </h2>
        <Link
          href={basePath}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: accent }}
        >
          {backLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {items.length > 0 && (
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`${basePath}/${item.slug}`}
                className="bento-card group flex items-center justify-between gap-5 p-5"
              >
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="truncate text-[15px] font-semibold text-[var(--cv-ink)]">
                    {item.title}
                  </span>
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[var(--cv-muted)]">
                    {item.date && <span>{item.date}</span>}
                    {item.date && <span aria-hidden="true">·</span>}
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {item.minutes} min read
                    </span>
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ color: accent }}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
