# Tasks: FlowPilot Premium AI SaaS Landing Page

**Branch**: `001-flowpilot-landing-page` | **Date**: 2026-07-10
**Input**: `/specs/001-flowpilot-landing-page/plan.md`, `spec.md`, `data-model.md`, `contracts/`, `research.md`, `quickstart.md`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

---

## Format: `[ID] [P?] [US?] Description`

- **[P]**: Parallelizable -- different files, no in-progress dependency in same phase
- **[US1]**: User Story 1 -- Landing Page Navigation & Visual Appeal (P1)
- **[US2]**: User Story 2 -- Joining the Waitlist (P2)
- **[US3]**: User Story 3 -- Policy & Compliance Navigation (P3)
- No `[US]` label: setup / infrastructure / cross-cutting

## User Stories

| ID | Title | Priority | Independent Test |
|---|---|---|---|
| US1 | Landing Page Navigation & Visual Appeal | P1 | Load /, scroll all sections, toggle dark mode, verify animations fire |
| US2 | Joining the Waitlist | P2 | Submit valid/invalid/duplicate email, verify all form states |
| US3 | Policy & Compliance Navigation | P3 | Click footer links, verify /privacy-policy and /terms load |

---

## Phase 1: Project Setup

**Purpose**: Bootstrap the project, configure all tooling, and create all shared infrastructure. No US work begins until this phase is 100% complete.
**Spec Ref**: plan.md > Milestone 1, research.md > Decisions 1-8, Principle X

### Tooling & Scaffold

- [ ] T001 Bootstrap Next.js 16 App Router -- run `npx create-next-app@16 . --typescript --app --turbopack`, verify `npm run dev` starts on :3000
- [ ] T002 Configure Tailwind CSS v4 -- install `tailwindcss@^4.0.0 @tailwindcss/postcss`; create `postcss.config.mjs`; update `app/globals.css` with `@import "tailwindcss"`
- [ ] T003 Initialize shadcn/ui + install all components -- `npx shadcn@latest init` (zinc base, CSS variables on); `npx shadcn@latest add button input card badge accordion separator switch label form`; verify `components/ui/` populated
- [ ] T004 Configure TypeScript strict mode + path alias -- edit `tsconfig.json`: `"strict": true`, `"paths": { "@/*": ["./*"] }`, `"moduleResolution": "bundler"`
- [ ] T005 [P] Configure ESLint 9 flat config -- create `eslint.config.mjs` with `next/core-web-vitals` + `@typescript-eslint/recommended`; install `eslint@^9 eslint-config-next @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- [ ] T006 [P] Configure Prettier + Tailwind plugin -- install `prettier prettier-plugin-tailwindcss`; create `prettier.config.mjs` with `{ plugins: ["prettier-plugin-tailwindcss"], semi: false, singleQuote: true }`
- [ ] T007 [P] Configure Jest 29 + React Testing Library -- install `jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`; create `jest.config.ts` with `moduleNameMapper` for `@/` alias; create `jest.setup.ts` importing `@testing-library/jest-dom`
- [ ] T008 Configure `next.config.ts` + `.env.example` -- add security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`), `optimizePackageImports: ["lucide-react", "framer-motion"]`; create `.env.example` documenting `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_ID`

**Acceptance (T001-T008)**: `npx tsc --noEmit` zero errors | `npx eslint .` zero warnings | `npx prettier --check .` zero diffs | `npm test` runs with empty suite | `npm run dev` starts on :3000

### Shared Types & Data

- [ ] T009 [P] Create all TypeScript type definitions -- `types/waitlist.ts` (WaitlistEntry, WaitlistFormData, SubmissionState, WaitlistAPIResponse); `types/pricing.ts` (PricingPlan, BillingInterval, PricingFeature); `types/faq.ts` (FAQItem); `types/testimonial.ts` (Testimonial); `types/feature.ts` (FeatureItem, WorkflowStep, CompanyLogo); `types/site.ts` (SiteConfig, NavLink, PageMetaInput); `types/index.ts` barrel re-export
- [ ] T010 [P] Create all static data files -- `data/features.ts` (6x FeatureItem); `data/workflow-steps.ts` (4x WorkflowStep); `data/pricing.ts` (Free/$0, Pro/$19mo/$15annual, Enterprise/$49mo/$39annual); `data/testimonials.ts` (6x Testimonial); `data/faq.ts` (8x FAQItem); `data/companies.ts` (6-8x CompanyLogo); all typed against types/
- [ ] T011 [P] Create `lib/utils.ts` -- implement `cn(...inputs: ClassValue[]): string` via `clsx` + `tailwind-merge`; implement `formatPrice(cents: number, interval: BillingInterval): string` returning `"Free"` when 0, `"$19/mo"` format otherwise
- [ ] T012 [P] Create `lib/constants.ts` + `lib/animations.ts` -- `constants.ts`: `SITE_CONFIG: SiteConfig`, `NAV_LINKS: NavLink[]`, `SOCIAL_LINKS`; `animations.ts`: `fadeInUp`, `fadeInDown`, `scaleIn`, `slideInLeft`, `staggerContainer` as typed Framer Motion `Variants`
- [ ] T013 Create `styles/design-tokens.css` + update `app/globals.css` -- define all CSS custom properties from `contracts/design-tokens.md` (`:root` light + `.dark` overrides for color, spacing, radius, shadow, transition); import into `globals.css` alongside Tailwind directives; add CSS reset; add `html { scroll-behavior: smooth; }` + `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` override so anchor-link scrolling respects the user's motion preference

