# Implementation Plan: FlowPilot Premium AI SaaS Landing Page

**Branch**: `001-flowpilot-landing-page` | **Date**: 2026-07-10 | **Spec**: [spec.md](./spec.md)

---

## Summary

Build a production-ready, premium AI SaaS landing page for **FlowPilot** using **Next.js 16 App Router**, **React 19**, **TypeScript (strict)**, **Tailwind CSS v4**, **shadcn/ui**, **Framer Motion**, **React Hook Form**, and **Zod**. The page targets startups, founders, developers, freelancers, and agencies -- convincing them to join an early-access waitlist. Architecture is mobile-first, WCAG 2.1 AA accessible, SEO-optimized, and targets Lighthouse >= 95. Waitlist data persists client-side via `localStorage` for the prototype phase. Three pages are delivered: **Home**, **Privacy Policy**, and **Terms of Service**.

---

## Technical Context

| Field | Value |
|---|---|
| **Language / Version** | TypeScript 5.5+ (strict mode) |
| **Primary Dependencies** | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (Radix), Framer Motion 11, React Hook Form 7, Zod 3, next-themes 0.3 |
| **Storage** | `localStorage` (client-side prototype) -- no external database |
| **Testing** | Jest 29 + React Testing Library 16 + jest-environment-jsdom |
| **Target Platform** | Web -- Chrome 120+, Firefox 120+, Safari 17+, Edge 120+ |
| **Project Type** | Next.js 16 App Router -- SSG-first, SSR-capable web application |
| **Performance Goals** | Lighthouse Performance >= 95, FCP < 1.5s on 4G, LCP < 2.5s, CLS < 0.1 |
| **Constraints** | Zero TypeScript `any`, zero ESLint/Prettier errors, no Tailwind v3 syntax, `prefers-reduced-motion` respected |
| **Scale / Scope** | 3 pages, 11 landing sections, 1 waitlist form, portfolio/internship submission quality |

---

## Constitution Check

| # | Principle | Status | Notes |
|---|---|---|---|
| I | Mobile-First Responsive Design | PASS | Tailwind CSS v4 min-width breakpoints only |
| II | Component-Based Architecture | PASS | Co-located folders: /components/sections/, /components/ui/, /components/layout/ |
| III | Accessibility (WCAG 2.1 AA) | PASS | shadcn/ui Radix primitives are ARIA-compliant; semantic HTML enforced |
| IV | Performance-First | PASS | next/image + font optimization; hardware-accelerated Framer Motion; lazy-loading |
| V | SEO Optimization | PASS | Next.js 16 Metadata API; OG tags; JSON-LD; app/sitemap.ts; app/robots.ts |
| VI | Consistent Design System | PASS | All values as CSS custom properties in /styles/design-tokens.css |
| VII | Reusable Components | PASS | shadcn/ui primitives with typed props; AnimatedSection reused across sections |
| VIII | TypeScript Strict Mode | PASS | strict: true in tsconfig.json; no any; explicit interfaces everywhere |
| IX | Modern Animations | PASS | Framer Motion uses only transform/opacity; useReducedMotion() respected |
| X | Production-Ready Code | PASS | ESLint + Prettier + tsc --noEmit in every commit gate; .env.example |

**All 10 gates: PASS**

---

## Project Structure

### Documentation (this feature)

`
specs/001-flowpilot-landing-page/
├── spec.md              (Complete) Feature specification
├── plan.md              (Complete) This file
├── research.md          (Complete) Phase 0 output
├── data-model.md        (Complete) Phase 1 output
├── quickstart.md        (Complete) Phase 1 output
├── contracts/           (Complete) Phase 1 output
│   ├── waitlist-api.md
│   ├── component-props.md
│   └── design-tokens.md
├── checklists/
│   └── requirements.md  (All checks passed)
└── tasks.md             (Pending) /speckit.tasks output
`

### Source Code (repository root)

