import { Shield, FileText, AlertTriangle, Globe2, ShieldCheck, Gauge, CloudLightning, Scale } from "lucide-react";

const featureGroups = [
  {
    eyebrow: "Classify",
    headline: "Dual-Jurisdiction Engine.",
    body: "Map your AI systems against EU AI Act and India DPDP simultaneously. One input, two compliance profiles. Know your risk tier, obligations, and deadlines in minutes.",
    cta: { label: "See Classification", href: "/platform" },
    features: [
      { icon: Shield, label: "Risk Classification", desc: "AUTO / HIGH / LIMITED / MINIMAL" },
      { icon: Scale, label: "Cross-Regulation Mapping", desc: "EU + India obligations aligned" },
      { icon: Globe2, label: "Dual Jurisdiction", desc: "One profile, two frameworks" },
    ],
    visual: "classify",
    flip: false,
  },
  {
    eyebrow: "Generate",
    headline: "Annex IV Auto-Generator.",
    body: "Generate complete EU AI Act Annex IV technical documentation from a single system description. Powered by RAG against the actual regulation text — not generic templates.",
    cta: { label: "Try the Generator", href: "/platform#generator" },
    features: [
      { icon: FileText, label: "Full Annex IV Coverage", desc: "All 11 required sections" },
      { icon: CloudLightning, label: "48-Hour Updates", desc: "Regulatory changes reflected instantly" },
      { icon: Gauge, label: "PDF Export", desc: "Audit-ready professional documents" },
    ],
    visual: "generate",
    flip: true,
  },
  {
    eyebrow: "Protect",
    headline: "Fine Killer. Know your exposure.",
    body: "Calculate your maximum fine exposure across both EU and Indian jurisdictions. €35M or ₹250Cr — know the number before regulators calculate it for you.",
    cta: { label: "Calculate Exposure", href: "/score" },
    features: [
      { icon: AlertTriangle, label: "Fine Calculator", desc: "Real-time exposure by jurisdiction" },
      { icon: Shield, label: "Gap Analysis", desc: "Missing obligations flagged automatically" },
      { icon: Globe2, label: "EU Export Pack", desc: "Compliance docs for EU market entry" },
    ],
    visual: "protect",
    flip: false,
  },
  {
    eyebrow: "Audit",
    headline: "Evidence Vault. Tamper-proof.",
    body: "Every compliance action logged with hash-chained integrity. When auditors arrive, your evidence trail is ready — timestamped, immutable, and exportable.",
    cta: { label: "See the Vault", href: "/platform#audit" },
    features: [
      { icon: ShieldCheck, label: "Hash-Chained Logs", desc: "Tamper-proof audit trail" },
      { icon: Gauge, label: "Readiness Score", desc: "Real-time compliance percentage" },
      { icon: FileText, label: "Export Anywhere", desc: "PDF, JSON, CSV for any audit" },
    ],
    visual: "audit",
    flip: true,
  },
];

function ClassifyVisual() {
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-compliance-green/5 to-transparent" />
      <div className="relative space-y-3">
        <div className="text-xs text-[#555] mb-3">AI System Risk Classification</div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <span className="text-[#555] text-xs w-20">System:</span>
            <span className="text-[#888] text-xs">Customer credit scoring ML model</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#555] text-xs w-20">Industry:</span>
            <span className="text-[#888] text-xs">Fintech</span>
          </div>
          <div className="h-px bg-white/[0.06] my-2" />
          <div className="space-y-1.5 pl-4 border-l border-white/[0.06]">
            <div className="text-[#666] text-xs">Analyzing EU AI Act Annex III...</div>
            <div className="text-[#666] text-xs">Cross-referencing DPDP Section 4...</div>
            <div className="text-urgency text-xs font-semibold">→ Risk Tier: HIGH RISK</div>
            <div className="text-compliance-green text-xs">✓ 47 obligations mapped</div>
            <div className="text-compliance-green text-xs">✓ Annex IV documentation required</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-compliance-green flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-compliance-green" />
            Classification complete
          </span>
          <span className="text-[#555]">2.3s</span>
        </div>
      </div>
    </div>
  );
}

