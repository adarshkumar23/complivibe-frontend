# Visible Pages Fix + Navbar/Footer Polish — QA

## Final verdict

✅ **Pass.** Navbar wrapping fixed, footer made consistent + retermed, `/book-demo`,
`/login`, `/signup`, and `/pricing` rebuilt light-first, `/resources` verified
working, and the global dark loading/error/404 templates (which flashed on every
route) converted to the light liquid-glass system. Old enforcement/fine/deadline
copy removed from all visible pages. `build`, `lint`, and `tsc` are all green.

## Files changed

| File | Change |
|------|--------|
| `src/components/ui/resizable-navbar.tsx` | Shrunk `NavbarButton` (h-11→h-10, px-5→px-4, text-sm/bold → text-[13px]/semibold, added `whitespace-nowrap`) so Book Demo is premium but not dominant |
| `src/components/Nav.tsx` | Added `whitespace-nowrap` to dropdown triggers + Pricing link; tightened padding (px-3→px-2.5) so "Trust Layers" never wraps |
| `src/components/Footer.tsx` | New columns per spec; removed CI/CD Trust Gate, Trust Hub, Product Preview, Ebooks; framework links → real slugs; grid 7→8 cols for one clean row |
| `src/app/book-demo/page.tsx` | Full rebuild — light-first, AI trust positioning, "What you'll see" + "What happens next" |
| `src/app/book-demo/BookDemoForm.tsx` | Light liquid-glass inputs/labels, gradient CTA "Book Demo"; logic & fields unchanged |
| `src/app/login/page.tsx` | Full rebuild — aurora bg, centered liquid-glass auth card + desktop trust card |
| `src/app/login/LoginForm.tsx` | Light invite-only waitlist card with new copy |
| `src/app/signup/page.tsx` | Full rebuild to match login auth design |
| `src/app/signup/SignupForm.tsx` | Light invite-only waitlist card with new copy |
| `src/app/waitlist/WaitlistForm.tsx` | Light inputs/labels/success/CTA; removed "August 2026 deadline" placeholder; logic & required fields unchanged |
| `src/app/pricing/page.tsx` | Light-first; order now Pricing → ROI → CTA; removed `bg-black` + "Calculate your fine exposure first" badge; metadata de-feared |
| `src/app/score/ScoreApp.tsx` | Copy-only: replaced "EU AI Act enforcement: August 2, 2026" badge + Annex-only intro with AI trust framing (theme left as-is) |
| `src/app/loading.tsx` | Light cv-page spinner (was `bg-black`) |
| `src/app/error.tsx` | Light aurora "Something went wrong" boundary (was `bg-black`) |
| `src/app/not-found.tsx` | Light aurora 404 (was `bg-black`) |

## Navbar fixes

- **"Trust Layers" wrapping → fixed.** Added `whitespace-nowrap` to every dropdown
  trigger link and its label span, plus the Pricing link.
- Tightened trigger padding (`px-3` → `px-2.5`) to recover space for the shrunk
  (1000px) scrolled navbar without crowding.
- **Book Demo button** reduced from `h-11 px-5 text-sm font-bold` to
  `h-10 px-4 text-[13px] font-semibold` — premium, not oversized. Login button
  matches (shared base styles).
- Navbar **structure, dropdown behavior, floating/resizable logic, theme toggle,
  and mobile menu all unchanged.**

## Footer fixes

- Now light-first liquid glass everywhere (it already used `--cv-*` tokens; the
  "dark footer" was actually the dark *page wrappers*, now all light).
- Columns updated to spec: **Platform** (AI Trust Command Center, AI Governance
  OS, Evidence Vault, Data Observability, AI Trust Graph, Trust Center),
  **Solutions** (incl. Enterprise AI), **Frameworks** (incl. Colorado AI Act, all
  linking to real `/frameworks/<slug>`), **Resources** (Resources, Docs, Customer
  Stories, Changelog, Trust Score), **Company**, **Legal** (Privacy/Terms/
  Cookies/DPA).
