# /resources — Crash Fix & Redesign QA

## Runtime crash root cause

**Exact error (from `next build` prerender + dev overlay):**

```
Error: Functions cannot be passed directly to Client Components unless you
explicitly expose it by marking it with "use server". Or maybe you meant to
call this function rather than return it.
  {$$typeof: ..., render: function, displayName: ...}
                          ^^^^^^^^
```

**Root cause:** `src/app/resources/page.tsx` is a **Server Component** (it exports
`metadata`). It imported lucide-react icon *components* (`BookOpen`, `Layers`,
`GitCommit`, …) and passed them as the `icon={c.icon}` prop into
`PageBentoCard`, which is a `"use client"` component.

In the React Server Components model you cannot pass a function (a React
component is a `forwardRef` object whose `render` is a function) across the
server → client boundary. Each card that received an icon function threw — hence
the "2 runtime issues" in the dev overlay and the app error boundary
("Something went wrong").

This was **not** an icon-name problem — every icon (including `GitCommit`)
exists in lucide-react `0.400.0`. The crash was purely the server→client
function-prop boundary violation.

`src/components/icon-registry.ts` already documents the intended pattern:
> "String → icon map so server components can pass an icon by name (functions
> cannot be passed across the server/client boundary)."

The resources page simply wasn't following it.

## Fix applied

- Pass icons to client cards by **string name** (`icon="ShieldCheck"`), which
  `PageBentoCard` resolves through `iconRegistry`. No function crosses the
  boundary.
- Icons used purely for decoration inside the server component (the hero
  library mockup) are rendered as JSX elements (`<BookOpen />`) — rendering an
  icon server-side is fine; only *passing it as a prop* to a client component is
  not.
- No `try/catch`, no error suppression — the real boundary violation is removed.

The same bug existed on every sibling page using the shared client
`PageBentoCard`, so the build failed on `/blog` (alphabetically first) before it
ever reached `/resources`. Applied the identical mechanical fix (icon component
ref → string name, drop the now-unused `lucide-react` import) so the required
`npm run build` passes.

`src/app/customer-stories/[slug]/page.tsx` was a false positive — it renders
icons inline in server JSX (`const Icon = b.icon; <Icon/>`) and never passes a
function as a prop, so it was left untouched.

## Files changed

- `src/app/resources/page.tsx` — full rebuild (string icons + redesign)
- `src/app/resources/ResourcesSubscribeForm.tsx` — light-glass restyle
- `src/app/blog/page.tsx` — icon refs → string names
- `src/app/about/page.tsx` — icon refs → string names
- `src/app/careers/page.tsx` — icon refs → string names
- `src/app/contact/page.tsx` — icon refs → string names
- `src/app/docs/page.tsx` — icon refs → string names
- `src/app/enterprise/page.tsx` — icon refs → string names
- `src/app/security/page.tsx` — icon refs → string names
- `src/app/trust/page.tsx` — icon refs → string names
- `src/app/customer-stories/page.tsx` — icon refs → string names

Not touched: navbar, homepage, `/platform`, pricing, `customer-stories/[slug]`.
No new libraries added.

## Sections created on /resources

1. **Hero** — kicker `RESOURCES`, title "Resources for building trustworthy
   **AI.**", spec subtitle, CTAs **Explore guides** (`/docs`) + **Book a Demo**
   (`/book-demo`). Hero visual is a light liquid-glass "Resource Library" mockup
   listing AI Trust Guides, Governance Playbooks, Evidence Templates, Framework
   Explainers, Trust Center Examples.
2. **Featured resources bento** — 6 cards (AI Trust Infrastructure Guide, AI
   Governance Playbook, Evidence Vault Checklist, Data Observability for AI
   Teams, Framework Mapping Guide, Trust Center Launch Guide). Honestly
   labelled: cards mapping to real hubs link out (`/docs`, `/frameworks`,
   `/trust`); the two with no destination are tagged **Coming soon**.
3. **Resource categories** — 6 cards (AI Governance, Compliance Automation,
   Evidence Management, Data Observability, Trust Reporting, Framework
   Readiness), on a soft `aurora-bg` section, linking to existing hubs.
4. **Newsletter / subscribe** — `liquid-panel` + `glass-highlight` with the spec
   copy and the functional `ResourcesSubscribeForm`.
5. **CTA** — "Build your AI trust layer with the right **playbooks.**", **Book a
   Demo** (`/book-demo`) + **Start Trust Scan** (`/score`).

Built entirely on the existing design system utilities: `cv-page`,
`cv-container`, `liquid-card`, `liquid-panel`, `bento-card`, `aurora-bg`,
`glass-highlight`, `text-gradient-trust`, `section-kicker`, `section-title`,
`section-subtitle`, `liquid-glass`.

## Light mode result

White-porcelain background with soft aurora, liquid-glass cards, premium
shadows, gradient-trust highlights, Framer Motion reveals via the shared
`Page*` components. No dark legacy styling, no browser-default typography
(form uses cv tokens, not white/black defaults).

## Dark mode result

Inherits the design system's dark tokens (deep navy/ink via `--cv-*` variables;
`.dark` variants of `liquid-card`, `aurora-bg`, `glass-highlight`). Glass cards
remain visible with strong contrast; no pure black. The subscribe form uses
`var(--cv-surface)` / `var(--cv-ink)` / `var(--cv-border)` so it adapts
automatically.

## Mobile result

- Hero visual grid: `sm:grid-cols-2` → single column under 640px.
- Bento grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — clean stacking.
- Subscribe form: `flex-col sm:flex-row`, full-width inputs, usable at 360px.
- Long card titles use `truncate`/`min-w-0` in the hero mockup; all sections sit
  inside `cv-container` with section-level `overflow-hidden`, so no horizontal
  overflow at 360 / 390 / 768 / 1024px.

## Build / lint / typecheck result

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | ✅ exit 0, no errors |
| Lint | `npm run lint` | ✅ "No ESLint warnings or errors" |
| Build | `npm run build` | ✅ exit 0 — `/resources` prerendered (○ Static, 4.93 kB) |

Prerendered `resources.html` contains all five sections and **zero**
"Something went wrong" occurrences.

## Final verdict

✅ **Pass.** Root cause (server→client function-prop violation) fixed properly
without suppression; `/resources` loads as a polished light-first AI Trust
resource hub; the same systemic bug was cleared across sibling pages so the full
build, lint, and typecheck are green.

## Remaining notes

- `ResourcesSubscribeForm` still logs to console (`TODO: wire to email
  service`) — submission is functional UI-wise but not yet connected to a
  backend.
- "Evidence Vault Checklist" and "Data Observability for AI Teams" are tagged
  **Coming soon** (no dedicated article pages exist yet); wire them to real
  pages when published.
