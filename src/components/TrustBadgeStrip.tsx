"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Flag, MapPin, Map, Award, BookOpen, Activity, Shield, Globe } from "lucide-react";

const badges = [
  { icon: Flag, label: "EU AI Act", color: "#0070F3" },
  { icon: MapPin, label: "India DPDP", color: "#00C48C" },
  { icon: Map, label: "Colorado AI Act", color: "#7928CA" },
  { icon: Award, label: "ISO 42001", color: "#00C48C" },
  { icon: BookOpen, label: "NIST AI RMF", color: "#888888" },
  { icon: Activity, label: "AI Monitoring", color: "#0070F3" },
  { icon: Shield, label: "Evidence Vault", color: "#00C48C" },
  { icon: Globe, label: "Trust Center", color: "#7928CA" },
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
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  }, [controls, loopWidth]);

  const resume = () => {
    if (loopWidth <= 0) return;

    controls.start({
      x: [0, -loopWidth],
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  };

  return (
    <section
      className="relative border-y border-white/[0.06] bg-[#050505] py-4 overflow-hidden"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={resume}
    >
      <div
        className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }}
      />
      <div
        className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }}
      />

      <AnimatePresence initial={false}>
        <motion.div className="flex w-max items-center" animate={controls}>
          {marqueeBadges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <div
                key={`${badge.label}-${index}`}
                ref={index === 0 ? badgeRef : undefined}
                className="flex items-center gap-2 px-5 py-2 rounded-full mx-2 border border-white/[0.07] bg-white/[0.02] text-sm font-medium text-[#666] whitespace-nowrap cursor-default select-none hover:border-white/[0.14] hover:text-[#aaa] transition-all duration-200"
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
