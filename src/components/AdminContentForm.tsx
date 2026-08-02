"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ImageIcon,
  Loader2,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  CONTENT_STATUSES,
  CONTENT_TYPES,
  CmsApiError,
  createContent,
  deleteContent,
  parseTags,
  toSlug,
  updateContent,
  uploadImage,
  type AdminContent,
  type ContentInput,
  type ContentStatus,
  type ContentType,
} from "@/lib/adminApi";
import { resolveMediaUrl } from "@/lib/media";
import {
  dangerButtonClass,
  fieldErrorClass,
  inputClass,
  inputErrorClass,
  labelClass,
  panelClass,
  primaryButtonClass,
  primaryButtonStyle,
  secondaryButtonClass,
  selectClass,
  textareaClass,
} from "@/components/adminUi";

interface FormState {
  type: ContentType;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  tags: string;
  author: string;
  status: ContentStatus;
  seoTitle: string;
  seoDescription: string;
}

function initialState(item?: AdminContent): FormState {
  return {
    type: item?.type ?? "POST",
    slug: item?.slug ?? "",
    title: item?.title ?? "",
    excerpt: item?.excerpt ?? "",
    body: item?.body ?? "",
    coverImage: item?.coverImage ?? "",
    tags: item?.tags.join(", ") ?? "",
    author: item?.author ?? "",
    status: item?.status ?? "DRAFT",
    seoTitle: item?.seoTitle ?? "",
    seoDescription: item?.seoDescription ?? "",
  };
}

/**
 * Create/edit form for a single CMS row.
 *
 * The CMS validates every field again with a `.strict()` zod schema; the
 * client-side slug normalisation here is a convenience, not the guard. When the
 * API does reject something, `details` is unpacked field by field so each
 * message lands under the input that caused it.
 */
