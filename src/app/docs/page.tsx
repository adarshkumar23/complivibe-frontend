import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Documentation | CompliVibe",
  description:
    "CompliVibe documentation — quickstart, platform concepts, AI system inventory, evidence vault, trust graph, integrations, and reports.",
  alternates: { canonical: "https://complivibe.in/docs" },
};

const docs = [
  { icon: "Rocket", accent: "#2563eb", title: "Quickstart", body: "Map your first AI system and run a trust scan in minutes." },
  { icon: "BookOpen", accent: "#7c3aed", title: "Platform concepts", body: "How systems, risks, controls, evidence, and reports connect." },
  { icon: "Boxes", accent: "#2563eb", title: "AI system inventory", body: "Register models, datasets, vendors, owners, and use cases." },
  { icon: "Archive", accent: "#10b981", title: "Evidence vault", body: "Collect and organize audit-ready proof from your tools." },
  { icon: "Network", accent: "#7c3aed", title: "Trust graph", body: "Trace every AI decision back to controls and evidence." },
  { icon: "Plug", accent: "#06b6d4", title: "Integrations", body: "Connect the tools where your AI already runs." },
  { icon: "FileBarChart", accent: "#f59e0b", title: "Reports", body: "Generate customer-ready and auditor-ready trust reports." },
];

export default function DocsPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Documentation"
        title="CompliVibe"
        highlight="documentation."
        subtitle="Everything you need to set up your AI trust layer — from quickstart to platform concepts, integrations, and reporting."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />

      <PageSection kicker="Guides" title="Start here">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <PageBentoCard key={d.title} icon={d.icon} accent={d.accent} title={d.title} body={d.body} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[var(--cv-muted)]">
          Full developer documentation is expanding. Need something specific? Reach out and we’ll point you to it.
        </p>
      </PageSection>

      <PageCTA
        title="See the platform in action."
        subtitle="Book a walkthrough of governance, evidence, observability, and trust reporting."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
