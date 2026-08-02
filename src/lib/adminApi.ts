"use client";

/**
 * Runtime client for the CompliVibe CMS API — used ONLY by /admin.
 *
 * This is deliberately the opposite of scripts/fetch-content.ts. The public
 * site compiles content in at build time and never talks to the CMS from a
 * browser; the admin panel is an internal tool that must read and write live,
 * so it calls the API directly from the client at request time.
 *
 * Environment:
 *   NEXT_PUBLIC_CMS_API_URL  Base URL including the /cms-api prefix. Must be
 *                            NEXT_PUBLIC_ because this runs in the browser.
 *                            Falls back to the CMS's own dev default.
 *
 * The auth token lives in memory plus sessionStorage — sessionStorage, not
 * localStorage, so it dies with the tab rather than persisting on a shared
 * machine. Any 401 on an authenticated call clears it and bounces to the login
 * screen from one place: `request()`.
 */

const RAW_BASE =
  process.env.NEXT_PUBLIC_CMS_API_URL ?? "http://127.0.0.1:4000/cms-api";

/** Base URL with trailing slashes stripped. May be relative (e.g. `/cms-api`). */
export const CMS_API_URL = RAW_BASE.replace(/\/+$/, "");

const TOKEN_KEY = "cv-admin-token";
const LOGIN_PATH = "/admin";
/** The CMS caps `limit` at 200. */
const LIST_PAGE_SIZE = 200;
/** Backstop against a server that always reports `hasMore`. */
const MAX_LIST_ITEMS = 5_000;

// --------------------------------------------------------------------------
// Wire types — mirrors the CMS ContentDTO
// --------------------------------------------------------------------------

export type ContentType = "POST" | "ARTICLE" | "FAQ";
export type ContentStatus = "DRAFT" | "PUBLISHED";

export const CONTENT_TYPES: ContentType[] = ["POST", "ARTICLE", "FAQ"];
export const CONTENT_STATUSES: ContentStatus[] = ["DRAFT", "PUBLISHED"];

export interface AdminContent {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  tags: string[];
  author: string | null;
  status: ContentStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create/update payload. The CMS validates with a `.strict()` zod schema, so
 * unknown keys are rejected outright — only send fields it declares.
 */
export interface ContentInput {
  type: ContentType;
  slug: string;
  title: string;
  body: string;
  excerpt?: string | null;
  coverImage?: string | null;
  tags?: string[];
  author?: string | null;
  status?: ContentStatus;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

// --- Leads ------------------------------------------------------------------
// Submissions from the public Book a Demo and waitlist forms. Written by
// src/lib/submitLead.ts (unauthenticated); everything below is admin-only.

export type LeadSource = "BOOK_DEMO" | "WAITLIST";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" | "SPAM";

export const LEAD_SOURCES: LeadSource[] = ["BOOK_DEMO", "WAITLIST"];
export const LEAD_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CLOSED",
  "SPAM",
];

/** Human labels for the enums, which are stored SCREAMING_SNAKE. */
export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  BOOK_DEMO: "Book Demo",
  WAITLIST: "Waitlist",
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  CLOSED: "Closed",
  SPAM: "Spam",
};

/** Mirrors the CMS LeadDTO. */
export interface AdminLead {
  id: string;
  source: LeadSource;
  fullName: string;
  workEmail: string;
  company: string | null;
  role: string | null;
  interest: string | null;
  message: string | null;
  /** Book a Demo only. */
  companySize: string | null;
  /** Book a Demo only. */
  preferredTime: string | null;
  /** Waitlist only. */
  companyStage: string | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

/** Response of `POST /cms-api/uploads`. */
export interface UploadedImage {
  /** Root-relative on the CMS, e.g. "/uploads/mgk3f1x9-4c1b.png". Store this
   *  verbatim in `coverImage`; `resolveMediaUrl` turns it into a usable src. */
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

export interface FieldError {
  field: string;
  message: string;
}

interface ListMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// --------------------------------------------------------------------------
// Errors
// --------------------------------------------------------------------------

/**
 * A failed CMS call. `details` carries the zod field errors so a form can put
 * each message next to the input that caused it.
 */
export class CmsApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: FieldError[];

