import { notFound } from "next/navigation";
import { Map, FileBarChart, Boxes } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";
import FrameworkChecklist from "./FrameworkChecklist";

interface FrameworkData {
  name: string;
  fullName: string;
  description: string;
  jurisdiction: string;
  obligations: number;
  keyObligations: { title: string; desc: string }[];
  howCompliVibe: string[];
  relatedFeatures: string[];
}

const frameworksData: Record<string, FrameworkData> = {
  "soc2": {
    name: "SOC 2",
    fullName: "System and Organization Controls 2",
    description: "SOC 2 defines criteria for managing customer data based on five Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy.",
    jurisdiction: "United States (AICPA)",
    obligations: 64,
    keyObligations: [
      { title: "Security controls", desc: "Logical and physical access controls, system operations, and change management." },
      { title: "Availability monitoring", desc: "System performance monitoring and disaster recovery capabilities." },
      { title: "Confidentiality", desc: "Data classification, encryption, and access restriction policies." },
    ],
    howCompliVibe: ["Maps SOC 2 controls to AI systems", "Evidence vault for audit evidence", "Control testing and monitoring", "Cross-maps to overlapping frameworks"],
    relatedFeatures: ["Evidence Vault", "Audit Packs", "Trust Reports", "Data Observability"],
  },
  "iso-42001": {
    name: "ISO 42001",
    fullName: "Artificial Intelligence Management System",
    description: "The first AI management system standard. ISO 42001 provides a framework for organizations to manage AI responsibly, covering risk management, transparency, and accountability.",
    jurisdiction: "International (ISO)",
    obligations: 72,
    keyObligations: [
      { title: "AI policy", desc: "Establish, implement, and maintain an AI policy aligned with organizational objectives." },
      { title: "Risk assessment", desc: "Identify and assess risks associated with AI systems throughout their lifecycle." },
      { title: "Transparency", desc: "Ensure appropriate levels of transparency for AI system decisions." },
    ],
    howCompliVibe: ["Clause mapping for ISO 42001 readiness", "AI system inventory and classification", "Risk assessment templates and tracking", "Gap analysis against requirements"],
    relatedFeatures: ["AI Governance OS", "AI System Inventory", "Trust Reports", "Audit Packs"],
  },
  "gdpr": {
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    description: "The EU's comprehensive data protection regulation. GDPR governs how organizations collect, process, store, and transfer personal data of EU residents.",
    jurisdiction: "European Union",
    obligations: 156,
    keyObligations: [
      { title: "Lawful basis", desc: "Process personal data only with a valid legal basis (consent, contract, legitimate interest, etc.)." },
      { title: "Data subject rights", desc: "Access, rectification, erasure, portability, and objection to automated decisions." },
      { title: "Cross-border transfers", desc: "Adequate safeguards for transferring personal data outside the EU/EEA." },
    ],
    howCompliVibe: ["Cross-maps GDPR to AI governance", "Automated decision-making mapping", "Assessment template support", "Evidence collection for data workflows"],
    relatedFeatures: ["Regulatory Mapping", "Evidence Vault", "Compliance Automation", "Trust Reports"],
  },
  "rbi-sar": {
    name: "RBI SAR",
    fullName: "Reserve Bank of India Self-Assessment Report",
    description: "RBI's framework for regulated entities to self-assess their IT governance, cybersecurity, and emerging technology risks — including AI and ML systems.",
    jurisdiction: "India (RBI)",
    obligations: 42,
    keyObligations: [
      { title: "IT governance", desc: "Board-approved IT strategy and governance framework." },
      { title: "Cyber risk assessment", desc: "Regular assessment of cyber risks including AI/ML model risks." },
      { title: "Third-party risk", desc: "Due diligence and monitoring of technology service providers." },
    ],
    howCompliVibe: ["Maps SAR areas to AI system governance", "Evidence collection for self-assessment", "Cross-maps to DPDP and ISO 27001", "Readiness scoring support"],
    relatedFeatures: ["Vendor & Model Risk", "Evidence Vault", "Trust Reports", "Audit Packs"],
  },
  "iso-27001": {
    name: "ISO 27001",
    fullName: "Information Security Management System",
    description: "The international standard for information security management. ISO 27001 provides a systematic approach to managing sensitive company information.",
    jurisdiction: "International (ISO)",
    obligations: 114,
    keyObligations: [
      { title: "ISMS policy", desc: "Establish and maintain an information security management system." },
      { title: "Risk treatment", desc: "Identify, assess, and treat information security risks." },
      { title: "Annex A controls", desc: "Implement applicable controls from the controls in Annex A." },
    ],
    howCompliVibe: ["Maps Annex A controls to AI systems", "Evidence vault for audits", "Control effectiveness monitoring", "Cross-maps to SOC 2 and ISO 42001"],
    relatedFeatures: ["Evidence Vault", "Audit Packs", "Data Observability", "Trust Reports"],
  },
  "hipaa": {
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "US federal law that established national standards for protecting sensitive patient health information from disclosure without consent.",
    jurisdiction: "United States (HHS)",
    obligations: 89,
    keyObligations: [
      { title: "Privacy rule", desc: "Standards for protecting individually identifiable health information." },
      { title: "Security rule", desc: "Administrative, physical, and technical safeguards for ePHI." },
      { title: "Breach notification", desc: "Requirements for notifying individuals and authorities of data breaches." },
    ],
    howCompliVibe: ["Maps requirements to healthcare AI systems", "Cross-maps to AI governance", "Evidence collection for PHI processing", "Security safeguard assessment support"],
    relatedFeatures: ["AI Governance OS", "Evidence Vault", "Human Review", "Audit Packs"],
  },
  "eu-ai-act": {
    name: "EU AI Act",
    fullName: "European Union Artificial Intelligence Act",
    description: "A comprehensive AI regulation that classifies AI systems by risk level and sets obligations proportional to that risk, from transparency to conformity assessments.",
    jurisdiction: "European Union",
    obligations: 247,
    keyObligations: [
      { title: "Risk classification", desc: "Classify AI systems by risk level and applicable obligations." },
      { title: "Technical documentation", desc: "Maintain documentation covering design, development, and monitoring." },
      { title: "Human oversight", desc: "Ensure human oversight measures appropriate to the risk level." },
    ],
    howCompliVibe: ["Risk classification support", "Technical documentation workflows", "Obligation-to-evidence mapping", "Cross-mapping to GDPR and DPDP"],
    relatedFeatures: ["Regulatory Mapping", "AI Governance OS", "Evidence Vault", "Trust Reports"],
  },
  "dpdp": {
    name: "India DPDP",
    fullName: "Digital Personal Data Protection Act 2023",
    description: "India's data protection legislation. Establishes rights for data principals, obligations for data fiduciaries, and accountability for personal data processing.",
    jurisdiction: "India (MeitY)",
    obligations: 89,
    keyObligations: [
      { title: "Consent management", desc: "Obtain free, specific, informed, and clear consent in the data principal's language." },
      { title: "Data principal rights", desc: "Access, correction, erasure, and grievance redressal." },
      { title: "Cross-border transfer", desc: "Requirements around transfer of personal data." },
    ],
    howCompliVibe: ["DPDP obligation mapping", "Vernacular consent support (add-on)", "Cross-maps to AI governance and GDPR", "India data residency support"],
    relatedFeatures: ["Compliance Automation", "Evidence Vault", "Regulatory Mapping", "Trust Reports"],
  },
  "nist": {
    name: "NIST AI RMF",
    fullName: "NIST Artificial Intelligence Risk Management Framework",
    description: "A voluntary framework from NIST for managing AI risks, organized around four functions: Govern, Map, Measure, and Manage.",
    jurisdiction: "United States (NIST)",
    obligations: 54,
    keyObligations: [
      { title: "Govern", desc: "Establish policies, processes, and accountability for AI risk management." },
      { title: "Map", desc: "Understand the context and potential impacts of AI systems." },
      { title: "Measure & manage", desc: "Assess and treat AI risks with appropriate controls." },
    ],
    howCompliVibe: ["Maps functions to actionable workflows", "Cross-maps to AI and privacy frameworks", "AI impact assessment templates", "Risk treatment tracking and evidence"],
    relatedFeatures: ["AI Governance OS", "Vendor & Model Risk", "Regulatory Mapping", "Audit Packs"],
  },
};

