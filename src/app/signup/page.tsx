import { SignupForm } from './signup-form'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Sign Up',
  description:
    'Create your FlowPilot account and start automating workflows with AI.',
  path: '/signup',
})

export default function SignupPage() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <SignupForm />
      </div>
    </section>
  )
}
