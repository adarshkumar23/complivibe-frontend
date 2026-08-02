"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  ChevronDown,
  Cloud,
  Compass,
  Database,
  Eye,
  FileCheck,
  FileText,
  Gauge,
  GitCommit,
  Heart,
  HelpCircle,
  Landmark,
  Layers,
  LayoutDashboard,
  Lock,
  Map,
  Network,
  Newspaper,
  Rocket,
  ScanLine,
  Scale,
  Shield,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarButton,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

type Accent = "blue" | "cyan" | "green" | "purple";

const accentClass: Record<Accent, string> = {
  blue: "text-[#2563eb]",
  cyan: "text-[#06b6d4]",
  green: "text-[#10b981]",
  purple: "text-[#7c3aed]",
};

type NavLinkItem = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent?: Accent;
};

type NavTab = {
  name: string;
  links: NavLinkItem[];
};

type DropdownName =
  | "Platform"
  | "Solutions"
  | "Trust Layers"
  | "Frameworks"
  | "Resources";

type MegaMenu = {
  name: DropdownName;
  href: string;
  panelClassName: "min-w-[720px]" | "min-w-[640px]";
  tabs: NavTab[];
};

const megaMenus: MegaMenu[] = [
  {
    name: "Platform",
    href: "/platform",
    panelClassName: "min-w-[720px]",
    tabs: [
      {
        name: "Core",
        links: [
          { name: "AI Trust Command Center", description: "Unified command center for AI systems, risks, evidence, and trust posture.", href: "/platform", icon: LayoutDashboard, accent: "blue" },
          { name: "AI Governance OS", description: "Govern AI systems, models, vendors, owners, policies, and approvals.", href: "/platform", icon: Shield, accent: "blue" },
          { name: "Compliance Automation", description: "Map obligations, collect evidence, and generate audit-ready documentation.", href: "/platform", icon: Workflow, accent: "blue" },
        ],
      },
      {
        name: "Data & Evidence",
        links: [
          { name: "Data Observability", description: "Monitor AI signals, drift indicators, incidents, usage, and production health.", href: "/platform", icon: Activity, accent: "cyan" },
          { name: "Evidence Vault", description: "Central repository for policies, approvals, logs, controls, and audit evidence.", href: "/platform", icon: Database, accent: "green" },
        ],
      },
      {
        name: "Trust",
        links: [
          { name: "AI Trust Graph", description: "Connect systems, models, datasets, risks, controls, evidence, and reports.", href: "/platform", icon: Network, accent: "purple" },
          { name: "Trust Center", description: "Publish live trust posture for customers, auditors, and enterprise buyers.", href: "/trust", icon: BadgeCheck, accent: "green" },
        ],
      },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions",
    panelClassName: "min-w-[720px]",
    tabs: [
      {
        name: "By Stage",
        links: [
          { name: "AI-first startups", description: "Ship fast with governance and trust built in from day one.", href: "/solutions/startup", icon: Rocket, accent: "blue" },
          { name: "SaaS companies", description: "Stay continuously audit-ready while you scale globally.", href: "/solutions/saas", icon: Cloud, accent: "blue" },
          { name: "Enterprise AI teams", description: "Coordinate AI governance across functions and geographies.", href: "/solutions/enterprise", icon: Building2, accent: "blue" },
        ],
      },
      {
        name: "By Industry",
        links: [
          { name: "Fintech", description: "High-trust AI oversight for regulated financial products.", href: "/solutions/fintech", icon: TrendingUp, accent: "cyan" },
          { name: "Healthcare AI", description: "Privacy-by-design controls for clinical and health AI.", href: "/solutions/healthcare", icon: Heart, accent: "green" },
        ],
      },
      {
        name: "By Team",
        links: [
          { name: "GRC & security teams", description: "Operationalize policy, evidence, and risk in one place.", href: "/solutions/grc", icon: ShieldCheck, accent: "purple" },
        ],
      },
    ],
  },
  {
    name: "Trust Layers",
    href: "/platform",
    panelClassName: "min-w-[720px]",
    tabs: [
      {
        name: "Inventory & Risk",
        links: [
          { name: "AI System Inventory", description: "Track every AI system, model, dataset, vendor, owner, and use case.", href: "/platform", icon: Layers, accent: "blue" },
          { name: "Model & Vendor Risk", description: "Govern third-party models, AI vendors, APIs, and risk exposure.", href: "/platform", icon: Eye, accent: "purple" },
        ],
      },
      {
        name: "Evidence & Mapping",
        links: [
          { name: "Evidence Automation", description: "Collect proof continuously from tools, workflows, and integrations.", href: "/platform", icon: FileCheck, accent: "green" },
          { name: "Regulatory Mapping", description: "Map AI and data obligations across global frameworks.", href: "/platform", icon: Map, accent: "blue" },
        ],
      },
      {
        name: "Signals & Reports",
        links: [
          { name: "Observability Signals", description: "Track usage, drift, incidents, latency, and production AI health.", href: "/platform", icon: Activity, accent: "cyan" },
          { name: "Audit & Trust Reports", description: "Generate board-ready, auditor-ready, and customer-ready trust reports.", href: "/platform", icon: FileText, accent: "blue" },
        ],
      },
    ],
  },
  {
    name: "Frameworks",
    href: "/frameworks",
    panelClassName: "min-w-[640px]",
    tabs: [
      {
        name: "AI Governance",
        links: [
          { name: "EU AI Act", description: "Coverage for high-risk AI obligations and controls.", href: "/frameworks/eu-ai-act", icon: Brain, accent: "blue" },
          { name: "ISO 42001", description: "AI management system alignment and readiness.", href: "/frameworks/iso-42001", icon: Shield, accent: "blue" },
          { name: "NIST AI RMF", description: "Risk-based AI governance aligned to the NIST framework.", href: "/frameworks", icon: ShieldCheck, accent: "blue" },
          { name: "Colorado AI Act", description: "Consumer AI protections mapped to your systems.", href: "/frameworks", icon: Landmark, accent: "blue" },
        ],
      },
      {
        name: "Privacy",
        links: [
          { name: "India DPDP", description: "India data protection mapped to product operations.", href: "/frameworks/dpdp", icon: Scale, accent: "cyan" },
          { name: "GDPR", description: "Privacy governance mapped to AI data workflows.", href: "/frameworks/gdpr", icon: Lock, accent: "cyan" },
        ],
      },
      {
        name: "Security",
        links: [
          { name: "SOC 2", description: "Trust service controls aligned to AI delivery.", href: "/frameworks/soc2", icon: BadgeCheck, accent: "green" },
          { name: "ISO 27001", description: "ISMS controls for a secure AI lifecycle.", href: "/frameworks/iso27001", icon: ShieldCheck, accent: "green" },
        ],
      },
    ],
  },
  {
    name: "Resources",
    href: "/resources",
    panelClassName: "min-w-[640px]",
    tabs: [
      {
        name: "Learn",
        links: [
          { name: "Docs", description: "Product documentation and implementation references.", href: "/resources", icon: BookOpen, accent: "blue" },
          { name: "Guides", description: "Practical playbooks for AI governance teams.", href: "/resources", icon: Compass, accent: "blue" },
          { name: "Blog", description: "Commentary and explainers on AI trust and governance.", href: "/blog", icon: FileText, accent: "blue" },
          { name: "Articles", description: "In-depth writing on controls, evidence, and audits.", href: "/articles", icon: Newspaper, accent: "blue" },
        ],
      },
      {
        name: "Discover",
        links: [
          { name: "Customer Stories", description: "How modern teams ship AI with trust in place.", href: "/customer-stories", icon: Users, accent: "green" },
          { name: "Trust Score", description: "Benchmark your AI trust and readiness posture.", href: "/score", icon: Gauge, accent: "cyan" },
          { name: "Changelog", description: "Latest features and product improvements.", href: "/changelog", icon: GitCommit, accent: "blue" },
          { name: "FAQ", description: "Straight answers on data, security, and frameworks.", href: "/faq", icon: HelpCircle, accent: "cyan" },
        ],
      },
    ],
  },
];

const mobileLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Solutions", href: "/solutions" },
  { name: "Trust Layers", href: "/platform" },
  { name: "Frameworks", href: "/frameworks" },
  { name: "Resources", href: "/resources" },
  { name: "Blog", href: "/blog" },
  { name: "Articles", href: "/articles" },
  { name: "FAQ", href: "/faq" },
  { name: "Pricing", href: "/pricing" },
];

