"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Shield } from "lucide-react";
import { clsx } from "clsx";
import RegFeed from "./RegFeed";

const platformItems = [
  { label: "Governance OS", desc: "End-to-end compliance platform", href: "/platform" },
  { label: "48-Hour Engine", desc: "Fastest regulatory updates in market", href: "/platform#engine" },
  { label: "CI/CD Gate", desc: "Block non-compliant deploys", href: "/platform#cicd" },
  { label: "Audit Trail", desc: "Hash-chained tamper-proof logs", href: "/platform#audit" },
  { label: "Live Monitor", desc: "Real-time obligation drift tracking", href: "/platform#monitor" },
];

const solutionsBySize = [
  { label: "Startup", desc: "Get compliant fast, stay lean", href: "/solutions/startup" },
  { label: "Mid-Market", desc: "Scale compliance with your team", href: "/solutions/enterprise" },
  { label: "Enterprise", desc: "Multi-jurisdiction governance OS", href: "/solutions/enterprise" },
  { label: "IT Teams", desc: "Integrate compliance into your stack", href: "/solutions" },
  { label: "CISO", desc: "Risk visibility across all AI systems", href: "/solutions" },
  { label: "GRC", desc: "Governance, risk & compliance workflows", href: "/solutions" },
];

const solutionsByIndustry = [
  { label: "Healthcare", desc: "HIPAA + EU AI Act Article 22", href: "/solutions/healthcare" },
  { label: "Fintech", desc: "RBI SAR + GDPR dual compliance", href: "/solutions/fintech" },
  { label: "SaaS", desc: "Unblock EU deals now", href: "/solutions/startup" },
  { label: "Government", desc: "Public sector AI governance", href: "/solutions" },
  { label: "Travel", desc: "Cross-border data compliance", href: "/solutions" },
];

const solutionsPacks = [
  { label: "EU Export Pack", desc: "Sell to EU customers, unblocked", href: "/solutions" },
  { label: "India-First Onboarding", desc: "DPDP-native compliance setup", href: "/solutions" },
  { label: "US SaaS Onboarding", desc: "SOC2 + AI Act alignment", href: "/solutions" },
];

const frameworkItems = [
  { label: "EU AI Act", desc: "Full Annex IV documentation", href: "/frameworks/eu-ai-act" },
  { label: "India DPDP", desc: "Digital Personal Data Protection", href: "/frameworks/dpdp" },
  { label: "GDPR", desc: "General Data Protection Regulation", href: "/frameworks/gdpr" },
  { label: "ISO 42001", desc: "AI Management System Standard", href: "/frameworks/iso-42001" },
  { label: "NIST AI RMF", desc: "Risk Management Framework", href: "/frameworks/nist" },
  { label: "SOC 2", desc: "Trust Services Criteria", href: "/frameworks/soc2" },
];

const resourceItems = [
  { label: "Compliance Compass", desc: "Blog & regulatory insights", href: "/resources" },
  { label: "Customer Stories", desc: "How teams use CompliVibe", href: "/resources" },
  { label: "Demo Videos", desc: "See the platform in action", href: "/resources" },
  { label: "Ebooks & Guides", desc: "Deep-dive compliance resources", href: "/resources" },
  { label: "Training & Events", desc: "Workshops and Trust Week", href: "/resources" },
];

type NavItem = {
  label: string;
  href: string;
  megaMenu?: boolean;
  children?: { label: string; desc: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Platform", href: "/platform", children: platformItems },
  { label: "Solutions", href: "/solutions", megaMenu: true },
  { label: "Resources", href: "/resources", children: resourceItems },
  { label: "Frameworks", href: "/frameworks", children: frameworkItems },
  { label: "Pricing", href: "/pricing" },
];

function DropdownMenu({ items }: { items: { label: string; desc: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/50 overflow-hidden z-50">
      <div className="p-1.5">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-medium text-white">{item.label}</span>
            <span className="text-xs text-[#888]">{item.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SolutionsMegaMenu() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/50 overflow-hidden z-50">
      <div className="grid grid-cols-3 gap-0 divide-x divide-white/[0.06]">
        {/* By Size */}
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] mb-3 px-2">By Size</p>
          {solutionsBySize.map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col gap-0.5 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
              <span className="text-sm font-medium text-white">{item.label}</span>
              <span className="text-[11px] text-[#666]">{item.desc}</span>
            </Link>
          ))}
        </div>
        {/* By Industry */}
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] mb-3 px-2">By Industry</p>
          {solutionsByIndustry.map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col gap-0.5 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
              <span className="text-sm font-medium text-white">{item.label}</span>
              <span className="text-[11px] text-[#666]">{item.desc}</span>
            </Link>
          ))}
        </div>
        {/* Packs */}
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] mb-3 px-2">Onboarding Packs</p>
          {solutionsPacks.map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col gap-0.5 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
              <span className="text-sm font-medium text-white">{item.label}</span>
              <span className="text-[11px] text-[#666]">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <RegFeed />

      {/* Main nav */}
      <header
        className={clsx(
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled
            ? "border-b border-white/[0.08] bg-black/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="CompliVibe Home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-compliance-green to-cv-blue">
              <Shield className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold tracking-tight text-white">CompliVibe</span>
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.children || item.megaMenu) && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-[#888] hover:text-white transition-colors"
                >
                  {item.label}
                  {(item.children || item.megaMenu) && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                {item.children && !item.megaMenu && activeDropdown === item.label && (
                  <DropdownMenu items={item.children} />
                )}
                {item.megaMenu && activeDropdown === item.label && (
                  <SolutionsMegaMenu />
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link
              href="/contact"
              className="text-sm text-[#888] hover:text-white transition-colors px-3 py-1.5"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-sm text-[#888] hover:text-white transition-colors px-3 py-1.5"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-8 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-black hover:bg-[#ededed] transition-colors"
            >
              Start Free →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto text-[#888] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/[0.08] bg-black/95 backdrop-blur-xl">
            <div className="flex flex-col px-6 py-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2.5 text-sm text-[#888] hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-2">
                <Link
                  href="/login"
                  className="py-2.5 text-sm text-[#888] hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="flex h-10 items-center justify-center rounded-full bg-white text-sm font-medium text-black hover:bg-[#ededed] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Start Free →
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

