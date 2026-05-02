import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Shield, Check } from "lucide-react";
import { notFound } from "next/navigation";

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
      { title: "Security Controls", desc: "Logical and physical access controls, system operations, and change management." },
      { title: "Availability Monitoring", desc: "System performance monitoring and disaster recovery capabilities." },
      { title: "Confidentiality", desc: "Data classification, encryption, and access restriction policies." },
    ],
    howCompliVibe: ["Maps SOC 2 controls to AI-specific requirements", "Evidence vault for Type II audit evidence", "Automated control testing and monitoring", "Cross-maps SOC 2 to EU AI Act where controls overlap"],
    relatedFeatures: ["Evidence Vault", "Audit Trail", "Readiness Dashboard", "Export API"],
  },
  "iso-42001": {
    name: "ISO 42001",
    fullName: "Artificial Intelligence Management System",
    description: "The world's first AI management system standard. ISO 42001 provides a framework for organizations to manage AI responsibly, covering risk management, transparency, and accountability.",
    jurisdiction: "International (ISO)",
    obligations: 72,
    keyObligations: [
      { title: "AI Policy", desc: "Establish, implement, and maintain an AI policy aligned with organizational objectives." },
      { title: "Risk Assessment", desc: "Identify and assess risks associated with AI systems throughout their lifecycle." },
      { title: "Transparency", desc: "Ensure appropriate levels of transparency for AI system decisions." },
    ],
    howCompliVibe: ["Full clause mapping for ISO 42001 certification", "AI system inventory and classification", "Risk assessment templates and tracking", "Gap analysis against certification requirements"],
    relatedFeatures: ["Risk Classification", "Governance OS", "Readiness Dashboard", "Audit Export"],
  },
  "gdpr": {
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    description: "The EU's comprehensive data protection regulation. GDPR governs how organizations collect, process, store, and transfer personal data of EU residents.",
    jurisdiction: "European Union",
    obligations: 156,
    keyObligations: [
      { title: "Lawful Basis", desc: "Process personal data only with a valid legal basis (consent, contract, legitimate interest, etc.)." },
      { title: "Data Subject Rights", desc: "Right to access, rectification, erasure, portability, and objection to automated decisions." },
      { title: "Cross-Border Transfers", desc: "Adequate safeguards for transferring personal data outside the EU/EEA." },
    ],
    howCompliVibe: ["Cross-maps GDPR Articles to EU AI Act requirements", "Article 22 automated decision-making compliance", "DPIA template generation", "Data transfer impact assessments"],
    relatedFeatures: ["Cross-Regulation Mapping", "Evidence Vault", "48-Hour Engine", "Export Pack"],
  },
  "rbi-sar": {
    name: "RBI SAR",
    fullName: "Reserve Bank of India Self-Assessment Report",
    description: "RBI's framework for regulated entities to self-assess their IT governance, cybersecurity, and emerging technology risks — including AI and ML systems.",
    jurisdiction: "India (RBI)",
    obligations: 42,
    keyObligations: [
      { title: "IT Governance", desc: "Board-approved IT strategy and governance framework." },
      { title: "Cyber Risk Assessment", desc: "Regular assessment of cyber risks including AI/ML model risks." },
      { title: "Third-Party Risk", desc: "Due diligence and monitoring of technology service providers." },
    ],
    howCompliVibe: ["Maps RBI SAR requirements to AI system governance", "Automated evidence collection for self-assessment", "Cross-maps to DPDP and ISO 27001", "Readiness scoring for RBI compliance"],
    relatedFeatures: ["India-First Onboarding", "Evidence Vault", "Readiness Dashboard", "Audit Export"],
  },
  "iso-27001": {
    name: "ISO 27001",
    fullName: "Information Security Management System",
    description: "The international standard for information security management. ISO 27001 provides a systematic approach to managing sensitive company information.",
    jurisdiction: "International (ISO)",
    obligations: 114,
    keyObligations: [
      { title: "ISMS Policy", desc: "Establish and maintain an information security management system." },
      { title: "Risk Treatment", desc: "Identify, assess, and treat information security risks." },
      { title: "Annex A Controls", desc: "Implement applicable controls from the 93 controls in Annex A." },
    ],
    howCompliVibe: ["Maps ISO 27001 Annex A controls to AI system requirements", "Evidence vault for certification audits", "Control effectiveness monitoring", "Cross-maps to SOC 2 and ISO 42001"],
    relatedFeatures: ["Evidence Vault", "Audit Trail", "Policy Drift Detection", "Export API"],
  },
  "hipaa": {
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "US federal law that established national standards for protecting sensitive patient health information from disclosure without consent.",
    jurisdiction: "United States (HHS)",
    obligations: 89,
    keyObligations: [
      { title: "Privacy Rule", desc: "Standards for protecting individually identifiable health information." },
      { title: "Security Rule", desc: "Administrative, physical, and technical safeguards for ePHI." },
      { title: "Breach Notification", desc: "Requirements for notifying individuals and HHS of data breaches." },
    ],
    howCompliVibe: ["Maps HIPAA requirements to healthcare AI systems", "Cross-maps to EU AI Act high-risk categories", "Evidence collection for PHI processing", "Automated HIPAA security rule assessments"],
    relatedFeatures: ["Healthcare Solution", "Evidence Vault", "Risk Classification", "Audit Trail"],
  },
  "eu-ai-act": {
    name: "EU AI Act",
    fullName: "European Union Artificial Intelligence Act",
    description: "The world's first comprehensive AI regulation. Classifies AI systems by risk level and imposes obligations proportional to that risk, from transparency requirements to full conformity assessments.",
    jurisdiction: "European Union",
    obligations: 247,
    keyObligations: [
      { title: "Risk Classification", desc: "Classify AI systems as Prohibited, High-Risk, Limited-Risk, or Minimal-Risk per Annex III." },
      { title: "Annex IV Documentation", desc: "Complete technical documentation covering design, development, and monitoring." },
      { title: "Human Oversight", desc: "Article 14 — ensure human oversight measures appropriate to the risk level." },
    ],
    howCompliVibe: ["Automated Annex III risk classification", "Full Annex IV documentation generation", "Obligation tracking across 85 Articles", "Cross-mapping to GDPR and DPDP"],
    relatedFeatures: ["Risk Classification", "Annex IV Generator", "Fine Killer", "48-Hour Engine"],
  },
  "dpdp": {
    name: "India DPDP",
    fullName: "Digital Personal Data Protection Act 2023",
    description: "India's comprehensive data protection legislation. Establishes rights for data principals, obligations for data fiduciaries, and penalties for non-compliance.",
    jurisdiction: "India (MeitY)",
    obligations: 89,
    keyObligations: [
      { title: "Consent Management", desc: "Obtain free, specific, informed, and clear consent in the data principal's language." },
      { title: "Data Principal Rights", desc: "Right to access, correction, erasure, and grievance redressal." },
      { title: "Data Localization", desc: "Restrictions on cross-border transfer of personal data." },
    ],
    howCompliVibe: ["Full DPDP obligation mapping", "Bhashini-powered vernacular consent", "Cross-maps to EU AI Act and GDPR", "India data residency controls"],
    relatedFeatures: ["India-First Onboarding", "Bhashini Consent", "Evidence Vault", "48-Hour Engine"],
  },
  "nist": {
    name: "NIST AI RMF",
    fullName: "NIST Artificial Intelligence Risk Management Framework",
    description: "A voluntary framework from the US National Institute of Standards and Technology for managing AI risks. Organized around four functions: Govern, Map, Measure, Manage.",
    jurisdiction: "United States (NIST)",
    obligations: 54,
    keyObligations: [
      { title: "Govern", desc: "Establish policies, processes, and accountability structures for AI risk management." },
      { title: "Map", desc: "Understand the context and potential impacts of AI systems." },
      { title: "Measure & Manage", desc: "Assess and treat AI risks with appropriate controls." },
    ],
    howCompliVibe: ["Maps NIST functions to actionable checklists", "Cross-maps to EU AI Act obligations", "AI impact assessment templates", "Risk treatment tracking and evidence"],
    relatedFeatures: ["Risk Classification", "Governance OS", "Cross-Regulation Mapping", "Audit Trail"],
  },
};

