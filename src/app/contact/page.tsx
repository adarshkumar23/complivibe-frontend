import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageBentoCard from "@/components/PageBentoCard";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "Contact | CompliVibe",
  description:
    "Get in touch with CompliVibe — sales, support, and partnerships for AI Trust Infrastructure.",
  alternates: { canonical: "https://complivibe.in/contact" },
};

const channels = [
  { icon: "MessageSquare", accent: "#2563eb", title: "Sales", body: "See how CompliVibe becomes your AI trust layer.", href: "/book-demo", hrefLabel: "Book a demo" },
  { icon: "LifeBuoy", accent: "#10b981", title: "Support", body: "Questions about your account or the platform? We're here.", href: "mailto:contact@complivibe.in", hrefLabel: "Email support" },
  { icon: "Handshake", accent: "#7c3aed", title: "Partnerships", body: "Building in the AI trust ecosystem? Let's talk.", href: "mailto:contact@complivibe.in", hrefLabel: "Email us" },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Contact"
        title="Let's build your AI trust"
        highlight="layer."
        subtitle="Whether you're evaluating CompliVibe, need support, or want to partner, we'd love to hear from you."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />

      <PageSection kicker="Reach us" title="How can we help?">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {channels.map((c) => (
            <PageBentoCard key={c.title} icon={c.icon} accent={c.accent} title={c.title} body={c.body} href={c.href} hrefLabel={c.hrefLabel} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[var(--cv-muted)]">
          Prefer email? Reach us directly at{" "}
          <a href="mailto:contact@complivibe.in" className="font-semibold text-[#2563eb] dark:text-[#3b82f6]">
            contact@complivibe.in
          </a>
          .
        </p>
      </PageSection>

      <PageCTA
        title="See CompliVibe in action."
        subtitle="Book a short walkthrough of governance, evidence, observability, and trust reporting."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Start Trust Scan", href: "/score" }}
      />
    </PageShell>
  );
}
