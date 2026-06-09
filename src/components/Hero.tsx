"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Cpu,
  FolderOpen,
  LayoutDashboard,
  Lock,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Spotlight } from "./ui/spotlight";

const sidebarItems = [
  { label: "Command Center", Icon: LayoutDashboard, active: true },
  { label: "AI Systems", Icon: Cpu },
  { label: "Governance", Icon: Shield },
  { label: "Observability", Icon: Activity },
  { label: "Evidence", Icon: FolderOpen },
  { label: "Compliance", Icon: Scale },
];

const scoreCards = [
  { label: "AI Trust Score", Icon: Shield, value: "87", color: "#0070F3", sub: "Strong governance posture", progress: "87%", gradient: "from-[#0070F3] to-[#00C48C]" },
  { label: "Governance Score", Icon: CheckSquare, value: "84", color: "#00C48C", sub: "Governance Score", progress: "84%", gradient: "from-[#00C48C] to-[#0070F3]" },
  { label: "Risk Health", Icon: AlertTriangle, value: "72", color: "#F5A623", sub: "Risk Health", progress: "72%", gradient: "from-[#F5A623] to-[#FF3B3B]" },
  { label: "Evidence Health", Icon: FolderOpen, value: "91", color: "#7928CA", sub: "Evidence Health", progress: "91%", gradient: "from-[#7928CA] to-[#0070F3]" },
];

const readinessRows = [
  { marker: "🇪🇺", label: "EU AI Act", value: "82%", color: "#0070F3" },
  { marker: "🇮🇳", label: "India DPDP", value: "76%", color: "#00C48C" },
  { marker: "CO", label: "Colorado AI Act", value: "65%", color: "#F5A623" },
  { marker: "SOC", label: "SOC 2", value: "90%", color: "#00C48C" },
  { marker: "ISO", label: "ISO 42001", value: "78%", color: "#7928CA" },
  { marker: "NI", label: "NIST AI RMF", value: "73%", color: "#0070F3" },
];

const priorityActions = [
  { tone: "critical", badge: "HIGH", title: "Address model transparency gap", due: "Due in 2 days", detail: "AI Recommendation Engine" },
  { tone: "high", badge: "HIGH", title: "Review vendor risk assessment", due: "Due in 3 days", detail: "Vendor LLM API" },
  { tone: "medium", badge: "MEDIUM", title: "Update data retention policy", due: "Due in 8 days", detail: "Customer data pipeline" },
];

const activityEvents = [
  { color: "#00C48C", text: "Annex IV generated · 4m ago" },
  { color: "#0070F3", text: "Risk scan complete · 18m ago" },
  { color: "#F5A623", text: "DPDP update synced · 1h ago" },
  { color: "#FF3B3B", text: "Vendor alert triggered · 2h ago" },
];

