"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { CMS_API_URL, CmsApiError, login } from "@/lib/adminApi";
import {
  inputClass,
  labelClass,
  panelClass,
  primaryButtonClass,
  primaryButtonStyle,
} from "@/components/adminUi";

/** Email + password against POST /cms-api/auth/login. */
export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // `login` stores the token, which notifies the token store and flips the
      // page over to the dashboard — no navigation needed.
      await login(email.trim(), password);
    } catch (caught) {
      setError(
        caught instanceof CmsApiError
          ? caught.message
          : "Something went wrong. Try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center">
      <div className={`${panelClass} p-6`}>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)]">
          <Lock className="h-4 w-4 text-[var(--cv-blue)]" />
        </span>

        <h1 className="mt-4 text-[20px] font-semibold tracking-tight text-[var(--cv-ink)]">
          Sign in
        </h1>
        <p className="mt-1 text-[13px] text-[var(--cv-muted)]">
          Internal CMS access. Admin accounts only.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-email" className={labelClass}>
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="admin@complivibe.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-password" className={labelClass}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="cv-alert-danger rounded-lg border px-3 py-2 text-[12px]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={primaryButtonClass}
            style={primaryButtonStyle}
          >
            {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-[var(--cv-muted)]">
        {CMS_API_URL}
      </p>
    </div>
  );
}