**Acceptance (T009-T013)**: `npx tsc --noEmit` still zero errors | CSS variables visible in DevTools `:root` | All data arrays conform to types | `cn("px-4", "px-2")` returns `"px-2"` | `formatPrice(0, "monthly")` returns `"Free"`

**CHECKPOINT**: All tooling green + shared infrastructure ready -> Layout work can begin

---

## Phase 2: Layout

**Purpose**: Root layout shell, ThemeProvider, Navbar, Footer -- the structural frame wrapping every page.
**Prerequisite**: Phase 1 complete (types, constants, design tokens, shadcn/ui)
**Spec Ref**: FR-001, plan.md > Component Hierarchy, research.md > Decision 6

> ⚠️ **RSC / "use client" boundary rule**: `app/layout.tsx` is a React Server Component and must never directly import any hook-using code. Every component that calls `useTheme`, `useTheme`, `useState`, `useEffect`, or any other hook must carry the `"use client"` directive at the top of its own file. Affected files in this phase: `components/providers/ThemeProvider.tsx`, `components/layout/Navbar/Navbar.tsx`, `components/ui/ThemeToggle/ThemeToggle.tsx`.

- [ ] T014 Build `app/layout.tsx` root layout + `ThemeProvider` client wrapper -- (a) create `components/providers/ThemeProvider.tsx`: add `"use client"` directive; import `ThemeProvider as NextThemesProvider` from `next-themes`; export a `ThemeProvider` wrapper component passing `attribute="class"`, `storageKey="flowpilot-theme"`, `enableSystem`, `disableTransitionOnChange` props; (b) in `app/layout.tsx` (Server Component -- no `"use client"`): import the `ThemeProvider` wrapper from `components/providers/ThemeProvider.tsx`; load Inter font via `next/font/google` (`display: "swap"`, `subsets: ["latin"]`); apply font CSS variable to `<html>`; set `suppressHydrationWarning` on `<html>` to prevent SSR mismatch; wrap `{children}` with `<ThemeProvider>`
- [ ] T015 [P] [US1] Build `ThemeToggle` component -- create `components/ui/ThemeToggle/ThemeToggle.tsx`; use `useTheme()` from next-themes; render `<Sun>` icon when dark, `<Moon>` when light (lucide-react); `aria-label` dynamically reads `"Switch to dark theme"` or `"Switch to light theme"`; keyboard focusable with `:focus-visible` ring using `--color-primary`
- [ ] T016 [US1] Build `Navbar` desktop -- create `components/layout/Navbar/Navbar.tsx`; `sticky top-0 z-[200]`; logo SVG linking to `/`; desktop nav links from `NAV_LINKS` (anchor `href="#section-id"`); `<ThemeToggle>`; `"Get Early Access"` CTA `<Button>` linking to `#waitlist`; backdrop-blur + semi-transparent bg on scroll (useEffect + scroll listener)
- [ ] T017 [US1] Build `Navbar` mobile drawer -- extend `Navbar.tsx`; hamburger `<button>` `aria-label="Open navigation menu"` + `aria-expanded={isOpen}`; Framer Motion `AnimatePresence` + `motion.nav` slide-in drawer; focus trap: Tab cycles within open drawer; Escape key closes; outside click closes; `aria-expanded` state kept in sync
- [ ] T018 [P] [US1] Build `Footer` component -- create `components/layout/Footer/Footer.tsx`; FooterBrand (logo + tagline + social icon links); 4 FooterLinkGroup columns (Product, Resources, Legal, Company); FooterLegal row (copyright + Privacy Policy + Terms links); ALL external links: `target="_blank" rel="noopener noreferrer"`; social icon links: `aria-label="[Platform] (opens in new tab)"`
- [ ] T019 [US1] Wire `app/page.tsx` scaffold -- import all 11 sections as placeholder `<div>` elements; give each the correct section ID: `hero`, `trusted`, `features`, `workflow`, `dashboard`, `pricing`, `testimonials`, `faq`, `waitlist`; add `<Navbar>` and `<Footer>` in `layout.tsx`; verify IDs match `NAV_LINKS` anchor hrefs

**Acceptance (T014-T019)**: Page loads with Navbar + Footer visible | Dark mode toggles without FOUC on hard refresh | Mobile hamburger opens/closes drawer | Escape closes drawer | Tab stays within open drawer | All 11 section anchor IDs present | Footer external links have `rel="noopener noreferrer"`

**CHECKPOINT**: Structural shell complete -> Section components can be built in parallel

---

## Phase 3: Components

**Purpose**: All 11 landing page sections. Tasks marked [P] after T020 can be built simultaneously.
**Prerequisite**: Phase 2 complete (layout shell + page scaffold with section IDs)
**Spec Ref**: spec.md > US1 (FR-001 through FR-008), data-model.md entities, contracts/component-props.md

