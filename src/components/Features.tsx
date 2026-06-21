"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  Activity,
  Users,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Gauge,
  Workflow,
  LineChart,
  Boxes,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Accent system (maps to global --cv tokens)                         */
/* ------------------------------------------------------------------ */
type Accent = "blue" | "purple" | "cyan";

const accent: Record<
  Accent,
  { text: string; soft: string; ring: string; dot: string; grad: string }
> = {
  blue: {
    text: "text-[#2563eb] dark:text-[#3b82f6]",
    soft: "bg-[#2563eb]/10 dark:bg-[#3b82f6]/15",
    ring: "ring-[#2563eb]/30 dark:ring-[#3b82f6]/40",
    dot: "bg-[#2563eb] dark:bg-[#3b82f6]",
    grad: "from-[#2563eb] to-[#06b6d4]",
  },
  purple: {
    text: "text-[#7c3aed] dark:text-[#a78bfa]",
    soft: "bg-[#7c3aed]/10 dark:bg-[#a78bfa]/15",
    ring: "ring-[#7c3aed]/30 dark:ring-[#a78bfa]/40",
    dot: "bg-[#7c3aed] dark:bg-[#a78bfa]",
    grad: "from-[#7c3aed] to-[#2563eb]",
  },
  cyan: {
    text: "text-[#0891b2] dark:text-[#22d3ee]",
    soft: "bg-[#06b6d4]/10 dark:bg-[#22d3ee]/15",
    ring: "ring-[#06b6d4]/30 dark:ring-[#22d3ee]/40",
    dot: "bg-[#06b6d4] dark:bg-[#22d3ee]",
    grad: "from-[#06b6d4] to-[#10b981]",
  },
};

/* ------------------------------------------------------------------ */
/*  Embedded visuals                                                   */
/* ------------------------------------------------------------------ */

function VisualShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="liquid-card glass-highlight overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[var(--cv-border)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/60" />
        </div>
        <span className="ml-1 font-mono text-[11px] text-[var(--cv-muted)]">{title}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium text-[var(--cv-muted)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
          live
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* 1. Governance board */
function GovernanceVisual() {
  const rows = [
    { sys: "credit-scoring-ai", owner: "R. Mehta", risk: "High", state: "Review", tone: "warn" },
    { sys: "support-copilot", owner: "A. Khan", risk: "Limited", state: "Approved", tone: "ok" },
    { sys: "fraud-detector", owner: "L. Wong", risk: "High", state: "Pending", tone: "warn" },
    { sys: "doc-summarizer", owner: "S. Iyer", risk: "Minimal", state: "Approved", tone: "ok" },
  ];
  return (
    <VisualShell title="governance-board">
      <div className="mb-3 grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr] gap-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--cv-muted)]">
        <span>AI System</span>
        <span>Owner</span>
        <span>Risk</span>
        <span>Status</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.sys}
            className="grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr] items-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-2.5"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="truncate font-mono text-[11px] text-[var(--cv-ink)]">{r.sys}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--cv-muted)]">
              <Users className="h-3 w-3 opacity-60" />
              {r.owner}
            </span>
            <span
              className={`text-[10px] font-semibold ${
                r.risk === "High" ? "text-[#f59e0b]" : r.risk === "Limited" ? "text-[#2563eb]" : "text-[#10b981]"
              }`}
            >
              {r.risk}
            </span>
            <span
              className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                r.tone === "ok"
                  ? "bg-[#10b981]/10 text-[#0f9b6c] dark:text-[#34d399]"
                  : "bg-[#f59e0b]/10 text-[#b97c0a] dark:text-[#fbbf24]"
              }`}
            >
              {r.tone === "ok" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <AlertTriangle className="h-2.5 w-2.5" />}
              {r.state}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-2 text-[11px]">
        <span className="flex items-center gap-1.5 text-[var(--cv-muted)]">
          <GitBranch className="h-3.5 w-3.5 text-[#2563eb]" /> Governance health
        </span>
        <span className="font-mono font-semibold text-[#2563eb] dark:text-[#3b82f6]">87 / 100</span>
      </div>
    </VisualShell>
  );
}

/* 2. Framework mapping matrix */
function ComplianceVisual() {
  const frameworks = [
    { name: "EU AI Act", pct: 84 },
    { name: "India DPDP", pct: 91 },
    { name: "ISO 42001", pct: 78 },
    { name: "NIST AI RMF", pct: 72 },
    { name: "SOC 2", pct: 88 },
  ];
  return (
    <VisualShell title="framework-matrix">
      <div className="mb-3 flex items-center gap-2 text-[11px] text-[var(--cv-muted)]">
        <Workflow className="h-3.5 w-3.5 text-[#7c3aed]" />
        Controls
        <span className="text-[var(--cv-border)]">→</span>
        Evidence
        <span className="text-[var(--cv-border)]">→</span>
        Reports
      </div>
      <div className="space-y-2.5">
        {frameworks.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-medium text-[var(--cv-ink)]">{f.name}</span>
              <span className="font-mono text-[var(--cv-muted)]">{f.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--cv-bg-soft)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb]"
                initial={{ width: 0 }}
                whileInView={{ width: `${f.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { k: "Obligations", v: "828" },
          { k: "Evidence", v: "147" },
          { k: "Frameworks", v: "6" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-2 text-center">
            <div className="font-mono text-sm font-bold text-[var(--cv-ink)]">{s.v}</div>
            <div className="text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">{s.k}</div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

/* 3. Observability panel */
function ObservabilityVisual() {
  const reduce = useReducedMotion();
  const bars = [38, 52, 44, 61, 49, 70, 58, 66, 54, 74, 63, 81];
  return (
    <VisualShell title="observability">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--cv-ink)]">
          <LineChart className="h-3.5 w-3.5 text-[#0891b2] dark:text-[#22d3ee]" /> Usage & latency
        </span>
        <span className="font-mono text-[10px] text-[var(--cv-muted)]">last 24h</span>
      </div>
      <div className="flex h-20 items-end gap-1 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-2.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-[#06b6d4] to-[#10b981]"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.04, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-2 text-[11px]">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#b97c0a] dark:text-[#fbbf24]" />
          <span className="text-[var(--cv-ink)]">Drift detected · credit-scoring-ai</span>
          <span className="ml-auto font-mono text-[10px] text-[var(--cv-muted)]">+3.2σ</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-2">
            <div className="text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">Evidence health</div>
            <div className="font-mono text-sm font-bold text-[#10b981]">91%</div>
          </div>
          <div className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-2">
            <div className="text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">Risk health</div>
            <div className="font-mono text-sm font-bold text-[#f59e0b]">72</div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer data                                                         */
/* ------------------------------------------------------------------ */
type Layer = {
  id: string;
  tab: string;
  icon: LucideIcon;
  accent: Accent;
  heading: string;
  bullets: string[];
  metrics: { value: string; label: string }[];
  visual: React.ReactNode;
};

const layers: Layer[] = [
  {
    id: "governance",
    tab: "AI Governance",
    icon: ShieldCheck,
    accent: "blue",
    heading: "Govern every AI system before it becomes a risk.",
    bullets: [
      "AI system inventory",
      "Model and vendor oversight",
      "Owner and reviewer workflows",
      "Human approval checkpoints",
      "AI policy mapping",
      "Governance health scoring",
    ],
    metrics: [
      { value: "24", label: "AI systems mapped" },
      { value: "7", label: "Open risks" },
      { value: "4", label: "Pending reviews" },
    ],
    visual: <GovernanceVisual />,
  },
  {
    id: "compliance",
    tab: "Compliance Automation",
    icon: FileCheck2,
    accent: "purple",
    heading: "Turn obligations into evidence-backed workflows.",
    bullets: [
      "EU AI Act readiness",
      "India DPDP workflows",
      "ISO 42001 alignment",
      "NIST AI RMF mapping",
      "SOC 2 evidence support",
      "Colorado AI Act coverage",
    ],
    metrics: [
      { value: "828", label: "Mapped obligations" },
      { value: "147", label: "Evidence items" },
      { value: "6", label: "Frameworks tracked" },
    ],
    visual: <ComplianceVisual />,
  },
  {
    id: "observability",
    tab: "Data Observability",
    icon: Activity,
    accent: "cyan",
    heading: "Monitor the trust signals behind production AI.",
    bullets: [
      "Usage signals",
      "Drift indicators",
      "Incident markers",
      "Latency and error signals",
      "Model behavior changes",
      "Trust posture alerts",
    ],
    metrics: [
      { value: "Live", label: "Signals" },
      { value: "91%", label: "Evidence health" },
      { value: "72", label: "Risk health" },
    ],
    visual: <ObservabilityVisual />,
  },
];

const tabIcons: Record<string, LucideIcon> = {
  governance: Boxes,
  compliance: Layers,
  observability: Gauge,
};

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const layer = layers[active];
  const a = accent[layer.accent];

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
          <span className="section-kicker mb-4">Trust Layers</span>
          <h2 className="section-title mt-4 text-balance">
            Governance, compliance, and observability in one{" "}
            <span className="text-gradient-trust">trust layer</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            CompliVibe gives modern companies one operating system to govern AI, automate evidence,
            monitor production signals, and prove trust to customers, auditors, and regulators.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-2 sm:flex-row sm:justify-center">
          {layers.map((l, i) => {
            const TabIcon = tabIcons[l.id];
            const isActive = i === active;
            const la = accent[l.accent];
            return (
              <button
                key={l.id}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group relative flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `border-transparent bg-[var(--cv-surface-strong)] text-[var(--cv-ink)] shadow-[var(--cv-shadow-soft)] ring-1 ${la.ring}`
                    : "border-[var(--cv-border)] bg-[var(--cv-surface)] text-[var(--cv-muted)] hover:text-[var(--cv-ink)]"
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isActive ? la.text : "opacity-70"}`} />
                {l.tab}
              </button>
            );
          })}
        </div>

        {/* Active layer panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layer.id}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
          >
            {/* Left — copy */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${a.soft} ${a.text}`}>
                  <layer.icon className="h-5 w-5" />
                </span>
                <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${a.text}`}>
                  {layer.tab}
                </span>
              </div>

              <h3 className="text-balance text-2xl font-bold leading-tight tracking-tight text-[var(--cv-ink)] md:text-3xl">
                {layer.heading}
              </h3>

              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {layer.bullets.map((b) => (
                  <motion.li
                    key={b}
                    variants={itemVariants}
                    className="flex items-center gap-2.5 text-sm text-[var(--cv-muted)]"
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${a.soft}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 ${a.text}`} />
                    </span>
                    {b}
                  </motion.li>
                ))}
              </ul>

              {/* Metric / proof card */}
              <motion.div
                variants={itemVariants}
                className="bento-card glass-highlight grid grid-cols-3 divide-x divide-[var(--cv-border)] p-0"
              >
                {layer.metrics.map((m) => (
                  <div key={m.label} className="px-4 py-4 text-center">
                    <div className={`font-mono text-xl font-bold ${a.text}`}>{m.value}</div>
                    <div className="mt-1 text-[11px] leading-tight text-[var(--cv-muted)]">{m.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — embedded visual */}
            <motion.div
              variants={itemVariants}
              className="relative"
              initial={reduce ? undefined : { scale: 0.97 }}
              animate={reduce ? undefined : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br ${a.grad} opacity-[0.06] blur-2xl`}
              />
              {layer.visual}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
