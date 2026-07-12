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
    <section id="trusted" className="border-border bg-muted/30 border-y">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-muted-foreground mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Trusted by modern teams worldwide
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {companies.map((name) => (
            <div
              key={name}
              className="border-border bg-card flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <Building2
                className="text-muted-foreground/60 size-6"
                aria-hidden="true"
              />
              <span className="text-muted-foreground text-sm font-medium">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
