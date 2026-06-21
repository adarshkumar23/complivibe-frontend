"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  FolderOpen,
  Timer,
  Gauge,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export default function ROICalculator() {
  const reduce = useReducedMotion();

  // Interactive inputs (honest drivers of manual governance effort)
  const [aiSystems, setAiSystems] = useState(8);
  const [frameworks, setFrameworks] = useState(3);
  const [hoursPerReview, setHoursPerReview] = useState(3);

  // ---- Transparent estimate logic (illustrative, not fine/fear based) ----
  // Manual effort = systems × frameworks × hours per review, per month.
  const manualHours = aiSystems * frameworks * hoursPerReview;
  // CompliVibe automates the repetitive collection/mapping; ~70% reduction.
  const automationFactor = 0.7;
  const hoursSaved = Math.round(manualHours * automationFactor);
  // Evidence readiness gap grows with surface area, capped at a sensible ceiling.
  const evidenceGap = Math.min(95, Math.round(aiSystems * 2 + frameworks * 6));
  // Buyer trust delay risk: weeks of approval drag from scattered proof.
  const buyerDelayWeeks = Math.max(1, Math.round(aiSystems / 6 + frameworks / 2));

  const aiPct = ((aiSystems - 1) / (50 - 1)) * 100;
  const fwPct = ((frameworks - 1) / (6 - 1)) * 100;
  const hrPct = ((hoursPerReview - 1) / (8 - 1)) * 100;

  const results: {
    icon: LucideIcon;
    accent: string;
    label: string;
    value: string;
    sub: string;
  }[] = [
    {
      icon: Clock,
      accent: "#2563eb",
      label: "Manual effort estimate",
      value: `${manualHours.toLocaleString()} hrs/mo`,
      sub: "Reviews, evidence collection, and mapping by hand",
    },
    {
      icon: FolderOpen,
      accent: "#f59e0b",
      label: "Evidence readiness gap",
      value: `${evidenceGap}%`,
      sub: "Share of proof not yet centralized or audit-ready",
    },
    {
      icon: Timer,
      accent: "#7c3aed",
      label: "Buyer trust delay risk",
      value: `~${buyerDelayWeeks} wk`,
      sub: "Typical approval drag from scattered trust evidence",
    },
    {
      icon: Gauge,
      accent: "#10b981",
      label: "Potential time saved",
      value: `${hoursSaved.toLocaleString()} hrs/mo`,
      sub: "With one operating layer for governance and evidence",
    },
  ];

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
          <span className="section-kicker mb-4">Trust ROI</span>
          <h2 className="section-title mt-4 text-balance">
            Estimate the cost of manual AI{" "}
            <span className="text-gradient-trust">governance</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            Manual reviews, scattered evidence, delayed enterprise approvals, and repeated
            questionnaires create hidden trust drag. CompliVibe helps teams reduce that drag with one
            operating layer.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          className="liquid-card glass-highlight mx-auto mt-12 max-w-5xl overflow-hidden p-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Inputs */}
            <div className="border-b border-[var(--cv-border)] p-8 lg:border-b-0 lg:border-r">
              <div className="mb-8 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--cv-muted)]">
                  Your AI footprint
                </span>
              </div>

              {/* AI systems */}
              <div className="mb-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[var(--cv-ink)]">AI systems</span>
                  <span className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-1 font-mono text-[14px] font-bold text-[var(--cv-ink)]">
                    {aiSystems}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={aiSystems}
                  onChange={(e) => setAiSystems(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none rounded-full"
                  style={{
                    height: "4px",
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${aiPct}%, var(--cv-border) ${aiPct}%, var(--cv-border) 100%)`,
                  }}
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--cv-muted)]">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              {/* Frameworks */}
              <div className="mb-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[var(--cv-ink)]">Frameworks tracked</span>
                  <span className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-1 font-mono text-[14px] font-bold text-[var(--cv-ink)]">
                    {frameworks}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={frameworks}
                  onChange={(e) => setFrameworks(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none rounded-full"
                  style={{
                    height: "4px",
                    background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${fwPct}%, var(--cv-border) ${fwPct}%, var(--cv-border) 100%)`,
                  }}
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--cv-muted)]">
                  <span>1</span>
                  <span>6</span>
                </div>
              </div>

              {/* Hours per review */}
              <div className="mb-2">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[var(--cv-ink)]">Manual hours per review</span>
                  <span className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-1 font-mono text-[14px] font-bold text-[var(--cv-ink)]">
                    {hoursPerReview}h
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={hoursPerReview}
                  onChange={(e) => setHoursPerReview(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none rounded-full"
                  style={{
                    height: "4px",
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${hrPct}%, var(--cv-border) ${hrPct}%, var(--cv-border) 100%)`,
                  }}
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--cv-muted)]">
                  <span>1h</span>
                  <span>8h</span>
                </div>
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-[var(--cv-muted)]">
                Estimates are illustrative and update live as you adjust your AI footprint.
              </p>
            </div>

            {/* Results */}
            <div className="bg-[var(--cv-bg-soft)]/40 p-8">
              <div className="mb-8 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--cv-muted)]">
                  Your trust drag estimate
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {results.map((r) => {
                  const Icon = r.icon;
                  return (
                    <motion.div
                      key={r.label}
                      className="rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] p-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: r.accent }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--cv-muted)]">
                          {r.label}
                        </span>
                      </div>
                      <div className="font-mono text-2xl font-bold leading-none" style={{ color: r.accent }}>
                        {r.value}
                      </div>
                      <div className="mt-1.5 text-[11px] leading-snug text-[var(--cv-muted)]">{r.sub}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recommended next step */}
              <div className="mt-4 rounded-xl border border-[#2563eb]/25 bg-gradient-to-br from-[#2563eb]/[0.07] to-[#7c3aed]/[0.05] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--cv-muted)]">
                  Recommended next step
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--cv-ink)]">
                  Map your AI systems and see your real trust posture in about 7 minutes.
                </p>
                <motion.a
                  href="/score"
                  whileHover={reduce ? undefined : { x: 3 }}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
                >
                  Start Trust Scan
                  <ArrowRight size={14} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
