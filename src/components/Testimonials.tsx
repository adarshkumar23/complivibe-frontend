const quotes = [
  {
    quote:
      "We were losing EU enterprise deals because we couldn't prove AI Act compliance. CompliVibe generated our Annex IV docs in a day. We closed the deal that week.",
    author: "Arjun Mehta",
    role: "CEO at FinSight AI (Series A SaaS)",
    avatar: "AM",
  },
  {
    quote:
      "The 48-hour regulatory update engine is real. When the DPDP amendment dropped, our dashboard updated before our legal team even read the gazette notification.",
    author: "Priya Krishnan",
    role: "Head of Compliance at DataShield",
    avatar: "PK",
  },
  {
    quote:
      "We went from 'compliance is someone else's problem' to having a real-time readiness score across 14 frameworks. The board loves the visibility.",
    author: "Rajesh Venkataraman",
    role: "CTO at MedAI Health",
    avatar: "RV",
  },
  {
    quote:
      "The cross-mapping engine found overlaps between EU AI Act and DPDP that even our external counsel missed. Saved us months of duplicate compliance work.",
    author: "Sarah Thompson",
    role: "VP Legal at CloudScale (US SaaS expanding to EU)",
    avatar: "ST",
  },
  {
    quote:
      "Our auditors were impressed by the evidence vault. Hash-chained logs, timestamped actions, export-ready packages. It's the first time an audit felt easy.",
    author: "Deepak Sharma",
    role: "CISO at TrustBridge Financial",
    avatar: "DS",
  },
  {
    quote:
      "CompliVibe's free scope quiz told us we were HIGH RISK before we even signed up. That urgency converted us to paying customers the same day.",
    author: "Ananya Gupta",
    role: "Founder at LegalTech Labs",
    avatar: "AG",
  },
];

export default function Testimonials() {
  const col1 = quotes.slice(0, 2);
  const col2 = quotes.slice(2, 4);
  const col3 = quotes.slice(4, 6);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
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
            Trusted by compliance leaders
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
            Teams ship compliant, faster
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((q, qi) => (
                <div
                  key={qi}
                  className="relative rounded-2xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col gap-4 hover:border-white/[0.15] transition-colors"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 fill-compliance-green" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[#888] leading-relaxed">&ldquo;{q.quote}&rdquo;</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/[0.06]">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-compliance-green/20 to-cv-blue/20 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-compliance-green">
                      {q.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{q.author}</div>
                      <div className="text-xs text-[#555]">{q.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
