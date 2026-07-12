# FlowPilot — Release Notes

## v1.0.0 — Stable Release

**Release Date:** July 12, 2026

### Overview

FlowPilot v1.0.0 is the first stable release of the AI-powered workflow automation landing page. This release includes a complete marketing site with 9 sections, authentication, waitlist functionality, and comprehensive test coverage.

---

### Features

#### Landing Page (9 Sections)

- **Hero** — CTA buttons with scroll links, dashboard image
- **Trusted** — Company logos strip
- **Features** — 6 feature cards with icons
- **Workflow** — 4-step process explanation
- **Dashboard** — CSS/HTML dashboard mockup with analytics, chart, and activity table
- **Pricing** — 3-tier pricing grid with monthly/annual toggle
- **Testimonials** — 3 customer testimonial cards
- **FAQ** — 6 expandable questions with accordion
- **Waitlist** — Email signup form with validation

#### Authentication

- NextAuth v5 with Prisma adapter
- Credentials provider (email/password)
- JWT strategy for stateless sessions
- Custom login (`/login`) and signup (`/signup`) pages
- Server action for user registration with bcrypt hashing

#### API

- `POST /api/waitlist` — Email validation, duplicate detection, PostgreSQL persistence
- Structured JSON responses with success/code/message fields

#### Pages

- `/` — Homepage with all landing sections
- `/login` — Login form
- `/signup` — Registration form
- `/privacy-policy` — Privacy policy
- `/terms` — Terms of service
- `/sitemap.xml` — Auto-generated sitemap
- `/robots.txt` — Crawler directives

---

### Performance

| Optimization                                           | Status |
| ------------------------------------------------------ | ------ |
| Dynamic code splitting (`next/dynamic`)                | ✅     |
| Lazy-loaded mobile menu                                | ✅     |
| `optimizePackageImports` (framer-motion, lucide-react) | ✅     |
| AVIF/WebP image formats                                | ✅     |
| Font preloading (Inter)                                | ✅     |
| `font-display: swap`                                   | ✅     |
| Hero image `priority` loading                          | ✅     |
| Responsive `sizes` attribute                           | ✅     |

**Core Web Vitals Targets:**

- LCP < 2.5s
- CLS < 0.1
- TBT < 200ms

---

### Accessibility

| Feature                                              | Status |
| ---------------------------------------------------- | ------ |
| Skip-to-content link                                 | ✅     |
| Semantic HTML landmarks                              | ✅     |
| ARIA labels on all interactive elements              | ✅     |
| Keyboard navigation (Tab, Enter, Space, Escape)      | ✅     |
| Focus trap in mobile drawer                          | ✅     |
| Focus return on drawer close                         | ✅     |
| `role="dialog"` + `aria-modal="true"` on mobile menu | ✅     |
| Conditional `aria-describedby` on form errors        | ✅     |
| `prefers-reduced-motion` support                     | ✅     |
| WCAG AA color contrast (4.5:1)                       | ✅     |
| `aria-hidden` on decorative elements                 | ✅     |

---

### SEO

| Feature                                          | Status      |
| ------------------------------------------------ | ----------- |
| Title template (`%s                              | FlowPilot`) | ✅  |
| Meta description                                 | ✅          |
| OpenGraph tags (1200x630 images)                 | ✅          |
| Twitter Cards (`summary_large_image`)            | ✅          |
| JSON-LD structured data (WebSite + Organization) | ✅          |
| `sitemap.xml` (3 routes)                         | ✅          |
| `robots.txt`                                     | ✅          |
| Canonical URLs                                   | ✅          |
| `metadataBase` configured                        | ✅          |
| PWA manifest                                     | ✅          |

---

### Testing

| Suite           | Tests  | Status          |
| --------------- | ------ | --------------- |
| ThemeToggle     | 11     | ✅ Passing      |
| Navbar          | 6      | ✅ Passing      |
| Waitlist        | 6      | ✅ Passing      |
| FAQ             | 6      | ✅ Passing      |
| Pricing         | 5      | ✅ Passing      |
| Footer          | 5      | ✅ Passing      |
| API Route       | 4      | ✅ Passing      |
| AnimatedSection | 3      | ✅ Passing      |
| **Total**       | **46** | **All passing** |

---

### Security

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
- `Permissions-Policy` (camera, microphone, geolocation disabled)
- `Strict-Transport-Security` with preload
- No secrets in client bundle
- `.env*` files gitignored

---

### Tech Stack

| Technology    | Version       |
| ------------- | ------------- |
| Next.js       | 16.2.10       |
| React         | 19.2.4        |
| TypeScript    | 5.x           |
| Tailwind CSS  | 4.0           |
| Prisma        | 7.8.0         |
| NextAuth      | 5.0.0-beta.31 |
| Jest          | 30.4          |
| Framer Motion | 12.42         |
| Zod           | 4.4.3         |

---

### Deployment Readiness

- ✅ Production build passing
- ✅ TypeScript strict mode
- ✅ ESLint zero errors
- ✅ Prettier formatted
- ✅ 46 tests passing
- ✅ Security headers configured
- ✅ Environment variables documented (`.env.example`)
- ✅ Vercel deployment ready

---

### Known Limitations

- `public/og-image.png` and `public/logo.png` — placeholder images needed for social previews
- Hero image uses local `public/hero-dashboard.png` — replace with production screenshot
- WSL environment may experience `lightningcss` Bus errors during build — use Windows PowerShell

---

### Upgrade Notes

This is the initial stable release. There are no previous versions to migrate from.
