import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Profile {
  id: string
  createdAt: string
  words_balance: number
  extra_words_balance: number
  words_limit: number
  words_per_request: number
  subscription_plan: string | null
  subscription_status: string | null
  userStyle: string | null
  subscription_canceled: boolean
  subscription_paused: boolean
  subscription_valid_until: string | null
  paystack_customer_code: string | null
  paystack_subscription_code: string | null
  paystack_authorization_code: string | null
  paystack_plan_code: string | null
  billing_period: string | null
}

export type UserRole = 'USER' | 'ADMIN' | 'TESTER'

interface ProfileState {
  profile: Profile | null
  userRole: UserRole
  isLoading: boolean
  error: string | null

  // Actions
  fetchProfile: () => Promise<void>
  updateBalance: (wordsUsed: number) => void
  refetchProfile: () => Promise<void>
  setProfile: (profile: Profile | null) => void
  setUserRole: (role: UserRole) => void
  reset: () => void
}

const initialState = {
  profile: null,
  userRole: 'USER' as UserRole,
  isLoading: false,
  error: null,
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchProfile: async () => {
        // Don't fetch if already loading
        if (get().isLoading) return

        set({ isLoading: true, error: null })

        try {
          const response = await fetch('/api/profile')
          const data = await response.json()

          if (response.ok) {
            set({
              profile: data.profile,
              userRole: data.role || 'USER',
              isLoading: false,
              error: null
            })
          } else {
            set({
              error: data.error || 'Failed to fetch profile',
              isLoading: false
            })
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch profile',
            isLoading: false
          })
        }
      },

      updateBalance: (wordsUsed: number) => {
        const { profile } = get()
        if (!profile) return

        // Calculate new balance by deducting words
        let newWordsBalance = profile.words_balance
        let newExtraWordsBalance = profile.extra_words_balance
        let remainingWords = wordsUsed

        // Deduct from main balance first
        if (profile.words_balance >= remainingWords) {
          newWordsBalance = profile.words_balance - remainingWords
        } else {
          // Deduct what we can from main balance, then from extra
          const fromMainBalance = profile.words_balance
          remainingWords -= fromMainBalance
          newWordsBalance = 0
          newExtraWordsBalance = profile.extra_words_balance - remainingWords
        }

        // Update the profile with new balances
        set({
          profile: {
            ...profile,
            words_balance: newWordsBalance,
            extra_words_balance: newExtraWordsBalance,
          }
        })
      },

      refetchProfile: async () => {
        // Force a fresh fetch
        await get().fetchProfile()
      },

      setProfile: (profile: Profile | null) => {
        set({ profile })
      },

      setUserRole: (role: UserRole) => {
        set({ userRole: role })
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'profile-storage', // localStorage key
      partialize: (state) => ({
        profile: state.profile,
        userRole: state.userRole,
      }), // Only persist profile and userRole, not loading/error states
    }
  )
)
