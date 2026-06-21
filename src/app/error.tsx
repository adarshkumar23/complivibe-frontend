"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="cv-page aurora-bg flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#f59e0b]/25 bg-[#f59e0b]/10">
        <AlertTriangle className="h-6 w-6 text-[#f59e0b]" />
      </div>
      <h1 className="mb-3 text-2xl font-bold tracking-tight text-[var(--cv-ink)]">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-sm text-center text-sm text-[var(--cv-muted)]">
        An unexpected error occurred. If this persists, email{" "}
        <a
          href="mailto:contact@complivibe.in"
          className="font-medium text-[#2563eb] hover:opacity-80 dark:text-[#3b82f6]"
        >
          contact@complivibe.in
        </a>
      </p>
      <button
        onClick={reset}
        className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
        }}
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