function ScoreCard({ card }: { card: (typeof scoreCards)[number] }) {
  const Icon = card.Icon;

  return (
    <div className="col-span-1 rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-[#444]">{card.label}</span>
        <Icon className="h-[11px] w-[11px]" style={{ color: card.color }} />
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="font-mono text-[32px] font-bold leading-none" style={{ color: card.color }}>
          {card.value}
        </span>
        <span className="text-[12px] text-[#333]">/100</span>
      </div>
      <div className="mt-1 text-[9px] text-[#444]">{card.sub}</div>
      <div className="mt-2 h-[3px] rounded-full bg-[#111]">
        <div className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`} style={{ width: card.progress }} />
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="mx-auto mt-14 w-full max-w-[960px]">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="pointer-events-none absolute -inset-8"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,112,243,0.10) 0%, transparent 60%)",
            }}
          />

          <div
            className="relative overflow-hidden rounded-xl border border-white/[0.10] bg-[#080808]"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 50px 120px rgba(0,0,0,0.9)",
            }}
          >
            <div className="flex h-10 items-center gap-3 border-b border-white/[0.07] bg-[#0F0F0F] px-4">
              <div className="flex items-center gap-1.5">
                <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F56]" />
                <div className="h-[9px] w-[9px] rounded-full bg-[#FFBD2E]" />
                <div className="h-[9px] w-[9px] rounded-full bg-[#27C93F]" />
              </div>
              <div className="mx-1 h-3.5 w-px bg-white/[0.08]" />
              <div className="mx-4 flex-1">
                <div className="mx-auto flex h-6 max-w-[280px] items-center gap-2 rounded-md border border-white/[0.06] bg-[#1a1a1a] px-3">
                  <Lock className="h-2.5 w-2.5 text-[#333]" />
                  <span className="font-mono text-[10px] text-[#333]">app.complivibe.in/dashboard</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-[#00C48C]"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span className="font-mono text-[11px] text-[#00C48C]">LIVE</span>
              </div>
            </div>

            <div className="bg-[#080808] p-4">
              <div className="flex h-[520px] flex-row overflow-hidden">
                <aside className="flex w-[180px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0D0D0D] py-3">
                  <div className="mb-4 flex items-center gap-2 px-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0070F3] to-[#7928CA]">
                      <span className="text-[11px] font-black text-white">CV</span>
                    </div>
                    <span className="text-[13px] font-semibold text-white">CompliVibe</span>
                  </div>

                  <nav className="space-y-0.5 px-2">
                    {sidebarItems.map((item) => {
                      const Icon = item.Icon;
                      return (
                        <div
                          key={item.label}
                          className={`flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium ${
                            item.active ? "bg-white/[0.08] text-white" : "text-[#555]"
                          }`}
                        >
                          <Icon className="h-3 w-3" />
                          {item.label}
                        </div>
                      );
                    })}
                  </nav>

                  <div className="mt-auto px-3 pb-2">
                    <div className="rounded-lg border border-[#0070F3]/20 bg-[#0070F3]/10 p-2.5">
                      <div className="mb-0.5 text-[9px] font-semibold text-[#0070F3]">Platform Status</div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-[5px] w-[5px] rounded-full bg-[#00C48C]" />
                        <span className="text-[9px] text-[#555]">All systems operational</span>
                      </div>
                    </div>
                  </div>
                </aside>

                <main className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex h-10 items-center gap-3 border-b border-white/[0.06] bg-[#0D0D0D] px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-white">Command Center</span>
                      <span className="text-[9px] text-[#333]">/</span>
                      <span className="text-[9px] text-[#444]">Overview</span>
                    </div>
                    <div className="mx-4 max-w-[220px] flex-1">
                      <div className="flex h-6 items-center gap-2 rounded-md border border-white/[0.06] bg-[#111] px-2.5">
                        <Search className="h-2.5 w-2.5 text-[#333]" />
                        <span className="text-[10px] text-[#333]">Search systems, risks...</span>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-md border border-[#0070F3]/30 bg-[#0070F3]/15 px-2 py-0.5">
                        <Sparkles className="h-2.5 w-2.5 text-[#0070F3]" />
                        <span className="text-[9px] font-semibold text-[#0070F3]">Ask Copilot</span>
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-[#1a1a1a]">
                        <Bell className="h-[11px] w-[11px] text-[#555]" />
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#0070F3] to-[#7928CA]">
                        <span className="text-[9px] font-bold text-white">A</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid flex-1 grid-cols-12 gap-3 overflow-hidden p-4">
                    <div className="col-span-12 grid grid-cols-4 gap-3">
                      {scoreCards.map((card) => (
                        <ScoreCard key={card.label} card={card} />
                      ))}
                    </div>

                    <div className="col-span-12 grid grid-cols-12 gap-3">
                      <div className="col-span-5 rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3">
                        <div className="mb-2 text-[9px] uppercase tracking-widest text-[#444]">Compliance Readiness</div>
                        {readinessRows.map((row) => (
                          <div key={row.label} className="flex items-center gap-2 border-b border-white/[0.04] py-1 last:border-0">
                            <span className="w-5 text-[9px] text-[#555]">{row.marker}</span>
                            <span className="flex-1 text-[10px] text-[#666]">{row.label}</span>
                            <div className="h-[3px] flex-1 rounded-full bg-[#111]">
                              <div className="h-full rounded-full" style={{ width: row.value, backgroundColor: row.color }} />
                            </div>
                            <span className="w-8 text-right font-mono text-[10px] text-[#555]">{row.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="col-span-4 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-widest text-[#444]">AI Trust Graph</span>
                          <span className="cursor-pointer text-[9px] text-[#0070F3]">Explore →</span>
                        </div>
                        <svg className="h-[100px] w-full" viewBox="0 0 250 100" role="img" aria-label="AI trust graph preview">
                          <line x1="20" y1="50" x2="95" y2="30" stroke="rgba(0,112,243,0.3)" strokeWidth="1" />
                          <line x1="20" y1="50" x2="95" y2="70" stroke="rgba(0,196,140,0.3)" strokeWidth="1" />
                          <line x1="95" y1="30" x2="170" y2="50" stroke="rgba(121,40,202,0.3)" strokeWidth="1" />
                          <line x1="95" y1="70" x2="170" y2="50" stroke="rgba(0,196,140,0.3)" strokeWidth="1" />
                          <line x1="170" y1="50" x2="230" y2="30" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
                          <line x1="170" y1="50" x2="230" y2="70" stroke="rgba(121,40,202,0.3)" strokeWidth="1" />
                          {[
                            { cx: 20, cy: 50, color: "#0070F3", label: "APP" },
                            { cx: 95, cy: 30, color: "#7928CA", label: "MDL" },
                            { cx: 95, cy: 70, color: "#00C48C", label: "DATA" },
                            { cx: 170, cy: 50, color: "#F5A623", label: "CTRL" },
                            { cx: 230, cy: 30, color: "#00C48C", label: "EVID" },
                            { cx: 230, cy: 70, color: "#7928CA", label: "REG" },
                          ].map((node) => (
                            <g key={node.label}>
                              <circle cx={node.cx} cy={node.cy} r="12" fill={`${node.color}26`} stroke={node.color} strokeWidth="1" />
                              <text x={node.cx} y={node.cy + 2} textAnchor="middle" fontSize="6" fill="#888">
                                {node.label}
                              </text>
                            </g>
                          ))}
                          <circle cx="182" cy="38" r="5" fill="#F5A623" />
                        </svg>
                        <div className="mt-1 text-[9px] text-[#333]">6 nodes · 15 edges · 23 risks mapped</div>
                      </div>

                      <div className="col-span-3 rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3">
                        <div className="mb-2 text-[9px] uppercase tracking-widest text-[#444]">Priority Actions</div>
                        {priorityActions.map((action) => {
                          const badgeClass =
                            action.tone === "critical"
                              ? "bg-[#FF3B3B]/10 text-[#FF3B3B]"
                              : action.tone === "high"
                                ? "bg-[#F5A623]/10 text-[#F5A623]"
                                : "bg-[#7928CA]/10 text-[#7928CA]";

                          return (
                            <div key={action.title} className="flex flex-col gap-0.5 border-b border-white/[0.04] py-1.5 last:border-0">
                              <div className="mb-0.5 flex items-center gap-1.5">
                                <span className={`rounded px-1 py-0.5 text-[8px] font-bold ${badgeClass}`}>{action.badge}</span>
                                <span className="text-[9px] font-medium text-[#888]">{action.title}</span>
                              </div>
                              <span className="text-[8px] text-[#444]">{action.due}</span>
                              <span className="text-[8px] text-[#333]">{action.detail}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="col-span-12 flex items-center gap-4 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3">
                      <div className="mr-4 shrink-0 text-[9px] uppercase tracking-widest text-[#444]">Activity</div>
                      {activityEvents.map((event) => (
                        <div key={event.text} className="flex shrink-0 items-center gap-1.5 border-r border-white/[0.06] px-3 last:border-0">
                          <div className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: event.color }} />
                          <span className="text-[9px] text-[#555]">{event.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-black pb-0 pt-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,112,243,0.14) 0%, rgba(121,40,202,0.06) 50%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="relative z-10 mx-auto flex w-full max-w-[780px] flex-col items-center gap-7 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.03] px-4 py-1.5">
            <div className="flex items-center gap-1">
              <div className="h-[5px] w-[5px] rounded-full bg-[#0070F3]" />
              <div className="h-[5px] w-[5px] rounded-full bg-[#00C48C]" />
              <div className="h-[5px] w-[5px] rounded-full bg-[#7928CA]" />
            </div>
            <div className="h-3 w-px bg-white/[0.12]" />
            <span className="text-[12px] font-medium tracking-[0.01em] text-[#555]">
              AI Governance · Compliance · Observability
            </span>
          </div>
        </motion.div>

        <motion.h1
          style={{
            fontSize: "clamp(3.2rem, 8.5vw, 6.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="block"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Govern your AI.
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #0070F3 0%, #00C48C 50%, #7928CA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Before the world asks.
          </span>
        </motion.h1>

        <motion.p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#888",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          The platform that monitors AI systems, automates compliance documentation, and proves regulatory readiness — in one command center.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/score"
              className="shine inline-flex items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
              style={{
                height: 48,
                background: "linear-gradient(135deg, #0070F3 0%, #7928CA 100%)",
                boxShadow: "0 0 0 1px rgba(0,112,243,0.4), 0 4px 24px rgba(0,112,243,0.25)",
              }}
            >
              Get Started Free
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] px-7 text-[14px] font-medium text-[#999] transition-all duration-200 hover:border-white/[0.20] hover:text-white"
              style={{ height: 48 }}
            >
              Book a Demo
              <ChevronRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.44 }}
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-[#0070F3]" />
            <span className="text-[11px] text-[#444]">3 paying customers</span>
          </div>
          <span className="text-[10px] text-[#222]">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-[#00C48C]" />
            <span className="text-[11px] text-[#444]">EU AI Act ready</span>
          </div>
          <span className="text-[10px] text-[#222]">·</span>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-[#7928CA]" />
            <span className="text-[11px] text-[#444]">Ships in 48 hours</span>
          </div>
        </motion.div>
      </div>

      <DashboardVisual />
      <div
        className="pointer-events-none mt-0 h-40 w-full"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 50%, #000 100%)",
        }}
      />
    </section>
  );
}
