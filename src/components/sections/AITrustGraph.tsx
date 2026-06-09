"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  BrainCircuit,
  Building2,
  AlertTriangle,
  ShieldCheck,
  FolderCheck,
  Scale,
  Globe,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp, blurReveal, scaleIn } from "@/lib/animations";

interface NodeData {
  id: string;
  label: string;
  subtext: string;
  Icon: LucideIcon;
  color: string;
  desktopPos: { top?: string; left?: string; right?: string; bottom?: string };
  mobilePos: { top?: string; left?: string; right?: string; bottom?: string };
  type?: "core" | "surrounding";
}

const SURROUNDING_NODES: NodeData[] = [
  {
    id: "ai-system",
    label: "AI System",
    subtext: "Customer Support Agent",
    Icon: Cpu,
    color: "#4F8CFF",
    desktopPos: { top: "12%", left: "39%" },
    mobilePos: { top: "15%", left: "10%" },
  },
  {
    id: "dataset",
    label: "Dataset",
    subtext: "User interaction logs",
    Icon: Database,
    color: "#21D4FD",
    desktopPos: { top: "25%", left: "8%" },
    mobilePos: { top: "15%", right: "10%" },
  },
  {
    id: "model",
    label: "Model",
    subtext: "LLM workflow",
    Icon: BrainCircuit,
    color: "#8B5CF6",
    desktopPos: { top: "24%", right: "8%" },
    mobilePos: { top: "35%", left: "10%" },
  },
  {
    id: "vendor",
    label: "Vendor",
    subtext: "Third-party API",
    Icon: Building2,
    color: "#4F8CFF",
    desktopPos: { top: "50%", left: "6%" },
    mobilePos: { top: "35%", right: "10%" },
  },
  {
    id: "risk",
    label: "Risk",
    subtext: "Bias and explainability",
    Icon: AlertTriangle,
    color: "#F59E0B",
    desktopPos: { top: "50%", right: "6%" },
    mobilePos: { top: "55%", left: "10%" },
  },
  {
    id: "control",
    label: "Control",
    subtext: "Human review",
    Icon: ShieldCheck,
    color: "#22C55E",
    desktopPos: { bottom: "20%", left: "16%" },
    mobilePos: { top: "55%", right: "10%" },
  },
  {
    id: "evidence",
    label: "Evidence",
    subtext: "Audit documents",
    Icon: FolderCheck,
    color: "#21D4FD",
    desktopPos: { bottom: "18%", right: "16%" },
    mobilePos: { bottom: "15%", left: "10%" },
  },
  {
    id: "regulation",
    label: "Regulation",
    subtext: "EU AI Act / DPDP",
    Icon: Scale,
    color: "#8B5CF6",
    desktopPos: { bottom: "7%", left: "40%" },
    mobilePos: { bottom: "15%", right: "10%" },
  },
  {
    id: "trust-center",
    label: "Trust Center",
    subtext: "Buyer-ready proof",
    Icon: Globe,
    color: "#4F8CFF",
    desktopPos: { top: "72%", left: "40%" },
    mobilePos: { bottom: "5%", left: "50%" },
  },
];

const CORE_NODE: NodeData = {
  id: "core",
  label: "Governance Core",
  subtext: "Live system of record",
  Icon: Cpu,
  color: "#4F8CFF",
  desktopPos: { top: "50%", left: "50%" },
  mobilePos: { top: "50%", left: "50%" },
  type: "core",
};

const CROSS_LINKS = [
  { from: "ai-system", to: "dataset" },
  { from: "ai-system", to: "model" },
  { from: "model", to: "risk" },
  { from: "risk", to: "control" },
  { from: "control", to: "evidence" },
  { from: "evidence", to: "regulation" },
  { from: "regulation", to: "trust-center" },
];

const Particle = ({ path, delay = 0, color = "#21D4FD" }: { path: string; delay?: number; color?: string }) => {
  return (
    <motion.circle r="2.5" fill={color} opacity="0.75">
      <animateMotion dur={`${3 + Math.random() * 2}s`} repeatCount="indefinite" path={path} begin={`${delay}s`} />
    </motion.circle>
  );
};

