"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Users, Cpu, Globe, FileText, Calendar } from "lucide-react";

const signalCards = [
  {
    accent: "#00C48C",
    icon: CheckCircle2,
    value: "Live Product",
    label: "Shipping and improving daily",
    sub: "Not a concept. Not a waitlist. A working platform.",
  },
  {
    accent: "#0070F3",
    icon: Users,
    value: "3 Customers",
    label: "Paying from day one",
    sub: "Plus 5 beta pilots and 13 on the waitlist.",
  },
  {
    accent: "#7928CA",
    icon: Cpu,
    value: "7 Months",
    label: "AI governance engine",
    sub: "Built across 11 development phases, 329 API routes.",
  },
  {
    accent: "#F5A623",
    icon: Globe,
    value: "$62B+",
    label: "Global GRC market by 2028",
    sub: "AI governance is the fastest growing compliance segment.",
  },
];

const tailwinds = [
  { color: "#0070F3", text: "EU AI Act: High-risk AI obligations enforce August 2026" },
  { color: "#00C48C", text: "India DPDP: Rules notified, enforcement active" },
  { color: "#F5A623", text: "Colorado AI Act: SB 205 signed, compliance required 2026" },
  { color: "#7928CA", text: "ISO 42001: First AI management system standard published" },
];

const tractionMetrics = [
  { value: "3", label: "Paying customers" },
  { value: "5", label: "Beta pilots" },
  { value: "2", label: "In conversion" },
  { value: "13", label: "On waitlist" },
  { value: "329", label: "API routes" },
  { value: "50+", label: "DB tables" },
];

export default function InvestorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(0,112,243,0.07) 0%, transparent 80%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#0070F3] font-semibold mb-4">
            FOR INVESTORS
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
            The next GRC category is AI-native.
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-[640px]">
            Vanta automated security compliance. OneTrust automated privacy. Sprinto brought compliance to SaaS. CompliVibe is building the AI governance infrastructure layer for the regulation era.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto text-center mb-16">
          <p className="text-[15px] text-[#444] leading-relaxed">
            CompliVibe starts with EU AI Act and India DPDP readiness, then expands into Colorado AI Act, ISO 42001, AI observability, evidence infrastructure, procurement automation, and enterprise trust workflows. The addressable market grows with every new AI regulation passed globally.
          </p>
        </div>

        {/* Signal Cards */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {signalCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-6 flex flex-col gap-3 group relative overflow-hidden hover:border-white/[0.14] transition-colors duration-300"
              >
                {/* Top accent line */}
                <div 
                  className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accent}80 50%, transparent)`,
                  }}
                />
                
                <Icon size={20} color={card.accent} />
                <div className="flex flex-col gap-1">
                  <div className="text-[20px] font-bold text-white leading-tight">
                    {card.value}
                  </div>
                  <div className="text-[12px] font-semibold text-[#888]">
                    {card.label}
                  </div>
                </div>
                <p className="text-[11px] text-[#444] leading-relaxed">
                  {card.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Market & Traction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {/* Regulatory Tailwinds */}
          <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-8">
            <h3 className="text-[16px] font-bold text-white mb-6 uppercase tracking-wider">
              Regulatory Tailwinds
            </h3>
            <ul className="space-y-4">
              {tailwinds.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div 
                    className="w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[13px] text-[#555] leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Early Traction */}
          <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-8">
            <h3 className="text-[16px] font-bold text-white mb-6 uppercase tracking-wider">
              Early Traction
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {tractionMetrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-[24px] font-bold font-mono text-white leading-none">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-[#444] uppercase tracking-tighter">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <button className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-[13px] font-semibold text-white bg-[#0070F3] hover:bg-[#0060D1] transition-colors group">
            <FileText size={16} />
            Download Investor Brief
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-[13px] font-medium text-[#888] border border-white/[0.10] hover:border-white/[0.20] hover:text-white transition-all">
            <Calendar size={16} />
            Book Investor Call
          </button>
        </div>
      </div>
    </section>
  );
}
