"use client";
import React, { useState } from "react";
import {
  Check,
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

/**
 * The ONE reserved accent for this whole surface. It is spent entirely on the
 * Growth "Most Popular" seal and its CTA. Everything else — plan names, prices,
 * spec panels, Trust Score figures, feature checks — stays on the
 * --cv-ink / --cv-muted / --cv-border monochrome system so the accent reads as
 * a stamp of authority rather than decoration. Do not introduce a second one.
 */
const SIGNATURE_ACCENT = "#2563eb";

type FeatureGroup = { label: string; items: string[] };

type Plan = {
  tier: Tier;
  name: string;
  accent: string;
  badge?: string;
  bestFor: string;
  /** Monthly list price. 0 in every currency means "Custom" (see isCustom below). */
  price: Record<Currency, number>;
  /** Annual list price. Annual = monthly x 12 — there is no annual discount. */
  annualPrice?: Record<Currency, number>;
  /** Used instead of annualPrice for Custom tiers to show a starting band. */
  priceNote?: Record<Currency, string>;
  subCopy?: string;
  cta: { label: string; href: string };
  highlighted: boolean;
  featureGroups: FeatureGroup[];
};

// PRICING IS USD-PRIMARY. USD figures below are the contractual list prices.
//
// !! FX SNAPSHOT — 1 Aug 2026 !!
// INR and EUR figures are derived from USD at 1 USD = 95.4 INR and
// 1 USD = 0.87 EUR, rounded to the nearest ₹100 and nearest €5.
// These are a point-in-time snapshot, not locked contractual rates — they
// drift. Re-derive from the USD column before quoting any non-USD number.
const plans: Plan[] = [
  {
    tier: "starter",
    name: "Starter Trust",
    accent: "#2563eb",
    bestFor: "Seed–Series A, AI-native teams.",
    price: { USD: 500, INR: 47700, EUR: 435 },
    annualPrice: { USD: 6000, INR: 572400, EUR: 5220 },
    cta: { label: "Get Audit-Ready", href: "/signup?plan=starter" },
    highlighted: false,
    featureGroups: [
      {
        label: "Governance Coverage",
        items: [
          "1–2 compliance frameworks (choose your priority: EU AI Act, DPDP, ISO 42001, etc.)",
          "Up to 5 AI systems governed",
          "Core risk & obligation mapping",
        ],
      },
      {
        label: "Trust & Reporting",
        items: [
          "Trust Score + audit report included",
          "Auto-generated model cards & risk assessments (usage-based add-on)",
        ],
      },
      {
        label: "Support",
        items: ["Self-serve + email support"],
      },
    ],
  },
  {
    tier: "growth",
    name: "Growth Trust OS",
    accent: "#7c3aed",
    badge: "Most Popular",
    bestFor: "Series A–B, the sweet spot.",
    price: { USD: 1000, INR: 95400, EUR: 870 },
    annualPrice: { USD: 12000, INR: 1144800, EUR: 10440 },
    subCopy: "One price, every AI framework.",
    cta: { label: "Cover Every Framework", href: "/signup?plan=growth" },
    highlighted: true,
    featureGroups: [
      {
        label: "Governance Coverage",
        items: [
          "All frameworks included — EU AI Act, DPDP, ISO 42001, NIST AI RMF, SOC 2, Colorado AI Act",
          "Up to 25 AI systems governed",
          "Full risk & obligation mapping across every framework you touch",
        ],
      },
      {
        label: "Trust & Reporting",
        items: [
          "Trust Score + audit report included",
          "Peer benchmarking against industry cohorts",
          "Verified badge — public trust signal for your site and sales deck",
        ],
      },
      {
        label: "Support",
        items: ["Priority support"],
      },
    ],
  },
  {
    tier: "enterprise",
    name: "Enterprise Trust Infrastructure",
    accent: "#06b6d4",
    bestFor: "Regulated, multi-framework, multi-entity orgs.",
    price: { USD: 0, INR: 0, EUR: 0 },
    priceNote: {
      USD: "From $3K–5K / mo · $40K–120K+ / yr",
      INR: "From ₹286K–477K / mo · ₹3.8M–11.4M+ / yr",
      EUR: "From €2.6K–4.4K / mo · €35K–104K+ / yr",
    },
    cta: { label: "Talk to Sales", href: "/contact" },
    highlighted: false,
    featureGroups: [
      {
        label: "Governance Coverage",
        items: [
          "All frameworks + custom framework mapping for your regulatory environment",
          "Unlimited AI systems governed",
        ],
      },
      {
        label: "Trust & Reporting",
        items: [
          "Trust Score + audit report included",
          "Peer benchmarking included",
          "Verified badge included",
        ],
      },
      {
        label: "Support",
        items: ["Dedicated CSM", "SLA", "DPA", "SSO"],
      },
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
/*                                                                    */
/*  All three share one "spec panel" shell — a single ruled container  */
/*  rather than floating chips — so they read as an inspection readout */
/*  belonging to the card, not as loose decoration next to it.         */
/* ------------------------------------------------------------------ */
function MiniPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[var(--cv-border)] bg-[var(--cv-bg-soft)]">
      {children}
    </div>
  );
}

function SpecRow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--cv-muted)]" />
      <span className="text-[11px] font-medium text-[var(--cv-ink)]">{label}</span>
    </div>
  );
}

