import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Shield, Check } from "lucide-react";
import { notFound } from "next/navigation";

interface SolutionData {
  title: string;
  headline: string;
  description: string;
  painPoints: { title: string; desc: string }[];
  features: string[];
  ctaLabel: string;
}

const solutions: Record<string, SolutionData> = {
  startup: {
    title: "Startups",
    headline: "Ship AI products to EU customers. Without the compliance bottleneck.",
    description: "You're moving fast. Investors want traction, not compliance decks. But EU enterprise customers now require AI Act proof before signing. CompliVibe gets you compliant in days — not quarters.",
    painPoints: [
      { title: "EU deals blocked", desc: "Enterprise customers require AI Act compliance before procurement." },
      { title: "No compliance team", desc: "You can't afford a full-time GRC hire at seed stage." },
      { title: "Documentation burden", desc: "Annex IV requires 11 technical documentation sections you've never written." },
    ],
    features: ["Auto risk classification", "Annex IV document generation", "Readiness score dashboard", "Evidence vault", "PDF export for sales teams", "Free tier to start"],
    ctaLabel: "Start Free — No Credit Card",
  },
  "mid-market": {
    title: "Mid-Market",
    headline: "Scale compliance across teams without scaling headcount.",
    description: "Your AI portfolio is growing. Multiple teams ship models. Compliance can't be one person's side project anymore. CompliVibe centralizes your governance across all AI systems and frameworks.",
    painPoints: [
      { title: "Compliance sprawl", desc: "Multiple AI systems, multiple frameworks, no central view." },
      { title: "Team coordination", desc: "Engineering, legal, and compliance teams working in silos." },
      { title: "Audit readiness", desc: "Evidence scattered across Jira tickets, Google Docs, and Slack messages." },
    ],
    features: ["Multi-system dashboard", "Team collaboration", "Cross-regulation mapping", "Centralized evidence vault", "48-hour regulatory updates", "Priority support"],
    ctaLabel: "Start Growth Plan",
  },
  enterprise: {
    title: "Enterprise",
    headline: "Multi-jurisdiction governance. Zero compromises.",
    description: "You operate across borders. Your AI systems are regulated under multiple frameworks simultaneously. CompliVibe is the governance OS that scales with your regulatory complexity.",
    painPoints: [
      { title: "Multi-jurisdiction complexity", desc: "EU AI Act + DPDP + GDPR + industry-specific regulations overlap." },
      { title: "Board-level visibility", desc: "The board wants compliance dashboards, not spreadsheets." },
      { title: "Audit fatigue", desc: "SOC 2, ISO 27001, and AI Act audits happening simultaneously." },
    ],
    features: ["14 frameworks covered", "SAML SSO & SCIM", "Data residency (India/EU)", "Custom SLA 99.99%", "Dedicated CSM", "CI/CD compliance gate", "Audit log API", "Expert sign-off add-on"],
    ctaLabel: "Talk to Enterprise Sales",
  },
  "it-teams": {
    title: "IT Teams",
    headline: "Compliance that fits your development workflow.",
    description: "You shouldn't have to leave your IDE or CI/CD pipeline to deal with compliance. CompliVibe integrates directly into your stack — GitHub Actions, GitLab CI, API-first.",
    painPoints: [
      { title: "Context switching", desc: "Compliance work pulls developers out of their flow." },
      { title: "Manual processes", desc: "Evidence collection is copy-paste from production logs." },
      { title: "No automation", desc: "Compliance checks aren't part of your CI/CD pipeline." },
    ],
    features: ["CI/CD compliance gate", "REST API access", "GitHub/GitLab integration", "Automated evidence collection", "Developer-friendly docs", "Webhook notifications"],
    ctaLabel: "See the API Docs",
  },
  ciso: {
    title: "CISO",
    headline: "Real-time risk visibility across every AI system.",
    description: "You need to answer the board's questions about AI risk — not next quarter, now. CompliVibe gives you a live readiness score across every AI system and every framework your organization touches.",
    painPoints: [
      { title: "Board pressure", desc: "The board wants AI risk quantified — today." },
      { title: "Shadow AI", desc: "Teams deploy AI systems faster than you can assess them." },
      { title: "Framework proliferation", desc: "EU AI Act, DPDP, NIST, ISO 42001 — which matters most?" },
    ],
    features: ["Real-time readiness score", "Board-ready reports", "Risk heat map", "Fine exposure calculator", "Policy drift alerts", "Multi-framework view"],
    ctaLabel: "Book a CISO Briefing",
  },
  grc: {
    title: "GRC Teams",
    headline: "Governance, risk & compliance — unified for the AI era.",
    description: "Traditional GRC tools weren't built for AI regulation. CompliVibe maps AI-specific obligations, tracks evidence, and generates audit-ready documentation across every framework your GRC team manages.",
    painPoints: [
      { title: "Legacy GRC gaps", desc: "Your existing GRC tool doesn't understand AI Act Annex III categories." },
      { title: "Evidence fragmentation", desc: "Compliance evidence lives in 15 different systems." },
      { title: "Obligation tracking", desc: "Manually tracking 200+ obligations across frameworks is unsustainable." },
    ],
    features: ["Obligation tracker", "Evidence vault", "Cross-regulation mapping", "Audit export (PDF, JSON, CSV)", "Automated gap analysis", "Framework comparison view"],
    ctaLabel: "See GRC Integration",
  },
  healthcare: {
    title: "Healthcare",
    headline: "HIPAA meets EU AI Act. Patient data protection meets AI governance.",
    description: "Healthcare AI is high-risk by definition under the EU AI Act. CompliVibe maps your clinical AI systems against both patient data protection (HIPAA/DPDP) and AI governance (EU AI Act) simultaneously.",
    painPoints: [
      { title: "High-risk classification", desc: "Clinical AI systems are Annex III Category 5 — automatic high-risk." },
      { title: "Dual data protection", desc: "Patient data requires HIPAA + DPDP + GDPR compliance simultaneously." },
      { title: "FDA intersection", desc: "Software as Medical Device (SaMD) regulations add another layer." },
    ],
    features: ["Clinical AI classification", "HIPAA + AI Act mapping", "Patient consent tracking", "Annex IV for medical AI", "Data residency controls", "Audit-ready documentation"],
    ctaLabel: "See Healthcare Solution",
  },
  fintech: {
    title: "Fintech",
    headline: "RBI SAR + GDPR + EU AI Act. One compliance platform.",
    description: "Credit scoring, fraud detection, and lending AI are high-risk under both EU and Indian regulations. CompliVibe handles the regulatory intersection that keeps fintech compliance teams up at night.",
    painPoints: [
      { title: "Credit scoring AI", desc: "Annex III Category 5(b) — automatic high-risk under EU AI Act." },
      { title: "RBI requirements", desc: "Reserve Bank of India self-assessment reports require AI governance proof." },
      { title: "Cross-border payments", desc: "GDPR data transfers + DPDP localization + AI Act transparency." },
    ],
    features: ["Fintech risk classification", "RBI SAR alignment", "GDPR Article 22 mapping", "Explainability documentation", "Cross-border data compliance", "Real-time model monitoring"],
    ctaLabel: "See Fintech Solution",
  },
  saas: {
    title: "SaaS",
    headline: "Unblock EU enterprise deals. Prove compliance before they ask.",
    description: "Your EU prospects are adding AI Act compliance requirements to procurement questionnaires. CompliVibe generates the compliance documentation you need to close deals — not lose them.",
    painPoints: [
      { title: "Procurement blockers", desc: "EU enterprise deals stall when you can't prove AI Act compliance." },
      { title: "Sales cycle delays", desc: "Compliance questionnaires add weeks to every enterprise deal." },
      { title: "Competitive disadvantage", desc: "Competitors with compliance proof are winning the deals you lose." },
    ],
    features: ["Sales-ready compliance docs", "Annex IV generation", "Trust badge for website", "Readiness score sharing", "Compliance questionnaire auto-fill", "EU Export Pack"],
    ctaLabel: "Start Free — Unblock Deals",
  },
  government: {
    title: "Government",
    headline: "Public sector AI governance. Transparency by design.",
    description: "Government AI systems affect citizens directly. Transparency, fairness, and accountability aren't optional — they're legally required. CompliVibe helps agencies meet AI governance mandates.",
    painPoints: [
      { title: "Citizen trust", desc: "Public AI systems require transparency and explainability." },
      { title: "Procurement mandates", desc: "Government AI procurement increasingly requires AI Act alignment." },
      { title: "Accountability gaps", desc: "Who's responsible when a government AI system makes a wrong decision?" },
    ],
    features: ["Transparency documentation", "Citizen impact assessment", "Human oversight controls", "Public audit reports", "Multi-language support", "Data sovereignty controls"],
    ctaLabel: "Talk to Public Sector Team",
  },
  travel: {
    title: "Travel & Tourism",
    headline: "Cross-border data compliance for global travel AI.",
    description: "Travel platforms process passenger data across dozens of jurisdictions. Your booking AI, personalization engines, and pricing algorithms all touch regulated data — CompliVibe keeps you compliant everywhere.",
    painPoints: [
      { title: "Cross-border data flows", desc: "Passenger data moves between India, EU, US, and APAC constantly." },
      { title: "Dynamic pricing AI", desc: "Algorithmic pricing faces EU transparency requirements." },
      { title: "PNR data regulations", desc: "Passenger Name Record regulations vary by jurisdiction." },
    ],
    features: ["Cross-border data mapping", "Dynamic pricing compliance", "PNR regulation tracking", "Multi-jurisdiction consent", "Automated DPIA generation", "Travel industry templates"],
    ctaLabel: "See Travel Solution",
  },
  "eu-export": {
    title: "EU Export Pack",
    headline: "Everything you need to sell AI products to EU customers.",
    description: "An Indian SaaS company selling to EU enterprises? You need Annex IV documentation, GDPR alignment, data transfer mechanisms, and a compliance score your prospects trust. This pack has it all.",
    painPoints: [
      { title: "Market access blocked", desc: "EU customers require AI Act proof before procurement." },
      { title: "Data transfer complexity", desc: "India-to-EU data transfers require adequate safeguards." },
      { title: "Documentation gaps", desc: "EU expects technical documentation you've never been asked for before." },
    ],
    features: ["Full Annex IV documentation", "GDPR data transfer assessment", "Standard Contractual Clauses", "EU-ready compliance badge", "Sales enablement docs", "Quarterly compliance review"],
    ctaLabel: "Get the EU Export Pack",
  },
  "india-first": {
    title: "India-First Onboarding",
    headline: "DPDP-native compliance. Built for Indian companies.",
    description: "Start with India's Digital Personal Data Protection Act. Add Bhashini consent management. Configure local data residency. Then expand to EU, US, and beyond — on your timeline.",
    painPoints: [
      { title: "DPDP uncertainty", desc: "The rules are new and evolving. What's required today may change tomorrow." },
      { title: "Vernacular consent", desc: "Indian regulations require consent in the user's preferred language." },
      { title: "Data localization", desc: "Government may mandate India-only data storage for certain categories." },
    ],
    features: ["DPDP obligation mapping", "Bhashini consent module", "India data residency", "Hindi + 10 language support", "RBI SAR alignment", "48-hour DPDP update engine"],
    ctaLabel: "Start India-First Setup",
  },
  "us-saas": {
    title: "US SaaS Onboarding",
    headline: "SOC 2 + AI Act alignment for US companies going global.",
    description: "You've already done SOC 2. Now your EU and Indian customers want AI-specific compliance. CompliVibe maps your existing SOC 2 controls to AI Act requirements — no starting from scratch.",
    painPoints: [
      { title: "SOC 2 isn't enough", desc: "EU customers want AI Act proof on top of your SOC 2 report." },
      { title: "Framework multiplication", desc: "SOC 2 + AI Act + GDPR + DPDP = four compliance programs to manage." },
      { title: "Global expansion", desc: "Every new market adds regulatory requirements." },
    ],
    features: ["SOC 2 → AI Act mapping", "Existing control reuse", "Multi-framework dashboard", "GDPR + DPDP alignment", "International expansion toolkit", "Unified evidence vault"],
    ctaLabel: "Start US SaaS Setup",
  },
};

