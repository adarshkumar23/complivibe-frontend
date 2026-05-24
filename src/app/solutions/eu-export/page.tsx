import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Globe, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "EU Export Pack | CompliVibe",
  description: "Generate EU AI Act Annex IV technical documentation and close EU deals — CompliVibe's EU Export Pack for Indian SaaS and AI companies.",
  alternates: { canonical: "https://complivibe.in/solutions/eu-export" },
  openGraph: {
    title: "EU Export Pack | CompliVibe",
    description: "Your EU deal is waiting. Your Annex IV documentation isn't. Generate it in minutes.",
    url: "https://complivibe.in/solutions/eu-export",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EU Export Pack | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "Annex IV technical documentation generated for any AI system — all 8 mandatory sections",
  "Article 13 transparency statements ready for EU procurement review",
  "Annex III risk classification with confidence score and obligation list",
  "828 cross-jurisdiction mappings: EU AI Act obligations mapped to your India DPDP posture",
];

export default function EUExportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-blue/20 bg-cv-blue/5 px-4 py-1.5 text-xs text-cv-blue font-medium mb-8">
            <Globe className="h-3 w-3" />
            EU Export Pack
          </div>
          <h1
            className="text-white mb-6 max-w-[780px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Your EU deal is waiting.
            <br />
            <span className="text-[#666]">Your Annex IV documentation isn&apos;t.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            EU procurement requires Article 13 transparency docs and Annex IV technical documentation. Indian companies have neither. Deals stall at legal review. CompliVibe generates everything in minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Generate Annex IV now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a demo
            </Link>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  EU procurement now requires AI documentation Indian companies don&apos;t have
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  The EU AI Act mandates that every high-risk AI system comes with Annex IV technical documentation before it can be deployed in the EU. EU procurement teams — hospitals, banks, enterprises — now require this documentation during vendor due diligence.
                </p>
                <p className="text-[#888] leading-relaxed">
                  Indian IT and SaaS exports to EU represent a <span className="text-white font-semibold">$50B+ market</span>. Every Indian AI company selling to EU customers without this documentation is at risk of losing deals at the final legal review — not because of the product, but because of missing paperwork.
                </p>
              </div>
              <div className="rounded-2xl border border-urgency/20 bg-urgency/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4">Enforcement reality</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Enforcement date", value: "August 2, 2026" },
                    { label: "High-risk AI fine", value: "€30M or 6% global turnover" },
                    { label: "Documentation required", value: "Annex IV — all 8 sections" },
                    { label: "Indian companies in scope", value: "Any selling to EU customers" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-urgency">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4 font-semibold">How CompliVibe solves it</div>
            <h2 className="text-white font-bold text-2xl mb-10">Generate EU-ready documentation in minutes</h2>
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

        {/* CTA */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-16 text-center">
            <h2 className="text-white font-bold text-2xl mb-3">Your EU customer is waiting for documentation</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Generate Annex IV in minutes. Close the deal.</p>
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Start free — generate Annex IV <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
