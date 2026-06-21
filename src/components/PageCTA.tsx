"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

type Cta = { label: string; href: string };

export default function PageCTA({
  eyebrow = "AI Trust Infrastructure",
  title,
  highlight,
  subtitle,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  primary: Cta;
  secondary?: Cta;
}) {
  const reduced = useReducedMotion();
  return (
    <section className="aurora-bg relative overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        <motion.div
          className="liquid-card glass-highlight mx-auto flex max-w-4xl flex-col items-center gap-7 px-6 py-14 text-center md:px-12 md:py-18"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-[#2563eb] dark:text-[#3b82f6]" />
            <span className="text-[12px] text-[var(--cv-muted)]">{eyebrow}</span>
          </span>
          <h2
            className="max-w-3xl text-balance"
            style={{ fontSize: "clamp(1.9rem,4.5vw,3.25rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--cv-ink)" }}
          >
            {title}
            {highlight && <span className="text-gradient-trust"> {highlight}</span>}
          </h2>
          <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-[var(--cv-muted)]">{subtitle}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div whileHover={reduced ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={primary.href}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", boxShadow: "0 8px 28px rgba(37,99,235,0.28)" }}
              >
                {primary.label}
                <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
              </Link>
            </motion.div>
            {secondary && (
              <motion.div whileHover={reduced ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={secondary.href}
                  className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-medium text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
                >
                  {secondary.label}
                  <ChevronRight className="h-[15px] w-[15px]" />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
