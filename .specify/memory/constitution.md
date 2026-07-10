<!--
SYNC IMPACT REPORT
==================
- Version Change: 0.0.0 (Template) -> 1.0.0 (Ratified)
- List of Modified Principles:
  - [PRINCIPLE_1] -> I. Mobile-First Responsive Design (Derived from User Input)
  - [PRINCIPLE_2] -> II. Clean, Maintainable, Component-Based Architecture (Derived from User Input)
  - [PRINCIPLE_3] -> III. Accessibility (WCAG) (Derived from User Input)
  - [PRINCIPLE_4] -> IV. Performance-First (Derived from User Input)
  - [PRINCIPLE_5] -> V. SEO Optimization (Derived from User Input)
  - Added: VI. Consistent Design System (Derived from User Input)
  - Added: VII. Reusable Components (Derived from User Input)
  - Added: VIII. Type Safety with TypeScript (Derived from User Input)
  - Added: IX. Modern Animations without Hurting Performance (Derived from User Input)
  - Added: X. Production-Ready Code (Derived from User Input)
- Added Sections:
  - Technology Stack & Directory Structure (Section 2)
  - Development Workflow & Quality Gates (Section 3)
- Removed Sections:
  - None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated - verified gates align with new principles)
  - .specify/templates/spec-template.md (✅ updated - verified compatibility)
  - .specify/templates/tasks-template.md (✅ updated - verified sample tasks structure)
- Follow-up TODOs:
  - None
-->

# FlowPilot Constitution

## Core Principles

### I. Mobile-First Responsive Design
Developers MUST design and implement all layouts starting at the mobile breakpoint (e.g., 320px up to 480px) and scale up using `min-width` media queries. Media queries MUST NOT be hardcoded with arbitrary values; they must use a standardized set of breakpoints (e.g., SM, MD, LG, XL) defined in the design system. Horizontal scrolling MUST NOT occur under any viewport size from 320px to 3840px.

**Rationale**: Startups, founders, and freelancers frequently access SaaS landing pages via mobile devices. Building mobile-first forces layout simplification and ensures absolute usability on all devices.

### II. Clean, Maintainable, Component-Based Architecture
Frontend code MUST be organized into logical, self-contained components with single responsibilities. Components MUST be located in dedicated directories alongside their styles, types, and unit tests (e.g., co-located files). Business logic MUST be separated from presentational concerns using hooks, context, or state-management layers.

**Rationale**: A clean, component-based architecture enables fast iteration, reduces code duplication, and makes the codebase approachable for multiple collaborators and AI assistants.

### III. Accessibility (WCAG)
The landing page MUST conform to WCAG 2.1 AA standards. All interactive elements MUST be keyboard navigable with visible focus states. Semantic HTML elements (e.g., `<header>`, `<nav>`, `<main>`, `<button>`) MUST be used instead of generic `<div>` or `<span>` elements for interactive or structural roles. Every image MUST have descriptive `alt` text or `alt=""` for decorative images.

**Rationale**: A premium product must be usable by everyone. Accessibility is a fundamental legal, moral, and user-experience requirement for a world-class SaaS landing page.

### IV. Performance-First
The landing page MUST achieve a Google Lighthouse performance score of 95+ on mobile and desktop. All images MUST be optimized (using Next-gen formats like WebP or AVIF) and properly sized with `srcset` or dynamic loading. Third-party scripts MUST be loaded asynchronously or deferred to prevent blocking the main thread.

**Rationale**: Page load speed is directly correlated with bounce rate and conversion rate. Startups and remote teams expect premium, blazing-fast interactions.

### V. SEO Optimization
Semantic HTML heading structures (one `<h1>`, proper nesting of `<h2>` down to `<h6>`) MUST be enforced on every page. Meta tags, Open Graph (OG) headers, and schema markup (JSON-LD) MUST be dynamically configured with relevant keywords, descriptions, and high-quality preview images. A valid `robots.txt` and `sitemap.xml` MUST be automatically generated.

**Rationale**: Excellent organic search discoverability is vital for any SaaS landing page to attract traffic and convert visitors without relying entirely on paid ads.

### VI. Consistent Design System
All styles MUST adhere strictly to a predefined design system, using custom CSS variables (tokens) for colors, typography, spacing, shadows, and border-radii. Hardcoded magic values (colors, margins, padding, font-sizes) in components are strictly PROHIBITED. Dark/Light theme values MUST be implemented via CSS tokens.

