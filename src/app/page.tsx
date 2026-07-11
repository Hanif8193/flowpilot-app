import { Hero } from '@/components/sections/Hero/Hero'
import { Trusted } from '@/components/sections/Trusted/Trusted'
import { Features } from '@/components/sections/Features/Features'
import { Workflow } from '@/components/sections/Workflow/Workflow'
import { Dashboard } from '@/components/sections/Dashboard/Dashboard'
import { Pricing } from '@/components/sections/Pricing/Pricing'
import { Testimonials } from '@/components/sections/Testimonials/Testimonials'
import { FAQ } from '@/components/sections/FAQ/FAQ'
import { Waitlist } from '@/components/sections/Waitlist/Waitlist'

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
