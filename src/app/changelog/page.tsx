import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Changelog | CompliVibe",
  description: "CompliVibe product changelog — new features, engine updates, and regulatory data releases.",
  alternates: { canonical: "https://complivibe.in/changelog" },
  openGraph: {
    title: "Changelog | CompliVibe",
    description: "Latest CompliVibe feature releases and platform improvements.",
    url: "https://complivibe.in/changelog",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | CompliVibe",
    description: "Latest CompliVibe feature releases and platform improvements.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const entries = [
  {
    version: "v0.3",
    date: "May 2026",
    tag: "New Feature",
    tagColor: "text-compliance-green border-compliance-green/20 bg-compliance-green/5",
    title: "Annex IV Technical Documentation Generator",
    description:
      "Generate all 8 mandatory sections of EU AI Act Annex IV technical documentation with a single API call. Sections include: general system description, training data methodology, validation and testing results, monitoring and logging plan, risk management system, post-market monitoring plan, human oversight measures, and accuracy metrics. Output is formatted for direct submission to EU conformity assessment bodies.",
  },
  {
    version: "v0.2",
    date: "April 2026",
    tag: "Data",
    tagColor: "text-cv-blue border-cv-blue/20 bg-cv-blue/5",
    title: "EU × DPDP Cross-Mapping Engine",
    description:
      "828 bidirectional obligation mappings between EU AI Act (651 obligations) and India DPDP (68 obligations) are now live. The engine identifies overlapping requirements, conflicting obligations, and gaps — so your compliance programme satisfies both jurisdictions without duplication. Every mapping includes the specific article, clause, and recital references.",
  },
  {
    version: "v0.1",
    date: "April 2026",
    tag: "Core Engine",
    tagColor: "text-india-orange border-india-orange/20 bg-india-orange/5",
    title: "Annex III Auto-Classifier",
    description:
      "Classify any AI system into UNACCEPTABLE / HIGH / LIMITED / MINIMAL risk under EU AI Act Annex III with a single API call. The classifier maps system descriptions and use cases against all 14 Annex III high-risk categories, returns a confidence score, and outputs the specific matched obligations that apply to your system. Average classification time: under 3 seconds.",
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[800px] px-6 py-24">
        <div className="mb-16">
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Changelog
          </h1>
          <p className="text-[#888]">Product releases and feature updates.</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="flex flex-col gap-0">
            {entries.map((entry, idx) => (
              <div key={entry.version} className={`relative flex gap-8 ${idx > 0 ? "mt-14" : ""}`}>
                {/* Date + version column */}
                <div className="w-[72px] shrink-0 flex flex-col items-end pt-1 pr-6">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-white font-semibold">
                    {entry.version}
                  </span>
                  <span className="mt-1.5 text-[11px] text-[#444]">{entry.date}</span>
                </div>

                {/* Dot */}
                <div className="absolute left-[69px] top-2.5 h-[6px] w-[6px] rounded-full bg-compliance-green" />

                {/* Content */}
                <div className="flex-1 pb-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${entry.tagColor}`}>
                      {entry.tag}
                    </span>
                  </div>
                  <h2 className="text-white font-semibold text-xl mb-3">{entry.title}</h2>
                  <p className="text-[#888] text-sm leading-relaxed">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
