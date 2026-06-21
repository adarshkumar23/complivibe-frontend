import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Trust Center | CompliVibe",
  description:
    "CompliVibe Trust Center — security posture, human review, evidence handling, data protection, audit trails, responsible AI operations, and framework readiness.",
  alternates: { canonical: "https://complivibe.in/trust" },
};

const cards = [
  { icon: "ShieldCheck", accent: "#2563eb", title: "Security posture", body: "Access controls, encryption, and monitoring across our platform." },
  { icon: "UserCheck", accent: "#7c3aed", title: "Human review", body: "AI-assisted workflows stay reviewable with human sign-off." },
  { icon: "Archive", accent: "#10b981", title: "Evidence handling", body: "Evidence is stored with integrity checks and clear ownership." },
  { icon: "Lock", accent: "#06b6d4", title: "Data protection", body: "Privacy-by-design handling of customer and AI system data." },
  { icon: "FileText", accent: "#2563eb", title: "Audit trails", body: "Actions are logged to support transparent, traceable operations." },
  { icon: "Activity", accent: "#06b6d4", title: "Responsible AI operations", body: "Monitoring and oversight for the AI that powers the product." },
  { icon: "Layers", accent: "#7c3aed", title: "Framework readiness", body: "Readiness mapping across AI, privacy, and security frameworks." },
];

export default function TrustPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Trust Center"
        title="CompliVibe Trust"
        highlight="Center."
        subtitle="How we secure the platform, handle evidence and data, keep humans in the loop, and operate AI responsibly — so you can trust the layer you build trust on."
        primary={{ label: "Talk to the team", href: "/contact" }}
        secondary={{ label: "View security", href: "/security" }}
      />

      <PageSection kicker="How we operate" title="Trust, built in">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <PageBentoCard key={c.title} icon={c.icon} accent={c.accent} title={c.title} body={c.body} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[var(--cv-muted)]">
          Formal certifications are pursued as we mature. We’re glad to share current details on request.
        </p>
      </PageSection>

      <PageCTA
        title="Want the details?"
        subtitle="Reach out for our current security and trust documentation, or book a walkthrough."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
