"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function FrameworkChecklist({ items }: { items: string[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="liquid-card glass-highlight grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item}
            className="flex items-start gap-3 text-sm"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]/12">
              <Check className="h-3 w-3 text-[#10b981]" />
            </span>
            <span className="text-[var(--cv-muted)]">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