const fallbackData: FrameworkData = {
  name: "Framework",
  fullName: "Trust & Compliance Framework",
  description: "Detailed framework mapping is in progress. CompliVibe is actively mapping obligations and building evidence workflows for this framework.",
  jurisdiction: "International",
  obligations: 0,
  keyObligations: [
    { title: "Mapping", desc: "Obligation mapping in progress." },
    { title: "Assessment", desc: "Readiness assessment templates coming soon." },
    { title: "Monitoring", desc: "Continuous trust monitoring planned." },
  ],
  howCompliVibe: ["Obligation mapping in progress", "Evidence vault support", "Cross-framework alignment", "Coming to the platform soon"],
  relatedFeatures: ["Evidence Vault", "Trust Reports", "Audit Packs", "Regulatory Mapping"],
};

const frameworkSlugAliases: Record<string, string> = {
  iso27001: "iso-27001",
  iso27017: "iso-27017",
  iso9001: "iso-9001",
};

const allSlugs = [
  "soc2", "iso-42001", "fcra", "iso27001", "hipaa", "tisax",
  "fedramp", "pci-dss", "gdpr", "rbi-sar", "csa-star", "iso9001",
  "iso27017", "pipeda", "eu-ai-act", "dpdp", "iso-27001",
  "iso-27017", "iso-9001", "nist", "colorado-ai-act",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolvedSlug = frameworkSlugAliases[slug] ?? slug;
  const data = frameworksData[resolvedSlug] || { ...fallbackData, name: resolvedSlug.toUpperCase().replace(/-/g, " ") };
  return {
    title: `${data.name} readiness & mapping | CompliVibe`,
    description: `${data.name} mapping and evidence support — connect obligations to AI systems, controls, and trust reports.`,
    alternates: { canonical: `https://complivibe.in/frameworks/${slug}` },
  };
}

