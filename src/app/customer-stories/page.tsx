import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Heart, TrendingUp, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Stories | CompliVibe",
  description: "See the kinds of EU AI Act and India DPDP compliance problems CompliVibe solves for Indian HealthTech, Fintech, and B2B SaaS companies.",
  alternates: { canonical: "https://complivibe.in/customer-stories" },
  openGraph: {
    title: "Customer Stories | CompliVibe",
    description: "Compliance problems CompliVibe solves — HealthTech, Fintech, and B2B SaaS use cases.",
    url: "https://complivibe.in/customer-stories",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Stories | CompliVibe",
    description: "Compliance problems CompliVibe solves — HealthTech, Fintech, and B2B SaaS use cases.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const useCases = [
  {
    slug: "healthtech-annex-iv",
    icon: Heart,
    sector: "HealthTech",
    color: "text-urgency",
    border: "border-urgency/20",
    bg: "bg-urgency/5",
    title: "Indian HealthTech selling to German hospitals — blocked on Annex IV documentation",
    problem:
      "A Bangalore-based clinical AI company had a pilot agreement with a network of German hospitals. Their AI flagged high-risk diagnostic candidates for radiologists. Six months into the relationship, the hospital's procurement team required EU AI Act Annex IV technical documentation before renewing the contract.",
    situation:
      "The company had no Annex IV documentation. Their engineering team understood the model but had never structured the documentation in the format EU conformity assessment requires — general system description, training data methodology, validation results, and post-market monitoring plan. A legal firm quoted €40,000 to prepare it.",
    outcome:
      "CompliVibe classifies the system as HIGH RISK under Annex III (healthcare AI) and generates all 8 mandatory Annex IV sections. The documentation is ready for procurement review in minutes, not months.",
  },
  {
    slug: "fintech-dpdp-gdpr",
    icon: TrendingUp,
    sector: "Fintech",
    color: "text-cv-blue",
    border: "border-cv-blue/20",
    bg: "bg-cv-blue/5",
    title: "Fintech API provider with EU banking clients — needed DPDP + GDPR overlap mapped",
    problem:
      "A Pune-based fintech company provided credit risk APIs to three EU banks and processed financial data of Indian borrowers who also had EU residency. They faced obligations under both India DPDP (as a data fiduciary) and EU GDPR (as a data processor for EU banks).",
    situation:
      "Their compliance team was maintaining two separate spreadsheet trackers — one for DPDP and one for GDPR. They had no way to know which obligations overlapped, which conflicted, and where they were exposed. Each regulatory update required manual review of both documents.",
    outcome:
      "CompliVibe's 828-mapping cross-jurisdiction engine identifies exact overlaps and gaps between their DPDP and GDPR obligations. A single dashboard tracks both frameworks with automatic updates when either regulation changes.",
  },
  {
    slug: "saas-annex-iii",
    icon: Users,
    sector: "B2B SaaS",
    color: "text-compliance-green",
    border: "border-compliance-green/20",
    bg: "bg-compliance-green/5",
    title: "B2B SaaS hiring tool — needed Annex III classification before EU enterprise deal",
    problem:
      "A Delhi-based recruiting SaaS company was in final negotiations with a 5,000-person European manufacturing company. The EU customer's legal team asked: 'Is your AI a high-risk system under EU AI Act Annex III?' The company's founders had no idea — they had never done an Annex III assessment.",
    situation:
      "Their AI ranked job applicants and recommended shortlists to hiring managers. EU AI Act explicitly lists employment-related AI in Annex III as high-risk. Without classification documentation, the deal was on hold. They had 48 hours before the EU customer's procurement committee meeting.",
    outcome:
      "CompliVibe classifies the system as HIGH RISK (Annex III: employment decisions), outputs the specific applicable obligations, and generates preliminary Article 13 transparency documentation — the minimum needed to respond to the procurement team.",
  },
];

export default function CustomerStoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-16 text-center">
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Customer Stories
          </h1>
          <p className="text-lg text-[#888] max-w-[560px] mx-auto">
            We&apos;re in early access. These are the kinds of problems we&apos;re solving.
          </p>
        </section>

        {/* Use cases */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20 flex flex-col gap-8">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${uc.bg} border ${uc.border}`}>
                      <Icon className={`h-4 w-4 ${uc.color}`} />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${uc.color}`}>
                      {uc.sector} Use Case
                    </span>
                  </div>
                  <h2 className="text-white font-semibold text-xl mb-6 leading-snug">{uc.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.12em] text-[#555] mb-2">The situation</div>
                      <p className="text-[#888] text-sm leading-relaxed">{uc.problem}</p>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.12em] text-[#555] mb-2">The blocker</div>
                      <p className="text-[#888] text-sm leading-relaxed">{uc.situation}</p>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.12em] text-compliance-green mb-2">With CompliVibe</div>
                      <p className="text-[#888] text-sm leading-relaxed">{uc.outcome}</p>
                      <Link
                        href={`/customer-stories/${uc.slug}`}
                        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-compliance-green transition-colors"
                      >
                        Read full story
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-16 text-center">
            <p className="text-white font-semibold text-xl mb-3">Is this your situation?</p>
            <p className="text-[#888] mb-8 max-w-[400px] mx-auto">
              Talk to us. 30 minutes. We&apos;ll show you exactly what compliance looks like for your AI system.
            </p>
            <Link
              href="/book-demo"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
