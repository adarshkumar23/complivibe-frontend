import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, CheckSquare, Wrench, Clock } from "lucide-react";
import ResourcesSubscribeForm from "./ResourcesSubscribeForm";

export const metadata: Metadata = {
  title: "Resources | CompliVibe",
  description: "EU AI Act compliance hub for Indian companies — guides, checklists, tools, and 48-hour regulatory updates on DPDP and EU AI Act.",
  alternates: { canonical: "https://complivibe.in/resources" },
  openGraph: {
    title: "Resources | CompliVibe",
    description: "The EU AI Act Compliance Hub for Indian Companies — guides, checklists, and tools.",
    url: "https://complivibe.in/resources",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | CompliVibe",
    description: "The EU AI Act Compliance Hub for Indian Companies.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const resources = [
  {
    icon: BookOpen,
    type: "Guide",
    title: "Is your AI system High-Risk under EU AI Act?",
    description:
      "Use our Annex III classifier to determine your AI system's risk category — UNACCEPTABLE, HIGH, LIMITED, or MINIMAL. Get the exact obligations that apply to your deployment.",
    href: "/score",
    cta: "Run the classifier →",
    color: "text-cv-blue",
    border: "border-cv-blue/20",
    bg: "bg-cv-blue/5",
  },
  {
    icon: CheckSquare,
    type: "Checklist",
    title: "DPDP obligations for SaaS companies",
    description:
      "68 India DPDP obligations mapped to practical controls for software companies. Covers consent architecture, data fiduciary duties, breach response, and cross-border transfer rules.",
    href: "/score",
    cta: "View obligations →",
    color: "text-india-orange",
    border: "border-india-orange/20",
    bg: "bg-india-orange/5",
  },
  {
    icon: Wrench,
    type: "Tool",
    title: "Generate your Annex IV Technical Documentation",
    description:
      "Annex IV is mandatory for every high-risk AI system under EU AI Act. CompliVibe generates all 8 required sections — system description, training data, testing methodology, risk management, and more.",
    href: "/signup",
    cta: "Generate documentation →",
    color: "text-compliance-green",
    border: "border-compliance-green/20",
    bg: "bg-compliance-green/5",
  },
];

function EnforcementCountdown() {
  const target = new Date("2026-08-02").getTime();
  const now = new Date().getTime();
  const daysLeft = Math.max(0, Math.ceil((target - now) / 86400000));

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="text-urgency font-bold"
        style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: "1", letterSpacing: "-0.04em" }}
      >
        {daysLeft}
      </div>
      <div className="text-sm text-[#555]">days until EU AI Act enforcement</div>
      <div className="text-xs text-[#444]">August 2, 2026</div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-urgency/20 bg-urgency/5 px-4 py-1.5 text-xs text-urgency font-medium mb-8">
            <Clock className="h-3 w-3" />
            Regulatory updates within 48 hours of publication
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            The EU AI Act Compliance Hub
            <br />
            <span className="text-[#666]">for Indian Companies</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[560px] mx-auto">
            Guides, checklists, and tools to get EU-ready before August 2026. No consultant required.
          </p>
        </section>

        {/* Countdown */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-16">
            <div className="rounded-2xl border border-urgency/20 bg-urgency/[0.03] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <EnforcementCountdown />
              <div className="md:max-w-[420px]">
                <p className="text-white font-semibold text-lg mb-2">The clock is running</p>
                <p className="text-[#888] text-sm leading-relaxed">
                  EU AI Act enforcement begins August 2, 2026. High-risk AI systems without proper documentation face fines up to{" "}
                  <span className="text-urgency font-semibold">€30M or 6% of global turnover</span>. Every Indian company selling AI to EU customers is in scope.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resource cards */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <h2
              className="text-white font-bold mb-10"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              Start here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.title} className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8 flex flex-col">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${r.bg} border ${r.border} mb-5`}>
                      <Icon className={`h-5 w-5 ${r.color}`} />
                    </div>
                    <div className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${r.color} mb-3`}>
                      {r.type}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{r.title}</h3>
                    <p className="text-[#888] text-sm leading-relaxed flex-1">{r.description}</p>
                    <Link
                      href={r.href}
                      className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${r.color} hover:underline`}
                    >
                      {r.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Email capture */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-10 md:p-14 text-center">
              <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4 font-semibold">
                48-hour update velocity
              </div>
              <h2
                className="text-white font-bold mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
              >
                Get regulatory updates within 48 hours
              </h2>
              <p className="text-[#888] text-sm mb-8 max-w-[420px] mx-auto">
                Every material obligation change in EU AI Act and India DPDP, in your inbox within 48 hours of publication. No noise. Just what matters.
              </p>
              <div className="flex justify-center">
                <ResourcesSubscribeForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
