# Quickstart & Validation Guide: FlowPilot Landing Page

**Phase**: 1 -- Design & Contracts
**Branch**: `001-flowpilot-landing-page`
**Date**: 2026-07-10

This guide documents how to set up the project from scratch and run validation scenarios that prove each feature works end-to-end. It is a run/validation guide -- full implementation details live in `tasks.md`.

---

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | >= 20.0.0 | `node --version` |
| npm | >= 10.0.0 | `npm --version` |
| Git | >= 2.40 | `git --version` |
| A modern browser | Chrome 120+ / Firefox 120+ / Safari 17+ | -- |

---

## Setup

### 1. Clone and Install

```bash
git clone <repo-url> flowpilot
cd flowpilot
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

For the prototype phase, no environment variables are required (waitlist uses localStorage).
The `.env.example` documents future variables for production database integration.

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Verify Tooling

```bash
# TypeScript -- must report zero errors
npx tsc --noEmit

# ESLint -- must report zero warnings or errors
npx eslint .

# Prettier -- must report zero unformatted files
npx prettier --check .

# Tests -- must all pass
npm test
```

---

## Validation Scenarios

### Scenario 1: Full Page Renders (Home)

**Validates**: FR-001 -- All sections render with correct structure

**Steps**:
1. Open http://localhost:3000
2. Verify the page loads without console errors
3. Scroll from top to bottom

**Expected**:
- Navbar visible at top with logo, nav links, and theme toggle
- Hero section with a large headline (`<h1>`), two CTA buttons
- Trusted Companies logo strip below Hero
- Features grid (6 cards in 3-column layout on desktop)
- AI Workflow section with 4 numbered steps
- Dashboard Preview with mockup image
- Pricing section with 3 tiers
- Testimonials grid
- FAQ accordion with 8 items
- Waitlist form section
- Footer with multiple link columns

---

### Scenario 2: Dark Mode Toggle

**Validates**: FR-002 -- Theme persists across sessions

**Steps**:
1. Open http://localhost:3000
2. Click the sun/moon icon in the Navbar
3. Verify page transitions to dark mode
4. Refresh the page (Ctrl+R / Cmd+R)
5. Verify dark mode is still active (persisted in localStorage)
6. Click theme toggle again
7. Verify page returns to light mode

**Expected**:
- No Flash of Unstyled Content (FOUC) on page load
- Background changes from white (#ffffff) to near-black (#09090b)
- All text, borders, and cards update consistently
- Preference persists through page refresh

---

### Scenario 3: Waitlist -- Valid Submission

**Validates**: FR-003, FR-004 -- Client validation + successful submission

**Steps**:
1. Scroll to the Waitlist section (or click "Get Early Access" in Navbar)
2. Enter a valid email: `test@example.com`
3. Click "Join Waitlist" / submit button

**Expected**:
- Loading state: button becomes disabled, spinner appears
- Success state: form is hidden, success message appears (e.g., "You're on the list!")
- localStorage key `flowpilot_waitlist` contains the new entry (verify in DevTools > Application > Local Storage)

---

### Scenario 4: Waitlist -- Invalid Email

**Validates**: FR-003 -- Inline validation error for malformed email

**Steps**:
1. Navigate to the Waitlist section
2. Enter: `not-an-email`
3. Click the submit button (or tab away from the field)

**Expected**:
- Form does NOT submit
- An inline error message appears below the input (e.g., "Please enter a valid email address.")
- Error message has `role="alert"` for screen reader announcement
- Input has `aria-invalid="true"` and `aria-describedby` pointing to error element

---

### Scenario 5: Waitlist -- Duplicate Email

**Validates**: Edge case -- duplicate registration

**Steps**:
1. Submit a valid email (e.g., `duplicate@example.com`) -- see Scenario 3
2. Scroll back to Waitlist or refresh if needed
3. Submit the same email again: `duplicate@example.com`

**Expected**:
- API returns 409 Conflict
- Form shows a friendly notice (e.g., "You're already on the list! We'll be in touch.")
- No duplicate entry added to localStorage

---

### Scenario 6: Waitlist -- Empty Submission

**Validates**: FR-003 -- Required field validation

**Steps**:
1. Navigate to the Waitlist section
2. Leave the email input empty
3. Click the submit button

**Expected**:
- Form does NOT submit
- Inline error: "Email address is required."
- Same ARIA error pattern as Scenario 4

---

### Scenario 7: FAQ Keyboard Navigation

**Validates**: FR-007 -- Accordion keyboard accessibility

**Steps**:
1. Tab to the FAQ section
2. Use Tab key to focus the first FAQ question button
3. Press Enter to expand the answer
4. Press Enter again to collapse
5. Press Tab to move to next item
6. Press Space to expand next item

**Expected**:
- Each FAQ item is reachable by keyboard (Tab order)
- Enter and Space both toggle the accordion item
- Visible focus outline appears on focused item (min 2px, brand color)
- `aria-expanded="true"` set on open items
- No keyboard trap -- Tab continues past all FAQ items

---

### Scenario 8: Mobile Responsive Layout

**Validates**: FR-001, SC-005 -- Zero horizontal scroll, mobile-first layout

**Steps**:
1. Open DevTools (F12) > Toggle Device Toolbar
2. Set viewport to 375px width (iPhone SE)
3. Scroll through entire page

**Expected**:
- Zero horizontal scroll bar at 375px
- Navbar shows hamburger menu icon instead of desktop links
- Features grid is single-column
- Pricing cards stack vertically
- All text is readable (no overflow or clipping)
- Repeat at: 320px, 768px, 1024px, 1440px

---

### Scenario 9: Policy Pages & Navigation

**Validates**: FR-005, FR-008 -- Policy pages accessible via footer

**Steps**:
1. Scroll to Footer
2. Click "Privacy Policy" link
3. Verify `/privacy-policy` page loads
4. Click browser back button or "Back to Home" link
5. Click "Terms of Service" link in Footer
6. Verify `/terms` page loads

**Expected**:
- Both policy pages render with structured headings
- A "Back to Home" or equivalent navigation link is present
- Footer external links (social icons) open in new tab
- External links have `rel="noopener noreferrer"`

---

### Scenario 10: Animation -- Reduced Motion

**Validates**: Principle IX -- prefers-reduced-motion respected

**Steps**:
1. Enable "Reduce motion" in OS settings:
   - macOS: System Settings > Accessibility > Display > Reduce Motion
   - Windows: Settings > Ease of Access > Display > Show animations (off)
2. Open http://localhost:3000
3. Scroll through all sections

**Expected**:
- No fade/slide/scale animations play
- Content appears immediately in its final state
- Logo marquee in TrustedCompanies stops scrolling
- Page is fully functional with no animation

---

## Build Validation

### Production Build

```bash
npm run build
npm run start
```

Open http://localhost:3000 and repeat Scenarios 1-9.

**Expected**: No build errors, no TypeScript errors, all scenarios pass in production mode.

### Lighthouse Audit (Chrome DevTools)

1. Open http://localhost:3000 in Chrome
2. DevTools > Lighthouse > Mobile > Generate Report

**Target Scores**:
| Category | Target |
|---|---|
| Performance | >= 95 |
| Accessibility | = 100 |
| Best Practices | = 100 |
| SEO | >= 95 |

### Sitemap Verification

Navigate to http://localhost:3000/sitemap.xml

**Expected**: Valid XML sitemap listing `/`, `/privacy-policy`, and `/terms`.

### Robots.txt Verification

Navigate to http://localhost:3000/robots.txt

**Expected**: Valid robots.txt with `Sitemap: https://flowpilot.app/sitemap.xml` reference.

---

## References

- Data shapes and types: [data-model.md](./data-model.md)
- API contract: [contracts/waitlist-api.md](./contracts/waitlist-api.md)
- Component props: [contracts/component-props.md](./contracts/component-props.md)
- Design tokens: [contracts/design-tokens.md](./contracts/design-tokens.md)
- Full task breakdown: [tasks.md](./tasks.md) (generated by /speckit.tasks)
