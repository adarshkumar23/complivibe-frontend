import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Plane, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Travel & Mobility | CompliVibe",
  description: "Cross-border data flow mapping, DPDP and GDPR overlap identification, and consent architecture for Indian travel and mobility platforms processing EU passenger data.",
  alternates: { canonical: "https://complivibe.in/solutions/travel" },
  openGraph: {
    title: "Travel & Mobility | CompliVibe",
    description: "Your passengers are EU citizens. Your data practices must be too.",
    url: "https://complivibe.in/solutions/travel",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel & Mobility | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "Cross-border data flow mapping — every EU passenger data transfer mapped and documented",
  "DPDP + GDPR overlap identification — 828 cross-jurisdiction mappings applied to your data flows",
  "Biometric and location data compliance review aligned to EU AI Act high-risk categories",
  "Consent architecture for dual-jurisdiction data subjects — DPDP notices + GDPR consent flows",
];

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-blue/20 bg-cv-blue/5 px-4 py-1.5 text-xs text-cv-blue font-medium mb-8">
            <Plane className="h-3 w-3" />
            For Travel & Mobility
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Your passengers are EU citizens.
            <br />
            <span className="text-[#666]">Your data practices must be too.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Travel platforms process biometric data, location data, and payment data for EU passengers — all regulated under GDPR and potentially EU AI Act. Most Indian travel platforms have no structured compliance for this.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Map your data flows <ArrowRight className="h-4 w-4" />
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
                  Cross-border passenger data triggers multi-jurisdictional obligations most travel platforms aren&apos;t ready for
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  Indian travel and mobility platforms handling EU passenger bookings, loyalty data, or routing information are simultaneously subject to DPDP (as Indian data fiduciaries) and GDPR (for EU personal data). Any AI used in pricing, routing, or passenger profiling may also trigger EU AI Act obligations.
                </p>
                <p className="text-[#888] leading-relaxed">
                  GDPR fines: up to €20M or 4% of global turnover. EU AI Act fines: up to <span className="text-urgency font-semibold">€30M or 6% of global turnover</span>. The exposure compounds when both frameworks apply simultaneously.
                </p>
              </div>
              <div className="rounded-2xl border border-cv-blue/20 bg-cv-blue/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-cv-blue mb-4">Travel platform coverage</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Cross-border data flows mapped", value: "Passenger + payment + biometric" },
                    { label: "DPDP + GDPR overlap", value: "828 cross-mappings" },
                    { label: "Biometric data treatment", value: "Special category under both laws" },
                    { label: "Consent architecture", value: "Dual-jurisdiction support" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-cv-blue text-right max-w-[160px]">{item.value}</span>
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
            <h2 className="text-white font-bold text-2xl mb-10">Cross-border data flow mapping built for travel</h2>
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
            <h2 className="text-white font-bold text-2xl mb-3">Know your cross-border data posture before a regulator does</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Map every EU passenger data flow. Identify every gap.</p>
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
