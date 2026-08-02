import type { Metadata } from "next";
import { solutionMetadata } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import SolutionTemplate from "@/components/SolutionTemplate";

export const metadata: Metadata = solutionMetadata("startup");

export default function Page() {
  return (
    <PageShell>
      <SolutionTemplate slug="startup" />
    </PageShell>
  );
}
