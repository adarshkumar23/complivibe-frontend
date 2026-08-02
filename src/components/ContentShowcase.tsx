import type { ContentSummary } from "@/lib/content";
import ContentCard from "@/components/ContentCard";
import ContentFeatureCard from "@/components/ContentFeatureCard";

/**
 * Featured item plus a grid of the rest — the shared layout behind both the
 * unfiltered (server-rendered) and filtered (client) index views, so the two
 * can never drift into looking like different pages.
 *
 * `showFeatured` is off while a tag filter is active: promoting one result out
 * of a filtered set implies an editorial choice that isn't being made.
 */
export default function ContentShowcase({
  items,
  basePath,
  accent,
  variant = "feed",
  featureLabel,
  featureCta,
  showFeatured = true,
}: {
  items: ContentSummary[];
  basePath: string;
  accent: string;
  variant?: "feed" | "editorial";
  featureLabel?: string;
  featureCta?: string;
  showFeatured?: boolean;
}) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--cv-muted)]">
        Nothing under that tag yet.
      </p>
    );
  }

  const featured = showFeatured ? items[0] : undefined;
  const rest = featured ? items.slice(1) : items;

  return (
    <div className="flex flex-col gap-6">
      {featured && (
        <ContentFeatureCard
          item={featured}
          basePath={basePath}
          accent={accent}
          label={featureLabel}
          ctaLabel={featureCta}
        />
      )}

      {rest.length > 0 && (
        <div
          className={`grid grid-cols-1 gap-5 ${
            variant === "editorial"
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {rest.map((item, index) => (
            <ContentCard
              key={item.slug}
              item={item}
              basePath={basePath}
              accent={accent}
              variant={variant}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
