"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,112,243,0.12) 0%, rgba(0,196,140,0.06) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[600px] flex-col items-center gap-8 px-6 text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="h-3 w-3 text-[#0070F3]" />
          <span className="text-[12px] text-[#555]">Ready when you are</span>
        </motion.div>

        <motion.h2
          style={{
            fontSize: "clamp(2.5rem,6vw,4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            textAlign: "center",
          }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(10px)", y: 18 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="block"
            style={{
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Govern your AI.
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #0070F3, #00C48C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Start today.
          </span>
        </motion.h2>

        <p className="mx-auto max-w-[420px] text-[16px] leading-relaxed text-[#555]">
          Join AI companies using CompliVibe to classify, document, and prove compliance before regulation blocks their growth.
        </p>

        <div className="flex items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/score"
              className="shine inline-flex h-12 items-center gap-2 rounded-full px-7 text-[14px] font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #0070F3 0%, #7928CA 100%)",
                boxShadow: "0 0 0 1px rgba(0,112,243,0.4), 0 4px 24px rgba(0,112,243,0.25)",
              }}
            >
              Get Started Free
              <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/book-demo"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.10] px-7 text-[14px] font-medium text-[#999] transition-all duration-200 hover:border-white/[0.20] hover:text-white"
            >
              Book a Demo
              <ChevronRight className="h-[15px] w-[15px]" />
            </Link>
          </motion.div>
        </div>

        <p className="text-[11px] text-[#333]">Free assessment available · No credit card required</p>
      </div>
    </section>
  );
}
