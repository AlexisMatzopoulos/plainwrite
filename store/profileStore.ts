import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Profile {
  id?: string
  words_balance: number
  extra_words_balance: number
  words_limit: number
  words_per_request?: number
  subscription_plan?: string | null
  subscription_status?: string | null
  subscription_canceled?: boolean
  subscription_paused?: boolean
  subscription_valid_until?: string | null
  paystack_customer_code?: string | null
  paystack_subscription_code?: string | null
  paystack_authorization_code?: string | null
  paystack_plan_code?: string | null
  billing_period?: string | null
}

export type UserRole = 'USER' | 'ADMIN' | 'TESTER'

interface ProfileStore {
  profile: Profile | null
  userRole: UserRole
  isInitialized: boolean

  // Actions
  setProfile: (profile: Profile | null) => void
  setUserRole: (role: UserRole) => void
  updateBalance: (wordsUsed: number) => void
  refreshProfile: () => Promise<void>
  initialize: (profile: Profile | null, role: UserRole) => void
  reset: () => void
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,
      userRole: 'USER',
      isInitialized: false,

  setProfile: (profile) => set({ profile }),

  setUserRole: (role) => set({ userRole: role }),

  updateBalance: (wordsUsed) => {
    const { profile } = get()
    if (!profile) return

    // Optimistic update: deduct words from balance
    const newProfile = { ...profile }

    // First use extra_words_balance, then words_balance
    if (newProfile.extra_words_balance >= wordsUsed) {
      newProfile.extra_words_balance -= wordsUsed
    } else {
      const remaining = wordsUsed - newProfile.extra_words_balance
      newProfile.extra_words_balance = 0
      newProfile.words_balance = Math.max(0, newProfile.words_balance - remaining)
    }

    set({ profile: newProfile })
  },

  refreshProfile: async () => {
    try {
      const response = await fetch('/api/profile')
      const data = await response.json()

      if (response.ok && data.profile) {
        set({
          profile: data.profile,
          userRole: data.role || 'USER',
          isInitialized: true
        })
      }
    } catch (error) {
      console.error('Error refreshing profile:', error)
    }
  },

  initialize: (profile, role) => {
    set({
      profile,
      userRole: role,
      isInitialized: true
    })
  },

  reset: () => {
    set({
      profile: null,
      userRole: 'USER',
      isInitialized: false
    })
  },
    }),
    {
      name: 'profile-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist the data we need, not internal state flags initially
      partialize: (state) => ({
        profile: state.profile,
        userRole: state.userRole,
        // Don't persist isInitialized - let it be false on reload so we refetch
      }),
    }
  )
)
