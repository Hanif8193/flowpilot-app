# Contract: Key Component TypeScript Interfaces

**Phase**: 1 -- Design & Contracts
**Branch**: `001-flowpilot-landing-page`
**Date**: 2026-07-10

Public prop interfaces for all non-trivial components. shadcn/ui base primitives (button, input, card, badge) extend their Radix/HTML counterparts and are not duplicated here.

---

## Layout Components

### Navbar

```typescript
// components/layout/Navbar/Navbar.tsx
// No external props -- all data sourced from lib/constants.ts (NAV_LINKS, SITE_CONFIG)

interface NavbarProps {
  // Intentionally empty -- self-contained component
}
```

### Footer

```typescript
// components/layout/Footer/Footer.tsx
// No external props -- all data from lib/constants.ts

interface FooterProps {
  // Intentionally empty -- self-contained component
}
```

---

## UI Primitives

### AnimatedSection

```typescript
// components/ui/AnimatedSection/AnimatedSection.tsx

import { Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  variants?: Variants            // Defaults to fadeInUp from lib/animations.ts
  className?: string
  delay?: number                 // Optional delay in seconds before animation starts
  once?: boolean                 // Defaults to true -- animate once per viewport entry
  margin?: string                // Intersection margin, defaults to '-100px'
  as?: React.ElementType         // Defaults to 'div'. Allows 'section', 'article', etc.
}
```

### ThemeToggle

```typescript
// components/ui/ThemeToggle/ThemeToggle.tsx
// Reads and sets theme via next-themes useTheme()

interface ThemeToggleProps {
  className?: string
}
```

---

## Section Components

### Hero

```typescript
// components/sections/Hero/Hero.tsx
// All content is hardcoded or from SITE_CONFIG -- no props needed

interface HeroProps {
  // Intentionally empty
}
```

### FeatureCard

```typescript
// components/sections/Features/FeatureCard.tsx

import { FeatureItem } from '@/types/feature'

interface FeatureCardProps {
  feature: FeatureItem
  className?: string
}
```

### WorkflowStep

```typescript
// components/sections/AIWorkflow/WorkflowStep.tsx

import { WorkflowStep as WorkflowStepType } from '@/types/feature'

interface WorkflowStepProps {
  step: WorkflowStepType
  isLast?: boolean         // Hides connector line after last step
  className?: string
}
```

### PricingCard

```typescript
// components/sections/Pricing/PricingCard.tsx

import { PricingPlan, BillingInterval } from '@/types/pricing'

interface PricingCardProps {
  plan: PricingPlan
  billingInterval: BillingInterval
  className?: string
}
```

### BillingToggle

```typescript
// components/sections/Pricing/BillingToggle.tsx

import { BillingInterval } from '@/types/pricing'

interface BillingToggleProps {
  value: BillingInterval
  onChange: (value: BillingInterval) => void
  className?: string
}
```

### TestimonialCard

```typescript
// components/sections/Testimonials/TestimonialCard.tsx

import { Testimonial } from '@/types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}
```

### WaitlistForm

```typescript
// components/sections/Waitlist/WaitlistForm.tsx
// All state is managed internally via useWaitlistForm hook

interface WaitlistFormProps {
  className?: string
}
```

---

## Hooks

### useWaitlistForm

```typescript
// hooks/useWaitlistForm.ts

import { SubmissionState, WaitlistFormData } from '@/types/waitlist'
import { UseFormReturn } from 'react-hook-form'

interface UseWaitlistFormReturn {
  form: UseFormReturn<WaitlistFormData>         // RHF form instance
  submissionState: SubmissionState             // Current state machine state
  onSubmit: (data: WaitlistFormData) => Promise<void>
  reset: () => void                            // Reset to idle + clear form
}

// Usage:
// const { form, submissionState, onSubmit, reset } = useWaitlistForm()
```

### useBillingToggle

```typescript
// hooks/useBillingToggle.ts

import { BillingInterval } from '@/types/pricing'

interface UseBillingToggleReturn {
  billingInterval: BillingInterval
  toggle: () => void
  setInterval: (interval: BillingInterval) => void
  isAnnual: boolean                            // Convenience flag
}
```

### useIntersectionObserver

```typescript
// hooks/useIntersectionObserver.ts

interface UseIntersectionObserverOptions {
  threshold?: number | number[]   // Default: 0.1
  rootMargin?: string             // Default: '0px'
  once?: boolean                  // Default: true -- disconnect after first intersection
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<Element>
  isIntersecting: boolean
  hasIntersected: boolean         // True once element has been visible (persists if once: true)
}
```

---

## lib/utils.ts Exports

```typescript
// The cn() utility -- used in every component

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// Format price from cents to display string
export function formatPrice(cents: number, interval: BillingInterval): string
// e.g., formatPrice(1900, 'monthly') --> "$19/mo"
// e.g., formatPrice(0, 'monthly')    --> "Free"
```