export default async function FrameworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!allSlugs.includes(slug)) notFound();
  const resolvedSlug = frameworkSlugAliases[slug] ?? slug;
  const data = frameworksData[resolvedSlug] || { ...fallbackData, name: resolvedSlug.toUpperCase().replace(/-/g, " ") };

  return (
    <PageShell>
      <PageHero
        kicker="Framework Coverage"
        title={data.name}
        subtitle={data.description}
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      >
        <div className="liquid-card glass-highlight flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cv-muted)]">Framework</p>
            <p className="mt-1 text-lg font-bold tracking-tight text-[var(--cv-ink)]">{data.fullName}</p>
          </div>
          <div className="flex items-center gap-6">
            {data.obligations > 0 && (
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#2563eb] dark:text-[#3b82f6]">{data.obligations}</div>
                <div className="text-[11px] text-[var(--cv-muted)]">obligations mapped</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-sm font-semibold text-[var(--cv-ink)]">{data.jurisdiction}</div>
              <div className="text-[11px] text-[var(--cv-muted)]">jurisdiction</div>
            </div>
          </div>
        </div>
      </PageHero>

      <PageSection kicker="What CompliVibe maps" title="Key obligations connected to your AI systems">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.keyObligations.map((o) => (
            <div key={o.title} className="bento-card glass-highlight flex flex-col gap-2 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2563eb]/30 bg-[#2563eb]/10">
                <Map className="h-5 w-5 text-[#2563eb] dark:text-[#3b82f6]" />
              </span>
              <h3 className="mt-2 text-base font-bold tracking-tight text-[var(--cv-ink)]">{o.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--cv-muted)]">{o.desc}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker="How CompliVibe helps" title="Mapping, evidence, and reports" aurora>
        <FrameworkChecklist items={data.howCompliVibe} />
      </PageSection>

      <PageSection kicker="Related Workflows" title="Platform modules used">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {data.relatedFeatures.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] px-4 py-2 text-sm font-medium text-[var(--cv-muted)] backdrop-blur-sm"
            >
              <Boxes className="h-3.5 w-3.5 text-[#2563eb] dark:text-[#3b82f6]" />
              {f}
            </span>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-4 py-3 text-[13px] text-[var(--cv-muted)]">
            <FileBarChart className="h-4 w-4 text-[#10b981]" />
            Generates customer-ready, auditor-ready, and board-ready trust reports from live evidence.
          </span>
        </div>
      </PageSection>

      <PageCTA
        title={`Build ${data.name} readiness with CompliVibe.`}
        subtitle="Map obligations to AI systems, controls, and evidence — then generate trust reports that stay current."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "See all frameworks", href: "/frameworks" }}
      />
    </PageShell>
  );
}
