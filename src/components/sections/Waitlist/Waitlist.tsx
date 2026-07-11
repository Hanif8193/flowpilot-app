'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Waitlist() {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Waitlist submitted')
    setEmail('')
  }

  return (
    <section id="waitlist">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Join the Waitlist Today
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Be among the first teams to experience AI-powered workflow
            automation.
          </p>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <Input
                id="waitlist-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1 text-base"
              />
              <Button type="submit" size="lg" className="h-11 px-8">
                Join Waitlist
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['No spam', 'Early access', 'Cancel anytime'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
