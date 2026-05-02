
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

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
export default function FrameworksPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6">14 frameworks. One platform.</h1>
        <div className="mt-8">
           <Link href="/frameworks/eu-ai-act" className="text-compliance-green hover:underline">EU AI Act</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
