import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import BookDemoForm from "./BookDemoForm";

export const metadata: Metadata = {
  title: "Book a Demo | CompliVibe",
  description: "Book a 30-minute CompliVibe demo to see EU AI Act Annex III classification, Annex IV document generation, and your DPDP obligation map.",
  alternates: { canonical: "https://complivibe.in/book-demo" },
  openGraph: {
    title: "Book a Demo | CompliVibe",
    description: "30 minutes. No sales pitch. See your EU AI Act risk classification and DPDP obligation map live.",
    url: "https://complivibe.in/book-demo",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo | CompliVibe",
    description: "30 minutes. No sales pitch. See your EU AI Act risk classification and DPDP obligation map live.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const reasons = [
  "See your AI system classified against Annex III in real time",
  "Generate a sample Annex IV Technical Documentation",
  "Get your cross-mapped EU + DPDP obligation checklist",
  "30 minutes. No sales pitch. Just your compliance picture.",
];

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1100px] px-6 py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-urgency/20 bg-urgency/5 px-4 py-1.5 text-xs text-urgency font-medium mb-6">
            EU AI Act enforcement: August 2, 2026
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            See your compliance picture in 30 minutes
          </h1>
          <p className="text-lg text-[#888] max-w-[560px] mx-auto">
            Real classification. Real documentation. No fluff.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Why book */}
          <div>
            <h2 className="text-white font-semibold text-xl mb-6">What you&apos;ll get</h2>
            <ul className="flex flex-col gap-5">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-compliance-green mt-0.5" />
                  <span className="text-[#888] leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6">
              <div className="text-xs uppercase tracking-[0.12em] text-[#555] mb-3">The stakes</div>
              <p className="text-sm text-[#888] leading-relaxed">
                EU AI Act enforcement begins{" "}
                <span className="text-urgency font-semibold">August 2, 2026</span>. High-risk AI fines: up to{" "}
                <span className="text-urgency font-semibold">€30M or 6% of global annual turnover</span>. Indian IT + SaaS exports to EU:{" "}
                <span className="text-white font-semibold">$50B+ market</span>.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8">
            <h2 className="text-white font-semibold text-xl mb-6">Book your demo</h2>
            <BookDemoForm />
            <p className="mt-6 text-center text-sm text-[#555]">
              Prefer email?{" "}
              <a href="mailto:contact@complivibe.in" className="text-compliance-green hover:underline">
                contact@complivibe.in
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
