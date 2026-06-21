import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";
import SolutionsGrids from "./SolutionsGrids";

export const metadata: Metadata = {
  title: "Solutions — AI trust workflows for every team | CompliVibe",
  description:
    "AI Trust Infrastructure for every modern team — governance, evidence, observability, and trust reporting by company stage, role, and industry.",
  alternates: { canonical: "https://complivibe.in/solutions" },
};

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Solutions"
        title="AI trust workflows for every modern"
        highlight="team."
        subtitle="Whether you are building AI products, buying AI tools, or governing AI across the company, CompliVibe gives every team one operating layer for governance, evidence, observability, and trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />

      <PageSection kicker="By Company Stage" title="From first AI system to enterprise rollout">
        <SolutionsGrids group="stage" />
      </PageSection>

      <PageSection kicker="By Role" title="One trust layer for every owner" aurora>
        <SolutionsGrids group="role" />
      </PageSection>

      <PageSection kicker="By Industry" title="Trust workflows tuned to your domain">
        <SolutionsGrids group="industry" />
      </PageSection>

      <PageCTA
        title="Find the trust workflow for your team."
        subtitle="Start with one AI system and expand into the operating layer for governance, evidence, monitoring, and trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
