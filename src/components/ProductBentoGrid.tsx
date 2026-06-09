"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  LayoutGrid, Shield, FileText, Activity, MapPin, Map, 
  ShoppingBag, Globe, Scale, GitBranch, CheckCircle2 
} from "lucide-react";

const cards = [
  {
    id: "01",
    name: "AI System Inventory",
    desc: "Track every AI system, model, dataset, vendor, owner, use case, and risk profile in one structured registry.",
    icon: LayoutGrid,
    accent: "#0070F3",
    large: true,
    mockup: "inventory",
  },
  {
    id: "02",
    name: "Evidence Vault",
    desc: "Store policies, logs, reviews, approvals, and audit evidence in one governed, hash-chained repository.",
    icon: Shield,
    accent: "#00C48C",
    large: true,
    mockup: "evidence",
  },
  {
    id: "03",
    name: "Annex IV Generator",
    desc: "Generate all 11 required EU AI Act documentation sections automatically, grounded in regulation text via RAG.",
    icon: FileText,
    accent: "#7928CA",
    large: true,
    mockup: "generator",
  },
  {
    id: "04",
    name: "AI Monitoring",
    desc: "Continuously monitor AI systems for governance gaps, risk changes, and compliance drift.",
    icon: Activity,
    accent: "#21D4FD",
  },
  {
    id: "05",
    name: "DPDP Workflows",
    desc: "India DPDP readiness through privacy, consent, and data governance workflow automation.",
    icon: MapPin,
    accent: "#F5A623",
  },
  {
    id: "06",
    name: "Regulatory Mapping",
    desc: "Map AI systems to EU AI Act, DPDP, Colorado AI Act, ISO 42001, and NIST AI RMF simultaneously.",
    icon: Map,
    accent: "#0070F3",
  },
  {
    id: "07",
    name: "Procurement Automation",
    desc: "Auto-generate responses to enterprise AI, security, and compliance vendor questionnaires.",
    icon: ShoppingBag,
    accent: "#00C48C",
  },
  {
    id: "08",
    name: "Trust Center",
    desc: "Show customers and auditors your live AI governance posture, compliance status, and evidence readiness.",
    icon: Globe,
    accent: "#7928CA",
  },
  {
    id: "09",
    name: "Legal Review AI",
    desc: "Review documents, identify regulatory gaps, and generate structured guidance before expert sign-off.",
    icon: Scale,
    accent: "#FF3B3B",
  },
  {
    id: "10",
    name: "AI Trust Graph",
    desc: "Visualize how AI systems connect to risks, controls, evidence, regulations, and owners.",
    icon: GitBranch,
    accent: "#0070F3",
  },
];

function InventoryMockup() {
  return (
    <div className="mt-auto pt-4 border-t border-white/[0.05] space-y-2">
      <div className="flex justify-between text-[9px] text-[#333] uppercase tracking-wider font-bold px-1">
        <span>System</span>
        <span>Risk</span>
        <span>Status</span>
      </div>
      <div className="space-y-1">
        {[
          { name: "Customer AI", risk: "HIGH", riskColor: "text-[#FF3B3B]", status: "Monitored" },
          { name: "Rec Engine", risk: "MED", riskColor: "text-[#F5A623]", status: "Active" },
          { name: "Data Pipeline", risk: "LOW", riskColor: "text-[#00C48C]", status: "Compliant" },
        ].map((row, i) => (
          <div key={i} className="flex justify-between items-center text-[10px] py-1.5 border-b border-white/[0.05] text-[#555] px-1">
            <span className="truncate max-w-[80px]">{row.name}</span>
            <span className={row.riskColor}>{row.risk}</span>
            <span className="text-[#444]">{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceMockup() {
  return (
    <div className="mt-auto pt-4 border-t border-white/[0.05]">
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: "147", label: "docs" },
          { value: "100%", label: "integrity" },
          { value: "3", label: "ready" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-[18px] font-bold font-mono text-white leading-none">{stat.value}</div>
            <div className="text-[8px] text-[#444] uppercase mt-1 tracking-tighter">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneratorMockup() {
  return (
    <div className="mt-auto pt-4 border-t border-white/[0.05] space-y-1.5">
      {[
        { name: "§1 System Description", status: "done" },
        { name: "§2 Design Specs", status: "done" },
        { name: "§3 Development", status: "done" },
        { name: "§4 Monitoring", status: "done" },
        { name: "§5 Risk Management", status: "progress" },
        { name: "§6 Updates", status: "queued" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-[10px]">
          {item.status === "done" && <CheckCircle2 size={10} className="text-[#00C48C]" />}
          {item.status === "progress" && (
            <motion.div 
              className="w-2.5 h-2.5 rounded-full bg-[#0070F3]/40 border border-[#0070F3]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {item.status === "queued" && <div className="w-2.5 h-2.5 rounded-full border border-[#333]" />}
          <span className={item.status === "progress" ? "text-[#0070F3]" : item.status === "queued" ? "text-[#333]" : "text-[#555]"}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProductBentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#7928CA] font-semibold mb-4">
            PLATFORM MODULES
          </p>
          <h2 
            className="mb-6 max-w-[800px]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Every tool your{" "}
            <span 
              style={{
                background: "linear-gradient(135deg, #7928CA 0%, #0070F3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI governance
            </span>
            {" "}program needs.
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-[540px]">
            Ten integrated modules. One coherent platform. From inventory to evidence to trust center.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: index * 0.06, 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`relative rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden flex flex-col group hover:border-white/[0.14] transition-all duration-300 ${card.large ? "min-h-[320px] md:row-span-2" : "min-h-[180px]"}`}
              >
                {/* Top accent line */}
                <div 
                  className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accent}80 50%, transparent)`,
                  }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${card.accent}1a`,
                      borderColor: `${card.accent}33`,
                    }}
                  >
                    <Icon size={18} color={card.accent} />
                  </div>
                  <span className="font-mono text-[11px] text-[#333]">
                    {card.id}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[17px] font-bold text-white leading-tight">
                    {card.name}
                  </h3>
                  <p className="text-[13px] text-[#555] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {card.large && (
                  <>
                    {card.mockup === "inventory" && <InventoryMockup />}
                    {card.mockup === "evidence" && <EvidenceMockup />}
                    {card.mockup === "generator" && <GeneratorMockup />}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
