import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Enterprise — AI trust infrastructure at scale | CompliVibe",
  description:
    "Govern AI trust across teams, vendors, systems, and markets — with SSO/SAML, custom controls, human review, audit packs, vendor/model risk, trust center, and data observability.",
  alternates: { canonical: "https://complivibe.in/enterprise" },
};

const cards = [
  { icon: "Network", accent: "#2563eb", title: "Governance across teams", body: "Coordinate AI governance across functions and geographies." },
  { icon: "KeyRound", accent: "#7c3aed", title: "SSO / SAML & SCIM", body: "Enterprise identity, provisioning, and access control." },
  { icon: "SlidersHorizontal", accent: "#06b6d4", title: "Custom controls", body: "Tailor policies, controls, and approval flows to your org." },
  { icon: "UserCheck", accent: "#10b981", title: "Human review", body: "Expert and human sign-off before final trust outputs." },
  { icon: "FileBarChart", accent: "#f59e0b", title: "Audit packs", body: "Generate auditor-ready and board-ready trust packs on demand." },
  { icon: "Eye", accent: "#7c3aed", title: "Vendor & model risk", body: "Govern third-party models, AI vendors, and risk exposure." },
  { icon: "Globe", accent: "#2563eb", title: "Trust center", body: "Publish a live, customer-ready trust posture." },
  { icon: "Activity", accent: "#06b6d4", title: "Data observability", body: "Monitor usage, drift, incidents, and production trust signals." },
];

export default function EnterprisePage() {
  return (
    <PageShell>
      <PageHero
        kicker="Enterprise"
        title="AI trust infrastructure at"
        highlight="scale."
        subtitle="Operate AI trust across teams, vendors, systems, and markets — with the controls, oversight, and reporting enterprise rollout requires."
        primary={{ label: "Talk to Trust Experts", href: "/contact" }}
        secondary={{ label: "Book a Demo", href: "/book-demo" }}
      />

      <PageSection kicker="Built for rollout" title="Everything enterprise AI trust needs">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <PageBentoCard key={c.title} icon={c.icon} accent={c.accent} title={c.title} body={c.body} />
          ))}
        </div>
      </PageSection>

      <PageCTA
        title="Operate AI trust across the enterprise."
        subtitle="Bring governance, evidence, observability, and reporting into one operating layer for every team and market."
        primary={{ label: "Talk to Trust Experts", href: "/contact" }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />
    </PageShell>
  );
}
