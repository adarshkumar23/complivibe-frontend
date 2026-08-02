"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Mail, RefreshCw, Trash2, X } from "lucide-react";
import {
  CmsApiError,
  LEAD_SOURCES,
  LEAD_SOURCE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  deleteLead,
  formatAdminDateTime,
  listLeads,
  updateLeadStatus,
  type AdminLead,
  type LeadSource,
  type LeadStatus,
} from "@/lib/adminApi";
import {
  dangerButtonClass,
  labelClass,
  leadStatusPillClass,
  neutralPillClass,
  panelClass,
  secondaryButtonClass,
  selectClass,
} from "@/components/adminUi";

type SourceFilter = LeadSource | "ALL";
type StatusFilter = LeadStatus | "ALL";

/**
 * Lead inbox for /admin/leads.
 *
 * Mirrors AdminDashboard: fetch everything once, filter in memory, and keep the
 * table from flickering on every dropdown change. Leads are read-only apart
 * from `status` — the CMS rejects any other field on PUT, because the captured
 * data is a record of what someone actually submitted.
 */
export default function AdminLeads() {
  const [items, setItems] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listLeads());
    } catch (caught) {
      setError(
        caught instanceof CmsApiError ? caught.message : "Could not load leads.",
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
        (lead) =>
          (sourceFilter === "ALL" || lead.source === sourceFilter) &&
          (statusFilter === "ALL" || lead.status === statusFilter),
      ),
    [items, sourceFilter, statusFilter],
  );

  // Read from `items` rather than holding a copy, so a status change made in
  // the modal is reflected there without a second piece of state to keep in sync.
  const selected = useMemo(
    () => items.find((lead) => lead.id === selectedId) ?? null,
    [items, selectedId],
  );

  const newCount = useMemo(
    () => items.filter((lead) => lead.status === "NEW").length,
    [items],
  );

  async function handleStatusChange(lead: AdminLead, status: LeadStatus) {
    if (status === lead.status) return;

    // Optimistic: the dropdown should not sit on the old value while the round
    // trip happens. Rolled back below if the CMS refuses.
    const previous = lead.status;
    setItems((current) =>
      current.map((row) => (row.id === lead.id ? { ...row, status } : row)),
    );
    setSavingId(lead.id);
    setError(null);

    try {
      const updated = await updateLeadStatus(lead.id, status);
      setItems((current) =>
        current.map((row) => (row.id === lead.id ? updated : row)),
      );
    } catch (caught) {
      setItems((current) =>
        current.map((row) =>
          row.id === lead.id ? { ...row, status: previous } : row,
        ),
      );
      setError(
        caught instanceof CmsApiError
          ? caught.message
          : "Could not update that lead's status.",
      );
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(lead: AdminLead) {
    const confirmed = window.confirm(
      `Delete the lead from ${lead.fullName} (${lead.workEmail})?\n\nThis is permanent. To keep the record but take it out of the way, set the status to Closed or Spam instead.`,
    );
    if (!confirmed) return;

    setDeletingId(lead.id);
    setError(null);
    try {
      await deleteLead(lead.id);
      setItems((current) => current.filter((row) => row.id !== lead.id));
      setSelectedId((current) => (current === lead.id ? null : current));
    } catch (caught) {
      setError(
        caught instanceof CmsApiError
          ? caught.message
          : "Could not delete that lead.",
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
            Leads
          </h1>
          <p className="mt-1 text-[13px] text-[var(--cv-muted)]">
            {loading
              ? "Loading…"
              : `${visible.length} of ${items.length} lead${items.length === 1 ? "" : "s"}${newCount > 0 ? ` · ${newCount} new` : ""}`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className={secondaryButtonClass}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-source" className={labelClass}>
            Source
          </label>
          <select
            id="filter-source"
            value={sourceFilter}
            onChange={(event) =>
              setSourceFilter(event.target.value as SourceFilter)
            }
            className={`${selectClass} w-44`}
          >
            <option value="ALL">All sources</option>
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {LEAD_SOURCE_LABELS[source]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-lead-status" className={labelClass}>
            Status
          </label>
          <select
            id="filter-lead-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className={`${selectClass} w-44`}
          >
            <option value="ALL">All statuses</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {LEAD_STATUS_LABELS[status]}
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
        <table className="w-full min-w-[900px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[var(--cv-border)] bg-[var(--cv-bg-soft)]">
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Source</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Name</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Work email</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Company</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Submitted</th>
              <th className="px-4 py-3 font-semibold text-[var(--cv-muted)]">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-[var(--cv-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[var(--cv-muted)]">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading leads…
                  </span>
                </td>
              </tr>
            )}

            {!loading && visible.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[var(--cv-muted)]">
                  {items.length === 0
                    ? "No leads yet. Submissions from the Book a Demo and waitlist forms land here."
                    : "Nothing matches these filters."}
                </td>
              </tr>
            )}

            {!loading &&
              visible.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedId(lead.id)}
                  className="cursor-pointer border-b border-[var(--cv-border)] transition-colors last:border-b-0 hover:bg-[var(--cv-bg-soft)]"
                >
                  <td className="px-4 py-3">
                    <span className={neutralPillClass}>
                      {LEAD_SOURCE_LABELS[lead.source]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--cv-ink)]">
                    {lead.fullName}
                  </td>
                  <td className="px-4 py-3 text-[var(--cv-muted)]">
                    {lead.workEmail}
                  </td>
                  <td className="px-4 py-3 text-[var(--cv-muted)]">
                    {lead.company ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--cv-muted)]">
                    {formatAdminDateTime(lead.createdAt)}
                  </td>
                  {/* The status cell holds a control, so a click in it must not
                      also open the detail modal. */}
                  <td
                    className="px-4 py-3"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <select
                        aria-label={`Status for ${lead.fullName}`}
                        value={lead.status}
                        onChange={(event) =>
                          void handleStatusChange(
                            lead,
                            event.target.value as LeadStatus,
                          )
                        }
                        disabled={savingId === lead.id}
                        className={`${selectClass} w-36 py-1.5 text-[12px]`}
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {LEAD_STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>
                      {savingId === lead.id && (
                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[var(--cv-muted)]" />
                      )}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`mailto:${lead.workEmail}`}
                        className={`${secondaryButtonClass} h-8 px-3`}
                      >
                        <Mail className="h-3 w-3" />
                        Email
                      </a>
                      <button
                        type="button"
                        onClick={() => void handleDelete(lead)}
                        disabled={deletingId === lead.id}
                        className={`${dangerButtonClass} h-8 px-3`}
                      >
                        {deletingId === lead.id ? (
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
        Leads are captured from the Book a Demo and waitlist forms. This table
        is the only place they land — there is no email notification, so check
        it regularly.
      </p>

      {selected && (
        <LeadDetail
          lead={selected}
          onClose={() => setSelectedId(null)}
          onStatusChange={(status) => void handleStatusChange(selected, status)}
          saving={savingId === selected.id}
        />
      )}
    </div>
  );
}

/** One labelled value in the detail modal. Omitted entirely when unset. */
function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className={labelClass}>{label}</span>
      <span className="text-[14px] text-[var(--cv-ink)]">{value}</span>
    </div>
  );
}

/**
 * Detail view as a modal rather than a route: a lead is a dozen short fields
 * with nothing to link to and nothing to deep-link from, and reading one should
 * not lose the filters and scroll position of the table behind it.
 */
function LeadDetail({
  lead,
  onClose,
  onStatusChange,
  saving,
}: {
  lead: AdminLead;
  onClose: () => void;
  onStatusChange: (status: LeadStatus) => void;
  saving: boolean;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Lead from ${lead.fullName}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`${panelClass} w-full max-w-2xl shadow-xl`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--cv-border)] px-6 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={neutralPillClass}>
                {LEAD_SOURCE_LABELS[lead.source]}
              </span>
              <span className={leadStatusPillClass(lead.status)}>
                {LEAD_STATUS_LABELS[lead.status]}
              </span>
            </div>
            <h2 className="text-[18px] font-semibold tracking-tight text-[var(--cv-ink)]">
              {lead.fullName}
            </h2>
            <p className="text-[12px] text-[var(--cv-muted)]">
              Submitted {formatAdminDateTime(lead.createdAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-[var(--cv-muted)] transition-colors hover:bg-[var(--cv-bg-soft)] hover:text-[var(--cv-ink)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 py-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className={labelClass}>Work email</span>
              <a
                href={`mailto:${lead.workEmail}`}
                className="text-[14px] font-medium text-[var(--cv-blue)] hover:underline"
              >
                {lead.workEmail}
              </a>
            </div>
            <DetailRow label="Company" value={lead.company} />
            <DetailRow label="Role" value={lead.role} />
            <DetailRow label="Interest" value={lead.interest} />
            {/* Source-specific: company size and preferred time come from Book a
                Demo, company stage from the waitlist. Unset ones render nothing. */}
            <DetailRow label="Company size" value={lead.companySize} />
            <DetailRow label="Preferred time" value={lead.preferredTime} />
            <DetailRow label="Company stage" value={lead.companyStage} />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={labelClass}>Message</span>
            {lead.message ? (
              <p className="whitespace-pre-wrap rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-3 py-2.5 text-[14px] leading-relaxed text-[var(--cv-ink)]">
                {lead.message}
              </p>
            ) : (
              <p className="text-[14px] text-[var(--cv-muted)]">
                No message provided.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[var(--cv-border)] px-6 py-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="detail-status" className={labelClass}>
              Status
            </label>
            <div className="flex items-center gap-2">
              <select
                id="detail-status"
                value={lead.status}
                onChange={(event) =>
                  onStatusChange(event.target.value as LeadStatus)
                }
                disabled={saving}
                className={`${selectClass} w-44`}
              >
                {LEAD_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {LEAD_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
              {saving && (
                <Loader2 className="h-4 w-4 animate-spin text-[var(--cv-muted)]" />
              )}
            </div>
          </div>

          <a
            href={`mailto:${lead.workEmail}`}
            className={secondaryButtonClass}
          >
            <Mail className="h-3.5 w-3.5" />
            Reply by email
          </a>
        </div>
      </div>
    </div>
  );
}
