import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

type StoryData = {
  title: string;
  sector: string;
  problem: string;
  blocker: string;
  outcome: string;
};

const stories: Record<string, StoryData> = {
  "healthtech-annex-iv": {
    title: "HealthTech pilot unblocked with Annex IV documentation",
    sector: "HealthTech",
    problem:
      "A Bangalore-based clinical AI company was blocked from renewing a pilot with German hospitals because the procurement team requested Annex IV documentation.",
    blocker:
      "The engineering team had no Annex IV-ready technical documentation package and legal support timelines were too slow for the procurement window.",
    outcome:
      "CompliVibe generated all mandatory Annex IV sections and provided a procurement-ready packet in time for review.",
  },
  "fintech-dpdp-gdpr": {
    title: "Fintech team aligned DPDP + GDPR obligations in one view",
    sector: "Fintech",
    problem:
      "A Pune fintech API provider serving EU banks had to maintain separate compliance trackers for DPDP and GDPR with high manual overhead.",
    blocker:
      "The team had no reliable overlap mapping between frameworks, causing duplicated controls and hidden gaps.",
    outcome:
      "CompliVibe mapped overlap and gap obligations into one dashboard with update tracking when either regulation changed.",
  },
  "saas-annex-iii": {
    title: "B2B SaaS classified Annex III risk before enterprise procurement",
    sector: "B2B SaaS",
    problem:
      "A hiring SaaS company in Delhi was asked to classify AI risk level under Annex III before an EU enterprise procurement decision.",
    blocker:
      "The founders had no clear classification workflow and faced a short deadline.",
    outcome:
      "CompliVibe produced a high-risk classification assessment and initial transparency documentation for procurement response.",
  },
};

const storySlugs = Object.keys(stories);

export const dynamicParams = false;

export function generateStaticParams() {
  return storySlugs.map((slug) => ({ slug }));
}

export default async function StoryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories[slug];

  if (!story) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[900px] px-6 py-24">
        <div className="mb-4 inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-xs text-[#888]">
          {story.sector}
        </div>
        <h1 className="mb-8 text-3xl font-bold leading-tight md:text-4xl">{story.title}</h1>

        <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#666]">The situation</h2>
          <p className="text-[#aaa] leading-relaxed">{story.problem}</p>
        </section>

        <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#666]">The blocker</h2>
          <p className="text-[#aaa] leading-relaxed">{story.blocker}</p>
        </section>

        <section className="mb-10 rounded-2xl border border-compliance-green/20 bg-compliance-green/5 p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-compliance-green">With CompliVibe</h2>
          <p className="text-[#ddd] leading-relaxed">{story.outcome}</p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/book-demo"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-[#ededed]"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/customer-stories"
            className="inline-flex h-11 items-center rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white transition-all hover:bg-white/[0.08]"
          >
            Back to stories
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
