"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: "48h",
    label: "Regulation-to-update speed",
    sub: "When a regulation changes, your docs update the same day",
  },
  {
    value: "14",
    label: "Frameworks covered",
    sub: "EU AI Act, DPDP, GDPR, ISO 42001, NIST, SOC 2 and more",
  },
  {
    value: "87%",
    label: "Average readiness score",
    sub: "Across active CompliVibe customers after 30 days",
  },
  {
    value: "€35M",
    label: "Max fine exposure covered",
    sub: "Know your worst-case scenario before regulators do",
    valueClassName: "text-[#FF3B3B]",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#050505] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="mb-10 text-center text-[11px] uppercase tracking-[0.2em] text-[#444]">
          The numbers that matter
        </p>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative flex flex-col gap-2 bg-[#050505] px-8 py-10 transition-colors hover:bg-[#0A0A0A]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0070F3]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span
                className={`font-mono font-bold leading-none tracking-tight ${stat.valueClassName ?? ""}`}
                style={{
                  fontSize: "clamp(2.5rem,4vw,3.5rem)",
                  ...(!stat.valueClassName
                    ? {
                        background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.65))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}),
                }}
              >
                {stat.value}
              </span>
              <span className="mt-2 text-sm font-semibold text-white">{stat.label}</span>
              <span className="text-xs leading-relaxed text-[#444]">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
