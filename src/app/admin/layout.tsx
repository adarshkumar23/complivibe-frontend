import type { Metadata } from "next";
import AdminHeader from "@/components/AdminHeader";

/**
 * Minimal shell for the internal admin panel.
 *
 * Deliberately NOT PageShell/Nav/Footer — this is a tool, not a marketing page,
 * and it should never carry the public site's navigation. Kept a server
 * component so the noindex metadata below is emitted into the exported HTML.
 */
export const metadata: Metadata = {
  title: "CompliVibe Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--cv-bg)] text-[var(--cv-ink)]">
      <AdminHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {children}
      </main>
    </div>
  );
}
