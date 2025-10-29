"use client"

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useAuth } from './AuthProvider'

function PostHogIdentifier() {
  const { user } = useAuth()

  // Identify user when they sign in
  useEffect(() => {
    if (user?.email) {
      const userName = user.user_metadata?.name || user.user_metadata?.full_name
      posthog.identify(user.email, {
        email: user.email,
        name: userName,
      })
    } else {
      posthog.reset() // Clear identity when logged out
    }
  }, [user])

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