  constructor(
    message: string,
    status: number,
    code: string,
    details: FieldError[] = [],
  ) {
    super(message);
    this.name = "CmsApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  /** `{ slug: "slug must be lowercase…" }` — first message wins per field. */
  fieldErrors(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const detail of this.details) {
      if (detail.field && !map[detail.field]) map[detail.field] = detail.message;
    }
    return map;
  }
}

// --------------------------------------------------------------------------
// Token store
// --------------------------------------------------------------------------

let memoryToken: string | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

export function getToken(): string | null {
  if (memoryToken !== null) return memoryToken;
  if (typeof window === "undefined") return null;
  try {
    memoryToken = window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    // Private mode or storage disabled — memory-only is a fine degradation.
    memoryToken = null;
  }
  return memoryToken;
}

export function setToken(token: string): void {
  memoryToken = token;
  try {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* memory-only */
  }
  notify();
}

export function clearToken(): void {
  memoryToken = null;
  try {
    window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* nothing stored */
  }
  notify();
}

/** For `useSyncExternalStore` — keeps the header and guards in step. */
export function subscribeToken(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Client snapshot for `useSyncExternalStore`. */
export const tokenSnapshot = (): string | null => getToken();

/** Server snapshot — nothing is ever authenticated during prerender. */
export const tokenServerSnapshot = (): string | null => null;

// --------------------------------------------------------------------------
// Transport
// --------------------------------------------------------------------------

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Attach the bearer token, and treat a 401 as "session over". */
  auth?: boolean;
}

function parseErrorBody(
  payload: unknown,
  status: number,
): { message: string; code: string; details: FieldError[] } {
  const envelope =
    typeof payload === "object" && payload !== null
      ? (payload as { error?: unknown }).error
      : undefined;

  if (typeof envelope === "object" && envelope !== null) {
    const error = envelope as {
      message?: unknown;
      code?: unknown;
      details?: unknown;
    };
    return {
      message:
        typeof error.message === "string"
          ? error.message
          : `Request failed with status ${status}`,
      code: typeof error.code === "string" ? error.code : "UNKNOWN",
      details: Array.isArray(error.details)
        ? (error.details.filter(
            (detail): detail is FieldError =>
              typeof detail === "object" &&
              detail !== null &&
              typeof (detail as FieldError).field === "string" &&
              typeof (detail as FieldError).message === "string",
          ) as FieldError[])
        : [],
    };
  }

  return {
    message: `Request failed with status ${status}`,
    code: "UNKNOWN",
    details: [],
  };
}

async function request<T>(
  path: string,
  { method = "GET", body, auth = false }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };

