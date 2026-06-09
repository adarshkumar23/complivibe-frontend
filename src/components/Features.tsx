"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  Globe2, 
  ShieldCheck, 
  Gauge, 
  CloudLightning, 
  Scale, 
  ChevronRight,
  CheckCircle2,
  Circle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const featureGroups = [
  {
    eyebrow: "AI CLASSIFICATION ENGINE",
    eyebrowColor: "#0070F3",
    headline: "Know your risk tier in minutes. Not months.",
    body: "CompliVibe maps your AI systems to EU AI Act Annex III and India DPDP simultaneously. One input, dual compliance profile, zero legal overhead.",
    cta: { label: "See how classification works", href: "/platform" },
    features: [
      { icon: Shield, label: "Risk Classification", desc: "AUTO / HIGH / LIMITED / MINIMAL" },
      { icon: Scale, label: "Cross-Regulation Mapping", desc: "EU + India obligations aligned" },
      { icon: Globe2, label: "Dual Jurisdiction", desc: "One profile, two frameworks" },
    ],
    visual: "classify",
    flip: false,
  },
  {
    eyebrow: "DOCUMENTATION ENGINE",
    eyebrowColor: "#00C48C",
    headline: "Annex IV in 48 hours. Not 48 weeks.",
    body: "Stop manually writing governance documentation. CompliVibe generates all 11 Annex IV sections grounded in actual regulation text — updated automatically when regulations change.",
    cta: { label: "Try the document generator", href: "/platform#generator" },
    features: [
      { icon: FileText, label: "Full Annex IV Coverage", desc: "All 11 mandatory sections, Article 11 compliant" },
      { icon: CloudLightning, label: "48-Hour Updates", desc: "Regulations change, your docs change automatically" },
      { icon: Gauge, label: "PDF Export", desc: "Auditor-preferred format, one click" },
    ],
    visual: "generate",
    flip: true,
  },
  {
    eyebrow: "RISK INTELLIGENCE",
    eyebrowColor: "#FF3B3B",
    headline: "See your fine exposure before regulators do.",
    body: "Calculate maximum penalty across EU and Indian jurisdictions. Know your €35M or ₹250Cr exposure before it becomes a headline.",
    cta: { label: "Calculate Exposure", href: "/score" },
    features: [
      { icon: AlertTriangle, label: "Fine Calculator", desc: "Real-time exposure by jurisdiction" },
      { icon: Shield, label: "Gap Analysis", desc: "Missing obligations flagged automatically" },
      { icon: Globe2, label: "EU Export Pack", desc: "Compliance docs for EU market entry" },
    ],
    visual: "protect",
    flip: false,
  },
  {
    eyebrow: "EVIDENCE INFRASTRUCTURE",
    eyebrowColor: "#7928CA",
    headline: "Every action logged. Tamper-proof.",
    body: "Hash-chained audit trails mean every compliance action has an immutable record. When auditors arrive, your evidence package is already complete.",
    cta: { label: "See the evidence vault", href: "/platform#audit" },
    features: [
      { icon: ShieldCheck, label: "Hash-Chained Logs", desc: "Tamper-proof, timestamped, immutable" },
      { icon: Gauge, label: "Readiness Score", desc: "Real-time compliance percentage" },
      { icon: FileText, label: "Export Anywhere", desc: "PDF, JSON, CSV for any audit format" },
    ],
    visual: "audit",
    flip: true,
  },
];

function VisualChrome({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#080808] border border-white/[0.10] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.5)]">
      <div className="h-9 bg-[#0F0F0F] border-b border-white/[0.07] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-[10px] font-mono text-[#333] ml-2">{title}</span>
      </div>
      {children}
    </div>
  );
}

