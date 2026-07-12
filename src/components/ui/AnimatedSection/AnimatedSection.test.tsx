import { render, screen } from '@testing-library/react'

const mockUseReducedMotion = jest.fn()

jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMod = require('react') as typeof import('react')
  const MotionDiv = ReactMod.forwardRef(function MotionDiv(
    props: Record<string, unknown>,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const { variants, ...rest } = props
    const domProps = { ...rest }
    delete domProps.initial
    delete domProps.animate
    delete domProps.exit
    delete domProps.transition
    delete domProps.whileHover
    delete domProps.whileTap
    delete domProps.whileInView
    delete domProps.viewport
    return (
      <div ref={ref} data-variants={JSON.stringify(variants)} {...domProps} />
    )
  })
  return {
    motion: { div: MotionDiv },
    useReducedMotion: (...args: unknown[]) => mockUseReducedMotion(...args),
  }
})

import { AnimatedSection } from './AnimatedSection'
import { fadeInUp } from '@/lib/animations'

describe('AnimatedSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders child content when reduced motion is enabled', () => {
    mockUseReducedMotion.mockReturnValue(true)
    render(<AnimatedSection>Hello World</AnimatedSection>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('passes empty variants when reduced motion is enabled', () => {
    mockUseReducedMotion.mockReturnValue(true)
    const { container } = render(<AnimatedSection>Content</AnimatedSection>)
    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toHaveAttribute('data-variants', '{}')
  })

  it('passes fadeInUp variants when reduced motion is disabled', () => {
    mockUseReducedMotion.mockReturnValue(false)
    const { container } = render(<AnimatedSection>Content</AnimatedSection>)
    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toHaveAttribute('data-variants', JSON.stringify(fadeInUp))
  })
})
