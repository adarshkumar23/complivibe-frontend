import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import SolutionTemplate from "@/components/SolutionTemplate";

export const metadata: Metadata = {
  title: "US SaaS Going Global | CompliVibe",
  description: "AI Trust Infrastructure for governance, evidence, observability, and trust reporting.",
  alternates: { canonical: "https://complivibe.in/solutions/us-saas" },
  openGraph: {
    title: "US SaaS Going Global | CompliVibe",
    description: "AI Trust Infrastructure for governance, evidence, observability, and trust reporting.",
    url: "https://complivibe.in/solutions/us-saas",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <PageShell>
      <SolutionTemplate slug="us-saas" />
    </PageShell>
  );
}