  if (auth) {
    const token = getToken();
    if (!token) {
      redirectToLogin();
      throw new CmsApiError("Not signed in.", 401, "UNAUTHORIZED");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${CMS_API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    // fetch only rejects on network failure or a blocked CORS preflight, so
    // this message names both — they look identical from here.
    throw new CmsApiError(
      `Could not reach the CMS at ${CMS_API_URL}. Check that it is running and that this origin is listed in the CMS's CORS_ORIGINS.`,
      0,
      "NETWORK_ERROR",
    );
  }

  if (response.status === 204) return undefined as T;

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const { message, code, details } = parseErrorBody(payload, response.status);

    // Central 401 handling: an expired or revoked token ends the session. The
    // login call itself is unauthenticated, so a bad password never lands here.
    if (response.status === 401 && auth) {
      clearToken();
      redirectToLogin();
    }

    throw new CmsApiError(message, response.status, code, details);
  }

  return (payload as { data: T }).data;
}

function redirectToLogin(): void {
  if (typeof window === "undefined") return;
  if (window.location.pathname === LOGIN_PATH) return;
  window.location.assign(LOGIN_PATH);
}

// --------------------------------------------------------------------------
// Endpoints
// --------------------------------------------------------------------------

export async function login(
  email: string,
  password: string,
): Promise<{ token: string; user: AdminUser }> {
  const data = await request<{
    token: string;
    tokenType: string;
    user: AdminUser;
  }>("/auth/login", { method: "POST", body: { email, password } });

  setToken(data.token);
  return { token: data.token, user: data.user };
}

export function logout(): void {
  clearToken();
}

/** Validates the stored token server-side rather than guessing at expiry. */
export function me(): Promise<AdminUser> {
  return request<AdminUser>("/auth/me", { auth: true });
}

export interface ListFilters {
  type?: ContentType;
  status?: ContentStatus;
  tag?: string;
}

/**
 * Every matching row, drafts included — the call is authenticated, and the CMS
 * returns all statuses to an admin unless one is named explicitly.
 */
export async function listContent(
  filters: ListFilters = {},
): Promise<AdminContent[]> {
  const collected: AdminContent[] = [];
  let offset = 0;

  for (;;) {
    const params = new URLSearchParams({
      limit: String(LIST_PAGE_SIZE),
      offset: String(offset),
    });
    if (filters.type) params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);
    if (filters.tag) params.set("tag", filters.tag);

    const page = await requestWithMeta<AdminContent[]>(
      `/content?${params.toString()}`,
    );

    collected.push(...page.data);

    if (!page.meta.hasMore || page.data.length === 0) break;
    offset += page.data.length;
    if (collected.length > MAX_LIST_ITEMS) break;
  }

  return collected;
}

/** List responses carry `meta` alongside `data`, so they bypass `request()`. */
async function requestWithMeta<T>(
  path: string,
): Promise<{ data: T; meta: ListMeta }> {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    throw new CmsApiError("Not signed in.", 401, "UNAUTHORIZED");
  }

  let response: Response;
  try {
    response = await fetch(`${CMS_API_URL}${path}`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new CmsApiError(
      `Could not reach the CMS at ${CMS_API_URL}. Check that it is running and that this origin is listed in the CMS's CORS_ORIGINS.`,
      0,
      "NETWORK_ERROR",
    );
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const { message, code, details } = parseErrorBody(payload, response.status);
    if (response.status === 401) {
      clearToken();
      redirectToLogin();
    }
    throw new CmsApiError(message, response.status, code, details);
  }

  return payload as { data: T; meta: ListMeta };
}

export function getContentBySlug(slug: string): Promise<AdminContent> {
  return request<AdminContent>(`/content/${encodeURIComponent(slug)}`, {
    auth: true,
  });
}

/**
 * The CMS only exposes lookup by slug (`GET /content/:slug`), while writes are
 * keyed by id (`PUT`/`DELETE /content/:id`). Editing by id therefore scans the
 * authenticated list — which already includes drafts — and matches on id.
 */
export async function getContentById(id: string): Promise<AdminContent> {
  const all = await listContent();
  const match = all.find((item) => item.id === id);
  if (!match) {
    throw new CmsApiError(`No content found for id '${id}'`, 404, "NOT_FOUND");
  }
  return match;
}

export function createContent(input: ContentInput): Promise<AdminContent> {
  return request<AdminContent>("/content", {
    method: "POST",
    body: input,
    auth: true,
  });
}

