"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import {
  logout,
  subscribeToken,
  tokenSnapshot,
  tokenServerSnapshot,
} from "@/lib/adminApi";
import { secondaryButtonClass } from "@/components/adminUi";

/**
 * Header for /admin. The logout button appears only once a token exists, which
 * is read through `useSyncExternalStore` so signing in or out anywhere in the
 * panel updates it immediately — and so the prerendered HTML (no token) matches
 * the first client render.
 */
export default function AdminHeader() {
  const token = useSyncExternalStore(
    subscribeToken,
    tokenSnapshot,
    tokenServerSnapshot,
  );

  return (
    <header className="cv-blur-bar sticky top-0 z-40 border-b border-[var(--cv-border)] backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-tight text-[var(--cv-ink)]"
        >
          <ShieldCheck className="h-4 w-4 text-[var(--cv-blue)]" />
          CompliVibe Admin
        </Link>

        {token && (
          <button
            type="button"
            onClick={() => {
              logout();
              window.location.assign("/admin");
            }}
            className={`${secondaryButtonClass} h-9`}
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        )}
      </div>
    </header>
  );
}
