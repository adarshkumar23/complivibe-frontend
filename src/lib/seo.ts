import type { Metadata } from "next";

export const SITE_URL = "https://complivibe.in";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;

/**
 * Per-page SEO copy for the /solutions/* routes.
 *
 * The 13 dedicated solution pages each hardcoded the same meta description
 * ("AI Trust Infrastructure for governance, evidence, observability, and trust
 * reporting."), which made them duplicates of one another in search results.
 * Titles and descriptions live here so every route has exactly one owner and
 * duplicates are visible at a glance.
 *
 * Descriptions are written from each solution's own heroSubtitle in
 * solutions-data.ts, so the meta matches what the page actually says.
 */
export const solutionSeo: Record<string, { title: string; description: string }> = {
  startup: {
    title: "AI Governance for Startups",
    description:
      "AI governance and compliance built for AI-first startups — map AI systems, automate evidence, and prove trust to enterprise buyers without a GRC hire.",
  },
  "mid-market": {
    title: "AI Governance for Mid-Market SaaS",
    description:
      "Bring scattered AI governance, evidence, and risk work into one operating layer — so AI trust scales with your product instead of your headcount.",
  },
  enterprise: {
    title: "AI Governance for Enterprise AI Teams",
    description:
      "Coordinate AI governance, evidence, and observability across teams, vendors, systems, and markets — with the controls enterprise rollout requires.",
  },
  ciso: {
    title: "AI Governance for CISOs & Security Leaders",
    description:
      "AI compliance software for security leaders — live visibility into AI systems, shadow AI, and risk signals, so you can answer board questions with evidence.",
  },
  grc: {
    title: "AI Compliance Software for GRC Teams",
    description:
      "Map obligations to AI systems, controls, and evidence in one operating layer — built for AI governance, not retrofitted from legacy GRC tooling.",
  },
  "it-teams": {
    title: "AI Compliance for CTOs & Platform Teams",
    description:
      "Bring AI governance and evidence collection into the tools and pipelines your engineering team already runs — without the context switching.",
  },
  saas: {
    title: "AI Governance for SaaS Companies",
    description:
      "Turn AI trust into a sales advantage — publish a customer-ready trust posture and answer security and AI reviews faster in every deal.",
  },
  fintech: {
    title: "AI Compliance for Fintech",
    description:
      "Govern high-stakes AI like credit, fraud, and lending models with evidence, monitoring, and human review built in — mapped across overlapping frameworks.",
  },
  healthcare: {
    title: "AI Compliance for Healthtech & Healthcare AI",
    description:
      "Apply privacy-by-design AI governance to clinical and health AI — with evidence, human review, and trust reporting built for regulated patient data.",
  },
  govt: {
    title: "AI Governance for Government Agencies",
    description:
      "Operate public-sector AI with transparency, accountability, and human oversight — backed by evidence and reporting procurement teams can verify.",
  },
  travel: {
    title: "AI Governance for Travel & Mobility",
    description:
      "Govern booking, pricing, and personalization AI across markets — with evidence, monitoring, and cross-border data awareness in one operating layer.",
  },
  "india-first": {
    title: "AI Compliance Software in India",
    description:
      "AI governance and India DPDP readiness in one platform — start with Indian requirements, then expand to EU and US frameworks on your timeline.",
  },
  "eu-export": {
    title: "AI Compliance Software for the EU Market",
    description:
      "Prepare the AI governance, evidence, and trust reporting EU enterprise buyers expect — and keep it continuously up to date as obligations change.",
  },
  "us-saas": {
    title: "AI Compliance Software for US SaaS",
    description:
      "Reuse your existing security controls and extend them into AI governance, evidence, and observability as you sell into new global markets.",
  },
};

