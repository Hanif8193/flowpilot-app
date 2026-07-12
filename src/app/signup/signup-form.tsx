'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignupFormSchema, type SignupFormData } from '@/lib/validations'
import { signup } from './actions'

export function SignupForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const result = await signup(data)

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            setError(field as keyof SignupFormData, { message })
          }
        }
        if (result.error && !result.fieldErrors) {
          setServerError(result.error)
        }
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch {
      setServerError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
        <p
          role="status"
          className="text-foreground text-center text-base font-medium"
        >
          Account created successfully! Redirecting to sign in...
        </p>
      </div>
    )
  }

  return (
    <div className="border-border bg-card rounded-2xl border p-8 shadow-lg sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create your account
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Start automating your workflows with AI.
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

        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="Jane Doe"
            aria-describedby="name-error"
            aria-invalid={!!errors.name}
            disabled={isSubmitting}
            {...register('name')}
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="jane@company.com"
            aria-describedby="email-error"
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
            {...register('email')}
          />
          {errors.email && (
            <p
              id="email-error"
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
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="Minimum 8 characters"
            aria-describedby="password-error"
            aria-invalid={!!errors.password}
            disabled={isSubmitting}
            {...register('password')}
          />
          {errors.password && (
            <p
              id="password-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
          <Input
            id="signup-confirm-password"
            type="password"
            placeholder="Re-enter your password"
            aria-describedby="confirm-password-error"
            aria-invalid={!!errors.confirmPassword}
            disabled={isSubmitting}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm"
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="mt-2 h-11 w-full px-8"
          disabled={isSubmitting}
          aria-label={isSubmitting ? 'Creating account' : undefined}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}
