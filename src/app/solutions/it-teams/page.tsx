import type { Metadata } from "next";
import { solutionMetadata } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import SolutionTemplate from "@/components/SolutionTemplate";

export const metadata: Metadata = solutionMetadata("it-teams");

export default function Page() {
  return (
    <PageShell>
      <SolutionTemplate slug="it-teams" />
    </PageShell>
  );
}
