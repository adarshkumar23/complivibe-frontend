"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminAuthGuard from "@/components/AdminAuthGuard";
import AdminContentForm from "@/components/AdminContentForm";
import { CmsApiError, getContentById, type AdminContent } from "@/lib/adminApi";
import { secondaryButtonClass } from "@/components/adminUi";

/**
 * Edit one CMS row: /admin/content/edit?id=<id>
 *
 * The id is a query parameter rather than a path segment on purpose. This site
 * is `output: "export"` — a path segment (/admin/content/[id]/edit) would need
 * `generateStaticParams`, and content ids only exist at runtime, so those URLs
 * could never be exported and would 404 on a direct load. A query string keeps
 * one real, always-present HTML shell that works for any id.
 */
export default function EditContentPage() {
  return (
    <AdminAuthGuard>
      <Suspense fallback={<Centered>Loading…</Centered>}>
        <EditContentLoader />
      </Suspense>
    </AdminAuthGuard>
  );
}

function EditContentLoader() {
  const id = useSearchParams().get("id");
  const [item, setItem] = useState<AdminContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (!id) {
      setError("No content id in the URL.");
      return;
    }

    getContentById(id)
      .then((found) => {
        if (active) setItem(found);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setError(
          caught instanceof CmsApiError
            ? caught.message
            : "Could not load that item.",
        );
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <Centered>
        <span className="text-[var(--cv-danger)]">{error}</span>
        <Link href="/admin" className={`${secondaryButtonClass} mt-4`}>
          Back to content
        </Link>
      </Centered>
    );
  }

  if (!item) {
    return (
      <Centered>
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading content…
        </span>
      </Centered>
    );
  }

  return <AdminContentForm mode="edit" item={item} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-[13px] text-[var(--cv-muted)]">
      {children}
    </div>
  );
}
