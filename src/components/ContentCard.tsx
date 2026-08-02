import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { ContentSummary } from "@/lib/content";
import ContentTagPills from "@/components/ContentTagPills";

/**
 * One item in a blog or articles index grid.
 *
 * No "use client" and no hooks, so it renders as a server component on the
 * unfiltered pages and gets pulled into the client bundle only where the tag
 * filter needs it. Entrance motion is the site's CSS `motion-safe-reveal`
 * utility rather than framer-motion for the same reason — and because it keeps
 * the animation identical whether the card mounts on load or on a filter
 * change.
 *
 * `variant` is the deliberate difference between the two feeds:
 *   feed      — blog. Cover art, conversational, image-led.
 *   editorial — articles. No cover art, denser type, reference-shelf feel.
 */
export default function ContentCard({
  item,
  basePath,
  accent,
  variant = "feed",
  index = 0,
}: {
  item: ContentSummary;
  basePath: string;
  accent: string;
  variant?: "feed" | "editorial";
  index?: number;
}) {
  const href = `${basePath}/${item.slug}`;
  const showCover = variant === "feed" && Boolean(item.coverImage);

  return (
    <Link
      href={href}
      className="bento-card glass-highlight motion-safe-reveal group flex h-full flex-col overflow-hidden"
      // Capped so a long list never leaves the last card waiting a full second.
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      {showCover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--cv-border)] bg-[var(--cv-bg-soft)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- cover URLs come
              from the CMS and can point anywhere; next/image would need every
              host allow-listed in next.config.ts. */}
          <img
            src={item.coverImage ?? ""}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--cv-muted)]">
          {variant === "editorial" && item.tags[0] && (
            <>
              <span style={{ color: accent }}>{item.tags[0]}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          {item.date && (
            <>
              <span className="normal-case tracking-normal">{item.date}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span className="inline-flex items-center gap-1 normal-case tracking-normal">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {item.minutes} min read
          </span>
        </div>

        <h3
          className={`font-bold tracking-tight text-[var(--cv-ink)] ${
            variant === "editorial" ? "text-[1.15rem] leading-snug" : "text-lg leading-snug"
          }`}
        >
          {item.title}
        </h3>

        {item.excerpt && (
          <p className="text-sm leading-relaxed text-[var(--cv-muted)]">
            {item.excerpt}
          </p>
        )}

        {variant === "feed" && item.tags.length > 0 && (
          <ContentTagPills tags={item.tags.slice(0, 3)} />
        )}

        <span
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold"
          style={{ color: accent }}
        >
          {variant === "editorial" ? "Read article" : "Read field note"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
