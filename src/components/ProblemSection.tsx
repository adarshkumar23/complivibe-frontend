"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Building2, AlertTriangle } from "lucide-react";

const cards = [
  {
    accent: "#FF3B3B",
    backgroundNumber: "01",
    icon: FileText,
    label: "01 — REGULATORS",
    title: "Regulators now ask for proof.",
    description: "EU AI Act, India DPDP, and Colorado AI Act require structured documentation, risk assessments, evidence trails, and accountability frameworks. Spreadsheets do not qualify.",
    quote: "Annex IV documentation is mandatory for all high-risk AI systems under EU AI Act Article 11. Non-compliance risks withdrawal from market.",
  },
  {
    accent: "#F5A623",
    backgroundNumber: "02",
    icon: Building2,
    label: "02 — ENTERPRISE BUYERS",
    title: "Enterprise buyers block ungoverned AI.",
    description: "Procurement teams at Fortune 500 companies now run AI governance questionnaires before signing contracts. Without documentation, deals stall at legal review.",
    quote: "67% of enterprise AI procurement decisions are now delayed by governance and compliance documentation gaps.",
  },
  {
    accent: "#7928CA",
    backgroundNumber: "03",
    icon: AlertTriangle,
    label: "03 — SCALE BREAKS MANUAL WORK",
    title: "Manual compliance breaks at scale.",
    description: "Spreadsheets, scattered documents, and disconnected tools cannot track multiple AI systems across multiple regulations simultaneously. Something always falls through.",
    quote: "The average AI compliance program requires 847 hours of manual work annually. CompliVibe reduces this to under 40.",
  },
];

export default function ProblemSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,59,59,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20 flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF3B3B] font-semibold mb-4">
            THE PROBLEM
          </p>
          <h2 
            className="mb-6 max-w-[800px]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            <span 
              style={{
                background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI is moving{" "}
            </span>
            <span className="text-[#FF3B3B]">faster</span>
            <span 
              style={{
                background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}than{" "}
            </span>
            <span 
              style={{
                background: "linear-gradient(135deg, #0070F3 0%, #7928CA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              governance.
            </span>
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-[540px]">
            AI companies ship features faster than their compliance, legal, and risk teams can keep up. Until a regulator, enterprise buyer, or auditor stops them.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: index * 0.12, 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="relative rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-8 overflow-hidden flex flex-col gap-5 group hover:border-white/[0.14] transition-colors duration-300"
              >
                {/* Large background number */}
                <div className="absolute bottom-4 right-6 text-[120px] font-black leading-none text-white/[0.02] pointer-events-none select-none">
                  {card.backgroundNumber}
                </div>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accent}99 50%, transparent)`,
                  }}
                />

                <motion.div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${card.accent}1a`,
                    borderColor: `${card.accent}33`,
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon size={20} color={card.accent} />
                </motion.div>

                <div className="flex flex-col gap-2">
                  <p 
                    className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: card.accent }}
                  >
                    {card.label}
                  </p>
                  <h3 className="text-[20px] font-bold text-white leading-tight tracking-tight">
                    {card.title}
                  </h3>
                </div>

                <p className="text-[14px] text-[#555] leading-relaxed relative z-10">
                  {card.description}
                </p>

                <div className="mt-auto pt-5 border-t border-white/[0.06] relative z-10">
                  <p className="text-[12px] text-[#333] italic leading-relaxed">
                    &quot;{card.quote}&quot;
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
