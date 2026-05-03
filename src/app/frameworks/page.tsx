"use client";

import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import {
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
} from "lucide-react";

type Category = "AI & Privacy" | "Security" | "Industry";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Framework = {
  name: string;
  slug: string;
  category: Category;
  desc: string;
  color: string;
  Icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const frameworks: Framework[] = [
  { name: "EU AI Act", slug: "eu-ai-act", category: "AI & Privacy", desc: "Full Annex IV risk classification engine", color: "#0070F3", Icon: Brain },
  { name: "ISO 42001", slug: "iso-42001", category: "AI & Privacy", desc: "AI management system certification", color: "#0070F3", Icon: Shield },
  { name: "GDPR", slug: "gdpr", category: "AI & Privacy", desc: "EU data protection by design", color: "#0070F3", Icon: Lock },
  { name: "DPDP", slug: "dpdp", category: "AI & Privacy", desc: "India's digital personal data law", color: "#0070F3", Icon: Scale },
  { name: "SOC 2", slug: "soc2", category: "Security", desc: "Trust service criteria automation", color: "#10B981", Icon: BadgeCheck },
  { name: "ISO 27001", slug: "iso27001", category: "Security", desc: "Information security management", color: "#10B981", Icon: ShieldCheck },
  { name: "ISO 27017", slug: "iso27017", category: "Security", desc: "Cloud security controls", color: "#10B981", Icon: Cloud },
  { name: "CSA STAR", slug: "csa-star", category: "Security", desc: "Cloud assurance framework", color: "#10B981", Icon: Star },
  { name: "TISAX", slug: "tisax", category: "Security", desc: "Automotive data security", color: "#10B981", Icon: Car },
  { name: "HIPAA", slug: "hipaa", category: "Industry", desc: "Healthcare data protection", color: "#F59E0B", Icon: Heart },
  { name: "FCRA", slug: "fcra", category: "Industry", desc: "Credit reporting compliance", color: "#F59E0B", Icon: FileCheck },
  { name: "RBI SAR", slug: "rbi-sar", category: "Industry", desc: "Reserve Bank security audit", color: "#F59E0B", Icon: Landmark },
  { name: "PCI-DSS", slug: "pci-dss", category: "Industry", desc: "Payment card data security", color: "#F59E0B", Icon: CreditCard },
  { name: "FedRAMP", slug: "fedramp", category: "Industry", desc: "US federal cloud authorization", color: "#F59E0B", Icon: Flag },
  { name: "PIPEDA", slug: "pipeda", category: "Industry", desc: "Canadian privacy law", color: "#F59E0B", Icon: Globe },
  { name: "ISO 9001", slug: "iso9001", category: "Industry", desc: "Quality management system", color: "#F59E0B", Icon: Award },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const filters: Array<"All" | Category> = ["All", "AI & Privacy", "Security", "Industry"];

export default function FrameworksPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const heroScrollRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start start", "end end"],
  });

  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55, 0.75, 1], [0, 0.1, 0.25, 0.55, 0.82, 1]),
    useTransform(scrollYProgress, [0, 0.16, 0.38, 0.58, 0.78, 1], [0, 0.06, 0.2, 0.48, 0.76, 1]),
    useTransform(scrollYProgress, [0, 0.18, 0.4, 0.6, 0.8, 1], [0, 0.08, 0.22, 0.5, 0.79, 1]),
    useTransform(scrollYProgress, [0, 0.2, 0.42, 0.65, 0.82, 1], [0, 0.04, 0.18, 0.44, 0.7, 1]),
    useTransform(scrollYProgress, [0, 0.22, 0.45, 0.68, 0.85, 1], [0, 0.05, 0.16, 0.4, 0.68, 1]),
  ];

  const filtered = frameworks.filter((fw) => {
    const categoryMatch = activeFilter === "All" || fw.category === activeFilter;
    const searchMatch = fw.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main className="relative overflow-hidden bg-black">
        {/* Hero section with Gemini Effect */}
        <section ref={heroScrollRef} className="relative h-[400vh] bg-black">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,112,243,0.14),transparent_36%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_28%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
            <GoogleGeminiEffect
              pathLengths={pathLengths}
              title="Every Framework. One Platform."
              description="14 compliance frameworks converging into a single source of truth."
            />
          </div>
        </section>

        {/* Stats strip - tight and visible, no gaps */}
        <section className="border-y border-[#1a1a1a] bg-[#0A0A0A] py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-[#1a1a1a] px-6">
            {[
              { value: "16", label: "FRAMEWORKS" },
              { value: "2", label: "JURISDICTIONS" },
              { value: "48hr", label: "UPDATE VELOCITY" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-6">
                <span className="text-5xl font-bold text-white">{value}</span>
                <span className="text-xs text-neutral-500 tracking-widest mt-2">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Framework grid section - flows directly into next section */}
        <section className="bg-black py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
              <input
                type="text"
                placeholder="Search frameworks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 w-full sm:w-72 focus:outline-none focus:border-[#0070F3]"
              />
              <div className="flex gap-2">
                {filters.map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)}
                    className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                      activeFilter === f
                        ? "bg-[#0070F3] text-white"
                        : "bg-[#1a1a1a] text-neutral-400 hover:text-white"
                    )}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {filtered.map((fw, i) => (
                  <motion.div key={fw.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.04 }}>
                    <Link href={`/frameworks/${fw.slug}`}
                      className="group block bg-[#0A0A0A] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#0070F3] hover:shadow-[0_0_20px_rgba(0,112,243,0.12)] transition-all duration-200">
                      {/* Icon circle */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${fw.color}15`, border: `1px solid ${fw.color}30` }}>
                        <fw.Icon size={24} style={{ color: fw.color }} />
                      </div>
                      {/* Badge */}
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium mb-3 inline-block"
                        style={{ backgroundColor: `${fw.color}15`, color: fw.color }}>
                        {fw.category}
                      </span>
                      <h3 className="text-white font-semibold text-base mb-1">{fw.name}</h3>
                      <p className="text-neutral-500 text-xs leading-relaxed">{fw.desc}</p>
                      <span className="text-[#0070F3] text-xs mt-3 inline-block group-hover:underline">Learn More →</span>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Dual jurisdiction banner - no gap */}
        <section className="bg-[#0A0A0A] border-y border-[#1a1a1a] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#0070F3]/10 border border-[#0070F3]/30 rounded-full px-4 py-1 text-[#0070F3] text-xs font-semibold mb-6 uppercase tracking-widest">
              Unique Moat
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The only platform that cross-maps<br />
              <span className="text-[#0070F3]">EU AI Act ↔ DPDP</span> obligations automatically
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              No other compliance tool has this. Your EU deals stop being blocked.
            </p>
            <Link href="/book-demo"
              className="inline-block bg-[#0070F3] text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
              Book Demo →
            </Link>
          </div>
        </section>

        {/* Bottom CTA - no gap */}
        <section className="bg-black py-20 px-6 text-center">
          <p className="text-neutral-500 text-sm mb-3">Don&apos;t see your framework?</p>
          <button className="border border-[#1a1a1a] text-neutral-300 px-6 py-2 rounded-full text-sm hover:border-[#0070F3] hover:text-white transition-all mb-12">
            Request a Framework
          </button>
          <div className="border-t border-[#1a1a1a] pt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Start with any framework in under 48 hours</h3>
            <Link href="/book-demo"
              className="inline-block bg-[#0070F3] text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
              Book Demo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