`
flowpilot/
├── app/
│   ├── layout.tsx                    Root layout: ThemeProvider, Inter font, metadata
│   ├── page.tsx                      Home -- all 11 landing sections
│   ├── privacy-policy/page.tsx       Static Privacy Policy page
│   ├── terms/page.tsx                Static Terms of Service page
│   ├── api/waitlist/route.ts         POST /api/waitlist -- Zod + localStorage
│   ├── sitemap.ts                    Auto-generated /sitemap.xml
│   ├── robots.ts                     Auto-generated /robots.txt
│   └── globals.css                   Tailwind CSS v4 directives + CSS reset
│
├── components/
│   ├── layout/
│   │   ├── Navbar/Navbar.tsx
│   │   └── Footer/Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero/Hero.tsx
│   │   ├── TrustedCompanies/TrustedCompanies.tsx
│   │   ├── Features/Features.tsx + FeatureCard.tsx
│   │   ├── AIWorkflow/AIWorkflow.tsx + WorkflowStep.tsx
│   │   ├── DashboardPreview/DashboardPreview.tsx
│   │   ├── Pricing/Pricing.tsx + PricingCard.tsx + BillingToggle.tsx
│   │   ├── Testimonials/Testimonials.tsx + TestimonialCard.tsx
│   │   ├── FAQ/FAQ.tsx
│   │   └── Waitlist/Waitlist.tsx + WaitlistForm.tsx
│   │
│   └── ui/
│       ├── button.tsx / input.tsx / card.tsx / badge.tsx
│       ├── accordion.tsx / separator.tsx / switch.tsx / label.tsx / form.tsx
│       ├── ThemeToggle/ThemeToggle.tsx
│       └── AnimatedSection/AnimatedSection.tsx
│
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useWaitlistForm.ts
│   ├── useIntersectionObserver.ts
│   └── useBillingToggle.ts
│
├── lib/
│   ├── utils.ts            cn() = clsx + tailwind-merge
│   ├── validations.ts      Zod schemas
│   ├── animations.ts       Framer Motion variants
│   ├── constants.ts        NAV_LINKS, SITE_CONFIG, BREAKPOINTS
│   ├── metadata.ts         generateMetadata(), buildJsonLd()
│   └── waitlist-store.ts   localStorage CRUD for WaitlistEntry[]
│
├── types/
│   ├── index.ts            Barrel re-export
│   ├── waitlist.ts         WaitlistEntry, WaitlistFormData, SubmissionState
│   ├── pricing.ts          PricingPlan, BillingInterval, PricingFeature
│   ├── faq.ts              FAQItem
│   ├── testimonial.ts      Testimonial
│   └── feature.ts          FeatureItem, WorkflowStep, CompanyLogo
│
├── data/
│   ├── features.ts / workflow-steps.ts / pricing.ts
│   ├── testimonials.ts / faq.ts / companies.ts
│
├── styles/
│   └── design-tokens.css   All CSS custom properties
│
├── public/
│   ├── images/hero/ companies/ dashboard/ avatars/
│   └── fonts/              Self-hosted Inter WOFF2
│
├── .env.example
├── tailwind.config.ts
├── tsconfig.json           strict: true, paths "@/*"
├── next.config.ts          Security headers, image config
├── eslint.config.mjs
├── prettier.config.mjs
└── jest.config.ts
`

**Structure Decision**: Single Next.js 16 App Router project. No monorepo needed. Static content in /data/ is kept separate from component logic to allow future CMS replacement with zero component changes.

---

## Component Architecture

`
RootLayout
└── ThemeProvider (next-themes)
    ├── Navbar
    │   ├── Logo + NavLinks + ThemeToggle + CTAButton + MobileMenu
    ├── <main>
    │   ├── Hero [id="hero"]
    │   │   └── Badge, <h1>, lead paragraph, dual CTA, hero image
    │   ├── TrustedCompanies [id="trusted"]
    │   │   └── LogoMarquee (CSS infinite scroll)
    │   ├── Features [id="features"]
    │   │   └── SectionHeader + FeatureCard x6 (staggerContainer)
    │   ├── AIWorkflow [id="workflow"]
    │   │   └── SectionHeader + WorkflowStep x4 (slideInLeft stagger)
    │   ├── DashboardPreview [id="dashboard"]
    │   │   └── Mockup image + FloatingBadge x3 (scaleIn)
    │   ├── Pricing [id="pricing"]
    │   │   └── SectionHeader + BillingToggle + PricingCard x3
    │   ├── Testimonials [id="testimonials"]
    │   │   └── SectionHeader + TestimonialCard x6 (stagger grid)
    │   ├── FAQ [id="faq"]
    │   │   └── SectionHeader + Accordion (Radix, keyboard navigable)
    │   └── Waitlist [id="waitlist"]
    │       └── SectionHeader + WaitlistForm
    │           (Input + ErrorMessage + Button + SuccessMessage + DuplicateNotice)
    └── Footer
        └── FooterBrand + FooterLinkGroup x4 + FooterLegal
`