function PromoCard() {
  return (
    <div className="w-[240px] shrink-0 p-4 border-l border-slate-900/[0.06] dark:border-white/[0.06]">
      <div className="liquid-panel relative overflow-hidden p-4">
        {/* Soft blue/cyan glow */}
        <div
          className="absolute -top-6 -right-6 h-24 w-24 pointer-events-none opacity-70"
          style={{
            background:
              "radial-gradient(circle at center, rgba(6,182,212,0.18), transparent 70%)",
          }}
        />

        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/10 px-2 py-0.5">
          <ScanLine className="h-3 w-3 text-[#2563eb]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#2563eb]">
            Free AI Trust Scan
          </span>
        </div>

        <div className="mb-1 font-mono text-[28px] font-bold leading-none text-slate-900 dark:text-white">
          7 min
        </div>

        <p className="mb-3 text-[11px] leading-tight text-slate-500 dark:text-neutral-400">
          Map your AI systems, governance gaps, and evidence readiness.
        </p>

        <Link
          href="/score"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8] dark:hover:text-white"
        >
          Start scan <ArrowRight className="h-[11px] w-[11px]" />
        </Link>
      </div>
    </div>
  );
}

type MegaNavProps = {
  activeDropdown: string | null;
  activeTabs: Record<DropdownName, string>;
  openDropdown: (name: DropdownName) => void;
  closeDropdown: () => void;
  setActiveTab: (name: DropdownName, tabName: string) => void;
};

