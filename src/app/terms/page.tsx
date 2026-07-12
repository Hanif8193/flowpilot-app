import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Review the terms and conditions for using FlowPilot.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>

        <div className="prose prose-gray dark:prose-invert mt-8 space-y-8">
          <p className="text-muted-foreground">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using FlowPilot, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Use of Service</h2>
            <p className="text-muted-foreground">
              FlowPilot provides AI-powered workflow automation tools. You may
              use our service only for lawful purposes and in accordance with
              these Terms. We reserve the right to modify or discontinue the
              service at any time.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">User Responsibilities</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Intellectual Property</h2>
            <p className="text-muted-foreground">
              The service and its original content, features, and functionality
              are owned by FlowPilot and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall FlowPilot be liable for any indirect,
              incidental, special, consequential, or punitive damages resulting
              from your use of or inability to use the service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please
              contact us at{' '}
              <a
                href="mailto:legal@flowpilot.app"
                className="text-primary underline underline-offset-4"
              >
                legal@flowpilot.app
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
