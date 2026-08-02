"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import {
  CONTENT_STATUSES,
  CONTENT_TYPES,
  CmsApiError,
  formatAdminDate,
  listContent,
  deleteContent,
  type AdminContent,
  type ContentStatus,
  type ContentType,
} from "@/lib/adminApi";
import {
  dangerButtonClass,
  labelClass,
  panelClass,
  primaryButtonClass,
  primaryButtonStyle,
  secondaryButtonClass,
  selectClass,
  statusPillClass,
} from "@/components/adminUi";

type TypeFilter = ContentType | "ALL";
type StatusFilter = ContentStatus | "ALL";

/**
 * Every row the CMS holds, drafts included. Filtering is in-memory: the list is
 * small, and refiltering without a round trip keeps the table from flickering.
 */
export default function AdminDashboard() {
  const [items, setItems] = useState<AdminContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listContent());
    } catch (caught) {
      setError(
        caught instanceof CmsApiError
          ? caught.message
          : "Could not load content.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(
    () =>
      items.filter(
        (item) =>
          (typeFilter === "ALL" || item.type === typeFilter) &&
          (statusFilter === "ALL" || item.status === statusFilter),
      ),
    [items, typeFilter, statusFilter],
  );

  async function handleDelete(item: AdminContent) {
    const confirmed = window.confirm(
      `Delete "${item.title}"?\n\nThis removes it from the CMS permanently. The public site keeps showing it until the next build.`,
    );
    if (!confirmed) return;

    setDeletingId(item.id);
    setError(null);
    try {
      await deleteContent(item.id);
      setItems((current) => current.filter((row) => row.id !== item.id));
    } catch (caught) {
      setError(
        caught instanceof CmsApiError
          ? caught.message
          : "Could not delete that item.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[var(--cv-ink)]">
            Content
          </h1>
          <p className="mt-1 text-[13px] text-[var(--cv-muted)]">
            {loading
              ? "Loading…"
              : `${visible.length} of ${items.length} item${items.length === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className={secondaryButtonClass}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/admin/content/new"
            className={primaryButtonClass}
            style={primaryButtonStyle}
          >
            <Plus className="h-3.5 w-3.5" />
            New content
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-type" className={labelClass}>
            Type
          </label>
          <select
            id="filter-type"
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as TypeFilter)
            }
            className={`${selectClass} w-40`}
          >
            <option value="ALL">All types</option>
            {CONTENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-status" className={labelClass}>
            Status
          </label>
          <select
            id="filter-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className={`${selectClass} w-40`}
          >
            <option value="ALL">All statuses</option>
            {CONTENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="cv-alert-danger rounded-lg border px-3 py-2 text-[12px]"
        >
          {error}
        </p>
      )}

      <div className={`${panelClass} overflow-x-auto`}>
        <table className="w-full min-w-[760px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[var(--cv-border)] bg-[var(--cv-bg-soft)]">
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Type</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Title</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Slug</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Status</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Published</th>
              <th className="px-4 py-3 text-right font-semibold text-[var(--cv-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[var(--cv-muted)]">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading content…
                  </span>
                </td>
              </tr>
            )}

            {!loading && visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[var(--cv-muted)]">
                  {items.length === 0
                    ? "No content yet. Create the first item."
                    : "Nothing matches these filters."}
                </td>
              </tr>
            )}

            {!loading &&
              visible.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--cv-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-mono text-[11px] uppercase text-[var(--cv-muted)]">
                    {item.type}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--cv-ink)]">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--cv-muted)]">
                    {item.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusPillClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--cv-muted)]">
                    {formatAdminDate(item.publishedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/content/edit?id=${encodeURIComponent(item.id)}`}
                        className={`${secondaryButtonClass} h-8 px-3`}
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => void handleDelete(item)}
                        disabled={deletingId === item.id}
                        className={`${dangerButtonClass} h-8 px-3`}
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] leading-relaxed text-[var(--cv-muted)]">
        Changes here hit the CMS immediately. The public site is a static export
        — it only picks them up on the next build.
      </p>
    </div>
  );
}
