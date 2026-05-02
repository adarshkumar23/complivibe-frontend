import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en" className={cn(geistSans.variable, geistMono.variable, "font-sans", geist.variable)}>
      <body className="bg-black text-white font-sans antialiased">{children}</body>
    </html>
  );
}