AnimatedSection is the single reusable animation primitive wrapping all section entries.
All motion uses only transform + opacity (hardware-accelerated).
useReducedMotion() disables all variants when OS preference is set.
Animations trigger once per viewport entry via useInView({ once: true }).

---

## Design System

### Color Tokens

`css
:root {
  --color-primary:          #6d28d9;   /* Violet 700 */
  --color-primary-hover:    #5b21b6;
  --color-accent:           #8b5cf6;   /* Violet 500 */
  --color-background:       #ffffff;
  --color-foreground:       #09090b;   /* Zinc 950 */
  --color-card:             #fafafa;
  --color-card-border:      #e4e4e7;
  --color-secondary:        #f4f4f5;
  --color-muted:            #71717a;
  --color-muted-foreground: #a1a1aa;
  --color-border:           #e4e4e7;
  --color-success:          #16a34a;
  --color-error:            #dc2626;
  --gradient-brand:         linear-gradient(135deg, #6d28d9 0%, #2563eb 100%);
  --gradient-hero-bg:       radial-gradient(ellipse at top, #ede9fe 0%, #ffffff 70%);
}
.dark {
  --color-primary:          #8b5cf6;
  --color-primary-hover:    #a78bfa;
  --color-background:       #09090b;
  --color-foreground:       #fafafa;
  --color-card:             #18181b;
  --color-card-border:      #27272a;
  --color-secondary:        #18181b;
  --color-muted:            #a1a1aa;
  --color-border:           #27272a;
  --gradient-hero-bg:       radial-gradient(ellipse at top, #1e1b4b 0%, #09090b 70%);
}
`

### Typography Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| text-xs | 12px | 400 | Captions, labels |
| text-sm | 14px | 400-500 | Body small, hints |
| text-base | 16px | 400 | Default body |
| text-lg | 18px | 500 | Lead paragraph |
| text-xl | 20px | 600 | Card titles |
| text-2xl | 24px | 700 | Section subtitles |
| text-3xl | 30px | 700 | h2 headings |
| text-4xl | 36px | 800 | Page subtitles (md+) |
| text-5xl | 48px | 800 | Hero headline (lg+) |
| text-6xl | 60px | 800 | Hero headline (xl+) |

Font: Inter via next/font/google, display: swap, subsets: latin

### Breakpoints

| Name | Min-Width | Tailwind |
|---|---|---|
| base | 0 | none |
| sm | 640px | sm: |
| md | 768px | md: |
| lg | 1024px | lg: |
| xl | 1280px | xl: |
| 2xl | 1536px | 2xl: |

### Animation Variants (lib/animations.ts)

`	ypescript
export const fadeInUp      = { hidden: { opacity: 0, y: 24 },    visible: { opacity: 1, y: 0,    transition: { duration: 0.5, ease: 'easeOut' } } }
export const fadeInDown    = { hidden: { opacity: 0, y: -16 },   visible: { opacity: 1, y: 0,    transition: { duration: 0.4, ease: 'easeOut' } } }
export const scaleIn       = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } } }
export const slideInLeft   = { hidden: { opacity: 0, x: -32 },   visible: { opacity: 1, x: 0,    transition: { duration: 0.5, ease: 'easeOut' } } }
export const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
`

---

## Dependencies

### Production

`json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "framer-motion": "^11.0.0",
  "react-hook-form": "^7.52.0",
  "zod": "^3.23.0",
  "@hookform/resolvers": "^3.9.0",
  "next-themes": "^0.3.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.0",
  "lucide-react": "^0.400.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.0"
}
`

### Development

`json
{
  "typescript": "^5.5.0",
  "@types/react": "^19.0.0",
  "@types/node": "^20.0.0",
  "tailwindcss": "^4.0.0",
  "@tailwindcss/postcss": "^4.0.0",
  "eslint": "^9.0.0",
  "eslint-config-next": "^16.0.0",
  "@typescript-eslint/eslint-plugin": "^8.0.0",
  "prettier": "^3.3.0",
  "prettier-plugin-tailwindcss": "^0.6.0",
  "jest": "^29.0.0",
  "jest-environment-jsdom": "^29.0.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/jest-dom": "^6.4.0",
  "@testing-library/user-event": "^14.5.0"
}
`

