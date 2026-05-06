import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FileText, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation | CompliVibe",
  description: "CompliVibe API documentation and integration guides for EU AI Act and India DPDP compliance automation.",
  alternates: { canonical: "https://complivibe.in/docs" },
  openGraph: {
    title: "Documentation | CompliVibe",
    description: "Full API docs and integration guides for CompliVibe compliance automation.",
    url: "https://complivibe.in/docs",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation | CompliVibe",
    description: "Full API docs and integration guides for CompliVibe compliance automation.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[800px] px-6 py-32 flex flex-col items-center text-center gap-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <FileText className="h-7 w-7 text-compliance-green" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-display-lg text-white">Documentation</h1>
          <p className="text-lg text-[#888] max-w-[500px] leading-relaxed">
            Full API docs and integration guides are coming. In the meantime, explore the live API reference.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
          >
            View API Reference
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            Contact us
          </Link>
        </div>

        <p className="text-xs text-[#444] mt-4">
          Need immediate help?{" "}
          <a href="mailto:contact@complivibe.in" className="text-compliance-green hover:underline">
            contact@complivibe.in
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
