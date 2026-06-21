# Custom Waitlist + Book Demo (Web3Forms) — QA

## Final verdict

✅ **Pass (with one caveat on the key test).** Built a premium `/waitlist` page and
rebuilt `/book-demo`, both submitting **real** data to Web3Forms client-side via a
shared helper, with full validation, real success-only states, and real error
states. `/login` keeps the waitlist flow and the app sign-in button. Key is stored
only in `.env.local` (gitignored), `.env.example` documents the empty var, and the
key is **not** in any tracked file. `build`, `lint`, and `tsc` are all green.

## Web3Forms key test result

⚠️ **The curl/terminal test cannot pass on a Web3Forms free plan** — it is not a
key problem.

- Plain `curl` POST →
  `{"success": false, "message": "This method is not allowed. Use our API in client side or contact support with server IP address (Pro plan is required)"}`
- `curl` with browser headers (Origin/Referer/User-Agent) → Cloudflare
  "Just a moment…" managed JS challenge (HTML, not the API).

Web3Forms' free plan **only accepts submissions from a real browser** (the message
literally says "Use our API in client side"); the endpoint is Cloudflare-protected
against non-browser clients. A server-side `curl` test will therefore always fail
regardless of key validity. The founder reviewed this and chose to proceed with the
client-side implementation (the only supported usage). The key **was** confirmed to
be wired correctly (inlined into the client bundle at build time).

## Whether a test email was sent

❌ Not from the terminal — the curl submission was rejected/challenged, so no
confirmable test email was sent and none was faked. **Verify in-browser:** run the
app, submit `/waitlist` or `/book-demo`, and check the founder inbox. Success only
renders on a genuine Web3Forms `success: true`.

## Files changed

| File | Change |
|------|--------|
| `src/lib/submitWeb3Form.ts` | **New** shared helper — reads `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, validates it exists, POSTs to `api.web3forms.com/submit`, resolves only on real success, throws descriptive errors otherwise |
| `src/app/waitlist/page.tsx` | **New** premium `/waitlist` page (aurora, liquid-glass card, spec copy) |
| `src/app/waitlist/WaitlistForm.tsx` | Rewritten — new fields, hidden fields, honeypot, validation, Web3Forms submit, real success/error states (shared by login + signup) |
| `src/app/book-demo/page.tsx` | New copy ("See CompliVibe in action."), short "What you'll see" side card |
| `src/app/book-demo/BookDemoForm.tsx` | Rewritten — new fields, hidden fields, honeypot, validation, Web3Forms submit |
| `.env.example` | Replaced obsolete `NEXT_PUBLIC_DEMO_FORM_ENDPOINT` with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=` (empty) |
| `.env.local` | **New, gitignored** — holds the real key (not committed) |

`src/app/login/*` and `src/app/signup/*` were verified, not modified this round —
they already render the rewritten `WaitlistForm` and the app sign-in button. Nav
links already correct.

## Waitlist behavior

- Route `/waitlist`: kicker **EARLY ACCESS**, title "Join the CompliVibe waitlist.",
  spec subtitle, liquid-glass card on soft aurora.
- Fields: Full name*, Work email*, Company*, Role*, Company stage* (Startup /
  Growth / Enterprise / Investor · Advisor / Other), Interest* (AI Governance /
  Compliance Automation / Evidence Vault / Data Observability / Trust Center / Not
  sure yet), Message (optional).
- Hidden: `subject: "New CompliVibe waitlist signup"`, `source: "website_waitlist"`,
  `botcheck` honeypot (hidden input; bot fill aborts submit).
- Submit **Join waitlist** → "Joining…" while loading (disabled).
- Success (only on Web3Forms success): "You're on the waitlist. We'll reach out when
  early access opens."
- Error: "Something went wrong. Please try again or email contact@complivibe.in."
  (or the specific API/network message).

## Book Demo behavior

- Route `/book-demo`: kicker **BOOK A DEMO**, title "See CompliVibe in action.",
  spec subtitle; side card "What you'll see" (Map AI systems and owners / Review
  risks and controls / See evidence automation / Explore observability signals /
  Generate trust reports). No enforcement/fine/deadline copy.
- Fields: Full name*, Work email*, Company*, Role*, Company size* (1–10 … 1000+),
  Primary interest* (incl. Pricing, Not sure yet), Preferred time* (This week / Next
  week / Flexible), Message (optional).
- Hidden: `subject: "New CompliVibe demo request"`, `source: "website_book_demo"`,
  `botcheck` honeypot.
- Submit **Request demo** → "Sending…" while loading (disabled).
- Success (only on Web3Forms success): "Demo request sent. We'll get back to you
  shortly."
- Error: same truthful error pattern as waitlist.

## Login sign-in redirect behavior

`/login` keeps the invite-only waitlist card, plus: divider "Already using
CompliVibe?" → secondary "Sign in to CompliVibe App" button →
`https://app.complivibe.in/login` (`target="_blank"`, `rel="noopener noreferrer"`) →
helper "Existing customers can continue to the app workspace." No fake local login.
Verified present in prerendered `login.html`.

## Env vars added

- `.env.example`: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=` (empty, documented).
- `.env.local` (gitignored): real key set. Confirmed inlined into 4 client chunks at
  build time; confirmed **absent** from all git-tracked files; `git check-ignore`
  confirms `.env.local` is ignored.

## Validation result

Both forms (`noValidate`, custom inline errors):

- Required: name, valid email (regex), company, role, and all select fields. Message
  optional. ✅ matches spec.
- Empty submit → inline error under each missing field; invalid email → "Enter a
  valid email address."
- Submit disabled while submitting; honeypot silently blocks bots.
- Network/API failure → real error banner (no fake success, no `setTimeout`).

## Build / lint / typecheck result

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | ✅ exit 0 |
| Lint | `npm run lint` | ✅ "No ESLint warnings or errors" |
| Build | `npm run build` | ✅ exit 0 — `/waitlist`, `/book-demo`, `/login`, `/signup` all static |

Mobile: single-column stacking, two-up select rows collapse on small screens, no
overflow. Dark mode: all inputs/cards use `--cv-*` tokens + `.dark` variants.

## Remaining notes

- **Action required to confirm delivery:** submit either form from a real browser and
  check the founder inbox — this is the only way to validate the free-plan key end to
  end (terminal/server tests can't, by Web3Forms design).
- The previous `NEXT_PUBLIC_DEMO_FORM_ENDPOINT` / mailto fallback was removed; the
  demo form now uses Web3Forms exclusively.
- Web3Forms free plan has a monthly submission cap; upgrade if volume grows.