/** Build the Metadata object for a /solutions/<slug> route. */
export function solutionMetadata(slug: string, fallbackDescription?: string): Metadata {
  const seo = solutionSeo[slug];
  const title = `${seo?.title ?? slug} | CompliVibe`;
  const description = seo?.description ?? fallbackDescription ?? "";
  const url = `${SITE_URL}/solutions/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

/* ------------------------------------------------------------------ *
 * Internal linking
 *
 * Framework and solution pages previously had no contextual links to one
 * another — related modules rendered as plain <span>, so nothing connected
 * /frameworks/* to /solutions/*. These maps drive a single "Related" section
 * on each template. Kept deliberately small: three genuinely relevant links
 * per page, not a link farm.
 * ------------------------------------------------------------------ */

export type RelatedLink = { href: string; title: string; body: string; icon: string };

const SOLUTION_LINKS: Record<string, RelatedLink> = {
  startup: { href: "/solutions/startup", title: "AI-first startups", body: "Prove AI trust to enterprise buyers without a governance hire.", icon: "Rocket" },
  "mid-market": { href: "/solutions/mid-market", title: "Mid-market SaaS", body: "One operating layer as AI governance work spreads across teams.", icon: "Building2" },
  enterprise: { href: "/solutions/enterprise", title: "Enterprise AI teams", body: "Govern AI across teams, vendors, systems, and markets.", icon: "Network" },
  ciso: { href: "/solutions/ciso", title: "CISOs & security leaders", body: "Live visibility into AI systems, shadow AI, and risk signals.", icon: "ShieldAlert" },
  grc: { href: "/solutions/grc", title: "GRC teams", body: "Map obligations to AI systems, controls, and evidence.", icon: "ClipboardCheck" },
  "it-teams": { href: "/solutions/it-teams", title: "IT & platform teams", body: "Evidence collection inside the pipelines you already run.", icon: "Terminal" },
  saas: { href: "/solutions/saas", title: "SaaS companies", body: "Answer security and AI reviews faster in every deal.", icon: "Cloud" },
  fintech: { href: "/solutions/fintech", title: "Fintech", body: "Govern credit, fraud, and lending models with evidence.", icon: "TrendingUp" },
  healthcare: { href: "/solutions/healthcare", title: "Healthcare AI", body: "Privacy-by-design governance for clinical and health AI.", icon: "HeartPulse" },
  govt: { href: "/solutions/govt", title: "Public sector", body: "Transparency, accountability, and human oversight for public AI.", icon: "Landmark" },
  travel: { href: "/solutions/travel", title: "Travel & mobility", body: "Govern booking, pricing, and personalization AI across markets.", icon: "Plane" },
  "india-first": { href: "/solutions/india-first", title: "India-first companies", body: "Start with India DPDP readiness, then expand globally.", icon: "MapPin" },
  "eu-export": { href: "/solutions/eu-export", title: "Selling AI into the EU", body: "The governance and evidence EU enterprise buyers expect.", icon: "Globe2" },
  "us-saas": { href: "/solutions/us-saas", title: "US SaaS going global", body: "Extend existing controls into AI governance for new markets.", icon: "Flag" },
};

const FRAMEWORK_LINKS: Record<string, RelatedLink> = {
  "eu-ai-act": { href: "/frameworks/eu-ai-act", title: "EU AI Act", body: "Obligation mapping and evidence for AI systems placed on the EU market.", icon: "Scale" },
  dpdp: { href: "/frameworks/dpdp", title: "India DPDP Act", body: "Map DPDP obligations to AI systems, controls, and evidence.", icon: "MapPin" },
  gdpr: { href: "/frameworks/gdpr", title: "GDPR", body: "Connect data protection obligations to the AI systems that use personal data.", icon: "Lock" },
  hipaa: { href: "/frameworks/hipaa", title: "HIPAA", body: "Evidence and control mapping for AI touching protected health data.", icon: "HeartPulse" },
  soc2: { href: "/frameworks/soc2", title: "SOC 2", body: "Reuse SOC 2 controls as evidence across your AI trust program.", icon: "ShieldCheck" },
  "iso-42001": { href: "/frameworks/iso-42001", title: "ISO/IEC 42001", body: "The AI management system standard, mapped to your AI estate.", icon: "Layers" },
  "iso-27001": { href: "/frameworks/iso-27001", title: "ISO/IEC 27001", body: "Information security controls mapped alongside AI obligations.", icon: "Lock" },
  nist: { href: "/frameworks/nist", title: "NIST AI RMF", body: "Risk-function mapping across govern, map, measure, and manage.", icon: "Map" },
  "colorado-ai-act": { href: "/frameworks/colorado-ai-act", title: "Colorado AI Act", body: "Readiness mapping for consequential AI decisions in Colorado.", icon: "Scale" },
  "rbi-sar": { href: "/frameworks/rbi-sar", title: "RBI SAR", body: "Regulatory mapping for AI used in Indian financial services.", icon: "TrendingUp" },
};

/** Solution pages that each framework page should link out to. */
const FRAMEWORK_TO_SOLUTIONS: Record<string, string[]> = {
  "eu-ai-act": ["eu-export", "saas", "healthcare"],
  dpdp: ["india-first", "fintech", "healthcare"],
  gdpr: ["eu-export", "saas", "fintech"],
  hipaa: ["healthcare", "us-saas", "grc"],
  soc2: ["saas", "us-saas", "startup"],
  "iso-42001": ["grc", "enterprise", "saas"],
  "iso-27001": ["saas", "us-saas", "ciso"],
  nist: ["us-saas", "enterprise", "grc"],
  "colorado-ai-act": ["us-saas", "fintech", "saas"],
  "rbi-sar": ["fintech", "india-first", "grc"],
};

/** Framework pages that each solution page should link out to. */
const SOLUTION_TO_FRAMEWORKS: Record<string, string[]> = {
  startup: ["soc2", "iso-42001", "eu-ai-act"],
  "mid-market": ["soc2", "iso-27001", "eu-ai-act"],
  enterprise: ["iso-42001", "nist", "eu-ai-act"],
  ciso: ["iso-27001", "soc2", "nist"],
  grc: ["iso-42001", "nist", "soc2"],
  "it-teams": ["soc2", "iso-27001", "iso-42001"],
  saas: ["soc2", "gdpr", "eu-ai-act"],
  fintech: ["dpdp", "gdpr", "rbi-sar"],
  healthcare: ["hipaa", "gdpr", "dpdp"],
  govt: ["nist", "iso-42001", "dpdp"],
  travel: ["gdpr", "dpdp", "eu-ai-act"],
  "india-first": ["dpdp", "iso-42001", "eu-ai-act"],
  "eu-export": ["eu-ai-act", "gdpr", "iso-42001"],
  "us-saas": ["soc2", "colorado-ai-act", "nist"],
};

/** Default outbound solutions for frameworks without a specific mapping. */
const DEFAULT_FRAMEWORK_SOLUTIONS = ["grc", "saas", "enterprise"];

export function relatedSolutionsFor(frameworkSlug: string): RelatedLink[] {
  const slugs = FRAMEWORK_TO_SOLUTIONS[frameworkSlug] ?? DEFAULT_FRAMEWORK_SOLUTIONS;
  return slugs.map((s) => SOLUTION_LINKS[s]).filter(Boolean);
}

export function relatedFrameworksFor(solutionSlug: string): RelatedLink[] {
  const slugs = SOLUTION_TO_FRAMEWORKS[solutionSlug] ?? ["iso-42001", "soc2", "eu-ai-act"];
  return slugs.map((s) => FRAMEWORK_LINKS[s]).filter(Boolean);
}
