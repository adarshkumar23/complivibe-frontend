"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TERMINAL_LINES = [
  { type: "system", text: "$ complivibe scan --system customer-ai-v2", color: "#555" },
  { type: "info", text: "→ Connecting to governance engine...", color: "#444" },
  { type: "success", text: "✓ System identified: Customer Scoring Model", color: "#00C48C" },
  { type: "info", text: "→ Running EU AI Act classification...", color: "#444" },
  { type: "warning", text: "⚠ Annex III match: Credit + employment decisions", color: "#F5A623" },
  { type: "critical", text: "✗ Risk tier: HIGH RISK (Article 6)", color: "#FF3B3B" },
  { type: "info", text: "→ Checking India DPDP scope...", color: "#444" },
  { type: "warning", text: "⚠ DPDP Section 4: Personal data processing flagged", color: "#F5A623" },
  { type: "info", text: "→ Generating Annex IV documentation...", color: "#444" },
  { type: "progress", text: "  §1 System Description .................. ✓", color: "#00C48C" },
  { type: "progress", text: "  §2 Design Specifications ............... ✓", color: "#00C48C" },
  { type: "progress", text: "  §3 Development Process ................. ✓", color: "#00C48C" },
  { type: "progress", text: "  §4-§11 Remaining sections .............. ✓", color: "#00C48C" },
  { type: "info", text: "→ Building evidence package...", color: "#444" },
  { type: "success", text: "✓ 147 compliance artifacts hashed and vaulted", color: "#00C48C" },
  { type: "info", text: "→ Computing readiness scores...", color: "#444" },
  { type: "success", text: "✓ EU AI Act: 74% ready (↑12% this session)", color: "#0070F3" },
  { type: "success", text: "✓ India DPDP: 68% ready", color: "#0070F3" },
  { type: "final", text: "✓ Governance report ready. Audit package exported.", color: "#00C48C" },
  { type: "system", text: "$ _", color: "#0070F3" },
];

const steps = [
  {
    number: "01",
    color: "#0070F3",
    title: "AI System Detected",
    outcome: "Classified as HIGH RISK",
    outcomeClassName: "text-[#FF3B3B]",
    desc: "Automatically mapped to EU AI Act Annex III in 2.3 seconds",
  },
  {
    number: "02",
    color: "#00C48C",
    title: "Documentation Gap Found",
    outcome: "Annex IV Generated",
    outcomeClassName: "text-[#00C48C]",
    desc: "All 11 required sections written, grounded in regulation text",
  },
  {
    number: "03",
    color: "#7928CA",
    title: "Audit Request Arrives",
    outcome: "Evidence Package Ready",
    outcomeClassName: "text-[#7928CA]",
    desc: "Hash-chained logs, docs, and readiness score exported instantly",
  },
];

function fakeTime(index: number) {
  const seconds = (index * 3) % 60;
  return `09:42:${seconds.toString().padStart(2, "0")}`;
}

function GovernanceTerminal({ inView }: { inView: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timeouts: number[] = [];
    const interval = window.setInterval(() => {
      setCurrentStep((step) => {
        if (step >= TERMINAL_LINES.length) {
          window.clearInterval(interval);
          const timeout = window.setTimeout(() => {
            setCurrentStep(0);
            setCycle((value) => value + 1);
          }, 2000);
          timeouts.push(timeout);
          return step;
        }

        return step + 1;
      });
    }, 800);

    return () => {
      window.clearInterval(interval);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [cycle, inView]);

  const visibleLines = TERMINAL_LINES.slice(0, currentStep);
  const complete = currentStep >= TERMINAL_LINES.length;

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/[0.10] bg-[#080808]"
      style={{
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] bg-[#0F0F0F] px-3">
        <div className="h-2 w-2 rounded-full bg-[#FF5F56]" />
        <div className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
        <div className="h-2 w-2 rounded-full bg-[#27C93F]" />
        <div className="mx-1 h-3 w-px bg-white/[0.08]" />
        <span className="font-mono text-[10px] text-[#333]">complivibe — governance-engine</span>
      </div>

      <div className="min-h-[360px] p-5 font-mono text-[11px]">
        {visibleLines.map((line, index) => (
          <motion.div
            key={`${cycle}-${line.type}-${index}`}
            className="flex items-start gap-3 py-0.5"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="w-14 shrink-0 font-mono text-[10px] text-[#2a2a2a]">{fakeTime(index)}</span>
            <span style={{ color: line.color }}>
              {line.text}
              {index === TERMINAL_LINES.length - 1 && complete && (
                <motion.span
                  className="ml-0.5 inline-block h-3 w-1.5 bg-[#0070F3] align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </span>
          </motion.div>
        ))}

        <AnimatePresence>
          {complete && (
            <motion.div
              className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: "74%", label: "EU Readiness", className: "text-[#00C48C]" },
                { value: "11", label: "Docs Generated", className: "text-[#0070F3]" },
                { value: "48h", label: "Time to ready", className: "text-[#7928CA]" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 text-center">
                  <div className={`font-mono text-lg font-bold ${stat.className}`}>{stat.value}</div>
                  <div className="text-[9px] text-[#444]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function LogoCloud() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,112,243,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <p className="mb-16 text-center text-[11px] uppercase tracking-[0.2em] text-[#444]">
          Watch CompliVibe work
        </p>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            className="order-2 flex flex-col gap-6 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0070F3]">LIVE DEMO</p>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              From ungoverned AI to audit-ready in 48 hours.
            </h2>
            <p className="text-[15px] leading-relaxed text-[#555]">
              Most AI teams discover they need governance documentation the week before a deal closes or an audit lands. CompliVibe runs continuously so you are always ready.
            </p>

            <div className="mt-2 space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white/[0.03]"
                    style={{ borderColor: `${step.color}66` }}
                  >
                    <span className="font-mono text-[11px] text-[#444]">{step.number}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-semibold text-white">{step.title}</span>
                      <span className="text-[#333]">→</span>
                      <span className={`text-[13px] font-semibold ${step.outcomeClassName}`}>{step.outcome}</span>
                    </div>
                    <p className="text-[12px] text-[#444]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/score"
              className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-white transition-colors hover:text-[#888]"
            >
              See it work on your AI system
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GovernanceTerminal inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
