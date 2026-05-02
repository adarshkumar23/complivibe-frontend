import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,196,140,0.12) 0%, rgba(0,112,243,0.06) 40%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 flex flex-col items-center text-center gap-8">
        {/* CompliVibe logo mark */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-compliance-green/10 to-cv-blue/10 p-4">
          <Shield className="h-8 w-8 text-compliance-green" />
        </div>

        <h2
          className="max-w-3xl text-balance"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: "1.1",
            letterSpacing: "-0.04em",
            fontWeight: "700",
            background: "linear-gradient(to bottom right, #fff 40%, rgba(255,255,255,0.35))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Get compliant before August 2026.
        </h2>

        <p className="max-w-md text-[#666] text-base leading-relaxed">
          Join compliance leaders using CompliVibe to classify, document, and prove AI compliance across India and Europe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
          >
            Start Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex h-12 items-center rounded-full border border-white/[0.15] bg-white/[0.04] px-8 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all"
          >
            Book a Demo
          </Link>
        </div>

        <p className="text-xs text-[#444]">
          Free trial available. No credit card required.
        </p>
      </div>
    </section>
  );
}
