"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

import WaitlistForm from "../waitlist/WaitlistForm";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-[var(--cv-border)] bg-[var(--cv-surface)] p-6 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-[var(--cv-ink)]">
          New registrations are currently invite-only.
        </p>
        <p className="text-sm text-[var(--cv-muted)]">
          Join the waitlist to get early access to the AI trust workspace.
        </p>
      </div>

      <WaitlistForm />

      {/* Real sign-in for existing customers → app workspace */}
      <div className="flex w-full items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-[var(--cv-border)]" />
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--cv-muted)]">
          Already using CompliVibe?
        </span>
        <span className="h-px flex-1 bg-[var(--cv-border)]" />
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <a
          href="https://app.complivibe.in/login"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--cv-ink)] transition-colors hover:border-[#2563eb]/40"
        >
          Sign in to CompliVibe App
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="text-xs text-[var(--cv-muted)]">
          Existing customers can continue to the app workspace.
        </p>
      </div>

      <Link
        href="/book-demo"
        className="text-sm font-medium text-[#2563eb] transition-colors hover:opacity-80 dark:text-[#3b82f6]"
      >
        Need a demo instead? Book here →
      </Link>
    </div>
  );
}
