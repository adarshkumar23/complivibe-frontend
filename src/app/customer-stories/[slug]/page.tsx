import { notFound } from "next/navigation";
import { AlertTriangle, Lock, CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";

type StoryData = {
  title: string;
  sector: string;
  problem: string;
  blocker: string;
  outcome: string;
};

// Anonymized early use-case patterns — no named customers or quotes invented.
const stories: Record<string, StoryData> = {
  "healthtech-annex-iv": {
    title: "Health AI team prepares documentation for a hospital pilot",
    sector: "HealthTech",
    problem:
      "A clinical AI team needed governance documentation and evidence before a hospital pilot could proceed.",
    blocker:
      "Documentation and evidence were scattered, and review timelines were too slow for the pilot window.",
    outcome:
      "CompliVibe centralized evidence and generated a review-ready documentation pack in time for the pilot.",
  },
  "fintech-dpdp-gdpr": {
    title: "Fintech team unifies overlapping framework obligations",
    sector: "Fintech",
    problem:
      "A fintech API provider maintained separate trackers for multiple data frameworks with heavy manual overhead.",
    blocker:
      "Without overlap mapping between frameworks, controls were duplicated and gaps were hard to see.",
    outcome:
      "CompliVibe mapped overlapping obligations to controls and evidence in one view with change tracking.",
  },
  "saas-annex-iii": {
    title: "B2B SaaS maps AI risk before enterprise procurement",
    sector: "B2B SaaS",
    problem:
      "A SaaS company was asked to classify and document AI risk before an enterprise procurement decision.",
    blocker:
      "The team had no clear classification workflow and a short response window.",
    outcome:
      "CompliVibe produced a risk classification and transparency documentation for the procurement response.",
  },
};

const storySlugs = Object.keys(stories);

export const dynamicParams = false;

export function generateStaticParams() {
  return storySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories[slug];
  if (!story) return {};
  return {
    title: `${story.title} | CompliVibe`,
    description: story.problem,
    alternates: { canonical: `https://complivibe.in/customer-stories/${slug}` },
  };
}

export default async function StoryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories[slug];
  if (!story) notFound();

  const blocks = [
    { icon: AlertTriangle, accent: "#f59e0b", label: "The challenge", body: story.problem },
    { icon: Lock, accent: "#7c3aed", label: "What was blocking trust", body: story.blocker },
    { icon: CheckCircle2, accent: "#10b981", label: "How CompliVibe helped", body: story.outcome },
  ];

  return (
    <PageShell>
      <PageHero
        kicker={`Trust Story · ${story.sector}`}
        title={story.title}
        subtitle="An anonymized example of how AI-first teams use CompliVibe to turn scattered governance and evidence into customer-ready trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />

      <PageSection>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          {blocks.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="bento-card glass-highlight flex flex-col gap-3 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ backgroundColor: `${b.accent}14`, borderColor: `${b.accent}33` }}>
                  <Icon className="h-5 w-5" style={{ color: b.accent }} />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--cv-muted)]">{b.label}</h3>
                <p className="text-sm leading-relaxed text-[var(--cv-ink)]">{b.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-[12px] text-[var(--cv-muted)]">
          Example use-case pattern. Full named customer stories are coming soon.
        </p>
      </PageSection>

      <PageCTA
        title="Build your own trust story."
        subtitle="Start with one AI system and expand into the operating layer for governance, evidence, and trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Talk to the team", href: "/contact" }}
      />
    </PageShell>
  );
}
