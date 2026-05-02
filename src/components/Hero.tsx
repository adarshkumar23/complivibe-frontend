"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Shield, FileText, AlertTriangle, Globe2 } from "lucide-react";
import ComplianceCountdown from "./ComplianceCountdown";
import ScopeQuiz from "./ScopeQuiz";
import { Spotlight } from "./ui/spotlight";
import { cn } from "@/lib/utils";


const rotatingTexts = [
  "Selling to EU customers",
  "Indian SaaS companies",
  "Fintech platforms",
  "Healthcare AI",
  "Enterprise governance",
];

const trustBadges = [
  "ISO 42001 Aligned",
  "DPDP Compliant",
  "SOC 2 (In Progress)",
  "256-bit Encrypted",
];

const companies = ["AWS", "Google Cloud", "Azure", "Bhashini", "ISO 42001", "GDPR"];

function ComplianceDashboardVisual() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-compliance-green/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0A0A] overflow-hidden">
        {/* Dashboard header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#111]">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-compliance-green" />
            <span className="text-xs text-[#888] font-medium">CompliVibe Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-compliance-green">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-compliance-green animate-pulse" />
            Live
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-6 space-y-5">
          {/* Readiness Score */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#555] uppercase tracking-wider mb-1">Compliance Readiness</div>
              <div className="text-4xl font-bold text-white tracking-tight">87<span className="text-lg text-[#555]">%</span></div>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-compliance-green/30 flex items-center justify-center relative">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(0,196,140,0.15)" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#00C48C" strokeWidth="3" strokeDasharray="87,100" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-bold text-compliance-green">87%</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="text-lg font-bold text-white">14</div>
              <div className="text-[10px] text-[#555]">Frameworks</div>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="text-lg font-bold text-white">247</div>
              <div className="text-[10px] text-[#555]">Obligations</div>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="text-lg font-bold text-compliance-green">48h</div>
              <div className="text-[10px] text-[#555]">Update Speed</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <div className="text-xs text-[#555] uppercase tracking-wider">Recent Activity</div>
            {[
              { icon: Shield, text: "Risk Classification: HIGH RISK", time: "2m ago", color: "text-urgency" },
              { icon: FileText, text: "Annex IV Draft Generated", time: "14m ago", color: "text-compliance-green" },
              { icon: AlertTriangle, text: "DPDP Update: Section 8 amended", time: "1h ago", color: "text-india-orange" },
              { icon: Globe2, text: "EU Export Pack: Ready", time: "3h ago", color: "text-v-blue" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <item.icon className={`h-3.5 w-3.5 flex-shrink-0 ${item.color}`} />
                <span className="text-[#888] flex-1">{item.text}</span>
                <span className="text-[#444]">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-[#111]">
          <div className="flex items-center gap-2 text-xs text-compliance-green">
            <div className="h-1.5 w-1.5 rounded-full bg-compliance-green" />
            All compliance feeds live
          </div>
          <span className="text-xs text-[#555] font-mono">v1.0 — India + EU</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:60px_60px] select-none opacity-20",
          "[background-image:linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center gap-8">
        <ComplianceCountdown variant="hero" />

        {/* Headline */}
        <h1
          className="max-w-4xl text-balance"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
            fontWeight: "700",
          }}
        >
          <span
            style={{
              background: "linear-gradient(to bottom right, #fff 40%, rgba(255,255,255,0.35))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EU AI Act + India DPDP.
            <br />
            One platform. Zero blocked deals.
          </span>
        </h1>

        {/* Rotating sub-headline */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-sm text-[#888] font-medium border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-2">
            <span>🇮🇳 India DPDP</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>🇪🇺 EU AI Act</span>
          </div>
          <div className="max-w-[560px] text-balance leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
            <span className="text-[#888]">Built for </span>
            <span className="text-white font-medium transition-all duration-300">
              {rotatingTexts[currentTextIndex]}
            </span>
            <span className="text-[#888]"> — classify, document, and prove compliance before August 2026.</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors shine"
          >
            Start Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/25 transition-all"
          >
            Book a Demo
          </Link>
          <ScopeQuiz trigger={
            <button
              className="inline-flex h-11 items-center gap-2 rounded-full border border-urgency/30 bg-urgency/5 px-6 text-sm font-semibold text-urgency hover:bg-urgency/10 transition-all urgency-pulse"
            >
              Am I In Scope? — Free Quiz
            </button>
          } />
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {trustBadges.map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-[#666]">
              <Shield className="h-3 w-3 text-compliance-green" />
              {badge}
            </span>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <p className="text-sm text-[#888] font-medium">
            Used by compliance teams at <span className="text-white font-bold">50+</span> companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
            {companies.map((c) => (
              <div key={c} className="flex items-center gap-2 text-[#666] hover:text-white transition-colors cursor-default">
                <span className="text-xs font-mono font-bold tracking-wider">{c.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard hero visual */}
        <div className="w-full mt-12 animate-[slide-up_0.8s_ease-out_0.2s_both]">
          <ComplianceDashboardVisual />
        </div>
      </div>
    </section>
  );
}
