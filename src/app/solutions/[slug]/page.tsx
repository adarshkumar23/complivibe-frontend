import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import SolutionTemplate from "@/components/SolutionTemplate";
import { solutions, solutionSlugs } from "@/components/solutions-data";

// Static solution subpages (e.g. /solutions/startup) shadow this catch-all;
// this route covers slugs without a dedicated directory (e.g. enterprise).
export const dynamicParams = false;

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = solutions[slug];
  if (!data) return {};
  return {
    title: `${data.audience} | CompliVibe`,
    description: data.heroSubtitle,
    alternates: { canonical: `https://complivibe.in/solutions/${slug}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!solutions[slug]) notFound();
  return (
    <PageShell>
      <SolutionTemplate slug={slug} />
    </PageShell>
  );
}
