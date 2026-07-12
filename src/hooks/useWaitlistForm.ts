'use client'

// useWaitlistForm — Waitlist form state management hook.
// Flow: localStorage dedup check → POST /api/waitlist → localStorage cache.
// Handles 201 (success), 409 (duplicate), 422 (validation), and 500 (error).

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { WaitlistFormSchema, type WaitlistFormData } from '@/lib/validations'
import { hasEntry, addEntry } from '@/lib/waitlist-store'

export type SubmissionStatus =
  'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export interface SubmissionState {
  status: SubmissionStatus
  message?: string
}

export function useWaitlistForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: 'idle',
  })

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(WaitlistFormSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = useCallback(async (data: WaitlistFormData) => {
    const email = data.email.toLowerCase().trim()

    if (hasEntry(email)) {
      setSubmissionState({
        status: 'duplicate',
        message: 'You are already on the waitlist.',
      })
      return
    }

    setSubmissionState({ status: 'loading' })

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.status === 201) {
        try {
          addEntry({
            id: crypto.randomUUID(),
            email,
            registeredAt: new Date().toISOString(),
            isValid: true,
          })
        } catch (err) {
          if (err instanceof Error && err.message.includes('quota')) {
            setSubmissionState({
              status: 'error',
              message: 'Storage quota exceeded. Please try again later.',
            })
            return
          }
          throw err
        }

        setSubmissionState({
          status: 'success',
          message: 'Successfully joined the waitlist!',
        })
        return
      }

      if (res.status === 409) {
        setSubmissionState({
          status: 'duplicate',
          message: 'You are already on the waitlist.',
        })
        return
      }

      if (res.status === 422) {
        const body = await res.json().catch(() => null)
        setSubmissionState({
          status: 'error',
          message: body?.message ?? 'Invalid email address.',
        })
        return
      }

      setSubmissionState({
        status: 'error',
        message: 'Something went wrong. Please try again.',
      })
    } catch {
      setSubmissionState({
        status: 'error',
        message: 'Something went wrong. Please try again.',
      })
    }
  }, [])

  const reset = useCallback(() => {
    form.reset()
    setSubmissionState({ status: 'idle' })
  }, [form])

  return { form, onSubmit: form.handleSubmit(onSubmit), submissionState, reset }
}
