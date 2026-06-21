"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EyeOff, FolderOpen, Layers, ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Embedded mini-visuals (one per card)                              */
/* ------------------------------------------------------------------ */

/* 1. Shadow AI — visible vs unseen systems */
function ShadowAIVisual() {
  const cells = [
    { seen: true },
    { seen: true },
    { seen: false },
    { seen: true },
    { seen: false },
    { seen: false },
    { seen: true },
    { seen: false },
  ];
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {cells.map((c, i) => (
        <motion.div
          key={i}
          className={`flex h-8 items-center justify-center rounded-md border text-[9px] font-mono ${
            c.seen
              ? "border-[#2563eb]/30 bg-[#2563eb]/10 text-[#2563eb] dark:text-[#3b82f6]"
              : "border-dashed border-[#f59e0b]/40 bg-[#f59e0b]/5 text-[#b97c0a] dark:text-[#fbbf24]"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
        >
          {c.seen ? "AI" : "?"}
        </motion.div>
      ))}
    </div>
  );
}

/* 2. Scattered evidence — disconnected fragments */
function ScatteredVisual() {
  const tags = ["Policies", "Reviews", "Logs", "Approvals", "Screenshots", "Controls"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t, i) => (
        <motion.span
          key={t}
          className="rounded-md border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2 py-1 text-[10px] text-[var(--cv-muted)]"
          style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (1 + (i % 3))}deg)` }}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

/* 3. Overlapping regulations — stacked translucent layers */
function OverlapVisual() {
  const layers = [
    { name: "AI", color: "#2563eb" },
    { name: "Privacy", color: "#7c3aed" },
    { name: "Security", color: "#06b6d4" },
    { name: "Sector", color: "#10b981" },
  ];
  return (
    <div className="relative h-16">
      {layers.map((l, i) => (
        <motion.div
          key={l.name}
          className="absolute flex h-8 items-center rounded-lg border px-3 text-[10px] font-medium backdrop-blur-sm"
          style={{
            left: `${i * 18}px`,
            top: `${i * 8}px`,
            right: 0,
            backgroundColor: `${l.color}12`,
            borderColor: `${l.color}33`,
            color: l.color,
            zIndex: layers.length - i,
          }}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          {l.name}
        </motion.div>
      ))}
    </div>
  );
}

/* 4. Buyers ask for proof — questionnaire checklist */
function ProofVisual() {
  const rows = [
    { q: "AI governance in place?", ok: true },
    { q: "Evidence available?", ok: true },
    { q: "Risk monitoring active?", ok: false },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <motion.div
          key={r.q}
          className="flex items-center justify-between rounded-md border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-1.5 text-[10px] text-[var(--cv-muted)]"
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
        >
          {r.q}
          <span
            className={`ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
              r.ok
                ? "bg-[#10b981]/15 text-[#0f9b6c] dark:text-[#34d399]"
                : "bg-[#f59e0b]/15 text-[#b97c0a] dark:text-[#fbbf24]"
            }`}
          >
            {r.ok ? "✓" : "?"}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cards                                                              */
/* ------------------------------------------------------------------ */
const cards = [
  {
    icon: EyeOff,
    accent: "#f59e0b",
    title: "Shadow AI is spreading",
    description:
      "Teams adopt models, copilots, APIs, and agents before governance teams can see them.",
    visual: <ShadowAIVisual />,
  },
  {
    icon: FolderOpen,
    accent: "#2563eb",
    title: "Evidence is scattered",
    description:
      "Policies, reviews, approvals, logs, screenshots, and controls live across disconnected tools.",
    visual: <ScatteredVisual />,
  },
  {
    icon: Layers,
    accent: "#7c3aed",
    title: "Regulations are overlapping",
    description:
      "AI, privacy, security, and sector frameworks now collide across markets and customers.",
    visual: <OverlapVisual />,
  },
  {
    icon: ShieldCheck,
    accent: "#10b981",
    title: "Buyers now ask for proof",
    description:
      "Enterprise customers want evidence-backed trust posture before approving AI vendors.",
    visual: <ProofVisual />,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker mb-4">The Trust Gap</span>
          <h2 className="section-title mt-4 text-balance">
            AI is moving faster than{" "}
            <span className="text-gradient-trust">trust can keep up</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            Modern companies are shipping AI into products, workflows, vendors, and operations — but
            governance, evidence, risk monitoring, and proof are still scattered across teams and
            tools.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={item}
                className="bento-card glass-highlight flex flex-col gap-5 p-7"
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{ backgroundColor: `${card.accent}14`, borderColor: `${card.accent}33` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: card.accent }} />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">
                    {card.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-[var(--cv-muted)]">{card.description}</p>

                <div className="mt-auto rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface)] p-4">
                  {card.visual}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
