import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform — The AI Trust OS",
  description:
    "CompliVibe is the AI Trust OS for modern companies — connecting AI governance, compliance automation, evidence, risk monitoring, and data observability into one operating layer.",
  alternates: { canonical: "https://complivibe.in/platform" },
  openGraph: {
    title: "Platform — The AI Trust OS | CompliVibe",
    description:
      "One operating layer for AI governance, compliance automation, evidence, risk monitoring, and data observability.",
    url: "https://complivibe.in/platform",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform — The AI Trust OS | CompliVibe",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PlatformContent from "./PlatformContent";

export default function PlatformPage() {
  return (
    <div className="cv-page">
      <Nav />
      <main>
        <PlatformContent />
      </main>
      <Footer />
    </div>
  );
}
