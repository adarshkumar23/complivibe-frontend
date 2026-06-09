"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  BrainCircuit,
  Building2,
  AlertTriangle,
  ShieldCheck,
  FolderOpen,
  Scale,
  UserCircle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  Icon: LucideIcon;
  color: string;
  xPct: number;
  yPct: number;
  description: string;
  isRoot?: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
  color: string;
}

const NODES: GraphNode[] = [
  { id: "ai-system", label: "AI System", Icon: Cpu, color: "#0070F3", xPct: 50, yPct: 14, description: "Central AI system under governance", isRoot: true },
  { id: "dataset", label: "Dataset", Icon: Database, color: "#00C48C", xPct: 22, yPct: 35, description: "Training and inference data sources" },
  { id: "model", label: "Model", Icon: BrainCircuit, color: "#7928CA", xPct: 78, yPct: 35, description: "Model versions and configurations" },
  { id: "vendor", label: "Vendor", Icon: Building2, color: "#888888", xPct: 8, yPct: 58, description: "Third-party AI providers" },
  { id: "risk", label: "Risk", Icon: AlertTriangle, color: "#FF3B3B", xPct: 35, yPct: 58, description: "Identified risks and threats" },
  { id: "control", label: "Control", Icon: ShieldCheck, color: "#00C48C", xPct: 65, yPct: 58, description: "Mitigating controls and safeguards" },
  { id: "evidence", label: "Evidence", Icon: FolderOpen, color: "#F5A623", xPct: 22, yPct: 80, description: "Audit evidence and documentation" },
  { id: "regulation", label: "Regulation", Icon: Scale, color: "#7928CA", xPct: 50, yPct: 82, description: "Applicable regulatory frameworks" },
  { id: "owner", label: "Owner", Icon: UserCircle, color: "#00C48C", xPct: 78, yPct: 80, description: "Responsible teams and individuals" },
  { id: "status", label: "Status", Icon: CheckCircle2, color: "#00C48C", xPct: 92, yPct: 58, description: "Current compliance status" },
];

const EDGES: GraphEdge[] = [
  { from: "ai-system", to: "dataset", color: "#0070F3" },
  { from: "ai-system", to: "model", color: "#7928CA" },
  { from: "ai-system", to: "risk", color: "#FF3B3B" },
  { from: "ai-system", to: "vendor", color: "#888888" },
  { from: "dataset", to: "model", color: "#7928CA" },
  { from: "dataset", to: "risk", color: "#FF3B3B" },
  { from: "model", to: "control", color: "#00C48C" },
  { from: "model", to: "evidence", color: "#F5A623" },
  { from: "risk", to: "control", color: "#FF3B3B" },
  { from: "risk", to: "regulation", color: "#7928CA" },
  { from: "control", to: "evidence", color: "#00C48C" },
  { from: "control", to: "status", color: "#00C48C" },
  { from: "evidence", to: "regulation", color: "#F5A623" },
  { from: "regulation", to: "owner", color: "#7928CA" },
  { from: "owner", to: "status", color: "#00C48C" },
];

const dotDurations = [4000, 5000, 3500, 6000, 4500, 5500, 3000, 4000, 5000, 3500, 4500, 5000, 4000, 5500, 3000];
const floatY = [0, -6, -4, -8, -5, -7, -4, -6, -5, -7];
const floatDurations = [5, 6, 4.5, 7, 5.5, 6.5, 4, 5, 6, 4.5];

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getNodePixelPos(node: GraphNode, size: { width: number; height: number }) {
  return { x: (node.xPct / 100) * size.width, y: (node.yPct / 100) * size.height };
}

function getBezierControls(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const perpX = (-dy / len) * 45;
  const perpY = (dx / len) * 45;
  const cp1 = { x: p1.x + (midX - p1.x) * 0.5 + perpX, y: p1.y + (midY - p1.y) * 0.5 + perpY };
  const cp2 = { x: p2.x - (p2.x - midX) * 0.5 + perpX, y: p2.y - (p2.y - midY) * 0.5 + perpY };
  return { cp1, cp2 };
}

function getBezierPath(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const { cp1, cp2 } = getBezierControls(p1, p2);
  return `M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${p2.x} ${p2.y}`;
}

