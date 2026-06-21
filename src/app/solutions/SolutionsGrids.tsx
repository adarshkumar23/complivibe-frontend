"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Building2,
  Network,
  ShieldAlert,
  ClipboardCheck,
  Terminal,
  Scale,
  Cloud,
  TrendingUp,
  HeartPulse,
  Landmark,
  Plane,
  type LucideIcon,
} from "lucide-react";
import PageBentoCard, { bentoContainer } from "@/components/PageBentoCard";

type Card = { icon: LucideIcon; accent: string; title: string; body: string; href: string };

const groups: Record<string, Card[]> = {
  stage: [
    { icon: Rocket, accent: "#2563eb", title: "AI-first startups", body: "Govern AI and prove trust to buyers without a governance team.", href: "/solutions/startup" },
    { icon: Building2, accent: "#7c3aed", title: "Mid-market SaaS", body: "Bring scattered governance and evidence into one operating layer.", href: "/solutions/mid-market" },
    { icon: Network, accent: "#06b6d4", title: "Enterprise AI teams", body: "Coordinate AI trust across teams, vendors, systems, and markets.", href: "/solutions/enterprise" },
  ],
  role: [
    { icon: ShieldAlert, accent: "#2563eb", title: "CISO", body: "Live visibility into AI systems, risk, and trust signals.", href: "/solutions/ciso" },
    { icon: ClipboardCheck, accent: "#7c3aed", title: "GRC teams", body: "Map obligations to controls, evidence, and reports.", href: "/solutions/grc" },
    { icon: Terminal, accent: "#06b6d4", title: "IT teams", body: "Automate governance and evidence inside your stack.", href: "/solutions/it-teams" },
    { icon: Scale, accent: "#10b981", title: "Legal & compliance", body: "Operationalize policy, evidence, and trust readiness.", href: "/solutions/grc" },
  ],
  industry: [
    { icon: TrendingUp, accent: "#10b981", title: "Fintech", body: "Govern high-stakes credit, fraud, and lending AI.", href: "/solutions/fintech" },
    { icon: HeartPulse, accent: "#06b6d4", title: "Healthcare AI", body: "Privacy-first governance with human review.", href: "/solutions/healthcare" },
    { icon: Cloud, accent: "#2563eb", title: "SaaS", body: "Turn AI trust into a sales advantage.", href: "/solutions/saas" },
    { icon: Landmark, accent: "#7c3aed", title: "Government & public sector", body: "Transparent, accountable public-sector AI.", href: "/solutions/govt" },
    { icon: Plane, accent: "#06b6d4", title: "Travel & mobility", body: "Govern booking, pricing, and personalization AI.", href: "/solutions/travel" },
  ],
};

export default function SolutionsGrids({ group }: { group: "stage" | "role" | "industry" }) {
  const cards = groups[group];
  return (
    <motion.div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
        group === "industry" || group === "role" ? "lg:grid-cols-3" : "lg:grid-cols-3"
      }`}
      variants={bentoContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {cards.map((c) => (
        <PageBentoCard
          key={c.title}
          icon={c.icon}
          accent={c.accent}
          title={c.title}
          body={c.body}
          href={c.href}
          hrefLabel="Explore"
        />
      ))}
    </motion.div>
  );
}
