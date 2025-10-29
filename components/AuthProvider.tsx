'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { PostHogProvider } from './PostHogProvider'
import { CookieConsent } from './CookieConsent'
import { Suspense } from 'react'

/**
 * AuthProvider wraps the app with necessary client-side providers.
 * This is a Client Component that enables:
 * - Supabase Auth context for authentication state
 * - PostHog analytics
 * - Cookie consent banner
 *
 * By keeping this separate from the root layout, we allow pages
 * to be Server Components by default (Next.js 15 best practice).
 */

type AuthContextType = {
  user: User | null
  loading: boolean
  signingOut: boolean
  setSigningOut: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signingOut: false,
  setSigningOut: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, loading, signingOut, setSigningOut }}>
      <Suspense fallback={null}>
        <PostHogProvider>
          {children}
          <CookieConsent />
        </PostHogProvider>
      </Suspense>
    </AuthContext.Provider>
  )
}
