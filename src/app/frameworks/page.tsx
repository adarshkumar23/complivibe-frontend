"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Map, Boxes, FileBarChart } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

type Cat = "AI Governance" | "Privacy" | "Security & Trust";

const frameworks: { name: string; slug: string; cat: Cat; accent: string; note: string }[] = [
  { name: "EU AI Act", slug: "eu-ai-act", cat: "AI Governance", accent: "#2563eb", note: "Risk classification & documentation readiness" },
  { name: "ISO 42001", slug: "iso-42001", cat: "AI Governance", accent: "#2563eb", note: "AI management system alignment" },
  { name: "NIST AI RMF", slug: "nist", cat: "AI Governance", accent: "#2563eb", note: "Govern · Map · Measure · Manage" },
  { name: "Colorado AI Act", slug: "colorado-ai-act", cat: "AI Governance", accent: "#2563eb", note: "Consumer AI protections mapping" },
  { name: "India DPDP", slug: "dpdp", cat: "Privacy", accent: "#06b6d4", note: "Data protection mapped to AI workflows" },
  { name: "GDPR", slug: "gdpr", cat: "Privacy", accent: "#06b6d4", note: "Privacy governance for AI data" },
  { name: "SOC 2", slug: "soc2", cat: "Security & Trust", accent: "#10b981", note: "Trust services controls for AI delivery" },
  { name: "ISO 27001", slug: "iso27001", cat: "Security & Trust", accent: "#10b981", note: "ISMS controls for a secure AI lifecycle" },
  { name: "HIPAA", slug: "hipaa", cat: "Security & Trust", accent: "#10b981", note: "Health data safeguards for clinical AI" },
  { name: "PCI-DSS", slug: "pci-dss", cat: "Security & Trust", accent: "#10b981", note: "Payment data security mapping" },
  { name: "FedRAMP", slug: "fedramp", cat: "Security & Trust", accent: "#10b981", note: "Cloud security readiness mapping" },
  { name: "CSA STAR", slug: "csa-star", cat: "Security & Trust", accent: "#10b981", note: "Cloud assurance controls mapping" },
];

const filters: ("All" | Cat)[] = ["All", "AI Governance", "Privacy", "Security & Trust"];
const signals = ["AI inventory", "Evidence health", "Vendor risk", "Model changes", "Drift indicators", "Review status", "Trust reports"];

export default function FrameworksPage() {
  const [filter, setFilter] = useState<"All" | Cat>("All");
  const shown = frameworks.filter((f) => filter === "All" || f.cat === filter);

  return (
    <div className="cv-page">
      <Nav />
      <main>
        <PageHero
          kicker="Framework Coverage"
          title="Map AI, privacy, security, and trust frameworks without turning them into"
          highlight="spreadsheets."
          subtitle="CompliVibe connects framework obligations to AI systems, controls, evidence, owners, and trust reports — so coverage stays live instead of static."
          primary={{ label: "Book a Demo", href: "/book-demo" }}
          secondary={{ label: "Start Trust Scan", href: "/score" }}
        >
          <div className="liquid-card glass-highlight flex flex-wrap items-center justify-center gap-3 p-6 text-center text-sm text-[var(--cv-muted)]">
            <span className="inline-flex items-center gap-2"><Map className="h-4 w-4 text-[#2563eb] dark:text-[#3b82f6]" /> Obligations</span>
            <span className="text-[var(--cv-border)]">→</span>
            <span className="inline-flex items-center gap-2"><Boxes className="h-4 w-4 text-[#7c3aed] dark:text-[#a78bfa]" /> Controls & evidence</span>
            <span className="text-[var(--cv-border)]">→</span>
            <span className="inline-flex items-center gap-2"><FileBarChart className="h-4 w-4 text-[#10b981]" /> Trust reports</span>
          </div>
        </PageHero>

        <section className="overflow-hidden py-20 md:py-28">
          <div className="cv-container">
            {/* filters */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                    filter === f
                      ? "bg-[var(--cv-surface-strong)] text-[var(--cv-ink)] shadow-[var(--cv-shadow-soft)] ring-1 ring-[#2563eb]/30"
                      : "border border-[var(--cv-border)] bg-[var(--cv-surface)] text-[var(--cv-muted)] hover:text-[var(--cv-ink)]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((f) => (
                <motion.div key={f.slug} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                  <Link
                    href={`/frameworks/${f.slug}`}
                    className="bento-card glass-highlight flex h-full flex-col gap-3 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ backgroundColor: `${f.accent}14`, borderColor: `${f.accent}33` }}>
                        <ShieldCheck className="h-5 w-5" style={{ color: f.accent }} />
                      </span>
                      <span className="rounded-full border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--cv-muted)]">
                        {f.cat}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">{f.name}</h3>
                    <p className="text-sm leading-relaxed text-[var(--cv-muted)]">{f.note}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] font-semibold" style={{ color: f.accent }}>
                      View coverage <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* signal chips */}
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--cv-muted)]">
                Plus live trust signals — not just static mappings
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {signals.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--cv-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4]" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PageCTA
          title="Coverage that stays live."
          subtitle="Map frameworks to AI systems, evidence, and reports — and keep readiness current as your AI changes."
          primary={{ label: "Book a Demo", href: "/book-demo" }}
          secondary={{ label: "Start Trust Scan", href: "/score" }}
        />
      </main>
      <Footer />
    </div>
  );
}
