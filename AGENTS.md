# AGENTS.md — abjad-portal

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Backend: Node.js (separate repo, not yours to modify)
- Icons: lucide-react

## Architecture — do not deviate without asking
- **BFF pattern.** The browser never calls the Abjad API directly and never
  holds a token. All backend calls go through `app/api/*/route.ts` handlers.
  Tokens live in `httpOnly` cookies set by those route handlers, via
  `lib/cookies.ts`.
- **Server vs Client Components.** Never pass a function as a prop from a
  Server Component to a Client Component — it will throw at runtime. Redirects
  and other side effects triggered by user action belong inside the client
  component itself (`'use client'`), not passed in from the page.
- Folder layout:
  - `components/` — reusable client components
  - `app/api/` — route handlers that proxy the backend
  - `app/<route>/page.tsx` — pages, server components by default
  - `lib/` — shared helpers (`cookies.ts`, `backend.ts`, `errors.ts`)

## Async UI pattern — follow this exactly for every form/flow
Model async flows as an explicit status union, not separate booleans:
```ts
type Status = "idle" | "loading" | "error" | "success"; // add states as needed, e.g. "polling"
```
One `status` field drives the whole UI. Never derive UI from combinations of
separate `isLoading` / `hasError` booleans — that produces impossible states.

## Error handling
- All backend error codes map through `lib/errors.ts` → `getErrorMessage(code)`.
- Never inline a raw error code or a hand-written error string in a component.
- Errors render in a `role="alert"` element, always.

## Forms
- Controlled inputs only (`value` + `onChange`), never uncontrolled/refs for
  form fields.
- Every input has a real `<label htmlFor>` — never a placeholder standing in
  for a label.
- Validation errors clear as soon as the user edits that field, not only on
  next submit.
- `aria-invalid` and `aria-describedby` on every field that can error.

## Internationalization (next-intl) — required for every new page/component
- Message files are namespaced by feature under messages/<locale>/<namespace>.json
  (e.g. messages/en/auth.json) — never add keys to one giant flat file.
- Never concatenate translated fragments with variables spliced in via string
  concatenation. Use ICU MessageFormat interpolation/plurals for anything with a
  count or variable — Arabic has 6 plural forms, not 2; naive concatenation breaks it.
- Use Tailwind's logical properties, not physical ones, in ALL new UI:
  `ps-`/`pe-` not `pl-`/`pr-`; `text-start`/`text-end` not `text-left`/`text-right`;
  `ms-`/`me-` not `ml-`/`mr-`. This makes RTL (Arabic) work automatically instead of
  requiring a retrofit — apply this rule even to pages that feel unrelated to i18n.
- Every hardcoded user-facing string in a new component must go through
  useTranslations(), not appear as raw JSX text — no exceptions, including button
  labels, placeholder text, and aria-labels.
- Do not invent final Arabic/Amharic translation copy — placeholder/English text
  with a clear TODO marker is correct until real translations are supplied.

## Styling conventions — ABJAD Kids brand (match these exactly, don't invent a new palette)
Source of truth: `app/pricing/page.tsx` and `app/success/page.tsx`, both built from the
real Figma export. Superseded the earlier generic-neutral placeholder palette.
- Page background: `bg-[#FDF9F1]`
- Primary text color: `text-[#2B4238]`
- Card container: `bg-white rounded-[32px] p-6 md:p-8 border border-neutral-200 shadow-sm`
- Primary button: `bg-[#2B4238] hover:bg-[#1E3028] text-white py-4 font-bold rounded-xl` (or `rounded-full` for hero/nav CTAs — check the closest existing page for which)
- Secondary/muted button: `bg-[#F0EBE1] hover:bg-[#E0D8C8] text-[#2B4238] font-bold rounded-xl`
- Disabled/unavailable state: `bg-neutral-100 text-neutral-400 cursor-not-allowed`
- Accent color (badges, highlights): `yellow-400` background with darker yellow text
- Input: standard rounded border, focus ring — no confirmed brand-specific input style
  yet, use `rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm focus:ring-2
  focus:ring-neutral-200` until a real form field appears in a Figma export
- Error state on inputs: `border-red-400 focus:ring-red-200`
- Error text: `text-red-600 text-xs`, directly under the field
- Every real page includes `<Navbar />` from `components/Navbar.tsx` at the top
- Spacing between form fields: `space-y-4`

## Money
- All prices from the API are integer minor units (e.g. `priceEtbSantim`).
- Divide by 100 only at the point of display. Never do arithmetic on the
  divided value.

## Idempotency
- Any `POST /orders` call needs a fresh `Idempotency-Key` (UUID) generated
  once per logical purchase attempt — reuse it across retries of the same
  attempt, generate a new one only when the user starts a genuinely new
  attempt.

## When generating a new screen from Figma
1. Match the patterns above exactly — don't introduce a different button
   style, spacing scale, or state-management approach even if it "looks
   fine."
2. State which existing file you're mirroring (e.g. "structured like
   `components/PaymentModal.tsx`") before writing new code.
3. Place the file in the correct folder per the layout above — don't put
   route handlers outside `app/api/` or components outside `components/`.
4. Flag anywhere the Figma design implies backend behavior that isn't in the
   API guide (new fields, new statuses) instead of inventing an endpoint.