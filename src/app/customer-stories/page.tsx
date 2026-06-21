import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Trust stories from AI-first teams | CompliVibe",
  description:
    "How AI-first teams use CompliVibe for AI governance, evidence, and trust readiness. Early use-case patterns — full stories coming soon.",
  alternates: { canonical: "https://complivibe.in/customer-stories" },
};

const stories = [
  { icon: "HeartPulse", accent: "#06b6d4", title: "Health AI pilot readiness", body: "Centralizing evidence and documentation ahead of a hospital pilot.", href: "/customer-stories/healthtech-annex-iv" },
  { icon: "TrendingUp", accent: "#10b981", title: "Fintech framework overlap", body: "Unifying overlapping data obligations into one mapped view.", href: "/customer-stories/fintech-dpdp-gdpr" },
  { icon: "Cloud", accent: "#2563eb", title: "SaaS procurement readiness", body: "Mapping AI risk and transparency before an enterprise deal.", href: "/customer-stories/saas-annex-iii" },
];

export default function CustomerStoriesPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Customer Stories"
        title="Trust stories from AI-first"
        highlight="teams."
        subtitle="CompliVibe is being used and tested by AI-first teams that need governance, evidence, and trust readiness before scaling. Here are early, anonymized use-case patterns."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Talk to the team", href: "/contact" }}
      />

      <PageSection kicker="Early Use Cases" title="How teams put trust to work">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <PageBentoCard key={s.title} icon={s.icon} accent={s.accent} title={s.title} body={s.body} href={s.href} hrefLabel="Read pattern" />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[var(--cv-muted)]">
          Full named customer stories are coming soon. In the meantime, we are happy to walk you through real workflows live.
        </p>
      </PageSection>

      <PageCTA
        title="Want to see it on your AI systems?"
        subtitle="Book a walkthrough and we'll map a trust workflow to your real setup."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
