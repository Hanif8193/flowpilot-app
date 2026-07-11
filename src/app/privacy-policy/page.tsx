import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Learn how FlowPilot collects, uses, and protects your information.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="prose prose-gray dark:prose-invert mt-8 space-y-8">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Data Collection</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, such as when
              you create an account, join our waitlist, or contact us for
              support. This may include your name, email address, and any other
              information you choose to provide.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Data Use</h2>
            <p className="text-muted-foreground">
              We use the information we collect to operate and improve our
              services, to communicate with you about updates and offers, and to
              respond to your comments, questions, and customer service requests.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. Cookies are files with
              a small amount of data which may include an anonymous unique
              identifier.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal
              information. You may also opt out of certain data collection uses
              by contacting us directly.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a
                href="mailto:privacy@flowpilot.app"
                className="text-primary underline underline-offset-4"
              >
                privacy@flowpilot.app
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
