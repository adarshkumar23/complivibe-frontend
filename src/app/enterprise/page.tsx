import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Enterprise-grade AI compliance infrastructure with advanced controls, custom workflows, dedicated support, and SLA-backed uptime.",
  alternates: { canonical: "https://complivibe.in/enterprise" },
  openGraph: {
    title: "Enterprise | CompliVibe",
    description: "Enterprise-grade AI compliance infrastructure with advanced controls, custom workflows, dedicated support, and SLA-backed uptime.",
    url: "https://complivibe.in/enterprise",
    images: [{ url: "https://complivibe.in/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise | CompliVibe",
    images: ["https://complivibe.in/og-image.png"],
  },
};

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Shield, Globe2, Users } from "lucide-react";

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/10">
      <Nav />
      <div className="pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Compliance</span>
            </h1>
            <p className="text-lg text-white/60">
              Scale your AI governance with advanced controls, custom workflows, and dedicated support. Built for the world&apos;s most demanding organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <Shield className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-semibold mb-3">Advanced Security</h3>
              <p className="text-white/60">Custom SSO, role-based access control, and dedicated infrastructure for your data.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <Globe2 className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-semibold mb-3">Global Scale</h3>
              <p className="text-white/60">Multi-region deployment, localized compliance frameworks, and 99.99% uptime SLA.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <Users className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
              <p className="text-white/60">24/7 priority support, dedicated technical account manager, and custom onboarding.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
