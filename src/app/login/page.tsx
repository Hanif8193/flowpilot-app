import { LoginForm } from './login-form'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Sign In',
  description: 'Sign in to your FlowPilot account.',
  path: '/login',
})

export default function LoginPage() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <LoginForm />
      </div>
    </section>
  )
}
