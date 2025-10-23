"use client"

import { SessionProvider } from "next-auth/react"
import { PostHogProvider } from "./PostHogProvider"
import { CookieConsent } from "./CookieConsent"
import { Suspense } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
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
