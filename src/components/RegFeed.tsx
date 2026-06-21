"use client";

import { Radio } from "lucide-react";

const entries = [
  "EU AI Act obligation update mapped",
  "DPDP consent workflow refreshed",
  "ISO 42001 control linked to evidence",
  "SOC 2 trust evidence synced",
  "Colorado AI Act risk workflow prepared",
  "NIST AI RMF function aligned to controls",
  "EU AI Act Annex III scope re-checked",
  "Vendor model risk re-scored",
];

export default function RegFeed() {
  return (
    <div className="relative w-full overflow-hidden border-y border-[var(--cv-border)] bg-[var(--cv-bg-soft)]/60 py-2.5 backdrop-blur-sm">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--cv-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--cv-bg)] to-transparent" />

      {/* label pill */}
      <div className="pointer-events-none absolute inset-y-0 left-4 z-20 hidden items-center sm:flex">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--cv-muted)] shadow-[var(--cv-shadow-soft)]">
          <Radio className="h-3 w-3 text-[#2563eb] dark:text-[#3b82f6]" />
          Regulatory Intelligence
        </span>
      </div>

      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {[...entries, ...entries].map((entry, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 text-xs text-[var(--cv-muted)]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              {entry}
            </span>
            <span className="text-[var(--cv-border)]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
