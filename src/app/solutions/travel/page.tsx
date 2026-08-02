import type { Metadata } from "next";
import { solutionMetadata } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import SolutionTemplate from "@/components/SolutionTemplate";

export const metadata: Metadata = solutionMetadata("travel");

export default function Page() {
  return (
    <PageShell>
      <SolutionTemplate slug="travel" />
    </PageShell>
  );
}
