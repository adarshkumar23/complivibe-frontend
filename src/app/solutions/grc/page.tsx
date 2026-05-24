import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ClipboardList, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "GRC | CompliVibe",
  description: "719 EU AI Act and DPDP obligations loaded, mapped, and trackable for GRC teams — replace spreadsheets with a purpose-built AI governance platform.",
  alternates: { canonical: "https://complivibe.in/solutions/grc" },
  openGraph: {
    title: "GRC | CompliVibe",
    description: "GRC tools weren't built for AI regulations. CompliVibe was. 719 obligations out of the box.",
    url: "https://complivibe.in/solutions/grc",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRC | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "719 obligations across EU AI Act + India DPDP loaded, mapped, and trackable out of the box",
  "828 cross-jurisdiction mappings — identify overlaps, gaps, and conflicts automatically",
  "Evidence collection engine — attach documentation to every control and obligation",
  "48-hour regulatory update velocity — every material change pushed to your GRC dashboard",
];

export default function GRCPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-compliance-green/20 bg-compliance-green/5 px-4 py-1.5 text-xs text-compliance-green font-medium mb-8">
            <ClipboardList className="h-3 w-3" />
            For GRC Teams
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            GRC tools weren&apos;t built for AI regulations.
            <br />
            <span className="text-[#666]">We were.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Existing GRC platforms like ServiceNow and Archer have no EU AI Act or DPDP modules. GRC teams are doing this in spreadsheets. CompliVibe loads 719 obligations out of the box with full cross-mapping.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a GRC demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  AI regulations arrived. Your GRC platform didn&apos;t get the update
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  Enterprise GRC platforms were built for ISO 27001, SOC 2, and GDPR. None of them have native EU AI Act or India DPDP modules. Mid-market and enterprise GRC teams managing AI compliance are running obligation inventories in Excel.
                </p>
                <p className="text-[#888] leading-relaxed">
                  The consequence: slow, error-prone, and invisible to auditors. When EU AI Act enforcement begins in August 2026, a GRC programme that can&apos;t demonstrate AI obligation tracking is not a compliant programme.
                </p>
              </div>
              <div className="rounded-2xl border border-compliance-green/20 bg-compliance-green/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4">GRC coverage</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "EU AI Act obligations", value: "651" },
                    { label: "India DPDP obligations", value: "68" },
                    { label: "Cross-jurisdiction mappings", value: "828" },
                    { label: "Regulatory update velocity", value: "48 hours" },
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
            <h2 className="text-white font-bold text-2xl mb-10">719 obligations. Loaded. Mapped. Trackable.</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Replace your AI compliance spreadsheet</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">719 obligations, loaded and trackable from day one. No configuration required.</p>
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
