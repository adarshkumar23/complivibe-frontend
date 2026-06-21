"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search, ShieldCheck, Archive, Activity, FileBarChart, type LucideIcon } from "lucide-react";

type Step = {
  n: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  color: string;
};

const steps: Step[] = [
  {
    n: "01",
    label: "Discover",
    desc: "Map AI systems, models, datasets, vendors, owners, and use cases.",
    icon: Search,
    color: "#2563eb",
  },
  {
    n: "02",
    label: "Govern",
    desc: "Assign policies, controls, approvals, risk reviews, and human sign-off.",
    icon: ShieldCheck,
    color: "#7c3aed",
  },
  {
    n: "03",
    label: "Evidence",
    desc: "Collect proof from workflows, documents, logs, integrations, and reviews.",
    icon: Archive,
    color: "#10b981",
  },
  {
    n: "04",
    label: "Monitor",
    desc: "Track risk changes, incidents, drift indicators, and production trust signals.",
    icon: Activity,
    color: "#06b6d4",
  },
  {
    n: "05",
    label: "Report",
    desc: "Publish trust centers, audit packs, customer reports, and board-ready summaries.",
    icon: FileBarChart,
    color: "#f59e0b",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const node: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function StepCard({ step, reduce }: { step: Step; reduce: boolean | null }) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={node}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="liquid-card glass-highlight flex flex-col items-center gap-3 px-4 py-6 text-center"
    >
      <span className="font-mono text-[11px] font-semibold text-[var(--cv-muted)]">{step.n}</span>
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl border"
        style={{ backgroundColor: `${step.color}14`, borderColor: `${step.color}33` }}
      >
        <Icon className="h-6 w-6" style={{ color: step.color }} />
      </span>
      <h3 className="text-base font-bold tracking-tight text-[var(--cv-ink)]">{step.label}</h3>
      <p className="text-xs leading-relaxed text-[var(--cv-muted)]">{step.desc}</p>
    </motion.div>
  );
}

export default function SolutionSection() {
  const reduce = useReducedMotion();

  return (
    <section className="aurora-bg overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker mb-4">The Operating Layer</span>
          <h2 className="section-title mt-4 text-balance">
            Turn AI chaos into{" "}
            <span className="text-gradient-trust">governed trust</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            CompliVibe connects AI systems, risks, controls, evidence, and observability signals into
            one operating layer — so teams can govern, monitor, and prove trust continuously.
          </p>
        </motion.div>

        {/* Desktop horizontal flow */}
        <div className="relative mt-16 hidden md:block">
          {/* connecting line behind the row of nodes */}
          <div className="pointer-events-none absolute left-0 right-0 top-[92px] z-0 mx-[10%] h-px">
            <div className="absolute inset-0 bg-[var(--cv-border)]" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2563eb] via-[#10b981] to-[#f59e0b]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <motion.div
            className="relative z-10 grid grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {steps.map((s) => (
              <StepCard key={s.label} step={s} reduce={reduce} />
            ))}
          </motion.div>
        </div>

        {/* Mobile vertical chain */}
        <motion.div
          className="relative mt-12 flex flex-col gap-4 md:hidden"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* vertical connector */}
          <div className="pointer-events-none absolute bottom-10 left-[27px] top-10 w-px">
            <div className="absolute inset-0 bg-[var(--cv-border)]" />
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#2563eb] via-[#10b981] to-[#f59e0b]"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} variants={node} className="relative z-10 flex items-start gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-[var(--cv-surface-strong)]"
                  style={{ borderColor: `${s.color}40` }}
                >
                  <Icon className="h-6 w-6" style={{ color: s.color }} />
                </span>
                <div className="liquid-card glass-highlight flex-1 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[var(--cv-muted)]">{s.n}</span>
                    <h3 className="text-base font-bold tracking-tight text-[var(--cv-ink)]">{s.label}</h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--cv-muted)]">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Outcome strip */}
        <motion.div
          className="liquid-panel mx-auto mt-14 flex max-w-3xl flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-sm font-semibold text-[var(--cv-ink)]">One continuous trust loop.</p>
            <p className="mt-1 text-xs text-[var(--cv-muted)]">
              Discover → Govern → Evidence → Monitor → Report, always up to date.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-2 text-xs font-medium text-[var(--cv-muted)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
            Live trust posture
          </span>
        </motion.div>
      </div>
    </section>
  );
}
