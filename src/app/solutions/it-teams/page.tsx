import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Server, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Teams | CompliVibe",
  description: "Shift AI compliance left into engineering workflows — classify AI systems pre-launch, generate documentation in CI/CD, catch high-risk features before deployment.",
  alternates: { canonical: "https://complivibe.in/solutions/it-teams" },
  openGraph: {
    title: "IT Teams | CompliVibe",
    description: "Compliance shouldn't block your release cycle. CompliVibe integrates AI compliance into your dev workflow.",
    url: "https://complivibe.in/solutions/it-teams",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Teams | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const features = [
  "Annex III classifier API — classify AI systems programmatically before any deployment decision",
  "CI/CD compliance gate — catches high-risk AI feature launches before they hit production",
  "Annex IV documentation generated via API — no legal review bottleneck in the release cycle",
  "48-hour regulatory updates delivered to your engineering dashboard, not a legal inbox",
];

export default function ITTeamsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-blue/20 bg-cv-blue/5 px-4 py-1.5 text-xs text-cv-blue font-medium mb-8">
            <Server className="h-3 w-3" />
            For Engineering & IT Teams
          </div>
          <h1
            className="text-white mb-6 max-w-[820px]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }}
          >
            Compliance shouldn&apos;t block
            <br />
            <span className="text-[#666]">your release cycle.</span>
          </h1>
          <p className="text-lg text-[#888] max-w-[580px] leading-relaxed mb-8">
            Legal and compliance reviews slow down AI feature launches. No tooling exists to shift EU AI Act and DPDP compliance left into the dev workflow — until now.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Explore API <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              Book a technical demo
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-urgency mb-4 font-semibold">The problem</div>
                <h2 className="text-white font-bold text-2xl mb-4 leading-tight">
                  Compliance reviews are a release bottleneck — and the bottleneck is getting worse
                </h2>
                <p className="text-[#888] leading-relaxed mb-4">
                  Every new AI feature at an Indian company with EU customers now needs a compliance review before launch. Legal teams don&apos;t understand models. Engineering teams don&apos;t understand Annex III. The review takes weeks and blocks the release.
                </p>
                <p className="text-[#888] leading-relaxed">
                  EU AI Act enforcement begins August 2026. Without a programmatic compliance gate, every AI feature launch is an unreviewed risk. Indian IT companies serving $50B+ in EU exports cannot afford ad-hoc compliance checks at scale.
                </p>
              </div>
              <div className="rounded-2xl border border-cv-blue/20 bg-cv-blue/[0.03] p-8">
                <div className="text-xs uppercase tracking-[0.12em] text-cv-blue mb-4">Developer-first compliance</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Classification API response", value: "< 3 seconds" },
                    { label: "Annex IV generation", value: "API call, not weeks" },
                    { label: "CI/CD integration", value: "GitHub Actions ready" },
                    { label: "Regulatory update delivery", value: "Dashboard + webhook" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs text-[#555]">{item.label}</span>
                      <span className="text-sm font-semibold text-cv-blue">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-20">
            <div className="text-xs uppercase tracking-[0.12em] text-compliance-green mb-4 font-semibold">How CompliVibe solves it</div>
            <h2 className="text-white font-bold text-2xl mb-10">Shift compliance left. Ship faster.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-compliance-green mt-0.5" />
                  <p className="text-[#888] text-sm leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1100px] px-6 py-16 text-center">
            <h2 className="text-white font-bold text-2xl mb-3">Compliance that ships with your code</h2>
            <p className="text-[#888] mb-8 max-w-[440px] mx-auto">Classify, document, and release — without waiting for legal.</p>
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Explore the API <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
