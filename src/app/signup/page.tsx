import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ShieldCheck, Archive, Activity, FileBarChart } from "lucide-react";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create Account | CompliVibe",
  description:
    "Create your CompliVibe AI trust workspace to govern AI systems, automate evidence, and prove trust to customers and auditors.",
  alternates: { canonical: "https://complivibe.in/signup" },
  openGraph: {
    title: "Create Account | CompliVibe",
    description: "Start building your AI trust layer with CompliVibe.",
    url: "https://complivibe.in/signup",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | CompliVibe",
    description: "Start building your AI trust layer with CompliVibe.",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

const trustPoints = [
  { icon: ShieldCheck, accent: "#2563eb", text: "AI governance for systems, models, and vendors" },
  { icon: Archive, accent: "#10b981", text: "Evidence automation and audit-ready vault" },
  { icon: Activity, accent: "#06b6d4", text: "Data observability and trust signals" },
  { icon: FileBarChart, accent: "#7c3aed", text: "Customer-ready trust reports and trust center" },
];

export default function SignupPage() {
  return (
    <div className="cv-page">
      <Nav />
      <main className="aurora-bg relative overflow-hidden">
        <div className="cv-container flex min-h-[calc(100vh-80px)] items-center justify-center py-32">
          <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Left: positioning + trust card (desktop) */}
            <div className="hidden flex-col gap-7 lg:flex">
              <div>
                <span className="section-kicker mb-4">AI Trust Workspace</span>
                <h1
                  className="font-semibold tracking-tight text-[var(--cv-ink)]"
                  style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  Start building your{" "}
                  <span className="text-gradient-trust">AI trust layer</span>.
                </h1>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--cv-muted)]">
                  Govern AI systems, automate evidence, and prove trust to customers and auditors.
                </p>
              </div>
              <div className="liquid-panel p-6">
                <ul className="flex flex-col gap-4">
                  {trustPoints.map((p) => {
                    const Icon = p.icon;
                    return (
                      <li key={p.text} className="flex items-center gap-3.5">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                          style={{ backgroundColor: `${p.accent}14`, borderColor: `${p.accent}33` }}
                        >
                          <Icon className="h-[18px] w-[18px]" style={{ color: p.accent }} />
                        </span>
                        <span className="text-sm text-[var(--cv-muted)]">{p.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right: auth card */}
            <div className="mx-auto w-full max-w-md">
              <div className="liquid-card glass-highlight p-8">
                <div className="mb-7 flex flex-col items-center gap-3 text-center lg:hidden">
                  <h1 className="text-2xl font-bold tracking-tight text-[var(--cv-ink)]">
                    Create your account
                  </h1>
                  <p className="text-sm text-[var(--cv-muted)]">
                    Govern AI systems, automate evidence, and prove trust.
                  </p>
                </div>
                <SignupForm />
              </div>

              <p className="mt-6 text-center text-xs text-[var(--cv-muted)]">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[#2563eb] transition-colors hover:opacity-80 dark:text-[#3b82f6]"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
