"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-08-02T00:00:00Z").getTime();

function padZero(n: number) {
  return n.toString().padStart(2, "0");
}

export default function ComplianceCountdown({ variant = "hero" }: { variant?: "hero" | "banner" }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function update() {
      const now = Date.now();
      const diff = Math.max(0, TARGET_DATE - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (variant === "banner") {
    return (
      <div className="flex items-center justify-center gap-3 py-2 text-xs">
        <span className="text-[#ccc] font-medium">High-Risk AI obligations enforce in:</span>
        <div className="flex items-center gap-1.5 font-mono font-bold text-urgency">
          <span>{timeLeft.days}d</span>
          <span className="text-[#555]">:</span>
          <span>{padZero(timeLeft.hours)}h</span>
          <span className="text-[#555]">:</span>
          <span>{padZero(timeLeft.minutes)}m</span>
          <span className="text-[#555]">:</span>
          <span>{padZero(timeLeft.seconds)}s</span>
        </div>
      </div>
    );
  }

  const blocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xs uppercase tracking-[0.2em] text-urgency font-semibold flex items-center gap-2">
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-urgency"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        High-Risk AI obligations enforce in:
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {blocks.map((block) => (
          <motion.div
            key={block.label}
            className="flex flex-col items-center gap-1"
            initial={false}
          >
            <div className="relative rounded-xl border border-urgency/20 bg-urgency/5 px-3 sm:px-5 py-3 min-w-[60px] sm:min-w-[72px] text-center urgency-pulse">
              <motion.span
                key={block.value}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-3xl font-bold font-mono text-urgency tabular-nums block"
              >
                {padZero(block.value)}
              </motion.span>
            </div>
            <span className="text-[10px] text-[#555] uppercase tracking-wider">{block.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
