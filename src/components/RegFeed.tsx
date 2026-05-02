"use client";

const entries = [
  "🇪🇺 EU AI Act — Annex III categories updated Feb 2026",
  "🇮🇳 DPDP Rules notified by MeitY — Jan 2026",
  "🌍 ISO 42001 amendment published — Mar 2026",
  "🇪🇺 EU AI Office enforcement guidance released — Mar 2026",
  "🇮🇳 RBI SAR updated with AI governance section — Mar 2026",
  "🇪🇺 EDPB guidelines on AI + Article 22 — Apr 2026",
  "🇮🇳 DPDP Section 8 amendment on consent — Apr 2026",
  "🇪🇺 CEN-CENELEC standardisation request finalized — Apr 2026",
];

export default function RegFeed() {
  return (
    <div className="w-full overflow-hidden bg-[#050505] border-y border-white/[0.04] py-2.5">
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {[...entries, ...entries].map((entry, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 text-xs text-[#555]">
            <span>{entry}</span>
            <span className="text-[#333]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
