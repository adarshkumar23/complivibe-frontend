import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | CompliVibe",
  description: "CompliVibe cookie policy — what cookies we use, why, and how to control them.",
  alternates: { canonical: "https://complivibe.in/legal/cookies" },
  openGraph: {
    title: "Cookie Policy | CompliVibe",
    description: "What cookies CompliVibe uses and how to control them.",
    url: "https://complivibe.in/legal/cookies",
    images: [{ url: "https://complivibe.in/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | CompliVibe",
    images: ["https://complivibe.in/og-image.svg"],
  },
};

export default function CookiePolicyPage() {
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
                Cookie Policy
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--cv-muted)]">
                This policy explains what cookies CompliVibe uses, why, and how you can control them.
              </p>
            </div>

            <div className="liquid-card glass-highlight p-7 md:p-9">
              <div className="flex flex-col gap-8">
                <section>
                  <h2 className="mb-3 text-lg font-semibold text-[var(--cv-ink)]">1. What cookies we use</h2>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--cv-muted)]">
                    We currently use <strong className="text-[var(--cv-ink)]">essential cookies only</strong>. These are strictly necessary for the platform to function and cannot be disabled.
                  </p>
                  <div className="overflow-hidden rounded-xl border border-[var(--cv-border)]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--cv-border)] bg-[var(--cv-surface)]">
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--cv-muted)]">Cookie</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--cv-muted)]">Purpose</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--cv-muted)]">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--cv-border)]">
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs text-[var(--cv-ink)]">session_id</td>
                          <td className="px-4 py-3 text-xs text-[var(--cv-muted)]">Maintains your login session</td>
                          <td className="px-4 py-3 text-xs text-[var(--cv-muted)]">Session</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs text-[var(--cv-ink)]">csrf_token</td>
                          <td className="px-4 py-3 text-xs text-[var(--cv-muted)]">Prevents cross-site request forgery attacks</td>
                          <td className="px-4 py-3 text-xs text-[var(--cv-muted)]">Session</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs text-[var(--cv-ink)]">cv_pref</td>
                          <td className="px-4 py-3 text-xs text-[var(--cv-muted)]">Stores your UI preferences (e.g. sidebar state)</td>
                          <td className="px-4 py-3 text-xs text-[var(--cv-muted)]">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--cv-muted)]">
                    We do not use advertising cookies, tracking pixels, or third-party analytics cookies that share data with advertising networks.
                  </p>
                </section>

                <section className="border-t border-[var(--cv-border)] pt-7">
                  <h2 className="mb-3 text-lg font-semibold text-[var(--cv-ink)]">2. How to control cookies</h2>
                  <p className="mb-3 text-sm leading-relaxed text-[var(--cv-muted)]">
                    Since we use only essential cookies, disabling them may affect your ability to use the platform (e.g. you will be unable to stay logged in). You can control cookies through your browser settings:
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Chrome: Settings → Privacy and security → Cookies and other site data",
                      "Firefox: Settings → Privacy & Security → Cookies and Site Data",
                      "Safari: Preferences → Privacy → Manage Website Data",
                      "Edge: Settings → Privacy, search, and services → Cookies",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--cv-muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#10b981]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="border-t border-[var(--cv-border)] pt-7">
                  <h2 className="mb-3 text-lg font-semibold text-[var(--cv-ink)]">3. Contact</h2>
                  <p className="text-sm leading-relaxed text-[var(--cv-muted)]">
                    For questions about our cookie use, contact{" "}
                    <a href="mailto:legal@complivibe.in" className="font-medium text-[#2563eb] hover:opacity-80 dark:text-[#3b82f6]">
                      legal@complivibe.in
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