function MegaNav({
  activeDropdown,
  activeTabs,
  openDropdown,
  closeDropdown,
  setActiveTab,
}: MegaNavProps) {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {megaMenus.map((menu) => {
        const selectedTabName = activeTabs[menu.name] ?? menu.tabs[0].name;
        const selectedTab =
          menu.tabs.find((tab) => tab.name === selectedTabName) ?? menu.tabs[0];
        const isOpen = activeDropdown === menu.name;

        return (
          <div
            key={menu.name}
            className="relative"
            onMouseEnter={() => openDropdown(menu.name)}
            onMouseLeave={closeDropdown}
          >
            <Link
              href={menu.href}
              className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white"
              onMouseEnter={() => openDropdown(menu.name)}
            >
              <span className="whitespace-nowrap">{menu.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </Link>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  }}
                  className={`absolute left-1/2 top-full z-[100] mt-2 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/50 bg-white/85 shadow-[0_24px_60px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-white/10 dark:bg-[#0b0f17]/90 dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ${menu.panelClassName}`}
                  onMouseEnter={() => openDropdown(menu.name)}
                  onMouseLeave={closeDropdown}
                >
                  <div className="flex">
                    <div className="w-44 border-r border-slate-900/[0.06] py-3 dark:border-white/10">
                      {menu.tabs.map((tab) => {
                        const isActive = selectedTab.name === tab.name;
                        return (
                          <button
                            key={`${menu.name}-${tab.name}`}
                            type="button"
                            aria-current={isActive ? "true" : undefined}
                            onMouseEnter={() => setActiveTab(menu.name, tab.name)}
                            onFocus={() => setActiveTab(menu.name, tab.name)}
                            className={`w-full border-l-2 px-4 py-2.5 text-left text-sm font-medium transition ${
                              isActive
                                ? "border-[#2563eb] bg-[#2563eb]/[0.06] text-slate-900 dark:bg-white/5 dark:text-white"
                                : "border-transparent text-slate-500 hover:bg-slate-900/[0.04] hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
                            }`}
                          >
                            {tab.name}
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid flex-1 grid-cols-1 gap-1 p-4">
                      {selectedTab.links.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={`${selectedTab.name}-${item.name}`}
                            href={item.href}
                            className="rounded-xl p-3 transition hover:bg-slate-900/[0.04] dark:hover:bg-white/5"
                            onClick={closeDropdown}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${accentClass[item.accent ?? "blue"]}`} />
                              <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-neutral-400">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <PromoCard />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <Link
        href="/pricing"
        className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white"
      >
        Pricing
      </Link>
    </div>
  );
}

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<DropdownName, string>>({
    Platform: "Core",
    Solutions: "By Stage",
    "Trust Layers": "Inventory & Risk",
    Frameworks: "AI Governance",
    Resources: "Learn",
  });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (name: DropdownName) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(name);
  };

  const closeDropdown = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const setActiveTab = (name: DropdownName, tabName: string) => {
    setActiveTabs((current) => ({
      ...current,
      [name]: tabName,
    }));
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />

        <MegaNav
          activeDropdown={activeDropdown}
          activeTabs={activeTabs}
          openDropdown={openDropdown}
          closeDropdown={closeDropdown}
          setActiveTab={setActiveTab}
        />

        <div className="relative z-20 hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <NavbarButton href="/login" variant="secondary">
            Login
          </NavbarButton>
          <NavbarButton href="/book-demo" variant="primary">
            Book Demo
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {mobileLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-slate-700 transition-colors hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white"
            >
              <span className="block text-sm font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full items-center justify-between border-t border-slate-900/[0.06] pt-4 dark:border-white/10">
            <span className="text-sm font-medium text-slate-500 dark:text-neutral-400">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              href="/book-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Book Demo
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
