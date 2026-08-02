import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ROICalculator from "@/components/ROICalculator";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Compliance Software Pricing | CompliVibe",
  description:
    "What AI governance and compliance software costs at CompliVibe — plans for startups, mid-market, and enterprise AI teams, priced for pilots and built to scale.",
  alternates: { canonical: "https://complivibe.in/pricing" },
  openGraph: {
    title: "AI Compliance Software Pricing | CompliVibe",
    description:
      "AI Trust Infrastructure priced for pilots, built for enterprise rollout — governance, evidence, compliance, and observability in one platform.",
    url: "https://complivibe.in/pricing",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Compliance Software Pricing | CompliVibe",
    description:
      "AI Trust Infrastructure priced for pilots, built for enterprise rollout — governance, evidence, compliance, and observability in one platform.",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

export default function PricingPage() {
  return (
    <div className="cv-page">
      <Nav />
      <main className="pt-16">
        <Pricing as="h1" />
        <ROICalculator />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