- [ ] T020 [US1] Build `Hero` section -- create `components/sections/Hero/Hero.tsx`; `<section id="hero">`; announcement `<Badge>` chip; `<h1>` headline with gradient text clip using `--gradient-brand`; lead `<p>`; primary `<Button>` "Join Waitlist" (-> `#waitlist`) + ghost `<Button>` "See Demo"; `next/image` hero visual `priority={true}`; radial gradient bg from `--gradient-hero-bg` token
- [ ] T021 [P] [US1] Build `TrustedCompanies` section -- create `components/sections/TrustedCompanies/TrustedCompanies.tsx`; CSS `@keyframes marquee` infinite `translateX` scroll; logos rendered twice side-by-side; second set `aria-hidden="true"`; visually-hidden `<h2>` with `sr-only` class reading "Trusted by leading companies"; logos from `data/companies.ts` via `next/image`
- [ ] T022 [P] [US1] Build `FeatureCard` + `Features` section -- create `components/sections/Features/FeatureCard.tsx` (resolve Lucide icon by `iconName` string, `<h3>` title, description, hover shadow transition); create `components/sections/Features/Features.tsx` (`<section id="features">`, `<h2>`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, 6 FeatureCards from `data/features.ts`)
- [ ] T023 [P] [US1] Build `WorkflowStep` + `AIWorkflow` section -- create `components/sections/AIWorkflow/WorkflowStep.tsx` (numbered circle badge, Lucide icon, `<h3>`, description, connector line hidden when `isLast={true}`); create `components/sections/AIWorkflow/AIWorkflow.tsx` (`<section id="workflow">`, `<h2>`, vertical on mobile / horizontal on `lg:`, 4 steps from `data/workflow-steps.ts`)
- [ ] T024 [P] [US1] Build `DashboardPreview` section -- create `components/sections/DashboardPreview/DashboardPreview.tsx`; `<section id="dashboard">`; `next/image` mockup with `loading="lazy"`, `sizes="(max-width:768px) 100vw, 80vw"`, explicit `width`/`height` to prevent CLS; 3 floating `<Card>` stat badge overlays (absolute-positioned)
- [ ] T025 [P] [US1] Build `BillingToggle` + `useBillingToggle` hook -- create `hooks/useBillingToggle.ts` (`BillingInterval` state, `toggle()`, `setInterval()`, `isAnnual` boolean); create `components/sections/Pricing/BillingToggle.tsx` (Radix `<Switch>`, "Monthly"/"Annual" labels, "Save 20%" `<Badge>` visible only in annual, `aria-label="Billing interval"`)
- [ ] T026 [US1] Build `PricingCard` + `Pricing` section -- create `components/sections/Pricing/PricingCard.tsx` (`<h3>` plan name, tagline, `formatPrice()` price display, feature list with Lucide Check/X icons, CTA `<Button>`; Pro tier: `ring-2 ring-[--color-primary]` + "Most Popular" `<Badge>`); create `components/sections/Pricing/Pricing.tsx` (`<section id="pricing">`, `<h2>`, `<BillingToggle>`, `grid-cols-1 lg:grid-cols-3`); DEPENDS ON T025
- [ ] T027 [P] [US1] Build `TestimonialCard` + `Testimonials` section -- create `components/sections/Testimonials/TestimonialCard.tsx` (`next/image` avatar 80x80 WebP with descriptive alt, 5-star rating row, `<blockquote>` quote, `<cite>` name+role); create `components/sections/Testimonials/Testimonials.tsx` (`<section id="testimonials">`, `<h2>`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, 6 cards from `data/testimonials.ts`)
- [ ] T028 [P] [US1] Build `FAQ` section -- create `components/sections/FAQ/FAQ.tsx` (`<section id="faq">`, `<h2>`, shadcn/ui `<Accordion type="single" collapsible>`, 8 `<AccordionItem>` from `data/faq.ts`); keyboard: Tab to navigate items, Enter/Space to toggle; each `AccordionTrigger` shows visible `:focus-visible` ring
- [ ] T029 [US1] Complete `app/page.tsx` home assembly -- replace all placeholder `<div>` sections with real component imports in order: Hero, TrustedCompanies, Features, AIWorkflow, DashboardPreview, Pricing, Testimonials, FAQ, Waitlist; wrap below-fold sections with `next/dynamic`; verify exactly one `<h1>` in output

**Acceptance (T020-T029)**: All 11 sections render on `/` | Zero console errors | Exactly one `<h1>` in Hero | All section IDs present | FeatureCards show correct Lucide icons | Pricing cards show correct prices | FAQ expands/collapses on click | Dashboard image loads lazily | CLS = 0

**CHECKPOINT**: All visual sections complete -> Animations layered in Phase 4

---

## Phase 4: Animations

**Purpose**: Framer Motion scroll-triggered entrance animations. Build `AnimatedSection` first (T030), then apply across all sections in parallel.
**Prerequisite**: Phase 3 complete (all section components built)
**Spec Ref**: spec.md > US1 Acceptance Scenario 2 ("animations execute cleanly at 60 FPS"), Principle IX, research.md > Decision 4

