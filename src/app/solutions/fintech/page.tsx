import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Fintech | CompliVibe",
  description: "Fintech-specific Annex IV for credit AI, automated Annex III classification for financial AI, and DPDP + GDPR financial data mapping for Indian Fintech companies.",
  alternates: { canonical: "https://complivibe.in/solutions/fintech" },
  openGraph: {
    title: "Fintech | CompliVibe",
    description: "Credit scoring AI is high-risk under EU law. Yours needs documentation. CompliVibe generates it.",
    url: "https://complivibe.in/solutions/fintech",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
};

const features = [
  "Fintech-specific Annex IV generation for credit scoring, insurance pricing, and financial advisory AI",
  "Annex III classification for financial AI — automated identification of high-risk financial use cases",
  "DPDP + GDPR financial data overlap mapping — 828 cross-jurisdiction obligations",
  "Article 13 transparency statements for EU banking and lending clients",
];

export default function FintechPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-blue/20 bg-cv-blue/5 px-4 py-1.5 text-xs text-cv-blue font-medium mb-8">
            <TrendingUp className="h-3 w-3" />
            For Fintech
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Credit scoring AI is high-risk
            <br />
            <span className="text-[#666]">under EU law. Yours needs documentation.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            AI used in credit decisions, insurance pricing, or financial advice is Annex III high-risk under EU AI Act. EU regulators and enterprise clients demand technical documentation. Indian Fintech companies serving EU banking clients need it yesterday.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Generate Annex IV <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a Fintech demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  EU banks and regulators are applying AI documentation requirements now — not in 2026
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  EU AI Act Annex III explicitly lists AI used in creditworthiness assessment, insurance risk scoring, and financial advice as high-risk. This affects every Indian Fintech with EU banking, lending, or payments clients. EU financial institutions and regulators are already requiring Annex IV documentation in vendor due diligence.
                </p>
                <p className="text-[#888] leading-relaxed">
                  Indian Fintech companies also process financial data of Indian borrowers under DPDP — creating simultaneous DPDP and GDPR obligations when EU clients are involved. Fine exposure: <span className="text-urgency font-semibold">€30M or 6% of global annual turnover</span> under EU AI Act, plus ₹250 crore per breach under DPDP.
                </p>
              </div>
              <div className="rounded-2xl border border-cv-blue/20 bg-cv-blue/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-cv-blue mb-4">Fintech compliance stakes</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "EU AI Act risk category", value: "Annex III HIGH RISK" },
                    { label: "Credit AI classification", value: "Mandatory before EU deployment" },
                    { label: "DPDP + GDPR overlap", value: "828 cross-mappings" },
                    { label: "Enforcement date", value: "August 2, 2026" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-cv-blue text-right max-w-[180px]">{item.value}</span>
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
            <h2 className="text-white font-bold text-2xl mb-10">Fintech-specific AI documentation. DPDP + GDPR mapped.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Your EU banking client is waiting for your AI documentation</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Generate fintech-specific Annex IV in minutes. Keep the contract moving.</p>
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