export function updateContent(
  id: string,
  input: Partial<ContentInput>,
): Promise<AdminContent> {
  return request<AdminContent>(`/content/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: input,
    auth: true,
  });
}

export function deleteContent(id: string): Promise<void> {
  return request<void>(`/content/${encodeURIComponent(id)}`, {
    method: "DELETE",
    auth: true,
  });
}

export interface LeadFilters {
  source?: LeadSource;
  status?: LeadStatus;
}

/**
 * Every matching lead, newest first. Paged through the same way `listContent`
 * is, for the same reason: the CMS caps `limit` at 200 and this table only
 * grows.
 */
export async function listLeads(
  filters: LeadFilters = {},
): Promise<AdminLead[]> {
  const collected: AdminLead[] = [];
  let offset = 0;

  for (;;) {
    const params = new URLSearchParams({
      limit: String(LIST_PAGE_SIZE),
      offset: String(offset),
    });
    if (filters.source) params.set("source", filters.source);
    if (filters.status) params.set("status", filters.status);

    const page = await requestWithMeta<AdminLead[]>(
      `/leads?${params.toString()}`,
    );

    collected.push(...page.data);

    if (!page.meta.hasMore || page.data.length === 0) break;
    offset += page.data.length;
    if (collected.length > MAX_LIST_ITEMS) break;
  }

  return collected;
}

export function getLead(id: string): Promise<AdminLead> {
  return request<AdminLead>(`/leads/${encodeURIComponent(id)}`, { auth: true });
}

/** Status is the only mutable field — the CMS rejects any other key with a 400. */
export function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<AdminLead> {
  return request<AdminLead>(`/leads/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: { status },
    auth: true,
  });
}

export function deleteLead(id: string): Promise<void> {
  return request<void>(`/leads/${encodeURIComponent(id)}`, {
    method: "DELETE",
    auth: true,
  });
}

/**
 * Uploads one image and returns where the CMS put it.
 *
 * Bypasses `request()` because that helper JSON-encodes its body and sets
 * `Content-Type` by hand. A multipart upload needs neither: `FormData` must be
 * passed to `fetch` untouched so the browser can generate the boundary and set
 * the header itself. Everything else — the bearer token, the error envelope,
 * the 401-ends-the-session rule — is kept identical on purpose.
 *
 * `token` is optional; the stored session token is used when it is omitted.
 */
export async function uploadImage(
  file: File,
  token?: string,
): Promise<UploadedImage> {
  const bearer = token ?? getToken();
  if (!bearer) {
    redirectToLogin();
    throw new CmsApiError("Not signed in.", 401, "UNAUTHORIZED");
  }

  const body = new FormData();
  // Field name is fixed by the CMS: `upload.single("file")`.
  body.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${CMS_API_URL}/uploads`, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${bearer}` },
      body,
    });
  } catch {
    throw new CmsApiError(
      `Could not reach the CMS at ${CMS_API_URL}. Check that it is running and that this origin is listed in the CMS's CORS_ORIGINS.`,
      0,
      "NETWORK_ERROR",
    );
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const { message, code, details } = parseErrorBody(payload, response.status);
    if (response.status === 401) {
      clearToken();
      redirectToLogin();
    }
    throw new CmsApiError(message, response.status, code, details);
  }

  return (payload as { data: UploadedImage }).data;
}

// --------------------------------------------------------------------------
// Helpers shared by the admin forms
// --------------------------------------------------------------------------

/**
 * Best-effort match for the CMS slug rule: lowercase alphanumerics separated
 * by single hyphens. The server validates again — this just stops the obvious
 * round trip.
 */
export function toSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160)
    .replace(/-+$/, "");
}

/** "a, b , ,c" -> ["a","b","c"] — the CMS lowercases and de-dupes on write. */
export function parseTags(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

/**
 * As `formatAdminDate`, plus the time. A lead's usefulness decays by the hour,
 * so "02 Aug 2026" alone is not enough to triage by — the same fixed en-GB/UTC
 * formatting, so it never disagrees with the rest of the panel.
 */
export function formatAdminDateTime(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return `${date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })}, ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  })} UTC`;
}

/** Fixed en-GB/UTC formatting, matching the public site's date rendering. */
export function formatAdminDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
