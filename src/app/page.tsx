import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompliVibe — AI Trust Infrastructure for Modern Companies",
  description: "AI governance, compliance automation, evidence management, risk monitoring, and data observability in one trust infrastructure layer for modern companies.",
  alternates: { canonical: "https://complivibe.in" },
  openGraph: {
    title: "CompliVibe — AI Trust Infrastructure for Modern Companies",
    description: "AI governance, compliance automation, evidence management, risk monitoring, and data observability in one trust infrastructure layer for modern companies.",
    url: "https://complivibe.in",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompliVibe — AI Trust Infrastructure for Modern Companies",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import RegFeed from "@/components/RegFeed";
import LogoCloud from "@/components/LogoCloud";
import TrustBadgeStrip from "@/components/TrustBadgeStrip";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProductBentoGrid from "@/components/ProductBentoGrid";
import AITrustGraph from "@/components/sections/AITrustGraph";
import DemoVideo from "@/components/DemoVideo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ROICalculator from "@/components/ROICalculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="cv-page">
      <Nav />
      <main>
        <Hero />
        <ProductBentoGrid />
        <AITrustGraph />
        <Features />
        <TrustBadgeStrip />
        <RegFeed />
        <Stats />
        <LogoCloud />
        <ProblemSection />
        <SolutionSection />
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
