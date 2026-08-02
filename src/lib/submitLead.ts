/**
 * Lead capture — the submission path for the Book a Demo and waitlist forms.
 *
 * Both forms POST here and nowhere else: the CMS stores the lead and the team
 * works it from /admin/leads. This used to run alongside a Web3Forms submission
 * (see submitWeb3Form.ts, still used by the score and resources forms), which
 * needed an access key that was never configured — so it only ever produced a
 * confusing error. The CMS already does the whole job.
 *
 * Because this is now the only destination, a failure here is a failure the
 * visitor must see and be able to act on. Errors are therefore classified —
 * `LeadSubmitError.kind` — and `leadErrorMessage()` turns that into the copy a
 * form shows. `Error.message` stays technical, for the console.
 *
 * Deliberately NOT built on adminApi.ts: that module carries the admin token
 * store, sessionStorage access and a redirect-to-login on 401, none of which
 * belong in the bundle for a public marketing page. This endpoint is
 * unauthenticated, so it needs none of it.
 */

const RAW_BASE =
  process.env.NEXT_PUBLIC_CMS_API_URL ?? "http://127.0.0.1:4000/cms-api";

/** Base URL with trailing slashes stripped. May be relative (e.g. `/cms-api`). */
const CMS_API_URL = RAW_BASE.replace(/\/+$/, "");

/**
 * Give up after 12 seconds.
 *
 * A wedged CMS — or a dropped packet to a firewalled host — leaves `fetch`
 * pending for as long as the browser allows, which would strand the button on
 * "Sending…" indefinitely. The window is deliberately wider than it was when a
 * second submission ran in parallel: nothing else catches the lead now, so it
 * is worth waiting out a slow connection before declaring failure. A visitor
 * who does time out sees a retry message, and a retry is cheap — the burst
 * limiter allows five in ten minutes.
 */
const TIMEOUT_MS = 12_000;

export type LeadSource = "BOOK_DEMO" | "WAITLIST";

/** What went wrong, in terms a form can turn into advice. */
export type LeadErrorKind =
  | "network"
  | "timeout"
  | "rate_limited"
  | "invalid"
  | "server"
  | "unknown";

/**
 * Mirrors the CMS's `createLeadSchema`, which is `.strict()` — sending a key it
 * does not declare is a 400, so only these fields may appear.
 */
export interface LeadPayload {
  source: LeadSource;
  fullName: string;
  workEmail: string;
  company?: string;
  role?: string;
  /** "Primary interest" on Book a Demo, "Interest" on the waitlist. */
  interest?: string;
  message?: string;
  /** Book a Demo only. */
  companySize?: string;
  /** Book a Demo only. */
  preferredTime?: string;
  /** Waitlist only. */
  companyStage?: string;
  /** Honeypot, mirroring the hidden `botcheck` input both forms already render. */
  botcheck?: string;
}

/** A failed lead submission, classified so the caller can explain it. */
export class LeadSubmitError extends Error {
  readonly kind: LeadErrorKind;
  /** HTTP status, when the request got far enough to have one. */
  readonly status?: number;
  /** The CMS's own `error.message`, when it sent one. */
  readonly detail?: string;

  constructor(
    kind: LeadErrorKind,
    message: string,
    options: { status?: number; detail?: string; cause?: unknown } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "LeadSubmitError";
    this.kind = kind;
    this.status = options.status;
    this.detail = options.detail;
  }
}

/**
 * POSTs one lead to the CMS.
 *
 * Resolves with nothing — the endpoint answers with a fixed `{ received: true }`
 * and there is nothing worth reading back. Rejects with a `LeadSubmitError` on
 * network failure, timeout, or any non-2xx response; pass that to
 * `leadErrorMessage()` to get something worth showing a visitor.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${CMS_API_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Empty optional fields are dropped rather than sent as "": the CMS
      // normalises "" to null anyway, and a smaller body is a smaller target.
      body: JSON.stringify(compact(payload)),
      signal: controller.signal,
      // Nothing here is authenticated and the CMS sets credentials: false in
      // its CORS config, so never attach cookies.
      credentials: "omit",
    });
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "AbortError";
    throw new LeadSubmitError(
      timedOut ? "timeout" : "network",
      timedOut
        ? `Lead capture timed out after ${TIMEOUT_MS}ms.`
        : `Could not reach the CMS at ${CMS_API_URL}.`,
      { cause: err },
    );
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    // The CMS's error envelope. Its rate-limit messages are written for humans
    // and name the right next step, so those are worth showing verbatim.
    const detail = await response
      .json()
      .then((body: unknown) => {
        const error =
          typeof body === "object" && body !== null
            ? (body as { error?: { message?: unknown } }).error
            : undefined;
        return typeof error?.message === "string" ? error.message : "";
      })
      .catch(() => "");

    throw new LeadSubmitError(
      kindForStatus(response.status),
      `Lead capture failed (${response.status})${detail ? `: ${detail}` : ""}.`,
      { status: response.status, detail: detail || undefined },
    );
  }
}

/**
 * The message to put in a form's error state.
 *
 * All of the visitor-facing copy for a failed submission lives here so the two
 * forms stay one line each and cannot drift apart. `contactEmail` is passed in
 * rather than hardcoded — each form already owns that constant.
 */
export function leadErrorMessage(error: unknown, contactEmail: string): string {
  if (!(error instanceof LeadSubmitError)) {
    return `Something went wrong. Please try again or email ${contactEmail}.`;
  }

  switch (error.kind) {
    case "rate_limited":
      // Three limiters can produce a 429 — burst, daily, service-wide — and the
      // right advice differs for each ("wait a few minutes" vs "email us").
      // The CMS already says which, in plain English, so prefer its wording.
      return (
        error.detail ??
        `You've sent this a few times already. Please wait a few minutes and try again, or email ${contactEmail}.`
      );
    case "network":
      return `We couldn't reach our servers. Please check your connection and try again, or email ${contactEmail}.`;
    case "timeout":
      return `That took longer than expected. Please try again in a moment, or email ${contactEmail}.`;
    case "invalid":
      // Shouldn't reach a visitor — the forms validate first — so the CMS's
      // field-level wording is left in the console rather than shown raw.
      return `Some of those details weren't accepted. Please check them and try again, or email ${contactEmail}.`;
    case "server":
      return `Something went wrong on our end. Please try again shortly, or email ${contactEmail}.`;
    default:
      return `Something went wrong. Please try again, or email ${contactEmail}.`;
  }
}

function kindForStatus(status: number): LeadErrorKind {
  if (status === 429) return "rate_limited";
  if (status >= 500) return "server";
  if (status >= 400) return "invalid";
  return "unknown";
}

/** Drops undefined and empty-string values so only real answers are sent. */
function compact(payload: LeadPayload): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string" && value.trim() !== "") out[key] = value;
  }
  // `source` is required and never empty, but keep the contract explicit.
  out.source = payload.source;
  return out;
}
