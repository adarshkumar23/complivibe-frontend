import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "CISO | CompliVibe",
  description: "AI risk registry, auto-generated technical documentation, and obligation tracking dashboard for CISOs at Indian enterprises deploying AI systems.",
  alternates: { canonical: "https://complivibe.in/solutions/ciso" },
  openGraph: {
    title: "CISO | CompliVibe",
    description: "Your AI systems are live. Your AI risk posture isn't documented. CompliVibe changes that.",
    url: "https://complivibe.in/solutions/ciso",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
};

const features = [
  "Centralised AI risk registry — every AI system, its risk classification, and documentation status in one view",
  "Auto-generated Annex IV technical documentation for every high-risk deployment",
  "Post-market monitoring plan templates aligned to EU AI Act Article 72 requirements",
  "Obligation tracking dashboard with evidence collection and audit-ready exports",
];

export default function CISOPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-blue/20 bg-cv-blue/5 px-4 py-1.5 text-xs text-cv-blue font-medium mb-8">
            <Lock className="h-3 w-3" />
            For CISOs
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Your AI systems are live.
            <br />
            <span className="text-[#666]">Your AI risk posture isn&apos;t documented.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            EU AI Act requires AI risk management systems, technical documentation, and post-market monitoring for every high-risk AI deployment. Your security posture is only as strong as your AI documentation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Book a CISO briefing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Start free
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  AI risk management is a new board-level obligation — not an IT ticket
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  EU AI Act Articles 9, 13, and 72 require that high-risk AI providers maintain a documented risk management system, technical documentation, and post-market monitoring — continuously. CISOs at Indian enterprises with EU exposure now own this.
                </p>
                <p className="text-[#888] leading-relaxed">
                  Without a centralised AI registry and automated documentation, CISOs are answering regulatory inquiries with spreadsheets. Fine exposure: up to <span className="text-urgency font-semibold">€30M or 6% of global annual turnover</span>.
                </p>
              </div>
              <div className="rounded-2xl border border-cv-blue/20 bg-cv-blue/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-cv-blue mb-4">Obligations for CISOs</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "EU AI Act obligations tracked", value: "651" },
                    { label: "India DPDP obligations tracked", value: "68" },
                    { label: "Post-market monitoring", value: "Article 72 aligned" },
                    { label: "Enforcement start", value: "August 2, 2026" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-cv-blue">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4 font-semibold">How CompliVibe solves it</div>
            <h2 className="text-white font-bold text-2xl mb-10">Centralised AI risk visibility for the CISO function</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-compliance-green mt-0.5" />
                  <p className="text-[#888] text-sm leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-16 text-center">
            <h2 className="text-white font-bold text-2xl mb-3">Brief your board before August 2026</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">CompliVibe gives you the AI risk registry and documentation your board needs to see.</p>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Book a CISO briefing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
