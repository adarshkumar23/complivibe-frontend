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
    images: [{ url: "https://complivibe.in/og-placeholder.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | CompliVibe",
    images: ["https://complivibe.in/og-placeholder.png"],
  },
};

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-[#888] leading-relaxed">
            This policy explains what cookies CompliVibe uses, why, and how you can control them.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <section className="border-t border-white/[0.06] pt-8">
            <h2 className="text-white font-semibold text-lg mb-4">1. What cookies we use</h2>
            <p className="text-[#888] text-sm leading-relaxed mb-4">
              We currently use <strong className="text-white">essential cookies only</strong>. These are strictly necessary for the platform to function and cannot be disabled.
            </p>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#555]">Cookie</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#555]">Purpose</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#555]">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-white">session_id</td>
                    <td className="px-4 py-3 text-[#888] text-xs">Maintains your login session</td>
                    <td className="px-4 py-3 text-[#888] text-xs">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-white">csrf_token</td>
                    <td className="px-4 py-3 text-[#888] text-xs">Prevents cross-site request forgery attacks</td>
                    <td className="px-4 py-3 text-[#888] text-xs">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-white">cv_pref</td>
                    <td className="px-4 py-3 text-[#888] text-xs">Stores your UI preferences (e.g. sidebar state)</td>
                    <td className="px-4 py-3 text-[#888] text-xs">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#888] text-sm leading-relaxed mt-4">
              We do not use advertising cookies, tracking pixels, or third-party analytics cookies that share data with advertising networks.
            </p>
          </section>

          <section className="border-t border-white/[0.06] pt-8">
            <h2 className="text-white font-semibold text-lg mb-4">2. How to control cookies</h2>
            <p className="text-[#888] text-sm leading-relaxed mb-3">
              Since we use only essential cookies, disabling them may affect your ability to use the platform (e.g. you will be unable to stay logged in). You can control cookies through your browser settings:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Chrome: Settings → Privacy and security → Cookies and other site data",
                "Firefox: Settings → Privacy & Security → Cookies and Site Data",
                "Safari: Preferences → Privacy → Manage Website Data",
                "Edge: Settings → Privacy, search, and services → Cookies",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#888]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-compliance-green" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-white/[0.06] pt-8">
            <h2 className="text-white font-semibold text-lg mb-4">3. Contact</h2>
            <p className="text-[#888] text-sm leading-relaxed">
              For questions about our cookie use, contact{" "}
              <a href="mailto:legal@complivibe.in" className="text-compliance-green hover:underline">
                legal@complivibe.in
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
