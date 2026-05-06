import type { Metadata } from "next";
import ScoreApp from "./ScoreApp";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Risk Assessment | CompliVibe",
  description: "Classify your AI system against EU AI Act Annex III in 7 questions — determine your risk category, matched obligations, and EU + DPDP applicability.",
  alternates: { canonical: "https://complivibe.in/score" },
  openGraph: {
    title: "AI Risk Assessment | CompliVibe",
    description: "7-question AI scope assessment: find your EU AI Act risk category and DPDP obligations.",
    url: "https://complivibe.in/score",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Risk Assessment | CompliVibe",
    description: "7-question AI scope assessment: find your EU AI Act risk category and DPDP obligations.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function ScorePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[800px] px-6 py-24">
        <ScoreApp />
      </main>
      <Footer />
    </div>
  );
}