export default function AdminContentForm({
  mode,
  item,
}: {
  mode: "create" | "edit";
  item?: AdminContent;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => initialState(item));
  // An existing slug is already the author's choice — never re-derive it.
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  // Object URL for the file just picked, so the preview appears before the
  // upload finishes. Held until it is replaced or the form unmounts — see the
  // effect below — rather than revoked on success, which would blank the
  // thumbnail for as long as the CMS copy takes to load.
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    },
    [localPreview],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  /** Puts an upload failure under the Cover image field, like any API error. */
  function setCoverError(message: string | null) {
    setFieldErrors((current) => {
      const next = { ...current };
      if (message) next.coverImage = message;
      else delete next.coverImage;
      return next;
    });
  }

  /**
   * Uploads on selection rather than behind a second "Upload" click. This is
   * an internal tool and there is nothing to configure between the two steps,
   * so the extra button would only be a way to forget to press it and wonder
   * why the cover image never saved.
   */
  async function handleCoverFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Clear the input so re-picking the same file still fires a change event
    // — useful after a failed upload.
    event.target.value = "";
    if (!file) return;

    setLocalPreview(URL.createObjectURL(file));
    setCoverError(null);
    setFormError(null);
    setUploading(true);

    try {
      const uploaded = await uploadImage(file);
      // The CMS-relative URL is what gets stored; resolveMediaUrl turns it
      // into a full src wherever it is rendered.
      update("coverImage", uploaded.url);
    } catch (caught) {
      setLocalPreview(null);
      setCoverError(
        caught instanceof CmsApiError
          ? caught.message
          : "Could not upload that image. Try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  function clearCoverImage() {
    setLocalPreview(null);
    setCoverError(null);
    update("coverImage", "");
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugEdited ? current.slug : toSlug(value),
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    // Normalise before sending so an unfocused slug field can never ship an
    // uppercase or space-separated value the API would reject.
    const slug = toSlug(form.slug || form.title);
    setForm((current) => ({ ...current, slug }));

    const payload: ContentInput = {
      type: form.type,
      slug,
      title: form.title.trim(),
      body: form.body,
      // "" is stored as null by the CMS, so clearing a field does the obvious
      // thing rather than writing an empty string.
      excerpt: form.excerpt.trim(),
      coverImage: form.coverImage.trim(),
      tags: parseTags(form.tags),
      author: form.author.trim(),
      status: form.status,
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
    };

    try {
      if (mode === "edit" && item) {
        await updateContent(item.id, payload);
      } else {
        await createContent(payload);
      }
      router.push("/admin");
    } catch (caught) {
      if (caught instanceof CmsApiError) {
        setFieldErrors(caught.fieldErrors());
        setFormError(caught.message);
      } else {
        setFormError("Something went wrong. Try again.");
      }
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!item) return;
    const confirmed = window.confirm(
      `Delete "${item.title}"?\n\nThis removes it from the CMS permanently.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    setFormError(null);
    try {
      await deleteContent(item.id);
      router.push("/admin");
    } catch (caught) {
      setFormError(
        caught instanceof CmsApiError
          ? caught.message
          : "Could not delete that item.",
      );
      setDeleting(false);
    }
  }

  // Saving mid-upload would store an empty coverImage and silently drop the
  // image the author is watching upload, so the whole form waits.
  const busy = saving || deleting || uploading;

  const coverPreview = localPreview ?? resolveMediaUrl(form.coverImage);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to content
          </Link>
          <h1 className="mt-2 text-[22px] font-semibold tracking-tight text-[var(--cv-ink)]">
            {mode === "edit" ? "Edit content" : "New content"}
          </h1>
          {mode === "edit" && item && (
            <p className="mt-1 font-mono text-[11px] text-[var(--cv-muted)]">
              {item.id}
            </p>
          )}
        </div>

        {mode === "edit" && item && (
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={busy}
            className={dangerButtonClass}
          >
            {deleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className={`${panelClass} flex flex-col gap-5 p-6`}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Type" htmlFor="field-type" error={fieldErrors.type}>
            <select
              id="field-type"
              value={form.type}
              onChange={(event) =>
                update("type", event.target.value as ContentType)
              }
              className={selectClass}
            >
              {CONTENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status" htmlFor="field-status" error={fieldErrors.status}>
            <select
              id="field-status"
              value={form.status}
              onChange={(event) =>
                update("status", event.target.value as ContentStatus)
              }
              className={selectClass}
            >
              {CONTENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Title" htmlFor="field-title" error={fieldErrors.title}>
          <input
            id="field-title"
            required
            value={form.title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className={fieldErrors.title ? inputErrorClass : inputClass}
            placeholder="ISO 42001 in practice"
          />
        </Field>

        <Field
          label="Slug"
          htmlFor="field-slug"
          error={fieldErrors.slug}
          hint="Lowercase letters, numbers and single hyphens. Auto-filled from the title until you edit it."
        >
          <input
            id="field-slug"
            required
            value={form.slug}
            onChange={(event) => {
              setSlugEdited(true);
              update("slug", event.target.value);
            }}
            onBlur={(event) => update("slug", toSlug(event.target.value))}
            className={`${fieldErrors.slug ? inputErrorClass : inputClass} font-mono text-[13px]`}
            placeholder="iso-42001-in-practice"
          />
        </Field>

        <Field label="Excerpt" htmlFor="field-excerpt" error={fieldErrors.excerpt}>
          <textarea
            id="field-excerpt"
            rows={2}
            value={form.excerpt}
            onChange={(event) => update("excerpt", event.target.value)}
            className={fieldErrors.excerpt ? inputErrorClass : inputClass}
            placeholder="One or two lines used on index cards and as the meta description fallback."
          />
        </Field>

        <Field
          label="Body (markdown)"
          htmlFor="field-body"
          error={fieldErrors.body}
          hint="Headings, lists, tables, blockquotes, fenced code, bold / italic / links."
        >
          <textarea
            id="field-body"
            required
            rows={18}
            value={form.body}
            onChange={(event) => update("body", event.target.value)}
            className={fieldErrors.body ? inputErrorClass : textareaClass}
            placeholder={"## Scope first\n\nStart by drawing the boundary…"}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field
              label="Cover image"
              htmlFor="field-cover"
              error={fieldErrors.coverImage}
              hint="Optional. Upload a file, or paste a path or an external URL."
            >
              <div className="flex flex-col gap-3">
                {/* Still a plain text field: an uploaded image fills it in, but
                    pasting a URL or a path under public/ stays just as valid. */}
                <input
                  id="field-cover"
                  value={form.coverImage}
                  onChange={(event) => {
                    setLocalPreview(null);
                    update("coverImage", event.target.value);
                  }}
                  className={
                    fieldErrors.coverImage ? inputErrorClass : inputClass
                  }
                  placeholder="/images/blog/iso-42001.jpg"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--cv-border)] bg-[var(--cv-bg-soft)]">
                    {coverPreview ? (
                      /* eslint-disable-next-line @next/next/no-img-element --
                         blob: previews and CMS-hosted uploads both need a raw
                         img; next/image would demand an allow-listed host. */
                      <img
                        src={coverPreview}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-[var(--cv-muted)]" />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--cv-surface-strong)]/70">
                        <Loader2 className="h-4 w-4 animate-spin text-[var(--cv-muted)]" />
                      </div>
                    )}
                  </div>

                  {/* A label wired to a visually-hidden input: the native file
                      button cannot be styled, and clicking a label whose input
                      is disabled is a no-op, so `busy` genuinely blocks it. */}
                  <label
                    htmlFor="field-cover-file"
                    className={`${secondaryButtonClass} ${
                      busy ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                  >
                    {uploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    {uploading
                      ? "Uploading…"
                      : form.coverImage
                        ? "Replace image"
                        : "Upload image"}
                  </label>
                  <input
                    id="field-cover-file"
                    type="file"
                    accept="image/*"
                    disabled={busy}
                    onChange={(event) => void handleCoverFileChange(event)}
                    className="sr-only"
                  />

                  {form.coverImage && !uploading && (
                    <button
                      type="button"
                      onClick={clearCoverImage}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--cv-muted)] transition-colors hover:text-[var(--cv-ink)]"
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </button>
                  )}

                  <p className="text-[12px] text-[var(--cv-muted)]">
                    JPEG, PNG, WebP, GIF or SVG. Up to 5 MB.
                  </p>
                </div>
              </div>
            </Field>
          </div>

          <Field label="Author" htmlFor="field-author" error={fieldErrors.author}>
            <input
              id="field-author"
              value={form.author}
              onChange={(event) => update("author", event.target.value)}
              className={fieldErrors.author ? inputErrorClass : inputClass}
              placeholder="CompliVibe Team"
            />
          </Field>
        </div>

        <Field
          label="Tags"
          htmlFor="field-tags"
          error={fieldErrors.tags}
          hint="Comma-separated. Lowercased and de-duplicated on save."
        >
          <input
            id="field-tags"
            value={form.tags}
            onChange={(event) => update("tags", event.target.value)}
            className={fieldErrors.tags ? inputErrorClass : inputClass}
            placeholder="iso-42001, ai-governance"
          />
        </Field>

        <Field label="SEO title" htmlFor="field-seo-title" error={fieldErrors.seoTitle}>
          <input
            id="field-seo-title"
            value={form.seoTitle}
            onChange={(event) => update("seoTitle", event.target.value)}
            className={fieldErrors.seoTitle ? inputErrorClass : inputClass}
            placeholder="ISO 42001 in Practice | CompliVibe"
          />
        </Field>

        <Field
          label="SEO description"
          htmlFor="field-seo-description"
          error={fieldErrors.seoDescription}
        >
          <textarea
            id="field-seo-description"
            rows={2}
            value={form.seoDescription}
            onChange={(event) => update("seoDescription", event.target.value)}
            className={fieldErrors.seoDescription ? inputErrorClass : inputClass}
            placeholder="A practical walkthrough of running an ISO 42001 AI management system."
          />
        </Field>

        {formError && (
          <p
            role="alert"
            className="cv-alert-danger rounded-lg border px-3 py-2 text-[12px]"
          >
            {formError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--cv-border)] pt-5">
          <button
            type="submit"
            disabled={busy}
            className={primaryButtonClass}
            style={primaryButtonStyle}
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            {mode === "edit" ? "Save changes" : "Create content"}
          </button>
          <Link href="/admin" className={secondaryButtonClass}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p className={fieldErrorClass}>{error}</p>
      ) : (
        hint && <p className="text-[12px] text-[var(--cv-muted)]">{hint}</p>
      )}
    </div>
  );
}
