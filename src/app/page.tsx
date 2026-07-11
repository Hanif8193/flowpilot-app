import { Hero } from '@/components/sections/Hero/Hero'
import { Trusted } from '@/components/sections/Trusted/Trusted'
import { Features } from '@/components/sections/Features/Features'
import { Workflow } from '@/components/sections/Workflow/Workflow'
import { Dashboard } from '@/components/sections/Dashboard/Dashboard'
import { Pricing } from '@/components/sections/Pricing/Pricing'
import { Testimonials } from '@/components/sections/Testimonials/Testimonials'
import { FAQ } from '@/components/sections/FAQ/FAQ'
import { Waitlist } from '@/components/sections/Waitlist/Waitlist'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'AI-powered workflow automation',
  description:
    'FlowPilot helps modern teams automate repetitive tasks, streamline workflows, and ship products faster with AI.',
  path: '/',
})

export default function Home() {
  return (
    <>
      <Hero />

      <Trusted />

      <Features />

      <Workflow />

      <Dashboard />

      <Pricing />

      <Testimonials />

      <FAQ />

      <Waitlist />
    </>
  )
}
