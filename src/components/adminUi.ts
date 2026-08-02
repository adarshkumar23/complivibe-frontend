/**
 * Shared class strings for the /admin panel.
 *
 * The admin panel is an internal tool, not a marketing page: it borrows the
 * site's --cv-* tokens so it does not look foreign, but stays deliberately
 * plain — no glass, no aurora, no gradients except the one primary action.
 * Kept as constants (like icon-registry.ts) rather than components so the
 * markup in each screen stays readable.
 */

export const labelClass =
  "block text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--cv-muted)]";

export const inputClass =
  "w-full rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-3 py-2.5 text-[14px] text-[var(--cv-ink)] outline-none transition-colors placeholder:text-[var(--cv-muted)] focus:border-[var(--cv-blue)]";

export const inputErrorClass =
  "w-full rounded-lg border border-[var(--cv-danger)] bg-[var(--cv-surface-strong)] px-3 py-2.5 text-[14px] text-[var(--cv-ink)] outline-none transition-colors placeholder:text-[var(--cv-muted)] focus:border-[var(--cv-danger)]";

export const textareaClass = `${inputClass} font-mono text-[13px] leading-relaxed`;

export const selectClass = `${inputClass} appearance-none pr-8`;

export const primaryButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

/** The one place the signature CTA gradient is used in the admin panel. */
export const primaryButtonStyle = {
  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
  boxShadow: "0 8px 24px rgba(37,99,235,0.28)",
} as const;

export const secondaryButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] px-4 text-[13px] font-semibold text-[var(--cv-ink)] transition-colors hover:border-[var(--cv-blue)] disabled:cursor-not-allowed disabled:opacity-50";

export const dangerButtonClass =
  "cv-btn-danger inline-flex h-10 items-center justify-center gap-2 rounded-lg border bg-transparent px-4 text-[13px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const panelClass =
  "rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface-strong)]";

export const fieldErrorClass = "text-[12px] text-[var(--cv-danger)]";

/** Status pill colours — DRAFT is deliberately quiet, PUBLISHED is green. */
export const statusPillClass = (status: "DRAFT" | "PUBLISHED"): string =>
  status === "PUBLISHED"
    ? "cv-pill-published inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
    : "inline-flex items-center rounded-full border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--cv-muted)]";

const pillBase =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold";

/** Neutral pill used for a lead's source, which is a label rather than a state. */
export const neutralPillClass = `${pillBase} border-[var(--cv-border)] bg-[var(--cv-bg-soft)] text-[var(--cv-muted)]`;

/**
 * Lead status pills. Only NEW is coloured — it is the one status that means
 * "someone still has to do something". Everything else is deliberately quiet so
 * a long table does not turn into a wall of colour.
 */
export const leadStatusPillClass = (
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" | "SPAM",
): string => {
  switch (status) {
    case "NEW":
      return `${pillBase} border-[#2563eb]/35 bg-[#2563eb]/[0.10] text-[#2563eb] dark:text-[#60a5fa]`;
    case "QUALIFIED":
      return `${pillBase} cv-pill-published`;
    case "SPAM":
      return `${pillBase} border-[var(--cv-danger)]/35 bg-[var(--cv-danger)]/[0.08] text-[var(--cv-danger)]`;
    default:
      return `${pillBase} border-[var(--cv-border)] bg-[var(--cv-bg-soft)] text-[var(--cv-muted)]`;
  }
};
