import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompliVibe — EU AI Act + India DPDP Compliance Platform",
  description: "One platform for EU AI Act and India DPDP compliance. Auto-classify AI systems, generate Annex IV docs, track obligations, and prove readiness in 48 hours.",
  alternates: { canonical: "https://complivibe.in" },
  openGraph: {
    title: "CompliVibe — EU AI Act + India DPDP Compliance Platform",
    description: "One platform for EU AI Act and India DPDP compliance. Auto-classify AI systems, generate Annex IV docs, track obligations, and prove readiness in 48 hours.",
    url: "https://complivibe.in",
    images: [{ url: "https://complivibe.in/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompliVibe — EU AI Act + India DPDP Compliance Platform",
    images: ["https://complivibe.in/og-image.png"],
  },
};

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import DemoVideo from "@/components/DemoVideo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ROICalculator from "@/components/ROICalculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Stats />
        <Features />
        <DemoVideo />
        <Testimonials />
        <Pricing />
        <ROICalculator />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
