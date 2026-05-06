import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create Account | CompliVibe",
  description: "Create your CompliVibe account and start mapping EU AI Act and India DPDP compliance obligations for your AI systems.",
  alternates: { canonical: "https://complivibe.in/signup" },
  openGraph: {
    title: "Create Account | CompliVibe",
    description: "Start your CompliVibe compliance journey — EU AI Act + India DPDP on one platform.",
    url: "https://complivibe.in/signup",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | CompliVibe",
    description: "Start your CompliVibe compliance journey — EU AI Act + India DPDP on one platform.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-compliance-green to-cv-blue">
                <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold text-white">Get EU-ready</h1>
                <p className="mt-1 text-sm text-[#555]">
                  Join Indian AI companies closing EU deals with CompliVibe
                </p>
              </div>
            </div>

            <SignupForm />
          </div>

          <p className="mt-6 text-center text-xs text-[#444]">
            Need help?{" "}
            <Link href="/contact" className="text-[#666] hover:text-white transition-colors">
              Contact support
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
