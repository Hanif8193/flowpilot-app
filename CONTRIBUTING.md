# Contributing to FlowPilot

Thank you for your interest in contributing to FlowPilot! This guide will help you get started.

## Prerequisites

- Node.js 18.18+ (recommended: 22.x)
- PostgreSQL database
- npm, yarn, pnpm, or bun

## Getting Started

```bash
git clone https://github.com/flowpilot/flowpilot-app.git
cd flowpilot-app
npm install
cp .env.example .env.local
# Edit .env.local with your database credentials
npx prisma generate
npx prisma db push
npm run dev
```

## Coding Style

### TypeScript

- Strict mode enabled — no `any` types in application code
- Use the `@/*` path alias for imports from `src/`
- Prefer `interface` for object shapes, `type` for unions/intersections

### React

- Functional components only (no class components)
- Use `'use client'` directive only when the component requires browser APIs, hooks, or event handlers
- Extract hooks into `src/hooks/` when reusable
- Extract UI components into `src/components/ui/`

### CSS

- Tailwind CSS 4 utility classes only — no custom CSS unless necessary
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Follow the existing color token system (oklch-based shadcn theme in `globals.css`)

### Formatting

- Prettier with `prettier-plugin-tailwindcss` for automatic class sorting
- No semicolons, single quotes
- Run `npx prettier --write .` before committing

## Branch Naming

| Prefix      | Purpose                               |
| ----------- | ------------------------------------- |
| `feature/`  | New features                          |
| `fix/`      | Bug fixes                             |
| `docs/`     | Documentation changes                 |
| `test/`     | Adding or updating tests              |
| `chore/`    | Maintenance tasks                     |
| `refactor/` | Code refactoring (no behavior change) |

Example: `feature/pricing-page`, `fix/waitlist-validation`

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]
[optional footer]
```

### Types

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `docs`     | Documentation only                                      |
| `test`     | Adding or updating tests                                |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore`    | Build process, dependencies, or tooling                 |
| `style`    | Formatting, no code change                              |
| `perf`     | Performance improvement                                 |

### Examples

```
feat: add team management dashboard
fix: resolve waitlist duplicate detection race condition
docs: update README with deployment guide
test: add Pricing component tests
chore: freeze dependency versions for v1.0.0
```

## Quality Gates

**Every commit must pass all quality gates.** Run these before pushing:

```bash
# Type check
npx tsc --noEmit

# Lint
npx eslint .

# Format check
npx prettier --check .

# Tests
npm test

# Production build
npm run build
```

All five must pass with zero errors.

## Testing Requirements

### Adding New Tests

1. Create test files adjacent to the source: `Component.test.tsx` next to `Component.tsx`
2. Use `@testing-library/react` for component tests
3. Use `@testing-library/user-event` for user interactions
4. Mock external dependencies (API calls, localStorage, etc.)
5. Wrap state updates in `act()` when testing async behavior
6. Aim for meaningful coverage — test behavior, not implementation details

### Test File Structure

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### Existing Test Suites

| Suite           | File                                                         | Tests |
| --------------- | ------------------------------------------------------------ | ----- |
| ThemeToggle     | `src/components/ui/ThemeToggle/ThemeToggle.test.tsx`         | 11    |
| Navbar          | `src/components/layout/Navbar/Navbar.test.tsx`               | 6     |
| Footer          | `src/components/layout/Footer/Footer.test.tsx`               | 5     |
| AnimatedSection | `src/components/ui/AnimatedSection/AnimatedSection.test.tsx` | 3     |
| Waitlist        | `src/components/sections/Waitlist/Waitlist.test.tsx`         | 6     |
| Pricing         | `src/components/sections/Pricing/Pricing.test.tsx`           | 5     |
| FAQ             | `src/components/sections/FAQ/FAQ.test.tsx`                   | 6     |
| API Route       | `src/app/api/waitlist/route.test.ts`                         | 4     |

## Project Structure

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # React components (layout/, sections/, ui/, providers/)
├── hooks/         # Custom React hooks
├── lib/           # Utilities, constants, validations, Prisma client
├── data/          # Static data (FAQ items)
├── types/         # TypeScript type definitions
└── generated/     # Auto-generated Prisma client (do not edit)
```

## Pull Request Checklist

Before submitting a PR, verify:

- [ ] All quality gates pass (`tsc`, `eslint`, `prettier`, `test`, `build`)
- [ ] New features have corresponding tests
- [ ] Breaking changes are documented
- [ ] README is updated if public API or setup changes
- [ ] No secrets or credentials are committed
- [ ] Branch is up to date with `main`

## Code Review

All PRs require at least one review before merging. Reviewers will check:

1. Code follows project conventions
2. Tests are comprehensive and passing
3. No regressions in existing functionality
4. Documentation is updated
5. Security best practices are followed

## Questions?

Open an issue on GitHub or reach out to the maintainers.
