"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { 
  LayoutGrid, 
  Shield, 
  Activity, 
  Scale, 
  Globe, 
  FileText, 
  AlertTriangle, 
  ShoppingBag
} from "lucide-react";

// Helper for RGBA colors
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface NodeData {
  id: string;
  label: string;
  Icon: React.ElementType;
  color: string;
  x: number;
  y: number;
}

const nodes: NodeData[] = [
  { id: 'inventory', label: 'AI Inventory', Icon: LayoutGrid, color: '#0070F3', x: 50, y: 8 },
  { id: 'evidence', label: 'Evidence', Icon: Shield, color: '#00C48C', x: 80, y: 22 },
  { id: 'monitoring', label: 'Monitoring', Icon: Activity, color: '#21D4FD', x: 92, y: 48 },
  { id: 'legal', label: 'Legal', Icon: Scale, color: '#7928CA', x: 80, y: 74 },
  { id: 'trust', label: 'Trust Center', Icon: Globe, color: '#0070F3', x: 50, y: 88 },
  { id: 'regulations', label: 'Regulations', Icon: FileText, color: '#F5A623', x: 20, y: 74 },
  { id: 'risk', label: 'Risk', Icon: AlertTriangle, color: '#FF3B3B', x: 8, y: 48 },
  { id: 'procurement', label: 'Procurement', Icon: ShoppingBag, color: '#00C48C', x: 20, y: 22 },
];