- [ ] T030 [US1] Build `AnimatedSection` wrapper -- create `components/ui/AnimatedSection/AnimatedSection.tsx`; accepts `variants` (default `fadeInUp`), `className`, `delay?: number`, `once?: boolean` (default `true`), `margin?: string` (default `"-100px"`), `as?: React.ElementType` (default `"div"`); use Framer Motion `useInView({ once, margin })` + `useReducedMotion()`; when `shouldReduceMotion === true` set `variants = { hidden: {}, visible: {} }` skipping all animation; use `motion[as]` pattern
- [ ] T031 [P] [US1] Add `Hero` entrance animations -- wrap Hero content in `motion.div` with `staggerContainer`; Badge: `fadeInDown` 0s; `<h1>`: `fadeInDown` 0.1s delay; lead `<p>`: `fadeInUp` 0.2s delay; CTA buttons wrapper: `fadeInUp` 0.3s delay; hero image: `scaleIn` 0.1s delay; DEPENDS ON T030
- [ ] T032 [P] [US1] Add `Features` + `AIWorkflow` stagger animations -- wrap Features section in `AnimatedSection` with `staggerContainer`; each `FeatureCard` in `motion.div` with `fadeInUp`; wrap AIWorkflow in `AnimatedSection` with `staggerContainer`; each `WorkflowStep` in `motion.div` with `slideInLeft`; 0.1s stagger delay per item; DEPENDS ON T030
- [ ] T033 [P] [US1] Add `DashboardPreview` + `Pricing` animations -- wrap DashboardPreview content in `AnimatedSection` with `scaleIn`; wrap each `PricingCard` in `motion.div` with `fadeInUp` + stagger delay; add Framer Motion `layout` prop to price `<span>` in PricingCard for smooth price transition on billing toggle; DEPENDS ON T030
- [ ] T034 [P] [US1] Add `Testimonials` + `Waitlist` stagger animations -- wrap Testimonials grid in `AnimatedSection` with `staggerContainer`; each `TestimonialCard` in `motion.div` with `fadeInUp`; wrap Waitlist section heading+form in `AnimatedSection` with `fadeInUp`; DEPENDS ON T030
- [ ] T035 [P] [US1] Implement `TrustedCompanies` CSS marquee + reduced-motion pause -- add `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` in component or CSS module; inner track: `flex w-max`; outer wrapper: `overflow-hidden`; add `@media (prefers-reduced-motion: reduce) { .marquee { animation-play-state: paused } }`; no Framer Motion required -- pure CSS

**Acceptance (T030-T035)**: All section animations trigger on viewport entry only (not on page load) | Each fires exactly once (`once: true`) | macOS/Windows "Reduce Motion" setting disables all Framer Motion animations AND pauses the marquee | Chrome DevTools Performance tab shows no Layout or Paint records during any animation (only Composite) | `AnimatedSection` renders as `section`, `article`, or `div` without TypeScript errors

**CHECKPOINT**: Full US1 (visual + animated landing page) independently testable -> Proceed to US2 Waitlist

---

## Phase 5: Waitlist

**Purpose**: Complete waitlist signup end-to-end. Tasks in strict dependency order.
**Prerequisite**: T009 (types), T011 (utils), T013 (design tokens) from Phase 1
**Spec Ref**: spec.md > US2 (FR-003, FR-004), Edge Cases (duplicate, network error, keyboard), data-model.md > Waitlist Domain, contracts/waitlist-api.md

- [ ] T036 [US2] Create `lib/validations.ts` -- implement `WaitlistFormSchema`: `z.object({ email: z.string().min(1, "Email address is required.").email("Please enter a valid email address.").max(254, "Email address is too long.").transform(val => val.toLowerCase().trim()) })`; export `WaitlistFormData = z.infer<typeof WaitlistFormSchema>`
- [ ] T037 [P] [US2] Create `lib/waitlist-store.ts` -- **client-only module** (add `"use client"` at top); `getEntries(): WaitlistEntry[]` (JSON.parse localStorage `"flowpilot_waitlist"`, return `[]` on parse error or missing key); `hasEntry(email: string): boolean` (case-insensitive match on normalized stored emails); `addEntry(entry: WaitlistEntry): void` (append + JSON.stringify back, throw on `QuotaExceededError`); this module is NEVER imported by any server-side file (API routes, Server Components, `lib/metadata.ts`)
- [ ] T038 [US2] Build `POST /api/waitlist` route -- create `app/api/waitlist/route.ts`; **validation-only -- no localStorage imports**; parse JSON body; Zod-validate with `WaitlistFormSchema` (return 422 + `VALIDATION_ERROR` on failure); on valid email return 200 + `{ success: true, email }` (the client hook is responsible for duplicate-checking and persisting to localStorage); all response shapes typed as `WaitlistAPIResponse`; DEPENDS ON T036 only
- [ ] T039 [US2] Build `useWaitlistForm` hook -- create `hooks/useWaitlistForm.ts`; add `"use client"` directive; `useForm<WaitlistFormData>({ resolver: zodResolver(WaitlistFormSchema) })`; `submissionState: SubmissionState` via `useState({ status: "idle" })`; `onSubmit(data)`: (1) call `hasEntry(email)` from `lib/waitlist-store.ts` -- if true, immediately set `duplicate` state and return without fetching; (2) set loading; (3) `fetch("POST /api/waitlist")`; (4) on 200 response call `addEntry({ id: crypto.randomUUID(), email, registeredAt: new Date().toISOString(), isValid: true })` then set `success` state; (5) on 422 set `error` with Zod message; (6) on network failure set `error` with retry message; catch `QuotaExceededError` from `addEntry` -> set `error`; `reset()`: `form.reset()` + set idle; DEPENDS ON T036 + T037
- [ ] T040 [US2] Build `WaitlistForm` component -- create `components/sections/Waitlist/WaitlistForm.tsx`; `<form noValidate>`; `<Input type="email" aria-describedby="email-error" aria-invalid={!!errors.email}`; `<p id="email-error" role="alert" aria-live="polite">` for error message; `<Button type="submit" disabled={status==="loading"}`; loading: `<Loader2>` spinner + `aria-label="Submitting"`; success state: hide `<form>`, show `<p role="status">` success message; duplicate: show `<p role="status">` notice with reset option; error: show retry message + re-enable button; DEPENDS ON T039
- [ ] T041 [US2] Build `Waitlist` section wrapper -- create `components/sections/Waitlist/Waitlist.tsx`; `<section id="waitlist">`; `<h2>` headline; lead `<p>` subtext; `<WaitlistForm />`; privacy micro-copy ("We respect your privacy. Unsubscribe anytime."); wrap in `AnimatedSection` with `fadeInUp`; DEPENDS ON T040

