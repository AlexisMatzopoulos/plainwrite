"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useSession } from 'next-auth/react'

function PostHogIdentifier() {
  const { data: session } = useSession()

  // Identify user when they sign in
  useEffect(() => {
    if (session?.user?.email) {
      posthog.identify(session.user.email, {
        email: session.user.email,
        name: session.user.name,
      })
    } else {
      posthog.reset() // Clear identity when logged out
    }
  }, [session])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      person_profiles: 'identified_only', // Only create profiles for logged-in users
      capture_pageview: true, // Automatically capture pageviews
      capture_pageleave: true,
      opt_out_capturing_by_default: true, // Require explicit consent (GDPR)
      disable_session_recording: true, // Disable session recording by default
      defaults: '2025-05-24',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
        }
      },
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogIdentifier />
      {children}
    </PHProvider>
  )
}
