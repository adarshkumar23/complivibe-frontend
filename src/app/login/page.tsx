import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | CompliVibe",
  description: "Sign in to your CompliVibe account to manage EU AI Act and India DPDP compliance obligations.",
  alternates: { canonical: "https://complivibe.in/login" },
  openGraph: {
    title: "Sign In | CompliVibe",
    description: "Sign in to your CompliVibe compliance dashboard.",
    url: "https://complivibe.in/login",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | CompliVibe",
    description: "Sign in to your CompliVibe compliance dashboard.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function LoginPage() {
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
                <h1 className="text-xl font-bold text-white">Welcome back</h1>
                <p className="mt-1 text-sm text-[#555]">Sign in to your CompliVibe account</p>
              </div>
            </div>

            <LoginForm />
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
