"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Boxes,
  ShieldCheck,
  Archive,
  Activity,
  FileBarChart,
  Search,
  Network,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileCheck2,
  Sparkles,
  Workflow,
  LayoutGrid,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

/* ================================================================== */
/*  Shared motion                                                      */
/* ================================================================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function SectionHeader({
  kicker,
  title,
  subtitle,
  highlight,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  highlight?: string;
}) {
  return (
    <motion.div
      className="mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-kicker mb-4">{kicker}</span>
      <h2 className="section-title mt-4 text-balance">
        {title}
        {highlight && <span className="text-gradient-trust"> {highlight}</span>}
      </h2>
      {subtitle && <p className="section-subtitle mx-auto mt-5">{subtitle}</p>}
    </motion.div>
  );
}

/* ================================================================== */
/*  1. HERO                                                            */
/* ================================================================== */
const heroFlow: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "AI Systems", icon: Boxes, color: "#2563eb" },
  { label: "Trust Graph", icon: Network, color: "#7c3aed" },
  { label: "Evidence Vault", icon: Archive, color: "#10b981" },
  { label: "Trust Reports", icon: FileBarChart, color: "#06b6d4" },
];

const heroStats = [
  { label: "AI Trust Score", value: "87", accent: "#2563eb" },
  { label: "AI systems mapped", value: "24", accent: "#7c3aed" },
  { label: "Evidence items", value: "147", accent: "#10b981" },
  { label: "Open risks", value: "7", accent: "#f59e0b" },
];

function HeroVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative mx-auto mt-16 w-full max-w-5xl"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="liquid-card glass-highlight p-6 md:p-10">
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
            <LayoutGrid className="h-3.5 w-3.5 text-[#2563eb] dark:text-[#3b82f6]" />
            Platform architecture
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0f9b6c] dark:text-[#34d399]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" /> live
          </span>
        </div>

        {/* flow */}
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {heroFlow.map((node, i) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.label}>
                <motion.div
                  className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-4 py-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.35 + i * 0.12, duration: 0.45 }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{ backgroundColor: `${node.color}14`, borderColor: `${node.color}33` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: node.color }} />
                  </span>
                  <span className="text-[13px] font-semibold text-[var(--cv-ink)]">{node.label}</span>
                </motion.div>

                {i < heroFlow.length - 1 && (
                  <div className="relative mx-auto h-6 w-px md:h-px md:w-12 md:flex-shrink-0">
                    <div className="absolute inset-0 bg-[var(--cv-border)]" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-[#2563eb] to-[#7c3aed] md:bg-gradient-to-r"
                      initial={{ scaleX: 0, scaleY: 0 }}
                      animate={{ scaleX: 1, scaleY: 1 }}
                      style={{ transformOrigin: "top left" }}
                      transition={{ delay: reduced ? 0 : 0.5 + i * 0.12, duration: 0.4 }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* floating stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-4 py-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.7 + i * 0.08, duration: 0.4 }}
            >
              <div className="font-mono text-xl font-bold" style={{ color: s.accent }}>
                {s.value}
              </div>
              <div className="mt-0.5 text-[11px] leading-tight text-[var(--cv-muted)]">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-4 py-2.5">
          <Activity className="h-4 w-4 text-[#06b6d4] dark:text-[#22d3ee]" />
          <span className="text-[12px] font-medium text-[var(--cv-ink)]">Live observability signals</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-[var(--cv-muted)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#06b6d4]" /> streaming
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ reduced }: { reduced: boolean }) {
  return (
    <section className="aurora-bg relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="cv-container">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.span variants={fadeUp} className="section-kicker mb-5">
            The Platform
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-semibold tracking-tight text-[var(--cv-ink)]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            The <span className="text-gradient-trust">AI Trust OS</span> for modern companies.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-[var(--cv-muted)] md:text-[1.15rem]"
          >
            CompliVibe connects AI governance, compliance automation, evidence, risk monitoring, and
            data observability into one operating layer — so every AI system can be governed,
            monitored, and trusted.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book-demo"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
              }}
            >
              Book a Demo
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link
              href="/score"
              className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
            >
              Start Trust Scan
              <ChevronRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        <HeroVisual reduced={reduced} />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  2. PLATFORM LAYERS                                                 */
/* ================================================================== */
function ChipRow({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2 py-1 text-[10px] font-medium text-[var(--cv-muted)]"
        >
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ backgroundColor: color }} />
          {t}
        </span>
      ))}
    </div>
  );
}

