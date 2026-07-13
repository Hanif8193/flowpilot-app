import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Waitlist } from './Waitlist'

jest.mock('@/components/ui/AnimatedSection/AnimatedSection', () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

const mockFetch = jest.fn()
global.fetch = mockFetch as jest.Mock

function renderWaitlist() {
  return {
    user: userEvent.setup(),
    ...render(<Waitlist />),
  }
}

describe('Waitlist', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('shows validation error when submitting empty email', async () => {
    const { user } = renderWaitlist()

    await user.click(screen.getByRole('button', { name: /join waitlist/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Email address is required.',
    )
  })

  it('shows validation error for invalid email', async () => {
    const { user } = renderWaitlist()

    await user.type(screen.getByRole('textbox'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /join waitlist/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please enter a valid email address.',
    )
  })

  it('disables submit button and shows loading spinner during pending request', async () => {
    let resolveFetch!: (value: Response) => void
    mockFetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve
      }),
    )

    const { user } = renderWaitlist()

    await user.type(screen.getByRole('textbox'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /join waitlist/i }))

    const button = screen.getByRole('button', { name: /submitting/i })
    expect(button).toBeDisabled()
    expect(screen.getByText('Joining...')).toBeInTheDocument()
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()

    await act(async () => {
      resolveFetch({
        status: 201,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    })

    expect(screen.getByText('Submit another email')).toBeInTheDocument()
  })

  it('shows success message after successful submission', async () => {
    let resolveFetch!: (value: Response) => void
    mockFetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve
      }),
    )

    const { user } = renderWaitlist()

    await user.type(screen.getByRole('textbox'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /join waitlist/i }))

    await act(async () => {
      resolveFetch({
        status: 201,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    })

    expect(screen.getByRole('status')).toHaveTextContent(
      "You're on the list! We'll notify you when access opens.",
    )
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('shows duplicate notice for 409 response', async () => {
    let resolveFetch!: (value: Response) => void
    mockFetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve
      }),
    )

    const { user } = renderWaitlist()

    await user.type(screen.getByRole('textbox'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /join waitlist/i }))

    await act(async () => {
      resolveFetch({
        status: 409,
        json: () => Promise.resolve({}),
      } as Response)
    })

    expect(screen.getByRole('status')).toHaveTextContent(
      'This email is already on the waitlist.',
    )
  })

  it('shows error message and re-enables button on network failure', async () => {
    let rejectFetch!: (error: Error) => void
    mockFetch.mockReturnValue(
      new Promise((_, reject) => {
        rejectFetch = reject
      }),
    )

    const { user } = renderWaitlist()

    await user.type(screen.getByRole('textbox'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /join waitlist/i }))

    await act(async () => {
      rejectFetch(new Error('Network Error'))
    })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Something went wrong. Please try again.',
    )
    expect(screen.getByRole('button', { name: /try again/i })).toBeEnabled()
  })
})
