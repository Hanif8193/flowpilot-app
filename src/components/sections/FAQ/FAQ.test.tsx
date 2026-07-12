import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FAQ } from './FAQ'
import faqData from '@/data/faq'

describe('FAQ', () => {
  it('renders every FAQ question from the data', () => {
    render(<FAQ />)

    faqData.forEach((item) => {
      expect(
        screen.getByRole('button', { name: item.question }),
      ).toBeInTheDocument()
    })
  })

  it('first answer panel is not visible initially', () => {
    render(<FAQ />)

    expect(screen.queryByText(faqData[0].answer)).not.toBeInTheDocument()
  })

  it('clicking the first FAQ question reveals its answer and sets aria-expanded', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const trigger = screen.getByRole('button', { name: faqData[0].question })
    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(faqData[0].answer)).toBeVisible()
  })

  it('focusing the second trigger and pressing Enter reveals its answer', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const trigger = screen.getByRole('button', { name: faqData[1].question })
    trigger.focus()
    await user.keyboard('{Enter}')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(faqData[1].answer)).toBeVisible()
  })

  it('pressing Space on an open FAQ item closes it', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const trigger = screen.getByRole('button', { name: faqData[0].question })
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.type(trigger, '{space}')

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(faqData[0].answer)).not.toBeInTheDocument()
  })

  it('keyboard focus moves sequentially between accordion triggers via Tab', async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    const triggers = faqData.map((item) =>
      screen.getByRole('button', { name: item.question }),
    )

    triggers[0].focus()
    expect(triggers[0]).toHaveFocus()

    await user.tab()
    expect(triggers[1]).toHaveFocus()

    await user.tab()
    expect(triggers[2]).toHaveFocus()
  })
})