function BarsMini({ rows }: { rows: { label: string; pct: number; color: string }[] }) {
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-1 flex items-center justify-between text-[10px]">
            <span className="text-[var(--cv-ink)]">{r.label}</span>
            <span className="font-mono text-[var(--cv-muted)]">{r.pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--cv-bg-soft)]">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: r.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${r.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const layers: {
  icon: LucideIcon;
  accent: string;
  title: string;
  desc: string;
  mini: React.ReactNode;
  wide?: boolean;
}[] = [
  {
    icon: Boxes,
    accent: "#2563eb",
    title: "AI System Inventory",
    desc: "Map every AI system, model, dataset, vendor, owner, and use case in one governed registry.",
    mini: <ChipRow items={["Systems", "Models", "Datasets", "Vendors", "Owners"]} color="#2563eb" />,
    wide: true,
  },
  {
    icon: ShieldCheck,
    accent: "#7c3aed",
    title: "AI Governance OS",
    desc: "Assign policies, controls, approvals, reviews, and human sign-off across the AI lifecycle.",
    mini: <ChipRow items={["Policies", "Controls", "Approvals", "Sign-off"]} color="#7c3aed" />,
    wide: true,
  },
  {
    icon: Archive,
    accent: "#10b981",
    title: "Evidence Vault",
    desc: "Collect policies, approvals, logs, screenshots, controls, and audit proof in one trusted repository.",
    mini: <ChipRow items={["Logs", "Reviews", "Screenshots", "Controls"]} color="#10b981" />,
  },
  {
    icon: Activity,
    accent: "#06b6d4",
    title: "Data Observability",
    desc: "Monitor AI usage, drift indicators, incidents, latency, errors, and production trust signals.",
    mini: (
      <BarsMini
        rows={[
          { label: "Usage", pct: 82, color: "#06b6d4" },
          { label: "Drift", pct: 32, color: "#f59e0b" },
          { label: "Errors", pct: 12, color: "#ef4444" },
        ]}
      />
    ),
  },
  {
    icon: FileBarChart,
    accent: "#2563eb",
    title: "Trust Reports",
    desc: "Generate customer-ready, auditor-ready, and board-ready trust reports from live evidence.",
    mini: <ChipRow items={["Customer", "Auditor", "Board", "Trust center"]} color="#2563eb" />,
  },
];

