import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Cloud, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "SaaS | CompliVibe",
  description: "On-demand Annex IV generation, Article 13 transparency statements, and compliance evidence packages for Indian B2B SaaS companies with EU enterprise customers.",
  alternates: { canonical: "https://complivibe.in/solutions/saas" },
  openGraph: {
    title: "SaaS | CompliVibe",
    description: "Your EU enterprise customer's legal team just asked for your AI documentation. You have 48 hours. CompliVibe delivers.",
    url: "https://complivibe.in/solutions/saas",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
};

const features = [
  "On-demand Annex IV generation — produced in minutes, not weeks",
  "Article 13 transparency statements formatted for EU enterprise procurement review",
  "Compliance evidence package — all documentation bundled for vendor due diligence",
  "48-hour regulatory updates — stay current as EU AI Act implementation guidance evolves",
];

export default function SaaSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-compliance-green/20 bg-compliance-green/5 px-4 py-1.5 text-xs text-compliance-green font-medium mb-8">
            <Cloud className="h-3 w-3" />
            For B2B SaaS
          </div>
          <h1
            className="text-white mb-6 max-w-[860px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Your EU enterprise customer&apos;s legal team
            <br />
            <span className="text-[#666]">just asked for your AI documentation. You have 48 hours.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            EU enterprise procurement now includes AI compliance due diligence. Indian SaaS vendors with no documentation lose deals at the final stage — not because of product quality, but because of missing paperwork.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Generate documentation now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a SaaS demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  EU enterprise procurement now includes an AI compliance checkpoint. Indian SaaS is unprepared
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  EU enterprise buyers — corporations, financial institutions, healthcare systems — have added AI compliance due diligence to their vendor procurement checklists. They&apos;re asking for Annex IV technical documentation and Article 13 transparency statements. Indian B2B SaaS vendors don&apos;t have these, because until now, there was no tool to generate them.
                </p>
                <p className="text-[#888] leading-relaxed">
                  The $50B+ Indian IT and SaaS export market to EU depends on closing these deals. Every deal lost to a documentation gap is a revenue gap. EU AI Act enforcement begins <span className="text-urgency font-semibold">August 2, 2026</span>. The due diligence is already happening.
                </p>
              </div>
              <div className="rounded-2xl border border-compliance-green/20 bg-compliance-green/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4">SaaS compliance timeline</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Due diligence request received", value: "Now" },
                    { label: "Documentation deadline", value: "48–72 hours typical" },
                    { label: "Time to generate with CompliVibe", value: "Minutes" },
                    { label: "EU AI Act enforcement", value: "August 2, 2026" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-compliance-green text-right max-w-[160px]">{item.value}</span>
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
            <h2 className="text-white font-bold text-2xl mb-10">On-demand documentation. Ready when your customer asks.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Don&apos;t let documentation kill your EU deal</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Generate your compliance evidence package in minutes. Close on time.</p>
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Generate documentation now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
