import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTheme } from 'next-themes'

import { ThemeToggle } from './ThemeToggle'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>

function setupTheme(overrides: Partial<ReturnType<typeof useTheme>> = {}) {
  const setTheme = jest.fn()
  mockUseTheme.mockReturnValue({
    resolvedTheme: 'light',
    setTheme,
    theme: 'light',
    systemTheme: 'light',
    themes: ['light', 'dark'],
    forcedTheme: undefined,
    ...overrides,
  } as ReturnType<typeof useTheme>)
  return { setTheme }
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    setupTheme()
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders a toggle button', () => {
    setupTheme()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
  })

  it('calls setTheme when clicked', async () => {
    const user = userEvent.setup()
    const { setTheme } = setupTheme({ resolvedTheme: 'light' })
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledTimes(1)
  })

  it('switches to dark when current theme is light', async () => {
    const user = userEvent.setup()
    const { setTheme } = setupTheme({ resolvedTheme: 'light' })
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('switches to light when current theme is dark', async () => {
    const user = userEvent.setup()
    const { setTheme } = setupTheme({ resolvedTheme: 'dark' })
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('has an accessible aria-label', () => {
    setupTheme({ resolvedTheme: 'light' })
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
    expect(button.getAttribute('aria-label')).not.toBe('')
  })

  it('shows "Switch to dark theme" aria-label when theme is light', () => {
    setupTheme({ resolvedTheme: 'light' })
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark theme',
    )
  })

  it('shows "Switch to light theme" aria-label when theme is dark', () => {
    setupTheme({ resolvedTheme: 'dark' })
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light theme',
    )
  })

  it('renders both Sun and Moon icons', () => {
    setupTheme()
    render(<ThemeToggle />)
    const svgIcons = document.querySelectorAll('svg')
    expect(svgIcons.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the Sun icon', () => {
    setupTheme()
    const { container } = render(<ThemeToggle />)
    const sunIcon = container.querySelector('.lucide-sun')
    expect(sunIcon).toBeInTheDocument()
  })

  it('renders the Moon icon', () => {
    setupTheme()
    const { container } = render(<ThemeToggle />)
    const moonIcon = container.querySelector('.lucide-moon')
    expect(moonIcon).toBeInTheDocument()
  })
})
