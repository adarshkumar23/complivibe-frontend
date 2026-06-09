"use client";
import { useState } from "react";
import { Check, Zap, Shield, Activity, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { motion } from "framer-motion";

type Currency = "INR" | "USD" | "EUR";

const currencyConfig: Record<Currency, { symbol: string; label: string }> = {
  INR: { symbol: "₹", label: "INR" },
  USD: { symbol: "$", label: "USD" },
  EUR: { symbol: "€", label: "EUR" },
};

const plans = [
  {
    name: "Starter",
    price: { INR: 9999, USD: 120, EUR: 110 },
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

const addons = [
  { label: "Bhashini Consent Module", price: { INR: 4999, USD: 59, EUR: 55 }, desc: "Indian language consent management" },
  { label: "CI/CD Compliance Gate", price: { INR: 9999, USD: 119, EUR: 109 }, desc: "Block non-compliant deployments" },
  { label: "Expert Sign-Off", price: { INR: 14999, USD: 179, EUR: 165 }, desc: "Certified auditor review & sign-off" },
];

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
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(121,40,202,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#7928CA] font-semibold">
            PRICING
          </p>
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
          <div className="flex items-center gap-1 mt-4 p-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
            {(["INR", "USD", "EUR"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 border",
                  currency === c
                    ? "bg-white/[0.08] text-white border-white/[0.12]"
                    : "text-[#555] hover:text-[#888] border-transparent"
                )}
              >
                {c === "INR" ? "🇮🇳 INR" : c === "USD" ? "🇺🇸 USD" : "🇪🇺 EUR"}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={clsx(
                "relative flex flex-col rounded-2xl border p-8 transition-all z-10",
                plan.highlighted
                  ? "border-transparent bg-[#080808]"
                  : "border-white/[0.08] bg-[#050505]"
              )}
            >
              {/* Glow for highlighted */}
              {plan.highlighted && (
                <>
                  <div 
                    className="absolute -inset-px rounded-2xl pointer-events-none z-[-1]" 
                    style={{
                      background: "linear-gradient(135deg, #0070F3, #00C48C, #7928CA)",
                      opacity: 0.5
                    }}
                  />
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-compliance-green/20 to-transparent pointer-events-none" />
                </>
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
                <div className="flex flex-col gap-1">
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
                  {plan.name === "Starter" && (
                    <span className="text-[#444] text-[11px]">~ $120 /mo</span>
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

        <p className="text-center text-[11px] text-[#333] mt-8 mb-24">
          Prices in Indian Rupees (INR). USD equivalents shown.
          1 USD ≈ ₹83. Billed monthly or annually (save 20%).
        </p>

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

        {/* Value Proposition Cards */}
        <div className="mt-20 max-w-[900px] mx-auto">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-[#333] mb-8">
            Why teams choose CompliVibe
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Zap,
                color: "#0070F3",
                title: "48-hour documentation",
                body: "Annex IV ready in 48 hours. Not 48 weeks. Grounded in actual regulation text, updated automatically when regulations change.",
                footerIcon: CheckCircle2,
                footerText: "Article 11 compliant"
              },
              {
                icon: Shield,
                color: "#00C48C",
                title: "€35M fine protection",
                body: "Know your maximum exposure before regulators calculate it for you. Real-time gap analysis across EU and Indian jurisdictions.",
                footerIcon: ShieldCheck,
                footerText: "No credit card required"
              },
              {
                icon: Activity,
                color: "#7928CA",
                title: "Always audit-ready",
                body: "Hash-chained evidence vault means every compliance action has an immutable record. When auditors arrive, your package is already complete.",
                footerIcon: CheckCircle2,
                footerText: "Tamper-proof audit trail"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-[#0A0A0A] border border-white/[0.07] p-6 relative overflow-hidden group"
              >
                <div 
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `linear-gradient(to right, transparent, ${card.color}80, transparent)` }}
                />
                
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                  style={{ backgroundColor: `${card.color}1A`, borderColor: `${card.color}33` }}
                >
                  <card.icon size={18} style={{ color: card.color }} />
                </div>

                <p className="text-[15px] font-bold text-white mb-2">{card.title}</p>
                <p className="text-[13px] text-[#555] leading-relaxed mb-4">{card.body}</p>

                <div className="mt-auto pt-4 flex items-center gap-2 border-t border-white/[0.04]">
                  <card.footerIcon size={12} className={index === 1 ? "text-[#00C48C]" : "text-[#00C48C]"} />
                  <span className="text-[11px] text-[#444]">{card.footerText}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
