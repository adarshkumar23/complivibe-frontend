import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust Center",
  description: "CompliVibe security practices, data handling, certifications, and compliance posture for enterprise customers.",
  alternates: { canonical: "https://complivibe.in/trust" },
  openGraph: {
    title: "Trust Center | CompliVibe",
    description: "CompliVibe security practices, data handling, certifications, and compliance posture for enterprise customers.",
    url: "https://complivibe.in/trust",
    images: [{ url: "https://complivibe.in/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Center | CompliVibe",
    images: ["https://complivibe.in/og-image.png"],
  },
};

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function TrustPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6">Trust Center</h1>
      </main>
      <Footer />
    </div>
  );
}