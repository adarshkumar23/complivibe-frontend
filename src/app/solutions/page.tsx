import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  Rocket, Building2, Landmark, Server, Lock, ClipboardList,
  Heart, TrendingUp, Cloud, Flag, Plane, Globe, MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions | CompliVibe",
  description: "CompliVibe compliance solutions for Indian AI startups, mid-market, enterprise, fintech, healthcare, and SaaS — EU AI Act and India DPDP coverage.",
  alternates: { canonical: "https://complivibe.in/solutions" },
  openGraph: {
    title: "Solutions | CompliVibe",
    description: "EU AI Act + India DPDP compliance solutions for every Indian AI company — by size, industry, and role.",
    url: "https://complivibe.in/solutions",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | CompliVibe",
    description: "EU AI Act + India DPDP compliance solutions for every Indian AI company.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const bySize = [
  { name: "Startup", href: "/solutions/startup", icon: Rocket, description: "Compliance infrastructure for seed to Series A teams." },
  { name: "Mid-Market", href: "/solutions/mid-market", icon: Building2, description: "Enterprise-grade coverage at mid-market pricing." },
  { name: "Enterprise", href: "/solutions/enterprise", icon: Landmark, description: "Coordinate controls across functions and geographies." },
  { name: "IT Teams", href: "/solutions/it-teams", icon: Server, description: "Shift compliance left into your delivery pipeline." },
  { name: "CISO", href: "/solutions/ciso", icon: Lock, description: "Centralised AI risk visibility and documentation." },
  { name: "GRC", href: "/solutions/grc", icon: ClipboardList, description: "719 obligations loaded, mapped, and trackable." },
];

const byIndustry = [
  { name: "Healthcare", href: "/solutions/healthcare", icon: Heart, description: "Annex IV for clinical AI. EU hospital procurement ready." },
  { name: "Fintech", href: "/solutions/fintech", icon: TrendingUp, description: "Credit AI documentation for EU banking clients." },
  { name: "SaaS", href: "/solutions/saas", icon: Cloud, description: "On-demand compliance evidence packages." },
  { name: "Government", href: "/solutions/govt", icon: Flag, description: "DPDP + ISO 42001 for public sector AI." },
  { name: "Travel", href: "/solutions/travel", icon: Plane, description: "Cross-border data mapping for EU passenger data." },
];

const packs = [
  { name: "EU Export Pack", href: "/solutions/eu-export", icon: Globe, description: "Generate Annex IV and close EU deals." },
  { name: "India-First Pack", href: "/solutions/india-first", icon: MapPin, description: "68 DPDP obligations mapped and tracked." },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1100px] px-6 py-24">
        <div className="text-center mb-16">
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Solutions
          </h1>
          <p className="text-lg text-[#888] max-w-[520px] mx-auto">
            EU AI Act + India DPDP compliance for every Indian AI company — built for your size, role, and industry.
          </p>
        </div>

        <div className="flex flex-col gap-14">
          {[
            { label: "By size & role", items: bySize },
            { label: "By industry", items: byIndustry },
            { label: "Onboarding packs", items: packs },
          ].map((group) => (
            <section key={group.label}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555] mb-6">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 hover:border-white/20 hover:bg-[#111] transition-all"
                    >
                      <Icon className="h-5 w-5 text-compliance-green mb-4" />
                      <p className="text-white font-semibold mb-1 group-hover:text-compliance-green transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[#555] text-sm">{item.description}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
