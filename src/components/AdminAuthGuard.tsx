"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getToken, me } from "@/lib/adminApi";

/**
 * Client-side guard for every /admin screen except the login state.
 *
 * This site is `output: "export"` — there is no middleware and no server to run
 * a redirect, so the check has to happen after hydration. It calls
 * `GET /auth/me` rather than trusting the presence of a token, so an expired
 * one bounces to the login screen instead of failing later mid-form.
 */
export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [state, setState] = useState<"checking" | "allowed">("checking");

  useEffect(() => {
    let active = true;

    if (!getToken()) {
      router.replace("/admin");
      return;
    }

    me()
      .then(() => {
        if (active) setState("allowed");
      })
      .catch(() => {
        // adminApi already cleared the token and redirected on a 401; this
        // covers the CMS being unreachable, where staying put is no use.
        if (active) router.replace("/admin");
      });

    return () => {
      active = false;
    };
  }, [router]);

  if (state === "checking") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="inline-flex items-center gap-2 text-[13px] text-[var(--cv-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking your session…
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
