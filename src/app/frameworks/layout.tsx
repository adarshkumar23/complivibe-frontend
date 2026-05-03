import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frameworks — CompliVibe",
  description:
    "EU AI Act, DPDP, SOC 2, ISO 42001, and more — mapped, monitored, and kept current in one governance platform.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
