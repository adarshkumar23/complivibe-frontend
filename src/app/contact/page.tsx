import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MessageSquare, Phone, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | CompliVibe",
  description: "Contact CompliVibe for support, sales, or partnership inquiries — EU AI Act and India DPDP compliance platform for Indian companies.",
  alternates: { canonical: "https://complivibe.in/contact" },
  openGraph: {
    title: "Contact | CompliVibe",
    description: "Get in touch with the CompliVibe team for support, demos, or partnership questions.",
    url: "https://complivibe.in/contact",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | CompliVibe",
    description: "Get in touch with the CompliVibe team.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-[#888] max-w-2xl mx-auto mb-12">
          We&apos;re here to help you navigate the AI compliance landscape.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-white/10 rounded-2xl bg-[#050505]">
            <MessageSquare className="w-8 h-8 mx-auto mb-4 text-compliance-green" />
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-[#888] text-sm mb-4">Get help with the platform.</p>
            <a href="mailto:contact@complivibe.in" className="text-compliance-green hover:underline text-sm">
              contact@complivibe.in
            </a>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl bg-[#050505]">
            <Phone className="w-8 h-8 mx-auto mb-4 text-compliance-green" />
            <h3 className="text-xl font-bold mb-2">Sales</h3>
            <p className="text-[#888] text-sm mb-4">Talk to our compliance experts.</p>
            <Link href="/book-demo" className="text-compliance-green hover:underline text-sm">
              Book a demo →
            </Link>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl bg-[#050505]">
            <Users className="w-8 h-8 mx-auto mb-4 text-compliance-green" />
            <h3 className="text-xl font-bold mb-2">Legal & DPA</h3>
            <p className="text-[#888] text-sm mb-4">Privacy, DPA, and legal queries.</p>
            <a href="mailto:legal@complivibe.in" className="text-compliance-green hover:underline text-sm">
              legal@complivibe.in
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
