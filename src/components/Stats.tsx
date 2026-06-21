"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: "3",
    label: "Paying customers",
    sub: "Companies running on CompliVibe today",
    accent: "text-[#2563eb] dark:text-[#3b82f6]",
  },
  {
    value: "5",
    label: "Beta trials",
    sub: "Teams actively evaluating the platform",
    accent: "text-[#7c3aed] dark:text-[#a78bfa]",
  },
  {
    value: "13",
    label: "Waitlist accounts",
    sub: "Organisations queued for onboarding",
    accent: "text-[#06b6d4] dark:text-[#22d3ee]",
  },
  {
    value: "828",
    label: "Mapped obligations",
    sub: "Across EU AI Act, DPDP, ISO 42001 and more",
    accent: "text-[#10b981] dark:text-[#34d399]",
  },
  {
    value: "23+",
    label: "Integrations",
    sub: "Connect the tools where your AI already runs",
    accent: "text-[#f59e0b] dark:text-[#fbbf24]",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="cv-container">
        <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--cv-muted)]">
          Where we are today
        </p>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bento-card glass-highlight group flex flex-col gap-1.5 px-6 py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={`font-mono font-bold leading-none tracking-tight ${stat.accent}`}
                style={{ fontSize: "clamp(2rem,3.2vw,2.75rem)" }}
              >
                {stat.value}
              </span>
              <span className="mt-2 text-sm font-semibold text-[var(--cv-ink)]">{stat.label}</span>
              <span className="text-xs leading-relaxed text-[var(--cv-muted)]">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
