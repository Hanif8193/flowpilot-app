import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Engineering Manager',
    company: 'Acme Inc.',
    initials: 'SJ',
    quote:
      'FlowPilot has completely transformed our deployment workflow. Our team now ships features twice as fast.',
  },
  {
    name: 'Ahmed Khan',
    title: 'Founder',
    company: 'TechNova',
    initials: 'AK',
    quote:
      'The AI workflow suggestions save us hours every week. Setup was incredibly easy.',
  },
  {
    name: 'Emily Chen',
    title: 'Product Lead',
    company: 'CloudSync',
    initials: 'EC',
    quote:
      'Beautiful interface, powerful automation, and outstanding performance. Highly recommended.',
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-yellow-400 text-yellow-400"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See why developers and companies trust FlowPilot to automate their
            workflows.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="border-border bg-card flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <Quote
                className="text-muted-foreground/30 mb-4 size-8"
                aria-hidden="true"
              />

              <blockquote className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <StarRating />

              <div className="border-border mt-5 flex items-center gap-3 border-t pt-5">
                <div
                  className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{t.name}</h3>
                  <p className="text-muted-foreground text-xs">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
