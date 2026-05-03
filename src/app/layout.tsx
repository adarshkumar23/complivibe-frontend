import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CompliVibe — EU AI Act + India DPDP Compliance Platform",
  description:
    "One platform for EU AI Act and India DPDP compliance. Auto-classify AI systems, generate Annex IV docs, track obligations, and prove readiness — in 48 hours, not 48 weeks.",
  keywords: [
    "EU AI Act",
    "India DPDP",
    "AI compliance",
    "Annex IV",
    "regulatory compliance",
    "CompliVibe",
    "GDPR",
    "risk classification",
  ],
  openGraph: {
    title: "CompliVibe — EU AI Act + India DPDP Compliance Platform",
    description:
      "One platform for EU AI Act and India DPDP compliance. Auto-classify, generate docs, prove readiness.",
    type: "website",
    siteName: "CompliVibe",
  },
  twitter: {
    card: "summary_large_image",
    title: "CompliVibe — Compliance Platform",
    description:
      "EU AI Act + India DPDP. One platform. Zero blocked deals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable, "font-sans dark")}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-black text-white font-sans antialiased">{children}</body>
    </html>
  );
}