function ClassifyVisual() {
  return (
    <VisualChrome title="classification-engine.ts">
      <div className="p-5 space-y-4">
        <div className="rounded-xl bg-[#0D0D0D] border border-white/[0.07] p-4">
          <div className="text-[9px] uppercase tracking-widest text-[#444] mb-3">AI System Input</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#555]">System name</span>
              <span className="text-[11px] font-mono text-[#888]">customer-credit-ai-v2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#555]">Industry</span>
              <span className="text-[11px] font-mono text-[#888]">Financial Services</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#555]">Data processed</span>
              <span className="text-[11px] font-mono text-[#888]">Personal financial data</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 py-2">
          <motion.div animate={{ x: [-4, 0, -4] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronRight size={12} className="text-[#0070F3]" />
          </motion.div>
          <span className="text-[11px] text-[#0070F3]">Analyzing against 47 regulations...</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* EU AI Act Card */}
          <div className="rounded-xl bg-[#0D0D0D] border border-[#FF3B3B]/30 p-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF3B3B]/40 to-transparent" />
            <span className="text-lg block mb-1">🇪🇺</span>
            <div className="text-[9px] uppercase tracking-widest text-[#444]">EU AI Act</div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF3B3B]/10 border border-[#FF3B3B]/20 px-2 py-0.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B3B]" />
              <span className="text-[10px] font-bold text-[#FF3B3B]">HIGH RISK</span>
            </div>
            <div className="space-y-1 mt-2">
              <div className="text-[9px] text-[#444]">Annex III match</div>
              <div className="text-[9px] text-[#00C48C]">✓ 47 obligations mapped</div>
              <div className="text-[9px] text-[#00C48C]">✓ Annex IV required</div>
            </div>
          </div>

          {/* India DPDP Card */}
          <div className="rounded-xl bg-[#0D0D0D] border border-[#F5A623]/30 p-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent" />
            <span className="text-lg block mb-1">🇮🇳</span>
            <div className="text-[9px] uppercase tracking-widest text-[#444]">India DPDP</div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20 px-2 py-0.5 mt-1">
              <span className="text-[10px] font-bold text-[#F5A623]">SECTION 4 SCOPE</span>
            </div>
            <div className="space-y-1 mt-2">
              <div className="text-[9px] text-[#444]">Personal data flag</div>
              <div className="text-[9px] text-[#00C48C]">✓ DPO assignment required</div>
              <div className="text-[9px] text-[#00C48C]">✓ Consent framework needed</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-pulse" />
            <span className="text-[10px] text-[#555]">Classification complete</span>
          </div>
          <span className="text-[10px] font-mono text-[#333]">2.3s</span>
        </div>
      </div>
    </VisualChrome>
  );
}

function GenerateVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <VisualChrome title="annex-iv-generator.ts">
      <div ref={ref} className="p-5">
        <div className="rounded-xl bg-[#0D0D0D] border border-[#0070F3]/20 p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <FileText size={12} className="text-[#0070F3]" />
              <span className="text-[11px] font-semibold text-white">Annex IV — Customer Credit AI v2</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/20 px-2 py-0.5">
              <span className="text-[9px] text-[#0070F3]">GENERATING</span>
            </div>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#111] mb-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0070F3] to-[#00C48C]"
              initial={{ width: "0%" }}
              animate={inView ? { width: "72%" } : { width: "0%" }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between text-[9px] text-[#333]">
            <span>§5 of §11 complete</span>
            <span>2,847 words generated</span>
            <span>~12 min remaining</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {[
            { id: "1", title: "System Description", status: "complete" },
            { id: "2", title: "Design Specifications", status: "complete" },
            { id: "3", title: "Development Process", status: "complete" },
            { id: "4", title: "Monitoring & Control", status: "complete" },
            { id: "5", title: "Risk Management", status: "generating" },
            { id: "6", title: "Changes & Updates", status: "pending" },
            { id: "7", title: "Training Data", status: "pending" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2.5 text-[10px]">
              {item.status === "complete" ? (
                <CheckCircle2 size={10} className="text-[#00C48C]" />
              ) : item.status === "generating" ? (
                <div className="w-2.5 h-2.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3] animate-pulse" />
                </div>
              ) : (
                <Circle size={10} className="text-[#333]" />
              )}
              
              {item.status === "generating" ? (
                <div className="flex items-center">
                  <span className="text-[#0070F3]">§{item.id} {item.title}</span>
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-[#0070F3] font-mono ml-0.5">|</motion.span>
                  <span className="text-[9px] text-[#0070F3]/60 ml-1">generating...</span>
                </div>
              ) : (
                <span className={item.status === "complete" ? "text-[#555]" : "text-[#333]"}>§{item.id} {item.title}</span>
              )}
            </div>
          ))}
          <div className="text-[9px] text-[#222] pl-6">4 more sections queued</div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Loader2 size={11} className="text-[#0070F3]" />
            </motion.div>
            <span className="text-[10px] text-[#0070F3]">Generating §5 Risk Management...</span>
          </div>
          <span className="text-[10px] font-mono text-[#333]">72% complete</span>
        </div>
      </div>
    </VisualChrome>
  );
}

function ProtectVisual() {
  return (
    <VisualChrome title="fine-calculator.ts">
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* EU AI Act Card */}
          <div className="rounded-xl bg-[#0D0D0D] border border-[#FF3B3B]/25 p-4 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[radial-gradient(rgba(255,59,59,0.12),transparent)] pointer-events-none" />
            <span className="text-xl">🇪🇺</span>
            <div className="text-[9px] uppercase tracking-widest text-[#444] mt-1">EU AI Act</div>
            <div className="text-[28px] font-bold font-mono text-[#FF3B3B] leading-none mt-2">€35M</div>
            <div className="text-[9px] text-[#444] mt-1">or 7% global turnover</div>
            <div className="h-px bg-white/[0.06] my-2" />
            <div className="text-[9px] text-[#555]">Per prohibited AI practice</div>
          </div>

          {/* India DPDP Card */}
          <div className="rounded-xl bg-[#0D0D0D] border border-[#F5A623]/25 p-4 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[radial-gradient(rgba(245,166,35,0.12),transparent)] pointer-events-none" />
            <span className="text-xl">🇮🇳</span>
            <div className="text-[9px] uppercase tracking-widest text-[#444] mt-1">India DPDP</div>
            <div className="text-[28px] font-bold font-mono text-[#F5A623] leading-none mt-2">₹250Cr</div>
            <div className="text-[9px] text-[#444] mt-1">per contravention</div>
            <div className="h-px bg-white/[0.06] my-2" />
            <div className="text-[9px] text-[#555]">Under DPDP Section 33</div>
          </div>
        </div>

        <div className="rounded-xl bg-[#0D0D0D] border border-white/[0.08] p-4">
          <div className="text-[9px] uppercase tracking-widest text-[#444] mb-3">Gap Analysis — customer-credit-ai-v2</div>
          <div className="space-y-1.5">
            {[
              { label: "Compliance gaps found", value: "12", color: "text-[#FF3B3B]" },
              { label: "Critical obligations missing", value: "4", color: "text-[#FF3B3B]" },
              { label: "Estimated remediation time", value: "6 weeks", color: "text-[#00C48C]" },
              { label: "Estimated fine reduction", value: "~€32.4M", color: "text-[#00C48C]" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                <span className="text-[11px] text-[#666]">{row.label}</span>
                <span className={cn("text-[11px] font-mono font-bold", row.color)}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={11} className="text-[#00C48C]" />
            <span className="text-[10px] text-[#555]">CompliVibe reduces exposure by 92%</span>
          </div>
          <span className="text-[10px] text-[#0070F3] cursor-pointer hover:underline">Full report →</span>
        </div>
      </div>
    </VisualChrome>
  );
}

function AuditVisual() {
  const events = [
    { time: "09:42:01", type: "LOGGED", msg: "Annex IV doc v3 · hash: 0x7f3a...b2c1", color: "#00C48C" },
    { time: "09:41:18", type: "LOGGED", msg: "Risk re-classification triggered", color: "#0070F3" },
    { time: "09:38:55", type: "ALERT", msg: "DPDP Section 8 amendment detected", color: "#F5A623" },
    { time: "09:35:12", type: "LOGGED", msg: "Evidence hash: 0x9e2d...f4a7", color: "#00C48C" },
    { time: "09:31:44", type: "EXPORT", msg: "Audit package exported for ISO review", color: "#7928CA" },
    { time: "09:28:03", type: "SIGNED", msg: "Board approval logged · immutable", color: "#00C48C" },
  ];

  return (
    <VisualChrome title="evidence-vault.ts">
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl bg-[#0D0D0D] border border-white/[0.07] p-3 text-center">
            <div className="text-[20px] font-bold font-mono text-white">1,247</div>
            <div className="text-[9px] text-[#444]">Events logged</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="w-1 h-1 rounded-full bg-[#00C48C]" />
              <span className="text-[9px] text-[#00C48C]">+23 today</span>
            </div>
          </div>
          <div className="rounded-xl bg-[#0D0D0D] border border-white/[0.07] p-3 text-center">
            <div className="text-[20px] font-bold font-mono text-[#00C48C]">100%</div>
            <div className="text-[9px] text-[#444]">Hash integrity</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <ShieldCheck size={10} className="text-[#00C48C]" />
              <span className="text-[9px] text-[#00C48C]">Verified</span>
            </div>
          </div>
          <div className="rounded-xl bg-[#0D0D0D] border border-white/[0.07] p-3 text-center">
            <div className="text-[20px] font-bold font-mono text-[#0070F3]">3</div>
            <div className="text-[9px] text-[#444]">Export ready</div>
            <span className="text-[9px] text-[#444] mt-1 block">PDF JSON CSV</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0D0D0D] border border-white/[0.07] overflow-hidden">
          <div className="h-8 border-b border-white/[0.06] flex items-center gap-2 px-3">
            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
            </motion.div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#333]">EVIDENCE.LOG — LIVE</span>
          </div>
          <div className="p-3 space-y-2">
            {events.map((e, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5 text-[10px] font-mono"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-[#2a2a2a] shrink-0 w-16">{e.time}</span>
                <span className="text-[9px] font-bold shrink-0 w-14" style={{ color: e.color }}>{e.type}</span>
                <span className="text-[#444] leading-snug">{e.msg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VisualChrome>
  );
}

const visuals: Record<string, React.ReactNode> = {
  classify: <ClassifyVisual />,
  generate: <GenerateVisual />,
  protect: <ProtectVisual />,
  audit: <AuditVisual />,
};

function FeatureGroupBlock({ group, isLast }: { group: (typeof featureGroups)[number]; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <>
      <motion.div
        ref={ref}
        className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2"
      >
        <motion.div
          className={`flex flex-col gap-5 ${group.flip ? "lg:order-2" : ""}`}
          initial={{ opacity: 0, x: group.flip ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: group.flip ? 30 : -30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em]" style={{ color: group.eyebrowColor }}>
            {group.eyebrow}
          </p>
          <h2
            className="text-balance"
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {group.headline}
          </h2>
          <p className="max-w-[440px] text-[16px] leading-relaxed text-[#555]">{group.body}</p>

          <div className="space-y-3">
            {group.features.map((f, j) => (
              <motion.div
                key={j}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: j * 0.08, duration: 0.35 }}
              >
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.04]">
                  <f.icon className="h-[11px] w-[11px] text-[#888]" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{f.label}</p>
                  <p className="mt-0.5 text-[12px] text-[#444]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href={group.cta.href}
            className="mt-2 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-white transition-colors hover:text-[#888]"
          >
            {group.cta.label}
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        <motion.div
          className={`relative ${group.flip ? "lg:order-1" : ""}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div
            className="pointer-events-none absolute -inset-8"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,112,243,0.06) 0%, transparent 60%)",
            }}
          />
          {visuals[group.visual]}
        </motion.div>
      </motion.div>
      
      {!isLast && (
        <div className="h-px max-w-[1200px] mx-auto bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06)_30%,rgba(255,255,255,0.06)_70%,transparent)]" />
      )}
    </>
  );
}

export default function Features() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#00C48C] mb-4">
            PLATFORM CAPABILITIES
          </p>
          <h2
            className="mb-6 mx-auto"
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <span className="bg-gradient-to-r from-[#0070F3] to-[#00C48C] bg-clip-text text-transparent">Four engines.</span> One governance platform.
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-[500px] mx-auto">
            Classify AI systems, generate documentation, calculate exposure, and vault your evidence — all in one command center.
          </p>
        </div>

        <div className="space-y-40">
          {featureGroups.map((group, i) => (
            <FeatureGroupBlock key={i} group={group} isLast={i === featureGroups.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
