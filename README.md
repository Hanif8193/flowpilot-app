<div align="center">

# FlowPilot

### AI-Powered Workflow Automation Platform

A modern, production-ready SaaS landing page built with Next.js 16, React 19, and Tailwind CSS 4.

Featuring dynamic imports, dark/light theme, animated UI, waitlist form with API validation, FAQ accordion, pricing toggle, and full SEO & accessibility compliance.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?logo=prisma)](https://www.prisma.io)
[![Jest](https://img.shields.io/badge/Jest-30-C21325?logo=jest)](https://jestjs.io)

</div>

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Testing](#-testing)
- [Performance](#-performance)
- [Accessibility](#-accessibility)
- [SEO](#-seo)
- [Browser Support](#-browser-support)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## Features

- **AI SaaS Landing Page** — Complete marketing page with 9 sections (Hero, Trusted, Features, Workflow, Dashboard, Pricing, Testimonials, FAQ, Waitlist)
- **Responsive Design** — Fully responsive from 320px to 2560px across all breakpoints
- **Dark / Light Theme** — System preference detection with manual toggle via `next-themes`
- **Animated UI** — Scroll-triggered animations with Framer Motion, respects `prefers-reduced-motion`
- **Waitlist Form** — Email validation with Zod, localStorage deduplication, and POST to `/api/waitlist`
- **API Route** — Server-side validation, duplicate detection, Prisma DB persistence
- **Pricing Toggle** — Monthly/annual billing switch with animated price transitions
- **FAQ Accordion** — Expandable questions with keyboard navigation via `@base-ui/react`
- **Dashboard Preview** — Decorative CSS/HTML dashboard mockup with analytics cards and activity table
- **SEO Optimized** — Metadata, OpenGraph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- **Accessibility** — Skip-to-content, ARIA labels, focus management, semantic HTML, keyboard navigation
- **Dynamic Code Splitting** — Below-the-fold sections loaded via `next/dynamic`, mobile menu lazy-loaded
- **Image Optimization** — Next.js `<Image>` with AVIF/WebP formats, priority loading, responsive `sizes`
- **Font Optimization** — Inter loaded via `next/font/google` with `display: 'swap'` and `preload: true`
- **Security Headers** — X-Frame-Options, HSTS, CSP-compatible headers, Permissions-Policy
- **PWA Support** — `manifest.json` for installability on mobile and desktop
- **Authentication** — NextAuth v5 with Prisma adapter, credentials provider, JWT strategy
- **Unit Testing** — 46 automated tests across 8 suites using Jest 30 and React Testing Library

---

## Tech Stack

### Frontend

| Technology               | Version   | Purpose                              |
| ------------------------ | --------- | ------------------------------------ |
| Next.js                  | 16.2.10   | React framework with App Router      |
| React                    | 19.2.4    | UI library                           |
| TypeScript               | 5.x       | Type safety                          |
| Tailwind CSS             | 4.0       | Utility-first CSS (CSS-first config) |
| Framer Motion            | 12.42     | Scroll animations and transitions    |
| Lucide React             | 1.24      | Icon library                         |
| next-themes              | 0.4.6     | Dark/light theme switching           |
| @base-ui/react           | 1.6       | Accessible accordion primitive       |
| class-variance-authority | 0.7.1     | Component variant management         |
| clsx + tailwind-merge    | 2.1 + 3.6 | Conditional class merging            |

### Backend

| Technology         | Version       | Purpose                            |
| ------------------ | ------------- | ---------------------------------- |
| Next.js API Routes | —             | REST API endpoints                 |
| Prisma ORM         | 7.8           | Database ORM                       |
| PostgreSQL         | —             | Primary database (Neon compatible) |
| NextAuth v5        | 5.0.0-beta.31 | Authentication                     |
| bcryptjs           | 3.0.3         | Password hashing                   |

### Validation

| Technology          | Version | Purpose                 |
| ------------------- | ------- | ----------------------- |
| Zod                 | 4.4.3   | Schema validation       |
| React Hook Form     | 7.81    | Form state management   |
| @hookform/resolvers | 5.4     | Zod integration for RHF |

### Testing

| Technology                  | Version | Purpose                        |
| --------------------------- | ------- | ------------------------------ |
| Jest                        | 30.4    | Test runner                    |
| @testing-library/react      | 16.3    | Component testing              |
| @testing-library/user-event | 14.6    | User interaction simulation    |
| @testing-library/jest-dom   | 6.9     | Custom DOM matchers            |
| jest-environment-jsdom      | 30.4    | Browser environment simulation |

### Formatting & Linting

| Technology                  | Version | Purpose                    |
| --------------------------- | ------- | -------------------------- |
| ESLint                      | 9.x     | Code linting (flat config) |
| eslint-config-next          | 16.2    | Next.js ESLint rules       |
| Prettier                    | 3.9     | Code formatting            |
| prettier-plugin-tailwindcss | 0.8     | Tailwind class sorting     |

---

## Folder Structure

```
flowpilot-app/
├── public/
│   ├── hero-dashboard.png        # Hero section dashboard image
│   ├── manifest.json             # PWA manifest
│   ├── favicon.ico               # Favicon
│   └── *.svg                     # Default icons
├── prisma/
│   └── schema.prisma             # Database schema (User, Account, Session, Waitlist)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts   # NextAuth endpoint
│   │   │   └── waitlist/route.ts             # Waitlist POST endpoint
│   │   ├── login/
│   │   │   ├── page.tsx                      # Login page
│   │   │   └── login-form.tsx                # Login form component
│   │   ├── signup/
│   │   │   ├── page.tsx                      # Signup page
│   │   │   ├── signup-form.tsx               # Signup form component
│   │   │   └── actions.ts                    # Server action for signup
│   │   ├── privacy-policy/page.tsx           # Privacy policy page
│   │   ├── terms/page.tsx                    # Terms of service page
│   │   ├── globals.css                       # Tailwind + shadcn theme tokens
│   │   ├── layout.tsx                        # Root layout (metadata, providers)
│   │   ├── page.tsx                          # Homepage
│   │   ├── robots.ts                         # Robots.txt generator
│   │   └── sitemap.ts                        # Sitemap generator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar/Navbar.tsx             # Desktop + mobile navigation
│   │   │   ├── Navbar/MobileMenu.tsx         # Mobile drawer (lazy-loaded)
│   │   │   └── Footer/Footer.tsx             # Footer with social links
│   │   ├── providers/
│   │   │   ├── Providers.tsx                 # SessionProvider + ThemeProvider
│   │   │   └── ThemeProvider.tsx             # next-themes provider
│   │   ├── sections/
│   │   │   ├── Hero/Hero.tsx                 # Hero with CTA buttons
│   │   │   ├── Trusted/Trusted.tsx           # Company logos strip
│   │   │   ├── Features/Features.tsx         # 6 feature cards
│   │   │   ├── Workflow/Workflow.tsx         # 4-step process
│   │   │   ├── Dashboard/Dashboard.tsx       # Dashboard preview mockup
│   │   │   ├── Pricing/Pricing.tsx           # Pricing cards with toggle
│   │   │   ├── Testimonials/Testimonials.tsx # 3 testimonial cards
│   │   │   ├── FAQ/FAQ.tsx                   # Accordion FAQ
│   │   │   ├── Waitlist/Waitlist.tsx         # Waitlist section wrapper
│   │   │   └── Waitlist/WaitlistForm.tsx     # Waitlist email form
│   │   └── ui/
│   │       ├── Accordion/accordion.tsx       # Base UI accordion
│   │       ├── AnimatedSection/AnimatedSection.tsx  # Scroll animation wrapper
│   │       ├── BillingToggle/BillingToggle.tsx # Monthly/annual switch
│   │       ├── ThemeToggle/ThemeToggle.tsx   # Dark/light toggle
│   │       ├── badge.tsx                     # Badge component
│   │       ├── button.tsx                    # Button variants
│   │       ├── input.tsx                     # Input component
│   │       └── label.tsx                     # Label component
│   ├── hooks/
│   │   └── useWaitlistForm.ts                # Waitlist form state hook
│   ├── lib/
│   │   ├── animations.ts                     # Framer Motion variants
│   │   ├── constants.ts                      # Site config, nav links, social links
│   │   ├── metadata.ts                       # Page metadata & JSON-LD builder
│   │   ├── prisma.ts                         # Prisma client singleton
│   │   ├── utils.ts                          # cn() utility (clsx + twMerge)
│   │   ├── validations.ts                    # Zod schemas (waitlist, signup, login)
│   │   └── waitlist-store.ts                 # localStorage CRUD for waitlist
│   ├── data/
│   │   └── faq.ts                            # 6 FAQ items
│   ├── types/
│   │   ├── site.ts                           # SiteConfig, NavLink, SocialLink
│   │   └── waitlist.ts                       # WaitlistEntry type
│   ├── auth.ts                               # NextAuth v5 configuration
│   └── generated/
│       └── prisma/                           # Auto-generated Prisma client
├── .env.example                              # Environment variable template
├── next.config.ts                            # Next.js configuration
├── postcss.config.mjs                        # PostCSS (Tailwind plugin)
├── tsconfig.json                             # TypeScript configuration
├── eslint.config.mjs                         # ESLint flat config
└── prettier.config.mjs                       # Prettier config
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (recommended: 20.x or 22.x)
- **PostgreSQL** database (local or hosted on Neon, Vercel Postgres, etc.)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/flowpilot/flowpilot-app.git

# Navigate to the project directory
cd flowpilot-app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable               | Required | Description                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------- |
| `DATABASE_URL`         | Yes      | PostgreSQL connection string (e.g. `postgresql://user:pass@host:5432/db`) |
| `AUTH_SECRET`          | Yes      | Secret key for NextAuth (generate with `npx auth secret`)                 |
| `AUTH_URL`             | Yes      | Base URL for authentication callbacks (e.g. `http://localhost:3000`)      |
| `NEXT_PUBLIC_SITE_URL` | No       | Public site URL for metadata (defaults to `http://localhost:3000`)        |
| `NEXT_PUBLIC_GA_ID`    | No       | Google Analytics measurement ID                                           |

> **Note:** Never commit `.env.local` or expose secrets. The `.gitignore` excludes all `.env*` files.

---

## Running the Project

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Type Check

```bash
npx tsc --noEmit
```

### Lint

```bash
npx eslint .
```

### Format

```bash
npx prettier --check .       # Check formatting
npx prettier --write .       # Auto-fix formatting
```

---

## Testing

### Test Framework

- **Jest 30** with `ts-jest` and `jsdom` environment
- **React Testing Library** for component testing
- **@testing-library/user-event** for interaction simulation

### Test Suites

| Suite           | Tests  | What It Tests                                                                                |
| --------------- | ------ | -------------------------------------------------------------------------------------------- |
| ThemeToggle     | 11     | Theme switching, system preference, localStorage persistence, ARIA labels, icon states       |
| Navbar          | 6      | Logo rendering, navigation links, CTA buttons, hamburger toggle, Escape key, scroll behavior |
| Waitlist        | 6      | Email validation, loading state, success state, duplicate detection, error handling          |
| FAQ             | 6      | Question rendering, accordion expand/collapse, keyboard navigation                           |
| Pricing         | 5      | Monthly/annual toggle, price updates, plan names, accessibility attributes                   |
| Footer          | 5      | Navigation links, social icons, external link `rel` attributes, copyright year               |
| AnimatedSection | 3      | Scroll animation variants, reduced motion preference handling                                |
| API Route       | 4      | Successful creation (201), duplicate email (409), validation error (422), server error (500) |
| **Total**       | **46** | **All passing**                                                                              |

### Running Tests

```bash
npm test                          # Run all tests
npm test -- --coverage            # Run with coverage report
npm test -- --watch               # Watch mode
npm test -- ThemeToggle           # Run specific suite
```

---

## Performance

### Optimizations

| Optimization           | Implementation                                                  |
| ---------------------- | --------------------------------------------------------------- |
| Dynamic Code Splitting | 7 below-the-fold sections loaded via `next/dynamic`             |
| Lazy Loading           | Mobile menu drawer lazy-loaded on first open                    |
| Package Optimization   | `optimizePackageImports` for `framer-motion` and `lucide-react` |
| Image Formats          | AVIF and WebP via `images.formats` in `next.config.ts`          |
| Font Preloading        | Inter font loaded with `preload: true`                          |
| Font Display           | `font-display: swap` prevents FOIT                              |
| Hero Image Priority    | Above-the-fold image uses `priority` loading                    |
| Responsive Images      | `sizes` attribute for optimal image serving                     |
| Code Splitting         | Client components only load what they need                      |

### Core Web Vitals Targets

| Metric  | Target  | Strategy                                                    |
| ------- | ------- | ----------------------------------------------------------- |
| **LCP** | < 2.5s  | Hero image priority, font preload, optimized formats        |
| **CLS** | < 0.1   | Explicit `width`/`height` on images, font-display swap      |
| **TBT** | < 200ms | Dynamic imports, code-split framer-motion, lazy mobile menu |

---

## Accessibility

### Implemented Features

- **Skip-to-content link** — Keyboard users can skip to `<main>` landmark
- **Semantic HTML** — Proper use of `<header>`, `<nav>`, `<main>`, `<footer>`, `<h1>`–`<h3>` hierarchy
- **ARIA labels** — All interactive elements have accessible names
- **Focus management** — Mobile drawer traps focus, returns focus on close
- **Dialog semantics** — Mobile menu uses `role="dialog"`, `aria-modal="true"`
- **Keyboard navigation** — All components operable via keyboard (Tab, Enter, Space, Escape)
- **Reduced motion** — `prefers-reduced-motion` disables animations
- **Focus indicators** — Visible `:focus-visible` outlines on all interactive elements
- **Form validation** — Error messages linked via conditional `aria-describedby`
- **Color contrast** — WCAG AA compliant (4.5:1 for normal text, 3:1 for large text)
- **Decorative elements** — Dashboard mock and icons marked `aria-hidden="true"`

---

## SEO

### Metadata

- **Title** — Template-based (`%s | FlowPilot`) with homepage default
- **Description** — From `SITE_CONFIG.description`
- **OpenGraph** — Full OG tags (title, description, images 1200x630, type, locale)
- **Twitter Cards** — `summary_large_image` card type
- **Canonical URLs** — Generated via `metadataBase`
- **Robots** — `index: true`, `follow: true` with full Google Bot config

### Structured Data

- **WebSite** — Schema.org `WebSite` with `SearchAction` potential action
- **Organization** — Schema.org `Organization` with logo and social profiles

### Files

| File             | Purpose                                                             |
| ---------------- | ------------------------------------------------------------------- |
| `/sitemap.xml`   | Auto-generated sitemap (3 routes: `/`, `/privacy-policy`, `/terms`) |
| `/robots.txt`    | Allow all crawlers, link to sitemap                                 |
| `/manifest.json` | PWA manifest for installability                                     |

---

## Browser Support

| Browser        | Minimum Version | Status       |
| -------------- | --------------- | ------------ |
| Chrome         | 100+            | Full support |
| Firefox        | 100+            | Full support |
| Safari         | 15+             | Full support |
| Edge           | 100+            | Full support |
| iOS Safari     | 15+             | Full support |
| Chrome Android | 100+            | Full support |

**Not supported:** IE 11

### Responsive Breakpoints

| Breakpoint | Width           | Behavior                                   |
| ---------- | --------------- | ------------------------------------------ |
| Mobile     | 320px – 639px   | Single column, stacked layout              |
| Tablet     | 640px – 767px   | 2-column grids                             |
| Laptop     | 768px – 1023px  | Dashboard sidebar, 2-col pricing           |
| Desktop    | 1024px – 1279px | Desktop nav, 3-col pricing, 2-col sections |
| Large      | 1280px – 1535px | Max-width container                        |
| XL         | 1536px+         | Full-width with constraints                |

---

## Screenshots

### Hero Section

![Hero Section](public/hero-dashboard.png)

### Dashboard Preview

_Dashboard mockup with analytics cards, workflow chart, and activity table — rendered entirely in CSS/HTML._

### Pricing

_Three-tier pricing grid (Starter, Pro, Enterprise) with monthly/annual toggle._

### FAQ

_Expandable accordion with 6 questions about FlowPilot features and pricing._

### Waitlist

_Email signup form with validation, loading states, and success/duplicate/error feedback._

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Configure environment variables:
   - `DATABASE_URL` — Your PostgreSQL connection string
   - `AUTH_SECRET` — Generate with `npx auth secret`
   - `AUTH_URL` — Your production URL (e.g. `https://flowpilot.app`)
   - `NEXT_PUBLIC_SITE_URL` — Same as `AUTH_URL`
4. Deploy — Vercel auto-detects Next.js and configures build settings

### Manual Deployment

```bash
npm run build
npm start
```

Ensure the production database has the schema pushed via `npx prisma db push`.

---

## Future Improvements

- [ ] **Stripe Payments** — Real subscription billing with Stripe Checkout
- [ ] **Authentication Dashboard** — User profile, settings, and session management
- [ ] **Real AI Integrations** — Connect to OpenAI/Claude APIs for workflow automation
- [ ] **Team Management** — Invite members, roles, and permissions
- [ ] **Workflow Builder** — Drag-and-drop interface for creating automation flows
- [ ] **Analytics Dashboard** — Real usage metrics replacing the mock dashboard
- [ ] **Email Notifications** — Waitlist confirmation and update emails
- [ ] **Admin Panel** — View and manage waitlist entries
- [ ] **Internationalization** — Multi-language support with `next-intl`
- [ ] **E2E Testing** — Playwright tests for critical user flows

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Quality

Before submitting, ensure all checks pass:

```bash
npx tsc --noEmit            # Type check
npx eslint .                # Lint
npx prettier --check .      # Format check
npm test                    # Tests (46 passing)
```

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Mohammad Hanif Memon**

- GitHub: [@flowpilot](https://github.com/flowpilot)

---

<div align="center">

Built with Next.js 16 + React 19 + Tailwind CSS 4

</div>