**Acceptance (T036-T041)**: POST valid email -> 201 + entry in localStorage `flowpilot_waitlist` | POST invalid email -> 422, Zod error message shown inline | POST duplicate -> 409, DuplicateNotice shown (not an error state) | Empty submit -> "Email address is required." with `role="alert"` | `email@DOMAIN.COM` normalized to `email@domain.com` | Loading: button disabled + spinner visible | Success: form hidden, success message with `role="status"` | Network error: generic retry message + button re-enabled

**CHECKPOINT**: US2 independently verifiable via quickstart.md Scenarios 3-6 -> Proceed to SEO/Policy (US3)

---

## Phase 6: SEO

**Purpose**: Metadata, structured data, sitemap, robots.txt, and policy pages for FR-005, FR-006 and Principle V.
**Prerequisite**: Phase 2 (root layout), Phase 3 (T029 page assembly)
**Spec Ref**: spec.md > US3, Principle V, SC-003 (SEO >= 95), FR-006

- [ ] T042 [US3] Create `lib/metadata.ts` helpers -- implement `generatePageMetadata({ title, description, path }: PageMetaInput): Metadata` returning Next.js `Metadata` with `title`, `description`, `openGraph` (title, description, url, siteName, images, type: "website"), `twitter` (card: "summary_large_image"), `alternates: { canonical: url }`; implement `buildJsonLd(type: "WebSite" | "Organization"): string` returning valid schema.org JSON string
- [ ] T043 [US3] Configure root `layout.tsx` + `app/page.tsx` metadata -- `app/layout.tsx`: export `metadata` with `title: { template: "%s | FlowPilot", default: "FlowPilot" }`, `description`, `metadataBase: new URL(SITE_CONFIG.url)`, `openGraph`, `twitter`; `app/page.tsx`: export `generateMetadata()` using `generatePageMetadata()`; DEPENDS ON T042
- [ ] T044 [P] [US3] Add JSON-LD structured data -- in `app/layout.tsx` `<head>`, add two `<script type="application/ld+json">` tags via `dangerouslySetInnerHTML`: one for WebSite schema (name, url, description), one for Organization schema (name, url, logo, sameAs array from SOCIAL_LINKS); DEPENDS ON T042
- [ ] T045 [P] [US3] Build `app/sitemap.ts` + `app/robots.ts` -- `sitemap.ts`: return `MetadataRoute.Sitemap` for `/`, `/privacy-policy`, `/terms` with `lastModified: new Date()`, `changeFrequency: "monthly"`, `priority` values; `robots.ts`: return `MetadataRoute.Robots` with `rules: [{ userAgent: "*", allow: "/" }]`, `sitemap: SITE_CONFIG.url + "/sitemap.xml"`
- [ ] T046 [US3] Build Privacy Policy + Terms pages -- create `app/privacy-policy/page.tsx`: one `<h1>` "Privacy Policy", `<h2>` subsections (Data Collection, Data Use, Cookies, Your Rights, Contact), `generateMetadata()` for SEO, "Back to Home" link; create `app/terms/page.tsx`: same structure with Terms-specific content; both statically generated; DEPENDS ON T042

**Acceptance (T042-T046)**: `view-source:localhost:3000` shows correct `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<meta name="twitter:card" content="summary_large_image">` | `/sitemap.xml` returns valid XML with 3 URLs | `/robots.txt` references correct sitemap URL | Footer Privacy Policy + Terms links navigate to correct pages | Both policy pages have one `<h1>` + Back to Home link | JSON-LD present in page source

**CHECKPOINT**: US3 independently verifiable via quickstart.md Scenario 9 -> Proceed to Accessibility audit

---

## Phase 7: Accessibility

**Purpose**: WCAG 2.1 AA compliance audit and remediation across all completed sections.
**Prerequisite**: Phases 3-6 complete (all sections, waitlist, SEO built)
**Spec Ref**: Principle III, SC-003 (Lighthouse Accessibility = 100), SC-004 (100% keyboard navigable), FR-006, FR-007, FR-008, spec.md > Edge Cases > Accessibility

