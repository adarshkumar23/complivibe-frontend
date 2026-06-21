"use client";

import Link from "next/link";

import WaitlistForm from "../waitlist/WaitlistForm";

export default function SignupForm() {
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

      <Link
        href="/book-demo"
        className="text-sm font-medium text-[#2563eb] transition-colors hover:opacity-80 dark:text-[#3b82f6]"
      >
        Need a demo instead? Book here →
      </Link>
    </div>
  );
}
