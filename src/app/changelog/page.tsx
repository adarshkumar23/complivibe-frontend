import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Changelog | CompliVibe",
  description:
    "Product updates from CompliVibe — new trust workflows, evidence improvements, framework mappings, and observability updates.",
  alternates: { canonical: "https://complivibe.in/changelog" },
};

const entries = [
  {
    tag: "Trust workflows",
    accent: "#2563eb",
    items: ["AI Trust Graph for tracing decisions to evidence", "Human review and sign-off checkpoints", "Trust Center for customer-ready posture"],
  },
  {
    tag: "Evidence",
    accent: "#10b981",
    items: ["Evidence Vault with integrity checks", "Audit pack generator", "Control-to-evidence mapping"],
  },
  {
    tag: "Framework mappings",
    accent: "#7c3aed",
    items: ["Expanded AI, privacy, and security coverage", "Cross-framework obligation mapping", "Readiness scoring across frameworks"],
  },
  {
    tag: "Observability",
    accent: "#06b6d4",
    items: ["Usage, drift, and incident signals", "Risk health and trust posture alerts", "Model and vendor change tracking"],
  },
];

export default function ChangelogPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Changelog"
        title="What's new in"
        highlight="CompliVibe."
        subtitle="A product-led view of new trust workflows, evidence improvements, framework mappings, and observability updates."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />

      <section className="overflow-hidden py-20 md:py-28">
        <div className="cv-container">
          <div className="mx-auto max-w-3xl space-y-5">
            {entries.map((e) => (
              <div key={e.tag} className="liquid-card glass-highlight p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: e.accent }} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: e.accent }}>
                    {e.tag}
                  </span>
                </div>
                <ul className="space-y-2">
                  {e.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-[var(--cv-muted)]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: e.accent }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-[12px] text-[var(--cv-muted)]">
            Dated release notes are rolling out as we ship. This is a summary of recent product themes.
          </p>
        </div>
      </section>

      <PageCTA
        title="See the latest in action."
        subtitle="Book a walkthrough of the newest trust workflows and observability features."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
