import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Security | CompliVibe",
  description:
    "Security built for AI trust operations — access control, encryption, audit trails, evidence integrity, vendor security, human review, and incident readiness.",
  alternates: { canonical: "https://complivibe.in/security" },
};

const cards = [
  { icon: "KeyRound", accent: "#2563eb", title: "Access control", body: "Role-based access with support for SSO/SAML on enterprise plans." },
  { icon: "Lock", accent: "#7c3aed", title: "Encryption", body: "Data encrypted in transit and at rest across the platform." },
  { icon: "FileText", accent: "#06b6d4", title: "Audit trails", body: "Actions are logged to support traceable, transparent operations." },
  { icon: "ShieldCheck", accent: "#10b981", title: "Evidence integrity", body: "Integrity checks help keep stored evidence trustworthy." },
  { icon: "Network", accent: "#2563eb", title: "Vendor security", body: "Oversight of the third parties involved in delivering the service." },
  { icon: "UserCheck", accent: "#7c3aed", title: "Human review", body: "Critical workflows keep a human in the loop with sign-off." },
  { icon: "AlertTriangle", accent: "#f59e0b", title: "Incident readiness", body: "Processes to detect, respond to, and learn from incidents." },
];

export default function SecurityPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Security"
        title="Security built for AI trust"
        highlight="operations."
        subtitle="The controls and practices that protect your AI systems, evidence, and trust data — designed for the way modern teams operate AI."
        primary={{ label: "Talk to the team", href: "/contact" }}
        secondary={{ label: "View Trust Center", href: "/trust" }}
      />

      <PageSection kicker="Our controls" title="How we keep trust data safe">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <PageBentoCard key={c.title} icon={c.icon} accent={c.accent} title={c.title} body={c.body} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[var(--cv-muted)]">
          We pursue formal certifications as the company matures and are happy to share current status on request.
        </p>
      </PageSection>

      <PageCTA
        title="Reviewing CompliVibe for your team?"
        subtitle="Request our current security documentation or book a walkthrough with the team."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
