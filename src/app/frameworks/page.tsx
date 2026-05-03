"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Brain,
  Shield,
  Lock,
  Scale,
  BadgeCheck,
  ShieldCheck,
  Cloud,
  Star,
  Car,
  Heart,
  FileCheck,
  Landmark,
  CreditCard,
  Flag,
  Globe,
  Award,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { HeroParallax } from "@/components/ui/hero-parallax";

const FRAMEWORKS = [
  {
    name: "EU AI Act",
    slug: "eu-ai-act",
    category: "AI & Privacy",
    desc: "High-risk AI system requirements, conformity assessments, and CE marking readiness for EU market entry.",
    color: "#0070F3",
    Icon: Brain,
    badge: "EUAI",
    featured: true,
  },
  {
    name: "DPDP Act",
    slug: "dpdp",
    category: "AI & Privacy",
    desc: "India's Digital Personal Data Protection Act — consent management, data fiduciary obligations, and cross-border transfer rules.",
    color: "#0070F3",
    Icon: Scale,
    badge: "DPDP",
    featured: true,
  },
  {
    name: "SOC 2",
    slug: "soc2",
    category: "Security",
    desc: "Trust Service Criteria across Security, Availability, Confidentiality — the US enterprise sales unlock.",
    color: "#10B981",
    Icon: BadgeCheck,
    badge: "SOC2",
    featured: true,
  },
  {
    name: "ISO 27001",
    slug: "iso-27001",
    category: "Security",
    desc: "Information security management system certification baseline.",
    color: "#10B981",
    Icon: ShieldCheck,
    badge: "ISO27001",
  },
  {
    name: "ISO 42001",
    slug: "iso-42001",
    category: "AI & Privacy",
    desc: "AI management system certification for responsible deployment.",
    color: "#0070F3",
    Icon: Shield,
    badge: "ISO42001",
  },
  {
    name: "ISO 27017",
    slug: "iso-27017",
    category: "Security",
    desc: "Cloud security controls and implementation guidance.",
    color: "#10B981",
    Icon: Cloud,
    badge: "ISO27017",
  },
  {
    name: "GDPR",
    slug: "gdpr",
    category: "AI & Privacy",
    desc: "EU data protection and privacy framework.",
    color: "#0070F3",
    Icon: Lock,
    badge: "GDPR",
  },
  {
    name: "HIPAA",
    slug: "hipaa",
    category: "Industry",
    desc: "US healthcare data privacy and security standards.",
    color: "#F59E0B",
    Icon: Heart,
    badge: "HIPAA",
  },
  {
    name: "PCI-DSS",
    slug: "pci-dss",
    category: "Industry",
    desc: "Payment card industry data security standard.",
    color: "#F59E0B",
    Icon: CreditCard,
    badge: "PCI-DSS",
  },
  {
    name: "RBI SAR",
    slug: "rbi-sar",
    category: "Industry",
    desc: "Reserve Bank of India security audit requirements.",
    color: "#F59E0B",
    Icon: Landmark,
    badge: "RBISAR",
  },
  {
    name: "TISAX",
    slug: "tisax",
    category: "Industry",
    desc: "Trusted Information Security Assessment Exchange.",
    color: "#F59E0B",
    Icon: Car,
    badge: "TISAX",
  },
  {
    name: "PIPEDA",
    slug: "pipeda",
    category: "AI & Privacy",
    desc: "Canadian personal information protection law.",
    color: "#0070F3",
    Icon: Globe,
    badge: "PIPEDA",
  },
  {
    name: "FedRAMP",
    slug: "fedramp",
    category: "Security",
    desc: "US federal cloud authorization program.",
    color: "#10B981",
    Icon: Flag,
    badge: "FedRAMP",
  },
  {
    name: "FCRA",
    slug: "fcra",
    category: "AI & Privacy",
    desc: "Fair Credit Reporting Act compliance.",
    color: "#0070F3",
    Icon: FileCheck,
    badge: "FCRA",
  },
  {
    name: "CSA STAR",
    slug: "csa-star",
    category: "Security",
    desc: "Cloud Security Alliance assurance framework.",
    color: "#10B981",
    Icon: Star,
    badge: "CSA",
  },
  {
    name: "ISO 9001",
    slug: "iso9001",
    category: "Industry",
    desc: "Quality management system standards for consistent delivery.",
    color: "#F59E0B",
    Icon: Award,
    badge: "ISO9001",
  },
];

const GRID_FRAMEWORKS = FRAMEWORKS.filter((f) => !f.featured);
const FEATURED = FRAMEWORKS.filter((f) => f.featured);

/** Hero parallax expects 15 cards (3×5); use first 15 frameworks — text cards, no thumbnails. */
const FRAMEWORK_PARALLAX_PRODUCTS = FRAMEWORKS.slice(0, 15).map((fw) => ({
  title: fw.name,
  link: `/frameworks/${fw.slug}`,
  category: fw.category,
  description: fw.desc,
}));

const categoryColors = {
  "AI & Privacy": { primary: "#0070F3", accent: "#60a5fa", ring: "ring-blue-500/20" },
  Security: { primary: "#10B981", accent: "#34d399", ring: "ring-emerald-500/20" },
  Industry: { primary: "#F59E0B", accent: "#fbbf24", ring: "ring-amber-500/20" },
};

function CountdownStrip() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("2026-08-02").getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-sm tabular-nums">
      <span className="text-white">{String(time.days).padStart(2, "0")}d</span>
      <span className="text-white/25">:</span>
      <span className="text-white">{String(time.hours).padStart(2, "0")}h</span>
      <span className="text-white/25">:</span>
      <span className="text-white">{String(time.mins).padStart(2, "0")}m</span>
      <span className="text-white/25">:</span>
      <span className="text-[#0070F3]">{String(time.secs).padStart(2, "0")}s</span>
    </div>
  );
}

