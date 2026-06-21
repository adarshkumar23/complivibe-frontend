"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileCheck2, Archive, Activity, Globe, AlertTriangle } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "AI Governance", color: "#2563eb" },
  { icon: FileCheck2, label: "Compliance Automation", color: "#7c3aed" },
  { icon: Archive, label: "Evidence Vault", color: "#10b981" },
  { icon: Activity, label: "Data Observability", color: "#06b6d4" },
  { icon: Globe, label: "Trust Center", color: "#2563eb" },
  { icon: AlertTriangle, label: "Risk Monitoring", color: "#f59e0b" },
];

const marqueeBadges = [...badges, ...badges];

export default function TrustBadgeStrip() {
  const controls = useAnimation();
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!badgeRef.current) return;
      setLoopWidth((badgeRef.current.offsetWidth + 16) * badges.length);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (loopWidth <= 0) return;

    controls.start({
      x: [0, -loopWidth],
      transition: { duration: 32, ease: "linear", repeat: Infinity },
    });
  }, [controls, loopWidth]);

  const resume = () => {
    if (loopWidth <= 0) return;

    controls.start({
      x: [0, -loopWidth],
      transition: { duration: 32, ease: "linear", repeat: Infinity },
    });
  };

  return (
    <section
      className="relative overflow-hidden border-y border-[var(--cv-border)] bg-[var(--cv-bg)] py-5"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={resume}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--cv-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--cv-bg)] to-transparent" />

      <AnimatePresence initial={false}>
        <motion.div className="flex w-max items-center" animate={controls}>
          {marqueeBadges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <div
                key={`${badge.label}-${index}`}
                ref={index === 0 ? badgeRef : undefined}
                className="mx-2 flex select-none items-center gap-2 whitespace-nowrap rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-5 py-2 text-sm font-medium text-[var(--cv-muted)] shadow-[var(--cv-shadow-soft)] backdrop-blur-sm transition-all duration-200 hover:border-[#2563eb]/25 hover:text-[var(--cv-ink)]"
              >
                <Icon size={14} color={badge.color} />
                {badge.label}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
