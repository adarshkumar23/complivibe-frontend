import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Lock, ShieldCheck, FileCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security | CompliVibe",
  description: "CompliVibe security practices: 256-bit AES encryption, TLS 1.3, role-based access controls, DPDP-aligned data handling, and vulnerability disclosure.",
  alternates: { canonical: "https://complivibe.in/security" },
  openGraph: {
    title: "Security | CompliVibe",
    description: "How CompliVibe protects your compliance data — encryption, access controls, and responsible disclosure.",
    url: "https://complivibe.in/security",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security | CompliVibe",
    description: "How CompliVibe protects your compliance data — encryption, access controls, and responsible disclosure.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const sections = [
  {
    icon: Lock,
    title: "Data Encryption",
    color: "text-compliance-green",
    border: "border-compliance-green/20",
    bg: "bg-compliance-green/5",
    points: [
      "256-bit AES encryption for all data at rest",
      "TLS 1.3 for all data in transit",
      "Encryption keys managed with industry-standard rotation policies",
      "No unencrypted sensitive data stored or transmitted",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Access Controls",
    color: "text-cv-blue",
    border: "border-cv-blue/20",
    bg: "bg-cv-blue/5",
    points: [
      "Role-based access control (RBAC) across all platform features",
      "Audit logs for every user action and data access event",
      "Multi-factor authentication (MFA) support",
      "Automatic session expiry and token rotation",
    ],
  },
  {
    icon: FileCheck,
    title: "Compliance",
    color: "text-india-orange",
    border: "border-india-orange/20",
    bg: "bg-india-orange/5",
    points: [
      "DPDP-aligned data handling and purpose limitation",
      "EU GDPR Data Processing Agreement (DPA) available on request",
      "Data residency options for sensitive compliance workloads",
      "Regular internal privacy impact assessments",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability Disclosure",
    color: "text-urgency",
    border: "border-urgency/20",
    bg: "bg-urgency/5",
    points: [
      "Responsible disclosure program — we respond within 72 hours",
      "Security researchers are credited for valid disclosures",
      "No legal action against good-faith security research",
    ],
    cta: { label: "Report a vulnerability", href: "mailto:legal@complivibe.in?subject=Vulnerability Disclosure" },
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[900px] px-6 py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Security at CompliVibe
          </h1>
          <p className="text-lg text-[#888] max-w-[520px] mx-auto leading-relaxed">
            We handle compliance data — the kind that goes into regulatory audits and procurement reviews. Security is not optional.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} border ${s.border} mb-5`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <h2 className="text-white font-semibold text-lg mb-4">{s.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-[#888]">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.color.replace("text-", "bg-")}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                {s.cta && (
                  <a
                    href={s.cta.href}
                    className="mt-5 inline-flex text-sm text-urgency hover:underline"
                  >
                    {s.cta.label} →
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* SOC 2 note */}
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-[#888]">
            <span className="text-white font-medium">SOC 2 Type II audit in progress.</span>{" "}
            Expected Q4 2026. For security questions, contact{" "}
            <a href="mailto:legal@complivibe.in" className="text-compliance-green hover:underline">
              legal@complivibe.in
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
