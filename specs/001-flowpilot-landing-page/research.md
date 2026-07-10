# Research: FlowPilot Premium AI SaaS Landing Page

**Phase**: 0 -- Research & Decision Log
**Branch**: `001-flowpilot-landing-page`
**Date**: 2026-07-10

All technical decisions made before implementation begins. Every NEEDS CLARIFICATION from the Technical Context is resolved here with a rationale and rejected alternatives.

---

## Decision 1: Next.js Version & Router Strategy

**Decision**: Next.js 16 with App Router (not Pages Router)

**Rationale**:
- App Router is the default and recommended architecture from Next.js 13+. By Next.js 16 it is fully stable and production-proven.
- Built-in support for React Server Components allows zero-JS server-rendered sections (Features, Testimonials, Pricing static data) reducing client bundle size.
- Native Metadata API (`generateMetadata`, `app/sitemap.ts`, `app/robots.ts`) provides first-class SEO without third-party libraries.
- `next/font` with `display: swap` + subsetting is built-in to App Router layout, eliminating FOUT.
- Streaming and Suspense boundaries are available for future progressive enhancement.

**Alternatives Considered**:
- **Pages Router**: Rejected. Considered legacy for new projects. Lacks native Metadata API, requires `next-seo` package, and does not support React Server Components natively.
- **Remix**: Rejected. Excellent framework, but ecosystem, shadcn/ui, and next-themes integrations are all optimized for Next.js. Switching cost is not justified for a landing page.

---

## Decision 2: CSS Strategy -- Tailwind CSS v4 (not v3)

**Decision**: Tailwind CSS v4 with `@tailwindcss/postcss` plugin

**Rationale**:
- Tailwind v4 uses a CSS-native `@theme` directive that maps CSS custom properties (design tokens) directly to Tailwind utility classes. This bridges our `/styles/design-tokens.css` with Tailwind without duplication.
- v4 removes the JavaScript config file requirement (no `tailwind.config.js` for theme values -- they live in CSS). This aligns with Principle VI (design tokens as CSS variables).
- Significantly faster build times (Rust-based Lightning CSS under the hood).
- `prettier-plugin-tailwindcss` v0.6+ supports v4 class sorting.
- No Tailwind v3 `arbitrary value` hacks needed since our design tokens are proper CSS variables.

**Key v4 Migration Notes** (avoid common mistakes):
- Use `@import "tailwindcss"` in `globals.css` (not `@tailwind base; @tailwind components; @tailwind utilities`).
- Config file is `tailwind.config.ts` for plugins only; theme lives in CSS via `@theme`.
- `bg-[--color-primary]` syntax works for CSS variable references.
- `postcss.config.mjs` uses `@tailwindcss/postcss` not `tailwindcss` as the PostCSS plugin.

**Alternatives Considered**:
- **Tailwind CSS v3**: Rejected per constitution ("no Tailwind v3 syntax" constraint in spec) and user input explicitly requesting v4.
- **CSS Modules + Vanilla CSS**: Rejected. User input explicitly requested Tailwind. CSS Modules are used only as fallback for complex animations.
- **Styled Components / Emotion**: Rejected. Runtime CSS-in-JS adds hydration overhead, hurts Core Web Vitals (blocks render), and conflicts with RSC.

---

## Decision 3: Component Library -- shadcn/ui

**Decision**: shadcn/ui as the base UI component system (not a full headless library)

**Rationale**:
- shadcn/ui is not a dependency -- it is a code generator. Components are owned by the project, live in `/components/ui/`, and are fully customizable without `node_modules` friction.
- Built on Radix UI primitives which provide production-grade accessibility (ARIA, keyboard navigation, focus management) satisfying Principle III.
- Components use CSS variables for theming, aligning perfectly with our design token system (Principle VI).
- `class-variance-authority` (CVA) is used for variant management, which produces typed, clean component APIs (Principle VII).
- Next.js + Tailwind + shadcn/ui is the most widely adopted stack in 2025-2026 for production SaaS.

