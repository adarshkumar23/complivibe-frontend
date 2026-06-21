"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  Activity,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  type LucideIcon,
} from "lucide-react";

type TabKey = "governance" | "compliance" | "observability";

const tabs: { key: TabKey; label: string; icon: LucideIcon; accent: string }[] = [
  { key: "governance", label: "Governance", icon: ShieldCheck, accent: "#2563eb" },
  { key: "compliance", label: "Compliance", icon: FileCheck2, accent: "#7c3aed" },
  { key: "observability", label: "Observability", icon: Activity, accent: "#06b6d4" },
];

const panel: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

/* ----------------------------- Governance ----------------------------- */
function GovernancePanel() {
  const systems = [
    { name: "credit-scoring-ai", owner: "R. Mehta", risk: "High", state: "Review", tone: "warn" },
    { name: "support-copilot", owner: "A. Khan", risk: "Limited", state: "Approved", tone: "ok" },
    { name: "fraud-detector", owner: "L. Wong", risk: "High", state: "Sign-off", tone: "warn" },
    { name: "doc-summarizer", owner: "S. Iyer", risk: "Minimal", state: "Approved", tone: "ok" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      {/* inventory */}
      <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
            AI systems inventory
          </span>
          <span className="font-mono text-[11px] text-[var(--cv-muted)]">24 systems</span>
        </div>
        <div className="mb-2 grid grid-cols-[1.4fr_1fr_0.7fr_0.9fr] gap-2 px-1 text-[9px] font-semibold uppercase tracking-wide text-[var(--cv-muted)]">
          <span>System</span>
          <span>Owner</span>
          <span>Risk</span>
          <span>Status</span>
        </div>
        <div className="space-y-1.5">
          {systems.map((s, i) => (
            <motion.div
              key={s.name}
              className="grid grid-cols-[1.4fr_1fr_0.7fr_0.9fr] items-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="truncate font-mono text-[11px] text-[var(--cv-ink)]">{s.name}</span>
              <span className="flex items-center gap-1 text-[11px] text-[var(--cv-muted)]">
                <Users className="h-3 w-3 opacity-60" />
                {s.owner}
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  s.risk === "High" ? "text-[#f59e0b]" : s.risk === "Limited" ? "text-[#2563eb]" : "text-[#10b981]"
                }`}
              >
                {s.risk}
              </span>
              <span
                className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${
                  s.tone === "ok"
                    ? "bg-[#10b981]/10 text-[#0f9b6c] dark:text-[#34d399]"
                    : "bg-[#f59e0b]/10 text-[#b97c0a] dark:text-[#fbbf24]"
                }`}
              >
                {s.tone === "ok" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <AlertTriangle className="h-2.5 w-2.5" />}
                {s.state}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* score + sign-off queue */}
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
            AI Trust Score
          </span>
          <div className="mt-1 flex items-end gap-2">
            <span className="font-mono text-3xl font-bold text-[#2563eb] dark:text-[#3b82f6]">87</span>
            <span className="mb-1 text-xs text-[var(--cv-muted)]">/ 100</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--cv-surface-strong)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4]"
              initial={{ width: 0 }}
              animate={{ width: "87%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
              Human sign-off queue
            </span>
            <span className="rounded-full bg-[#f59e0b]/10 px-2 py-0.5 text-[10px] font-semibold text-[#b97c0a] dark:text-[#fbbf24]">
              4 pending
            </span>
          </div>
          {["credit-scoring-ai", "fraud-detector"].map((q) => (
            <div key={q} className="flex items-center justify-between border-b border-[var(--cv-border)] py-1.5 text-[11px] last:border-0">
              <span className="font-mono text-[var(--cv-ink)]">{q}</span>
              <span className="text-[#2563eb] dark:text-[#3b82f6]">Awaiting review</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Compliance ----------------------------- */
function CompliancePanel() {
  const frameworks = [
    { name: "EU AI Act", pct: 84 },
    { name: "India DPDP", pct: 91 },
    { name: "ISO 42001", pct: 78 },
    { name: "NIST AI RMF", pct: 72 },
    { name: "SOC 2", pct: 88 },
    { name: "Colorado AI Act", pct: 65 },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
            Framework readiness
          </span>
          <span className="font-mono text-[11px] text-[var(--cv-muted)]">6 tracked</span>
        </div>
        <div className="space-y-2.5">
          {frameworks.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="font-medium text-[var(--cv-ink)]">{f.name}</span>
                <span className="font-mono text-[var(--cv-muted)]">{f.pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--cv-surface-strong)]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb]"
                  initial={{ width: 0 }}
                  animate={{ width: `${f.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
            Evidence collection
          </span>
          <div className="mt-1 flex items-end gap-2">
            <span className="font-mono text-2xl font-bold text-[#10b981]">147</span>
            <span className="mb-1 text-xs text-[var(--cv-muted)]">/ 162 items</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--cv-surface-strong)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#06b6d4] to-[#10b981]"
              initial={{ width: 0 }}
              animate={{ width: "91%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 text-[10px] text-[var(--cv-muted)]">Control → evidence mapping · 828 obligations</div>
        </div>
        <button className="flex items-center justify-between rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/8 px-4 py-3 text-left transition-colors hover:bg-[#7c3aed]/12">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-[var(--cv-ink)]">
            <FileText className="h-4 w-4 text-[#7c3aed] dark:text-[#a78bfa]" />
            Audit pack generator
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7c3aed] dark:text-[#a78bfa]">
            Generate <ArrowRight className="h-3 w-3" />
          </span>
        </button>
      </div>
    </div>
  );
}

/* --------------------------- Observability --------------------------- */
function ObservabilityPanel() {
  const reduce = useReducedMotion();
  const bars = [38, 52, 44, 61, 49, 70, 58, 66, 54, 74, 63, 81];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
            Usage · latency / error signals
          </span>
          <span className="font-mono text-[10px] text-[var(--cv-muted)]">last 24h</span>
        </div>
        <div className="flex h-24 items-end gap-1 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] p-2.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#06b6d4] to-[#10b981]"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.04, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-2 text-[11px]">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#b97c0a] dark:text-[#fbbf24]" />
          <span className="text-[var(--cv-ink)]">Drift detected · credit-scoring-ai</span>
          <span className="ml-auto font-mono text-[10px] text-[var(--cv-muted)]">+3.2σ</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-3">
            <div className="text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">Risk health</div>
            <div className="font-mono text-xl font-bold text-[#f59e0b]">72</div>
          </div>
          <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-3">
            <div className="text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">Incidents</div>
            <div className="font-mono text-xl font-bold text-[#ef4444]">1</div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-[#10b981]/30 bg-[#10b981]/8 px-4 py-3">
          <span className="text-[12px] font-semibold text-[var(--cv-ink)]">Live trust posture</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0f9b6c] dark:text-[#34d399]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
            Healthy
          </span>
        </div>
      </div>
    </div>
  );
}

const panels: Record<TabKey, React.ReactNode> = {
  governance: <GovernancePanel />,
  compliance: <CompliancePanel />,
  observability: <ObservabilityPanel />,
};

export default function DemoVideo() {
  const [active, setActive] = useState<TabKey>("governance");
  const reduce = useReducedMotion();

  return (
    <section className="aurora-bg overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker mb-4">Product Preview</span>
          <h2 className="section-title mt-4 text-balance">
            See the AI trust operating layer in{" "}
            <span className="text-gradient-trust">action</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            A single workspace to govern AI systems, automate evidence, monitor trust signals, and
            generate customer-ready reports.
          </p>
        </motion.div>

        {/* Product frame */}
        <motion.div
          className="liquid-card glass-highlight mx-auto mt-12 max-w-5xl overflow-hidden p-0"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* app bar */}
          <div className="flex items-center gap-3 border-b border-[var(--cv-border)] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/50" />
            </div>
            <div className="mx-auto flex h-6 max-w-[260px] flex-1 items-center justify-center rounded-md border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3">
              <span className="font-mono text-[10px] text-[var(--cv-muted)]">app.complivibe.in/workspace</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#0f9b6c] dark:text-[#34d399]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" /> live
            </span>
          </div>

          {/* tabs */}
          <div className="flex items-center gap-1 border-b border-[var(--cv-border)] px-4 py-3">
            {tabs.map((t) => {
              const TabIcon = t.icon;
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-pressed={isActive}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--cv-surface-strong)] text-[var(--cv-ink)] shadow-[var(--cv-shadow-soft)]"
                      : "text-[var(--cv-muted)] hover:text-[var(--cv-ink)]"
                  }`}
                  style={isActive ? { boxShadow: `inset 0 0 0 1px ${t.accent}40` } : undefined}
                >
                  <TabIcon className="h-3.5 w-3.5" style={isActive ? { color: t.accent } : undefined} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* body: panel + copilot */}
          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_280px]">
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div key={active} variants={panel} initial="hidden" animate="show" exit="exit">
                  {panels[active]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Trust Copilot */}
            <motion.aside
              className="flex flex-col gap-4 rounded-xl border border-[var(--cv-border)] bg-gradient-to-b from-[#2563eb]/[0.06] to-[#7c3aed]/[0.04] p-4"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563eb] to-[#7c3aed]">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <span className="text-sm font-bold text-[var(--cv-ink)]">Trust Copilot</span>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--cv-muted)]">
                <span className="font-semibold text-[var(--cv-ink)]">3 governance gaps</span> need review.
                Evidence pack is ready for export.
              </p>
              <div className="space-y-1.5">
                {[
                  { t: "Model transparency gap", icon: AlertTriangle, c: "#f59e0b" },
                  { t: "Vendor risk re-score", icon: AlertTriangle, c: "#f59e0b" },
                  { t: "Evidence pack ready", icon: CheckCircle2, c: "#10b981" },
                ].map((row) => {
                  const RowIcon = row.icon;
                  return (
                    <div
                      key={row.t}
                      className="flex items-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-2 text-[11px] text-[var(--cv-ink)]"
                    >
                      <RowIcon className="h-3.5 w-3.5 shrink-0" style={{ color: row.c }} />
                      {row.t}
                    </div>
                  );
                })}
              </div>
              <button className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
                Review gaps
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--cv-muted)]">
                <Clock className="h-3 w-3" />
                Updated just now
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
