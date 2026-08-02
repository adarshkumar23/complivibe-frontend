import { Plus } from "lucide-react";
import Markdown from "@/components/Markdown";
import type { ContentItem } from "@/lib/content";

/**
 * The FAQ list: native <details> elements, no client JavaScript at all.
 *
 * Keeping this server-rendered means the answers are in the HTML for search
 * engines and for anyone using find-in-page, and the disclosure behaviour is
 * the browser's own — keyboard, screen readers and all. The open animation is
 * CSS (see .cv-faq in globals.css).
 *
 * Grouping is data-driven rather than hardcoded, because the CMS will hold more
 * of these over time: below GROUP_THRESHOLD it stays one flat list, and jump
 * links only appear once there are enough categories to be worth skipping
 * between. Nothing to revisit when the tenth FAQ lands.
 */
const GROUP_THRESHOLD = 6;
const JUMP_LINK_THRESHOLD = 3;
const UNGROUPED = "General";

type Group = { name: string; items: ContentItem[] };

function groupByTag(items: ContentItem[]): Group[] {
  const groups = new Map<string, ContentItem[]>();

  for (const item of items) {
    // The first tag is the category; later tags stay searchable metadata.
    const name = item.tags[0] ?? UNGROUPED;
    const bucket = groups.get(name);
    if (bucket) bucket.push(item);
    else groups.set(name, [item]);
  }

  return [...groups.entries()]
    .map(([name, groupItems]) => ({ name, items: groupItems }))
    .sort(
      (a, b) =>
        // "General" is a fallback, not a category — it goes last.
        Number(a.name === UNGROUPED) - Number(b.name === UNGROUPED) ||
        b.items.length - a.items.length ||
        a.name.localeCompare(b.name),
    );
}

const groupId = (name: string) => `faq-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

export default function FaqAccordion({
  items,
  accent,
}: {
  items: ContentItem[];
  accent: string;
}) {
  const groups = groupByTag(items);
  const shouldGroup = items.length >= GROUP_THRESHOLD && groups.length > 1;
  const showJumpLinks = shouldGroup && groups.length >= JUMP_LINK_THRESHOLD;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      {showJumpLinks && (
        <nav
          aria-label="FAQ categories"
          className="cv-blur-bar sticky top-20 z-20 -mx-1 rounded-full border border-[var(--cv-border)] px-1 py-1 backdrop-blur"
        >
          {/* Scrolls within its own row on narrow screens; the page itself
              never gains a horizontal scrollbar. */}
          <ul className="flex gap-1 overflow-x-auto">
            {groups.map((group) => (
              <li key={group.name}>
                <a
                  href={`#${groupId(group.name)}`}
                  className="inline-flex h-9 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-medium text-[var(--cv-muted)] transition-colors hover:bg-[var(--cv-surface)] hover:text-[var(--cv-ink)]"
                >
                  {group.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {shouldGroup ? (
        groups.map((group) => (
          <section key={group.name} className="flex flex-col gap-3">
            <h3
              id={groupId(group.name)}
              className="scroll-mt-32 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {group.name}
            </h3>
            {group.items.map((item, index) => (
              <FaqItem
                key={item.slug}
                item={item}
                accent={accent}
                defaultOpen={false}
                index={index}
              />
            ))}
          </section>
        ))
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <FaqItem
              key={item.slug}
              item={item}
              accent={accent}
              // One answer open on arrival shows what a disclosure does here
              // without burying the rest of the list.
              defaultOpen={index === 0}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FaqItem({
  item,
  accent,
  defaultOpen,
  index,
}: {
  item: ContentItem;
  accent: string;
  defaultOpen: boolean;
  index: number;
}) {
  return (
    <details
      id={item.slug}
      open={defaultOpen}
      className="cv-faq group motion-safe-reveal scroll-mt-28 overflow-hidden rounded-xl border border-[var(--cv-border)] bg-[var(--cv-surface-strong)] shadow-[var(--cv-shadow-soft)] transition-colors"
      style={{
        // The hover and open borders are tinted from this in globals.css — a
        // custom property is the only way a runtime prop can reach a stylesheet.
        ["--faq-accent" as string]: accent,
        animationDelay: `${Math.min(index, 8) * 50}ms`,
      }}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
        <h4 className="text-[16px] font-semibold leading-snug text-[var(--cv-ink)] transition-colors group-open:text-[var(--cv-ink)] md:text-[17px]">
          {item.title}
        </h4>
        <span
          aria-hidden="true"
          className="cv-faq-icon mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--cv-border)] bg-[var(--cv-bg-soft)] transition-colors"
        >
          {/* One icon, rotated 45° into a close mark — the expanded and
              collapsed states stay unmistakable with no second glyph. */}
          <Plus
            className="h-3.5 w-3.5 text-[var(--cv-muted)] transition-transform duration-300 group-open:rotate-45 group-open:text-[var(--faq-accent)]"
            strokeWidth={2.4}
          />
        </span>
      </summary>

      <div className="cv-faq-body px-6 pb-6">
        <div className="border-t border-[var(--cv-border)] pt-4">
          <Markdown content={item.body} />
        </div>
      </div>
    </details>
  );
}
