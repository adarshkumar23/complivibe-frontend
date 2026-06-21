"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Blocks,
  ChevronRight,
  Clock,
  Cpu,
  FolderOpen,
  LayoutDashboard,
  ListChecks,
  Lock,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  FlaskConical,
} from "lucide-react";

/* ------------------------------------------------------------------ data */

const proofChips = [
  { icon: Users, label: "3 paying customers", accent: "#2563eb" },
  { icon: FlaskConical, label: "5 beta trials", accent: "#06b6d4" },
  { icon: Clock, label: "13-account waitlist", accent: "#7c3aed" },
  { icon: ListChecks, label: "828 mapped obligations", accent: "#10b981" },
  { icon: Blocks, label: "23+ integrations", accent: "#f59e0b" },
];

const sidebarItems = [
  { label: "Command Center", Icon: LayoutDashboard, active: true },
  { label: "AI Systems", Icon: Cpu },
  { label: "Governance", Icon: Shield },
  { label: "Compliance", Icon: Scale },
  { label: "Observability", Icon: Activity },
  { label: "Evidence", Icon: FolderOpen },
];

const scoreCards = [
  { label: "AI Trust Score", Icon: ShieldCheck, value: 87, accent: "#2563eb" },
  { label: "Governance Health", Icon: Shield, value: 84, accent: "#10b981" },
  { label: "Evidence Health", Icon: FolderOpen, value: 91, accent: "#7c3aed" },
  { label: "Risk Health", Icon: AlertTriangle, value: 72, accent: "#f59e0b" },
];

const frameworks = [
  { label: "EU AI Act", value: 82, accent: "#2563eb" },
  { label: "India DPDP", value: 76, accent: "#10b981" },
  { label: "ISO 42001", value: 78, accent: "#7c3aed" },
  { label: "NIST AI RMF", value: 73, accent: "#2563eb" },
  { label: "SOC 2", value: 90, accent: "#10b981" },
  { label: "Colorado AI Act", value: 65, accent: "#f59e0b" },
];

const trustGraphNodes = [
  { label: "AI System", accent: "#2563eb" },
  { label: "Risk", accent: "#f59e0b" },
  { label: "Control", accent: "#7c3aed" },
  { label: "Evidence", accent: "#10b981" },
  { label: "Trust Report", accent: "#06b6d4" },
];

/* -------------------------------------------------------------- mockup ui */

