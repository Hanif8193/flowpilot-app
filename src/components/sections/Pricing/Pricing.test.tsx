import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pricing } from './Pricing'

describe('Pricing', () => {
  it('renders Pro card with $19/mo by default (monthly)', () => {
    render(<Pricing />)

    expect(screen.getByText('$19')).toBeInTheDocument()
    expect(screen.getByText('/month')).toBeInTheDocument()
  })

  it('switches Pro pricing to $15/mo when BillingToggle is clicked', async () => {
    const user = userEvent.setup()
    render(<Pricing />)

    const toggle = screen.getByRole('switch', {
      name: /toggle annual billing/i,
    })
    await user.click(toggle)

    expect(screen.getByText('$15')).toBeInTheDocument()
    expect(screen.getByText('/month')).toBeInTheDocument()
  })

  it('does NOT show "Save 20%" in monthly mode', () => {
    render(<Pricing />)

    expect(screen.queryByText('Save 20%')).not.toBeInTheDocument()
  })

  it('shows "Save 20%" after enabling annual billing', async () => {
    const user = userEvent.setup()
    render(<Pricing />)

    const toggle = screen.getByRole('switch', {
      name: /toggle annual billing/i,
    })
    await user.click(toggle)

    expect(screen.getByText('Save 20%')).toBeInTheDocument()
  })

  it('BillingToggle switch has a non-empty aria-label', () => {
    render(<Pricing />)

    const toggle = screen.getByRole('switch', {
      name: /toggle annual billing/i,
    })
    const ariaLabel = toggle.getAttribute('aria-label')
    expect(ariaLabel).not.toBeNull()
    expect(ariaLabel).not.toBe('')
  })
})
