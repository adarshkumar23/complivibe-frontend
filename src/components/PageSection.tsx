"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PageSection({
  kicker,
  title,
  highlight,
  subtitle,
  aurora = false,
  children,
  className = "",
}: {
  kicker?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  aurora?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${aurora ? "aurora-bg " : ""}overflow-hidden py-20 md:py-28 ${className}`}>
      <div className="cv-container">
        {(kicker || title || subtitle) && (
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {kicker && <span className="section-kicker mb-4">{kicker}</span>}
            {title && (
              <h2 className="section-title mt-4 text-balance">
                {title}
                {highlight && <span className="text-gradient-trust"> {highlight}</span>}
              </h2>
            )}
            {subtitle && <p className="section-subtitle mx-auto mt-5">{subtitle}</p>}
          </motion.div>
        )}
        <div className={kicker || title || subtitle ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}
