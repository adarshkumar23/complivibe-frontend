"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  Eye,
  FileCheck,
  FolderLock,
  LayoutDashboard,
  Map,
  Network,
  Shield,
  ShieldCheck,
  Workflow,
} from "lucide-react";

/* ---------------------------------------------------------------- helpers */

const accents = {
  blue: "#2563eb",
  cyan: "#06b6d4",
  green: "#10b981",
  purple: "#7c3aed",
  amber: "#f59e0b",
} as const;

type AccentKey = keyof typeof accents;

const panelClass =
  "rounded-2xl border border-slate-900/[0.06] bg-white/60 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]";

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-[4px] overflow-hidden rounded-full bg-slate-900/[0.06] dark:bg-white/10">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

/* ---------------------------------------------------------------- visuals */

function CommandCenterVisual({ reduced }: { reduced: boolean }) {
  const stats = [
    { label: "AI Trust Score", value: "87", color: accents.blue },
    { label: "AI Systems", value: "24", color: accents.purple },
    { label: "Open Risks", value: "7", color: accents.amber },
    { label: "Evidence", value: "91%", color: accents.green },
  ];
  const bars = [
    { label: "Governance", value: 84, color: accents.green },
    { label: "Evidence", value: 91, color: accents.purple },
    { label: "Risk", value: 72, color: accents.amber },
  ];
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-5">
      <div className="grid grid-cols-2 gap-2.5 sm:col-span-3">
        {stats.map((s) => (
          <div key={s.label} className={panelClass}>
            <div className="text-[8.5px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
              {s.label}
            </div>
            <div className="mt-1 font-mono text-[22px] font-bold leading-none" style={{ color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className={`${panelClass} sm:col-span-2`}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8.5px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
            Live posture
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#10b981]"
            animate={reduced ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex items-center justify-between text-[10px] text-slate-600 dark:text-neutral-300">
                <span>{b.label}</span>
                <span className="font-mono text-slate-500 dark:text-neutral-400">{b.value}</span>
              </div>
              <MiniBar value={b.value} color={b.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustGraphVisual({ reduced }: { reduced: boolean }) {
  const nodes = [
    { x: 22, label: "System", color: accents.blue },
    { x: 98, label: "Risk", color: accents.amber },
    { x: 174, label: "Control", color: accents.purple },
    { x: 250, label: "Evidence", color: accents.green },
  ];
  return (
    <div className="mt-5">
      <svg className="h-[120px] w-full" viewBox="0 0 272 120" role="img" aria-label="AI trust graph: system to risk to control to evidence">
        {nodes.slice(0, -1).map((n, i) => (
          <line
            key={`edge-${i}`}
            x1={n.x}
            y1={60}
            x2={nodes[i + 1].x}
            y2={60}
            stroke="currentColor"
            className="text-slate-300 dark:text-neutral-600"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          >
            {!reduced && (
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.2s" repeatCount="indefinite" />
            )}
          </line>
        ))}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.x}
              cy={60}
              r="15"
              fill={`${n.color}1f`}
              stroke={n.color}
              strokeWidth="1.5"
              animate={reduced ? undefined : { opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
            />
            <text x={n.x} y={92} textAnchor="middle" fontSize="9" className="fill-slate-500 dark:fill-neutral-400">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function GovernanceVisual() {
  const steps = [
    { label: "Owner assigned", state: "done" },
    { label: "Policy applied", state: "done" },
    { label: "Review in progress", state: "active" },
    { label: "Human sign-off", state: "queued" },
  ];
  return (
    <div className={`mt-5 ${panelClass} space-y-2`}>
      {steps.map((s) => (
        <div key={s.label} className="flex items-center gap-2 text-[11px]">
          {s.state === "done" && <CheckCircle2 size={13} className="text-[#10b981]" />}
          {s.state === "active" && (
            <span className="flex h-[13px] w-[13px] items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#2563eb] bg-[#2563eb]/30" />
            </span>
          )}
          {s.state === "queued" && <span className="h-[13px] w-[13px] rounded-full border-2 border-slate-300 dark:border-neutral-600" />}
          <span
            className={
              s.state === "active"
                ? "font-medium text-[#2563eb]"
                : s.state === "queued"
                  ? "text-slate-400 dark:text-neutral-600"
                  : "text-slate-600 dark:text-neutral-300"
            }
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function EvidenceVisual() {
  return (
    <div className="mt-5 flex items-center gap-3">
      <div className="relative h-[64px] w-[52px] shrink-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-lg border border-slate-900/[0.08] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.06]"
            style={{ inset: 0, transform: `translate(${i * 5}px, ${i * 5}px)`, zIndex: 3 - i }}
          />
        ))}
        <FolderLock className="absolute left-2 top-2 z-10 h-4 w-4 text-[#10b981]" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className={`${panelClass} flex items-center justify-between`}>
          <span className="text-[10px] text-slate-500 dark:text-neutral-400">Documents</span>
          <span className="font-mono text-[13px] font-bold text-slate-800 dark:text-white">147</span>
        </div>
        <div className={`${panelClass} flex items-center justify-between`}>
          <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-neutral-400">
            <ShieldCheck size={11} className="text-[#10b981]" /> Integrity
          </span>
          <span className="font-mono text-[13px] font-bold text-[#10b981]">100%</span>
        </div>
      </div>
    </div>
  );
}

function ObservabilityVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-5">
      <svg className="h-[80px] w-full" viewBox="0 0 240 80" role="img" aria-label="Observability signals">
        <defs>
          <linearGradient id="bentoUsage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accents.cyan} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accents.cyan} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,54 L34,46 L68,50 L102,34 L136,40 L170,26 L204,32 L240,20 L240,80 L0,80 Z" fill="url(#bentoUsage)" />
        <polyline points="0,54 34,46 68,50 102,34 136,40 170,26 204,32 240,20" fill="none" stroke={accents.cyan} strokeWidth="1.5" strokeLinejoin="round" />
        <polyline points="0,66 40,62 80,64 120,56 160,58 200,52 240,54" fill="none" stroke={accents.purple} strokeWidth="1.25" strokeDasharray="3 3" />
        <polyline points="0,74 40,72 80,75 120,70 160,72 200,68 240,71" fill="none" stroke={accents.amber} strokeWidth="1.25" />
        <motion.circle
          cx="136"
          cy="40"
          r="3.5"
          fill={accents.amber}
          animate={reduced ? undefined : { opacity: [1, 0.3, 1], r: [3.5, 5, 3.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </svg>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
        {[
          { c: accents.cyan, l: "usage" },
          { c: accents.purple, l: "drift" },
          { c: accents.amber, l: "latency / incident" },
        ].map((x) => (
          <span key={x.l} className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: x.c }} />
            <span className="text-[8.5px] text-slate-500 dark:text-neutral-400">{x.l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ComplianceMatrixVisual() {
  const cols = ["EU", "DPDP", "ISO"];
  const rows = [
    { label: "Transparency", cells: [true, true, false] },
    { label: "Risk mgmt", cells: [true, true, true] },
    { label: "Data gov", cells: [true, false, true] },
    { label: "Oversight", cells: [false, true, true] },
  ];
  return (
    <div className={`mt-5 ${panelClass}`}>
      <div className="mb-2 grid grid-cols-[1fr_repeat(3,28px)] items-center gap-1 text-[8.5px] font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
        <span>Obligation</span>
        {cols.map((c) => (
          <span key={c} className="text-center">{c}</span>
        ))}
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_repeat(3,28px)] items-center gap-1">
            <span className="truncate text-[10px] text-slate-600 dark:text-neutral-300">{r.label}</span>
            {r.cells.map((on, i) => (
              <span key={i} className="flex justify-center">
                {on ? (
                  <CheckCircle2 size={12} className="text-[#10b981]" />
                ) : (
                  <span className="h-2 w-2 rounded-full border border-slate-300 dark:border-neutral-600" />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function VendorRiskVisual() {
  const vendors = [
    { name: "OpenAI API", level: "Low", color: accents.green },
    { name: "Anthropic", level: "Low", color: accents.green },
    { name: "Vector DB", level: "Med", color: accents.amber },
    { name: "Legacy LLM", level: "High", color: "#ef4444" },
  ];
  return (
    <div className="mt-5 space-y-1.5">
      {vendors.map((v) => (
        <div key={v.name} className={`${panelClass} flex items-center justify-between !py-2`}>
          <span className="truncate text-[10.5px] text-slate-600 dark:text-neutral-300">{v.name}</span>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold"
            style={{ color: v.color, backgroundColor: `${v.color}1f` }}
          >
            {v.level}
          </span>
        </div>
      ))}
    </div>
  );
}

function TrustCenterVisual() {
  return (
    <div className={`mt-5 ${panelClass} flex items-center gap-3`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb]/15 to-[#10b981]/15">
        <ShieldCheck className="h-6 w-6 text-[#10b981]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-800 dark:text-white">AI Trust Report</span>
          <BadgeCheck size={12} className="text-[#10b981]" />
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="font-mono text-[18px] font-bold text-[#2563eb]">87</span>
          <span className="text-[9px] text-slate-400 dark:text-neutral-500">/100 · Verified</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {["EU AI Act", "SOC 2", "ISO 42001"].map((t) => (
            <span key={t} className="rounded-full bg-slate-900/[0.05] px-1.5 py-0.5 text-[8px] text-slate-500 dark:bg-white/10 dark:text-neutral-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuditPackVisual() {
  const steps = [
    { label: "Collect evidence", state: "done" },
    { label: "Map controls", state: "done" },
    { label: "Compile pack", state: "active" },
    { label: "Export PDF", state: "queued" },
  ];
  return (
    <div className="mt-5 space-y-0">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-stretch gap-2.5">
          <div className="flex flex-col items-center">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                s.state === "done"
                  ? "bg-[#10b981]"
                  : s.state === "active"
                    ? "bg-[#2563eb] ring-4 ring-[#2563eb]/15"
                    : "border-2 border-slate-300 dark:border-neutral-600"
              }`}
            />
            {i < steps.length - 1 && <span className="my-0.5 w-px flex-1 bg-slate-200 dark:bg-neutral-700" />}
          </div>
          <span
            className={`pb-2.5 text-[11px] ${
              s.state === "active"
                ? "font-medium text-[#2563eb]"
                : s.state === "queued"
                  ? "text-slate-400 dark:text-neutral-600"
                  : "text-slate-600 dark:text-neutral-300"
            }`}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function RegulatoryMappingVisual() {
  const frameworks = [
    { label: "EU AI Act", value: 82, color: accents.blue },
    { label: "India DPDP", value: 76, color: accents.green },
    { label: "ISO 42001", value: 78, color: accents.purple },
    { label: "NIST AI RMF", value: 73, color: accents.blue },
    { label: "SOC 2", value: 90, color: accents.green },
    { label: "Colorado AI Act", value: 65, color: accents.amber },
  ];
  return (
    <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {frameworks.map((f) => (
        <div key={f.label} className={panelClass}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="truncate text-[10px] font-medium text-slate-600 dark:text-neutral-300">{f.label}</span>
            <span className="font-mono text-[10px] text-slate-400 dark:text-neutral-500">{f.value}%</span>
          </div>
          <MiniBar value={f.value} color={f.color} />
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- cards */

type Card = {
  name: string;
  desc: string;
  icon: typeof Shield;
  accent: AccentKey;
  span: string;
  Visual: (props: { reduced: boolean }) => React.ReactElement;
};

const cards: Card[] = [
  {
    name: "AI Trust Command Center",
    desc: "See AI systems, risks, evidence, controls, incidents, and trust posture in one live workspace.",
    icon: LayoutDashboard,
    accent: "blue",
    span: "lg:col-span-7",
    Visual: CommandCenterVisual,
  },
  {
    name: "AI Trust Graph",
    desc: "Connect every AI system to its models, datasets, vendors, risks, controls, evidence, and trust reports.",
    icon: Network,
    accent: "purple",
    span: "lg:col-span-5",
    Visual: TrustGraphVisual,
  },
  {
    name: "AI Governance OS",
    desc: "Assign owners, policies, approvals, reviews, and human sign-off across the AI lifecycle.",
    icon: Shield,
    accent: "blue",
    span: "lg:col-span-4",
    Visual: GovernanceVisual,
  },
  {
    name: "Evidence Vault",
    desc: "Keep policies, logs, approvals, screenshots, controls, and audit proof in one governed repository.",
    icon: FolderLock,
    accent: "green",
    span: "lg:col-span-4",
    Visual: EvidenceVisual,
  },
  {
    name: "Data Observability",
    desc: "Monitor AI usage, drift indicators, incidents, latency, errors, and production trust signals.",
    icon: Activity,
    accent: "cyan",
    span: "lg:col-span-4",
    Visual: ObservabilityVisual,
  },
  {
    name: "Compliance Automation",
    desc: "Map obligations across global frameworks and turn them into evidence-backed workflows.",
    icon: Workflow,
    accent: "blue",
    span: "lg:col-span-5",
    Visual: ComplianceMatrixVisual,
  },
  {
    name: "Vendor & Model Risk",
    desc: "Track third-party AI vendors, LLM APIs, model changes, and exposure before they become risk.",
    icon: Eye,
    accent: "amber",
    span: "lg:col-span-3",
    Visual: VendorRiskVisual,
  },
  {
    name: "Trust Center",
    desc: "Publish customer-ready AI trust posture, readiness reports, and evidence summaries.",
    icon: BadgeCheck,
    accent: "green",
    span: "lg:col-span-4",
    Visual: TrustCenterVisual,
  },
  {
    name: "Audit Pack Generator",
    desc: "Generate board-ready, customer-ready, and auditor-ready trust packs from live evidence.",
    icon: FileCheck,
    accent: "purple",
    span: "lg:col-span-4",
    Visual: AuditPackVisual,
  },
  {
    name: "Regulatory Mapping",
    desc: "Map EU AI Act, India DPDP, ISO 42001, NIST AI RMF, SOC 2, and Colorado AI Act together.",
    icon: Map,
    accent: "cyan",
    // widened to fill the final row cleanly — the obligation map reads well wide
    span: "lg:col-span-8",
    Visual: RegulatoryMappingVisual,
  },
];

/* ------------------------------------------------------------------ section */

export default function ProductBentoGrid() {
  const reduced = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="aurora-bg relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-14 flex max-w-[680px] flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-kicker mb-4">AI Trust Infrastructure</span>
          <h2 className="section-title">
            One operating layer for <span className="text-gradient-trust">AI trust</span>.
          </h2>
          <p className="section-subtitle mt-4">
            Govern AI systems, automate evidence, monitor risk and observability signals, and publish trust
            from one infrastructure layer.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            const accent = accents[card.accent];
            const Visual = card.Visual;
            return (
              <motion.article
                key={card.name}
                variants={item}
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`bento-card glass-highlight group relative flex flex-col p-6 ${card.span}`}
              >
                {/* soft colored glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at center, ${accent}24, transparent 70%)` }}
                />

                <header className="relative flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                    style={{ backgroundColor: `${accent}14`, borderColor: `${accent}33` }}
                  >
                    <Icon size={18} style={{ color: accent }} />
                  </span>
                  <h3 className="text-[16px] font-semibold leading-tight text-slate-900 dark:text-white">
                    {card.name}
                  </h3>
                </header>

                <p className="relative mt-3 text-[13px] leading-relaxed text-slate-500 dark:text-neutral-400">
                  {card.desc}
                </p>

                <div className="relative mt-auto">
                  <Visual reduced={reduced} />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
