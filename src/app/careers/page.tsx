import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Careers | CompliVibe",
  description:
    "We're building the trust layer for the AI economy. We're not hiring publicly yet — but we love meeting ambitious people.",
  alternates: { canonical: "https://complivibe.in/careers" },
};

const values = [
  { icon: "Rocket", accent: "#2563eb", title: "Build fast, build right", body: "Ship premium product quickly without cutting corners on trust." },
  { icon: "Brain", accent: "#7c3aed", title: "Think in systems", body: "We connect governance, evidence, and observability — not silos." },
  { icon: "Heart", accent: "#10b981", title: "Earn trust daily", body: "We hold ourselves to the standard we ask of our customers." },
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Careers"
        title="Build the trust layer for the AI economy with"
        highlight="us."
        subtitle="We're not hiring publicly yet, but we're building with ambitious people. If AI trust infrastructure excites you, we'd love to hear from you."
        primary={{ label: "Introduce yourself", href: "/contact" }}
        secondary={{ label: "About CompliVibe", href: "/about" }}
      />

      <PageSection kicker="How we work" title="What we value">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {values.map((v) => (
            <PageBentoCard key={v.title} icon={v.icon} accent={v.accent} title={v.title} body={v.body} />
          ))}
        </div>
      </PageSection>

      <PageCTA
        title="No open roles listed — yet."
        subtitle="If you're excited about AI governance, evidence, and trust infrastructure, reach out. We keep great people in mind."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />
    </PageShell>
  );
}
