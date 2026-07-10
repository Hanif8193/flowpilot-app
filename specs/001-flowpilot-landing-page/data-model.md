# Data Model: FlowPilot Premium AI SaaS Landing Page

**Phase**: 1 -- Design & Contracts
**Branch**: `001-flowpilot-landing-page`
**Date**: 2026-07-10

All TypeScript types, Zod schemas, validation rules, and state shapes used across the project.

---

## 1. Waitlist Domain (Runtime Data)

### WaitlistEntry
Represents a single registered user in the waitlist store.

```typescript
// types/waitlist.ts

export interface WaitlistEntry {
  id: string;              // crypto.randomUUID() -- generated at submission
  email: string;           // Normalized to lowercase before storage
  registeredAt: string;    // ISO 8601 datetime string (new Date().toISOString())
  isValid: boolean;        // Always true for stored entries (invalid entries never stored)
}
```

### WaitlistFormData
Shape of the React Hook Form + Zod validated form input.

```typescript
export interface WaitlistFormData {
  email: string;           // Raw input from <input type="email">
}
```

### WaitlistFormSchema (Zod)
Single source of truth for email validation -- used on both client (RHF resolver) and server (route.ts).

```typescript
// lib/validations.ts
import { z } from 'zod'

export const WaitlistFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(254, { message: 'Email address is too long.' })
    .transform((val) => val.toLowerCase().trim()),
})

export type WaitlistFormData = z.infer<typeof WaitlistFormSchema>
```

### SubmissionState
State machine for the WaitlistForm submission lifecycle.

```typescript
export type SubmissionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; email: string }
  | { status: 'duplicate'; email: string }
  | { status: 'error'; message: string }
```

### API Response Types (POST /api/waitlist)

```typescript
export interface WaitlistSuccessResponse {
  success: true;
  message: string;         // "You're on the list! We'll be in touch."
  entry: Pick<WaitlistEntry, 'id' | 'registeredAt'>;
}

export interface WaitlistErrorResponse {
  success: false;
  code: 'DUPLICATE' | 'VALIDATION_ERROR' | 'STORAGE_ERROR' | 'INTERNAL_ERROR';
  message: string;         // Human-readable, safe to display in UI
}

export type WaitlistAPIResponse = WaitlistSuccessResponse | WaitlistErrorResponse
```

---

## 2. Pricing Domain (Static Data)

### BillingInterval

```typescript
// types/pricing.ts

export type BillingInterval = 'monthly' | 'annual'
```

### PricingFeature

```typescript
export interface PricingFeature {
  text: string;            // Feature description
  included: boolean;       // true = checkmark, false = X / grayed out
}
```

### PricingPlan

```typescript
export interface PricingPlan {
  id: string;              // 'free' | 'pro' | 'enterprise'
  name: string;            // Display name: "Free", "Pro", "Enterprise"
  tagline: string;         // Short description below name
  monthlyPrice: number;    // USD cents (0 for free)
  annualPrice: number;     // USD cents per month when billed annually
  billingNote: string;     // "per month" | "per month, billed annually"
  features: PricingFeature[];
  ctaLabel: string;        // "Get Started" | "Start Free Trial" | "Contact Sales"
  ctaHref: string;         // "#waitlist" | "/contact"
  isHighlighted: boolean;  // true = Pro tier visual treatment
  badge?: string;          // Optional badge text: "Most Popular"
}
```

### Validation Rules
- `monthlyPrice` and `annualPrice`: non-negative integers (USD cents)
- `annualPrice` MUST be less than or equal to `monthlyPrice` (discount, never a premium)
- At most one `PricingPlan` may have `isHighlighted: true`

---

## 3. FAQ Domain (Static Data)

### FAQItem

```typescript
// types/faq.ts

export interface FAQItem {
  id: string;              // Stable unique ID used as Accordion item value
  question: string;        // The question text (rendered as accordion trigger)
  answer: string;          // The answer text (rendered as accordion content, may include HTML)
  category?: string;       // Optional grouping: 'General' | 'Billing' | 'Technical'
}
```

### Validation Rules
- `id` must be unique across all FAQItem entries
- `question` max length: 200 characters
- `answer` max length: 1000 characters
- Minimum 4 FAQItems, maximum 12 FAQItems in the data file