const fallbackData: FrameworkData = {
  name: "Framework",
  fullName: "Compliance Framework",
  description: "Detailed framework documentation coming soon. CompliVibe is actively mapping obligations and building compliance checklists for this framework.",
  jurisdiction: "International",
  obligations: 0,
  keyObligations: [
    { title: "Documentation", desc: "Full obligation mapping in progress." },
    { title: "Assessment", desc: "Risk assessment templates coming soon." },
    { title: "Monitoring", desc: "Continuous compliance monitoring planned." },
  ],
  howCompliVibe: ["Obligation mapping in progress", "Evidence vault support", "Cross-regulation alignment", "Coming to the platform soon"],
  relatedFeatures: ["Evidence Vault", "Readiness Dashboard", "Audit Trail", "48-Hour Engine"],
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
  "iso-27017", "iso-9001", "nist",
];

export default async function FrameworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!allSlugs.includes(slug)) notFound();
  const resolvedSlug = frameworkSlugAliases[slug] ?? slug;
  const data = frameworksData[resolvedSlug] || { ...fallbackData, name: resolvedSlug.toUpperCase().replace(/-/g, " ") };

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-24">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-xs text-[#888]">
            <Shield className="h-3.5 w-3.5 text-compliance-green" />
            {data.jurisdiction}
          </div>
          <h1
            className="max-w-3xl text-balance"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              fontWeight: "700",
              background: "linear-gradient(to bottom right, #fff 40%, rgba(255,255,255,0.35))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {data.name}
          </h1>
          <p className="text-sm text-[#555]">{data.fullName}</p>
          <p className="text-[#666] max-w-xl text-base leading-relaxed">{data.description}</p>
          <div className="flex items-center gap-6 text-sm text-[#888] mt-2">
            <span><strong className="text-white">{data.obligations}</strong> obligations mapped</span>
            <span className="w-px h-4 bg-white/10" />
            <span>{data.jurisdiction}</span>
          </div>
        </div>

        {/* Key Obligations */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-white mb-8">Key Obligations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.keyObligations.map((obl, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
                <h3 className="text-sm font-semibold text-white mb-2">{obl.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{obl.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How CompliVibe Maps It */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-white mb-8">How CompliVibe Maps It</h2>
          <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.howCompliVibe.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-compliance-green flex-shrink-0" />
                  <span className="text-[#888]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Features */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-white mb-8">Related Features</h2>
          <div className="flex flex-wrap gap-3">
            {data.relatedFeatures.map((feature) => (
              <span key={feature} className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-[#888]">
                {feature}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-compliance-green/5 to-transparent p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get {data.name} compliant with CompliVibe</h2>
          <p className="text-[#666] max-w-md mx-auto mb-8">
            Start mapping your obligations, generating documentation, and building your evidence vault today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
              Start Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/frameworks" className="inline-flex h-12 items-center rounded-full border border-white/[0.15] bg-white/[0.04] px-8 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
              See All Frameworks
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