function PlatformLayers({ reduced }: { reduced: boolean }) {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        <SectionHeader
          kicker="Platform Layers"
          title="One trust layer across your"
          highlight="AI stack."
          subtitle="CompliVibe brings governance, compliance, evidence, and observability into one connected system."
        />
        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {layers.map((l) => {
            const Icon = l.icon;
            return (
              <motion.div
                key={l.title}
                variants={item}
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`bento-card glass-highlight flex flex-col gap-4 p-6 ${
                  l.wide ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: `${l.accent}14`, borderColor: `${l.accent}33` }}
                >
                  <Icon className="h-5 w-5" style={{ color: l.accent }} />
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">{l.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--cv-muted)]">{l.desc}</p>
                </div>
                <div className="mt-auto rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface)] p-3">
                  {l.mini}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  3. ARCHITECTURE FLOW                                               */
/* ================================================================== */
const archSteps: { n: string; label: string; icon: LucideIcon; color: string; detail: string }[] = [
  { n: "01", label: "Discover", icon: Search, color: "#2563eb", detail: "AI systems, models, datasets, vendors" },
  { n: "02", label: "Govern", icon: ShieldCheck, color: "#7c3aed", detail: "Owners, controls, approvals, policies" },
  { n: "03", label: "Evidence", icon: Archive, color: "#10b981", detail: "Documents, logs, reviews, screenshots" },
  { n: "04", label: "Monitor", icon: Activity, color: "#06b6d4", detail: "Signals, drift, incidents, risk changes" },
  { n: "05", label: "Report", icon: FileBarChart, color: "#f59e0b", detail: "Trust center, audit packs, customer reports" },
];

function Architecture({ reduced }: { reduced: boolean }) {
  return (
    <section className="aurora-bg overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        <SectionHeader
          kicker="Connected Architecture"
          title="From scattered AI activity to"
          highlight="governed trust."
        />

        {/* desktop horizontal */}
        <div className="relative mt-16 hidden md:block">
          <div className="pointer-events-none absolute left-0 right-0 top-[34px] z-0 mx-[10%] h-px">
            <div className="absolute inset-0 bg-[var(--cv-border)]" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2563eb] via-[#10b981] to-[#f59e0b]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduced ? 0 : 1.4, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
          <motion.div
            className="relative z-10 grid grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {archSteps.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} variants={item} className="flex flex-col items-center text-center">
                  <span
                    className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl border bg-[var(--cv-surface-strong)]"
                    style={{ borderColor: `${s.color}40` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: s.color }} />
                  </span>
                  <span className="mt-4 font-mono text-[11px] font-semibold text-[var(--cv-muted)]">{s.n}</span>
                  <h3 className="mt-1 text-base font-bold tracking-tight text-[var(--cv-ink)]">{s.label}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--cv-muted)]">{s.detail}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* mobile vertical */}
        <motion.div
          className="relative mt-12 flex flex-col gap-4 md:hidden"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="pointer-events-none absolute bottom-10 left-[27px] top-10 w-px">
            <div className="absolute inset-0 bg-[var(--cv-border)]" />
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#2563eb] via-[#10b981] to-[#f59e0b]"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 1.4, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
          {archSteps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} variants={item} className="relative z-10 flex items-start gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-[var(--cv-surface-strong)]"
                  style={{ borderColor: `${s.color}40` }}
                >
                  <Icon className="h-6 w-6" style={{ color: s.color }} />
                </span>
                <div className="liquid-card glass-highlight flex-1 px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[var(--cv-muted)]">{s.n}</span>
                    <h3 className="text-base font-bold tracking-tight text-[var(--cv-ink)]">{s.label}</h3>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--cv-muted)]">{s.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4. COMMAND CENTER PREVIEW                                          */
/* ================================================================== */
type TabKey = "governance" | "compliance" | "observability" | "evidence" | "reports";
const tabs: { key: TabKey; label: string; icon: LucideIcon; accent: string }[] = [
  { key: "governance", label: "Governance", icon: ShieldCheck, accent: "#2563eb" },
  { key: "compliance", label: "Compliance", icon: FileCheck2, accent: "#7c3aed" },
  { key: "observability", label: "Observability", icon: Activity, accent: "#06b6d4" },
  { key: "evidence", label: "Evidence", icon: Archive, accent: "#10b981" },
  { key: "reports", label: "Reports", icon: FileBarChart, accent: "#f59e0b" },
];

const panelMotion: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function GovernancePanel() {
  const rows = [
    { sys: "credit-scoring-ai", owner: "R. Mehta", risk: "High", tone: "warn" },
    { sys: "support-copilot", owner: "A. Khan", risk: "Limited", tone: "ok" },
    { sys: "fraud-detector", owner: "L. Wong", risk: "High", tone: "warn" },
    { sys: "doc-summarizer", owner: "S. Iyer", risk: "Minimal", tone: "ok" },
  ];
  return (
    <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
      <div className="mb-2 grid grid-cols-[1.5fr_1fr_0.8fr] gap-2 px-1 text-[9px] font-semibold uppercase tracking-wide text-[var(--cv-muted)]">
        <span>AI System</span>
        <span>Owner</span>
        <span>Risk</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div
            key={r.sys}
            className="grid grid-cols-[1.5fr_1fr_0.8fr] items-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-2"
          >
            <span className="truncate font-mono text-[11px] text-[var(--cv-ink)]">{r.sys}</span>
            <span className="flex items-center gap-1 text-[11px] text-[var(--cv-muted)]">
              <Users className="h-3 w-3 opacity-60" />
              {r.owner}
            </span>
            <span
              className={`text-[10px] font-semibold ${
                r.tone === "warn" ? "text-[#f59e0b]" : "text-[#10b981]"
              }`}
            >
              {r.risk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompliancePanel() {
  return (
    <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
      <BarsMini
        rows={[
          { label: "EU AI Act", pct: 84, color: "#7c3aed" },
          { label: "India DPDP", pct: 91, color: "#2563eb" },
          { label: "ISO 42001", pct: 78, color: "#06b6d4" },
          { label: "NIST AI RMF", pct: 72, color: "#10b981" },
          { label: "SOC 2", pct: 88, color: "#f59e0b" },
        ]}
      />
    </div>
  );
}

function ObservabilityPanel({ reduced }: { reduced: boolean }) {
  const bars = [38, 52, 44, 61, 49, 70, 58, 66, 54, 74, 63, 81];
  return (
    <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
      <div className="flex h-24 items-end gap-1 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] p-2.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-[#06b6d4] to-[#10b981]"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.04, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-2 text-[11px]">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#b97c0a] dark:text-[#fbbf24]" />
        <span className="text-[var(--cv-ink)]">Drift detected · credit-scoring-ai</span>
        <span className="ml-auto font-mono text-[10px] text-[var(--cv-muted)]">+3.2σ</span>
      </div>
    </div>
  );
}

function EvidencePanel() {
  const docs = ["annex-iv.pdf", "risk-assessment.json", "model-card.md", "approval-log.pdf"];
  return (
    <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
      <div className="mb-3 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-[var(--cv-ink)]">Evidence Vault</span>
        <span className="inline-flex items-center gap-1.5 text-[#0f9b6c] dark:text-[#34d399]">
          <CheckCircle2 className="h-3.5 w-3.5" /> Integrity 100%
        </span>
      </div>
      <div className="space-y-1.5">
        {docs.map((d) => (
          <div
            key={d}
            className="flex items-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-2 text-[11px]"
          >
            <FileText className="h-3.5 w-3.5 text-[#10b981]" />
            <span className="font-mono text-[var(--cv-ink)]">{d}</span>
            <span className="ml-auto font-mono text-[9px] text-[var(--cv-muted)]">hashed</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPanel() {
  return (
    <div className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] p-4">
      <div className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[var(--cv-ink)]">AI Trust Report</span>
          <span className="rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0f9b6c] dark:text-[#34d399]">
            Ready
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { k: "Trust", v: "87" },
            { k: "Evidence", v: "91%" },
            { k: "Risk", v: "72" },
          ].map((m) => (
            <div key={m.k} className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2 py-2">
              <div className="font-mono text-base font-bold text-[var(--cv-ink)]">{m.v}</div>
              <div className="text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">{m.k}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/8 px-3 py-2 text-[11px] font-semibold text-[var(--cv-ink)]">
        <FileBarChart className="h-3.5 w-3.5 text-[#b97c0a] dark:text-[#fbbf24]" />
        Export trust pack
      </button>
    </div>
  );
}

function CommandCenter({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState<TabKey>("governance");
  const panels: Record<TabKey, React.ReactNode> = {
    governance: <GovernancePanel />,
    compliance: <CompliancePanel />,
    observability: <ObservabilityPanel reduced={reduced} />,
    evidence: <EvidencePanel />,
    reports: <ReportsPanel />,
  };

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        <SectionHeader
          kicker="Command Center"
          title="One workspace for every AI trust"
          highlight="workflow."
        />

        <motion.div
          className="liquid-card glass-highlight mx-auto mt-12 max-w-4xl overflow-hidden p-0"
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
            <div className="mx-auto flex h-6 max-w-[240px] flex-1 items-center justify-center rounded-md border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3">
              <span className="font-mono text-[10px] text-[var(--cv-muted)]">app.complivibe.in/workspace</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#0f9b6c] dark:text-[#34d399]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" /> live
            </span>
          </div>

          {/* tabs */}
          <div className="flex flex-wrap items-center gap-1 border-b border-[var(--cv-border)] px-3 py-3">
            {tabs.map((t) => {
              const TabIcon = t.icon;
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all duration-200 ${
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

          {/* panel */}
          <div className="min-h-[240px] p-4">
            <AnimatePresence mode="wait">
              <motion.div key={active} variants={panelMotion} initial="hidden" animate="show" exit="exit">
                {panels[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  5. WHY COMPLIVIBE                                                  */
/* ================================================================== */
const whyCards: { icon: LucideIcon; accent: string; title: string; body: string }[] = [
  {
    icon: Workflow,
    accent: "#2563eb",
    title: "Not static checklists",
    body: "CompliVibe connects workflows, evidence, risks, and reports.",
  },
  {
    icon: LayoutGrid,
    accent: "#7c3aed",
    title: "Not scattered spreadsheets",
    body: "Teams get one operating layer for AI trust.",
  },
  {
    icon: Network,
    accent: "#06b6d4",
    title: "Not compliance-only",
    body: "Governance, compliance, evidence, observability, and trust center work together.",
  },
  {
    icon: GitBranch,
    accent: "#10b981",
    title: "Not black-box automation",
    body: "AI-assisted workflows stay reviewable with human sign-off and audit trails.",
  },
];

function WhyDifferent({ reduced }: { reduced: boolean }) {
  return (
    <section className="aurora-bg overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        <SectionHeader
          kicker="Why CompliVibe"
          title="Not another checklist. A living"
          highlight="trust infrastructure layer."
        />
        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {whyCards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={item}
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="bento-card glass-highlight flex items-start gap-4 p-7"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: `${c.accent}14`, borderColor: `${c.accent}33` }}
                >
                  <Icon className="h-5 w-5" style={{ color: c.accent }} />
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--cv-muted)]">{c.body}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6. COVERAGE                                                        */
/* ================================================================== */
const frameworks = ["EU AI Act", "India DPDP", "ISO 42001", "NIST AI RMF", "SOC 2", "Colorado AI Act", "GDPR", "ISO 27001"];
const signals = ["AI inventory", "Evidence health", "Vendor risk", "Model changes", "Drift indicators", "Review status", "Trust reports"];

function Coverage() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        <SectionHeader
          kicker="Coverage"
          title="Map frameworks without making them the whole"
          highlight="product."
          subtitle="CompliVibe supports AI, privacy, security, and trust readiness frameworks — while keeping the platform centered on live AI trust operations."
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            className="liquid-card glass-highlight p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
              Frameworks mapped
            </p>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--cv-muted)]"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#2563eb] dark:text-[#3b82f6]" />
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="liquid-card glass-highlight p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
              Live trust signals
            </p>
            <div className="flex flex-wrap gap-2">
              {signals.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--cv-muted)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4]" />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7. FINAL CTA                                                       */
/* ================================================================== */
function FinalCTA({ reduced }: { reduced: boolean }) {
  return (
    <section className="aurora-bg relative overflow-hidden py-28 md:py-36">
      <div className="cv-container">
        <motion.div
          className="liquid-card glass-highlight mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-16 text-center md:px-12 md:py-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-[#2563eb] dark:text-[#3b82f6]" />
            <span className="text-[12px] text-[var(--cv-muted)]">The AI Trust OS</span>
          </span>
          <h2
            className="max-w-3xl text-balance"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--cv-ink)" }}
          >
            Build your AI trust layer before scale{" "}
            <span className="text-gradient-trust">breaks it</span>.
          </h2>
          <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-[var(--cv-muted)]">
            Start with one AI system. Expand into the operating layer for governance, evidence,
            monitoring, and trust.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div whileHover={reduced ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/book-demo"
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", boxShadow: "0 8px 28px rgba(37,99,235,0.28)" }}
              >
                Book a Demo
                <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={reduced ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/score"
                className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-medium text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
              >
                Start Trust Scan
                <ChevronRight className="h-[15px] w-[15px]" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ROOT                                                               */
/* ================================================================== */
export default function PlatformContent() {
  const reduced = useReducedMotion() ?? false;
  return (
    <>
      <Hero reduced={reduced} />
      <PlatformLayers reduced={reduced} />
      <Architecture reduced={reduced} />
      <CommandCenter reduced={reduced} />
      <WhyDifferent reduced={reduced} />
      <Coverage />
      <FinalCTA reduced={reduced} />
    </>
  );
}
