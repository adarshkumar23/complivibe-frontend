"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import {
  CONTENT_STATUSES,
  CONTENT_TYPES,
  CmsApiError,
  createContent,
  deleteContent,
  parseTags,
  toSlug,
  updateContent,
  type AdminContent,
  type ContentInput,
  type ContentStatus,
  type ContentType,
} from "@/lib/adminApi";
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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
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

  const busy = saving || deleting;

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
          <Field
            label="Cover image"
            htmlFor="field-cover"
            error={fieldErrors.coverImage}
            hint="Optional. Path or URL."
          >
            <input
              id="field-cover"
              value={form.coverImage}
              onChange={(event) => update("coverImage", event.target.value)}
              className={fieldErrors.coverImage ? inputErrorClass : inputClass}
              placeholder="/images/blog/iso-42001.jpg"
            />
          </Field>

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
