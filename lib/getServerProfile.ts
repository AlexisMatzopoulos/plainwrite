import { createClient } from './supabase/server'
import { prisma } from './prisma'
import type { Profile, UserRole } from '@/store/profileStore'

export interface ServerProfileData {
  profile: Profile | null
  userRole: UserRole
  isLoggedIn: boolean
  userEmail: string | null
  userName: string | null
  userImage: string | null
}

export async function getServerProfile(): Promise<ServerProfileData> {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        profile: null,
        userRole: 'USER',
        isLoggedIn: false,
        userEmail: null,
        userName: null,
        userImage: null,
      }
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    })

    // Get user metadata from Supabase
    const userName = user.user_metadata?.name || user.user_metadata?.full_name || null
    const userImage = user.user_metadata?.avatar_url || user.user_metadata?.picture || null

    if (!dbUser || !dbUser.profile) {
      return {
        profile: null,
        userRole: dbUser?.role || 'USER',
        isLoggedIn: true,
        userEmail: user.email || null,
        userName,
        userImage,
      }
    }

    // Map Prisma profile to our Profile interface
    const profile: Profile = {
      id: dbUser.profile.id,
      words_balance: dbUser.profile.words_balance,
      extra_words_balance: dbUser.profile.extra_words_balance,
      words_limit: dbUser.profile.words_limit,
      words_per_request: dbUser.profile.words_per_request,
      subscription_plan: dbUser.profile.subscription_plan,
      subscription_status: dbUser.profile.subscription_status,
      subscription_canceled: dbUser.profile.subscription_canceled,
      subscription_paused: dbUser.profile.subscription_paused,
      subscription_valid_until: dbUser.profile.subscription_valid_until?.toISOString() || null,
      paystack_customer_code: dbUser.profile.paystack_customer_code,
      paystack_subscription_code: dbUser.profile.paystack_subscription_code,
      paystack_authorization_code: dbUser.profile.paystack_authorization_code,
      paystack_plan_code: dbUser.profile.paystack_plan_code,
      billing_period: dbUser.profile.billing_period,
    }

    return {
      profile,
      userRole: dbUser.role as UserRole,
      isLoggedIn: true,
      userEmail: user.email || null,
      userName,
      userImage,
    }
  } catch (error) {
    console.error('Error fetching server profile:', error)

    return {
      profile: null,
      userRole: 'USER',
      isLoggedIn: false,
      userEmail: null,
      userName: null,
      userImage: null,
    }
  }
}
