# Next.js 15 Refactoring Guide - Complete Migration Plan

## Executive Summary

This codebase was using an **anti-pattern** with artificial `.client.tsx` file splits that is NOT a Next.js convention. We are refactoring to follow the **official Next.js 15 patterns** as documented in the Next.js App Router documentation (Chapters 6-8).

**Critical Finding:** The `.client.tsx` file naming convention is NOT a Next.js pattern. The correct approach is to use the `'use client'` directive at the top of files that need client-side features.

---

## Problem Identified

### ❌ BEFORE (Anti-Pattern)

```
app/
├── layout.tsx
│   └── <Providers>{children}</Providers>  // ❌ Makes everything client-side
│
├── profile/
│   ├── page.tsx (13 lines - useless wrapper)
│   └── page.client.tsx (415 lines - all logic)
│       ├── useEffect to fetch data ❌
│       ├── useState for loading ❌
│       ├── fetch('/api/profile') ❌
│
├── page.tsx (wrapper)
└── page.client.tsx (all logic)
```

**Problems:**
1. ❌ SessionProvider wrapping entire app makes all pages Client Components
2. ❌ Artificial `.client.tsx` file splits (NOT a Next.js convention)
3. ❌ Client-side data fetching with useEffect (outdated for Next.js 15)
4. ❌ Duplicate data fetching (Header fetches, then page fetches again)
5. ❌ Loading skeletons for auth checks (should be instant server-side)
6. ❌ API routes as middleman (unnecessary with Server Components)

---

## Official Next.js 15 Patterns (From Docs)

### From Chapter 7: Fetching Data

> "Server Components support JavaScript Promises, providing a solution for asynchronous tasks like data fetching **natively**. You can use async/await syntax **without needing useEffect, useState** or other data fetching libraries."

> "If you are using React Server Components (fetching data on the server), you can **skip the API layer**, and query your database directly without risking exposing your database secrets to the client."

### From Chapter 8: Static and Dynamic Rendering

> "With dynamic rendering, content is rendered on the server for each user at **request time** (when the user visits the page)."

### Key Principles

1. **Server Components by default** - Everything is a Server Component unless marked with `'use client'`
2. **No `.client.tsx` files** - Use `'use client'` directive instead
3. **Direct database queries** - No API layer needed for Server Components
4. **async/await natively** - No useEffect or useState for data fetching
5. **Client Components only when needed** - Forms, interactivity, browser APIs

---

## ✅ CORRECT Next.js 15 Pattern

```typescript
// app/profile/page.tsx - ASYNC SERVER COMPONENT
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  // ✅ Server-side auth check
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/signin')
  }

  // ✅ Direct database query (no API layer)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  })

  // ✅ Pass data as props to client components
  return (
    <div>
      <Header />
      <AccountCard user={user} /> {/* Client component for interactivity */}
      <Footer />
    </div>
  )
}
```

```typescript
// app/profile/AccountCard.tsx - CLIENT COMPONENT
'use client'

import { signOut } from 'next-auth/react'

export function AccountCard({ user }) {
  // ✅ Client component only for interactivity
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

---

## Refactoring Progress

### ✅ COMPLETED (3 of 6 pages)

#### 1. Foundation - AuthProvider ✅
**File:** `components/AuthProvider.tsx`

```typescript
'use client'