function ScoreCard({ card }: { card: (typeof scoreCards)[number] }) {
  const Icon = card.Icon;
  return (
    <div className="rounded-2xl border border-slate-900/[0.06] bg-white/70 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] md:p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500 md:text-[9px]">
          {card.label}
        </span>
        <Icon className="h-3 w-3" style={{ color: card.accent }} />
      </div>
      <div className="mt-2 flex items-end gap-1">
        <span className="font-mono text-[26px] font-bold leading-none md:text-[30px]" style={{ color: card.accent }}>
          {card.value}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-neutral-600">/100</span>
      </div>
      <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-slate-900/[0.06] dark:bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${card.value}%`, backgroundColor: card.accent }} />
      </div>
    </div>
  );
}

function CommandCenter({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="mx-auto mt-16 w-full max-w-[1000px]"
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="relative">
          {/* Aura behind the panel */}
          <div
            className="pointer-events-none absolute -inset-10 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.18), transparent 65%)",
            }}
          />

          <div
            className="liquid-card glass-highlight overflow-hidden"
            style={{ borderRadius: "1.5rem" }}
          >
            {/* App bar */}
            <div className="flex h-11 items-center gap-3 border-b border-slate-900/[0.06] bg-white/60 px-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-1.5">
                <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F56]" />
                <div className="h-[9px] w-[9px] rounded-full bg-[#FFBD2E]" />
                <div className="h-[9px] w-[9px] rounded-full bg-[#27C93F]" />
              </div>
              <div className="mx-4 flex-1">
                <div className="mx-auto flex h-6 max-w-[150px] items-center gap-2 rounded-md border border-slate-900/[0.06] bg-slate-900/[0.03] px-3 dark:border-white/10 dark:bg-white/5 md:max-w-[280px]">
                  <Lock className="h-2.5 w-2.5 shrink-0 text-slate-400 dark:text-neutral-500" />
                  <span className="truncate font-mono text-[10px] text-slate-400 dark:text-neutral-500">
                    app.complivibe.in/dashboard
                  </span>
                </div>
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/10 px-2 py-0.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#10b981]"
                  animate={reduced ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <span className="text-[9px] font-semibold text-[#059669] dark:text-[#34d399]">Live trust posture</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-row bg-gradient-to-b from-white/40 to-slate-50/40 dark:from-transparent dark:to-transparent">
              {/* Sidebar */}
              <aside className="hidden w-[180px] shrink-0 flex-col border-r border-slate-900/[0.06] py-3 dark:border-white/10 md:flex">
                <div className="mb-4 flex items-center gap-2 px-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563eb] to-[#7c3aed]">
                    <span className="text-[11px] font-black text-white">CV</span>
                  </div>
                  <span className="text-[13px] font-semibold text-slate-800 dark:text-white">CompliVibe</span>
                </div>
                <nav className="space-y-0.5 px-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.Icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium ${
                          item.active
                            ? "bg-[#2563eb]/[0.08] text-[#2563eb] dark:bg-white/[0.08] dark:text-white"
                            : "text-slate-500 dark:text-neutral-500"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {item.label}
                      </div>
                    );
                  })}
                </nav>
                <div className="mt-auto px-3 pt-4">
                  <div className="rounded-xl border border-[#2563eb]/15 bg-[#2563eb]/[0.06] p-2.5">
                    <div className="mb-0.5 text-[9px] font-semibold text-[#2563eb]">Platform Status</div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-[5px] w-[5px] rounded-full bg-[#10b981]" />
                      <span className="text-[9px] text-slate-500 dark:text-neutral-400">All systems operational</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main */}
              <main className="flex w-full flex-1 flex-col">
                {/* Toolbar */}
                <div className="flex h-10 items-center gap-3 border-b border-slate-900/[0.06] px-3 dark:border-white/10 md:px-4">
                  <span className="truncate text-[11px] font-semibold text-slate-800 dark:text-white">Command Center</span>
                  <span className="hidden text-[9px] text-slate-300 dark:text-neutral-600 md:inline">/ Overview</span>
                  <div className="mx-2 hidden max-w-[200px] flex-1 sm:block md:mx-4">
                    <div className="flex h-6 items-center gap-2 rounded-md border border-slate-900/[0.06] bg-slate-900/[0.03] px-2.5 dark:border-white/10 dark:bg-white/5">
                      <Search className="h-2.5 w-2.5 shrink-0 text-slate-400 dark:text-neutral-500" />
                      <span className="truncate text-[10px] text-slate-400 dark:text-neutral-500">Search systems, risks…</span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-md border border-[#2563eb]/25 bg-[#2563eb]/10 px-2 py-0.5">
                      <Sparkles className="h-2.5 w-2.5 text-[#2563eb]" />
                      <span className="hidden text-[9px] font-semibold text-[#2563eb] sm:inline">Ask Copilot</span>
                    </div>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-900/[0.06] bg-white/70 dark:border-white/10 dark:bg-white/5">
                      <Bell className="h-[11px] w-[11px] text-slate-400 dark:text-neutral-500" />
                    </div>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed]">
                      <span className="text-[9px] font-bold text-white">A</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-3 md:p-4">
                  {/* Score cards */}
                  <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
                    {scoreCards.map((card) => (
                      <ScoreCard key={card.label} card={card} />
                    ))}
                  </div>

                  {/* Mid row */}
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                    {/* Framework readiness */}
                    <div className="rounded-2xl border border-slate-900/[0.06] bg-white/70 p-3.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] md:col-span-5">
                      <div className="mb-2.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
                        Framework Readiness
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {frameworks.map((f) => (
                          <div key={f.label} className="flex items-center gap-2">
                            <span className="w-[88px] shrink-0 truncate text-[10px] text-slate-600 dark:text-neutral-300">{f.label}</span>
                            <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-slate-900/[0.06] dark:bg-white/10">
                              <div className="h-full rounded-full" style={{ width: `${f.value}%`, backgroundColor: f.accent }} />
                            </div>
                            <span className="w-7 text-right font-mono text-[10px] text-slate-500 dark:text-neutral-400">{f.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Observability */}
                    <div className="hidden rounded-2xl border border-slate-900/[0.06] bg-white/70 p-3.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] md:col-span-4 md:block">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">Observability</span>
                        <span className="text-[9px] text-[#2563eb]">Live</span>
                      </div>
                      <svg className="h-[88px] w-full" viewBox="0 0 240 88" role="img" aria-label="Observability signals">
                        <defs>
                          <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* usage signal area */}
                        <path d="M0,60 L30,52 L60,56 L90,40 L120,46 L150,30 L180,38 L210,24 L240,30 L240,88 L0,88 Z" fill="url(#usageFill)" />
                        <polyline points="0,60 30,52 60,56 90,40 120,46 150,30 180,38 210,24 240,30" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
                        {/* drift indicator dashed */}
                        <polyline points="0,72 40,68 80,70 120,62 160,64 200,58 240,60" fill="none" stroke="#7c3aed" strokeWidth="1.25" strokeDasharray="3 3" />
                        {/* latency/error line */}
                        <polyline points="0,80 40,78 80,82 120,76 160,79 200,74 240,77" fill="none" stroke="#f59e0b" strokeWidth="1.25" />
                      </svg>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <Legend color="#2563eb" label="usage signal" />
                        <Legend color="#7c3aed" label="drift indicator" />
                        <Legend color="#f59e0b" label="latency / error" />
                      </div>
                    </div>

                    {/* Copilot */}
                    <div className="rounded-2xl border border-[#2563eb]/15 bg-gradient-to-br from-[#2563eb]/[0.07] to-[#7c3aed]/[0.07] p-3.5 dark:border-white/10 md:col-span-3">
                      <div className="mb-2 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#2563eb]" />
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#2563eb]">AI Copilot</span>
                      </div>
                      <p className="text-[12px] font-semibold leading-snug text-slate-800 dark:text-white">
                        3 governance gaps need review
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-neutral-400">
                        Model transparency, vendor risk, retention policy.
                      </p>
                      <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-[#2563eb] px-2.5 py-1 text-[10px] font-semibold text-white">
                        Review <ArrowRight className="h-2.5 w-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Trust graph */}
                  <div className="rounded-2xl border border-slate-900/[0.06] bg-white/70 p-3.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">AI Trust Graph</span>
                      <span className="hidden text-[9px] text-[#2563eb] sm:inline">Explore →</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {trustGraphNodes.map((node, i) => (
                        <div key={node.label} className="flex items-center gap-1.5">
                          <div
                            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1"
                            style={{ borderColor: `${node.accent}40`, backgroundColor: `${node.accent}12` }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: node.accent }} />
                            <span className="text-[10px] font-medium text-slate-700 dark:text-neutral-200">{node.label}</span>
                          </div>
                          {i < trustGraphNodes.length - 1 && (
                            <ChevronRight className="h-3 w-3 text-slate-300 dark:text-neutral-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[8.5px] text-slate-500 dark:text-neutral-400">{label}</span>
    </span>
  );
}

/* ---------------------------------------------------------------- hero */

export default function Hero() {
  const reduced = useReducedMotion() ?? false;

  const fade = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } },
  });

  return (
    <section className="aurora-bg relative flex min-h-screen flex-col items-center overflow-hidden px-6 pb-24 pt-32">
      {/* Fine grid, masked toward the top */}
      <div
        className="fine-grid pointer-events-none absolute inset-0 opacity-60"
        style={{ maskImage: "radial-gradient(ellipse 75% 55% at 50% 0%, black 30%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 0%, black 30%, transparent 100%)" }}
      />
      {/* Deep navy glow for dark mode */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30,58,138,0.28), transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center gap-6 text-center">
        {/* Badge */}
        <motion.div initial="hidden" animate="show" variants={fade(0)}>
          <div className="liquid-glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="flex items-center gap-1">
              <span className="h-[5px] w-[5px] rounded-full bg-[#2563eb]" />
              <span className="h-[5px] w-[5px] rounded-full bg-[#06b6d4]" />
              <span className="h-[5px] w-[5px] rounded-full bg-[#7c3aed]" />
            </span>
            <span className="h-3 w-px bg-slate-900/10 dark:bg-white/15" />
            <span className="text-[11px] font-medium tracking-tight text-slate-600 dark:text-neutral-300 md:text-[12px]">
              AI Governance · Compliance · Observability
            </span>
          </div>
        </motion.div>

        {/* Headline with blur-to-clear */}
        <motion.h1
          className="px-2 font-semibold text-slate-900 dark:text-white md:px-0"
          style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 1.04 }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          The <span className="text-gradient-trust">trust layer</span> for every AI system you ship.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="max-w-[600px] text-[1rem] leading-relaxed text-slate-500 dark:text-neutral-400 md:text-[1.15rem]"
          initial="hidden"
          animate="show"
          variants={fade(0.22)}
        >
          CompliVibe brings AI governance, compliance automation, evidence, risk monitoring, and data
          observability into one operating layer — so modern companies can prove trust without slowing down.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial="hidden"
          animate="show"
          variants={fade(0.32)}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Link
              href="/score"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow: "0 8px 24px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              Start Trust Scan
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/platform"
              className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-slate-700 transition-colors hover:text-slate-900 dark:text-neutral-200 dark:hover:text-white"
            >
              View Platform
              <ChevronRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Proof chips */}
        <motion.div
          className="mt-1 flex flex-wrap items-center justify-center gap-2"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.44 } } }}
        >
          {proofChips.map((chip) => {
            const Icon = chip.icon;
            return (
              <motion.div
                key={chip.label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/[0.07] bg-white/60 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <Icon className="h-3 w-3" style={{ color: chip.accent }} />
                <span className="text-[11px] font-medium text-slate-600 dark:text-neutral-300">{chip.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <CommandCenter reduced={reduced} />
    </section>
  );
}
