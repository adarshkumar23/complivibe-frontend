import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, Code2, FileSearch } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | CompliVibe",
  description: "Join CompliVibe and build the compliance infrastructure for Indian AI — working on EU AI Act, DPDP, and AI governance tooling.",
  alternates: { canonical: "https://complivibe.in/careers" },
  openGraph: {
    title: "Careers | CompliVibe",
    description: "Build the compliance layer for Indian AI. Open roles in engineering and regulatory analysis.",
    url: "https://complivibe.in/careers",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | CompliVibe",
    description: "Build the compliance layer for Indian AI. Open roles in engineering and regulatory analysis.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const roles = [
  {
    icon: Code2,
    title: "Full-Stack Engineer",
    tags: ["Next.js", "FastAPI", "Python"],
    details: ["Equity-heavy", "Remote"],
    description:
      "Build the core compliance platform: the obligation mapping engine, Annex IV document generator, API integrations, and the dashboard Indian AI teams use to prove readiness. You'll own product decisions from day one.",
  },
  {
    icon: FileSearch,
    title: "Regulatory Analyst",
    tags: ["EU AI Act", "DPDP"],
    details: ["Part-time or full-time", "Remote"],
    description:
      "Map new regulations as they publish. Translate legal obligations into structured data. Review AI system classifications for accuracy. You're the reason our 48-hour update promise is credible.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-[#888] mb-8">
            <MapPin className="h-3 w-3 text-compliance-green" />
            Remote · Gurugram HQ
          </div>
          <h1
            className="text-white mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Build the compliance layer for Indian AI
          </h1>
          <p className="text-lg text-[#888] leading-relaxed max-w-[580px] mx-auto">
            We&apos;re early. If you want to work on a hard problem at the intersection of AI, law, and infrastructure — talk to us.
          </p>
        </section>

        {/* Roles */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px] px-6 py-20">
            <h2
              className="text-white font-bold mb-10"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", letterSpacing: "-0.02em" }}
            >
              Open roles
            </h2>
            <div className="flex flex-col gap-5">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.title}
                    className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-compliance-green/10 border border-compliance-green/20">
                        <Icon className="h-5 w-5 text-compliance-green" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-white font-semibold text-xl">{role.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            {role.tags.map((tag) => (
                              <span key={tag} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-[#888]">
                                {tag}
                              </span>
                            ))}
                            {role.details.map((d) => (
                              <span key={d} className="inline-flex items-center rounded-full border border-compliance-green/20 bg-compliance-green/5 px-2.5 py-0.5 text-[11px] text-compliance-green">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-[#888] text-sm leading-relaxed">{role.description}</p>
                        <a
                          href="mailto:contact@complivibe.in?subject=I want to build CompliVibe"
                          className="mt-5 inline-flex h-9 items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-black hover:bg-[#ededed] transition-colors"
                        >
                          Apply for this role
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open application */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px] px-6 py-16 text-center">
            <p className="text-[#888] mb-6 text-sm leading-relaxed max-w-[500px] mx-auto">
              Don&apos;t see your role? Email{" "}
              <a href="mailto:contact@complivibe.in?subject=I want to build CompliVibe" className="text-white hover:text-compliance-green transition-colors">
                contact@complivibe.in
              </a>{" "}
              with the subject:{" "}
              <span className="font-mono text-compliance-green">I want to build CompliVibe</span>
            </p>
            <a
              href="mailto:contact@complivibe.in?subject=I want to build CompliVibe"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all"
            >
              contact@complivibe.in
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
