
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page | CompliVibe",
  description: "Learn more about Page on CompliVibe, the Governance OS for AI compliance.",
  keywords: ["Page", "CompliVibe", "compliance", "EU AI Act", "DPDP"],
  alternates: {
    canonical: "https://complivibe.com/Page",
  },
  openGraph: {
    title: "Page | CompliVibe",
    description: "Learn more about Page on CompliVibe, the Governance OS for AI compliance.",
    url: "https://complivibe.com/Page",
    images: [{ url: "https://complivibe.com/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page | CompliVibe",
    description: "Learn more about Page on CompliVibe, the Governance OS for AI compliance.",
    images: ["https://complivibe.com/og-placeholder.png"],
  },
};

import ScoreApp from "./ScoreApp";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
