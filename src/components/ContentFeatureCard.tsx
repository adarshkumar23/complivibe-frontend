import Link from "next/link";
import { ArrowRight, Clock, UserRound } from "lucide-react";
import type { ContentSummary } from "@/lib/content";
import ContentTagPills from "@/components/ContentTagPills";

/**
 * The lead item on an index page: the most recent post or article, given a
 * full-width card so the newest thing published is unmistakably the newest
 * thing published.
 *
 * With a cover image it splits into two columns on desktop; without one it
 * stays a single, generously spaced text column rather than reserving an empty
 * image well — the CMS makes coverImage optional, so both states have to look
 * intentional.
 */
export default function ContentFeatureCard({
  item,
  basePath,
  accent,
  label = "Latest",
  ctaLabel = "Read it",
}: {
  item: ContentSummary;
  basePath: string;
  accent: string;
  label?: string;
  ctaLabel?: string;
}) {
  const href = `${basePath}/${item.slug}`;
  const hasCover = Boolean(item.coverImage);

  return (
    <Link
      href={href}
      className={`liquid-card glass-highlight motion-safe-reveal group grid overflow-hidden ${
        hasCover ? "lg:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {hasCover && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--cv-bg-soft)] lg:aspect-auto lg:h-full lg:min-h-[320px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- cover URLs come
              from the CMS and can point anywhere; next/image would need every
              host allow-listed in next.config.ts. */}
          <img
            src={item.coverImage ?? ""}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Keeps the porcelain card edge from cutting hard against the photo,
              and works over any image in either theme. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,18,32,0) 55%, rgba(11,18,32,0.28) 100%)",
            }}
          />
        </div>
      )}

      <div
        className={`flex flex-col justify-center gap-5 p-7 md:p-10 ${
          hasCover ? "" : "mx-auto max-w-3xl text-center md:items-center"
        }`}
      >
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${
            hasCover ? "" : "justify-center"
          }`}
        >
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{
              color: accent,
              borderColor: "var(--cv-border)",
              background: "var(--cv-surface)",
            }}
          >
            {label}
          </span>
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[var(--cv-muted)]">
            {item.date && <span>{item.date}</span>}
            {item.date && <span aria-hidden="true">·</span>}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {item.minutes} min read
            </span>
            {item.author && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <UserRound className="h-3 w-3" aria-hidden="true" />
                  {item.author}
                </span>
              </>
            )}
          </span>
        </div>

        <h3
          className="text-balance font-bold tracking-tight text-[var(--cv-ink)]"
          style={{
            fontSize: "clamp(1.5rem, 2.6vw, 2.15rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
          }}
        >
          {item.title}
        </h3>

        {item.excerpt && (
          <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--cv-muted)] md:text-[16px]">
            {item.excerpt}
          </p>
        )}

        {item.tags.length > 0 && (
          <div className={hasCover ? "" : "flex justify-center"}>
            <ContentTagPills tags={item.tags.slice(0, 4)} />
          </div>
        )}

        <span
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
          style={{ color: accent }}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