- [ ] T047 [P] Audit + enforce heading hierarchy -- in browser DevTools Accessibility panel, verify: exactly one `<h1>` in Hero across full page; every section has a direct `<h2>` (Features, AIWorkflow, DashboardPreview, Pricing, Testimonials, FAQ, Waitlist; TrustedCompanies uses sr-only `<h2>`); FeatureCard/WorkflowStep/PricingCard/TestimonialCard use `<h3>`; no skipped heading levels; fix all violations in source
- [ ] T048 [P] Add ARIA attributes throughout -- `ThemeToggle`: dynamic `aria-label` "Switch to dark/light theme"; Navbar hamburger: `aria-label="Open navigation menu"` + `aria-expanded={isOpen}`; close button: `aria-label="Close navigation menu"`; mobile drawer `<nav>`: `aria-label="Mobile navigation"`; Footer social links: `aria-label="[Platform] (opens in new tab)"`; `WaitlistForm` input: `aria-describedby="email-error"` + `aria-invalid={!!errors.email}`; FAQ: verify Radix AccordionTrigger has `aria-expanded` (not overridden)
- [ ] T049 [P] Implement focus state styles -- in `app/globals.css` add: `*:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; border-radius: var(--radius-sm); }` and `*:focus:not(:focus-visible) { outline: none; }`; override shadcn/ui ring utilities to use `--color-primary`; Tab through entire page: verify every interactive element (all buttons, inputs, nav links, accordion triggers, social links, ThemeToggle) shows clearly visible brand-color focus ring; fix any un-focusable or invisible-focus element
- [ ] T050 [P] Keyboard navigation audit + external link security -- manually Tab through: Navbar desktop, Navbar mobile drawer (verify focus trap: Tab cycles within, Escape closes), all sections, FAQ accordion (Tab between items, Enter/Space toggles), Waitlist form (label -> input -> button), Footer; document and fix any keyboard trap; audit ALL external links in Footer, TrustedCompanies logos, and any external CTAs -- verify `target="_blank" rel="noopener noreferrer"` present
- [ ] T051 [P] Image alt text audit -- audit every `<Image>` and `<img>` in codebase; informational images (hero visual, dashboard mockup, testimonial avatars, company logos): descriptive `alt` text matching `data-model.md` (e.g., `CompanyLogo.logoAlt`, `Testimonial.avatarAlt`); decorative images (background shapes, gradients): `alt=""`; WaitlistForm loading spinner icon: ensure `aria-label` on the icon-only element

**Acceptance (T047-T051)**: Chrome Lighthouse Accessibility = 100 | axe DevTools browser extension zero violations | Tab-only navigation reaches every interactive element | No keyboard traps anywhere | Focus ring visible at every stop with brand color | All external links have `rel="noopener noreferrer"` | One `<h1>`, logical heading hierarchy confirmed with no skipped levels

**CHECKPOINT**: Accessibility = 100 target met -> Proceed to Testing

---

## Phase 8: Testing

**Purpose**: Unit and integration tests for all testable units. All tasks [P] -- touch different files, run simultaneously.
**Prerequisite**: Phases 3-7 complete (all components and logic built)
**Spec Ref**: quickstart.md > Validation Scenarios, contracts/component-props.md hook interfaces, plan.md > Milestone (test gates)

- [ ] T052 [P] Test `ThemeToggle` -- create `components/ui/ThemeToggle/ThemeToggle.test.tsx`; mock `next-themes` `useTheme`; test 1: renders Moon icon when theme is "light"; test 2: renders Sun icon when theme is "dark"; test 3: click calls `setTheme` with correct next value; test 4: `aria-label` attribute is present and non-empty
- [ ] T053 [P] [US1] Test `Navbar` -- create `components/layout/Navbar/Navbar.test.tsx`; test 1: logo `<a>` has `href="/"`; test 2: all NAV_LINKS render with correct text and href; test 3: "Get Early Access" CTA has `href="#waitlist"`; test 4: hamburger button has `aria-expanded="false"` initially; test 5: click hamburger -> `aria-expanded="true"` + mobile menu visible; test 6: press Escape with drawer open -> drawer closes
- [ ] T054 [P] [US3] Test `Footer` -- create `components/layout/Footer/Footer.test.tsx`; test 1: "Privacy Policy" link has `href="/privacy-policy"`; test 2: "Terms" link has `href="/terms"`; test 3: all external links have `rel="noopener noreferrer"`; test 4: copyright text contains current year; test 5: all social link anchor elements have `aria-label` attribute
- [ ] T055 [P] [US1] Test `AnimatedSection` reduced-motion -- create `components/ui/AnimatedSection/AnimatedSection.test.tsx`; mock `framer-motion` `useReducedMotion` to return `true`; test 1: component renders children without error; test 2: applied motion variants are empty `{}`; mock `useReducedMotion` to return `false`; test 3: applied motion variants match `fadeInUp` from `lib/animations.ts`
- [ ] T056 [P] [US2] Test `WaitlistForm` all states -- create `components/sections/Waitlist/Waitlist.test.tsx`; mock global `fetch`; test 1: empty submit -> "Email address is required." error with `role="alert"`; test 2: "not-an-email" submit -> "Please enter a valid email address." error with `role="alert"`; test 3: valid email submit -> button disabled + spinner visible (loading state); test 4: fetch resolves 201 -> `role="status"` success message + form element hidden; test 5: fetch resolves 409 -> `role="status"` duplicate notice shown; test 6: fetch rejects (network error) -> error message + button re-enabled
- [ ] T057 [P] [US2] Test `POST /api/waitlist` route -- create `app/api/waitlist/route.test.ts`; mock `lib/waitlist-store` module; test 1: `POST { email: "test@example.com" }` -> 201 + `{ success: true, entry: { id, registeredAt } }`; test 2: `POST { email: "EXISTING@example.com" }` (hasEntry returns true) -> 409 + `{ success: false, code: "DUPLICATE" }`; test 3: `POST { email: "invalid" }` -> 422 + `{ success: false, code: "VALIDATION_ERROR" }`; test 4: `addEntry` throws QuotaExceededError -> 500 + `{ success: false, code: "STORAGE_ERROR" }`
- [ ] T058 [P] [US1] Test `BillingToggle` + `Pricing` -- create `components/sections/Pricing/Pricing.test.tsx`; test 1: monthly price displays by default (Pro card shows "$19/mo"); test 2: click toggle -> annual prices shown (Pro card shows "$15/mo"); test 3: "Save 20%" badge NOT visible in monthly mode; test 4: "Save 20%" badge visible in annual mode; test 5: BillingToggle switch element has `aria-label` attribute
- [ ] T059 [P] [US1] Test `FAQ` keyboard navigation -- create `components/sections/FAQ/FAQ.test.tsx`; test 1: 8 FAQ questions render with correct text from `data/faq.ts`; test 2: first answer panel not visible initially; test 3: click first question -> answer visible, `aria-expanded="true"`; test 4: press Enter on second question -> answer visible; test 5: press Space on open question -> answer hidden, `aria-expanded="false"`; test 6: Tab key moves focus between AccordionTrigger elements

