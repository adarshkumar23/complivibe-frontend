"use client";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* FRAMEWORK DATA */
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
    name: "ISO 5001",
    slug: "iso-5001",
    category: "Industry",
    desc: "Quality management system standards.",
    color: "#F59E0B",
    Icon: Award,
    badge: "ISO5001",
  },
];

// // const FEATURED = FRAMEWORKS.filter((f) => f.featured).slice(0, 3);
const GRID_FRAMEWORKS = FRAMEWORKS.filter((f) => !f.featured);

const categoryColors = {
  "AI & Privacy": { primary: "#0070F3", accent: "#60a5fa" },
  Security: { primary: "#10B981", accent: "#34d399" },
  Industry: { primary: "#F59E0B", accent: "#fbbf24" },
};

/* COUNTDOWN TIMER */
function CountdownTimer() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("2026-08-02").getTime();
    const update = () => {
      const now = new Date().getTime();
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
    <div className="flex items-center gap-2 font-mono">
      <span className="text-2xl font-bold text-[#0070F3]">
        {String(time.days).padStart(2, "0")}
      </span>
      <span className="text-lg text-neutral-500">:</span>
      <span className="text-2xl font-bold text-[#0070F3]">
        {String(time.hours).padStart(2, "0")}
      </span>
      <span className="text-lg text-neutral-500">:</span>
      <span className="text-2xl font-bold text-[#0070F3]">
        {String(time.mins).padStart(2, "0")}
      </span>
      <span className="text-lg text-neutral-500">:</span>
      <span className="text-2xl font-bold text-[#0070F3]">
        {String(time.secs).padStart(2, "0")}
      </span>
    </div>
  );
}

