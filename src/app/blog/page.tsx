import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Field notes | CompliVibe",
  description:
    "Field notes on AI governance, trust infrastructure, and compliance automation from the CompliVibe team.",
  alternates: { canonical: "https://complivibe.in/blog" },
};

const topics = [
  { icon: "ShieldCheck", accent: "#2563eb", title: "AI governance", body: "How modern teams govern AI systems, models, and vendors." },
  { icon: "Workflow", accent: "#7c3aed", title: "Trust infrastructure", body: "Building an operating layer for evidence, risk, and trust." },
  { icon: "Compass", accent: "#06b6d4", title: "Compliance automation", body: "Turning obligations into evidence-backed workflows." },
];

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Field Notes"
        title="Field notes on AI governance and"
        highlight="trust infrastructure."
        subtitle="Field notes on AI governance, trust infrastructure, and compliance automation. We're publishing soon — follow along or talk to the team in the meantime."
        primary={{ label: "Talk to the team", href: "/contact" }}
        secondary={{ label: "Explore resources", href: "/resources" }}
      />

      <PageSection kicker="What we'll cover" title="Topics on the way">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {topics.map((t) => (
            <PageBentoCard key={t.title} icon={t.icon} accent={t.accent} title={t.title} body={t.body} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[var(--cv-muted)]">
          The first field notes are in progress. Want an early read? Reach out and we’ll share what we’re working on.
        </p>
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