const HUB_X = 50;
const HUB_Y = 48;

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [dotPositions, setDotPositions] = useState<{x: number, y: number}[]>(nodes.map(() => ({x: HUB_X, y: HUB_Y})));

  // Update container size on resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Traveling dots animation
  useEffect(() => {
    if (containerSize.width === 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      const newPositions = nodes.map((node, i) => {
        const duration = 3000 + i * 300; // 3-5 seconds
        const rawT = (elapsed % (duration * 2)) / duration;
        const t = rawT > 1 ? 2 - rawT : rawT; // Ping-pong t from 0 to 1

        // Bezier points calculation
        const p0 = { x: (HUB_X / 100) * containerSize.width, y: (HUB_Y / 100) * containerSize.height };
        const p3 = { x: (node.x / 100) * containerSize.width, y: (node.y / 100) * containerSize.height };
        
        // Control points
        const vx = p3.x - p0.x;
        const vy = p3.y - p0.y;
        const len = Math.sqrt(vx * vx + vy * vy) || 1;
        const ux = -vy / len;
        const uy = vx / len;
        const offset = 20;

        const p1 = { x: p0.x + vx * 0.33 + ux * offset, y: p0.y + vy * 0.33 + uy * offset };
        const p2 = { x: p0.x + vx * 0.66 + ux * offset, y: p0.y + vy * 0.66 + uy * offset };

        // Cubic Bezier formula
        const mt = 1 - t;
        const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
        const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;

        return { x, y };
      });

      setDotPositions(newPositions);
    }, 16);

    return () => clearInterval(interval);
  }, [containerSize]);

  // Bezier paths for SVG
  const paths = useMemo(() => {
    if (containerSize.width === 0) return [];

    return nodes.map(node => {
      const p0 = { x: (HUB_X / 100) * containerSize.width, y: (HUB_Y / 100) * containerSize.height };
      const p3 = { x: (node.x / 100) * containerSize.width, y: (node.y / 100) * containerSize.height };
      
      const vx = p3.x - p0.x;
      const vy = p3.y - p0.y;
      const len = Math.sqrt(vx * vx + vy * vy) || 1;
      const ux = -vy / len;
      const uy = vx / len;
      const offset = 20;

      const p1 = { x: p0.x + vx * 0.33 + ux * offset, y: p0.y + vy * 0.33 + uy * offset };
      const p2 = { x: p0.x + vx * 0.66 + ux * offset, y: p0.y + vy * 0.66 + uy * offset };

      return {
        id: node.id,
        color: node.color,
        d: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`
      };
    });
  }, [containerSize]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute left-[30%] top-[40%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,196,140,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute right-[25%] top-[35%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(121,40,202,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center mb-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#00C48C] mb-4">THE SOLUTION</p>
        <h2 
          className="mx-auto"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.55))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          One command center for everything AI governance needs.
        </h2>
        <p className="text-[#555] text-[15px] leading-relaxed max-w-[520px] mx-auto mt-4">
          CompliVibe connects AI inventory, risk monitoring, compliance docs, evidence vaulting, regulatory mapping, and trust workflows into one platform.
        </p>
      </div>

      {/* Diagram Container */}
      <div className="max-w-[900px] mx-auto px-6 relative">
        <div 
          ref={containerRef}
          className="relative w-full h-[420px] md:h-[560px]"
        >
          {/* SVG Layer */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
            <defs>
              {nodes.map(node => (
                <linearGradient 
                  key={`grad-${node.id}`} 
                  id={`line-gradient-${node.id}`} 
                  gradientUnits="userSpaceOnUse"
                  x1={`${HUB_X}%`} y1={`${HUB_Y}%`}
                  x2={`${node.x}%`} y2={`${node.y}%`}
                >
                  <stop offset="0%" stopColor="#0070F3" stopOpacity="0.6" />
                  <stop offset="100%" stopColor={node.color} stopOpacity="0.4" />
                </linearGradient>
              ))}
            </defs>
            
            {isInView && paths.map((path, i) => (
              <React.Fragment key={path.id}>
                <motion.path
                  d={path.d}
                  stroke={`url(#line-gradient-${path.id})`}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0.3, 0.7, 0.3] 
                  }}
                  transition={{ 
                    pathLength: { duration: 0.8, delay: i * 0.08, ease: "easeOut" },
                    opacity: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <circle 
                  cx={dotPositions[i]?.x || 0} 
                  cy={dotPositions[i]?.y || 0} 
                  r="3" 
                  fill={path.color} 
                  opacity="0.8" 
                />
              </React.Fragment>
            ))}
          </svg>

          {/* Center Hub */}
          <motion.div
            className="absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Pulse Rings */}
            <motion.div 
              className="absolute -inset-3 rounded-3xl border border-[#0070F3]/15 pointer-events-none"
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -inset-6 rounded-3xl border border-[#0070F3]/08 pointer-events-none"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] flex flex-col items-center justify-center gap-2 rounded-3xl border border-[#0070F3]/35 backdrop-blur-[20px] shadow-[0_0_40px_rgba(0,112,243,0.20),0_0_80px_rgba(0,112,243,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]"
              style={{
                background: "linear-gradient(135deg, rgba(0,112,243,0.20) 0%, rgba(121,40,202,0.20) 100%)",
              }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#0070F3] to-[#7928CA] flex items-center justify-center shadow-[0_0_16px_rgba(0,112,243,0.4)]">
                <span className="text-[11px] md:text-[13px] font-black text-white">CV</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-semibold text-[#888] tracking-[0.08em] uppercase">Governance OS</span>
            </motion.div>
          </motion.div>

          {/* HTML Nodes */}
          {nodes.map((node, i) => (
            <div 
              key={node.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <motion.div
                animate={{ y: [0, -5, -4, -7, -5, -6, -4, -5, -6, -4][i] }}
                transition={{ 
                  duration: [5, 6, 4.5, 7, 5.5, 6.5, 4, 5, 6, 4.5][i], 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <motion.div
                  className="w-[56px] h-[56px] md:w-[72px] md:h-[72px] flex flex-col items-center justify-center gap-1.5 rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: hexToRgba(node.color, 0.08),
                    border: `1.5px solid ${hexToRgba(node.color, 0.20)}`
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ 
                    scale: 1.08,
                    backgroundColor: hexToRgba(node.color, 0.16),
                    borderColor: hexToRgba(node.color, 0.50),
                    boxShadow: `0 0 24px ${hexToRgba(node.color, 0.25)}, 0 0 48px ${hexToRgba(node.color, 0.10)}`
                  }}
                >
                  <node.Icon className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" style={{ color: node.color }} />
                  <span className="hidden sm:block text-[9px] font-bold text-[#666] text-center whitespace-nowrap px-1 max-w-full overflow-hidden text-overflow-ellipsis">
                    {node.label}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-[800px] mx-auto px-6 mt-16">
        <div className="grid grid-cols-3">
          {[
            { value: "10", label: "Modules", sub: "Complete platform" },
            { value: "5", label: "Regulations", sub: "Covered at launch" },
            { value: "1", label: "Platform", sub: "End-to-end governance" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className={`flex flex-col items-center text-center px-4 md:px-8 py-6 ${i < 2 ? "border-r border-white/[0.08]" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div 
                className="font-mono font-extrabold tracking-tighter leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.5))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-white text-sm md:text-base font-semibold mt-2">{stat.label}</div>
              <div className="text-[#444] text-[10px] md:text-[12px] mt-1 uppercase tracking-widest font-medium">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
