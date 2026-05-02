"use client";
import { useState } from "react";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

type Currency = "INR" | "USD" | "EUR";

const currencyConfig: Record<Currency, { symbol: string; label: string }> = {
  INR: { symbol: "₹", label: "INR" },
  USD: { symbol: "$", label: "USD" },
  EUR: { symbol: "€", label: "EUR" },
};

const plans = [
  {
    name: "Starter",
    price: { INR: 2499, USD: 29, EUR: 27 },
    description: "For startups exploring AI compliance for the first time.",
    cta: { label: "Start Free Trial", href: "/signup?plan=starter" },
    highlighted: false,
    features: [
      "3 AI Systems Registered",
      "2 Frameworks (EU AI Act + DPDP)",
      "Basic Evidence Vault (1GB)",
      "Risk Classification",
      "Annex IV Generation (3/mo)",
      "Email Support",
      "Weekly Regulatory Updates",
      "Community Slack Access",
    ],
    limits: [
      "No CI/CD Gate",
      "No Custom Exports",
      "No SAML SSO",
      "No Dedicated CSM",
    ],
  },
  {
    name: "Growth",
    price: { INR: 24999, USD: 299, EUR: 279 },
    description: "For scaling teams that need full compliance coverage.",
    cta: { label: "Get Started", href: "/signup?plan=growth" },
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI Systems",
      "8 Frameworks Covered",
      "Full Evidence Vault (50GB)",
      "Advanced Risk Classification",
      "Unlimited Annex IV Generation",
      "Cross-Regulation Mapping",
      "48-Hour Regulatory Updates",
      "Priority Email + Chat Support",
      "Readiness Dashboard",
      "PDF + JSON Exports",
      "Team Members (5 included)",
      "Fine Exposure Calculator",
    ],
    limits: [],
  },
  {
    name: "Enterprise",
    price: { INR: 0, USD: 0, EUR: 0 },
    description: "For large organizations with multi-jurisdiction governance needs.",
    cta: { label: "Talk to Compliance Experts", href: "/contact" },
    highlighted: false,
    features: [
      "Everything in Growth",
      "14 Frameworks Covered",
      "Unlimited Evidence Vault",
      "SAML SSO / SCIM",
      "Audit Log API",
      "CI/CD Compliance Gate",
      "Dedicated CSM",
      "Custom SLA (99.99%)",
      "Expert Sign-Off Add-on",
      "Bhashini Consent Module",
      "Data Residency (India / EU)",
      "Custom Contracts & Invoicing",
    ],
    limits: [],
  },
];

const comparisonRows = [
  { label: "AI Systems Registered", starter: "3", growth: "Unlimited", enterprise: "Unlimited" },
  { label: "Frameworks Covered", starter: "2", growth: "8", enterprise: "14" },
  { label: "Evidence Vault Storage", starter: "1 GB", growth: "50 GB", enterprise: "Unlimited" },
  { label: "Regulatory Update Speed", starter: "Weekly", growth: "48 hours", enterprise: "48 hours" },
  { label: "Annex IV Generation", starter: "3/month", growth: "Unlimited", enterprise: "Unlimited" },
  { label: "Cross-Regulation Mapping", starter: false, growth: true, enterprise: true },
  { label: "Fine Exposure Calculator", starter: false, growth: true, enterprise: true },
  { label: "Export Formats", starter: "PDF", growth: "PDF, JSON", enterprise: "PDF, JSON, CSV, API" },
  { label: "CI/CD Compliance Gate", starter: false, growth: false, enterprise: true },
  { label: "SAML SSO", starter: false, growth: false, enterprise: true },
  { label: "Audit Log API", starter: false, growth: false, enterprise: true },
  { label: "Support SLA", starter: "Community", growth: "Priority", enterprise: "Dedicated CSM" },
  { label: "Data Residency", starter: false, growth: false, enterprise: true },
];

