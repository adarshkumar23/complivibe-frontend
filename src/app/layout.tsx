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
  title: "CompliVibe — AI Trust Infrastructure for Modern Companies",
  description:
    "AI governance, compliance automation, evidence management, risk monitoring, and data observability in one trust infrastructure layer for modern companies.",
  keywords: [
    "AI Trust Infrastructure",
    "AI governance",
    "compliance automation",
    "evidence management",
    "risk monitoring",
    "data observability",
    "model oversight",
    "vendor risk",
    "CompliVibe",
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
    title: "CompliVibe — AI Trust Infrastructure for Modern Companies",
    description:
      "AI governance, compliance automation, evidence management, risk monitoring, and data observability in one trust infrastructure layer for modern companies.",
    type: "website",
    siteName: "CompliVibe",
    url: "https://complivibe.in",
    locale: "en_IN",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "CompliVibe — AI Trust Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompliVibe — AI Trust Infrastructure",
    description:
      "AI governance, compliance automation, evidence, risk monitoring, and data observability in one trust layer.",
    images: ["/og-image.svg"],
    site: "@complivibe",
    creator: "@complivibe",
  },
  // Search-engine verification meta tags are injected at deploy time via real
  // codes (Google Search Console / Bing Webmaster). Placeholder values are
  // intentionally omitted so no invalid verification tags are emitted.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        {/* Theme bootstrap — light by default; applies stored choice before paint to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cv-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <script defer data-domain="complivibe.in" src="https://analytics.adarshkumar.app/js/script.outbound-links.js"></script>
        <link rel="manifest" href="/site.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CompliVibe",
          url: "https://complivibe.in",
          logo: "https://complivibe.in/favicon.svg",
          description: "AI Trust Infrastructure for AI-first companies — unifying AI governance, compliance automation, evidence management, risk monitoring, model and vendor oversight, trust reporting, and data observability in one operating layer.",
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
          description: "AI Trust Infrastructure for modern companies — AI governance, compliance automation, evidence management, risk monitoring, and data observability in one operating layer.",
          publisher: { "@type": "Organization", name: "CompliVibe" },
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "CompliVibe",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://complivibe.in",
          description: "AI Trust Infrastructure platform unifying AI governance, compliance automation, evidence management, risk monitoring, and data observability.",
          offers: { "@type": "Offer", priceCurrency: "INR", price: "24999" },
        })}} />
      </head>
      <body className="cv-page font-sans antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
