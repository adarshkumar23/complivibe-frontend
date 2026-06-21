import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Processing Agreement | CompliVibe",
  description: "CompliVibe Data Processing Agreement (DPA) for EU customers requiring a GDPR-compliant agreement governing personal data processing.",
  alternates: { canonical: "https://complivibe.in/legal/dpa" },
  openGraph: {
    title: "Data Processing Agreement | CompliVibe",
    description: "GDPR-compliant DPA for EU customers using the CompliVibe compliance platform.",
    url: "https://complivibe.in/legal/dpa",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Processing Agreement | CompliVibe",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

const sections = [
  {
    title: "1. Parties",
    content: `This Data Processing Agreement ("DPA") is entered into between the customer entity identified in the CompliVibe subscription order form ("Controller") and CompliVibe Private Limited, operating as CompliVibe, Gurugram, India ("Processor").

This DPA supplements the CompliVibe Terms of Service and governs the processing of personal data by CompliVibe on behalf of the Controller in connection with the provision of the CompliVibe platform.`,
  },
  {
    title: "2. Subject matter and duration",
    content: `CompliVibe processes personal data as necessary to provide the compliance management services described in the Terms of Service, including: AI system compliance assessment, obligation mapping, Annex IV document generation, and regulatory update delivery.

Processing continues for the duration of the subscription agreement and for any post-termination retention period required by applicable law or agreed in writing.`,
  },
  {
    title: "3. Nature and purpose of processing",
    content: `CompliVibe processes the following categories of personal data on behalf of the Controller:

(a) Account data: names, email addresses, and job titles of Controller's employees who access the platform.
(b) Compliance input data: descriptions of AI systems, use cases, and data subjects provided by the Controller for assessment purposes.
(c) Usage data: logs of platform actions taken by the Controller's users.

The purpose of processing is solely to provide, maintain, and improve the CompliVibe platform as described in the Terms of Service. CompliVibe does not process personal data for its own purposes or for advertising.`,
  },
  {
    title: "4. Controller obligations",
    content: `The Controller warrants that: (a) it has the legal basis to provide personal data to CompliVibe for processing; (b) it will comply with its own GDPR and DPDP obligations as a data controller; (c) it will notify CompliVibe promptly of any changes to processing instructions; and (d) it has informed relevant data subjects of the engagement of CompliVibe as a processor where required.`,
  },
  {
    title: "5. Processor obligations",
    content: `CompliVibe agrees to: (a) process personal data only on documented instructions from the Controller; (b) ensure all personnel with access to personal data are bound by confidentiality obligations; (c) implement technical and organisational security measures as described in our Security page; (d) assist the Controller in responding to data subject rights requests; (e) notify the Controller without undue delay of any personal data breach; (f) delete or return all personal data upon termination of the agreement; and (g) make available all information necessary to demonstrate compliance with this DPA.

Sub-processors: CompliVibe engages sub-processors as listed in our Privacy Policy. We will notify the Controller of any intended changes to sub-processors and give the Controller the opportunity to object.`,
  },
  {
    title: "6. International transfers",
    content: `Where processing involves a transfer of personal data from the EU/EEA to a third country (including India), such transfers are conducted using the Standard Contractual Clauses (SCCs) adopted by the European Commission, or other adequacy mechanisms as applicable.

For EU customers, the Module Two (Controller to Processor) SCCs are hereby incorporated by reference into this DPA. CompliVibe implements supplementary measures including encryption at rest and in transit as described in our Security documentation.`,
  },
];

export default function DPAPage() {
  return (
    <div className="cv-page">
      <Nav />
      <main className="aurora-bg relative overflow-hidden">
        <div className="cv-container py-28 md:py-32">
          <div className="mx-auto max-w-[820px]">
            <div className="mb-10">
              <span className="section-kicker mb-4">Legal</span>
              <div className="mb-3 text-xs text-[var(--cv-muted)]">Last updated: May 2026</div>
              <h1
                className="font-semibold tracking-tight text-[var(--cv-ink)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Data Processing Agreement
              </h1>
              <p className="mb-6 mt-4 text-[15px] leading-relaxed text-[var(--cv-muted)]">
                For EU customers requiring a GDPR-aligned DPA governing how CompliVibe processes personal data on your behalf.
              </p>
              <div className="rounded-xl border border-[#10b981]/25 bg-[#10b981]/[0.06] p-4 text-sm text-[var(--cv-muted)]">
                To execute a signed DPA for your organisation, email{" "}
                <a href="mailto:legal@complivibe.in?subject=DPA Request" className="font-medium text-[#0f9b6c] hover:opacity-80 dark:text-[#34d399]">
                  legal@complivibe.in
                </a>{" "}
                with subject line <span className="font-mono text-[var(--cv-ink)]">DPA Request</span>. We respond within 5 business days.
              </div>
            </div>

            <div className="liquid-card glass-highlight p-7 md:p-9">
              <div className="flex flex-col gap-8">
                {sections.map((s) => (
                  <section
                    key={s.title}
                    className="border-t border-[var(--cv-border)] pt-7 first:border-t-0 first:pt-0"
                  >
                    <h2 className="mb-3 text-lg font-semibold text-[var(--cv-ink)]">{s.title}</h2>
                    {s.content.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-3 text-sm leading-relaxed text-[var(--cv-muted)] last:mb-0">
                        {para}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>

            <div className="liquid-panel mt-10 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
              <div>
                <p className="mb-1 font-semibold text-[var(--cv-ink)]">Ready to execute a signed DPA?</p>
                <p className="text-sm text-[var(--cv-muted)]">We&apos;ll have a signed copy back to you within 5 business days.</p>
              </div>
              <a
                href="mailto:legal@complivibe.in?subject=DPA Request"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
                }}
              >
                Request DPA
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
