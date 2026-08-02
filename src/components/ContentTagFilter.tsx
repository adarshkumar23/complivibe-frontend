"use client";

import { useState } from "react";
import type { ContentSummary } from "@/lib/content";
import ContentShowcase from "@/components/ContentShowcase";

/**
 * Client-side tag filtering for the blog and articles indexes — no navigation,
 * no refetch, no URL churn.
 *
 * Only mounted when a page actually has more than one tag to filter by; below
 * that the pages render <ContentShowcase> directly and ship no JavaScript for
 * this at all. Re-keying the showcase on the active tag remounts the cards, so
 * the same `motion-safe-reveal` entrance that plays on load also plays on each
 * filter change.
 */
export default function ContentTagFilter({
  items,
  tags,
  basePath,
  accent,
  variant = "feed",
  featureLabel,
  featureCta,
}: {
  items: ContentSummary[];
  tags: string[];
  basePath: string;
  accent: string;
  variant?: "feed" | "editorial";
  featureLabel?: string;
  featureCta?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? items.filter((item) => item.tags.includes(active))
    : items;

  return (
    <div className="flex flex-col gap-8">
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter by tag"
      >
        <FilterPill
          label="All"
          count={items.length}
          selected={active === null}
          accent={accent}
          onSelect={() => setActive(null)}
        />
        {tags.map((tag) => (
          <FilterPill
            key={tag}
            label={tag}
            count={items.filter((item) => item.tags.includes(tag)).length}
            selected={active === tag}
            accent={accent}
            onSelect={() => setActive(active === tag ? null : tag)}
          />
        ))}
      </div>

      <ContentShowcase
        key={active ?? "all"}
        items={visible}
        basePath={basePath}
        accent={accent}
        variant={variant}
        featureLabel={featureLabel}
        featureCta={featureCta}
        showFeatured={active === null}
      />
    </div>
  );
}

function FilterPill({
  label,
  count,
  selected,
  accent,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  accent: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      // 36px tall with generous horizontal padding — comfortable as a touch
      // target without turning the row into a wall of chips on mobile.
      className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-colors ${
        selected
          ? "border-transparent text-[var(--cv-ink)]"
          : "border-[var(--cv-border)] bg-[var(--cv-surface)] text-[var(--cv-muted)] hover:text-[var(--cv-ink)]"
      }`}
      style={
        selected
          ? {
              // color-mix keeps the selected fill tied to the accent token, so
              // it re-tints correctly in dark mode instead of being hardcoded.
              background: `color-mix(in srgb, ${accent} 14%, transparent)`,
              boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 38%, transparent)`,
              color: accent,
            }
          : undefined
      }
    >
      {label}
      <span className="text-[11px] opacity-60">{count}</span>
    </button>
  );
}
