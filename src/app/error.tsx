"use client";

import { useEffect } from "react";
import { Shield, RefreshCw } from "lucide-react";

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-urgency/10 border border-urgency/20 mb-6">
        <Shield className="h-6 w-6 text-urgency" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
      <p className="text-[#888] text-sm mb-8 text-center max-w-sm">
        An unexpected error occurred. If this persists, email{" "}
        <a href="mailto:contact@complivibe.in" className="text-compliance-green hover:underline">
          contact@complivibe.in
        </a>
      </p>
      <button
        onClick={reset}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
