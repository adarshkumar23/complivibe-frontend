"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search, ShieldCheck, Archive, FileBarChart, Sparkles } from "lucide-react";

const proofs = [
  "Vessora AI",
  "Fitlit",
  "GlideRun AI",
  "Beta teams",
  "AI-first SaaS",
  "Enterprise pilots",
];

const pipeline = [
  { label: "Discover", icon: Search, color: "#2563eb" },
  { label: "Govern", icon: ShieldCheck, color: "#7c3aed" },
  { label: "Evidence", icon: Archive, color: "#10b981" },
  { label: "Report", icon: FileBarChart, color: "#06b6d4" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function LogoCloud() {
  const reduce = useReducedMotion();

  return (
    <section className="aurora-bg overflow-hidden py-24 md:py-28">
      <div className="cv-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy + proof pills */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            <motion.span variants={item} className="section-kicker mb-4">
              Early Trust Signals
            </motion.span>
            <motion.h2 variants={item} className="section-title mt-4 text-balance">
              Built for AI teams that need{" "}
              <span className="text-gradient-trust">trust before scale</span>.
            </motion.h2>
            <motion.p variants={item} className="section-subtitle mt-5">
              CompliVibe helps AI-first teams turn scattered systems, evidence, and risk signals
              into a customer-ready trust posture.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              {proofs.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-2 text-sm font-medium text-[var(--cv-muted)] shadow-[var(--cv-shadow-soft)] backdrop-blur-sm transition-colors duration-200 hover:border-[#2563eb]/25 hover:text-[var(--cv-ink)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed]" />
                  {p}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — mini trust pipeline */}
          <motion.div
            className="liquid-card glass-highlight p-6 md:p-7"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#2563eb] dark:text-[#3b82f6]" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--cv-muted)]">
                Trust pipeline
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-2">
              {pipeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex flex-1 items-center">
                    <motion.div
                      className="flex flex-1 flex-col items-center gap-2"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: reduce ? 0 : 0.15 + i * 0.12, duration: 0.4 }}
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                        style={{
                          backgroundColor: `${step.color}14`,
                          borderColor: `${step.color}33`,
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--cv-ink)]">{step.label}</span>
                    </motion.div>

                    {i < pipeline.length - 1 && (
                      <div className="relative mx-1 h-px flex-1 self-start" style={{ marginTop: "24px" }}>
                        <div className="absolute inset-0 bg-[var(--cv-border)]" />
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ delay: reduce ? 0 : 0.3 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-4 py-3 text-[12px] leading-relaxed text-[var(--cv-muted)]">
              From first AI system to a continuously updated, customer-ready trust posture.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
