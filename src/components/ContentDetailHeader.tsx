import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, UserRound } from "lucide-react";
import ContentTagPills from "@/components/ContentTagPills";

/**
 * The masthead for a blog post or article.
 *
 * Left-aligned inside the same 42rem measure the prose below uses, so the
 * title, the byline and the first paragraph all sit on one optical edge — the
 * rhythm a reader expects from long-form, and the one thing PageHero (centred,
 * marketing-shaped, no room for a byline or cover art) cannot express. Every
 * other cue is shared with the rest of the site: aurora backdrop, section
 * kicker, the same clamped display type.
 */
export default function ContentDetailHeader({
  kicker,
  backHref,
  backLabel,
  title,
  excerpt,
  author,
  date,
  isoDate,
  minutes,
  tags,
  coverImage,
  accent,
}: {
  kicker: string;
  backHref: string;
  backLabel: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  date: string | null;
  isoDate: string | null;
  minutes: number;
  tags: string[];
  coverImage: string | null;
  accent: string;
}) {
  return (
    <header className="aurora-bg relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
      <div className="cv-container">
        <div className="mx-auto flex max-w-[42rem] flex-col items-start">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>

          <span className="section-kicker mt-6" style={{ color: accent }}>
            {kicker}
          </span>

          <h1
            className="mt-4 text-balance font-semibold tracking-tight text-[var(--cv-ink)]"
            style={{
              fontSize: "clamp(2rem, 4.2vw, 3.1rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
          >
            {title}
          </h1>

          {excerpt && (
            <p className="mt-5 text-[1.05rem] leading-relaxed text-[var(--cv-muted)] md:text-[1.15rem]">
              {excerpt}
            </p>
          )}

          <div className="mt-7 flex w-full flex-wrap items-center gap-x-6 gap-y-2 border-y border-[var(--cv-border)] py-3.5 text-[13px] text-[var(--cv-muted)]">
            {author && (
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" style={{ color: accent }} />
                {author}
              </span>
            )}
            {date && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" style={{ color: accent }} />
                <time dateTime={isoDate ?? undefined}>{date}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: accent }} />
              {minutes} min read
            </span>
          </div>

          {tags.length > 0 && (
            <div className="mt-5">
              <ContentTagPills tags={tags} />
            </div>
          )}
        </div>

        {coverImage && (
          <figure className="motion-safe-reveal premium-shadow relative mx-auto mt-12 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] md:aspect-[21/9]">
            {/* eslint-disable-next-line @next/next/no-img-element -- cover URLs come
                from the CMS and can point anywhere; next/image would need every
                host allow-listed in next.config.ts. */}
            <img
              src={coverImage}
              alt=""
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,18,32,0) 60%, rgba(11,18,32,0.32) 100%)",
              }}
            />
          </figure>
        )}
      </div>
    </header>
  );
}