shadcn/ui CLI: `npx shadcn@latest add button input card badge accordion separator switch label form`

---

## Data Flow

`
STATIC (compile-time):
  /data/*.ts  -->  Section components (no runtime fetch, tree-shaken at build)

WAITLIST FORM (runtime):
  User email input
    --> React Hook Form (register, formState)
    --> Zod validation (WaitlistFormSchema)
        invalid --> ErrorMessage (role="alert", aria-live="polite")
        valid   --> POST /api/waitlist
                    --> Zod re-validate in route.ts
                    --> waitlist-store.ts (localStorage read/write)
                        duplicate --> 409 --> DuplicateNotice
                        new entry --> 201 --> SuccessMessage
    --> useWaitlistForm: idle | loading | success | error | duplicate

THEME (runtime):
  ThemeToggle
    --> next-themes setTheme()
    --> localStorage('flowpilot-theme')
    --> class="dark" on <html>
    --> CSS tokens resolve via .dark {} overrides (no re-render cost)

ANIMATIONS (runtime):
  Page scroll
    --> Framer Motion useInView({ once: true, margin: '-100px' })
    --> useReducedMotion() === true --> variants disabled
    --> AnimatedSection: hidden --> visible
    --> Only transform + opacity (hardware-accelerated, zero layout thrash)
`

---

## Development Milestones

### Milestone 1 -- Project Initialization & Tooling (Day 1)

Goal: Working skeleton, all tooling green, before any feature code.

- [ ] npx create-next-app@16 flowpilot --typescript --app --turbopack
- [ ] Install + configure Tailwind CSS v4 + @tailwindcss/postcss
- [ ] npx shadcn@latest init (zinc base, CSS variables on)
- [ ] npx shadcn@latest add button input card badge accordion separator switch label form
- [ ] tsconfig.json: strict: true, paths "@/*": ["./*"]
- [ ] next.config.ts: security headers, image remote patterns
- [ ] eslint.config.mjs: ESLint 9 flat config + @typescript-eslint + next/core-web-vitals
- [ ] prettier.config.mjs: Prettier + prettier-plugin-tailwindcss
- [ ] jest.config.ts: Jest 29 + RTL + jsdom + path alias
- [ ] .env.example: all expected env var keys documented
- [ ] Initial git commit

GATE: npx tsc --noEmit | npx eslint . | npx prettier --check . -- all zero errors

---

### Milestone 2 -- Design System & Core Layout (Day 2)

Goal: Design tokens locked, Navbar/Footer built, dark mode works.

- [ ] /styles/design-tokens.css -- full light/dark CSS custom property sets
- [ ] globals.css wired to design tokens via Tailwind v4 @theme
- [ ] lib/animations.ts -- all five Framer Motion variant objects
- [ ] AnimatedSection wrapper (useInView + useReducedMotion)
- [ ] ThemeToggle (Sun/Moon, next-themes, aria-label, keyboard accessible)
- [ ] Navbar: logo, desktop nav links, ThemeToggle, CTA, accessible mobile drawer
- [ ] Footer: brand + tagline + social links, 4 link groups, legal row
- [ ] Unit tests: Navbar.test.tsx, Footer.test.tsx, ThemeToggle.test.tsx

GATE: Layout correct SM/MD/LG/XL | Dark mode toggles without FOUC | No horizontal scroll

---

### Milestone 3 -- Hero & Trusted Companies (Day 3)

Goal: Above-the-fold is pixel-perfect, fast, and animated.

- [ ] Hero: Badge chip, <h1> headline, lead paragraph, dual CTA, gradient bg
- [ ] Framer Motion: fadeInDown on headline, fadeInUp stagger on subtext + CTAs
- [ ] Hero image: next/image with priority={true} + fill
- [ ] TrustedCompanies: CSS @keyframes marquee, duplicate logos aria-hidden
- [ ] /data/companies.ts: 6-8 company logos
- [ ] Verify: exactly one <h1>, all images have alt text

GATE: Lighthouse FCP <= 1.5s | CLS = 0 | One <h1> | Marquee pauses on prefers-reduced-motion

---

### Milestone 4 -- Features & AI Workflow (Day 4)

Goal: Core value prop sections complete with stagger animations.

