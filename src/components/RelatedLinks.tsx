import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import type { RelatedLink } from "@/lib/seo";

/**
 * Contextual cross-links between /frameworks/* and /solutions/*.
 *
 * Framework and solution pages previously had no internal links to each other,
 * so neither crawlers nor readers could move between a regulation and the
 * audience page that explains it. Three relevant links per page — enough to
 * connect the clusters, short of link spam.
 */
export default function RelatedLinks({
  kicker,
  title,
  subtitle,
  links,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  links: RelatedLink[];
}) {
  if (!links.length) return null;

  return (
    <PageSection kicker={kicker} title={title} subtitle={subtitle}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {links.map((l) => (
          <PageBentoCard
            key={l.href}
            icon={l.icon}
            title={l.title}
            body={l.body}
            href={l.href}
            hrefLabel="Explore"
          />
        ))}
      </div>
    </PageSection>
  );
}