function getBezierPoint(
  t: number,
  p0: { x: number; y: number },
  cp1: { x: number; y: number },
  cp2: { x: number; y: number },
  p3: { x: number; y: number },
) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * cp1.x + 3 * mt * t ** 2 * cp2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * cp1.y + 3 * mt * t ** 2 * cp2.y + t ** 3 * p3.y,
  };
}

export default function AITrustGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [dotPositions, setDotPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [inViewTriggered, setInViewTriggered] = useState(false);

  useEffect(() => {
    if (inView) setInViewTriggered(true);
  }, [inView]);

  useEffect(() => {
    if (inViewTriggered) controls.start("visible");
  }, [controls, inViewTriggered]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (!containerRef.current) return;
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (containerSize.width <= 0) return;

    const intervals = EDGES.map((edge, index) => {
      const fromNode = NODES.find((node) => node.id === edge.from);
      const toNode = NODES.find((node) => node.id === edge.to);
      if (!fromNode || !toNode) return 0;

      const p0 = getNodePixelPos(fromNode, containerSize);
      const p3 = getNodePixelPos(toNode, containerSize);
      const { cp1, cp2 } = getBezierControls(p0, p3);
      const start = performance.now() + index * 140;
      const duration = dotDurations[index];

      return window.setInterval(() => {
        const elapsed = (performance.now() - start) % duration;
        const t = elapsed / duration;
        const point = getBezierPoint(t, p0, cp1, cp2, p3);

        setDotPositions((current) => {
          const next = [...current];
          next[index] = point;
          return next;
        });
      }, 16);
    });

    return () => intervals.forEach((interval) => window.clearInterval(interval));
  }, [containerSize]);

  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return null;

    const ids = new Set<string>([hoveredNodeId]);
    EDGES.forEach((edge) => {
      if (edge.from === hoveredNodeId || edge.to === hoveredNodeId) {
        ids.add(edge.from);
        ids.add(edge.to);
      }
    });
    return ids;
  }, [hoveredNodeId]);

  const hoveredNode = hoveredNodeId ? NODES.find((node) => node.id === hoveredNodeId) : null;

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-fine opacity-[0.10] pointer-events-none" />
      <div className="absolute left-0 top-1/4 h-[420px] w-[420px] rounded-full bg-[#0070F3]/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 h-[420px] w-[420px] rounded-full bg-[#00C48C]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#0070F3]">AI TRUST GRAPH</p>
        <h2
          className="mt-4 text-balance font-bold"
          style={{
            fontSize: "clamp(1.75rem,4vw,3rem)",
            lineHeight: "1.15",
            letterSpacing: "-0.03em",
            background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          See how every AI system connects to risk, evidence, and regulation.
        </h2>
        <p className="mt-5 text-[#666] text-base leading-relaxed max-w-[520px] mx-auto">
          CompliVibe maps AI systems, datasets, vendors, risks, controls, evidence, and regulations into one living governance graph.
        </p>
      </div>

      <div className="relative max-w-[880px] mx-auto px-6">
        <div className="relative h-[360px] md:h-[540px] bg-[#0A0A0A] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_64px_rgba(0,0,0,0.6)] flex flex-col">
          <div className="h-10 border-b border-white/[0.06] bg-[#111] flex items-center justify-between px-4 shrink-0">
            <div className="flex gap-1.5 items-center">
              <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F56]" />
              <div className="h-[9px] w-[9px] rounded-full bg-[#FFBD2E]" />
              <div className="h-[9px] w-[9px] rounded-full bg-[#27C93F]" />
            </div>
            <div className="text-xs text-[#444] font-mono tracking-tight">AI Governance Graph - CompliVibe</div>
            <div className="flex items-center gap-1.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-[#00C48C]"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-[#00C48C]">Live</span>
            </div>
          </div>

          <div ref={containerRef} className="relative flex-1">
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
              {containerSize.width > 0 &&
                EDGES.map((edge, index) => {
                  const fromNode = NODES.find((node) => node.id === edge.from);
                  const toNode = NODES.find((node) => node.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  const fromPos = getNodePixelPos(fromNode, containerSize);
                  const toPos = getNodePixelPos(toNode, containerSize);
                  const connectedEdge = connectedNodeIds?.has(edge.from) && connectedNodeIds?.has(edge.to);
                  const strokeOpacity = hoveredNodeId === null ? 0.25 : connectedEdge ? 0.8 : 0.04;
                  const dotOpacity = hoveredNodeId === null ? 0.6 : connectedEdge ? 0.9 : 0.05;

                  return (
                    <React.Fragment key={`${edge.from}-${edge.to}`}>
                      <motion.path
                        d={getBezierPath(fromPos, toPos)}
                        stroke={edge.color}
                        strokeOpacity={strokeOpacity}
                        strokeWidth={connectedEdge ? 2 : 1}
                        fill="none"
                        strokeLinecap="round"
                        style={{ transition: "stroke-opacity 0.2s, stroke-width 0.2s" }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inViewTriggered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                      />
                      <circle
                        cx={dotPositions[index]?.x ?? 0}
                        cy={dotPositions[index]?.y ?? 0}
                        r={2.5}
                        fill={edge.color}
                        opacity={dotOpacity}
                        style={{ transition: "opacity 0.2s" }}
                      />
                    </React.Fragment>
                  );
                })}
            </svg>

            {NODES.map((node, index) => {
              const Icon = node.Icon;
              const connected = hoveredNodeId === null || connectedNodeIds?.has(node.id);

              return (
                <motion.div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: `${node.xPct}%`,
                    top: `${node.yPct}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={inViewTriggered ? { opacity: connected ? 1 : 0.2 } : { opacity: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, floatY[index], 0] }}
                    transition={{ duration: floatDurations[index], ease: "easeInOut", repeat: Infinity }}
                  >
                    <motion.div
                      style={{
                        width: node.isRoot ? 68 : 54,
                        height: node.isRoot ? 68 : 54,
                        background: hexToRgba(node.color, 0.1),
                        border: `1.5px solid ${hexToRgba(node.color, hoveredNodeId === node.id ? 0.7 : 0.25)}`,
                        borderRadius: 14,
                        boxShadow: hoveredNodeId === node.id ? `0 0 24px ${hexToRgba(node.color, 0.4)}` : "none",
                        transition: "box-shadow 0.2s, border-color 0.2s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                        cursor: "pointer",
                      }}
                      initial={{ scale: 0.5 }}
                      animate={inViewTriggered ? { scale: 1 } : { scale: 0.5 }}
                      whileHover={{ scale: 1.07 }}
                      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      <Icon size={node.isRoot ? 20 : 16} color={node.color} />
                      <span className="text-[9px] font-semibold text-[#666] text-center whitespace-nowrap select-none">
                        {node.label}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}

            <AnimatePresence>
              {hoveredNode && (
                <motion.div
                  style={{
                    position: "absolute",
                    zIndex: 20,
                    left: hoveredNode.xPct > 60 ? `${hoveredNode.xPct - 18}%` : `${hoveredNode.xPct + 5}%`,
                    top: hoveredNode.yPct > 60 ? `${hoveredNode.yPct - 16}%` : `${hoveredNode.yPct + 8}%`,
                  }}
                  className="bg-[#111] border border-white/[0.12] rounded-xl px-3 py-2.5 shadow-2xl pointer-events-none min-w-[160px]"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <p className="text-sm font-semibold text-white">{hoveredNode.label}</p>
                  <p className="text-xs text-[#666] mt-0.5">{hoveredNode.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { Icon: Cpu, color: "#0070F3", text: "10 AI systems mapped" },
            { Icon: AlertTriangle, color: "#FF3B3B", text: "3 critical risks tracked" },
            { Icon: FolderOpen, color: "#F5A623", text: "147 evidence items" },
            { Icon: CheckCircle2, color: "#00C48C", text: "74% EU AI Act readiness" },
          ].map((pill, index) => (
            <motion.div
              key={pill.text}
              className="bg-[#0A0A0A] border border-white/[0.06] rounded-full px-4 py-2 flex items-center gap-2 text-xs text-[#666]"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.08 }}
            >
              <pill.Icon size={14} color={pill.color} />
              {pill.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
