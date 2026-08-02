import Link from "next/link";
import { ArrowRight, ChevronRight, PenLine } from "lucide-react";

/**
 * What an index page shows when the CMS returned nothing — which happens both
 * before the first item is published and on a CMS_FETCH_OPTIONAL build where
 * the CMS was unreachable.
 *
 * It has to read as "this is on its way", not as a broken page, so it keeps the
 * card language of a populated index and always offers somewhere else to go.
 */
export default function ContentEmptyState({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="liquid-card glass-highlight motion-safe-reveal mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 py-14 text-center md:px-12">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--cv-border)]"
        style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)` }}
      >
        <PenLine className="h-5 w-5" style={{ color: accent }} />
      </span>

      <h3 className="text-[1.3rem] font-bold tracking-tight text-[var(--cv-ink)]">
        {title}
      </h3>
      <p className="max-w-md text-[15px] leading-relaxed text-[var(--cv-muted)]">
        {body}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <Link
          href="/platform"
          className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-[14px] font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
          }}
        >
          Explore the platform
          <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
        </Link>
        <Link
          href="/docs"
          className="liquid-glass inline-flex h-11 items-center gap-2 rounded-full px-6 text-[14px] font-medium text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
        >
          Read the docs
          <ChevronRight className="h-[15px] w-[15px]" />
        </Link>
      </div>
    </div>
  );
}
