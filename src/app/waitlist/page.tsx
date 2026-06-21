import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "Join the Waitlist | CompliVibe",
  description:
    "Get early access to the CompliVibe AI trust workspace for governance, evidence, compliance, and observability.",
  alternates: { canonical: "https://complivibe.in/waitlist" },
};

export default function WaitlistPage() {
  return (
    <div className="cv-page">
      <Nav />
      <main className="aurora-bg relative overflow-hidden">
        <div className="cv-container flex min-h-[calc(100vh-80px)] items-center justify-center py-32">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8 text-center">
              <span className="section-kicker mb-4">Early Access</span>
              <h1
                className="font-semibold tracking-tight text-[var(--cv-ink)]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.08 }}
              >
                Join the CompliVibe{" "}
                <span className="text-gradient-trust">waitlist</span>.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--cv-muted)] md:text-base">
                Get early access to the AI trust workspace for governance, evidence, compliance,
                and observability.
              </p>
            </div>

            <div className="liquid-card glass-highlight p-7 md:p-8">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
