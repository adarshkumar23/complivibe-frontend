"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="aurora-bg relative overflow-hidden py-28 md:py-36">
      <div className="cv-container">
        <motion.div
          className="liquid-card glass-highlight mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-16 text-center md:px-12 md:py-20"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-1.5 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-3 w-3 text-[#2563eb] dark:text-[#3b82f6]" />
            <span className="text-[12px] text-[var(--cv-muted)]">The AI trust operating layer</span>
          </motion.div>

          <motion.h2
            className="max-w-3xl text-balance"
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "var(--cv-ink)",
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)", y: 18 }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : reduce
                ? { opacity: 0 }
                : { opacity: 0, filter: "blur(10px)", y: 18 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Build trust into every AI system before your customers{" "}
            <span className="text-gradient-trust">ask</span>.
          </motion.h2>

          <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-[var(--cv-muted)]">
            CompliVibe gives AI-first teams one place to govern systems, automate evidence, monitor
            trust signals, and publish customer-ready proof.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/book-demo"
                className="shine inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 8px 28px rgba(37,99,235,0.28)",
                }}
              >
                Book a Demo
                <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
              </Link>
            </motion.div>

            <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/score"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-7 text-[14px] font-medium text-[var(--cv-ink)] backdrop-blur-sm transition-all duration-200 hover:border-[#2563eb]/30"
              >
                Start Free Trust Scan
                <ChevronRight className="h-[15px] w-[15px]" />
              </Link>
            </motion.div>
          </div>

          <p className="text-[11px] text-[var(--cv-muted)]">
            Free trust scan · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
