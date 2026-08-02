/**
 * Resolving a `coverImage` value to something an `<img src>` can actually load.
 *
 * A cover image can arrive from three places, and they are not interchangeable:
 *
 *   "/images/blog/eu-ai-act.jpg"   this repo's own public/ directory
 *   "https://cdn.example.com/x.jpg" an external URL somebody pasted
 *   "/uploads/mgk3f1x9-4c1b.png"   uploaded through /admin, stored on the CMS
 *
 * Only the third needs work. The site is a static export served from its own
 * domain, while uploads live on the CMS's filesystem and are served by the CMS
 * process — so a bare "/uploads/…" is only correct when the two happen to sit
 * on one origin. `resolveMediaUrl` puts the CMS's base in front of exactly that
 * case and leaves the other two alone, which is what keeps every pre-existing
 * cover image working untouched.
 *
 * Environment:
 *   NEXT_PUBLIC_CMS_MEDIA_URL  Origin (or path prefix) the CMS serves /uploads
 *                              from. Optional — normally derived, see below.
 *   NEXT_PUBLIC_CMS_API_URL    Falls back to this with the trailing /cms-api
 *                              stripped, since the CMS serves both from one
 *                              origin. Setting the API URL is therefore enough
 *                              in every deployment we currently have:
 *
 *   dev   NEXT_PUBLIC_CMS_API_URL=http://127.0.0.1:4000/cms-api
 *         -> base "http://127.0.0.1:4000" -> absolute cross-origin URL
 *   prod  NEXT_PUBLIC_CMS_API_URL=/cms-api
 *         -> base ""                      -> "/uploads/…" stays relative and
 *                                            resolves same-origin through the
 *                                            nginx /uploads/ location block
 *
 * Both variables are NEXT_PUBLIC_ because these values are inlined at build
 * time and read on public, statically exported pages.
 */

const DEFAULT_CMS_API_URL = "http://127.0.0.1:4000/cms-api";

// `??` is not enough here: .env.example ships the key with an empty value, so a
// copied .env inlines "" rather than leaving it undefined, and an empty string
// would silently mean "same origin" in development. Blank is treated as unset.
// To force same-origin deliberately, set it to "/".
const EXPLICIT_MEDIA_BASE = process.env.NEXT_PUBLIC_CMS_MEDIA_URL?.trim();

const RAW_MEDIA_BASE = EXPLICIT_MEDIA_BASE
  ? EXPLICIT_MEDIA_BASE
  : (process.env.NEXT_PUBLIC_CMS_API_URL?.trim() || DEFAULT_CMS_API_URL).replace(
      /\/cms-api\/*$/,
      "",
    );

/** CMS media base with trailing slashes stripped. May be "" (same-origin). */
export const CMS_MEDIA_URL = RAW_MEDIA_BASE.replace(/\/+$/, "");

/** The one path prefix that identifies a CMS-hosted upload. */
export const UPLOADS_PREFIX = "/uploads/";

/** "https:", "data:", "blob:" — anything already carrying its own scheme. */
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * A `coverImage` value turned into a usable `src`, or null when there is none.
 *
 * Absolute URLs and this site's own paths pass through unchanged; only
 * `/uploads/…` is rewritten onto the CMS.
 */
export function resolveMediaUrl(src: string | null | undefined): string | null {
  if (!src) return null;

  const trimmed = src.trim();
  if (!trimmed) return null;

  // Already absolute (http/https/data/blob) or protocol-relative.
  if (HAS_SCHEME.test(trimmed) || trimmed.startsWith("//")) return trimmed;

  if (trimmed.startsWith(UPLOADS_PREFIX)) return `${CMS_MEDIA_URL}${trimmed}`;

  return trimmed;
}

/**
 * The same thing for JSON-LD and Open Graph, where a relative URL is not
 * allowed and consumers are not browsers with a base document to resolve
 * against. `siteUrl` covers this repo's own assets and the same-origin
 * production case, where the resolved value is still a path.
 */
export function absoluteMediaUrl(
  src: string | null | undefined,
  siteUrl: string,
): string | undefined {
  const resolved = resolveMediaUrl(src);
  if (!resolved) return undefined;
  if (HAS_SCHEME.test(resolved) || resolved.startsWith("//")) return resolved;
  return `${siteUrl.replace(/\/+$/, "")}${resolved}`;
}
