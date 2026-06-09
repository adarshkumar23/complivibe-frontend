import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import ScrollProgress from "@/components/ScrollProgress";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://complivibe.in"),
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
  authors: [{ name: "CompliVibe", url: "https://complivibe.in" }],
  creator: "CompliVibe",
  publisher: "CompliVibe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://complivibe.in" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CompliVibe — EU AI Act + India DPDP Compliance Platform",
    description:
      "One platform for EU AI Act and India DPDP compliance. Auto-classify, generate docs, prove readiness.",
    type: "website",
    siteName: "CompliVibe",
    url: "https://complivibe.in",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CompliVibe — AI Compliance Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompliVibe — Compliance Platform",
    description:
      "EU AI Act + India DPDP. One platform. Zero blocked deals.",
    images: ["/og-image.png"],
    site: "@complivibe",
    creator: "@complivibe",
  },
  verification: {
    google: "REPLACE_GOOGLE_VERIFICATION_CODE",
    other: { "msvalidate.01": "REPLACE_BING_VERIFICATION_CODE" },
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
      <head>
        <script defer data-domain="complivibe.in" src="https://analytics.adarshkumar.app/js/script.outbound-links.js"></script>
        <link rel="manifest" href="/site.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CompliVibe",
          url: "https://complivibe.in",
          logo: "https://complivibe.in/favicon.svg",
          description: "AI-powered compliance platform for EU AI Act and India DPDP regulations.",
          foundingDate: "2024",
          areaServed: ["IN", "EU"],
          sameAs: [
            "https://linkedin.com/company/complivibe",
            "https://twitter.com/complivibe",
            "https://github.com/adarshkumar23/complivibe-frontend",
          ],
          contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: "https://complivibe.in/contact" },
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "CompliVibe",
          url: "https://complivibe.in",
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: "https://complivibe.in/search?q={search_term_string}" },
            "query-input": "required name=search_term_string",
          },
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "CompliVibe",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://complivibe.in",
          description: "AI compliance management platform for EU AI Act and India DPDP.",
          offers: { "@type": "Offer", priceCurrency: "INR", price: "24999" },
        })}} />
      </head>
      <body className="min-h-screen bg-black text-white font-sans antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
