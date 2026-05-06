import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Startup | CompliVibe",
  description: "Compliance infrastructure for Indian AI startups — EU AI Act and DPDP coverage at startup pricing. No legal team required.",
  alternates: { canonical: "https://complivibe.in/solutions/startup" },
  openGraph: {
    title: "Startup | CompliVibe",
    description: "You can't afford a compliance team. You can't afford a compliance failure either. CompliVibe solves both.",
    url: "https://complivibe.in/solutions/startup",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
};

const features = [
  "Annex III AI risk classification — know your risk category before your first EU deal",
  "Annex IV documentation generation — all 8 sections, no legal team required",
  "68 DPDP + 651 EU AI Act obligations loaded and tracked out of the box",
  "48-hour regulatory updates — every material change pushed to your dashboard automatically",
];

export default function StartupPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-compliance-green/20 bg-compliance-green/5 px-4 py-1.5 text-xs text-compliance-green font-medium mb-8">
            <Rocket className="h-3 w-3" />
            Built for startups
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            You can&apos;t afford a compliance team.
            <br />
            <span className="text-[#666]">You can&apos;t afford a compliance failure either.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Enterprise deals require compliance documentation. Compliance teams cost ₹50L+/year. Most Indian startups skip it and lose EU deals at the final legal review. CompliVibe gives you the infrastructure without the headcount.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  Compliance is the hidden cost killing Indian startup EU deals
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  Seed to Series A Indian AI startups (5-30 people) have no legal team, no compliance function, and no AI documentation. This is fine until the first EU enterprise deal reaches legal review — and stalls because the vendor can&apos;t produce an Annex IV or prove DPDP alignment.
                </p>
                <p className="text-[#888] leading-relaxed">
                  The EU AI Act sets fines for high-risk AI violations at up to <span className="text-urgency font-semibold">€30M or 6% of global annual turnover</span>. For a startup, a single compliance failure can be existential.
                </p>
              </div>
              <div className="rounded-2xl border border-compliance-green/20 bg-compliance-green/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4">Startup pricing</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Starting at", value: "₹24,999/month" },
                    { label: "Legal team required", value: "None" },
                    { label: "Setup time", value: "Under 48 hours" },
                    { label: "Frameworks covered", value: "EU AI Act + India DPDP" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-compliance-green">{item.value}</span>
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
            <h2 className="text-white font-bold text-2xl mb-10">Compliance infrastructure at ₹24,999/month. No lawyers required.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Be EU-ready before your next deal</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Join the first 10 Indian AI companies to be EU-ready before August 2026 enforcement.</p>
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
