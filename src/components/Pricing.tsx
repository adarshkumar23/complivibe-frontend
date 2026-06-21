"use client";
import React, { useState } from "react";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Archive,
  BadgeCheck,
  Boxes,
  ScanLine,
  UserCheck,
  GitBranch,
  Languages,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Currency = "INR" | "USD" | "EUR";

const currencyConfig: Record<Currency, { symbol: string; label: string }> = {
  INR: { symbol: "₹", label: "INR" },
  USD: { symbol: "$", label: "USD" },
  EUR: { symbol: "€", label: "EUR" },
};

type Tier = "starter" | "growth" | "enterprise";

type Plan = {
  tier: Tier;
  name: string;
  accent: string;
  badge: string;
  bestFor: string;
  price: Record<Currency, number>;
  cta: { label: string; href: string };
  highlighted: boolean;
  features: string[];
};

// NOTE: prices, hrefs and plan logic preserved from the original; names/copy reframed
// to AI Trust Infrastructure positioning. Visual fields (badge, bestFor, mini) added.
const plans: Plan[] = [
  {
    tier: "starter",
    name: "Starter Trust",
    accent: "#2563eb",
    badge: "Pilot-ready",
    bestFor: "Early AI teams mapping governance and evidence for the first time.",
    price: { INR: 9999, USD: 120, EUR: 110 },
    cta: { label: "Start Free Trial", href: "/signup?plan=starter" },
    highlighted: false,
    features: [
      "3 AI systems governed",
      "2 frameworks (EU AI Act + DPDP)",
      "Evidence vault (1GB)",
      "Risk classification",
      "Trust reports (3/mo)",
      "Email support",
      "Weekly regulatory intelligence",
      "Community Slack access",
    ],
  },
  {
    tier: "growth",
    name: "Growth Trust OS",
    accent: "#7c3aed",
    badge: "Most popular",
    bestFor: "Teams turning AI governance, compliance, and evidence into an operating workflow.",
    price: { INR: 24999, USD: 299, EUR: 279 },
    cta: { label: "Get Started", href: "/signup?plan=growth" },
    highlighted: true,
    features: [
      "Unlimited AI systems",
      "8 frameworks covered",
      "Full evidence vault (50GB)",
      "Advanced risk classification",
      "Unlimited trust reports",
      "Control-to-evidence mapping",
      "Data observability signals",
      "Priority email + chat support",
      "Trust posture dashboard",
      "Audit pack generator",
      "Team members (5 included)",
      "Vendor & model risk",
    ],
  },
  {
    tier: "enterprise",
    name: "Enterprise Trust Infrastructure",
    accent: "#06b6d4",
    badge: "Custom rollout",
    bestFor: "Companies scaling AI trust across teams, vendors, systems, and markets.",
    price: { INR: 0, USD: 0, EUR: 0 },
    cta: { label: "Talk to Trust Experts", href: "/contact" },
    highlighted: false,
    features: [
      "Everything in Growth",
      "14 frameworks covered",
      "Unlimited evidence vault",
      "SAML SSO / SCIM",
      "Audit log API",
      "CI/CD trust gate",
      "Dedicated CSM",
      "Custom SLA (99.99%)",
      "Human review & expert sign-off",
      "Trust center publishing",
      "Data residency (India / EU)",
      "Custom contracts & invoicing",
    ],
  },
];

const addons: { icon: LucideIcon; label: string; price: Record<Currency, number>; desc: string }[] = [
  { icon: UserCheck, label: "Human Review & Sign-Off", price: { INR: 14999, USD: 179, EUR: 165 }, desc: "Expert review and sign-off before final trust outputs" },
  { icon: GitBranch, label: "CI/CD Trust Gate", price: { INR: 9999, USD: 119, EUR: 109 }, desc: "Block ungoverned AI from reaching production" },
  { icon: Languages, label: "Bhashini Consent Module", price: { INR: 4999, USD: 59, EUR: 55 }, desc: "Indian-language consent management" },
];

const valueProps = [
  {
    icon: ShieldCheck,
    color: "#2563eb",
    title: "Govern",
    body: "Map systems, owners, risks, controls, and reviews.",
  },
  {
    icon: Archive,
    color: "#10b981",
    title: "Evidence",
    body: "Turn scattered proof into audit-ready trust packs.",
  },
  {
    icon: BadgeCheck,
    color: "#06b6d4",
    title: "Prove",
    body: "Share readiness with customers, auditors, and leadership.",
  },
];

