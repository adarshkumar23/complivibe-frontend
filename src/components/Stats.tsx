const stats = [
  {
    value: "48hrs",
    label: "Regulatory Update Velocity",
    description: "Fastest regulatory change detection in the compliance market",
  },
  {
    value: "14",
    label: "Frameworks Supported",
    description: "EU AI Act, DPDP, GDPR, ISO 42001, NIST, SOC 2 and more",
  },
  {
    value: "₹250Cr",
    label: "Max Fine Exposure Covered",
    description: "Know your worst-case scenario before regulators do",
  },
  {
    value: "Aug 2026",
    label: "EU Enforcement Deadline",
    description: "High-risk AI system obligations go live — are you ready?",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,196,140,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Section label */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium">By the numbers</p>
          <h2
            className="max-w-2xl text-balance"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              fontWeight: "700",
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Built for regulatory velocity
          </h2>
          <p className="max-w-lg text-[#666] text-base leading-relaxed">
            When regulations change, CompliVibe updates your obligations, docs, and readiness score in hours — not months.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-2 bg-[#050505] px-8 py-10 hover:bg-[#0A0A0A] transition-colors group"
            >
              {/* Top border accent on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-compliance-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <span
                className="font-bold"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "1",
                  background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-white">{stat.label}</span>
              <span className="text-xs text-[#555] leading-relaxed">{stat.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
