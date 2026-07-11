import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'For individuals getting started',
    features: [
      'Up to 3 workflows',
      'Basic AI automation',
      'Email support',
      'Community access',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams',
    features: [
      'Unlimited workflows',
      'Advanced AI automation',
      'Team collaboration',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      'API access',
      'Dedicated support',
      'SSO',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your team.
            <br />
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg sm:p-8 ${
                plan.featured
                  ? 'border-primary scale-[1.02] shadow-md'
                  : 'border-border'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? 'default' : 'outline'}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