const trustStrip = [
  "No setup bloat",
  "Human review ready",
  "Evidence-first workflows",
  "Scale when your AI systems scale",
];

/* ------------------------------------------------------------------ */
/*  Per-plan mini visual                                              */
/* ------------------------------------------------------------------ */
function StarterMini() {
  const chips = [
    { icon: Boxes, label: "AI inventory" },
    { icon: Archive, label: "Evidence vault" },
    { icon: ScanLine, label: "Trust scan" },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((c) => {
        const Icon = c.icon;
        return (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--cv-muted)]"
          >
            <Icon className="h-3 w-3 text-[#2563eb] dark:text-[#3b82f6]" />
            {c.label}
          </span>
        );
      })}
    </div>
  );
}

function GrowthMini() {
  const metrics = [
    { label: "Trust Score", value: "87", pct: 87, color: "#7c3aed" },
    { label: "Evidence", value: "91%", pct: 91, color: "#10b981" },
    { label: "Risk", value: "72%", pct: 72, color: "#f59e0b" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {metrics.map((m) => (
        <div key={m.label} className="rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-2">
          <div className="font-mono text-base font-bold leading-none" style={{ color: m.color }}>
            {m.value}
          </div>
          <div className="mb-1.5 mt-1 text-[9px] uppercase tracking-wide text-[var(--cv-muted)]">{m.label}</div>
          <div className="h-1 overflow-hidden rounded-full bg-[var(--cv-surface-strong)]">
            <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EnterpriseMini() {
  const rows = [
    { icon: ShieldCheck, label: "SAML / SSO" },
    { icon: SlidersHorizontal, label: "Custom controls" },
    { icon: UserCheck, label: "Dedicated review" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((r) => {
        const Icon = r.icon;
        return (
          <div
            key={r.label}
            className="flex items-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--cv-ink)]"
          >
            <Icon className="h-3.5 w-3.5 text-[#0891b2] dark:text-[#22d3ee]" />
            {r.label}
          </div>
        );
      })}
    </div>
  );
}

const miniByTier: Record<Tier, React.ReactNode> = {
  starter: <StarterMini />,
  growth: <GrowthMini />,
  enterprise: <EnterpriseMini />,
};

/* ------------------------------------------------------------------ */
/*  Motion                                                            */
/* ------------------------------------------------------------------ */
const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const curr = currencyConfig[currency];
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="aurora-bg relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="cv-container">
        {/* Heading */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker mb-4">Pricing</span>
          <h2 className="section-title mt-4 text-balance">
            Start with AI trust. Scale into{" "}
            <span className="text-gradient-trust">infrastructure</span>.
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            One platform for AI governance, evidence, compliance, and observability — priced for
            pilots, built for enterprise rollout.
          </p>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {trustStrip.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-[12px] text-[var(--cv-muted)]">
                <Check className="h-3.5 w-3.5 text-[#10b981]" />
                {t}
              </span>
            ))}
          </div>

          {/* Currency segmented control */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--cv-muted)]">
              Billing currency
            </span>
            <div className="liquid-glass inline-flex items-center gap-1 rounded-full p-1">
              {(["INR", "USD", "EUR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  aria-pressed={currency === c}
                  className={clsx(
                    "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200",
                    currency === c
                      ? "bg-[var(--cv-surface-strong)] text-[var(--cv-ink)] shadow-[var(--cv-shadow-soft)]"
                      : "text-[var(--cv-muted)] hover:text-[var(--cv-ink)]"
                  )}
                >
                  {c === "INR" ? "🇮🇳 INR" : c === "USD" ? "🇺🇸 USD" : "🇪🇺 EUR"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          className="mt-16 grid grid-cols-1 items-start gap-5 md:grid-cols-3 md:gap-6"
          variants={cardsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan) => {
            const isCustom = plan.price[currency] === 0;
            return (
              <motion.div
                key={plan.name}
                variants={cardItem}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={clsx(
                  "relative flex flex-col rounded-[var(--cv-radius-2xl)] p-7",
                  plan.highlighted
                    ? "liquid-card glass-highlight z-10 md:-mt-3 md:scale-[1.03]"
                    : "bento-card glass-highlight"
                )}
                style={
                  plan.highlighted
                    ? {
                        borderColor: `${plan.accent}55`,
                        boxShadow:
                          "0 24px 60px rgba(37,99,235,0.16), 0 8px 24px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
                      }
                    : undefined
                }
              >
                {/* recommended soft gradient glow ring */}
                {plan.highlighted && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px -z-10 rounded-[var(--cv-radius-2xl)] opacity-60 blur-[6px]"
                    style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed 50%, #06b6d4)" }}
                  />
                )}

                {/* floating popular pill */}
                {plan.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-[var(--cv-shadow-soft)]"
                    style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
                  >
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </span>
                )}

                {/* badge + name */}
                <div className="flex flex-col gap-3">
                  {!plan.highlighted && (
                    <span
                      className="inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: plan.accent, borderColor: `${plan.accent}33`, backgroundColor: `${plan.accent}12` }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">{plan.name}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--cv-muted)]">{plan.bestFor}</p>
                  </div>
                </div>

                {/* price */}
                <div className="mt-6 flex items-end gap-1.5">
                  {isCustom ? (
                    <span className="text-[2.5rem] font-bold leading-none tracking-tight text-[var(--cv-ink)]">Custom</span>
                  ) : (
                    <>
                      <span className="text-[2.5rem] font-bold leading-none tracking-tight text-[var(--cv-ink)]">
                        {curr.symbol}
                        {plan.price[currency].toLocaleString()}
                      </span>
                      <span className="pb-1 text-sm text-[var(--cv-muted)]">/ month</span>
                    </>
                  )}
                </div>

                {/* mini visual */}
                <div className="mt-5">{miniByTier[plan.tier]}</div>

                {/* CTA */}
                <Link
                  href={plan.cta.href}
                  className={clsx(
                    "mt-6 flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-all",
                    plan.tier === "growth" && "text-white hover:opacity-90",
                    plan.tier === "starter" &&
                      "liquid-glass text-[var(--cv-ink)] hover:border-[#2563eb]/40",
                    plan.tier === "enterprise" &&
                      "bg-[var(--cv-ink)] text-[var(--cv-bg)] hover:opacity-90"
                  )}
                  style={
                    plan.tier === "growth"
                      ? { background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }
                      : undefined
                  }
                >
                  {plan.cta.label}
                </Link>

                {/* features */}
                <div className="mt-6 border-t border-[var(--cv-border)] pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
                    What&apos;s included
                  </p>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px]">
                        <span
                          className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${plan.accent}14` }}
                        >
                          <Check className="h-2.5 w-2.5" style={{ color: plan.accent }} />
                        </span>
                        <span className="text-[var(--cv-muted)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-[11px] text-[var(--cv-muted)]">
          Prices in Indian Rupees (INR). USD / EUR equivalents shown. Billed monthly or annually (save 20%).
        </p>

        {/* Add-ons — extend your trust layer */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-xl font-bold tracking-tight text-[var(--cv-ink)]">Extend your trust layer.</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--cv-muted)]">
              Add specialized reviews, mappings, and advisory support when your AI footprint grows.
            </p>
          </div>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {addons.map((addon) => {
              const Icon = addon.icon;
              return (
                <motion.div
                  key={addon.label}
                  variants={cardItem}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bento-card glass-highlight flex items-start gap-3.5 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7c3aed]/25 bg-[#7c3aed]/10">
                    <Icon className="h-5 w-5 text-[#7c3aed] dark:text-[#a78bfa]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="truncate text-sm font-semibold text-[var(--cv-ink)]">{addon.label}</h4>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--cv-muted)]">{addon.desc}</p>
                    <p className="mt-2 text-base font-bold text-[var(--cv-ink)]">
                      {curr.symbol}
                      {addon.price[currency].toLocaleString()}
                      <span className="text-[11px] font-normal text-[var(--cv-muted)]"> / month</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Value props — Govern / Evidence / Prove */}
        <div className="mx-auto mt-24 max-w-5xl">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--cv-muted)]">
            Why teams choose CompliVibe
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {valueProps.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : index * 0.1, duration: 0.5 }}
                  whileHover={reduce ? undefined : { y: -4 }}
                  className="bento-card glass-highlight flex items-center gap-4 p-6"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{ backgroundColor: `${card.color}14`, borderColor: `${card.color}33` }}
                  >
                    <Icon size={20} style={{ color: card.color }} />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-[var(--cv-ink)]">{card.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--cv-muted)]">{card.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* closing line */}
          <p className="mt-10 text-center text-sm text-[var(--cv-muted)]">
            Start with one AI trust workflow.{" "}
            <span className="font-semibold text-[var(--cv-ink)]">Expand into your operating layer.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
