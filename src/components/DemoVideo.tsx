"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  CheckSquare,
  Cpu,
  Database,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Lock,
  Scale,
  Shield,
  Sparkles,
} from "lucide-react";

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

function WindowChrome({ url }: { url: string }) {
  return (
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
          <span className="font-mono text-[10px] text-[#333]">{url}</span>
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
  );
}

export default function DemoVideo() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Risk Monitor", "Evidence Vault"];

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,112,243,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#0070F3] font-semibold">
            PRODUCT TOUR
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              fontWeight: "700",
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            See CompliVibe{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0070F3 0%, #00C48C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in action.
            </span>
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-[540px]">
            A 90-second walkthrough of the Governance OS, from AI system classification to audit-ready evidence package.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-200 border ${
                activeTab === tab
                  ? "bg-white/[0.08] text-white border-white/[0.12]"
                  : "text-[#555] hover:text-[#888] border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#080808] overflow-hidden max-w-[900px] mx-auto min-h-[420px] shadow-2xl">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="Overview"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <WindowChrome url="app.complivibe.in/dashboard" />
                <div className="bg-[#080808] p-4">
                  <div className="flex h-[420px] flex-row overflow-hidden rounded-lg border border-white/[0.05]">
                    {/* Sidebar reuse */}
                    <aside className="flex w-[180px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0D0D0D] py-3 hidden md:flex">
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
                    </aside>

                    <main className="flex flex-1 flex-col overflow-hidden">
                      <div className="flex h-10 items-center gap-3 border-b border-white/[0.06] bg-[#0D0D0D] px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-white">Command Center</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="flex items-center gap-1 rounded-md border border-[#0070F3]/30 bg-[#0070F3]/15 px-2 py-0.5">
                            <Sparkles className="h-2.5 w-2.5 text-[#0070F3]" />
                            <span className="text-[9px] font-semibold text-[#0070F3]">Ask Copilot</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid flex-1 grid-cols-12 gap-3 overflow-hidden p-4">
                        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {scoreCards.map((card) => (
                            <ScoreCard key={card.label} card={card} />
                          ))}
                        </div>
                        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden">
                          <div className="rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3 overflow-hidden">
                            <div className="mb-2 text-[9px] uppercase tracking-widest text-[#444]">Compliance Readiness</div>
                            {readinessRows.slice(0, 4).map((row) => (
                              <div key={row.label} className="flex items-center gap-2 border-b border-white/[0.04] py-1 last:border-0">
                                <span className="w-5 text-[9px] text-[#555]">{row.marker}</span>
                                <span className="flex-1 text-[10px] text-[#666]">{row.label}</span>
                                <div className="h-[2px] flex-1 rounded-full bg-[#111]">
                                  <div className="h-full rounded-full" style={{ width: row.value, backgroundColor: row.color }} />
                                </div>
                                <span className="w-8 text-right font-mono text-[9px] text-[#555]">{row.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-3 hidden md:block">
                            <div className="mb-2 text-[9px] uppercase tracking-widest text-[#444]">Priority Actions</div>
                            {priorityActions.slice(0, 2).map((action) => (
                              <div key={action.title} className="flex flex-col gap-0.5 border-b border-white/[0.04] py-1.5 last:border-0">
                                <div className="mb-0.5 flex items-center gap-1.5">
                                  <span className={`rounded px-1 py-0.5 text-[7px] font-bold ${action.tone === "critical" ? "bg-[#FF3B3B]/10 text-[#FF3B3B]" : "bg-[#F5A623]/10 text-[#F5A623]"}`}>{action.badge}</span>
                                  <span className="text-[9px] font-medium text-[#888]">{action.title}</span>
                                </div>
                                <span className="text-[8px] text-[#444]">{action.due}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                  <p className="text-[11px] text-[#333] text-center mt-4">
                    CompliVibe Command Center — AI Trust Score, Compliance Readiness, Risk Heatmap, and Priority Actions
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "Risk Monitor" && (
              <motion.div
                key="RiskMonitor"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <WindowChrome url="app.complivibe.in/risk-monitor" />
                <div className="p-6 font-mono text-[11px]">
                  <div className="flex justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF3B3B] animate-pulse" />
                      <span className="text-[#444]">RISK MONITOR — LIVE SCAN</span>
                    </div>
                    <span className="text-[#333]">Last scan: 2m ago</span>
                  </div>

                  <div className="w-full">
                    <div className="grid grid-cols-4 gap-4 text-[9px] uppercase tracking-widest text-[#333] pb-2 border-b border-white/[0.06]">
                      <span>System</span>
                      <span>Risk Level</span>
                      <span>Regulation</span>
                      <span>Action Required</span>
                    </div>

                    <div className="space-y-0">
                      {[
                        { name: "Customer AI v2", risk: "HIGH RISK", riskColor: "#FF3B3B", reg: "EU AI Act Annex III", action: "Annex IV required", actionColor: "#F5A623" },
                        { name: "Rec Engine", risk: "MEDIUM", riskColor: "#F5A623", reg: "DPDP Section 4", action: "DPO review needed", actionColor: "#555" },
                        { name: "HR Screener", risk: "HIGH RISK", riskColor: "#FF3B3B", reg: "EU AI Act Annex III", action: "FRIA assessment required", actionColor: "#F5A623" },
                        { name: "Fraud Detection", risk: "LOW", riskColor: "#00C48C", reg: "ISO 42001", action: "Documentation current", actionColor: "#555" },
                        { name: "Support Bot", risk: "MINIMAL", riskColor: "#555", reg: "GDPR Article 22", action: "Monitoring active", actionColor: "#555" },
                      ].map((row, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b border-white/[0.04] text-[10px]">
                          <span className="text-[#888]">{row.name}</span>
                          <div>
                            <span 
                              className="rounded px-1.5 py-0.5 text-[9px] border"
                              style={{ 
                                color: row.riskColor, 
                                backgroundColor: `${row.riskColor}1a`,
                                borderColor: `${row.riskColor}33`
                              }}
                            >
                              {row.risk}
                            </span>
                          </div>
                          <span className="text-[#555]">{row.reg}</span>
                          <span style={{ color: row.actionColor }}>{row.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="text-[10px] text-[#333]">
                      12 systems monitored · <span className="text-[#FF3B3B]">3 require immediate action</span>
                    </div>
                    <button className="text-[10px] text-[#0070F3] hover:underline transition-all">
                      Run full scan →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Evidence Vault" && (
              <motion.div
                key="EvidenceVault"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <WindowChrome url="app.complivibe.in/evidence-vault" />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-3 w-3 text-[#F5A623]" />
                      <span className="text-[11px] font-semibold text-[#888]">Evidence Vault</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#333]">147 items</span>
                      <span className="text-[10px] font-mono text-[#00C48C]">Hash integrity: 100%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { icon: FileText, color: "#0070F3", type: "POLICY", file: "annex-iv-v3.pdf", date: "Jun 1 2026", hash: "0x7f3a...b2c1" },
                      { icon: Shield, color: "#00C48C", type: "AUDIT", file: "risk-assessment-q2.json", date: "May 28 2026", hash: "0x1a2b...c3d4" },
                      { icon: Activity, color: "#7928CA", type: "MONITOR", file: "system-logs-052026.csv", date: "May 31 2026", hash: "0x9e8d...f7g6" },
                      { icon: Scale, color: "#F5A623", type: "LEGAL", file: "dpdp-review-final.pdf", date: "May 20 2026", hash: "0x5h4j...k3l2" },
                      { icon: CheckCircle, color: "#00C48C", type: "APPROVAL", file: "board-sign-off.pdf", date: "May 15 2026", hash: "0x0m9n...p8q7" },
                      { icon: Database, color: "#0070F3", type: "DATASET", file: "training-data-card.md", date: "May 10 2026", hash: "0x2r3s...t4u5" },
                    ].map((card, i) => (
                      <div key={i} className="rounded-xl bg-[#0D0D0D] border border-white/[0.07] p-3 hover:border-white/[0.15] transition-colors group">
                        <div className="flex items-center gap-2 mb-2">
                          <card.icon className="h-3 w-3" style={{ color: card.color }} />
                          <span className="text-[9px] uppercase tracking-widest text-[#444]">{card.type}</span>
                        </div>
                        <div className="text-[11px] font-mono text-[#666] truncate">{card.file}</div>
                        <div className="text-[9px] text-[#333] mt-1">{card.date}</div>
                        <div className="text-[8px] font-mono text-[#222] mt-2 group-hover:text-[#333] transition-colors">{card.hash}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