function FeaturedFooter({ slug }: { slug: string }) {
  if (slug === "eu-ai-act") {
    return (
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
          Full enforcement countdown
        </p>
        <CountdownStrip />
      </div>
    );
  }
  if (slug === "dpdp") {
    return (
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
          Max penalty per violation
        </p>
        <p className="text-2xl font-semibold tracking-tight text-emerald-400">₹250 Cr</p>
      </div>
    );
  }
  if (slug === "soc2") {
    return (
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
          Enterprise procurement
        </p>
        <p className="text-2xl font-semibold tracking-tight text-emerald-400">94%</p>
        <p className="mt-1 text-xs text-white/40">of Fortune 500 gate on SOC 2</p>
      </div>
    );
  }
  return null;
}

export default function FrameworksPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const reduceMotion = useReducedMotion();

  const filtered = GRID_FRAMEWORKS.filter(
    (fw) =>
      (activeFilter === "All" || fw.category === activeFilter) &&
      fw.name.toLowerCase().includes(search.toLowerCase()),
  );

  /** Keep hero readable if motion fails or is reduced — avoid opacity-0 flash. */
  const fade = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 8 };

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main>
        <section className="relative overflow-x-hidden border-b border-white/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% -30%, rgba(0,112,243,0.2), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(121,40,202,0.08), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative z-[1]">
            <HeroParallax
              className="pt-0"
              products={FRAMEWORK_PARALLAX_PRODUCTS}
              header={
                <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-24 md:pb-12 md:pt-32 lg:pt-36">
                  <motion.p
                    initial={fade}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/55"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    {FRAMEWORKS.length} frameworks · 2 jurisdictions · 48hr updates
                  </motion.p>

                  <motion.h1
                    initial={fade}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem] md:leading-[1.08]"
                  >
                    Compliance coverage
                    <span className="text-white/40">, </span>
                    <span className="text-gradient-blue">without the sprawl.</span>
                  </motion.h1>

                  <motion.p
                    initial={fade}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg"
                  >
                    From EU AI Act to DPDP and SOC 2 — one obligation graph, shared evidence, and regulation
                    deltas in near real time.
                  </motion.p>

                  <motion.div
                    initial={fade}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 flex flex-wrap items-center gap-3"
                  >
                    <Link
                      href="/book-demo"
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                    >
                      Book a demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/score"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-transparent px-6 text-sm font-semibold text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                    >
                      Check readiness
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </Link>
                  </motion.div>
                </div>
              }
            />
          </div>
        </section>

        <section className="border-b border-white/[0.06] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">Flagship</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Where teams start first
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-white/45">
                Deep mappings for the regimes that block deals and audits — with live obligation feeds behind
                the scenes.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {FEATURED.map((fw, i) => {
                const colors = categoryColors[fw.category as keyof typeof categoryColors];
                return (
                  <motion.article
                    key={fw.slug}
                    initial={fade}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
                    className={cn(
                      "group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]",
                      colors.ring,
                    )}
                  >
                    <div
                      className="mb-5 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        background: `${colors.primary}18`,
                        color: colors.accent,
                      }}
                    >
                      {fw.category}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{fw.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/45">{fw.desc}</p>
                    <FeaturedFooter slug={fw.slug} />
                    <Link
                      href={`/frameworks/${fw.slug}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors group-hover:text-white"
                    >
                      View framework
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-10 md:px-12 md:py-14">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">
                  Dual jurisdiction
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                  India ↔ EU ↔ US in one obligation graph
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/45">
                  Map overlaps across DPDP, GDPR, and SOC 2 so controls and evidence are reused — not rebuilt
                  for every audit.
                </p>
                <Link
                  href="/platform"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0070F3] hover:text-[#4d9fff]"
                >
                  How the platform maps it
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="flex flex-wrap justify-center gap-2 md:max-w-sm md:justify-end">
                  {["GDPR", "DPDP", "SOC 2", "EU AI Act", "ISO 27001"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">Directory</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                All frameworks
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/45">
                Search and filter every standard CompliVibe covers. Each page outlines scope, obligations, and
                how we help.
              </p>
            </div>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="search"
                  placeholder="Search frameworks…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-full border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#0070F3]/50 focus:ring-2 focus:ring-[#0070F3]/20"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "AI & Privacy", "Security", "Industry"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-semibold transition-all",
                      activeFilter === cat
                        ? "bg-white text-black"
                        : "border border-white/10 bg-transparent text-white/45 hover:border-white/20 hover:text-white/70",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((fw) => {
                  const colors = categoryColors[fw.category as keyof typeof categoryColors];
                  const Icon = fw.Icon;
                  return (
                    <motion.div
                      key={fw.slug}
                      layout
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/frameworks/${fw.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.035]"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
                              style={{
                                background: `${colors.primary}14`,
                                boxShadow: `0 0 0 1px ${colors.primary}33 inset`,
                              }}
                            >
                              <Icon className="h-[18px] w-[18px]" style={{ color: colors.primary }} />
                            </div>
                            <div>
                              <h3 className="font-semibold tracking-tight text-white">{fw.name}</h3>
                              <span
                                className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wider"
                                style={{ color: colors.accent }}
                              >
                                {fw.category}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-white/50" />
                        </div>
                        <p className="mb-6 flex-1 text-sm leading-relaxed text-white/40">{fw.desc}</p>
                        <span className="text-xs font-semibold text-white/50 group-hover:text-white/80">
                          Explore →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <p className="py-24 text-center text-sm text-white/35">No frameworks match your search.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