---

## 4. Testimonials Domain (Static Data)

### Testimonial

```typescript
// types/testimonial.ts

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;       // e.g., "CTO at Acme"
  authorCompany: string;
  avatarSrc: string;        // Path relative to /public, e.g., "/images/avatars/john.webp"
  avatarAlt: string;        // Descriptive alt text: "John Smith, CTO at Acme"
  quote: string;            // The testimonial body text
  rating: 1 | 2 | 3 | 4 | 5;
}
```

### Validation Rules
- `rating` must be integer between 1 and 5
- `quote` max length: 300 characters
- `avatarSrc` must resolve to an existing file in `/public/images/avatars/`
- `avatarAlt` must not be empty

---

## 5. Features Domain (Static Data)

### FeatureItem

```typescript
// types/feature.ts
import { LucideIcon } from 'lucide-react'

export interface FeatureItem {
  id: string;
  iconName: string;         // Lucide icon name, e.g., 'Zap', 'Shield', 'BarChart2'
  title: string;
  description: string;
  accentColor?: string;     // Optional CSS custom property reference, e.g., 'var(--color-primary)'
}
```

### WorkflowStep

```typescript
export interface WorkflowStep {
  id: string;
  stepNumber: number;       // 1-based display number
  iconName: string;         // Lucide icon name
  title: string;
  description: string;
  isLast?: boolean;         // If true, connector line after step is hidden
}
```

### CompanyLogo

```typescript
export interface CompanyLogo {
  id: string;
  name: string;             // Company name (used for aria-label)
  logoSrc: string;          // SVG path in /public/images/companies/ OR inline SVG string
  logoAlt: string;          // e.g., "Vercel logo"
  href?: string;            // Optional external URL (opens in new tab with noopener)
  width: number;            // Intrinsic width in px (for next/image sizing)
  height: number;           // Intrinsic height in px
}
```

---

## 6. Site Configuration

### SiteConfig

```typescript
// lib/constants.ts

export interface SiteConfig {
  name: string;             // "FlowPilot"
  tagline: string;          // "AI-Powered Workflow Automation"
  description: string;      // Used in meta description
  url: string;              // Canonical URL, e.g., "https://flowpilot.app"
  ogImage: string;          // OG image path, e.g., "/images/og-image.png"
  twitterHandle: string;    // "@flowpilot"
  locale: string;           // "en_US"
  themeColor: string;       // "#6d28d9"
}
```

### NavLink

```typescript
export interface NavLink {
  label: string;            // Display text
  href: string;             // Anchor href, e.g., "#features" or "/privacy-policy"
  isExternal?: boolean;     // If true, opens in new tab
}
```

---

## 7. State Transitions

### WaitlistForm State Machine

```
                    ┌─────────┐
                    │  idle   │ <─── Initial state / after reset
                    └────┬────┘
                         │ user submits (valid email)
                    ┌────▼────┐
                    │ loading │ Button disabled, spinner shown
                    └────┬────┘
           ┌─────────────┼─────────────────┐
           │             │                 │
      ┌────▼────┐   ┌────▼──────┐   ┌──────▼──────┐
      │ success │   │ duplicate │   │    error     │
      └─────────┘   └───────────┘   └─────────────┘
      Form hidden,  "Already on   "Something went
      success msg   the list" msg  wrong" msg + retry

All error/duplicate/success states have a "Try again" / reset path back to idle.
```

### BillingToggle State

```
monthly <──────────────────────────────> annual
  $19/mo                                  $15/mo (save 20%)
  $49/mo                                  $39/mo
```
State is local to the Pricing section (`useBillingToggle` hook). Not persisted.

---

## 8. localStorage Schema

**Key**: `flowpilot_waitlist`
**Value**: JSON-serialized `WaitlistEntry[]`

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "registeredAt": "2026-07-10T15:30:00.000Z",
    "isValid": true
  }
]
```

**Invariants**:
- Email values are always lowercase-trimmed before storage
- IDs are always UUID v4 strings
- Array is always valid JSON (never corrupted -- write failures caught and returned as 500)
- No duplicate emails in the array (enforced by `hasEntry()` check before `addEntry()`)