**Acceptance (T052-T059)**: `npm test` all 42 individual test assertions pass | Zero console.error calls during test run | No test suppresses legitimate errors | Coverage: `lib/validations.ts` = 100%, `lib/waitlist-store.ts` >= 90%, `lib/utils.ts` = 100%

**CHECKPOINT**: All tests green -> Final performance pass and production hardening

---

## Phase 9: Polish & Performance

**Purpose**: Image optimization, bundle analysis, Lighthouse targets, cross-browser validation, and final code quality gates.
**Prerequisite**: All phases 1-8 complete
**Spec Ref**: SC-001 (FCP < 1.5s), SC-003 (Lighthouse >= 90), SC-005 (no horizontal scroll), Principle IV, plan.md > Milestone 8

- [ ] T060 [P] Optimize all images to WebP -- convert/acquire all `/public/images/` assets in WebP format (hero bg, dashboard mockup, testimonial avatars, company logos); add correct `sizes` attributes to every `<Image>`: hero (`sizes="100vw"`), dashboard (`sizes="(max-width:768px) 100vw, 80vw"`), avatars (`sizes="80px"`), company logos (`sizes="(max-width:640px) 120px, 160px"`); verify no image renders larger than its display container
- [ ] T061 [P] Bundle + lazy-loading optimization -- add `optimizePackageImports: ["framer-motion", "lucide-react"]` to `next.config.ts`; convert below-fold section imports in `app/page.tsx` to `next/dynamic` with `{ ssr: false }` for DashboardPreview, Pricing, Testimonials, FAQ (Hero + TrustedCompanies + Features + AIWorkflow stay eagerly imported); run `npx @next/bundle-analyzer` to verify First Load JS for `/` is < 200KB
- [ ] T062 Lighthouse audit + Core Web Vitals remediation -- run `npm run build && npm start`; open Chrome Lighthouse in Incognito (Mobile preset); record baseline; fix all issues blocking: **Performance >= 95** (LCP < 2.5s, CLS < 0.1, TBT < 200ms), **Accessibility = 100**, **SEO >= 95**, **Best Practices = 100**; re-run until all 4 targets met; document fixes in `README.md` under "## Performance"; DEPENDS ON T060 + T061
- [ ] T063 Cross-browser + viewport testing + final code quality gates -- test Chrome 120+, Firefox 120+, Safari 17+, Edge 120+; test viewport widths: 320px, 375px, 768px, 1024px, 1440px, 2560px (zero horizontal scrollbars at all widths); run: `npx tsc --noEmit` (zero errors), `npx eslint .` (zero warnings), `npx prettier --check .` (zero diffs), `npm test` (all green); write `README.md` with sections: Prerequisites, Setup, Development, Build, Testing, Environment Variables, Deployment, Performance; DEPENDS ON T062

**Acceptance (T060-T063)**: Lighthouse Performance >= 95 | Accessibility = 100 | SEO >= 95 | Best Practices = 100 | Zero horizontal scroll 320px-2560px in all 4 browsers | `npx tsc --noEmit` zero errors | `npx eslint .` zero warnings | `npm test` all 42 assertions green | `README.md` present with all required sections

---

## Dependency Graph

