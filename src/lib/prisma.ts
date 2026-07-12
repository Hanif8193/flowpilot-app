// Prisma client singleton — prevents multiple instances during Next.js dev HMR.
// Uses @prisma/adapter-pg (PrismaPg) for PostgreSQL connection pooling.
// The globalThis singleton is only set in non-production environments.

import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL!

const adapter = new PrismaPg({
  connectionString,
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
