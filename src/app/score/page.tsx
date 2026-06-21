import type { Metadata } from "next";
import ScoreApp from "./ScoreApp";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI Trust Score | CompliVibe",
  description:
    "Find your AI trust readiness in minutes. A free assessment of your AI governance, evidence, compliance, risk, and observability posture — no account required.",
  alternates: { canonical: "https://complivibe.in/score" },
  openGraph: {
    title: "Free AI Trust Score | CompliVibe",
    description:
      "Answer a few questions to understand your AI governance, evidence, compliance, risk, and observability posture.",
    url: "https://complivibe.in/score",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Trust Score | CompliVibe",
    description:
      "Answer a few questions to understand your AI governance, evidence, compliance, risk, and observability posture.",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

export default function ScorePage() {
  return (
    <div className="cv-page">
      <Nav />
      <main className="aurora-bg relative overflow-hidden">
        <div className="cv-container py-32 md:py-36">
          <ScoreApp />
        </div>
      </main>
      <Footer />
    </div>
  );
}
