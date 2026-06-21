import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * PageShell — consistent light-first page wrapper for all secondary pages.
 * Server component so pages can keep their `metadata` exports.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cv-page">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
