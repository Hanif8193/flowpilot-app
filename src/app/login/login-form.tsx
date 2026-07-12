'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginFormSchema, type LoginFormData } from '@/lib/validations'

export function LoginForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setServerError('Invalid email or password.')
        return
      }

      router.push('/')
      router.refresh()
    } catch {
      setServerError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to your FlowPilot account.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {serverError && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-destructive/10 text-destructive rounded-lg px-4 py-3 text-sm"
          >
            {serverError}
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="jane@company.com"
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p
              id="login-email-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            aria-describedby={
              errors.password ? 'login-password-error' : undefined
            }
            aria-invalid={!!errors.password}
            disabled={isSubmitting}
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <p
              id="login-password-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="mt-2 h-11 w-full px-8"
          disabled={isSubmitting}
          aria-label={isSubmitting ? 'Signing in' : undefined}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
