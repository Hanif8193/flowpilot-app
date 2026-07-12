import { render, screen } from '@testing-library/react'

import { Footer } from './Footer'

describe('Footer', () => {
  it('Privacy Policy link has href="/privacy-policy"', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link', { name: /privacy policy/i })
    expect(links.length).toBeGreaterThanOrEqual(1)
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/privacy-policy')
    })
  })

  it('Terms link has href="/terms"', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link', { name: /terms of service/i })
    expect(links.length).toBeGreaterThanOrEqual(1)
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/terms')
    })
  })

  it('all external links use rel="noopener noreferrer"', () => {
    render(<Footer />)
    const externalLinks = document.querySelectorAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('copyright contains the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    const copyright = screen.getByText(
      (content) =>
        content.includes(year) && content.toLowerCase().includes('flowpilot'),
    )
    expect(copyright).toBeInTheDocument()
  })

  it('every social media link has a non-empty aria-label', () => {
    render(<Footer />)
    const socialLinks = document.querySelectorAll('a[target="_blank"]')
    socialLinks.forEach((link) => {
      const ariaLabel = link.getAttribute('aria-label')
      expect(ariaLabel).not.toBeNull()
      expect(ariaLabel?.trim().length).toBeGreaterThan(0)
    })
  })
})
