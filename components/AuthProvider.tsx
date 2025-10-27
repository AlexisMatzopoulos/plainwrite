'use client'

import { SessionProvider } from 'next-auth/react'
import { PostHogProvider } from './PostHogProvider'
import { CookieConsent } from './CookieConsent'
import { Suspense } from 'react'

/**
 * AuthProvider wraps the app with necessary client-side providers.
 * This is a Client Component that enables:
 * - NextAuth SessionProvider for authentication
 * - PostHog analytics
 * - Cookie consent banner
 *
 * By keeping this separate from the root layout, we allow pages
 * to be Server Components by default (Next.js 15 best practice).
 */
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