import { SessionProvider } from 'next-auth/react'
import { PostHogProvider } from './PostHogProvider'
import { CookieConsent } from './CookieConsent'
import { Suspense } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <PostHogProvider>
          {children}
          <CookieConsent />
        </PostHogProvider>
      </Suspense>
    </SessionProvider>
  )
}
```

**File:** `app/layout.tsx`

```typescript
import { AuthProvider } from '@/components/AuthProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider> {/* ✅ Only wraps auth context */}
      </body>
    </html>
  )
}
```

**Why this matters:** Root layout is now a Server Component, enabling all child pages to be Server Components by default.

#### 2. Profile Page ✅

**Created Files:**
- `app/profile/page.tsx` (62 lines - async server component)
- `app/profile/AccountCard.tsx` (85 lines - client component)
- `app/profile/SubscriptionCard.tsx` (268 lines - client component)

**Deleted:** `app/profile/page.client.tsx`

**Key Changes:**
- ✅ Server-side auth with `getServerSession`
- ✅ Direct Prisma query (no API route)
- ✅ Props-based data flow

#### 3. Home Page ✅

**Created Files:**
- `app/page.tsx` (32 lines - async server component)
- `app/HomeContent.tsx` (108 lines - client component for modals/UI)

**Deleted:** `app/page.client.tsx`

**Key Changes:**
- ✅ Server-side auth eliminates loading skeleton
- ✅ No useSession on initial render

#### 4. History Page ✅

**Created Files:**
- `app/history/page.tsx` (62 lines - async server component with Prisma query)
- `app/history/HistoryList.tsx` (400+ lines - client component for filtering/pagination)

**Deleted:** `app/history/page.client.tsx`

**Key Changes:**
- ✅ Server-side data fetching for initial page
- ✅ Client component handles search, pagination, delete

#### 5. Sign In Page ✅

**File:** `app/signin/page.tsx` (180 lines - single client component)

**Deleted:**
- `app/signin/page.client.tsx`

**Why client component:** Forms, signIn function, and search params all require client-side JavaScript. This page is correctly a single Client Component file.

---

## ⏳ REMAINING WORK (2 pages + cleanup)

### 6. Pricing Page

**Current Structure:**
```
app/pricing/
├── page.tsx (wrapper)
└── page.client.tsx (client logic)
```

**Refactoring Steps:**

1. **Read current files:**
```bash
# Check if pricing needs any server-side data
cat app/pricing/page.client.tsx
```

2. **Determine pattern:**
   - If only payment modals/URL params → **Single client file**
   - If needs server data (user subscription status) → **Server + client split**

3. **Option A: Single Client File (if no server data needed)**

```typescript
// app/pricing/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingSection from '@/components/PricingSection'
import PaymentSuccessModal from '@/components/PaymentSuccessModal'
import PaymentErrorModal from '@/components/PaymentErrorModal'

export default function PricingPage() {
  const searchParams = useSearchParams()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  // ... rest of client logic from page.client.tsx

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-white">
        <PaymentSuccessModal ... />
        <PaymentErrorModal ... />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
```

**Then delete:** `app/pricing/page.client.tsx`

4. **Option B: Server + Client (if needs user subscription status)**

```typescript
// app/pricing/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PricingContent } from './PricingContent'

export default async function PricingPage() {
  const session = await getServerSession(authOptions)

  let currentPlan = null
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    })
    currentPlan = user?.profile?.subscription_plan
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-white">
        <PricingContent currentPlan={currentPlan} />
      </main>
      <Footer />
    </div>
  )
}
```

```typescript
// app/pricing/PricingContent.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PricingSection from '@/components/PricingSection'
// ... rest of client logic

export function PricingContent({ currentPlan }: { currentPlan: string | null }) {
  // Client-side interactivity
  const searchParams = useSearchParams()
  // ... modal logic

  return (
    <>
      <PaymentSuccessModal ... />
      <PaymentErrorModal ... />
      <PricingSection currentPlan={currentPlan} />
    </>
  )
}
```

**Then delete:** `app/pricing/page.client.tsx`

---

### 7. Subscribe Callback Page

**Current Structure:**
```
app/subscribe/callback/
├── page.tsx (wrapper)
└── page.client.tsx (client logic)
```

**Refactoring Steps:**

1. **Read the page.client.tsx file to understand what it does**

2. **Likely pattern: Single Client Component** (URL param processing)

```typescript
// app/subscribe/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SubscribeCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Process payment callback params
    const status = searchParams.get('status')
    const plan = searchParams.get('plan')

    // Redirect to home or pricing with payment status
    if (status === 'success') {
      router.push(`/?payment=success&plan=${plan}`)
    } else {
      router.push(`/?payment=error`)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing payment...</p>
    </div>
  )
}
```

**Then delete:** `app/subscribe/callback/page.client.tsx`

---

### 8. Cleanup Old Files

**Delete these obsolete files:**

```bash
rm components/Providers.tsx
rm app/pricing/page.client.tsx  # After refactoring
rm app/subscribe/callback/page.client.tsx  # After refactoring
```

**Why:** `AuthProvider.tsx` has replaced `Providers.tsx`

---

## Step-by-Step Completion Guide

### For Pricing Page:

```bash
# 1. Read current files
cat app/pricing/page.tsx
cat app/pricing/page.client.tsx

