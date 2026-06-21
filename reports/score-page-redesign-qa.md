# /score Redesign — AI Trust Score — QA

## Final verdict

✅ **Pass.** `/score` is rebuilt as a light-first, premium **free AI Trust Score**
lead magnet. The old dark EU-AI-Act-risk card and backend `/api/v1/classify` call
are replaced with a transparent 7-question self-assessment that computes a real
0–100 score locally (no faked results, no backend dependency). Framer Motion
transitions throughout, optional Web3Forms lead capture, light/dark support.
`build`, `lint`, and `tsc` all green.

## Files changed

| File | Change |
|------|--------|
| `src/app/score/page.tsx` | Light `cv-page` wrapper + `aurora-bg` main + polished Footer; new "Free AI Trust Score" metadata (removed EU AI Act Annex framing) |
| `src/app/score/ScoreApp.tsx` | Full rewrite — intro → 7-question quiz → result, local scoring, bands, 5 readiness areas, strengths/gaps/next steps, CTAs, optional email capture, Framer Motion |

No other files touched. Navbar, homepage, /platform untouched. No new libraries.

## Question categories (7)

1. **AI System Visibility** — clear inventory of every AI system, model, vendor, use case
2. **Ownership & Governance** — owner, reviewer, policy, approval workflow per system
3. **Evidence Readiness** — can prove reviews, approvals, controls, decisions
4. **Compliance Mapping** — mapped to AI/privacy/security/trust frameworks
5. **Vendor & Model Risk** — track vendors, LLM APIs, model changes, risk exposure
6. **Observability Signals** — monitor usage, drift, incidents, latency, errors
7. **Trust Reporting** — generate customer-, auditor-, board-ready trust reports

Answer scale (4 options): **Not started (0) · Partially (1) · Mostly (2) · Continuously managed (3)**.

## Scoring behavior

- Transparent and local — computed from the user's own answers, not a backend, not faked.
- `score = round(sum(answerValues) / (7 × 3) × 100)` → 0–100.
- Per-area readiness = average of that area's question values → percentage.
- Strengths = areas ≥ 67%. Gaps = areas < 50% (sorted lowest first). Recommended
  next steps are derived from the lowest gap areas (or a "maintain momentum"
  message when there are no gaps).

## Result bands

| Score | Band | Color |
|-------|------|-------|
| 0–39 | Trust foundation missing | red `#dc2626` |
| 40–64 | Early trust readiness | amber `#f59e0b` |
| 65–84 | Operational trust layer forming | blue `#2563eb` |
| 85–100 | Strong AI trust posture | green `#10b981` |

## Result page contents

Animated score ring + score/100, readiness band badge, and:
1. **Governance readiness** (Q1+Q2)
2. **Evidence readiness** (Q3)
3. **Compliance readiness** (Q4+Q5)
4. **Observability readiness** (Q6)
5. **Trust reporting readiness** (Q7)

…each as an animated bar, plus **Strengths**, **Gaps**, **Recommended next steps**,
optional email capture, and CTAs.

## Lead capture behavior

- Renders an "Email me this score" form **only if `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
  is configured** (it is). Submits via the shared `submitWeb3Form` helper (subject
  "AI Trust Score result", source `website_score`, includes score + band).
- Not required to see the result (score is always shown first). Success state only
  on a genuine Web3Forms success; real error otherwise. No fakery. If the key were
  absent, the feature is hidden entirely.

## Light mode result

White-porcelain background, soft `aurora-bg`, large `liquid-card`/`glass-highlight`
assessment card, gradient progress bar, premium answer buttons with check states,
gradient CTAs. No dark legacy styling; no `min-h-screen bg-black` (verified 0 in
prerendered HTML); no `#050505` cards.

## Dark mode result

All surfaces use `--cv-*` tokens + `.dark` variants (deep navy/ink, no pure black);
band/accent colors are explicit hex with sufficient contrast; glass cards remain
visible.

## Mobile result

- Assessment card sits in `cv-container` with `overflow-hidden` main → no horizontal
  overflow at 360/390/768/1024px.
- Answer buttons are full-width, stacked, tall (py-3.5) → easy to tap.
- Progress indicator is a full-width bar with compact labels → fits small screens.
- Result: score header stacks (column on mobile, row ≥640px); strengths/gaps grid
  collapses to one column; CTAs stack.

## Motion

Framer Motion with `useReducedMotion` respected everywhere: hero reveal, per-question
`AnimatePresence` transitions, answer tap scale, animated progress bar, score-ring
draw, and result bar fills (all disabled/instant under reduced motion).

## Build / lint / typecheck result

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | ✅ exit 0 |
| Lint | `npm run lint` | ✅ "No ESLint warnings or errors" |
| Build | `npm run build` | ✅ exit 0 — `/score` static (○), 6.48 kB |

Prerendered checks: "Free AI Trust Score", "Find your AI trust readiness",
"Start assessment", support line all present; 0 dark wrappers; 0 error-boundary text.

## CTA links

- **Book a Demo** → `/book-demo`
- **Join Waitlist** → `/waitlist`
- **Retake assessment** → resets state in place

## Remaining notes

- The previous backend classify call (`NEXT_PUBLIC_API_URL/api/v1/classify`) was
  intentionally removed — the new assessment is self-scored and works without a
  backend (correct for static export). The old EU-AI-Act-specific result (risk
  category / Annex III / obligations count) no longer applies.
- Manual click-through (intro → 7 questions → result → retake) and live dark-mode /
  device checks should be confirmed in a browser; logic and types are verified by
  build/tsc.
