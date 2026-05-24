import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform",
  description: "48-hour regulatory engine, CI/CD compliance gates, live obligation monitoring, and hash-chained audit vault for EU AI Act and India DPDP.",
  alternates: { canonical: "https://complivibe.in/platform" },
  openGraph: {
    title: "Platform | CompliVibe",
    description: "48-hour regulatory engine, CI/CD compliance gates, live obligation monitoring, and hash-chained audit vault for EU AI Act and India DPDP.",
    url: "https://complivibe.in/platform",
    images: [{ url: "https://complivibe.in/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform | CompliVibe",
    images: ["https://complivibe.in/og-image.png"],
  },
};

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Shield, CloudLightning, ShieldCheck, Gauge, Activity } from "lucide-react";

const features = [
  {
    icon: CloudLightning,
    title: "48-Hour Engine",
    desc: "When regulations change, your compliance checks update within 48 hours. Stay ahead of enforcement.",
  },
  {
    icon: ShieldCheck,
    title: "CI/CD Gate",
    desc: "Block non-compliant code from reaching production. Integrate directly into GitHub Actions or GitLab.",
  },
  {
    icon: Activity,
    title: "Live Monitor",
    desc: "Real-time tracking of obligation drift. Get alerted the moment an AI system strays from policy.",
  },
  {
    icon: Gauge,
    title: "Hash-Chained Audit",
    desc: "Every compliance action is cryptographically timestamped and logged in a tamper-proof vault.",
  },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="flex flex-col items-center text-center gap-6 mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-sm text-[#888]">
            <Shield className="h-4 w-4 text-compliance-green" />
            <span className="font-medium text-white">The Governance OS</span>
          </div>
          <h1 className="max-w-4xl text-balance text-6xl font-bold">Built for the enforcement era.</h1>
          <p className="text-[#666] max-w-2xl text-lg leading-relaxed">
            A single platform that classifies your AI systems, generates documentation, tracks obligations, monitors drift, and proves compliance — across 14 regulatory frameworks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8 hover:border-white/[0.15] transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] mb-6">
                  <Icon className="h-6 w-6 text-compliance-green" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-[#888] leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