function GenerateVisual() {
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-v-blue/5 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#555]">Annex IV Document Generator</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-v-blue/10 text-v-blue border border-v-blue/20">Gemini 2.5 Flash</span>
        </div>
        <div className="space-y-1.5 text-xs">
          {[
            { section: "§1 System Description", status: "✓", color: "text-compliance-green" },
            { section: "§2 Design Specifications", status: "✓", color: "text-compliance-green" },
            { section: "§3 Development Process", status: "✓", color: "text-compliance-green" },
            { section: "§4 Monitoring & Control", status: "✓", color: "text-compliance-green" },
            { section: "§5 Risk Management", status: "●", color: "text-v-blue" },
            { section: "§6 Changes & Updates", status: "○", color: "text-[#333]" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`w-4 text-center ${item.color}`}>{item.status}</span>
              <span className="text-[#888]">{item.section}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-v-blue">
            <span>▶</span> Generating Section 5...
            <span className="inline-block w-1.5 h-3 bg-v-blue/60 animate-pulse" />
          </div>
          <div className="mt-2 w-full bg-[#111] rounded-full h-1.5">
            <div className="bg-gradient-to-r from-compliance-green to-v-blue h-1.5 rounded-full" style={{ width: "72%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectVisual() {
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-urgency/5 to-transparent" />
      <div className="relative">
        <div className="text-xs text-[#555] mb-4">Fine Exposure Calculator</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-urgency/5 border border-urgency/10 p-3">
            <div className="text-xs text-[#555] mb-1">EU AI Act — Max</div>
            <div className="text-lg font-bold text-urgency">€35M</div>
            <div className="text-[10px] text-[#555]">or 7% global turnover</div>
          </div>
          <div className="rounded-lg bg-india-orange/5 border border-india-orange/10 p-3">
            <div className="text-xs text-[#555] mb-1">India DPDP — Max</div>
            <div className="text-lg font-bold text-india-orange">₹250Cr</div>
            <div className="text-[10px] text-[#555]">per contravention</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666]">Compliance gaps found</span>
            <span className="text-urgency font-bold">12</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666]">Critical obligations missing</span>
            <span className="text-urgency font-bold">4</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666]">Estimated remediation</span>
            <span className="text-compliance-green font-bold">6 weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditVisual() {
  const events = [
    { type: "LOGGED", msg: "Annex IV document v3 generated", color: "text-compliance-green" },
    { type: "LOGGED", msg: "Risk re-classification triggered", color: "text-v-blue" },
    { type: "ALERT", msg: "DPDP Section 8 amendment detected", color: "text-india-orange" },
    { type: "LOGGED", msg: "Evidence hash: 0x7f3a...b2c1", color: "text-compliance-green" },
    { type: "EXPORT", msg: "Audit package exported for ISO review", color: "text-[#50E3C2]" },
  ];
  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-6 font-mono text-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[#555]">Evidence Vault — Live</span>
          <span className="flex items-center gap-1.5 text-xs text-compliance-green">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-compliance-green animate-pulse" />
            Recording
          </span>
        </div>
        <div className="space-y-2">
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className={`font-bold w-14 flex-shrink-0 ${e.color}`}>{e.type}</span>
              <span className="text-[#666]">{e.msg}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="text-white font-bold">1,247</div>
            <div className="text-[#555]">Events logged</div>
          </div>
          <div>
            <div className="text-compliance-green font-bold">100%</div>
            <div className="text-[#555]">Hash integrity</div>
          </div>
          <div>
            <div className="text-v-blue font-bold">3</div>
            <div className="text-[#555]">Exports ready</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  classify: <ClassifyVisual />,
  generate: <GenerateVisual />,
  protect: <ProtectVisual />,
  audit: <AuditVisual />,
};

export default function Features() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 space-y-32">
        {featureGroups.map((group, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
              group.flip ? "lg:flex lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text side */}
            <div className="flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-compliance-green">
                {group.eyebrow}
              </p>
              <h2
                className="text-balance"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.03em",
                  fontWeight: "700",
                  background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {group.headline}
              </h2>
              <p className="text-[#666] leading-relaxed text-base">{group.body}</p>

              {/* Sub-features */}
              <div className="grid grid-cols-1 gap-4 mt-2">
                {group.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
                      <f.icon className="h-4 w-4 text-[#888]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{f.label}</div>
                      <div className="text-xs text-[#555] mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={group.cta.href}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white hover:text-[#888] transition-colors mt-2"
              >
                {group.cta.label}
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* Visual side */}
            <div className="relative">
              {/* Glow behind visual */}
              <div className="absolute -inset-8 bg-gradient-radial from-compliance-green/10 via-transparent to-transparent rounded-full pointer-events-none" />
              {visuals[group.visual]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
