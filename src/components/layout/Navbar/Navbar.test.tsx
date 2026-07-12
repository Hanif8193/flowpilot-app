import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Navbar } from './Navbar'
import { NAV_LINKS } from '@/lib/constants'

const mockUseSession = jest.fn()
const mockSignOut = jest.fn()

jest.mock('next-auth/react', () => ({
  useSession: (...args: unknown[]) => mockUseSession(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}))

jest.mock('@/components/ui/ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}))

jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMod = require('react') as typeof import('react')
  const MotionDiv = ReactMod.forwardRef(function MotionDiv(
    props: Record<string, unknown>,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const { ...domProps } = props as Record<string, unknown>
    return <div ref={ref} {...domProps} />
  })
  return {
    motion: { div: MotionDiv },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  }
})

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    })
  })

  it('logo anchor has href="/"', () => {
    render(<Navbar />)
    const logo = screen.getByRole('link', { name: /flowpilot/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders every NAV_LINKS item with correct text and href', () => {
    render(<Navbar />)
    NAV_LINKS.forEach((link) => {
      const navLink = screen.getByRole('link', { name: link.label })
      expect(navLink).toHaveAttribute('href', link.href)
    })
  })

  it('CTA link has the correct href', () => {
    render(<Navbar />)
    const cta = screen.getByRole('link', { name: /get started/i })
    expect(cta).toHaveAttribute('href', '/signup')
  })

  it('hamburger button initially has aria-expanded="false"', () => {
    render(<Navbar />)
    const hamburger = screen.getByRole('button', {
      name: /open navigation menu/i,
    })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking hamburger opens mobile menu and sets aria-expanded to true', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const hamburger = screen.getByRole('button', {
      name: /open navigation menu/i,
    })

    await user.click(hamburger)

    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('navigation', { name: /mobile navigation/i }),
    ).toBeInTheDocument()
  })

  it('pressing Escape closes the mobile drawer and restores aria-expanded to false', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const hamburger = screen.getByRole('button', {
      name: /open navigation menu/i,
    })

    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('navigation', { name: /mobile navigation/i }),
    ).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('navigation', { name: /mobile navigation/i }),
    ).not.toBeInTheDocument()
  })
})
