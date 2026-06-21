"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";
import { Users, FlaskConical, ListChecks, FileCheck2, Plug, UserCheck, type LucideIcon } from "lucide-react";

type ProofCard = {
  icon: LucideIcon;
  accent: string;
  value: string;
  /** numeric target for count-up; omit for non-numeric values */
  to?: number;
  suffix?: string;
  title: string;
  desc: string;
};

const cards: ProofCard[] = [
  {
    icon: Users,
    accent: "#2563eb",
    value: "3",
    to: 3,
    title: "paying customers",
    desc: "AI-first teams using CompliVibe for governance and trust readiness.",
  },
  {
    icon: FlaskConical,
    accent: "#7c3aed",
    value: "5",
    to: 5,
    title: "beta trials",
    desc: "Teams testing AI governance, evidence, and compliance workflows.",
  },
  {
    icon: ListChecks,
    accent: "#06b6d4",
    value: "13",
    to: 13,
    title: "account waitlist",
    desc: "Modern companies preparing for AI trust operations.",
  },
  {
    icon: FileCheck2,
    accent: "#10b981",
    value: "828",
    to: 828,
    title: "mapped obligations",
    desc: "Framework mappings across AI, privacy, security, and trust readiness.",
  },
  {
    icon: Plug,
    accent: "#f59e0b",
    value: "23",
    to: 23,
    suffix: "+",
    title: "integrations",
    desc: "Built for evidence collection across the tools teams already use.",
  },
  {
    icon: UserCheck,
    accent: "#7c3aed",
    value: "Human",
    title: "review model",
    desc: "AI-assisted workflows with expert/human sign-off before final trust outputs.",
  },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
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
          <span className="section-kicker mb-4">Early Momentum</span>
          <h2 className="section-title mt-4 text-balance">
            Built with real teams, shaped by real{" "}
            <span className="text-gradient-trust">trust workflows</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            CompliVibe is already being used and tested by AI-first teams that need governance,
            evidence, and trust readiness before scaling.
          </p>
        </motion.div>

        {/* Proof cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="bento-card glass-highlight flex flex-col gap-4 p-7"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: `${card.accent}14`, borderColor: `${card.accent}33` }}
                >
                  <Icon className="h-5 w-5" style={{ color: card.accent }} />
                </span>

                <div className="flex items-baseline gap-2">
                  <span
                    className="font-mono font-bold leading-none tracking-tight"
                    style={{ color: card.accent, fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
                  >
                    {card.to !== undefined ? <CountUp to={card.to} suffix={card.suffix} /> : card.value}
                  </span>
                  <span className="text-base font-semibold text-[var(--cv-ink)]">{card.title}</span>
                </div>

                <p className="text-sm leading-relaxed text-[var(--cv-muted)]">{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional honest line */}
        <motion.p
          className="mt-10 text-center text-sm text-[var(--cv-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Not a static checklist.{" "}
          <span className="font-semibold text-[var(--cv-ink)]">A live trust infrastructure layer.</span>
        </motion.p>
      </div>
    </section>
  );
}