/* HERO CANVAS */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number }[]
  >([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const frameworks = [
    { name: "EU AI Act", ring: 0, color: "#0070F3" },
    { name: "DPDP", ring: 0, color: "#0070F3" },
    { name: "SOC 2", ring: 0, color: "#10B981" },
    { name: "ISO 27001", ring: 0, color: "#10B981" },
    { name: "GDPR", ring: 0, color: "#0070F3" },
    { name: "ISO 42001", ring: 1, color: "#0070F3" },
    { name: "HIPAA", ring: 1, color: "#F59E0B" },
    { name: "PCI-DSS", ring: 1, color: "#F59E0B" },
    { name: "RBI SAR", ring: 1, color: "#F59E0B" },
    { name: "TISAX", ring: 1, color: "#10B981" },
    { name: "PIPEDA", ring: 1, color: "#0070F3" },
    { name: "ISO 27017", ring: 2, color: "#10B981" },
    { name: "FedRAMP", ring: 2, color: "#10B981" },
    { name: "FCRA", ring: 2, color: "#0070F3" },
    { name: "CSA STAR", ring: 2, color: "#10B981" },
    { name: "ISO 5001", ring: 2, color: "#F59E0B" },
  ];

  const rings = [
    { radius: 130, speed: 0.0006 },
    { radius: 220, speed: -0.0004 },
    { radius: 310, speed: 0.0003 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 45 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    // Unused but kept for reference
    // const hexToRgb = (hex: string) => {
    //   const r = parseInt(hex.slice(1, 3), 16);
    //   const g = parseInt(hex.slice(3, 5), 16);
    //   const b = parseInt(hex.slice(5, 7), 16);
    //   return { r, g, b };
    // };

    const drawBadge = (
      x: number,
      y: number,
      text: string,
      color: string,
    ) => {
      ctx.font = "500 10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const metrics = ctx.measureText(text);
      const w = metrics.width + 24;
      const h = 26;

      ctx.beginPath();
      ctx.roundRect(x - w / 2, y - h / 2, w, h, 5);
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    };

    const draw = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.52;
      const cy = h * 0.5;

      /* PARTICLES */
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Attract to mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = 0.015;
          p.vx = Math.max(-1.5, Math.min(1.5, p.vx + (dx / dist) * force));
          p.vy = Math.max(-1.5, Math.min(1.5, p.vy + (dy / dist) * force));
        }
      });

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.forEach((p2, j) => {
          if (i < j) {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.strokeStyle = `rgba(0,112,243,${((1 - dist / 110) * 0.18).toFixed(3)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = "rgba(0,112,243,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      /* CENTER NODE */
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 66);
      gradient.addColorStop(0, "rgba(0,112,243,0.15)");
      gradient.addColorStop(1, "rgba(0,112,243,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 66, 0, Math.PI * 2);
      ctx.fill();

      [44, 54, 66].forEach((r) => {
        ctx.strokeStyle = `rgba(0,112,243,${((66 - r) / 66) * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = "#0070F3";
      ctx.beginPath();
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "700 15px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CV", cx, cy);

      /* ORBITS */
      rings.forEach((ring, ringIdx) => {
        frameworks
          .filter((fw) => fw.ring === ringIdx)
          .forEach((fw, idx) => {
            const totalInRing = frameworks.filter(
              (f) => f.ring === ringIdx,
            ).length;
            const angle =
              (idx / totalInRing) * Math.PI * 2 +
              frameRef.current * ring.speed;
            const x = cx + Math.cos(angle) * ring.radius;
            const y = cy + Math.sin(angle) * ring.radius;

            // Connector line
            ctx.setLineDash([3, 6]);
            ctx.strokeStyle = `${fw.color}33`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.setLineDash([]);

            drawBadge(x, y, fw.name, fw.color);
          });
      });

      frameRef.current += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    initParticles();
    canvas.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={typeof window !== "undefined" ? window.innerWidth : 800}
      height={600}
      className="h-full w-full"
    />
  );
}

/* VENN DIAGRAM */
function VennDiagram() {
  return (
    <div className="relative h-64 w-64">
      <svg viewBox="0 0 280 220" className="h-full w-full">
        {/* GDPR circle */}
        <circle
          cx="70"
          cy="110"
          r="60"
          fill="#0070F3"
          opacity="0.15"
          className="animate-pulse"
        />
        {/* DPDP circle */}
        <circle
          cx="140"
          cy="110"
          r="60"
          fill="#10B981"
          opacity="0.15"
          className="animate-pulse"
        />
        {/* SOC 2 circle */}
        <circle
          cx="210"
          cy="110"
          r="60"
          fill="#F59E0B"
          opacity="0.15"
          className="animate-pulse"
        />

        {/* Labels */}
        <text
          x="40"
          y="120"
          fontSize="14"
          fontWeight="600"
          fill="#60a5fa"
          textAnchor="middle"
        >
          GDPR
        </text>
        <text
          x="140"
          y="120"
          fontSize="14"
          fontWeight="600"
          fill="#ffffff"
          textAnchor="middle"
        >
          CompliVibe
        </text>
        <text
          x="240"
          y="120"
          fontSize="14"
          fontWeight="600"
          fill="#fbbf24"
          textAnchor="middle"
        >
          SOC 2
        </text>
        <text
          x="105"
          y="60"
          fontSize="12"
          fontWeight="500"
          fill="#34d399"
          textAnchor="middle"
        >
          DPDP
        </text>
      </svg>
    </div>
  );
}

/* MAIN PAGE */
export default function FrameworksPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = GRID_FRAMEWORKS.filter(
    (fw) =>
      (activeFilter === "All" || fw.category === activeFilter) &&
      fw.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-black">
      {/* SECTION 1 HERO */}
      <section className="min-h-screen bg-black">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="flex min-h-screen flex-col items-start justify-center px-clamp py-24">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 inline-block rounded-full border border-[rgba(0,112,243,0.5)] bg-[rgba(0,112,243,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#60a5fa]"
              >
                16 Frameworks · 2 Jurisdictions · 48hr Updates
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-6 text-white"
                style={{
                  fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                }}
              >
                Every framework.
                <br />
                <span className="text-[#0070F3]">One platform.</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-10 max-w-md text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                From EU AI Act to DPDP, SOC2 to RBI SAR - CompliVibe maps,
                monitors, and maintains compliance across every framework your
                EU deals require.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/book-demo"
                  className="rounded-full bg-[#0070F3] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#0060d3]"
                >
                  Book Demo
                </Link>
                <Link
                  href="/score"
                  className="rounded-full border border-[rgba(255,255,255,0.25)] px-7 py-3.5 font-semibold text-white transition-colors hover:border-[rgba(255,255,255,0.6)]"
                >
                  Check My Score →
                </Link>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN — CANVAS */}
          <div className="relative hidden min-h-screen bg-black lg:block">
            <HeroCanvas />
          </div>
        </div>
      </section>

      {/* SECTION 2 BENTO CARDS */}
      <section className="bg-black px-clamp py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Flagship frameworks
          </motion.h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {/* Card 1 — EU AI Act */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[rgba(0,112,243,0.3)] bg-[#0a0a0a] p-8"
            >
              <div className="mb-4 inline-block rounded-full bg-[rgba(0,112,243,0.1)] px-3 py-1 text-xs font-semibold text-[#60a5fa]">
                AI & Privacy
              </div>
              <h3 className="mb-4 mt-4 text-2xl font-bold text-white">
                EU AI Act
              </h3>
              <p
                className="mb-8 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                High-risk AI system requirements, conformity assessments, and CE
                marking readiness for EU market entry.
              </p>
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Full enforcement in
                </p>
                <CountdownTimer />
              </div>
            </motion.div>

            {/* Card 2 — DPDP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[rgba(16,185,129,0.3)] bg-[#0a0a0a] p-8"
            >
              <div className="mb-4 inline-block rounded-full bg-[rgba(16,185,129,0.1)] px-3 py-1 text-xs font-semibold text-[#34d399]">
                AI & Privacy
              </div>
              <h3 className="mb-4 mt-4 text-2xl font-bold text-white">
                DPDP Act 2023
              </h3>
              <p
                className="mb-8 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                India&apos;s Digital Personal Data Protection Act — consent
                management, data fiduciary obligations, and cross-border
                transfer rules.
              </p>
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Max penalty per violation
                </p>
                <p className="text-3xl font-bold text-[#10B981]">₹250 Cr</p>
              </div>
            </motion.div>

            {/* Card 3 — SOC 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-[rgba(16,185,129,0.3)] bg-[#0a0a0a] p-8"
            >
              <div className="mb-4 inline-block rounded-full bg-[rgba(16,185,129,0.1)] px-3 py-1 text-xs font-semibold text-[#34d399]">
                Security
              </div>
              <h3 className="mb-4 mt-4 text-2xl font-bold text-white">
                SOC 2 Type II
              </h3>
              <p
                className="mb-8 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Trust Service Criteria across Security, Availability,
                Confidentiality — the US enterprise sales unlock.
              </p>
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Of Fortune 500 require SOC 2
                </p>
                <p className="text-3xl font-bold text-[#10B981]">94%</p>
              </div>
            </motion.div>

            {/* Card 4 — Dual Jurisdiction (spans 1 row) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[rgba(0,112,243,0.08)] to-[rgba(16,185,129,0.08)] p-8 md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="mb-4 inline-block rounded-full bg-[rgba(245,158,11,0.1)] px-3 py-1 text-xs font-semibold text-[#fbbf24]">
                    CompliVibe Exclusive
                  </div>
                  <h3 className="mb-4 mt-4 text-2xl font-bold text-white">
                    Dual-jurisdiction compliance moat
                  </h3>
                  <p
                    className="mb-4 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Most tools cover US or EU. CompliVibe is architected for
                    companies expanding across India ↔ EU ↔ US &mdash; mapping
                    overlaps between DPDP, GDPR, and SOC 2 so you don&apos;t build
                    controls twice.
                  </p>
                  <Link
                    href="/platform"
                    className="inline-block text-sm font-semibold text-[#0070F3] hover:underline"
                  >
                    See how it works →
                  </Link>
                </div>
                <div className="flex justify-center">
                  <VennDiagram />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 GRID */}
      <section className="bg-black px-clamp py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-2 text-3xl font-bold text-white">
              All frameworks
            </h2>
            <p
              className="mb-8 text-base"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Search, filter, and explore every standard CompliVibe covers
            </p>
          </motion.div>

          {/* FILTER BAR */}
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search frameworks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg bg-[rgba(255,255,255,0.04)] pl-10 pr-4 py-2.5 text-sm text-white placeholder-[rgba(255,255,255,0.3)] transition-colors focus:border-[#0070F3] focus:outline-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "AI & Privacy", "Security", "Industry"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                    activeFilter === cat
                      ? "border-[#0070F3] bg-[#0070F3] text-white"
                      : "border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(255,255,255,0.4)]",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((fw, i) => (
                <motion.div
                  key={fw.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/frameworks/${fw.slug}`}
                    className="group block rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6 transition-all hover:border-[rgba(255,255,255,0.15)] hover:bg-[#111111]"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          background: `${categoryColors[fw.category as keyof typeof categoryColors].primary}26`,
                          border: `2px solid ${categoryColors[fw.category as keyof typeof categoryColors].primary}80`,
                        }}
                      >
                        <fw.Icon
                          size={18}
                          style={{
                            color:
                              categoryColors[fw.category as keyof typeof categoryColors]
                                .primary,
                          }}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-white">
                        {fw.name}
                      </h3>
                    </div>

                    <div
                      className="mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        background: `${categoryColors[fw.category as keyof typeof categoryColors].primary}26`,
                        color: categoryColors[fw.category as keyof typeof categoryColors].accent,
                      }}
                    >
                      {fw.category}
                    </div>

                    <p
                      className="mb-4 text-xs leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {fw.desc}
                    </p>

                    <div
                      className="border-t border-[rgba(255,255,255,0.06)] pt-3 text-xs font-semibold group-hover:underline"
                      style={{
                        color:
                          categoryColors[fw.category as keyof typeof categoryColors]
                            .primary,
                      }}
                    >
                      Explore →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-neutral-600">
              No frameworks match your search.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}