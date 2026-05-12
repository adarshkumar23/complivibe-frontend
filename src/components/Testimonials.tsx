const stats = [
  {
    value: "€35M",
    sublabel: "or 7% global turnover",
    label: "Max EU AI Act Fine",
    description: "Whichever is higher — applied per violation under EU AI Act enforcement.",
  },
  {
    value: "₹250Cr",
    sublabel: "maximum penalty",
    label: "Max India DPDP Fine",
    description: "Per instance of non-compliance under India's Digital Personal Data Protection Act.",
  },
  {
    value: "Aug 2, 2026",
    sublabel: "enforcement begins",
    label: "EU AI Act Deadline",
    description: "High-risk AI system obligations go live. Non-compliant systems must be withdrawn.",
  },
  {
    value: "6–18mo",
    sublabel: "without tooling",
    label: "Average Compliance Timeline",
    description: "Industry estimate for manual compliance programs. CompliVibe targets 48 hours.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,196,140,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium">
            The regulatory reality
          </p>
          <h2
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
            The cost of non-compliance
          </h2>
          <p className="max-w-lg text-[#666] text-base leading-relaxed">
            Regulators are not waiting. These are the real numbers from EU AI Act and India DPDP legislation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-2 bg-[#050505] px-8 py-10 hover:bg-[#0A0A0A] transition-colors group"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-compliance-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span
                className="font-bold"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
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
              <span className="text-xs text-compliance-green font-medium">{stat.sublabel}</span>
              <span className="text-sm font-semibold text-white mt-1">{stat.label}</span>
              <span className="text-xs text-[#555] leading-relaxed">{stat.description}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#444] mt-6">
          Sources: EU AI Act (Regulation 2024/1689) · India DPDP Act 2023 · Industry compliance benchmarks
        </p>
      </div>
    </section>
  );
}
