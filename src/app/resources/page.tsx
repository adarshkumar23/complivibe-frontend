import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";
import ResourcesSubscribeForm from "./ResourcesSubscribeForm";
import { BookOpen, Workflow, Archive, Layers, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources for building trustworthy AI | CompliVibe",
  description:
    "Guides, playbooks, framework explainers, and evidence templates for teams building AI governance, compliance automation, observability, and trust infrastructure.",
  alternates: { canonical: "https://complivibe.in/resources" },
};

/**
 * Hero resource-library mockup. Icons are rendered here inside the server
 * component (safe) — only string icon names are passed to the client cards
 * below, never the icon components themselves.
 */
const libraryItems = [
  { icon: <BookOpen className="h-4 w-4" />, label: "AI Trust Guides", meta: "Guides" },
  { icon: <Workflow className="h-4 w-4" />, label: "Governance Playbooks", meta: "Playbooks" },
  { icon: <Archive className="h-4 w-4" />, label: "Evidence Templates", meta: "Templates" },
  { icon: <Layers className="h-4 w-4" />, label: "Framework Explainers", meta: "Explainers" },
  { icon: <Globe className="h-4 w-4" />, label: "Trust Center Examples", meta: "Examples" },
];

const accents = ["#2563eb", "#7c3aed", "#06b6d4", "#10b981", "#2563eb"];

// Featured resources. Icons passed as STRING names → resolved client-side via
// the icon registry. Cards without a real destination are labelled honestly.
const featured = [
  {
    icon: "ShieldCheck",
    accent: "#2563eb",
    title: "AI Trust Infrastructure Guide",
    body: "How to stand up an operating layer for AI governance, evidence, and trust — from first control to customer-ready posture.",
    href: "/docs",
    hrefLabel: "Read in docs",
    tag: "Guide",
  },
  {
    icon: "Workflow",
    accent: "#7c3aed",
    title: "AI Governance Playbook",
    body: "Repeatable workflows for owners, model risk, approvals, and human review across your AI systems and vendors.",
    href: "/docs",
    hrefLabel: "Read in docs",
    tag: "Playbook",
  },
  {
    icon: "ClipboardCheck",
    accent: "#06b6d4",
    title: "Evidence Vault Checklist",
    body: "What audit-ready evidence to collect, where it lives, and how to keep it fresh across tools and frameworks.",
    tag: "Coming soon",
  },
  {
    icon: "Activity",
    accent: "#10b981",
    title: "Data Observability for AI Teams",
    body: "Monitor data quality, drift, and lineage so the inputs behind your AI stay trustworthy over time.",
    tag: "Coming soon",
  },
  {
    icon: "Layers",
    accent: "#f59e0b",
    title: "Framework Mapping Guide",
    body: "Map a single set of controls to AI, privacy, and security frameworks — explained in plain language.",
    href: "/frameworks",
    hrefLabel: "Explore frameworks",
    tag: "Guide",
  },
  {
    icon: "Globe",
    accent: "#2563eb",
    title: "Trust Center Launch Guide",
    body: "Turn your posture into a customer-facing trust center buyers and security teams can self-serve.",
    href: "/trust",
    hrefLabel: "See trust center",
    tag: "Guide",
  },
];

const categories = [
  {
    icon: "Brain",
    accent: "#2563eb",
    title: "AI Governance",
    body: "Owners, model risk, approvals, and human review for every AI system.",
    href: "/platform",
  },
  {
    icon: "SlidersHorizontal",
    accent: "#7c3aed",
    title: "Compliance Automation",
    body: "Turn obligations into evidence-backed, always-on workflows.",
    href: "/platform",
  },
  {
    icon: "Archive",
    accent: "#06b6d4",
    title: "Evidence Management",
    body: "Collect, organize, and refresh audit-ready evidence in one vault.",
    href: "/docs",
  },
  {
    icon: "Eye",
    accent: "#10b981",
    title: "Data Observability",
    body: "Track data quality, drift, and lineage behind your AI.",
    href: "/platform",
  },
  {
    icon: "FileBarChart",
    accent: "#f59e0b",
    title: "Trust Reporting",
    body: "Share posture with buyers, auditors, and leadership on demand.",
    href: "/trust",
  },
  {
    icon: "Compass",
    accent: "#2563eb",
    title: "Framework Readiness",
    body: "See where you stand against the frameworks that matter to you.",
    href: "/frameworks",
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--cv-muted)]">
      {children}
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Resources"
        title="Resources for building trustworthy"
        highlight="AI."
        subtitle="Guides, playbooks, framework explainers, and evidence templates for teams building AI governance, compliance, observability, and trust operations."
        primary={{ label: "Explore guides", href: "/docs" }}
        secondary={{ label: "Book a Demo", href: "/book-demo" }}
      >
        <div className="liquid-card glass-highlight p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-sm font-semibold text-[var(--cv-ink)]">
              Resource Library
            </span>
            <span className="ml-auto text-xs text-[var(--cv-muted)]">
              AI Trust Infrastructure
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {libraryItems.map((item, i) => (
              <div
                key={item.label}
                className="liquid-glass flex items-center gap-3 rounded-xl p-3.5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    backgroundColor: `${accents[i]}14`,
                    borderColor: `${accents[i]}33`,
                    color: accents[i],
                  }}
                >
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--cv-ink)]">
                    {item.label}
                  </p>
                  <p className="text-xs text-[var(--cv-muted)]">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <PageSection
        kicker="Featured"
        title="Practical resources for"
        highlight="AI trust."
        subtitle="Hands-on guides and templates for governance, evidence, observability, and trust infrastructure."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <PageBentoCard
              key={c.title}
              icon={c.icon}
              accent={c.accent}
              title={c.title}
              body={c.body}
              href={c.href}
              hrefLabel={c.hrefLabel}
            >
              <Tag>{c.tag}</Tag>
            </PageBentoCard>
          ))}
        </div>
      </PageSection>

      <PageSection
        kicker="Browse"
        title="Explore by"
        highlight="category."
        subtitle="Jump to the part of the AI trust stack you're building right now."
        aurora
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <PageBentoCard
              key={c.title}
              icon={c.icon}
              accent={c.accent}
              title={c.title}
              body={c.body}
              href={c.href}
              hrefLabel="Explore"
            />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="liquid-panel glass-highlight mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-12 text-center md:px-12 md:py-14">
          <span className="section-kicker">Newsletter</span>
          <h2
            className="text-balance"
            style={{
              fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--cv-ink)",
            }}
          >
            Notes on AI trust, straight to your inbox.
          </h2>
          <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-[var(--cv-muted)]">
            Get practical notes on AI governance, evidence, observability, and trust
            infrastructure.
          </p>
          <div className="flex w-full justify-center">
            <ResourcesSubscribeForm />
          </div>
        </div>
      </PageSection>

      <PageCTA
        title="Build your AI trust layer with the right"
        highlight="playbooks."
        subtitle="See how CompliVibe turns guides and templates into a live operating layer for AI governance, evidence, and trust."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
