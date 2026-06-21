import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "About | CompliVibe",
  description:
    "CompliVibe is building the trust layer for the AI economy — one operating layer for AI governance, evidence, observability, and trust.",
  alternates: { canonical: "https://complivibe.in/about" },
};

const beliefs = [
  { icon: "Sparkles", accent: "#2563eb", title: "AI is moving faster than trust", body: "Companies ship AI everywhere, but governance and proof lag behind." },
  { icon: "ShieldCheck", accent: "#7c3aed", title: "Trust should be infrastructure", body: "Governance, evidence, and observability belong in one operating layer." },
  { icon: "Network", accent: "#06b6d4", title: "Connected, not static", body: "Trust comes from linking systems, risks, controls, evidence, and reports." },
  { icon: "Compass", accent: "#10b981", title: "Human in the loop", body: "AI-assisted workflows should stay reviewable, with human sign-off." },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        kicker="About"
        title="Building the trust layer for the AI"
        highlight="economy."
        subtitle="As companies build, buy, and operate AI everywhere, the work of governing it and proving it is trustworthy is exploding. CompliVibe makes that work one connected operating layer."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />

      <PageSection kicker="Why we exist" title="The market shifted. Trust became the bottleneck.">
        <div className="mx-auto max-w-3xl">
          <div className="liquid-card glass-highlight p-7 text-[15px] leading-relaxed text-[var(--cv-muted)]">
            Every team is now shipping AI into products, workflows, and operations — while buyers, auditors,
            and regulators increasingly ask for proof. Most of that proof lives in scattered spreadsheets,
            tickets, and docs. CompliVibe exists to turn that scattered activity into a living trust
            infrastructure layer: govern AI systems, automate evidence, monitor production signals, and
            publish customer-ready trust — continuously.
          </div>
        </div>
      </PageSection>

      <PageSection kicker="What we believe" title="Our principles" aurora>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {beliefs.map((b) => (
            <PageBentoCard key={b.title} icon={b.icon} accent={b.accent} title={b.title} body={b.body} />
          ))}
        </div>
      </PageSection>

      <PageCTA
        title="Build trust into every AI system."
        subtitle="Start with one AI system and expand into the operating layer for governance, evidence, and trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
