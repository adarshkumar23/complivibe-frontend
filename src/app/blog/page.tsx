import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";
import ContentShowcase from "@/components/ContentShowcase";
import ContentTagFilter from "@/components/ContentTagFilter";
import ContentEmptyState from "@/components/ContentEmptyState";
import { posts } from "@/content/blog/posts.generated";
import { collectTags, sortByPublished, toSummary } from "@/lib/content";

const ACCENT = "var(--cv-blue)";

export const metadata: Metadata = {
  title: "Field notes | CompliVibe",
  description:
    "Field notes on AI governance, trust infrastructure, and compliance automation from the CompliVibe team.",
  alternates: { canonical: "https://complivibe.in/blog" },
};

export default function BlogPage() {
  const items = sortByPublished(posts).map(toSummary);
  const tags = collectTags(items);

  return (
    <PageShell>
      <PageHero
        kicker="Field Notes"
        title="Field notes on AI governance and"
        highlight="trust infrastructure."
        subtitle="Working notes on AI governance, trust infrastructure, and compliance automation — written by the team building it."
        primary={{ label: "Talk to the team", href: "/contact" }}
        secondary={{ label: "Explore resources", href: "/resources" }}
      />

      <PageSection
        kicker="Latest"
        title={items.length === 1 ? "The latest field note" : "Latest field notes"}
      >
        {items.length === 0 ? (
          <ContentEmptyState
            accent={ACCENT}
            title="The first field notes are on their way."
            body="We're writing up what we've learned building the governance layer. Until they land, the platform tour and the docs cover the same ground."
          />
        ) : tags.length > 1 ? (
          // The filter is a client component, so it only mounts where it earns
          // its JavaScript: a single tag can't filter anything.
          <ContentTagFilter
            items={items}
            tags={tags}
            basePath="/blog"
            accent={ACCENT}
            featureLabel="Latest field note"
            featureCta="Read field note"
          />
        ) : (
          <ContentShowcase
            items={items}
            basePath="/blog"
            accent={ACCENT}
            featureLabel="Latest field note"
            featureCta="Read field note"
          />
        )}
      </PageSection>

      <PageCTA
        title="Building trustworthy AI?"
        subtitle="See how CompliVibe becomes the operating layer for AI governance, evidence, and trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
