/**
 * The tag pill, defined once so index cards, detail headers and the FAQ all
 * render tags at exactly the same size, radius and weight.
 */
export default function ContentTagPills({
  tags,
  size = "sm",
  accent,
}: {
  tags: string[];
  size?: "sm" | "md";
  accent?: string;
}) {
  if (tags.length === 0) return null;

  const sizing =
    size === "md" ? "px-3 py-1 text-[12px]" : "px-2.5 py-0.5 text-[11px]";

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center rounded-full border border-[var(--cv-border)] bg-[var(--cv-surface)] font-medium text-[var(--cv-muted)] ${sizing}`}
          // `accent` is always a var() reference, so both themes track the token.
          style={accent ? { color: accent } : undefined}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
