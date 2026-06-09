"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, Shield, Activity, Scale, Globe, FileText, AlertTriangle, ShoppingBag } from "lucide-react";

const nodes = [
  { icon: LayoutGrid, label: "AI Inventory", color: "#0070F3", top: "2%", left: "50%" },
  { icon: Shield, label: "Evidence", color: "#00C48C", top: "12%", left: "78%" },
  { icon: Activity, label: "Monitoring", color: "#21D4FD", top: "42%", left: "95%" },
  { icon: Scale, label: "Legal", color: "#7928CA", top: "72%", left: "78%" },
  { icon: Globe, label: "Trust Center", color: "#0070F3", top: "88%", left: "50%" },
  { icon: FileText, label: "Regulations", color: "#F5A623", top: "72%", left: "20%" },
  { icon: AlertTriangle, label: "Risk", color: "#FF3B3B", top: "42%", left: "2%" },
  { icon: ShoppingBag, label: "Procurement", color: "#00C48C", top: "12%", left: "20%" },
];

const stats = [
  { value: "10 Modules", label: "Complete platform" },
  { value: "5 Regulations", label: "Covered at launch" },
  { value: "1 Platform", label: "End-to-end governance" },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,112,243,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20 flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#00C48C] font-semibold mb-4">
            THE SOLUTION
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
            One{" "}
            <span 
              style={{
                background: "linear-gradient(135deg, #0070F3 0%, #7928CA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              command center
            </span>
            {" "}for everything AI governance needs.
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-[540px]">
            CompliVibe connects AI system inventory, risk monitoring, compliance documentation, evidence vaulting, regulatory mapping, and trust workflows into one platform.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div ref={ref} className="relative w-full aspect-square max-w-[600px] mx-auto mb-16">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={node.left}
                y2={node.top}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              />
            ))}
          </svg>

          {/* Center Hub */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-3xl border border-[#0070F3]/30 flex flex-col items-center justify-center gap-2 z-10"
            style={{
              background: "linear-gradient(135deg, rgba(0,112,243,0.2) 0%, rgba(121,40,202,0.2) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(0,112,243,0.2), 0 0 120px rgba(0,112,243,0.08)",
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0070F3] to-[#7928CA] flex items-center justify-center">
              <span className="text-[10px] font-black text-white">CV</span>
            </div>
            <span className="text-[11px] font-semibold text-[#888] uppercase tracking-[0.08em]">
              Governance OS
            </span>
          </motion.div>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl border flex flex-col items-center justify-center gap-1.5 cursor-default hover:shadow-lg transition-all duration-300 group z-20"
                style={{
                  top: node.top,
                  left: node.left,
                  backgroundColor: `${node.color}1a`,
                  borderColor: `${node.color}40`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Icon size={16} color={node.color} />
                <span className="text-[10px] font-semibold text-[#666] text-center">
                  {node.label}
                </span>
                
                {/* Hover state border */}
                <div 
                  className="absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none"
                  style={{
                    borderColor: "transparent",
                  }}
                  // Using inline style for dynamic hover would be messy, so we use a separate div or just the main container's hover
                />
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-16 max-w-[900px] mx-auto">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`text-center px-12 py-6 w-full md:w-1/3 ${i < stats.length - 1 ? "md:border-r border-white/[0.08]" : ""}`}
            >
              <div 
                className="text-[clamp(2rem,4vw,3rem)] font-bold font-mono tracking-tight"
                style={{
                  background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.65))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-[13px] text-[#444] mt-2 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