```
Phase 1: Project Setup
  T001 -> T002 -> T003 -> T004
  T004 -> T005[P], T006[P], T007[P], T008
  T004 -> T009[P], T011[P], T012[P]
  T009 -> T010[P]  (data files need types)
  T013            (globals, can start after T004)

Phase 2: Layout          [Phase 1 complete]
  T014 -> T015[P], T016
  T015 -> T016  (ThemeToggle used in Navbar)
  T016 -> T017  (mobile extends Navbar)
  T014 -> T018[P]
  T017 + T018 -> T019

Phase 3: Components      [Phase 2 complete]
  T019 -> T020
  T020 -> T021[P], T022[P], T023[P], T024[P], T025[P], T027[P], T028[P]
  T025 -> T026
  T021..T028 -> T029

Phase 4: Animations      [Phase 3 complete]
  T029 -> T030
  T030 -> T031[P], T032[P], T033[P], T034[P], T035[P]

Phase 5: Waitlist        [T009+T011+T013 from Phase 1 -- can overlap with Phase 3/4]
  T036[P] + T037[P]  (parallel with each other)
  T036 + T037 -> T038
  T036 -> T039 -> T040 -> T041

Phase 6: SEO             [Phase 2 + T029 for page context]
  T042 -> T043, T044[P], T045[P], T046

Phase 7: Accessibility   [Phases 3-6 complete -- all parallel with each other]
  T047[P], T048[P], T049[P], T050[P], T051[P]

Phase 8: Testing         [Phases 3-7 complete -- all parallel with each other]
  T052[P], T053[P], T054[P], T055[P], T056[P], T057[P], T058[P], T059[P]

Phase 9: Polish          [Phases 1-8 complete]
  T060[P] + T061[P] -> T062 -> T063
```

---

## Parallel Execution Examples

### Example: Day 4 -- 3 developers building Phase 3 in parallel

```
Developer A:  T022 (Features) + T023 (AIWorkflow)
Developer B:  T024 (DashboardPreview) + T025 (BillingToggle hook)
Developer C:  T027 (Testimonials) + T028 (FAQ)
All converge: T026 (Pricing -- needs T025) then T029 (page assembly)
```

### Example: Day 6 -- Waitlist + SEO + Accessibility in parallel

```
Developer A:  T036 validations -> T037 store -> T038 API -> T039 hook -> T040 form -> T041 section
Developer B:  T042 metadata helpers -> T043 layout meta -> T044 JSON-LD -> T045 sitemap -> T046 policy pages
Developer C:  T047 heading audit + T048 ARIA + T049 focus states + T050 keyboard + T051 alt text
```

### Example: Day 8 -- Full test suite (all 8 test tasks are independent files)

```
All T052-T059 can be assigned one-per-developer or run sequentially in one session.
Estimated time: 20-30 min per test file = ~4 hours total for one developer.
```

---

## Implementation Strategy

### MVP Scope (US1 only -- visual landing page)

Complete: Phase 1 (T001-T013) -> Phase 2 (T014-T019) -> Phase 3 (T020-T029) -> Phase 4 (T030-T035)

Validate: Load `/`, scroll all sections, toggle dark mode, verify 60 FPS animations, test at 375px viewport.
**This delivers a complete, animated, responsive landing page -- portfolio/demo ready.**

### Full Feature Delivery (all 3 user stories)

1. MVP complete (T001-T035) -> US1 validated
2. Phase 5 (T036-T041) -> US2: Waitlist form end-to-end
3. Phase 6 (T042-T046) -> US3: SEO + Policy pages live
4. Phase 7 (T047-T051) -> Accessibility = 100
5. Phase 8 (T052-T059) -> Full test coverage
6. Phase 9 (T060-T063) -> Production-ready Lighthouse scores

### Solo Developer Timeline (9 days)

| Day | Tasks | Deliverable |
|---|---|---|
| Day 1 | T001-T013 | All tooling + types + data + tokens |
| Day 2 | T014-T019 | Layout: Navbar + Footer + root layout |
| Day 3 | T020-T024 | Hero + above-fold sections |
| Day 4 | T025-T029 | Pricing + social proof + page assembly |
| Day 5 | T030-T035 | All animations (US1 complete) |
| Day 6 | T036-T041 | Waitlist form + API (US2 complete) |
| Day 7 | T042-T051 | SEO + Policy pages + Accessibility (US3 complete) |
| Day 8 | T052-T059 | Full test suite |
| Day 9 | T060-T063 | Performance + final QA |

---

## Task Count Summary

| Phase / Group | Task Range | Count | Parallelizable | User Story |
|---|---|---|---|---|
| Phase 1: Project Setup | T001-T013 | 13 | T005,T006,T007,T009,T010,T011,T012 (7) | -- |
| Phase 2: Layout | T014-T019 | 6 | T015, T018 (2) | US1 |
| Phase 3: Components | T020-T029 | 10 | T021-T025, T027, T028 (7) | US1 |
| Phase 4: Animations | T030-T035 | 6 | T031-T035 (5) | US1 |
| Phase 5: Waitlist | T036-T041 | 6 | T036, T037 (2) | US2 |
| Phase 6: SEO | T042-T046 | 5 | T044, T045 (2) | US3 |
| Phase 7: Accessibility | T047-T051 | 5 | T047-T051 (5) | US1+2+3 |
| Phase 8: Testing | T052-T059 | 8 | T052-T059 (8) | US1+2+3 |
| Phase 9: Polish | T060-T063 | 4 | T060, T061 (2) | -- |
| **TOTAL** | **T001-T063** | **63** | **40 parallelizable** | |

---

## Notes

- Every task is scoped to under 2 hours for a single developer
- All [P] tasks touch different files -- safe to parallelize without merge conflicts
- Each phase ends with an explicit acceptance gate -- do not advance until gate passes
- Commit after each completed task or logical group (at minimum after each phase checkpoint)
- Reference `quickstart.md` validation scenarios to manually verify each user story milestone
- The `contracts/` documents are the authoritative source for component interfaces and API shapes during implementation
