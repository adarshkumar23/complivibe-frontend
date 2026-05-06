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
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
};

const sections = [
  {
    title: "1. Parties",
    content: `This Data Processing Agreement ("DPA") is entered into between the customer entity identified in the CompliVibe subscription order form ("Controller") and ValersAI Connect Pvt. Ltd., operating as CompliVibe, Gurugram, India ("Processor").

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
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[800px] px-6 py-24">
        <div className="mb-12">
          <div className="text-xs text-[#555] mb-3">Last updated: May 2026</div>
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Data Processing Agreement
          </h1>
          <p className="text-[#888] leading-relaxed mb-6">
            For EU customers requiring a GDPR-compliant DPA governing how CompliVibe processes personal data on your behalf.
          </p>
          <div className="rounded-xl border border-compliance-green/20 bg-compliance-green/[0.03] p-4 text-sm text-[#888]">
            To execute a signed DPA for your organisation, email{" "}
            <a href="mailto:legal@complivibe.in?subject=DPA Request" className="text-compliance-green hover:underline">
              legal@complivibe.in
            </a>{" "}
            with subject line <span className="font-mono text-white">DPA Request</span>. We respond within 5 business days.
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.title} className="border-t border-white/[0.06] pt-8">
              <h2 className="text-white font-semibold text-lg mb-4">{s.title}</h2>
              {s.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-[#888] text-sm leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
          <div>
            <p className="text-white font-semibold mb-1">Ready to execute a signed DPA?</p>
            <p className="text-[#888] text-sm">We&apos;ll have a signed copy back to you within 5 business days.</p>
          </div>
          <a
            href="mailto:legal@complivibe.in?subject=DPA Request"
            className="inline-flex shrink-0 h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
          >
            Request DPA
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
