"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  Building2,
  Car,
  ChevronDown,
  ClipboardList,
  Cloud,
  Compass,
  CreditCard,
  DollarSign,
  Eye,
  FileCheck,
  FileText,
  Flag,
  Github,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Layers,
  Link2,
  Lock,
  MapPin,
  Network,
  Plane,
  PlayCircle,
  Rocket,
  Scale,
  Server,
  Shield,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
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

type NavLinkItem = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type NavTab = {
  name: string;
  links: NavLinkItem[];
};

type DropdownName = "Platform" | "Solutions" | "Resources" | "Frameworks";

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
        name: "Governance",
        links: [
          { name: "Governance OS Engine", description: "Central operating layer for AI governance controls.", href: "/platform", icon: Shield },
          { name: "Dual Obligation Engine", description: "Maps overlapping duties across frameworks automatically.", href: "/platform", icon: GitMerge },
          { name: "FRIA+DPIA Fusion", description: "Unified risk assessments for AI and privacy obligations.", href: "/platform", icon: Layers },
          { name: "Hash-Chained Audit Trail", description: "Tamper-evident lineage for every policy and action.", href: "/platform", icon: Link2 },
        ],
      },
      {
        name: "Automation",
        links: [
          { name: "Auto-Evidence Agents", description: "Continuously collect and organize audit-ready evidence.", href: "/platform", icon: Bot },
          { name: "CI/CD Compliance Gate", description: "Stops non-compliant releases before they go live.", href: "/platform", icon: GitPullRequest },
          { name: "GitHub Integration", description: "Connect policy checks directly into engineering workflows.", href: "/platform", icon: Github },
          { name: "48-Hour Regulatory Engine", description: "Pushes major regulation deltas in near real time.", href: "/platform", icon: Zap },
        ],
      },
      {
        name: "Monitoring",
        links: [
          { name: "Live Model Monitor", description: "Track model risk posture and control health in production.", href: "/platform", icon: Activity },
          { name: "LLM Vendor Watch", description: "Monitor third-party model risk and policy changes.", href: "/platform", icon: Eye },
          { name: "Agent-Aware Governance", description: "Govern autonomous agents with policy-aware guardrails.", href: "/platform", icon: Network },
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
        name: "By Size",
        links: [
          { name: "Startup", description: "Fast compliance setup for lean, shipping-first teams.", href: "/solutions/startup", icon: Rocket },
          { name: "Mid-Market", description: "Scale governance without adding process drag.", href: "/solutions/mid-market", icon: Building2 },
          { name: "Enterprise", description: "Coordinate controls across functions and geographies.", href: "/solutions/enterprise", icon: Landmark },
          { name: "IT Teams", description: "Embed controls into delivery and infrastructure pipelines.", href: "/solutions/it-teams", icon: Server },
          { name: "CISO", description: "Unified AI risk visibility and accountability reporting.", href: "/solutions/ciso", icon: Lock },
          { name: "GRC", description: "Operationalize policy into repeatable workflows.", href: "/solutions/grc", icon: ClipboardList },
        ],
      },
      {
        name: "By Industry",
        links: [
          { name: "Healthcare", description: "Clinical AI safeguards with privacy-by-design controls.", href: "/solutions/healthcare", icon: Heart },
          { name: "Fintech", description: "Regulated AI oversight for high-trust financial use cases.", href: "/solutions/fintech", icon: TrendingUp },
          { name: "SaaS", description: "Ship globally while staying continuously audit-ready.", href: "/solutions/saas", icon: Cloud },
          { name: "Govt", description: "Public-sector governance for accountable AI deployment.", href: "/solutions/govt", icon: Flag },
          { name: "Travel", description: "Cross-border data and AI risk controls for mobility platforms.", href: "/solutions/travel", icon: Plane },
        ],
      },
      {
        name: "Onboarding Packs",
        links: [
          { name: "EU Export Pack", description: "Accelerate EU market entry with ready control bundles.", href: "/solutions/eu-export", icon: Globe },
          { name: "India-First Pack", description: "DPDP-first operating posture for India launches.", href: "/solutions/india-first", icon: MapPin },
          { name: "US SaaS Pack", description: "SOC 2-oriented governance for US SaaS growth.", href: "/solutions/us-saas", icon: DollarSign },
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
          { name: "Compliance Compass", description: "Practical guides for modern AI governance teams.", href: "/resources", icon: Compass },
          { name: "Ebooks", description: "Deep-dive books across major compliance frameworks.", href: "/resources", icon: BookOpen },
          { name: "Training & Events", description: "Workshops and live sessions with policy operators.", href: "/resources", icon: GraduationCap },
          { name: "Trust Week", description: "A focused series on transparency and assurance practices.", href: "/resources", icon: BadgeCheck },
        ],
      },
      {
        name: "Watch",
        links: [{ name: "Demo Videos", description: "Product demos and implementation walkthroughs.", href: "/resources", icon: PlayCircle }],
      },
      {
        name: "Read",
        links: [
          { name: "Customer Stories", description: "How teams ship safely with governance in place.", href: "/customer-stories", icon: Users },
          { name: "Blog", description: "Commentary and explainers on evolving AI regulations.", href: "/blog", icon: FileText },
          { name: "Changelog", description: "Latest feature releases and product improvements.", href: "/changelog", icon: GitCommit },
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
        name: "AI & Privacy",
        links: [
          { name: "EU AI Act", description: "Coverage for high-risk AI obligations and controls.", href: "/frameworks/eu-ai-act", icon: Brain },
          { name: "ISO 42001", description: "AI management system alignment and readiness.", href: "/frameworks/iso-42001", icon: Shield },
          { name: "GDPR", description: "Privacy governance mapped to AI data workflows.", href: "/frameworks/gdpr", icon: Lock },
          { name: "DPDP", description: "India privacy compliance mapped to product operations.", href: "/frameworks/dpdp", icon: Scale },
        ],
      },
      {
        name: "Security",
        links: [
          { name: "SOC2", description: "Trust service controls aligned to AI delivery.", href: "/frameworks/soc2", icon: BadgeCheck },
          { name: "ISO 27001", description: "ISMS controls for secure AI lifecycle management.", href: "/frameworks/iso27001", icon: ShieldCheck },
          { name: "ISO 27017", description: "Cloud security controls for hosted AI systems.", href: "/frameworks/iso27017", icon: Cloud },
          { name: "CSA STAR", description: "Cloud assurance mappings for vendor trust posture.", href: "/frameworks/csa-star", icon: Star },
          { name: "TISAX", description: "Security and trust controls for automotive ecosystems.", href: "/frameworks/tisax", icon: Car },
        ],
      },
      {
        name: "Industry",
        links: [
          { name: "HIPAA", description: "Healthcare privacy and security control alignment.", href: "/frameworks/hipaa", icon: Heart },
          { name: "FCRA", description: "Fair-credit obligations embedded in AI decisioning.", href: "/frameworks/fcra", icon: FileCheck },
          { name: "RBI SAR", description: "Banking supervisory expectations for AI governance.", href: "/frameworks/rbi-sar", icon: Landmark },
          { name: "PCI-DSS", description: "Payment-data security controls for AI-enabled flows.", href: "/frameworks/pci-dss", icon: CreditCard },
          { name: "FedRAMP", description: "US public-sector cloud authorization alignment.", href: "/frameworks/fedramp", icon: Flag },
          { name: "PIPEDA", description: "Canadian privacy obligations integrated with controls.", href: "/frameworks/pipeda", icon: Globe },
          { name: "ISO 9001", description: "Quality management rigor for AI-enabled delivery.", href: "/frameworks/iso9001", icon: Award },
        ],
      },
    ],
  },
];

const mobileLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Solutions", href: "/solutions" },
  { name: "Resources", href: "/resources" },
  { name: "Frameworks", href: "/frameworks" },
  { name: "Pricing", href: "/pricing" },
];

function PromoCard() {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const nextValue = Math.max(
      0,
      Math.ceil((new Date("2026-08-02").getTime() - new Date().getTime()) / 86400000),
    );
    setDaysRemaining(nextValue);
  }, []);

  return (
    <div className="w-[260px] shrink-0 p-4">
      <div className="h-full rounded-xl bg-[#0A0A0A] p-4">
        <div className="border-l-2 border-[#0070F3] pl-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]">
            <span className="text-red-500">LIVE</span>
            <span className="text-[#0070F3]">REGULATORY UPDATE</span>
          </div>
          <p className="text-sm font-semibold text-white">
            EU AI Act enforcement in {daysRemaining} days
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            3 new obligations added this week
          </p>
          <Link
            href="/resources"
            className="mt-4 inline-block text-sm font-medium text-[#0070F3] transition hover:opacity-90"
          >
            View Live Feed {"->"}
          </Link>
        </div>
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
            <button
              type="button"
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-neutral-300 transition hover:bg-white/5 hover:text-white"
            >
              <span>{menu.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div
                className={`absolute left-1/2 top-full z-[80] mt-2 -translate-x-1/2 overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0A0A0A] shadow-2xl transition duration-150 ${menu.panelClassName}`}
                onMouseEnter={() => openDropdown(menu.name)}
                onMouseLeave={closeDropdown}
              >
                <div className="flex">
                  <div className="w-44 border-r border-[#1a1a1a] py-3">
                    {menu.tabs.map((tab) => {
                      const isActive = selectedTab.name === tab.name;
                      return (
                        <button
                          key={`${menu.name}-${tab.name}`}
                          type="button"
                          onMouseEnter={() => setActiveTab(menu.name, tab.name)}
                          className={`w-full border-l-2 px-4 py-2.5 text-left text-sm transition ${
                            isActive
                              ? "border-[#0070F3] bg-white/5 text-white"
                              : "border-transparent text-neutral-400 hover:bg-white/5 hover:text-white"
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
                          className="rounded-lg p-3 transition hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0070F3]" />
                            <div>
                              <p className="text-sm font-semibold text-white">{item.name}</p>
                              <p className="mt-1 text-xs leading-5 text-neutral-400">
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
              </div>
            )}
          </div>
        );
      })}

      <Link
        href="/pricing"
        className="rounded-full px-3 py-2 text-sm font-semibold text-neutral-300 transition hover:bg-white/5 hover:text-white"
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
    Platform: "Governance",
    Solutions: "By Size",
    Resources: "Learn",
    Frameworks: "AI & Privacy",
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
          <NavbarButton href="/login" variant="secondary" className="text-white">
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
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-300"
            >
              <span className="block text-sm font-medium">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full text-white"
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