**Alternatives Considered**:
- **Radix UI directly**: Rejected. Too much boilerplate for standard patterns (Button, Input, Card). shadcn/ui is Radix + sensible defaults.
- **Mantine / Chakra UI**: Rejected. These are full CSS-in-JS libraries with their own styling systems that conflict with Tailwind CSS. Bundle overhead not justified.
- **Headless UI (Tailwind Labs)**: Rejected. Less component coverage than Radix, no active development, shadcn/ui already wraps Radix.
- **Custom-only**: Rejected. Reinventing accessible Accordion, Dialog, Dropdown primitives from scratch is error-prone and time-consuming.

---

## Decision 4: Animation Library -- Framer Motion 11

**Decision**: Framer Motion 11 (not GSAP, not CSS-only)

**Rationale**:
- Framer Motion's `useInView`, `useReducedMotion`, and `AnimatePresence` APIs match the project's animation requirements precisely.
- `motion.div` with `variants` + `whileInView` provides declarative, readable animation code that satisfies both Principle IX (hardware-accelerated) and Principle II (readable components).
- `useReducedMotion()` hook automatically reads the OS `prefers-reduced-motion` media query -- satisfying WCAG 2.3.3 without manual media query management.
- Framer Motion 11 introduced significant bundle size improvements via tree-shaking and the new `motion` import.
- Only `transform` and `opacity` variants are used in this project -- both are hardware-accelerated by the browser (compositor thread).

**Performance Mitigation**:
- `next.config.ts` will include `optimizePackageImports: ['framer-motion']` to tree-shake unused modules.
- `AnimatedSection` uses `once: true` to avoid re-triggering animations on scroll back (no repeated layout work).
- Logo marquee in TrustedCompanies uses CSS `@keyframes` animation (not Framer Motion) -- CSS-only animations run on the compositor thread with zero JS overhead.

**Alternatives Considered**:
- **GSAP**: Rejected. Excellent library but heavier, requires license for some plugins, and overkill for page entrance animations.
- **CSS animations only**: Rejected. `useReducedMotion()` and scroll-triggered `once: true` behavior requires JavaScript. CSS-only `@keyframes` cannot be conditionally disabled based on viewport intersection.
- **AOS (Animate on Scroll)**: Rejected. jQuery-era library, no TypeScript support, conflicts with React's rendering model.

---

## Decision 5: Form Management -- React Hook Form + Zod

**Decision**: React Hook Form 7 with `@hookform/resolvers` + Zod 3 schema validation

**Rationale**:
- React Hook Form is uncontrolled by default -- no re-render on every keystroke, which means zero performance overhead for the Waitlist form.
- Zod provides a single source of truth for validation: the same schema validates on the client (RHF resolver) and on the server (`/api/waitlist/route.ts`). This eliminates validation drift.
- The `WaitlistFormSchema` is simple (`z.object({ email: z.string().email() })`), but the pattern scales to more complex forms in the future.
- `@hookform/resolvers/zod` is the canonical bridge with zero manual validation mapping.
- Both libraries have first-class TypeScript support: `useForm<FormData>` + `z.infer<typeof Schema>` provide end-to-end type safety.

**Alternatives Considered**:
- **Formik + Yup**: Rejected. Formik is controlled-by-default (re-renders on every keystroke), heavier, and slower than RHF. Less favorable in the React 19 ecosystem.
- **Native HTML validation**: Rejected. Cannot produce styled, ARIA-accessible error messages or duplicate-detection messaging without JavaScript.
- **Server Actions (Next.js)**: Considered for future. For the prototype phase, `POST /api/waitlist` with localStorage is simpler and more testable than Server Actions with localStorage (which is unavailable server-side).

---

## Decision 6: Theme Management -- next-themes

**Decision**: `next-themes` v0.3 for dark/light mode management

**Rationale**:
- `next-themes` solves the SSR flash-of-unstyled-content (FOUC) problem by injecting a script before React hydration that reads localStorage and applies the theme class before paint.
- Integrates seamlessly with Next.js App Router via a `ThemeProvider` client component wrapping the root layout.
- Persists user preference to localStorage automatically.
- Works with Tailwind CSS v4 `.dark` class-based theming without any configuration.

