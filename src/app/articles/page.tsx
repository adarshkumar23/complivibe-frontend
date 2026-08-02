import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";
import ContentShowcase from "@/components/ContentShowcase";
import ContentTagFilter from "@/components/ContentTagFilter";
import ContentEmptyState from "@/components/ContentEmptyState";
import { articles } from "@/content/articles/articles.generated";
import { collectTags, sortByPublished, toSummary } from "@/lib/content";

const ACCENT = "var(--cv-purple)";

export const metadata: Metadata = {
  title: "Articles | CompliVibe",
  description:
    "In-depth articles on AI governance, control mapping, evidence workflows, and compliance frameworks from the CompliVibe team.",
  alternates: { canonical: "https://complivibe.in/articles" },
};

export default function ArticlesPage() {
  const items = sortByPublished(articles).map(toSummary);
  const tags = collectTags(items);

  return (
    <PageShell>
      <PageHero
        kicker="Articles"
        title="Deep dives on governance,"
        highlight="controls, and evidence."
        subtitle="Longer-form articles on mapping frameworks to controls, building evidence workflows, and running AI governance day to day."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Read field notes", href: "/blog" }}
      />

      <PageSection
        kicker="Library"
        title={items.length === 1 ? "The latest article" : "Latest articles"}
      >
        {items.length === 0 ? (
          <ContentEmptyState
            accent={ACCENT}
            title="The library is being written."
            body="The first deep dives are in draft. Until they publish, the platform pages and the docs cover how the mapping and evidence workflows actually run."
          />
        ) : tags.length > 1 ? (
          <ContentTagFilter
            items={items}
            tags={tags}
            basePath="/articles"
            accent={ACCENT}
            // Two-column grid and no cover art: articles are reference reading,
            // so the cards lead with subject and excerpt rather than imagery.
            variant="editorial"
            featureLabel="Featured article"
            featureCta="Read article"
          />
        ) : (
          <ContentShowcase
            items={items}
            basePath="/articles"
            accent={ACCENT}
            variant="editorial"
            featureLabel="Featured article"
            featureCta="Read article"
          />
        )}
      </PageSection>

      <PageCTA
        title="Put the theory to work."
        subtitle="See how CompliVibe maps obligations to controls, evidence, and trust reports on your real AI systems."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
