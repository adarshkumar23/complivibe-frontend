import {
  Rocket,
  Building2,
  Network,
  ShieldAlert,
  ClipboardCheck,
  Terminal,
  Cloud,
  TrendingUp,
  HeartPulse,
  Landmark,
  Plane,
  MapPin,
  Globe2,
  Flag,
  type LucideIcon,
} from "lucide-react";

export type SolutionData = {
  audience: string;
  icon: LucideIcon;
  accent: string;
  heroTitle: string;
  heroSubtitle: string;
  struggles: { title: string; desc: string }[];
  helps: { title: string; desc: string }[];
  workflow: string[];
  modules: string[];
  ctaTitle: string;
  ctaSubtitle: string;
};

const SHARED_WORKFLOW = ["Discover", "Govern", "Evidence", "Monitor", "Report"];

export const solutions: Record<string, SolutionData> = {
  startup: {
    audience: "AI-first startups",
    icon: Rocket,
    accent: "#2563eb",
    heroTitle: "AI trust infrastructure for AI-first startups.",
    heroSubtitle:
      "Govern AI systems, automate evidence, and prove trust to enterprise buyers — without hiring a governance team or slowing down shipping.",
    struggles: [
      { title: "Buyers ask for proof early", desc: "Enterprise prospects want evidence-backed AI trust before they sign — often before you have a process." },
      { title: "No governance headcount", desc: "You can't justify a full-time GRC hire at seed stage, yet the work is already piling up." },
      { title: "Trust work blocks shipping", desc: "Manual reviews and scattered evidence pull engineers out of building." },
    ],
    helps: [
      { title: "Start in minutes", desc: "Map your first AI systems and run a trust scan to see where you stand today." },
      { title: "Evidence on autopilot", desc: "Collect proof from the tools you already use, so trust packs assemble themselves." },
      { title: "Sales-ready trust", desc: "Publish a customer-ready trust posture you can share in deals from day one." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI System Inventory", "Evidence Vault", "Trust Reports", "Trust Center"],
    ctaTitle: "Ship AI with trust built in.",
    ctaSubtitle: "Start with one AI system and expand into your operating layer as you grow.",
  },
  "mid-market": {
    audience: "mid-market SaaS teams",
    icon: Building2,
    accent: "#7c3aed",
    heroTitle: "AI trust infrastructure for mid-market SaaS.",
    heroSubtitle:
      "Bring scattered AI governance, evidence, and risk work into one operating layer — so trust scales with your product, not your headcount.",
    struggles: [
      { title: "Governance sprawl", desc: "Multiple teams ship AI with no central view of systems, owners, or risk." },
      { title: "Siloed teams", desc: "Engineering, security, and legal track trust work in disconnected tools." },
      { title: "Audit scramble", desc: "Evidence lives across tickets, docs, and chats when an audit lands." },
    ],
    helps: [
      { title: "One central registry", desc: "See every AI system, owner, and risk level in a single governed inventory." },
      { title: "Connected workflows", desc: "Route approvals, reviews, and human sign-off across teams in one place." },
      { title: "Always audit-ready", desc: "Live evidence means audit packs and trust reports are a click away." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI Governance OS", "Evidence Vault", "Data Observability", "Audit Packs"],
    ctaTitle: "Scale trust without scaling headcount.",
    ctaSubtitle: "Give every team one operating layer for governance, evidence, and reporting.",
  },
  enterprise: {
    audience: "enterprise AI teams",
    icon: Network,
    accent: "#06b6d4",
    heroTitle: "AI trust infrastructure for enterprise AI teams.",
    heroSubtitle:
      "Coordinate AI governance, evidence, and observability across teams, vendors, systems, and markets — with the controls enterprise rollout requires.",
    struggles: [
      { title: "Trust across many teams", desc: "Dozens of AI systems and owners span functions and geographies." },
      { title: "Vendor and model risk", desc: "Third-party models and AI vendors expand the surface you must govern." },
      { title: "Board-level visibility", desc: "Leadership wants live trust posture, not static spreadsheets." },
    ],
    helps: [
      { title: "Governance at scale", desc: "Policies, controls, approvals, and human sign-off across the whole AI estate." },
      { title: "Enterprise controls", desc: "SAML/SSO, custom controls, data residency, and audit log access." },
      { title: "Board-ready reporting", desc: "Publish trust reports and a trust center for customers and auditors." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI Governance OS", "Vendor & Model Risk", "Trust Center", "Audit Packs"],
    ctaTitle: "One trust layer for the whole AI estate.",
    ctaSubtitle: "Govern, monitor, and prove AI trust across every team and market.",
  },
  ciso: {
    audience: "CISOs and security leaders",
    icon: ShieldAlert,
    accent: "#2563eb",
    heroTitle: "AI trust infrastructure for security leaders.",
    heroSubtitle:
      "Get live visibility into AI systems, risks, and trust signals — so you can answer the board's questions about AI risk with evidence.",
    struggles: [
      { title: "Shadow AI", desc: "Teams adopt models and copilots faster than security can assess them." },
      { title: "Risk you can't see", desc: "AI risk is spread across tools with no single, current view." },
      { title: "Reporting pressure", desc: "The board wants AI risk quantified and continuously monitored." },
    ],
    helps: [
      { title: "Live AI inventory", desc: "Surface every AI system, owner, and risk level as it changes." },
      { title: "Continuous monitoring", desc: "Track drift, incidents, and risk health from production signals." },
      { title: "Evidence-backed reporting", desc: "Generate board-ready trust posture grounded in real evidence." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI System Inventory", "Data Observability", "Vendor & Model Risk", "Trust Reports"],
    ctaTitle: "See and govern AI risk in real time.",
    ctaSubtitle: "Turn scattered AI activity into a monitored, reportable trust posture.",
  },
  grc: {
    audience: "GRC teams",
    icon: ClipboardCheck,
    accent: "#7c3aed",
    heroTitle: "AI trust infrastructure for GRC teams.",
    heroSubtitle:
      "Map obligations to AI systems, controls, and evidence in one operating layer — built for AI governance, not retrofitted from legacy GRC.",
    struggles: [
      { title: "Legacy tools miss AI", desc: "Existing GRC tooling wasn't built for AI systems, models, and signals." },
      { title: "Evidence fragmentation", desc: "Proof lives across many systems with no single source of truth." },
      { title: "Obligation overload", desc: "Tracking obligations across frameworks by hand doesn't scale." },
    ],
    helps: [
      { title: "Control-to-evidence mapping", desc: "Connect obligations to controls, evidence, and owners automatically." },
      { title: "One evidence vault", desc: "Centralize policies, approvals, logs, and controls in one trusted place." },
      { title: "Report generation", desc: "Produce audit packs and trust reports from live evidence." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["Compliance Automation", "Evidence Vault", "Regulatory Mapping", "Audit Packs"],
    ctaTitle: "Operationalize AI governance.",
    ctaSubtitle: "Connect obligations, evidence, and reports into one continuous workflow.",
  },
  "it-teams": {
    audience: "IT and platform teams",
    icon: Terminal,
    accent: "#06b6d4",
    heroTitle: "AI trust infrastructure for IT and platform teams.",
    heroSubtitle:
      "Bring AI governance and evidence collection into the tools and pipelines you already run — without context switching.",
    struggles: [
      { title: "Context switching", desc: "Trust work pulls engineers out of their normal workflow." },
      { title: "Manual evidence", desc: "Collecting proof from logs and systems by hand is brittle." },
      { title: "No automation", desc: "Trust checks aren't part of the delivery pipeline." },
    ],
    helps: [
      { title: "Integrations first", desc: "Connect evidence collection to the tools where your AI already runs." },
      { title: "CI/CD trust gate", desc: "Keep ungoverned AI from reaching production with pipeline checks." },
      { title: "API-driven", desc: "Automate inventory, evidence, and reporting programmatically." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI System Inventory", "Evidence Vault", "CI/CD Trust Gate", "Data Observability"],
    ctaTitle: "Trust that fits your workflow.",
    ctaSubtitle: "Automate governance and evidence in the stack you already use.",
  },
  saas: {
    audience: "SaaS companies",
    icon: Cloud,
    accent: "#2563eb",
    heroTitle: "AI trust infrastructure for SaaS companies.",
    heroSubtitle:
      "Turn AI trust into a sales advantage — publish a customer-ready trust posture and answer security and AI reviews faster.",
    struggles: [
      { title: "Trust reviews stall deals", desc: "Buyers add AI and security questions that slow procurement." },
      { title: "Repeated questionnaires", desc: "Teams re-answer the same trust questions for every deal." },
      { title: "No single source of proof", desc: "Evidence is scattered when customers ask for it." },
    ],
    helps: [
      { title: "Customer-ready trust center", desc: "Share live trust posture so buyers can self-serve answers." },
      { title: "Reusable evidence", desc: "Answer reviews from one evidence vault instead of starting over." },
      { title: "Faster approvals", desc: "Reduce trust drag that delays enterprise deals." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["Trust Center", "Evidence Vault", "Compliance Automation", "Trust Reports"],
    ctaTitle: "Make trust a sales advantage.",
    ctaSubtitle: "Publish a trust posture buyers can verify before they ask.",
  },
  fintech: {
    audience: "fintech teams",
    icon: TrendingUp,
    accent: "#10b981",
    heroTitle: "AI trust infrastructure for fintech.",
    heroSubtitle:
      "Govern high-stakes AI like credit, fraud, and lending models with evidence, monitoring, and human review built in.",
    struggles: [
      { title: "High-stakes AI decisions", desc: "Credit and fraud models demand strong oversight and explainability." },
      { title: "Overlapping rules", desc: "AI, privacy, and financial frameworks collide across markets." },
      { title: "Audit intensity", desc: "Frequent reviews require continuous, organized evidence." },
    ],
    helps: [
      { title: "Model oversight", desc: "Govern models and vendors with owners, approvals, and sign-off." },
      { title: "Production monitoring", desc: "Watch drift, incidents, and risk changes on live models." },
      { title: "Evidence support", desc: "Map controls to evidence and generate audit-ready reports." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["Vendor & Model Risk", "Data Observability", "Evidence Vault", "Compliance Automation"],
    ctaTitle: "Govern financial AI with confidence.",
    ctaSubtitle: "Bring oversight, monitoring, and evidence to high-stakes models.",
  },
  healthcare: {
    audience: "healthcare AI teams",
    icon: HeartPulse,
    accent: "#06b6d4",
    heroTitle: "AI trust infrastructure for healthcare AI.",
    heroSubtitle:
      "Apply privacy-by-design governance to clinical and health AI — with evidence, human review, and trust reporting.",
    struggles: [
      { title: "Sensitive data", desc: "Health AI handles regulated patient data requiring careful controls." },
      { title: "High-risk use cases", desc: "Clinical AI demands strong oversight and human-in-the-loop review." },
      { title: "Documentation burden", desc: "Evidence and reporting requirements are heavy and ongoing." },
    ],
    helps: [
      { title: "Privacy-first governance", desc: "Govern data flows, owners, and controls across health AI." },
      { title: "Human review", desc: "Keep clinical decisions reviewable with sign-off and audit trails." },
      { title: "Readiness reporting", desc: "Produce trust reports mapped to relevant frameworks." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI Governance OS", "Evidence Vault", "Human Review", "Trust Reports"],
    ctaTitle: "Trustworthy AI for healthcare.",
    ctaSubtitle: "Govern sensitive AI with privacy, evidence, and human oversight.",
  },
  govt: {
    audience: "government and public sector",
    icon: Landmark,
    accent: "#7c3aed",
    heroTitle: "AI trust infrastructure for the public sector.",
    heroSubtitle:
      "Operate public-sector AI with transparency, accountability, and human oversight — backed by evidence and clear reporting.",
    struggles: [
      { title: "Citizen trust", desc: "Public AI must be transparent, fair, and explainable." },
      { title: "Accountability gaps", desc: "Ownership and oversight of public AI systems can be unclear." },
      { title: "Procurement expectations", desc: "Public AI increasingly requires governance readiness." },
    ],
    helps: [
      { title: "Transparent governance", desc: "Document systems, owners, controls, and human oversight." },
      { title: "Accountability by design", desc: "Assign approvals and reviews with full audit trails." },
      { title: "Public-ready reporting", desc: "Generate clear readiness and trust reports." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI Governance OS", "Human Review", "Evidence Vault", "Trust Center"],
    ctaTitle: "Accountable AI for the public sector.",
    ctaSubtitle: "Operate public AI with transparency, oversight, and evidence.",
  },
  travel: {
    audience: "travel and mobility platforms",
    icon: Plane,
    accent: "#06b6d4",
    heroTitle: "AI trust infrastructure for travel and mobility.",
    heroSubtitle:
      "Govern booking, pricing, and personalization AI across markets — with evidence, monitoring, and cross-border data awareness.",
    struggles: [
      { title: "Cross-border data", desc: "Traveler data moves across many jurisdictions constantly." },
      { title: "Algorithmic pricing", desc: "Dynamic pricing and personalization AI need transparency." },
      { title: "Scattered evidence", desc: "Proof of governance is hard to assemble across regions." },
    ],
    helps: [
      { title: "Multi-market governance", desc: "Map systems and data flows with owners and controls." },
      { title: "Signal monitoring", desc: "Track model behavior, drift, and incidents in production." },
      { title: "Evidence support", desc: "Centralize proof and generate trust reports per market." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["AI System Inventory", "Data Observability", "Regulatory Mapping", "Evidence Vault"],
    ctaTitle: "Govern travel AI across markets.",
    ctaSubtitle: "Bring oversight and evidence to pricing and personalization AI.",
  },
  "india-first": {
    audience: "India-first companies",
    icon: MapPin,
    accent: "#10b981",
    heroTitle: "AI trust infrastructure, India-first.",
    heroSubtitle:
      "Start with India DPDP readiness and AI governance, then expand to global frameworks on your timeline — one operating layer throughout.",
    struggles: [
      { title: "Evolving requirements", desc: "Data protection expectations are new and still maturing." },
      { title: "Local-language consent", desc: "Consent and notices may be needed in multiple languages." },
      { title: "Global expansion ahead", desc: "Teams need a path from India to EU, US, and beyond." },
    ],
    helps: [
      { title: "DPDP-ready workflows", desc: "Map data obligations to AI systems, controls, and evidence." },
      { title: "Local consent support", desc: "Support Indian-language consent through add-on modules." },
      { title: "Expand when ready", desc: "Add EU, US, and other frameworks without re-platforming." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["Compliance Automation", "Evidence Vault", "Regulatory Mapping", "Trust Reports"],
    ctaTitle: "Start in India. Scale globally.",
    ctaSubtitle: "Build AI trust readiness at home, then expand on your timeline.",
  },
  "eu-export": {
    audience: "companies selling AI into the EU",
    icon: Globe2,
    accent: "#2563eb",
    heroTitle: "AI trust infrastructure for EU market access.",
    heroSubtitle:
      "Prepare the governance, evidence, and trust reporting EU enterprise buyers expect — and keep it continuously up to date.",
    struggles: [
      { title: "Buyer expectations", desc: "EU enterprises expect AI governance readiness before procurement." },
      { title: "Evidence gaps", desc: "Teams are asked for documentation they've never produced." },
      { title: "Cross-border data", desc: "Data transfers add governance and mapping complexity." },
    ],
    helps: [
      { title: "Readiness mapping", desc: "Map AI systems to relevant EU framework obligations." },
      { title: "Evidence support", desc: "Assemble proof and audit packs for buyer reviews." },
      { title: "Customer-ready trust", desc: "Publish a trust posture EU buyers can verify." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["Regulatory Mapping", "Evidence Vault", "Trust Center", "Trust Reports"],
    ctaTitle: "Make AI trust your EU advantage.",
    ctaSubtitle: "Prepare governance and evidence buyers expect — kept current.",
  },
  "us-saas": {
    audience: "US SaaS going global",
    icon: Flag,
    accent: "#7c3aed",
    heroTitle: "AI trust infrastructure for US SaaS going global.",
    heroSubtitle:
      "Reuse your existing controls and extend them into AI governance, evidence, and observability for new markets.",
    struggles: [
      { title: "New AI expectations", desc: "Existing security programs don't fully cover AI governance." },
      { title: "Many frameworks", desc: "Each new market adds governance and mapping work." },
      { title: "Manual mapping", desc: "Reconciling controls across frameworks by hand is slow." },
    ],
    helps: [
      { title: "Reuse controls", desc: "Map existing controls into AI governance without starting over." },
      { title: "One operating layer", desc: "Manage governance, evidence, and signals in one place." },
      { title: "Multi-framework reporting", desc: "Generate trust reports across the frameworks you track." },
    ],
    workflow: SHARED_WORKFLOW,
    modules: ["Compliance Automation", "Regulatory Mapping", "Evidence Vault", "Data Observability"],
    ctaTitle: "Extend your trust program to AI.",
    ctaSubtitle: "Reuse what you have and expand into AI governance for new markets.",
  },
};

export const solutionSlugs = Object.keys(solutions);