function StarterMini() {
  const rows = [
    { icon: Boxes, label: "AI inventory" },
    { icon: Archive, label: "Evidence vault" },
    { icon: ScanLine, label: "Trust scan" },
  ];
  return (
    <MiniPanel>
      <div className="divide-y divide-[color:var(--cv-border)]">
        {rows.map((r) => (
          <SpecRow key={r.label} icon={r.icon} label={r.label} />
        ))}
      </div>
    </MiniPanel>
  );
}

function GrowthMini() {
  const metrics = [
    { label: "Trust Score", value: "87", pct: 87 },
    { label: "Evidence", value: "91%", pct: 91 },
    { label: "Risk", value: "72%", pct: 72 },
  ];
  return (
    <MiniPanel>
      <div className="grid grid-cols-3 divide-x divide-[color:var(--cv-border)]">
        {metrics.map((m) => (
          <div key={m.label} className="px-3 py-2.5">
            <div className="font-mono text-[17px] font-bold leading-none tabular-nums text-[var(--cv-ink)]">
              {m.value}
            </div>
            <div className="mb-2 mt-1.5 text-[9px] uppercase tracking-[0.1em] text-[var(--cv-muted)]">
              {m.label}
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-[var(--cv-border)]">
              <div
                className="h-full rounded-full bg-[var(--cv-ink)] opacity-30"
                style={{ width: `${m.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MiniPanel>
  );
}

function EnterpriseMini() {
  const rows = [
    { icon: ShieldCheck, label: "SAML / SSO" },
    { icon: SlidersHorizontal, label: "Custom controls" },
    { icon: UserCheck, label: "Dedicated review" },
  ];
  return (
    <MiniPanel>
      <div className="divide-y divide-[color:var(--cv-border)]">
        {rows.map((r) => (
          <SpecRow key={r.label} icon={r.icon} label={r.label} />
        ))}
      </div>
    </MiniPanel>
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

/**
 * `as` controls the heading level only. This section renders on the homepage
 * (where Hero already owns the h1) and on /pricing (where it is the page's
 * main heading), so /pricing passes "h1" to avoid shipping a page with none.
 */
export default function Pricing({ as = "h2" }: { as?: "h1" | "h2" }) {
  const Heading = as;
  const [currency, setCurrency] = useState<Currency>("USD");
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
          <Heading className="section-title mt-4 text-balance">
            Start with AI trust. Scale into{" "}
            <span className="text-gradient-trust">infrastructure</span>.
          </Heading>
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
                  "bento-card glass-highlight relative flex flex-col rounded-[var(--cv-radius-2xl)] p-7",
                  plan.highlighted && "z-10 md:-mt-3 md:scale-[1.03]"
                )}
                // The recommended plan is separated by elevation alone, using the
                // existing shadow token — no colour gradient. overflow must be
                // reset because .bento-card hides it, which would clip the seal
                // that sits above the card's top edge.
                style={
                  plan.highlighted
                    ? { boxShadow: "var(--cv-shadow-glass)", overflow: "visible" }
                    : undefined
                }
              >
                {/* certificate double-rule — an engraved inner frame on the
                    recommended plan, the "stamped document" cue */}
                {plan.highlighted && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[5px] rounded-[calc(var(--cv-radius-2xl)-5px)] border border-[var(--cv-border)]"
                  />
                )}

                {/* seal — the single accented element on this surface */}
                {plan.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[var(--cv-shadow-soft)]"
                    style={{ backgroundColor: SIGNATURE_ACCENT }}
                  >
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {plan.badge}
                  </span>
                )}

                {/* badge + name */}
                <div className="relative flex flex-col gap-3">
                  {!plan.highlighted && plan.badge && (
                    <span className="inline-flex w-fit items-center rounded-full border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    {/* plan name is a classification label, not a headline —
                        the price below carries the visual weight */}
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--cv-ink)]">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--cv-muted)]">{plan.bestFor}</p>
                  </div>
                </div>

                {/* price */}
                <div className="relative mt-6">
                  <div className="flex items-baseline gap-1">
                    {isCustom ? (
                      <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em] text-[var(--cv-ink)]">
                        Custom
                      </span>
                    ) : (
                      <>
                        <span className="text-[1.375rem] font-semibold text-[var(--cv-ink)]">{curr.symbol}</span>
                        <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em] tabular-nums text-[var(--cv-ink)]">
                          {plan.price[currency].toLocaleString()}
                        </span>
                        <span className="text-[13px] text-[var(--cv-muted)]">/ month</span>
                      </>
                    )}
                  </div>

                  {plan.annualPrice && (
                    <p className="mt-2.5 text-[12.5px] tabular-nums text-[var(--cv-muted)]">
                      {curr.symbol}
                      {plan.annualPrice[currency].toLocaleString()} / yr billed annually
                    </p>
                  )}

                  {plan.priceNote && (
                    <p className="mt-2.5 text-[12.5px] tabular-nums text-[var(--cv-muted)]">
                      {plan.priceNote[currency]}
                    </p>
                  )}

                  {plan.subCopy && (
                    <p className="mt-2.5 text-[12.5px] font-semibold text-[var(--cv-ink)]">{plan.subCopy}</p>
                  )}
                </div>

                {/* mini visual */}
                <div className="relative mt-5">{miniByTier[plan.tier]}</div>

                {/* CTA */}
                {/* Only the recommended plan gets a filled button — the accent
                    appears exactly twice on this surface, seal and CTA, and
                    both belong to the same "Most Popular" treatment. */}
                <Link
                  href={plan.cta.href}
                  className={clsx(
                    "relative mt-6 flex h-11 items-center justify-center rounded-full border text-[13px] font-semibold tracking-[0.01em] transition-all",
                    plan.tier === "growth" && "border-transparent text-white hover:opacity-90",
                    plan.tier === "starter" &&
                      "border-[var(--cv-border)] bg-[var(--cv-surface-strong)] text-[var(--cv-ink)] hover:bg-[var(--cv-bg-soft)]",
                    plan.tier === "enterprise" &&
                      "border-[var(--cv-ink)] bg-transparent text-[var(--cv-ink)] hover:bg-[var(--cv-ink)] hover:text-[var(--cv-bg)]"
                  )}
                  style={plan.tier === "growth" ? { backgroundColor: SIGNATURE_ACCENT } : undefined}
                >
                  {plan.cta.label}
                </Link>

                {/* features — each group is a ruled section of a spec sheet:
                    label on the left, hairline running out to the edge, then
                    the inclusions. Groups are separated by a rule, not just gap. */}
                <div className="relative mt-7 border-t border-[var(--cv-border)] pt-6">
                  {plan.featureGroups.map((group, groupIndex) => (
                    <div
                      key={group.label}
                      className={clsx(groupIndex > 0 && "mt-5 border-t border-[var(--cv-border)] pt-5")}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">
                          {group.label}
                        </p>
                        <span aria-hidden className="h-px flex-1 bg-[var(--cv-border)]" />
                      </div>
                      <ul className="flex flex-col gap-2">
                        {group.items.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-[13px] leading-relaxed">
                            <Check className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-[var(--cv-muted)]" />
                            <span className="text-[var(--cv-muted)]">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-[11px] text-[var(--cv-muted)]">
          Prices in USD. INR / EUR equivalents shown. Billed monthly or annually.
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
