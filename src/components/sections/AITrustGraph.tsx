"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  BadgeCheck,
  BrainCircuit,
  Building2,
  Cpu,
  Database,
  FolderCheck,
  Network,
  ShieldCheck,
  Sparkles,
  User,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------------------------------------------- model */

const accents = {
  blue: "#2563eb",
  cyan: "#06b6d4",
  green: "#10b981",
  purple: "#7c3aed",
  amber: "#f59e0b",
} as const;

type AccentKey = keyof typeof accents;

type GraphNode = {
  id: string;
  label: string;
  meta?: string;
  Icon: LucideIcon;
  accent: AccentKey;
  x: number; // percent
  y: number; // percent
};

// Ring of 10 nodes around a central hub at (50, 50).
const NODES: GraphNode[] = [
  { id: "ai-system", label: "AI System", meta: "24 systems", Icon: Cpu, accent: "blue", x: 50, y: 9 },
  { id: "model", label: "Model", Icon: BrainCircuit, accent: "purple", x: 74, y: 17 },
  { id: "observability", label: "Observability Signal", meta: "live signals", Icon: Activity, accent: "cyan", x: 89, y: 38 },
  { id: "risk", label: "Risk", meta: "7 open risks", Icon: AlertTriangle, accent: "amber", x: 89, y: 63 },
  { id: "control", label: "Control", Icon: ShieldCheck, accent: "green", x: 74, y: 84 },
  { id: "trust-report", label: "Trust Report", meta: "customer-ready", Icon: BadgeCheck, accent: "green", x: 50, y: 92 },
  { id: "evidence", label: "Evidence", meta: "147 proofs", Icon: FolderCheck, accent: "cyan", x: 26, y: 84 },
  { id: "owner", label: "Owner", Icon: User, accent: "purple", x: 11, y: 63 },
  { id: "vendor", label: "Vendor", Icon: Building2, accent: "blue", x: 11, y: 38 },
  { id: "dataset", label: "Dataset", Icon: Database, accent: "cyan", x: 26, y: 17 },
];

const CORE = { id: "core", x: 50, y: 50 };

const CROSS_LINKS: [string, string][] = [
  ["ai-system", "model"],
  ["ai-system", "dataset"],
  ["model", "risk"],
  ["dataset", "risk"],
  ["vendor", "risk"],
  ["risk", "control"],
  ["control", "evidence"],
  ["evidence", "trust-report"],
  ["owner", "control"],
  ["observability", "risk"],
  ["observability", "trust-report"],
];

const pos = (id: string) => (id === "core" ? CORE : NODES.find((n) => n.id === id)!);

// Spokes that carry animated particles toward the centre's downstream proof chain.
const PARTICLE_TARGETS = ["risk", "evidence", "trust-report"];

const SIDE_CARDS = [
  {
    Icon: Network,
    title: "What it connects",
    body: "Systems, models, datasets, vendors, risks, controls, evidence, owners, and reports.",
    accent: "blue" as AccentKey,
  },
  {
    Icon: Workflow,
    title: "Why it matters",
    body: "Every governance decision becomes traceable, reviewable, and exportable.",
    accent: "purple" as AccentKey,
  },
  {
    Icon: Sparkles,
    title: "What teams get",
    body: "Live trust posture, evidence-backed reports, audit packs, and customer-ready proof.",
    accent: "green" as AccentKey,
  },
];

const MOBILE_CHAIN = ["ai-system", "risk", "control", "evidence", "trust-report"];

/* ---------------------------------------------------------------- node ui */

