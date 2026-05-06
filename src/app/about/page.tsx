import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Zap, Target, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About | CompliVibe",
  description: "CompliVibe is building the compliance infrastructure Indian AI companies were missing — EU AI Act and India DPDP on one platform.",
  alternates: { canonical: "https://complivibe.in/about" },
  openGraph: {
    title: "About | CompliVibe",
    description: "A small team building the compliance infrastructure Indian AI was missing, from Gurugram.",
    url: "https://complivibe.in/about",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | CompliVibe",
    description: "A small team building the compliance infrastructure Indian AI was missing, from Gurugram.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const values = [
  {
    icon: Zap,
    title: "Speed",
    description:
      "Regulations move faster than legal teams. Our 48-hour regulatory update engine pushes every material obligation change within two days of publication.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "Obligation-level mapping, not checkbox theatre. Every control links to a specific article, clause, and recital — so you can defend every decision in an audit.",
  },
  {
    icon: MapPin,
    title: "India-first",
    description:
      "Built for Indian founders navigating EU rules. Priced for Indian startups. Designed around the practical reality of building globally from India.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-[#888] mb-8">
            <MapPin className="h-3 w-3 text-compliance-green" />
            Gurugram, India
          </div>
          <h1
            className="text-white mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            We&apos;re a small team building the compliance infrastructure Indian AI was missing.
          </h1>
          <p className="text-lg text-[#888] leading-relaxed max-w-[680px] mx-auto">
            No consultant fees. No multi-year implementation. Just a platform that maps what you must do, what you must document, and what you must prove — across both EU AI Act and India DPDP.
          </p>
        </section>

        {/* Mission */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px] px-6 py-20">
            <div className="rounded-2xl border border-urgency/20 bg-urgency/[0.03] p-10 md:p-14">
              <div className="text-xs uppercase tracking-[0.15em] text-urgency mb-6 font-semibold">Why we exist</div>
              <p
                className="text-white leading-relaxed"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", lineHeight: "1.7" }}
              >
                August 2026, the EU AI Act begins enforcement. Indian companies selling AI to European customers face fines up to{" "}
                <span className="text-urgency font-semibold">€30M or 6% of global turnover</span>. No Indian-built tool existed to handle both EU AI Act and India DPDP together.{" "}
                <span className="text-white font-semibold">We built one.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px] px-6 py-20">
            <h2
              className="text-white font-bold mb-12 text-center"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
            >
              How we work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-compliance-green/10 border border-compliance-green/20 mb-5">
                      <Icon className="h-5 w-5 text-compliance-green" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3">{v.title}</h3>
                    <p className="text-[#888] text-sm leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px] px-6 py-20 text-center">
            <h2
              className="text-white font-bold mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
            >
              The team
            </h2>
            <p className="text-[#888] text-lg leading-relaxed max-w-[600px] mx-auto">
              A founding team from IIT Patna and enterprise operations, building in public from Gurugram. We&apos;re small, ship fast, and talk to every early customer ourselves.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px] px-6 py-20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
            >
              We&apos;re hiring
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all"
            >
              Talk to us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
