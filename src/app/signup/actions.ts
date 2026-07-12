'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const SignupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Full name is required.')
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Name is too long.'),
    email: z
      .string()
      .min(1, 'Email address is required.')
      .email('Please enter a valid email address.')
      .max(254, 'Email address is too long.'),
    password: z
      .string()
      .min(1, 'Password is required.')
      .min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type SignupInput = z.infer<typeof SignupSchema>

export interface SignupResult {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

export async function signup(data: SignupInput): Promise<SignupResult> {
  const parsed = SignupSchema.safeParse(data)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return { success: false, error: 'Validation failed.', fieldErrors }
  }

  const { name, email, password } = parsed.data
  const normalizedEmail = email.toLowerCase().trim()

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email already exists.',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch {
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
