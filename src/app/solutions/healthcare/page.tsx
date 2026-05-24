import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Healthcare | CompliVibe",
  description: "Healthcare-specific Annex IV generation, clinical AI risk classification, and EU hospital procurement readiness for Indian HealthTech companies.",
  alternates: { canonical: "https://complivibe.in/solutions/healthcare" },
  openGraph: {
    title: "Healthcare | CompliVibe",
    description: "EU hospitals won't sign without your AI documentation. CompliVibe generates it.",
    url: "https://complivibe.in/solutions/healthcare",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "Healthcare-specific Annex IV generation — all 8 sections with clinical AI context",
  "Annex III classification for medical AI — diagnostic, screening, treatment recommendation systems",
  "Article 13 transparency statements formatted for EU hospital procurement review",
  "Post-market monitoring plan templates for clinical AI — aligned to EU MDR + AI Act requirements",
];

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-urgency/20 bg-urgency/5 px-4 py-1.5 text-xs text-urgency font-medium mb-8">
            <Heart className="h-3 w-3" />
            For HealthTech
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            EU hospitals won&apos;t sign
            <br />
            <span className="text-[#666]">without your AI documentation. We generate it.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Healthcare AI is explicitly listed in EU AI Act Annex III as high-risk. Every Indian HealthTech selling to EU needs Annex IV docs, Article 13 transparency statements, and post-market monitoring plans — or the deal doesn&apos;t close.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Generate Annex IV <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a HealthTech demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  Healthcare AI is Annex III high-risk. EU hospitals know this. Indian HealthTech companies often don&apos;t
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  EU AI Act Annex III explicitly names medical device AI, clinical decision support, and patient-facing health AI as high-risk. This means every Indian HealthTech selling AI diagnostics, imaging analysis, or treatment recommendations to EU hospitals, clinics, or pharma companies must produce Annex IV technical documentation before the contract is signed.
                </p>
                <p className="text-[#888] leading-relaxed">
                  EU hospital procurement committees are applying this requirement now — ahead of August 2026 enforcement. Indian HealthTech vendors without documentation are losing deals to EU-based competitors who have it. Fine exposure: up to <span className="text-urgency font-semibold">€30M or 6% of global annual turnover</span>.
                </p>
              </div>
              <div className="rounded-2xl border border-urgency/20 bg-urgency/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4">HealthTech compliance stakes</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "EU AI Act risk category", value: "Annex III HIGH RISK" },
                    { label: "Documentation required", value: "Annex IV — 8 sections" },
                    { label: "Enforcement date", value: "August 2, 2026" },
                    { label: "Maximum fine", value: "€30M or 6% turnover" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-urgency text-right max-w-[180px]">{item.value}</span>
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
            <h2 className="text-white font-bold text-2xl mb-10">Healthcare-specific Annex IV. Generated. Not templated.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Your EU hospital deal doesn&apos;t need to wait</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Generate healthcare AI documentation in minutes. Not months. Not €40,000 in consulting fees.</p>
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Generate Annex IV now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
