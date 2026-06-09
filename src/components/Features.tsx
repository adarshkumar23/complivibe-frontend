"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, FileText, AlertTriangle, Globe2, ShieldCheck, Gauge, CloudLightning, Scale, ChevronRight } from "lucide-react";

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

function ClassifyVisual() {
  const terminalLines = [
    "Analyzing EU AI Act Annex III...",
    "Cross-referencing DPDP Section 4...",
    "→ Risk Tier: HIGH RISK",
    "✓ 47 obligations mapped",
    "✓ Annex IV documentation required",
  ];

  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-compliance-green/5 to-transparent" />
      <div className="relative space-y-3">
        <div className="text-xs text-[#555] mb-3">AI System Risk Classification</div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <span className="text-[#555] text-xs w-20">System:</span>
            <span className="text-[#888] text-xs">Customer credit scoring ML model</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#555] text-xs w-20">Industry:</span>
            <span className="text-[#888] text-xs">Fintech</span>
          </div>
          <div className="h-px bg-white/[0.06] my-2" />
          <div className="space-y-1.5 pl-4 border-l border-white/[0.06]">
            {terminalLines.map((line, index) => (
              <motion.div
                key={line}
                className={
                  index === 2
                    ? "text-urgency text-xs font-semibold"
                    : index > 2
                      ? "text-compliance-green text-xs"
                      : "text-[#666] text-xs"
                }
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.12, duration: 0.3 }}
                viewport={{ once: true }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-compliance-green flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-compliance-green" />
            Classification complete
          </span>
          <span className="text-[#555]">2.3s</span>
        </div>
      </div>
    </div>
  );
}

function GenerateVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative w-full min-w-[280px] rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-v-blue/5 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#555]">Annex IV Document Generator</span>
        </div>
        <div className="space-y-1.5 text-xs">
          {[
            { section: "§1 System Description", status: "✓", color: "text-compliance-green" },
            { section: "§2 Design Specifications", status: "✓", color: "text-compliance-green" },
            { section: "§3 Development Process", status: "✓", color: "text-compliance-green" },
            { section: "§4 Monitoring & Control", status: "✓", color: "text-compliance-green" },
            { section: "§5 Risk Management", status: "●", color: "text-v-blue" },
            { section: "§6 Changes & Updates", status: "○", color: "text-[#333]" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`w-4 text-center ${item.color}`}>{item.status}</span>
              <span className="whitespace-nowrap text-[#888]">{item.section}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-v-blue">
            <span>▶</span> Generating Section 5...
            <span className="inline-block w-1.5 h-3 bg-v-blue/60 animate-pulse" />
          </div>
          <div className="mt-2 w-full bg-[#111] rounded-full h-1.5">
            <motion.div
              className="bg-gradient-to-r from-compliance-green to-v-blue h-1.5 rounded-full"
              initial={{ width: "0%" }}
              animate={inView ? { width: "72%" } : { width: "0%" }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectVisual() {
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-urgency/5 to-transparent" />
      <div className="relative">
        <div className="text-xs text-[#555] mb-4">Fine Exposure Calculator</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-urgency/5 border border-urgency/10 p-3">
            <div className="text-xs text-[#555] mb-1">EU AI Act — Max</div>
            <div className="text-lg font-bold text-urgency">€35M</div>
            <div className="text-[10px] text-[#555]">or 7% global turnover</div>
          </div>
          <div className="rounded-lg bg-india-orange/5 border border-india-orange/10 p-3">
            <div className="text-xs text-[#555] mb-1">India DPDP — Max</div>
            <div className="text-lg font-bold text-india-orange">₹250Cr</div>
            <div className="text-[10px] text-[#555]">per contravention</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666]">Compliance gaps found</span>
            <span className="text-urgency font-bold">12</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666]">Critical obligations missing</span>
            <span className="text-urgency font-bold">4</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666]">Estimated remediation</span>
            <span className="text-compliance-green font-bold">6 weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditVisual() {
  const events = [
    { type: "LOGGED", msg: "Annex IV document v3 generated", color: "text-compliance-green" },
    { type: "LOGGED", msg: "Risk re-classification triggered", color: "text-v-blue" },
    { type: "ALERT", msg: "DPDP Section 8 amendment detected", color: "text-india-orange" },
    { type: "LOGGED", msg: "Evidence hash: 0x7f3a...b2c1", color: "text-compliance-green" },
    { type: "EXPORT", msg: "Audit package exported for ISO review", color: "text-[#50E3C2]" },
  ];
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[#555]">Evidence Vault — Live</span>
          <span className="flex items-center gap-1.5 text-xs text-compliance-green">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-compliance-green animate-pulse" />
            Recording
          </span>
        </div>
        <div className="space-y-2">
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className={`font-bold w-14 flex-shrink-0 ${e.color}`}>{e.type}</span>
              <span className="text-[#666]">{e.msg}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="text-white font-bold">1,247</div>
            <div className="text-[#555]">Events logged</div>
          </div>
          <div>
            <div className="text-compliance-green font-bold">100%</div>
            <div className="text-[#555]">Hash integrity</div>
          </div>
          <div>
            <div className="text-v-blue font-bold">3</div>
            <div className="text-[#555]">Exports ready</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  classify: <ClassifyVisual />,
  generate: <GenerateVisual />,
  protect: <ProtectVisual />,
  audit: <AuditVisual />,
};

function FeatureGroupBlock({ group }: { group: (typeof featureGroups)[number] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
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
  );
}

export default function Features() {
  return (
    <section className="overflow-hidden py-8">
      <div className="mx-auto max-w-[1200px] space-y-40 px-6">
        {featureGroups.map((group, i) => (
          <FeatureGroupBlock key={i} group={group} />
        ))}
      </div>
    </section>
  );
}
