/**
 * @jest-environment node
 */
import { POST } from './route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    waitlist: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

import { prisma } from '@/lib/prisma'

const mockFindUnique = prisma.waitlist.findUnique as jest.Mock
const mockCreate = prisma.waitlist.create as jest.Mock

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('POST /api/waitlist', () => {
  it('returns 201 with entry on successful submission', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockCreate.mockResolvedValue({
      id: 'abc123',
      email: 'test@example.com',
      registeredAt: '2026-07-12T00:00:00Z',
    })

    const res = await POST(makeRequest({ email: 'test@example.com' }))
    const json = await res.json()

    expect(res.status).toBe(201)
    expect(json.success).toBe(true)
    expect(json.message).toBe(
      "You're on the list! We'll notify you when access opens.",
    )
  })

  it('returns 409 for duplicate email', async () => {
    mockFindUnique.mockResolvedValue({
      id: 'existing',
      email: 'test@example.com',
    })

    const res = await POST(makeRequest({ email: 'test@example.com' }))
    const json = await res.json()

    expect(res.status).toBe(409)
    expect(json).toEqual({
      success: false,
      message: 'This email is already on the waitlist.',
    })
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('returns 422 for invalid email', async () => {
    const res = await POST(makeRequest({ email: 'invalid' }))
    const json = await res.json()

    expect(res.status).toBe(422)
    expect(json.success).toBe(false)
    expect(json.code).toBe('VALIDATION_ERROR')
  })

  it('returns 500 on storage error', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockCreate.mockRejectedValue(new Error('QuotaExceededError'))

    const res = await POST(makeRequest({ email: 'test@example.com' }))
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.success).toBe(false)
    expect(json.code).toBe('SERVER_ERROR')
  })
})
