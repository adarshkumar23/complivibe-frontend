import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "US SaaS Pack | CompliVibe",
  description: "SOC 2-oriented AI governance for Indian SaaS companies growing in the US market — mapped to EU AI Act and India DPDP obligations.",
  alternates: { canonical: "https://complivibe.in/solutions/us-saas" },
  openGraph: {
    title: "US SaaS Pack | CompliVibe",
    description: "SOC 2-oriented AI governance for Indian SaaS companies with US enterprise customers.",
    url: "https://complivibe.in/solutions/us-saas",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
};

const features = [
  "SOC 2 Type II AI controls mapped to EU AI Act and DPDP obligations",
  "AI system documentation package for US enterprise procurement due diligence",
  "Cross-mapping between SOC 2 trust criteria and EU AI Act technical requirements",
  "48-hour updates on US state AI regulation changes (CCPA, state AI bills)",
];

export default function USSaaSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-blue/20 bg-cv-blue/5 px-4 py-1.5 text-xs text-cv-blue font-medium mb-8">
            <DollarSign className="h-3 w-3" />
            US SaaS Pack
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Ship to the US.
            <br />
            <span className="text-[#666]">Stay compliant across all three markets.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Indian SaaS companies targeting US enterprise need SOC 2 alignment — while also managing EU AI Act and India DPDP obligations. CompliVibe maps all three simultaneously.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4 font-semibold">How CompliVibe solves it</div>
            <h2 className="text-white font-bold text-2xl mb-10">SOC 2 + EU AI Act + India DPDP. One platform.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Go global. Stay compliant.</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">One compliance programme for US, EU, and India. No duplication.</p>
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