- Removed old terms: **CI/CD Trust Gate, Trust Hub, Product Preview, Ebooks.**
- Grid changed `lg:grid-cols-7` → `lg:grid-cols-8` so brand(2) + 6 columns sit on
  one clean row.
- Positioning line retained: "AI Trust Infrastructure for governance, compliance,
  evidence, and observability." Trust-layer badges (primary) + framework chips
  (secondary) preserved.

## Pages fixed

- **/book-demo** — rebuilt (see below).
- **/login**, **/signup** — rebuilt light auth (see below).
- **/pricing** — light, leads with the homepage `Pricing` component, then
  `ROICalculator`, then `CTA`; fear badge removed; prices/currency/add-ons/CTA
  hrefs untouched (component reused, no logic duplicated).
- **/resources** — verified: loads (statically prerendered), no crash, light-first.
- Global **loading / error / 404** boundaries — converted to light.

## Old copy removed

- "EU AI Act enforcement: August 2, 2026" (book-demo + score badge)
- "See your compliance picture in 30 minutes", "Real classification… No fluff",
  Annex III/IV-only framing (book-demo)
- "Calculate your fine exposure first" + "€30M / 6% turnover" stakes box (pricing)
- "We need to comply with EU AI Act before August 2026 deadline…" (waitlist)
- "Get EU-ready" fear framing (signup)
- Verified clean: no `fine exposure | compliance picture | August 2, 2026 |
  calculate your fine | enforcement era | no fluff` strings remain in visible
  pages. Framework names (EU AI Act, DPDP, etc.) retained as coverage examples.

## Light mode result

White-porcelain / aurora backgrounds, liquid-glass cards (`liquid-card`,
`liquid-panel`, `glass-highlight`), gradient-trust accents, premium shadows.
No `bg-black` / `#050505` / `#0A0A0A` wrappers remain on any in-scope page
(verified 0 in prerendered HTML for book-demo, login, signup, pricing, resources,
about, contact, security).

## Dark mode result

All rebuilt pages and boundaries use `--cv-*` tokens and `.dark` variants
(deep navy/ink, no pure black). Forms use `--cv-surface` / `--cv-ink` /
`--cv-border`, so inputs adapt automatically with readable contrast.

## Mobile result

- Navbar: labels no longer wrap; mobile menu unchanged and functional.
- book-demo / login / signup: grids collapse to single column; auth card centers;
  desktop trust card hidden on mobile with a compact heading shown instead.
- Footer: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-8` stacks cleanly.
- Forms full-width and usable; no horizontal overflow (`overflow-hidden` on
  hero/aurora sections + `cv-container`).

## Build / lint / typecheck result

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | ✅ exit 0 |
| Lint | `npm run lint` | ✅ "No ESLint warnings or errors" |
| Build | `npm run build` | ✅ exit 0 — all routes prerender; 0 "Something went wrong" in output |

## Remaining warnings / notes

- **Forms are still front-end only** (`console.log` + `TODO`): BookDemoForm and
  WaitlistForm submit successfully UI-wise but aren't wired to a backend. Logic
  and required fields were preserved exactly.
- **Registrations are invite-only**: `/login` and `/signup` both render the
  waitlist card (existing behavior kept). There is no password login form yet —
  the copy reflects that honestly.
- **Out-of-scope dark pages remain** (not in the screenshot set or QA route list):
  `src/app/score/page.tsx` + the `ScoreApp` interactive assessment (dark by
  design; fear copy was removed) and the four `src/app/legal/*` pages
  (Privacy/Terms/Cookies/DPA, footer-linked). Recommend a follow-up to relight
  these for full consistency.
- `InvestorSection.tsx` and `ScopeQuiz.tsx` still contain deadline copy but are
  **unused/dead** (no imports anywhere) — left untouched.
- `next lint` prints a Next.js 16 deprecation notice (informational only).
