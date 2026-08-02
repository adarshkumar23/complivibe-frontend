import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import FaqAccordion from "@/components/FaqAccordion";
import ContentEmptyState from "@/components/ContentEmptyState";
import { faqs } from "@/content/faq/faq.generated";
import { sortByPublished, toPlainText } from "@/lib/content";

const SITE_URL = "https://complivibe.in";
const ACCENT = "var(--cv-cyan)";

export const metadata: Metadata = {
  title: "FAQ | CompliVibe",
  description:
    "Answers to common questions about CompliVibe — evidence storage, security, frameworks, pricing, and how AI governance works in practice.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  const items = sortByPublished(faqs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE_URL}/faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(item.body) },
    })),
  };

  return (
    <PageShell>
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <PageHero
        kicker="FAQ"
        title="Questions we get asked"
        highlight="most often."
        subtitle="How evidence is stored, which frameworks we map, what happens to your data, and how teams actually run governance on CompliVibe."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Talk to the team", href: "/contact" }}
      />

      {/*
        A hand-rolled section rather than <PageSection> on purpose: PageSection
        sets `overflow-hidden`, which turns it into a scroll container and stops
        the accordion's category jump-links from sticking. Spacing and the
        heading block match PageSection exactly, so nothing looks different.
      */}
      <section className="py-20 md:py-28">
        <div className="cv-container">
          <div className="motion-safe-reveal mx-auto max-w-2xl text-center">
            <span className="section-kicker mb-4">Answers</span>
            <h2 className="section-title mt-4 text-balance">
              Everything, in plain language
            </h2>
          </div>

          <div className="mt-12">
            {items.length > 0 ? (
              <FaqAccordion items={items} accent={ACCENT} />
            ) : (
              <ContentEmptyState
                accent={ACCENT}
                title="We're collecting the questions teams ask most."
                body="Nothing published here yet. Ask us directly in the meantime — we answer every one, and the good ones end up on this page."
              />
            )}
          </div>
        </div>
      </section>

      <PageCTA
        title="Still have a question?"
        subtitle="Talk to the team building CompliVibe. We'll walk you through the platform on your own AI systems."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
