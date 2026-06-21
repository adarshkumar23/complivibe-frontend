"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

type Cta = { label: string; href: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function PageHero({
  kicker,
  title,
  highlight,
  subtitle,
  primary,
  secondary,
  children,
}: {
  kicker: string;
  title: string;
  highlight?: string;
  subtitle: string;
  primary?: Cta;
  secondary?: Cta;
  children?: React.ReactNode;
}) {
  return (
    <section className="aurora-bg relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="cv-container">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.span variants={fadeUp} className="section-kicker mb-5">
            {kicker}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-semibold tracking-tight text-[var(--cv-ink)]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.06 }}
          >
            {title}
            {highlight && <span className="text-gradient-trust"> {highlight}</span>}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-[var(--cv-muted)] md:text-[1.125rem]"
          >
            {subtitle}
          </motion.p>
          {(primary || secondary) && (
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {primary && (
                <Link
                  href={primary.href}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
                  }}
                >
                  {primary.label}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              )}
              {secondary && (
                <Link
                  href={secondary.href}
                  className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
                >
                  {secondary.label}
                  <ChevronRight size={15} />
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>

        {children && (
          <motion.div
            className="mx-auto mt-14 w-full max-w-5xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