const addons = [
  { label: "Bhashini Consent Module", price: { INR: 4999, USD: 59, EUR: 55 }, desc: "Indian language consent management" },
  { label: "CI/CD Compliance Gate", price: { INR: 9999, USD: 119, EUR: 109 }, desc: "Block non-compliant deployments" },
  { label: "Expert Sign-Off", price: { INR: 14999, USD: 179, EUR: 165 }, desc: "Certified auditor review & sign-off" },
];

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="h-4 w-4 text-compliance-green mx-auto" />;
  if (val === false) return <Minus className="h-4 w-4 text-[#333] mx-auto" />;
  return <span className="text-sm text-[#888]">{val}</span>;
}

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const curr = currencyConfig[currency];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,196,140,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium">Pricing</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              fontWeight: "700",
              background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Start free. Scale as you grow.
          </h2>
          <p className="text-[#666] max-w-md text-base leading-relaxed">
            Get compliant before August 2026. Start with a free trial, upgrade when you need more.
          </p>

          {/* Currency toggle */}
          <div className="flex items-center gap-1 mt-2 p-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
            {(["INR", "USD", "EUR"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                  currency === c
                    ? "bg-white text-black"
                    : "text-[#666] hover:text-white"
                )}
              >
                {c === "INR" ? "🇮🇳 INR" : c === "USD" ? "🇺🇸 USD" : "🇪🇺 EUR"}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={clsx(
                "relative flex flex-col rounded-2xl border p-8 transition-all",
                plan.highlighted
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/[0.08] bg-[#050505]"
              )}
            >
              {/* Glow for highlighted */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-compliance-green/20 to-transparent pointer-events-none" />
              )}

              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-compliance-green/30 bg-compliance-green/10 px-3 py-1 text-xs font-medium text-compliance-green">
                  {plan.badge}
                </span>
              )}

              <div className="relative flex flex-col gap-6 flex-1">
                {/* Plan name */}
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-sm text-[#666] mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1.5">
                  {plan.price[currency] === 0 ? (
                    <span className="text-4xl font-bold text-white tracking-tight">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white tracking-tight">
                        {curr.symbol}{plan.price[currency].toLocaleString()}
                      </span>
                      <span className="text-[#555] text-sm pb-1.5">/ month</span>
                    </>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.cta.href}
                  className={clsx(
                    "flex h-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    plan.highlighted
                      ? "bg-white text-black hover:bg-[#ededed]"
                      : "border border-white/[0.15] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  )}
                >
                  {plan.cta.label}
                </Link>

                {/* Feature list */}
                <ul className="flex flex-col gap-2.5 mt-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-compliance-green flex-shrink-0 mt-0.5" />
                      <span className="text-[#888]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-24">
          <h3 className="text-center text-lg font-semibold text-white mb-8">Add-ons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div key={addon.label} className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white">{addon.label}</h4>
                <p className="text-xs text-[#666]">{addon.desc}</p>
                <p className="text-lg font-bold text-white mt-auto">
                  {curr.symbol}{addon.price[currency].toLocaleString()}<span className="text-[#555] text-xs font-normal"> / month</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div>
          <h3 className="text-center text-lg font-semibold text-white mb-8">Compare plans</h3>
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 bg-[#0A0A0A] border-b border-white/[0.06]">
              <div className="px-6 py-4 text-sm font-medium text-[#555]">Feature</div>
              {["Starter", "Growth", "Enterprise"].map((p) => (
                <div key={p} className="px-6 py-4 text-sm font-semibold text-white text-center">{p}</div>
              ))}
            </div>

            {/* Table rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={clsx(
                  "grid grid-cols-4 items-center",
                  i % 2 === 0 ? "bg-[#050505]" : "bg-[#0A0A0A]",
                  "border-b border-white/[0.04] last:border-0"
                )}
              >
                <div className="px-6 py-3.5 text-sm text-[#888]">{row.label}</div>
                <div className="px-6 py-3.5 text-center"><CellValue val={row.starter} /></div>
                <div className="px-6 py-3.5 text-center"><CellValue val={row.growth} /></div>
                <div className="px-6 py-3.5 text-center"><CellValue val={row.enterprise} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
