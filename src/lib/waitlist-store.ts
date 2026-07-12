'use client'

// waitlist-store — Client-side localStorage cache for waitlist entries.
// Provides fast dedup checking without hitting the API on every submit.
// Handles QuotaExceededError when localStorage is full.
// This is a CLIENT-SIDE cache only; the source of truth is PostgreSQL.

import type { WaitlistEntry } from '@/types/waitlist'

const STORAGE_KEY = 'flowpilot_waitlist'

export function getEntries(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    return JSON.parse(raw) as WaitlistEntry[]
  } catch {
    return []
  }
}

export function hasEntry(email: string): boolean {
  const normalized = email.toLowerCase().trim()
  return getEntries().some((e) => e.email.toLowerCase().trim() === normalized)
}

export function addEntry(entry: WaitlistEntry): void {
  const entries = getEntries()
  entries.push(entry)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch (err) {
    if (err instanceof DOMException && err.name === 'QuotaExceededError') {
      throw new Error(
        'localStorage quota exceeded. Cannot save waitlist entry.',
      )
    }
    throw err
  }
}