const solutionSlugAliases: Record<string, string> = {
  govt: "government",
};

const solutionSlugs = [
  "startup",
  "mid-market",
  "enterprise",
  "it-teams",
  "ciso",
  "grc",
  "healthcare",
  "fintech",
  "saas",
  "govt",
  "travel",
  "eu-export",
  "india-first",
  "us-saas",
  "government",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolvedSlug = solutionSlugAliases[slug] ?? slug;
  if (!solutionSlugs.includes(slug) && !solutionSlugs.includes(resolvedSlug)) notFound();
  const data = solutions[resolvedSlug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,196,140,0.12) 0%, rgba(0,112,243,0.06) 40%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-20 flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-xs text-[#888]">
              <Shield className="h-3.5 w-3.5 text-compliance-green" />
              {data.title}
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
              {data.headline}
            </h1>
            <p className="max-w-xl text-[#666] text-base leading-relaxed">{data.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
                {data.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/book-demo" className="inline-flex h-11 items-center rounded-full border border-white/[0.15] bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
                Book a Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20">
          <h2 className="text-xl font-bold text-white mb-8">The challenges you face</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.painPoints.map((point, i) => (
              <div key={i} className="rounded-2xl border border-urgency/10 bg-urgency/[0.03] p-6">
                <div className="text-sm font-semibold text-urgency mb-2">{point.title}</div>
                <p className="text-sm text-[#666] leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20">
          <h2 className="text-xl font-bold text-white mb-8">How CompliVibe solves it</h2>
          <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-compliance-green flex-shrink-0" />
                  <span className="text-[#888]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-[1200px] px-6 pb-24">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-compliance-green/5 to-transparent p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to get compliant?</h2>
            <p className="text-[#666] max-w-md mx-auto mb-8">
              Start free, upgrade when you need more. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors">
                {data.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/solutions" className="inline-flex h-12 items-center rounded-full border border-white/[0.15] bg-white/[0.04] px-8 text-sm font-semibold text-white hover:bg-white/[0.08] transition-all">
                See All Solutions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
