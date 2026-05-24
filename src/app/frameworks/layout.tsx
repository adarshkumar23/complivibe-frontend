import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance Frameworks",
  description: "EU AI Act, India DPDP, SOC 2, ISO 42001, HIPAA and more — mapped, monitored, and kept current in one AI governance platform.",
  alternates: { canonical: "https://complivibe.in/frameworks" },
  openGraph: {
    title: "Compliance Frameworks | CompliVibe",
    description: "EU AI Act, India DPDP, SOC 2, ISO 42001 and more — all mapped in one platform.",
    url: "https://complivibe.in/frameworks",
    images: [{ url: "https://complivibe.in/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliance Frameworks | CompliVibe",
    images: ["https://complivibe.in/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
