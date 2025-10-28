'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useProfileStore } from '@/store/profileStore'

/**
 * ProfileInitializer - Client Component that initializes Zustand store
 *
 * This component:
 * - Runs on the client side
 * - Fetches profile data once when user logs in
 * - Populates Zustand store for use across the app
 * - Avoids blocking server-side rendering
 */
export function ProfileInitializer() {
  const { data: session, status } = useSession()
  const { profile, isInitialized, initialize, reset } = useProfileStore()

  useEffect(() => {
    // Reset store when user logs out
    if (status === 'unauthenticated') {
      reset()
      return
    }

    // Only fetch if user is authenticated and store isn't initialized
    if (status === 'authenticated' && !isInitialized) {
      fetchProfile()
    }
  }, [status, isInitialized])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      const data = await response.json()

      if (response.ok && data.profile) {
        initialize(data.profile, data.role || 'USER')
      } else {
        // Profile creation failed - initialize with null
        initialize(null, 'USER')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      // Initialize with null profile if fetch fails
      initialize(null, 'USER')
    }
  }

  // This component doesn't render anything
  return null
}
