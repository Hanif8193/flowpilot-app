'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { SignupFormSchema } from '@/lib/validations'
import type { SignupFormData } from '@/lib/validations'

interface SignupResult {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

export async function signup(data: SignupFormData): Promise<SignupResult> {
  const parsed = SignupFormSchema.safeParse(data)

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
