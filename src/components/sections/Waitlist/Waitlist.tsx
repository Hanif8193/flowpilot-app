import { WaitlistForm } from './WaitlistForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection/AnimatedSection'

export function Waitlist() {
  return (
    <section id="waitlist">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Join the Waitlist Today
          </h2>

          <p className="text-muted-foreground mb-10 text-lg">
            Be among the first teams to experience AI-powered workflow
            automation.
          </p>

          <WaitlistForm />

          <p className="text-muted-foreground mt-6 text-sm">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
