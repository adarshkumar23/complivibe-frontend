import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ROICalculator from "@/components/ROICalculator";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing | CompliVibe",
  description: "CompliVibe pricing plans for Indian AI startups, mid-market, and enterprise — EU AI Act and India DPDP compliance infrastructure starting at ₹24,999/month.",
  alternates: { canonical: "https://complivibe.in/pricing" },
  openGraph: {
    title: "Pricing | CompliVibe",
    description: "EU AI Act + India DPDP compliance infrastructure at startup, mid-market, and enterprise pricing.",
    url: "https://complivibe.in/pricing",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | CompliVibe",
    description: "EU AI Act + India DPDP compliance infrastructure at startup, mid-market, and enterprise pricing.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <div className="pt-24 pb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-compliance-green/20 bg-compliance-green/5 px-4 py-1.5 text-xs text-compliance-green font-medium">
            Calculate your fine exposure first.
          </div>
        </div>
        <ROICalculator />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