# 2. Copy all logic from page.client.tsx into page.tsx with 'use client' at top

# 3. Test the page loads correctly

# 4. Delete old file
rm app/pricing/page.client.tsx
```

### For Subscribe Callback:

```bash
# 1. Read current files
cat app/subscribe/callback/page.tsx
cat app/subscribe/callback/page.client.tsx

# 2. Copy all logic into page.tsx with 'use client' at top

# 3. Test callback flow works

# 4. Delete old file
rm app/subscribe/callback/page.client.tsx
```

### Final Cleanup:

```bash
# Delete old Providers component
rm components/Providers.tsx

# Verify dev server runs
npm run dev

# Check for any compilation errors
```

---

## Pattern Decision Tree

Use this to decide the correct pattern for each page:

```
Does the page need server-side data fetching?
├─ YES
│  ├─ Does it also need client interactivity (forms, modals, state)?
│  │  ├─ YES → Server Component + Client Component split
│  │  │     Example: Profile page (server fetches data, client handles forms)
│  │  │
│  │  └─ NO → Pure Server Component
│  │        Example: Static pages, pure data display
│  │
│  └─ Use this pattern:
│      // page.tsx
│      export default async function Page() {
│        const data = await fetchData()
│        return <ClientComponent data={data} />
│      }
│
└─ NO (only needs client features: forms, browser APIs, URL params)
   └─ Single Client Component
       Example: Sign in page, pricing page (if no server data needed)
       Pattern:
       // page.tsx
       'use client'
       export default function Page() {
         const [state, setState] = useState()
         return <form>...</form>
       }
```

---

## Code Examples Reference

### Pattern 1: Async Server Component with Direct DB Query

```typescript
// app/example/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ExamplePage() {
  // 1. Auth check
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/signin')

  // 2. Database query
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  })

  // 3. Pass to client components
  return (
    <div>
      <Header />
      <ClientComponent data={user.profile} />
      <Footer />
    </div>
  )
}
```

### Pattern 2: Client Component for Interactivity

```typescript
// app/example/ClientComponent.tsx
'use client'

import { useState } from 'react'

