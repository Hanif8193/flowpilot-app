import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { WaitlistFormSchema } from '@/lib/validations'

export async function POST(req: Request) {
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, code: 'INVALID_JSON', message: 'Invalid JSON body.' },
        { status: 422 },
      )
    }

    const result = WaitlistFormSchema.safeParse(body)

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Validation failed.'
      return NextResponse.json(
        { success: false, code: 'VALIDATION_ERROR', message },
        { status: 422 },
      )
    }

    const { email } = result.data

    const existing = await prisma.waitlist.findUnique({ where: { email } })

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          code: 'DUPLICATE',
          message: 'Email already registered.',
        },
        { status: 409 },
      )
    }

    await prisma.waitlist.create({ data: { email } })

    return NextResponse.json({ success: true, email }, { status: 201 })
  } catch (error) {
    console.error('[waitlist] Unexpected error:', error)
    return NextResponse.json(
      {
        success: false,
        code: 'SERVER_ERROR',
        message: 'Something went wrong.',
      },
      { status: 500 },
    )
  }
}