**Implementation Pattern**:
```
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="flowpilot-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```
- `suppressHydrationWarning` is required on `<html>` to prevent React hydration mismatch from the injected class.
- `attribute="class"` matches Tailwind's `.dark` class strategy.

**Alternatives Considered**:
- **Manual localStorage + CSS class**: Rejected. Cannot solve SSR FOUC without the injected script that next-themes provides.
- **CSS `prefers-color-scheme` only**: Rejected. User must be able to override system preference (FR-002 requires toggle).

---

## Decision 7: Waitlist Storage -- localStorage (Prototype Phase)

**Decision**: `localStorage` via a typed `waitlist-store.ts` module (no database for prototype)

**Rationale**:
- The spec explicitly states (Assumption-001): "waitlist registrations will be persisted in-memory or via local storage for the prototype phase."
- A typed store module (`getEntries`, `addEntry`, `hasEntry`) encapsulates all localStorage access behind a clean interface, making it trivial to swap to a real database (Supabase, PlanetScale) later by replacing only `waitlist-store.ts`.
- The API route (`/api/waitlist`) handles duplicate detection server-side with a 409 response, so the UX behavior (duplicate notice) is correctly implemented even in the prototype.

**localStorage Key**: `flowpilot_waitlist` (string, serialized JSON array of `WaitlistEntry[]`)

**Storage Limitation Handling**: If `localStorage.setItem` throws (storage quota exceeded), the API route returns a 500 and the form shows a generic retry error.

**Migration Path** (when moving to production database):
1. Replace `waitlist-store.ts` with a database client (e.g., Supabase `insert + select`)
2. No changes required to `useWaitlistForm`, `WaitlistForm`, or the API route contract
3. Add `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` to `.env`

---

## Decision 8: Testing Strategy

**Decision**: Jest 29 + React Testing Library 16 (unit + integration tests for components and hooks)

**Rationale**:
- RTL's `userEvent` API enables realistic user interaction simulation (typing, clicking, submitting) without internal implementation details.
- Testing approach focuses on user-visible behavior: "given a user submits an invalid email, an error message appears" rather than internal state.
- `jest-environment-jsdom` provides a DOM environment for component rendering.
- Snapshot testing is explicitly avoided -- RTL `getByRole`, `getByText`, `findByText` queries are more maintainable and resilient to style changes.

**Test Coverage Targets**:
- `WaitlistForm`: idle state, invalid email error, duplicate email notice, success state, loading state
- `Navbar`: renders all nav links, mobile menu open/close, ThemeToggle renders
- `ThemeToggle`: toggles theme class on click
- `BillingToggle`: switches between monthly and annual pricing
- `FAQ Accordion`: item expands on click, collapses on second click

**Alternatives Considered**:
- **Playwright (E2E)**: Deferred. E2E tests for the full page flow are a strong addition but out of scope for the prototype milestone. Can be added in a follow-up task.
- **Vitest**: Rejected. Jest is more widely supported by `@testing-library` and has better `jest-environment-jsdom` integration. Vitest is a strong alternative but not yet the default for Next.js projects.

---

## Resolved Clarifications Summary

| Item | Resolution |
|---|---|
| App Router vs Pages Router | App Router (stable, native Metadata API, RSC support) |
| Tailwind version | v4 with @tailwindcss/postcss, CSS-native @theme |
| UI component strategy | shadcn/ui (code-owned Radix primitives, CVA variants) |
| Animation approach | Framer Motion 11, transform+opacity only, useReducedMotion |
| Form validation | React Hook Form 7 + Zod 3 + @hookform/resolvers |
| Theme persistence | next-themes, attribute="class", storageKey="flowpilot-theme" |
| Waitlist persistence | localStorage via typed waitlist-store.ts module |
| Testing framework | Jest 29 + RTL 16, behavior-driven, no snapshots |
