import Link from "next/link";
import { ShieldCheck, FileCheck2, Archive, Activity, Globe, AlertTriangle } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "AI Trust Command Center", href: "/platform" },
    { label: "AI Governance OS", href: "/platform" },
    { label: "Evidence Vault", href: "/platform" },
    { label: "Data Observability", href: "/platform" },
    { label: "AI Trust Graph", href: "/platform" },
    { label: "Trust Center", href: "/trust" },
  ],
  Solutions: [
    { label: "AI-first SaaS", href: "/solutions/saas" },
    { label: "Fintech", href: "/solutions/fintech" },
    { label: "Healthcare AI", href: "/solutions/healthcare" },
    { label: "GRC teams", href: "/solutions/grc" },
    { label: "Startups", href: "/solutions/startup" },
    { label: "Enterprise AI", href: "/solutions/enterprise" },
  ],
  Frameworks: [
    { label: "EU AI Act", href: "/frameworks/eu-ai-act" },
    { label: "India DPDP", href: "/frameworks/dpdp" },
    { label: "ISO 42001", href: "/frameworks/iso-42001" },
    { label: "NIST AI RMF", href: "/frameworks/nist" },
    { label: "SOC 2", href: "/frameworks/soc2" },
    { label: "Colorado AI Act", href: "/frameworks/colorado-ai-act" },
  ],
  Resources: [
    { label: "Resources", href: "/resources" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "Articles", href: "/articles" },
    { label: "FAQ", href: "/faq" },
    { label: "Customer Stories", href: "/customer-stories" },
    { label: "Changelog", href: "/changelog" },
    { label: "Trust Score", href: "/score" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/book-demo" },
    { label: "Security", href: "/security" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
    { label: "DPA", href: "/legal/dpa" },
  ],
};

const trustLayers = [
  { label: "AI Governance", icon: ShieldCheck, color: "#2563eb" },
  { label: "Compliance Automation", icon: FileCheck2, color: "#7c3aed" },
  { label: "Evidence Vault", icon: Archive, color: "#10b981" },
  { label: "Data Observability", icon: Activity, color: "#06b6d4" },
  { label: "Trust Center", icon: Globe, color: "#2563eb" },
  { label: "Risk Monitoring", icon: AlertTriangle, color: "#f59e0b" },
];

const frameworkBadges = ["EU AI Act", "India DPDP", "ISO 42001", "NIST AI RMF", "SOC 2", "Colorado AI Act"];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Security", href: "/security" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--cv-border)] bg-[var(--cv-bg-soft)]/60 backdrop-blur-sm">
      {/* soft top accent */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.4) 25%, rgba(16,185,129,0.4) 75%, transparent 100%)",
        }}
      />

      <div className="cv-container">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 sm:grid-cols-3 lg:grid-cols-8">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-6 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="CompliVibe Home">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[13px] font-black tracking-tight text-white"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
              >
                CV
              </span>
              <span className="text-base font-semibold text-[var(--cv-ink)]">
                Compli
                <span className="text-gradient-trust">Vibe</span>
              </span>
            </Link>
            <p className="max-w-[240px] text-sm leading-relaxed text-[var(--cv-muted)]">
              AI Trust Infrastructure for governance, compliance, evidence, and observability.
            </p>

            {/* Support email */}
            <div className="flex flex-col gap-1.5 text-xs text-[var(--cv-muted)]">
              <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--cv-muted)]">Support</span>
              <a
                href="mailto:contact@complivibe.in"
                className="text-[#2563eb] transition-colors hover:opacity-80 dark:text-[#3b82f6]"
              >
                contact@complivibe.in
              </a>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs text-[#0f9b6c] dark:text-[#34d399]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
              </span>
              All trust feeds live
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/complivibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 5.978 5.45-5.978zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/complivibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/c/CompliVibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--cv-ink)]">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--cv-muted)] transition-all duration-150 hover:translate-x-0.5 hover:text-[var(--cv-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust-layer badges (primary identity) */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-t border-[var(--cv-border)] py-8">
          {trustLayers.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--cv-muted)] backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5" style={{ color: badge.color }} />
                {badge.label}
              </div>
            );
          })}
        </div>

        {/* Framework badges (secondary, smaller) */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-8">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--cv-muted)]">Frameworks mapped:</span>
          {frameworkBadges.map((badge) => (
            <span key={badge} className="text-[11px] text-[var(--cv-muted)]">
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--cv-border)] py-6 sm:flex-row">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="text-xs text-[var(--cv-muted)]">
              © 2026 CompliVibe Private Limited. All rights reserved.
            </p>
            <p className="text-[11px] text-[var(--cv-muted)] opacity-80">
              AI Trust Infrastructure for governance, compliance, evidence, and observability.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-[var(--cv-muted)] transition-all duration-150 hover:translate-x-0.5 hover:text-[var(--cv-ink)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
