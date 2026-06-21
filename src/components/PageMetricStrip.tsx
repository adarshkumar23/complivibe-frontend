"use client";

import { motion } from "framer-motion";

export default function PageMetricStrip({
  items,
}: {
  items: { value: string; label: string; accent?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((m, i) => (
        <motion.div
          key={m.label}
          className="bento-card glass-highlight px-5 py-5"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.45 }}
        >
          <div className="font-mono text-2xl font-bold" style={{ color: m.accent ?? "#2563eb" }}>
            {m.value}
          </div>
          <div className="mt-1 text-[12px] leading-tight text-[var(--cv-muted)]">{m.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