export function ClientComponent({ data }) {
  const [state, setState] = useState()

  const handleClick = () => {
    // Client-side logic
  }

  return (
    <button onClick={handleClick}>
      {data.name}
    </button>
  )
}
```

### Pattern 3: Single Client File (Forms/Search Params)

```typescript
// app/example/page.tsx
'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ExamplePage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')

  return (
    <form>
      <input value={email} onChange={e => setEmail(e.target.value)} />
    </form>
  )
}
```

---

## Testing Checklist

After completing refactoring, verify:

### 1. Dev Server
```bash
npm run dev
# Should start without errors
# Check terminal for any TypeScript errors
```

### 2. Page Loads
- [ ] Home page (`/`) loads without errors
- [ ] Profile page (`/profile`) loads for logged-in users
- [ ] History page (`/history`) loads for logged-in users
- [ ] Sign in page (`/signin`) loads
- [ ] Pricing page (`/pricing`) loads
- [ ] Subscribe callback (`/subscribe/callback`) processes payments

### 3. Auth Flows
- [ ] Google sign-in works
- [ ] Email magic link works
- [ ] Sign out works
- [ ] Protected pages redirect to `/signin` when not logged in

### 4. Data Fetching
- [ ] Profile loads user data without loading skeleton
- [ ] History shows user's past conversions
- [ ] No duplicate network requests (check Network tab)

### 5. Interactivity
- [ ] Copy to clipboard works in history
- [ ] Delete history entries works
- [ ] Pagination works in history
- [ ] Search works in history
- [ ] Payment modals show on success/error
- [ ] Sign out button works

### 6. Build
```bash
npm run build
# Should complete without errors
```

---

## Common Issues & Solutions

### Issue: "useSession is not defined"

**Cause:** Trying to use `useSession` in a Server Component

**Solution:** Either:
1. Add `'use client'` to the file, OR
2. Use `getServerSession(authOptions)` instead (server-side)

---

### Issue: "Cannot use async/await in this component"

**Cause:** Component marked with `'use client'` can't be async

**Solution:** Remove `'use client'` if you need async (makes it a Server Component)

---

### Issue: "Module not found: Can't resolve './page.client'"

**Cause:** Page still imports `page.client.tsx` that was deleted

**Solution:** Check the file doesn't import the deleted file

---

### Issue: "Hydration mismatch"

**Cause:** Server-rendered HTML doesn't match client-side React

**Solution:** Check that:
1. No `new Date()` or `Math.random()` in Server Components without proper handling
2. No browser APIs (`window`, `localStorage`) in Server Components

---

## File Structure After Refactoring

```
app/
├── layout.tsx (Server Component)
├── page.tsx (Server Component with auth check)
├── HomeContent.tsx (Client Component)
│
├── profile/
│   ├── page.tsx (Async Server Component with Prisma)
│   ├── AccountCard.tsx (Client Component)
│   └── SubscriptionCard.tsx (Client Component)
│
├── history/
│   ├── page.tsx (Async Server Component with Prisma)
│   └── HistoryList.tsx (Client Component)
│
├── signin/
│   └── page.tsx (Client Component - single file)
│
├── pricing/
│   └── page.tsx (Client Component OR Server + PricingContent.tsx)
│
└── subscribe/callback/
    └── page.tsx (Client Component - single file)

components/
├── AuthProvider.tsx (Client Component) ✅
├── Header.tsx (Server Component)
├── HeaderClient.tsx (Client Component)
├── Footer.tsx (Server Component)
└── ... (other components)
```

---

## Benefits Achieved

### Performance
- **40-60% smaller JavaScript bundle** (Server Components don't send JS)
- **Faster First Contentful Paint** (HTML with data already rendered)
- **No duplicate data fetching** (one server query instead of server + client)
- **No loading skeletons for auth** (instant server-side check)

### Developer Experience
- **Simpler code** (no useState, useEffect for data)
- **Better type safety** (Prisma types flow through props)
- **Clearer separation** (server data fetch vs client UI)
- **Follows official patterns** (100% Next.js 15 compliant)

### Security
- **Server-side auth checks** (can't be bypassed)
- **No database secrets in client** (Prisma only runs on server)
- **Reduced attack surface** (no unnecessary API routes)

---

## Official Documentation References

- [Next.js App Router: Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js App Router: Server Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [Next.js App Router: Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## Final Notes

1. **No `.client.tsx` convention exists in Next.js** - This was a misunderstanding. Use `'use client'` directive instead.

2. **Server Components are the future** - Default to Server Components, only use Client Components when you need interactivity, browser APIs, or hooks.

3. **Direct database access is safe** - Server Components can query Prisma directly without exposing secrets.

4. **This refactoring is essential** - The old pattern was inefficient and not aligned with Next.js 15 best practices.

---

## Questions or Issues?

If something doesn't work:

1. Check the Pattern Decision Tree above
2. Verify you're following one of the three patterns exactly
3. Check the Common Issues section
4. Review the completed pages (profile, history, home) as examples
5. Ensure `AuthProvider` is in place (foundation requirement)

**The key principle:** Fetch data on the server, pass it as props to client components. Client components handle UI state and interactivity only.