function NodeChip({ node, reduced, index }: { node: GraphNode; reduced: boolean; index: number }) {
  const accent = accents[node.accent];
  const Icon = node.Icon;
  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      variants={{
        hidden: { opacity: 0, scale: 0.7 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <motion.div
        role="group"
        aria-label={node.meta ? `${node.label}, ${node.meta}` : node.label}
        animate={reduced ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.5, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -4, scale: 1.05 }}
        className="flex items-center gap-2 rounded-2xl border border-slate-900/[0.07] bg-white/75 px-2.5 py-2 shadow-[0_6px_18px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <Icon size={15} />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="whitespace-nowrap text-[11px] font-semibold text-slate-800 dark:text-white">{node.label}</span>
          {node.meta && (
            <span className="whitespace-nowrap text-[9px] text-slate-400 dark:text-neutral-500">{node.meta}</span>
          )}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------- section */

export default function AITrustGraph() {
  const reduced = useReducedMotion() ?? false;

  const spokeAnim = (i: number) =>
    reduced
      ? { initial: { opacity: 1, pathLength: 1 }, animate: undefined }
      : {
          initial: { opacity: 0, pathLength: 0 },
          whileInView: { opacity: 1, pathLength: 1 },
          viewport: { once: true },
          transition: { duration: 1.1, delay: 0.3 + i * 0.05, ease: "easeInOut" as const },
        };

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } };

  return (
    <section className="aurora-bg relative overflow-hidden py-24 md:py-32" aria-label="AI Trust Graph">
      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-12 flex max-w-[720px] flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-kicker mb-4">AI Trust Graph</span>
          <h2 className="section-title">
            Trace every AI decision back to <span className="text-gradient-trust">proof</span>.
          </h2>
          <p className="section-subtitle mt-4">
            CompliVibe connects AI systems, models, datasets, vendors, risks, controls, evidence, owners,
            observability signals, and trust reports — so every AI system becomes explainable, governable, and
            audit-ready.
          </p>
          <p className="mt-5 text-[13px] font-medium text-slate-500 dark:text-neutral-400">
            Not a checklist. <span className="text-gradient-trust font-semibold">A living trust graph.</span>
          </p>
        </motion.div>

        {/* Graph + side cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Graph panel */}
          <motion.div
            className="liquid-card glass-highlight overflow-hidden lg:col-span-8"
            style={{ borderRadius: "1.5rem" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* App bar */}
            <div className="flex h-11 items-center justify-between border-b border-slate-900/[0.06] px-4 dark:border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="h-[9px] w-[9px] rounded-full bg-[#FF5F56]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#FFBD2E]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[11px] tracking-tight text-slate-400 dark:text-neutral-500">
                CompliVibe · AI Trust Graph
              </span>
              <div className="flex items-center gap-1.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/10 px-2 py-0.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#10b981]"
                  animate={reduced ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <span className="text-[9px] font-semibold text-[#059669] dark:text-[#34d399]">Live mapping</span>
              </div>
            </div>

            {/* Desktop radial graph */}
            <div className="relative hidden md:block">
              <div className="relative mx-auto h-[540px] w-full p-8">
                <div className="relative h-full w-full">
                  {/* connection lines */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="atg-spoke" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={accents.blue} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={accents.purple} stopOpacity="0.18" />
                      </linearGradient>
                    </defs>

                    {/* cross-links (flowing dashes) */}
                    {CROSS_LINKS.map(([from, to]) => {
                      const a = pos(from);
                      const b = pos(to);
                      return (
                        <motion.line
                          key={`x-${from}-${to}`}
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                          stroke="currentColor"
                          className="text-slate-300 dark:text-neutral-700"
                          strokeWidth="1"
                          strokeDasharray="2 3"
                          vectorEffect="non-scaling-stroke"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          animate={reduced ? undefined : { strokeDashoffset: [0, -10] }}
                          {...(!reduced && { transition: { strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.8, delay: 0.6 } } })}
                        />
                      );
                    })}

                    {/* spokes to the hub */}
                    {NODES.map((n, i) => (
                      <motion.line
                        key={`spoke-${n.id}`}
                        x1={CORE.x}
                        y1={CORE.y}
                        x2={n.x}
                        y2={n.y}
                        stroke="url(#atg-spoke)"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        {...spokeAnim(i)}
                      />
                    ))}
                  </svg>

                  {/* particles along proof-chain spokes */}
                  {!reduced &&
                    PARTICLE_TARGETS.map((id, i) => {
                      const t = pos(id);
                      return (
                        <motion.span
                          key={`p-${id}`}
                          className="absolute z-[5] h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: accents.cyan, boxShadow: `0 0 8px ${accents.cyan}` }}
                          initial={{ left: `${CORE.x}%`, top: `${CORE.y}%`, opacity: 0 }}
                          animate={{
                            left: [`${CORE.x}%`, `${t.x}%`],
                            top: [`${CORE.y}%`, `${t.y}%`],
                            opacity: [0, 1, 0],
                          }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                        />
                      );
                    })}

                  {/* nodes */}
                  <motion.div className="absolute inset-0" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {NODES.map((n, i) => (
                      <NodeChip key={n.id} node={n} reduced={reduced} index={i} />
                    ))}
                  </motion.div>

                  {/* core hub */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-3xl border border-white/40 text-center shadow-[0_18px_50px_rgba(37,99,235,0.35)] dark:border-white/15"
                      style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.92), rgba(124,58,237,0.92))" }}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-[13px] font-black text-white">
                        CV
                      </span>
                      <span className="px-2 text-[11px] font-semibold leading-tight text-white">AI Trust Graph</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Mobile vertical trust chain */}
            <div className="md:hidden">
              <motion.div
                className="flex flex-col items-center gap-0 px-5 py-6"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {MOBILE_CHAIN.map((id, i) => {
                  const n = pos(id) as GraphNode;
                  const accent = accents[n.accent];
                  const Icon = n.Icon;
                  return (
                    <div key={id} className="flex w-full max-w-[260px] flex-col items-center">
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                        className="flex w-full items-center gap-3 rounded-2xl border border-slate-900/[0.07] bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}1f`, color: accent }}>
                          <Icon size={17} />
                        </span>
                        <span className="flex flex-col leading-tight">
                          <span className="text-[13px] font-semibold text-slate-800 dark:text-white">{n.label}</span>
                          {n.meta && <span className="text-[10px] text-slate-400 dark:text-neutral-500">{n.meta}</span>}
                        </span>
                      </motion.div>
                      {i < MOBILE_CHAIN.length - 1 && (
                        <ArrowDown className="my-1.5 h-4 w-4 text-slate-300 dark:text-neutral-600" />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Insight strip */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-900/[0.06] px-4 py-3 dark:border-white/10">
              {[
                { value: "24", label: "AI systems mapped", color: accents.blue },
                { value: "147", label: "evidence proofs linked", color: accents.cyan },
                { value: "7", label: "open risks tracked", color: accents.amber },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="flex flex-wrap items-baseline gap-x-1.5">
                    <span className="font-mono text-[14px] font-bold text-slate-800 dark:text-white">{s.value}</span>
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Side cards */}
          <motion.div
            className="flex flex-col gap-5 lg:col-span-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SIDE_CARDS.map((card) => {
              const accent = accents[card.accent];
              const Icon = card.Icon;
              return (
                <motion.div
                  key={card.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bento-card glass-highlight flex flex-1 flex-col p-5"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl border"
                    style={{ backgroundColor: `${accent}14`, borderColor: `${accent}33`, color: accent }}
                  >
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 dark:text-neutral-400">{card.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
