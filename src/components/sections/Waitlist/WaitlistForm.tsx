'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWaitlistForm } from '@/hooks/useWaitlistForm'

export function WaitlistForm() {
  const { form, onSubmit, submissionState, reset } = useWaitlistForm()

  const { status, message } = submissionState

  if (status === 'success') {
    return (
      <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
        <p role="status" className="text-foreground text-base font-medium">
          You&apos;re on the list! We&apos;ll notify you when access opens.
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-primary mt-4 rounded-lg text-sm underline-offset-4 hover:underline"
        >
          Submit another email
        </button>
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
        <p role="status" className="text-foreground text-base font-medium">
          {message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-primary mt-4 rounded-lg text-sm underline-offset-4 hover:underline"
        >
          Try a different email
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
        <p role="alert" className="text-foreground text-base font-medium">
          {message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-primary mt-4 rounded-lg text-sm underline-offset-4 hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>

        <Input
          id="waitlist-email"
          type="email"
          placeholder="Enter your email"
          aria-describedby={
            form.formState.errors.email ? 'email-error' : undefined
          }
          aria-invalid={!!form.formState.errors.email}
          {...form.register('email')}
          className="h-11 flex-1 text-base"
        />

        <Button
          type="submit"
          size="lg"
          className="h-11 px-8"
          disabled={status === 'loading'}
          aria-label={status === 'loading' ? 'Submitting' : undefined}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Joining...
            </>
          ) : (
            'Join Waitlist'
          )}
        </Button>
      </form>

      {form.formState.errors.email && (
        <p
          id="email-error"
          role="alert"
          aria-live="polite"
          className="text-destructive mt-3 text-sm"
        >
          {form.formState.errors.email.message}
        </p>
      )}
    </div>
  )
}
