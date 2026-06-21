import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Boxes, ShieldCheck, Archive, Activity, FileBarChart } from "lucide-react";
import BookDemoForm from "./BookDemoForm";

export const metadata: Metadata = {
  title: "Book a Demo | CompliVibe",
  description:
    "See CompliVibe in action — a short walkthrough of AI governance, evidence automation, data observability, and trust reporting.",
  alternates: { canonical: "https://complivibe.in/book-demo" },
  openGraph: {
    title: "Book a Demo | CompliVibe",
    description:
      "See CompliVibe in action — a short walkthrough of AI governance, evidence automation, data observability, and trust reporting.",
    url: "https://complivibe.in/book-demo",
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo | CompliVibe",
    description:
      "See CompliVibe in action — a short walkthrough of AI governance, evidence automation, data observability, and trust reporting.",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

const seeItems = [
  { icon: Boxes, accent: "#2563eb", text: "Map AI systems and owners" },
  { icon: ShieldCheck, accent: "#7c3aed", text: "Review risks and controls" },
  { icon: Archive, accent: "#10b981", text: "See evidence automation" },
  { icon: Activity, accent: "#06b6d4", text: "Explore observability signals" },
  { icon: FileBarChart, accent: "#f59e0b", text: "Generate trust reports" },
];

export default function BookDemoPage() {
  return (
    <div className="cv-page">
      <Nav />
      <main>
        <section className="aurora-bg relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="cv-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-kicker mb-5">Book a Demo</span>
              <h1
                className="font-semibold tracking-tight text-[var(--cv-ink)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.07 }}
              >
                See CompliVibe{" "}
                <span className="text-gradient-trust">in action</span>.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-relaxed text-[var(--cv-muted)] md:text-[1.125rem]">
                A short walkthrough of AI governance, evidence automation, data observability, and
                trust reporting.
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden pb-24 md:pb-32">
          <div className="cv-container">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
              {/* Left: what you'll see */}
              <div className="liquid-card glass-highlight p-7 md:p-8 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">
                  What you&apos;ll see
                </h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {seeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-3.5">
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                          style={{ backgroundColor: `${item.accent}14`, borderColor: `${item.accent}33` }}
                        >
                          <Icon className="h-[18px] w-[18px]" style={{ color: item.accent }} />
                        </span>
                        <span className="pt-1 text-sm leading-relaxed text-[var(--cv-muted)]">
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: form */}
              <div className="liquid-card glass-highlight p-7 md:p-8">
                <h2 className="text-lg font-bold tracking-tight text-[var(--cv-ink)]">
                  Book your AI trust walkthrough.
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--cv-muted)]">
                  Tell us about your AI systems and we&apos;ll tailor the session.
                </p>
                <div className="mt-6">
                  <BookDemoForm />
                </div>
                <p className="mt-6 text-center text-sm text-[var(--cv-muted)]">
                  Prefer email?{" "}
                  <a
                    href="mailto:contact@complivibe.in"
                    className="font-medium text-[#2563eb] transition-colors hover:opacity-80 dark:text-[#3b82f6]"
                  >
                    contact@complivibe.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
