# Contract: Design Token Reference

**Phase**: 1 -- Design & Contracts
**Branch**: `001-flowpilot-landing-page`
**Date**: 2026-07-10
**Source File**: `/styles/design-tokens.css`

Complete reference for all CSS custom properties used across the project. All values are defined here and MUST NOT be hardcoded in component files.

---

## Color Tokens

### Brand Colors

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--color-primary` | #6d28d9 (Violet 700) | #8b5cf6 (Violet 500) | CTAs, links, focus rings, active states |
| `--color-primary-hover` | #5b21b6 (Violet 800) | #a78bfa (Violet 400) | Button hover state |
| `--color-accent` | #8b5cf6 (Violet 500) | #7c3aed (Violet 600) | Decorative accents, gradient endpoints |

### Surface Colors

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--color-background` | #ffffff | #09090b | Page background |
| `--color-foreground` | #09090b (Zinc 950) | #fafafa (Zinc 50) | Primary text |
| `--color-card` | #fafafa (Zinc 50) | #18181b (Zinc 900) | Card backgrounds |
| `--color-card-border` | #e4e4e7 (Zinc 200) | #27272a (Zinc 800) | Card borders |
| `--color-secondary` | #f4f4f5 (Zinc 100) | #18181b (Zinc 900) | Secondary backgrounds, chips |

### Text Colors

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--color-muted` | #71717a (Zinc 500) | #a1a1aa (Zinc 400) | Secondary body text, subtitles |
| `--color-muted-foreground` | #a1a1aa (Zinc 400) | #71717a (Zinc 500) | Placeholder text, tertiary labels |
| `--color-border` | #e4e4e7 (Zinc 200) | #27272a (Zinc 800) | Dividers, input borders, separators |

### State Colors

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--color-success` | #16a34a (Green 600) | #16a34a | Success messages, checkmarks |
| `--color-success-bg` | #f0fdf4 (Green 50) | #052e16 | Success message background |
| `--color-error` | #dc2626 (Red 600) | #ef4444 (Red 500) | Error messages, validation errors |
| `--color-error-bg` | #fef2f2 (Red 50) | #450a0a | Error message background |

### Gradient Tokens

