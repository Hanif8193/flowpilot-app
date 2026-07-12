import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero/Hero'
import { Trusted } from '@/components/sections/Trusted/Trusted'
import { generatePageMetadata } from '@/lib/metadata'

const Features = dynamic(
  () =>
    import('@/components/sections/Features/Features').then((m) => m.Features),
  { ssr: true },
)

const Workflow = dynamic(
  () =>
    import('@/components/sections/Workflow/Workflow').then((m) => m.Workflow),
  { ssr: true },
)

const Dashboard = dynamic(
  () =>
    import('@/components/sections/Dashboard/Dashboard').then(
      (m) => m.Dashboard,
    ),
  { ssr: true },
)

const Pricing = dynamic(() =>
  import('@/components/sections/Pricing/Pricing').then((m) => m.Pricing),
)

const Testimonials = dynamic(
  () =>
    import('@/components/sections/Testimonials/Testimonials').then(
      (m) => m.Testimonials,
    ),
  { ssr: true },
)

const FAQ = dynamic(() =>
  import('@/components/sections/FAQ/FAQ').then((m) => m.FAQ),
)

const Waitlist = dynamic(() =>
  import('@/components/sections/Waitlist/Waitlist').then((m) => m.Waitlist),
)

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