- [ ] Features: <h2> header, responsive 1/2/3-col grid
- [ ] FeatureCard: Lucide icon, <h3> title, description, hover shadow
- [ ] /data/features.ts: 6 feature items
- [ ] AIWorkflow: section header, step connector line (vertical/horizontal)
- [ ] WorkflowStep: numbered circle badge, icon, title, body
- [ ] /data/workflow-steps.ts: 4 workflow steps
- [ ] staggerContainer + fadeInUp on FeatureCards; slideInLeft stagger on WorkflowSteps

GATE: Cards reflow at all breakpoints | Animations fire once per viewport entry

---

### Milestone 5 -- Dashboard Preview & Pricing (Day 5)

Goal: Visual proof and conversion-critical pricing table delivered.

- [ ] DashboardPreview: scaleIn AnimatedSection, next/image mockup (WebP 2x lazy), 3 floating overlays
- [ ] BillingToggle: Radix Switch, animated "Save 20%" badge
- [ ] useBillingToggle hook: BillingInterval state + computed prices
- [ ] PricingCard: feature checklist, Pro tier with "Most Popular" Badge + ring border
- [ ] Pricing section: BillingToggle + 1/3-col responsive grid
- [ ] /data/pricing.ts: Free / Pro (/ annual) / Enterprise (/ annual)

GATE: Monthly/Annual prices animate | Pro card distinguished | Billing toggle keyboard accessible

---

### Milestone 6 -- Testimonials, FAQ & Waitlist (Day 6)

Goal: Social proof, Q&A, and primary conversion goal complete.

- [ ] TestimonialCard: next/image avatar, 5-star rating, quote, name, role
- [ ] Testimonials section: stagger grid 1/2/3-col
- [ ] /data/testimonials.ts: 6 entries
- [ ] FAQ: shadcn/ui Accordion (Tab/Enter/Space keyboard support)
- [ ] /data/faq.ts: 8 Q&A pairs
- [ ] lib/validations.ts: WaitlistFormSchema (Zod email + nonempty)
- [ ] lib/waitlist-store.ts: getEntries(), addEntry(), hasEntry() via localStorage
- [ ] app/api/waitlist/route.ts: POST handler, 201/409/422/500
- [ ] useWaitlistForm: state machine (idle/loading/success/error/duplicate)
- [ ] WaitlistForm: RHF + Zod resolver, all accessible states
- [ ] Waitlist section wrapper

GATE: Invalid email -> error | Duplicate -> notice | Valid -> success + reset | Fully keyboard navigable

---

### Milestone 7 -- SEO, Accessibility & Policy Pages (Day 7)

Goal: Lighthouse Accessibility = 100, SEO = 100, legal pages live.

- [ ] lib/metadata.ts: generateMetadata(), buildJsonLd() (WebSite + Organization)
- [ ] layout.tsx: title template, OG image, Twitter summary_large_image
- [ ] app/sitemap.ts + app/robots.ts
- [ ] Privacy Policy page (structured headings, legal copy, back link)
- [ ] Terms of Service page (structured headings, legal copy, back link)
- [ ] All external links: target="_blank" rel="noopener noreferrer"
- [ ] Heading audit: single <h1> in Hero, logical <h2>-<h6> throughout
- [ ] Interactive element audit: :focus-visible outlines, zero keyboard traps
- [ ] Image audit: descriptive alt for informational, alt="" for decorative
- [ ] aria-label on all icon-only buttons; aria-expanded on menu + accordion

GATE: Lighthouse Accessibility = 100 | SEO = 100 | External links secured | Logical tab order

---

### Milestone 8 -- Performance, Polish & Production Hardening (Day 8-9)

Goal: Lighthouse >= 95 Performance, zero violations, cross-browser verified.

- [ ] Convert all raster images to WebP/AVIF with correct sizes attributes
- [ ] next.config.ts: optimizePackageImports for lucide-react + framer-motion
- [ ] Verify prefers-reduced-motion fully disables all animations
- [ ] Full Lighthouse audit: Performance >= 95, Accessibility = 100, SEO >= 95, Best Practices = 100
- [ ] Fix any CLS issues (reserve image dimensions)
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Viewport matrix: 320px / 375px / 768px / 1024px / 1440px / 2560px -- zero horizontal scroll
- [ ] Final: npx tsc --noEmit | npx eslint . | npx prettier --check . | jest -- all clean
- [ ] README.md: setup, dev, build, test, deploy, env vars

GATE: Lighthouse Performance >= 95 | Accessibility = 100 | Zero tsc errors | Zero ESLint warnings | All tests green
