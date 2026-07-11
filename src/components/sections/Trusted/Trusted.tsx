import { Building2 } from 'lucide-react'

const companies = [
  'Google',
  'Microsoft',
  'OpenAI',
  'GitHub',
  'Vercel',
  'Stripe',
  'Notion',
  'Slack',
]

export function Trusted() {
  return (
    <section id="trusted" className="border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight text-muted-foreground sm:text-3xl">
          Trusted by modern teams worldwide
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {companies.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <Building2
                className="size-6 text-muted-foreground/60"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-muted-foreground">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