**Rationale**: Visual consistency establishes brand trust and professional polish. A strict design system simplifies style updates and ensures aesthetic alignment.

### VII. Reusable Components
Base UI components (buttons, inputs, modals, cards) MUST be built as highly generic, reusable primitives. Reusable components MUST accept flexible props to accommodate minor variations in layout or iconography without duplicating structure. Standardized component props interfaces MUST be exported for external consumer components.

**Rationale**: Maximize development efficiency and maintainability by building a solid foundation of reusable, robust, and cohesive UI blocks.

### VIII. Type Safety with TypeScript
TypeScript MUST be configured with strict mode enabled (`strict: true` in `tsconfig.json`). The use of `any` is strictly PROHIBITED; explicit types or generics MUST be declared for all function arguments, return values, and component props. Type assertions (the `as` keyword) MUST NOT be used to bypass type checking unless wrapping low-level browser APIs or external untyped libraries (which must be justified).

**Rationale**: TypeScript eliminates an entire class of runtime bugs, provides self-documenting code, and enables superior autocomplete and refactoring workflows for humans and AI alike.

### IX. Modern Animations without Hurting Performance
Animations MUST be implemented using hardware-accelerated CSS properties (`transform`, `opacity`). Heavy JS animation libraries are PROHIBITED unless there is a highly specific, performance-profiled use-case. CSS transition and animation properties MUST respect the `prefers-reduced-motion` media query.

**Rationale**: Modern, fluid interactions make a page feel interactive and premium, but poor animation execution can cause jank, high CPU/battery consumption, and a terrible user experience.

### X. Production-Ready Code
Code MUST be fully formatted (via Prettier) and pass linting (via ESLint) with zero errors and zero warnings before being committed or merged. Environmental variables MUST be strictly managed using `.env.example` templates, and secrets MUST NOT be checked into version control. Source code MUST include comprehensive, clear inline code comments for non-trivial logic, as well as a robust automated build step.

**Rationale**: High-quality code hygiene guarantees that the codebase remains stable, secure, easily deployable to production platforms, and highly maintainable over the long term.

## Technology Stack & Directory Structure

- **Core Stack**: React (TypeScript), Vanilla CSS (or CSS Modules), and standard modern web-vitals. No Tailwind CSS or complex external UI frameworks should be used unless explicitly approved.
- **Directory Structure**:
  - `/src/components/`: Reusable presentational components (each in its own folder with `.tsx`, `.css`, and `.test.tsx`).
  - `/src/hooks/`: Custom stateful logic hooks.
  - `/src/styles/`: Global variables, CSS reset, design tokens, utility styles.
  - `/src/types/`: Shared TypeScript types and interfaces.
  - `/public/`: Optimized static assets (images, fonts, sitemap).

## Development Workflow & Quality Gates

- **Phase 0 (Research)**: Build a local mental model of requirements and identify architectural bounds.
- **Phase 1 (Design)**: Define component schemas, contract interfaces, and UX/design token mappings.
- **Phase 2 (Implementation)**: Write type-safe code, adhere to principles, check responsiveness and contrast continuously.
- **Quality Gates**:
  - ESLint, Prettier, and TypeScript compiler check (`tsc`) MUST pass with zero errors/warnings.
  - Accessibility check: Contrast ratios MUST meet 4.5:1 for normal text and 3:1 for large text.
  - Responsiveness: Test on SM (375px), MD (768px), LG (1024px), XL (1440px) breakpoints before sign-off.
  - PageSpeed Insights/Lighthouse performance check.

## Governance

- **Constitution Supersedes Practice**: The FlowPilot Constitution is the ultimate source of truth for engineering decisions and standard operating procedures. Any architectural deviation must be explicitly justified.
- **Amendment Procedure**: To amend this constitution, a formal proposal must specify the exact version increment (MAJOR, MINOR, PATCH) and a rationale. All changes must be recorded in the Sync Impact Report and reflected across dependent templates.
- **Compliance Reviews**: Every code review, feature plan, and automated task list must verify alignment with these core principles.
- **Guidance Reference**: Developers should use `./GEMINI.md` or other local development documentation for runtime-specific guidelines, ensuring a clean separation between high-level principles and daily execution steps.

**Version**: 1.0.0 | **Ratified**: 2026-07-10 | **Last Amended**: 2026-07-10