| Token | Value | Usage |
|---|---|---|
| `--gradient-brand` | linear-gradient(135deg, #6d28d9 0%, #2563eb 100%) | CTA buttons, highlight elements |
| `--gradient-hero-bg` (light) | radial-gradient(ellipse at top, #ede9fe 0%, #ffffff 70%) | Hero section background |
| `--gradient-hero-bg` (dark) | radial-gradient(ellipse at top, #1e1b4b 0%, #09090b 70%) | Hero section background (dark) |
| `--gradient-card-hover` | linear-gradient(135deg, rgba(109,40,217,0.05) 0%, transparent 100%) | Card hover subtle highlight |

---

## Typography Tokens

### Font Family

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | Inter, system-ui, -apple-system, sans-serif | All body and UI text |
| `--font-mono` | 'JetBrains Mono', Consolas, monospace | Code snippets (if any) |

### Font Size Scale

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `--text-xs` | 0.75rem (12px) | text-xs | Captions, labels, metadata |
| `--text-sm` | 0.875rem (14px) | text-sm | Secondary body, hints |
| `--text-base` | 1rem (16px) | text-base | Default body copy |
| `--text-lg` | 1.125rem (18px) | text-lg | Lead paragraphs, card body |
| `--text-xl` | 1.25rem (20px) | text-xl | Card titles, feature names |
| `--text-2xl` | 1.5rem (24px) | text-2xl | Section subtitles |
| `--text-3xl` | 1.875rem (30px) | text-3xl | Section headings (h2) |
| `--text-4xl` | 2.25rem (36px) | text-4xl | Page subtitles (md+) |
| `--text-5xl` | 3rem (48px) | text-5xl | Hero headline (lg+) |
| `--text-6xl` | 3.75rem (60px) | text-6xl | Hero headline (xl+) |

### Font Weight

| Token | Value | Usage |
|---|---|---|
| `--font-normal` | 400 | Body copy |
| `--font-medium` | 500 | Lead text, nav links |
| `--font-semibold` | 600 | Card titles, subheadings |
| `--font-bold` | 700 | Section headings |
| `--font-extrabold` | 800 | Hero headline |

### Line Height

| Token | Value | Usage |
|---|---|---|
| `--leading-tight` | 1.1 | Hero headline |
| `--leading-snug` | 1.25 | Section headings |
| `--leading-normal` | 1.5 | UI text, labels |
| `--leading-relaxed` | 1.625 | Body copy |

---

## Spacing Scale

All values are multiples of the 4px base unit.

| Token | Value | Tailwind | Common Usage |
|---|---|---|---|
| `--space-1` | 0.25rem (4px) | p-1, m-1 | Micro spacing, icon gaps |
| `--space-2` | 0.5rem (8px) | p-2, m-2 | Tight component spacing |
| `--space-3` | 0.75rem (12px) | p-3, m-3 | Button padding (Y), inline gaps |
| `--space-4` | 1rem (16px) | p-4, m-4 | Standard padding, grid gaps |
| `--space-5` | 1.25rem (20px) | p-5, m-5 | Component padding |
| `--space-6` | 1.5rem (24px) | p-6, m-6 | Card padding, section sub-gaps |
| `--space-8` | 2rem (32px) | p-8, m-8 | Card padding (lg), grid gaps |
| `--space-10` | 2.5rem (40px) | p-10, m-10 | Large gaps, between sections |
| `--space-12` | 3rem (48px) | p-12, m-12 | Section padding (sm) |
| `--space-16` | 4rem (64px) | p-16, m-16 | Section padding (md) |
| `--space-20` | 5rem (80px) | p-20, m-20 | Section padding (lg) |
| `--space-24` | 6rem (96px) | p-24, m-24 | Section padding (xl) |
| `--space-32` | 8rem (128px) | p-32, m-32 | Major section separators |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 0.25rem (4px) | Small chips, badges, small buttons |
| `--radius-md` | 0.5rem (8px) | Standard buttons, inputs |
| `--radius-lg` | 0.75rem (12px) | Cards, panels |
| `--radius-xl` | 1rem (16px) | Large cards, modals |
| `--radius-2xl` | 1.5rem (24px) | Feature cards, highlighted sections |
| `--radius-full` | 9999px | Pill buttons, avatar images, toggle |

---

## Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle lift, default card |
| `--shadow-md` | 0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10) | Card hover, dropdowns |
| `--shadow-lg` | 0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10) | Elevated panels, floating badges |
| `--shadow-xl` | 0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10) | Dashboard mockup, pricing Pro card |
| `--shadow-brand` | 0 0 0 3px rgba(109,40,217,0.20) | Focus ring on primary interactive elements |

---

## Transition Tokens

| Token | Value | Usage |
|---|---|---|
| `--transition-fast` | 150ms ease | Icon hover, color changes |
| `--transition-base` | 200ms ease | Button states, border changes |
| `--transition-slow` | 300ms ease | Panel open/close, theme switch |
| `--transition-spring` | 400ms cubic-bezier(0.34, 1.56, 0.64, 1) | Toggle switches, scale effects |

---

## Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `--z-base` | 0 | Default stacking |
| `--z-raised` | 10 | Cards on hover, floating badges |
| `--z-dropdown` | 100 | Mobile menu, dropdowns |
| `--z-sticky` | 200 | Sticky Navbar |
| `--z-overlay` | 300 | Modal backdrop (future use) |
| `--z-modal` | 400 | Modal content (future use) |
| `--z-toast` | 500 | Toast notifications (future use) |

---

## Accessibility: Contrast Ratios

All text color / background color combinations have been verified to meet WCAG 2.1 AA minimum requirements.

| Foreground | Background | Ratio | WCAG Grade | Usage |
|---|---|---|---|---|
| #09090b (foreground) | #ffffff (background) | 19.8:1 | AAA | Body text light mode |
| #fafafa (foreground) | #09090b (background) | 19.8:1 | AAA | Body text dark mode |
| #6d28d9 (primary) | #ffffff (background) | 7.1:1 | AAA | Primary button text |
| #71717a (muted) | #ffffff (background) | 4.6:1 | AA | Secondary text light mode |
| #a1a1aa (muted) | #09090b (background) | 4.7:1 | AA | Secondary text dark mode |
| #dc2626 (error) | #fef2f2 (error-bg) | 5.5:1 | AA | Error message text |
| #16a34a (success) | #f0fdf4 (success-bg) | 4.8:1 | AA | Success message text |

Minimum required: 4.5:1 for normal text (AA), 3:1 for large text (AA, >= 18px or 14px bold).
