import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CompliVibe",
  description: "CompliVibe privacy policy covering data collection, use, retention, your DPDP and GDPR rights, and third-party processors.",
  alternates: { canonical: "https://complivibe.in/legal/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | CompliVibe",
    description: "How CompliVibe collects, uses, and protects your data — compliant with India DPDP and EU GDPR.",
    url: "https://complivibe.in/legal/privacy-policy",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const sections = [
  {
    title: "1. What we collect",
    content: `We collect information you provide when creating an account (name, work email, company name), information about your AI systems that you input for compliance assessment (system descriptions, use cases, data subjects), usage data (pages visited, features used, session duration), and technical data (IP address, browser type, device identifiers).

We do not collect sensitive personal data beyond what is necessary for compliance assessment. We do not sell your data to third parties.`,
  },
  {
    title: "2. How we use it",
    content: `We use collected data to: (a) provide and improve the CompliVibe platform, including AI system classification and obligation mapping; (b) send you regulatory updates and product notifications (with your consent); (c) respond to support requests; (d) comply with legal obligations; and (e) conduct internal analytics to improve platform accuracy and performance.

We process your data on the legal bases of contract performance (to provide the service you subscribed to), legitimate interests (platform improvement and security), and consent (marketing communications).`,
  },
  {
    title: "3. Data retention",
    content: `We retain account data for as long as your account is active, plus 30 days after deletion to allow recovery. Compliance assessment data (AI system descriptions, classifications, obligation mappings) is retained for the duration of your subscription and deleted within 60 days of account closure upon request.

Anonymised and aggregated analytics data may be retained indefinitely as it cannot identify individuals. You may request deletion of your personal data at any time by emailing legal@complivibe.in.`,
  },
  {
    title: "4. Your rights",
    content: `Under India's Digital Personal Data Protection Act 2023 (DPDP), you have the right to: access your personal data; correct inaccurate data; erase your data (subject to legal retention obligations); nominate a person to exercise rights on your behalf in case of death or incapacity; and grievance redressal.

Under EU GDPR (applicable to EU residents), you additionally have rights to: data portability; restriction of processing; object to processing based on legitimate interests; and lodge a complaint with your local supervisory authority.

To exercise any of these rights, contact us at legal@complivibe.in. We respond within 30 days.`,
  },
  {
    title: "5. Third-party processors",
    content: `We work with carefully selected processors to operate the platform. Current processors include: Vercel (infrastructure hosting, US/EU), Supabase (database, EU region), Resend (transactional email, US), and PostHog (product analytics, EU). All processors operate under Data Processing Agreements and are bound to handle data only per our instructions.

We do not use third-party processors for advertising purposes. A full list of sub-processors is available on request from legal@complivibe.in.`,
  },
  {
    title: "6. Contact",
    content: `For privacy-related queries, requests, or complaints, contact:

CompliVibe (operated by CompliVibe Private Limited)
Email: legal@complivibe.in
Location: Gurugram, Haryana, India

If you are an EU resident and are not satisfied with our response, you have the right to lodge a complaint with your national data protection authority.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[800px] px-6 py-24">
        <div className="mb-12">
          <div className="text-xs text-[#555] mb-3">Last updated: May 2026</div>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#888] leading-relaxed">
            This policy explains how CompliVibe (operated by CompliVibe Private Limited) collects, uses, and protects your personal data. We process data in compliance with India&apos;s Digital Personal Data Protection Act 2023 (DPDP) and the EU General Data Protection Regulation (GDPR).
          </p>
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
      </main>
      <Footer />
    </div>
  );
}
