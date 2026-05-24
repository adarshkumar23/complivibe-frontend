import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Flag, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Government & PSUs | CompliVibe",
  description: "DPDP-compliant data governance, ISO 42001 alignment, and full audit trail for Indian government bodies and PSUs deploying AI systems.",
  alternates: { canonical: "https://complivibe.in/solutions/govt" },
  openGraph: {
    title: "Government & PSUs | CompliVibe",
    description: "Public sector AI must meet the highest bar. CompliVibe sets it — DPDP + ISO 42001 + full audit trail.",
    url: "https://complivibe.in/solutions/govt",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Government & PSUs | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "DPDP-compliant data governance framework for public sector data handling",
  "ISO 42001 AI management system alignment with evidence collection",
  "Full hash-chained audit trail for every policy decision and AI action",
  "Accountability mapping — every AI obligation assigned to a named function",
];

export default function GovtPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-india-orange/20 bg-india-orange/5 px-4 py-1.5 text-xs text-india-orange font-medium mb-8">
            <Flag className="h-3 w-3" />
            For Government & PSUs
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Public sector AI must meet
            <br />
            <span className="text-[#666]">the highest bar. We set it.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Government AI systems face both DPDP obligations and international standards scrutiny. No Indian platform existed to address both simultaneously — until CompliVibe.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Request a briefing <ArrowRight className="h-4 w-4" />
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
                  Indian government AI has the highest accountability burden and the least tooling
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  PSUs and government bodies deploying AI for citizen services, infrastructure, or law enforcement face DPDP obligations, RTI implications, and international scrutiny. Any AI that processes citizen data must meet DPDP data fiduciary standards. Any AI exported or tested with EU citizen data triggers EU obligations.
                </p>
                <p className="text-[#888] leading-relaxed">
                  India DPDP fines reach <span className="text-urgency font-semibold">₹250 crore per breach</span>. For public sector entities, a compliance failure is also a governance and political crisis.
                </p>
              </div>
              <div className="rounded-2xl border border-india-orange/20 bg-india-orange/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-india-orange mb-4">Public sector coverage</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "DPDP obligations", value: "68 mapped" },
                    { label: "ISO 42001 alignment", value: "Full standard" },
                    { label: "Audit trail", value: "Hash-chained, tamper-evident" },
                    { label: "Accountability mapping", value: "Function-level" },
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
            <h2 className="text-white font-bold text-2xl mb-10">DPDP + ISO 42001 + full audit trail. Out of the box.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Set the accountability standard for Indian public sector AI</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Talk to us about custom deployment options for government entities.</p>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Request a briefing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
