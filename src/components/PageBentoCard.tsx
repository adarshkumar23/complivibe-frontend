"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { iconRegistry } from "@/components/icon-registry";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/** Optional stagger container to wrap groups of PageBentoCards. */
export const bentoContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function PageBentoCard({
  icon,
  accent = "#2563eb",
  title,
  body,
  href,
  hrefLabel,
  children,
  className = "",
}: {
  icon?: LucideIcon | string;
  accent?: string;
  title: string;
  body?: string;
  href?: string;
  hrefLabel?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const Icon: LucideIcon | undefined = typeof icon === "string" ? iconRegistry[icon] : icon;
  const inner = (
    <>
      {Icon && (
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ backgroundColor: `${accent}14`, borderColor: `${accent}33` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </span>
      )}
      <div>
        <h3 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">{title}</h3>
        {body && <p className="mt-1.5 text-sm leading-relaxed text-[var(--cv-muted)]">{body}</p>}
      </div>
      {children}
      {href && (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] font-semibold" style={{ color: accent }}>
          {hrefLabel ?? "Learn more"}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  const cardClass = `bento-card glass-highlight flex flex-col gap-4 p-6 ${className}`;

  if (href) {
    return (
      <motion.div {...reveal} whileHover={reduced ? undefined : { y: -4 }}>
        <Link href={href} className={`${cardClass} h-full`}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...reveal} whileHover={reduced ? undefined : { y: -4 }} className={cardClass}>
      {inner}
    </motion.div>
  );
}
