'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BillingToggle } from '@/components/ui/BillingToggle/BillingToggle'

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
    monthlyPrice: '$19',
    annualPrice: '$15',
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
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your team.
            <br />
            No hidden fees. Cancel anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <BillingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
          </div>
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
                <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold tracking-tight">
                  {'monthlyPrice' in plan
                    ? isAnnual
                      ? plan.annualPrice
                      : plan.monthlyPrice
                    : plan.price}
                </span>
                {'period' in plan && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="text-primary mt-0.5 size-4 shrink-0"
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
