import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "India-First Pack | CompliVibe",
  description: "Map all 68 India DPDP obligations for your AI product — consent architecture, data fiduciary duties, breach response, and cross-border transfer rules.",
  alternates: { canonical: "https://complivibe.in/solutions/india-first" },
  openGraph: {
    title: "India-First Pack | CompliVibe",
    description: "DPDP is live. Your consent architecture isn't. 68 obligations mapped, tracked, evidenced.",
    url: "https://complivibe.in/solutions/india-first",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India-First Pack | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "All 68 DPDP obligations mapped to actionable controls for product companies",
  "Consent architecture review — purpose limitation, notice requirements, withdrawal flows",
  "Data fiduciary duty tracker with evidence collection for every obligation",
  "Breach response playbook aligned to DPDP reporting timelines",
];

export default function IndiaFirstPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-india-orange/20 bg-india-orange/5 px-4 py-1.5 text-xs text-india-orange font-medium mb-8">
            <MapPin className="h-3 w-3" />
            India-First Pack
          </div>
          <h1
            className="text-white mb-6 max-w-[780px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            DPDP is live.
            <br />
            <span className="text-[#666]">Your consent architecture isn&apos;t.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            The Digital Personal Data Protection Act 2023 is in effect. Most Indian startups have no mapped obligations, no DPA templates, and no breach response plan. Fines reach ₹250 crore per breach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Map DPDP obligations <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  DPDP obligations are live. Most Indian startups have no compliance posture
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  The DPDP Act 2023 creates obligations for every company that processes digital personal data of Indian citizens — including purpose limitation, consent architecture, data fiduciary registration, and breach notification within 72 hours.
                </p>
                <p className="text-[#888] leading-relaxed">
                  For Indian AI startups, the exposure is compounded: AI systems that make decisions about individuals may trigger additional obligations under both DPDP and EU AI Act if those individuals include EU citizens. Fines reach <span className="text-urgency font-semibold">₹250 crore per breach</span>.
                </p>
              </div>
              <div className="rounded-2xl border border-india-orange/20 bg-india-orange/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-india-orange mb-4">DPDP at a glance</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Total obligations", value: "68" },
                    { label: "Maximum fine per breach", value: "₹250 crore" },
                    { label: "Breach notification deadline", value: "72 hours" },
                    { label: "Cross-mapped to EU obligations", value: "828 mappings" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-india-orange">{item.value}</span>
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
            <h2 className="text-white font-bold text-2xl mb-10">68 DPDP obligations mapped, tracked, evidenced</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Start with DPDP. Stay ready for EU.</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">CompliVibe maps both simultaneously — because your Indian users and EU customers have overlapping rights.</p>
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