const Node = ({ node, index, isHovered, onHover, isMobile }: { node: NodeData; index: number; isHovered: boolean; onHover: (id: string | null) => void; isMobile: boolean }) => {
  const isCore = node.type === "core";
  
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        "absolute z-10 transition-all duration-300",
        isCore ? "-translate-x-1/2 -translate-y-1/2" : ""
      )}
      style={{
        ...(isMobile ? node.mobilePos : node.desktopPos),
        ...(isCore ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" } : {})
      }}
    >
      <motion.div
        role="group"
        aria-label={node.label}
        onHoverStart={() => onHover(node.id)}
        onHoverEnd={() => onHover(null)}
        animate={isCore ? { scale: [1, 1.025, 1] } : { y: [0, -5, 0] }}
        transition={isCore ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 4, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06 }}
        className={cn(
          "relative flex items-center gap-2.5 md:gap-3 backdrop-blur-xl transition-colors duration-300 cursor-default",
          isCore 
            ? "w-24 h-24 md:w-32 md:h-32 flex-col justify-center rounded-[24px] bg-gradient-to-br from-[#4F8CFF]/28 to-[#8B5CF6]/26 border-[#4F8CFF]/45 shadow-[0_0_70px_rgba(79,140,255,0.25)]" 
            : "w-[118px] h-[58px] md:w-[150px] md:h-[74px] p-3 rounded-2xl bg-white/[0.055] border-white/10"
        )}
        style={{
          borderWidth: "1px",
          borderColor: isHovered ? `${node.color}73` : undefined,
          boxShadow: isHovered ? `0 0 28px ${node.color}33` : undefined,
        }}
      >
        <div 
          className={cn(
            "flex items-center justify-center shrink-0 rounded-lg md:rounded-xl",
            isCore ? "w-10 h-10 md:w-12 md:h-12 bg-white/10" : "w-[28px] h-[28px] md:w-[34px] md:h-[34px]"
          )}
          style={!isCore ? { backgroundColor: `${node.color}1F`, color: node.color } : {}}
        >
          {isCore ? (
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[#4F8CFF] rounded-sm flex items-center justify-center font-bold text-white text-xs md:text-sm">CV</div>
          ) : (
            <node.Icon size={isMobile ? 16 : 20} />
          )}
        </div>
        
        <div className={cn("flex flex-col", isCore ? "items-center text-center" : "")}>
          <span className="text-[11px] md:text-[13px] font-bold text-slate-50 leading-tight">
            {node.label}
          </span>
          <span className="hidden md:block text-[11px] text-slate-400 leading-tight mt-0.5">
            {node.subtext}
          </span>
        </div>

        {isHovered && !isCore && (
          <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[8px] md:text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
            Monitored
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function AITrustGraph() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getNodePos = (nodeId: string, mobile: boolean) => {
    if (nodeId === "core") return { x: 50, y: 50 };
    const node = SURROUNDING_NODES.find((n) => n.id === nodeId);
    if (!node) return { x: 50, y: 50 };
    
    const pos = mobile ? node.mobilePos : node.desktopPos;
    const getVal = (val?: string) => val ? parseFloat(val) : 50;
    
    let x = 50;
    let y = 50;

    if (pos.left) x = getVal(pos.left);
    else if (pos.right) x = 100 - getVal(pos.right);

    if (pos.top) y = getVal(pos.top);
    else if (pos.bottom) y = 100 - getVal(pos.bottom);

    return { x, y };
  };

  const lines = useMemo(() => {
    return [
      ...SURROUNDING_NODES.map((node) => ({ from: "core", to: node.id })),
      ...CROSS_LINKS,
    ].map((link) => {
      const p1 = getNodePos(link.from, isMobile);
      const p2 = getNodePos(link.to, isMobile);
      return {
        id: `${link.from}-${link.to}`,
        path: `M ${p1.x}% ${p1.y}% L ${p2.x}% ${p2.y}%`,
        isKey: CROSS_LINKS.some(cl => cl.from === link.from && cl.to === link.to)
      };
    });
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-[90px] md:py-[140px] bg-transparent overflow-hidden"
      aria-label="AI Trust Graph connecting systems, risks, evidence, controls, and regulations"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(33,212,253,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-[72px]"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center px-3 py-1 rounded-full border border-[#21D4FD4D] bg-[#21D4FD0F] mb-6">
            <span className="text-[10px] md:text-[12px] font-semibold text-[#21D4FD] uppercase tracking-[0.08em]">
              AI Trust Graph
            </span>
          </motion.div>
          
          <motion.h2 variants={blurReveal} className="text-[32px] md:text-[48px] font-bold text-white tracking-[-1.5px] leading-[1.1] mb-6 max-w-3xl mx-auto">
            See how every AI system connects to <span className="bg-gradient-to-r from-[#4F8CFF] to-[#21D4FD] bg-clip-text text-transparent">risk</span>, <span className="bg-gradient-to-r from-[#21D4FD] to-[#8B5CF6] bg-clip-text text-transparent">evidence</span>, and <span className="bg-gradient-to-r from-[#8B5CF6] to-[#4F8CFF] bg-clip-text text-transparent">regulation</span>.
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-base md:text-[17px] text-slate-400 max-w-[620px] mx-auto leading-[1.7]">
            CompliVibe maps every AI system to its datasets, models, vendors, risks, controls, evidence, and applicable regulations in one living governance graph.
          </motion.p>
        </motion.div>

        {/* Graph Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-[980px] h-[380px] md:h-[620px] mx-auto bg-[#0B1020DB] border border-white/10 rounded-[24px] backdrop-blur-[20px] shadow-[0_32px_90px_rgba(0,0,0,0.60),0_0_0_1px_rgba(79,140,255,0.08)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="h-11 border-b border-white/10 flex items-center justify-between px-[18px]">
            <div className="flex gap-1.5 items-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F56]" />
              <div className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]" />
              <div className="w-[9px] h-[9px] rounded-full bg-[#27C93F]" />
            </div>
            <div className="text-[12px] text-slate-500 font-mono tracking-tight">AI Governance Trust Graph</div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] text-emerald-500 font-medium">Live Mapping</span>
            </div>
          </div>

          {/* Graph Canvas */}
          <div ref={containerRef} className="relative w-full h-[calc(100%-44px)]">
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {lines.map((line) => (
                <g key={line.id}>
                  <motion.path
                    d={line.path}
                    stroke={line.isKey ? "url(#line-grad)" : "rgba(79,140,255,0.28)"}
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    strokeDasharray={line.isKey ? "8 10" : "none"}
                    className={line.isKey ? "animate-dash" : ""}
                  />
                  {line.isKey && (
                    <Particle path={line.path} delay={Math.random() * 2} />
                  )}
                </g>
              ))}
            </svg>

            {/* Nodes */}
            <Node node={CORE_NODE} index={0} isHovered={hoveredNode === "core"} onHover={setHoveredNode} isMobile={isMobile} />
            {SURROUNDING_NODES.map((node, i) => (
              <Node 
                key={node.id} 
                node={node} 
                index={i + 1} 
                isHovered={hoveredNode === node.id} 
                onHover={setHoveredNode} 
                isMobile={isMobile}
              />
            ))}

            {/* Insight Panel */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[800px] z-20">
              <div className="p-[14px] md:px-[18px] bg-[#050816B8] border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-12">
                {[
                  { value: "12", label: "AI systems mapped", color: "#4F8CFF" },
                  { value: "147", label: "evidence items linked", color: "#21D4FD" },
                  { value: "5", label: "regulations connected", color: "#8B5CF6" },
                ].map((insight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: insight.color }} />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[15px] font-bold text-slate-50">{insight.value}</span>
                      <span className="text-[11px] text-slate-500">{insight.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -36;
          }
        }
        .animate-dash {
          animation: dash 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
