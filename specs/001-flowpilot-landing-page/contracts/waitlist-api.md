# Contract: POST /api/waitlist

**Type**: Next.js App Router API Route Contract
**File**: `app/api/waitlist/route.ts`
**Date**: 2026-07-10

---

## Endpoint

```
POST /api/waitlist
Content-Type: application/json
```

---

## Request

### Headers

| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |

### Body Schema

```typescript
{
  email: string   // Raw email string from the form
}
```

**Validation** (Zod -- WaitlistFormSchema):
- `email`: required, non-empty, valid email format (RFC 5322), max 254 characters
- Email is normalized to lowercase + trimmed before storage

### Example Request

```json
{ "email": "founder@startup.io" }
```

---

## Responses

### 201 Created -- New Entry Registered

```json
{
  "success": true,
  "message": "You're on the list! We'll be in touch soon.",
  "entry": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "registeredAt": "2026-07-10T15:30:00.000Z"
  }
}
```

**UI Action**: Show SuccessMessage, hide form, do not re-enable submission.

### 409 Conflict -- Duplicate Email

```json
{
  "success": false,
  "code": "DUPLICATE",
  "message": "You're already on the list! We'll be in touch when we launch."
}
```

**UI Action**: Show DuplicateNotice (role="status"). Do not treat as an error.

### 422 Unprocessable Entity -- Validation Error

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Please enter a valid email address."
}
```

**UI Action**: Show inline error on email field (role="alert").

### 500 Internal Server Error -- Storage Failure

```json
{
  "success": false,
  "code": "STORAGE_ERROR",
  "message": "Something went wrong. Please try again in a moment."
}
```

**UI Action**: Show generic error message with retry option. Re-enable submit button.

---

## Route Implementation Contract

```typescript
// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { WaitlistFormSchema } from '@/lib/validations'
import { hasEntry, addEntry } from '@/lib/waitlist-store'
import type { WaitlistAPIResponse } from '@/types/waitlist'

export async function POST(request: NextRequest): Promise<NextResponse<WaitlistAPIResponse>> {
  // 1. Parse and validate request body (Zod)
  // 2. Check for duplicate via hasEntry(email)
  //    --> if duplicate: return 409
  // 3. Add entry via addEntry({ id, email, registeredAt, isValid: true })
  //    --> if storage fails: return 500
  // 4. Return 201 with entry id and timestamp
}
```

---

## Error Code Reference

| Code | HTTP Status | Meaning |
|---|---|---|
| DUPLICATE | 409 | Email already in waitlist |
| VALIDATION_ERROR | 422 | Email failed Zod schema check |
| STORAGE_ERROR | 500 | localStorage write failed |
| INTERNAL_ERROR | 500 | Unexpected/unhandled error |

---

## Security Notes

- This is a client-side localStorage prototype -- no server-side persistence in this phase.
- In production, this route would be replaced with a database insert + rate limiting + CAPTCHA.
- No authentication required for this endpoint.
- No PII beyond email address is collected.
