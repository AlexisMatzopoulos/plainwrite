import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
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
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return {
        profile: null,
        userRole: 'USER',
        isLoggedIn: false,
        userEmail: null,
        userName: null,
        userImage: null,
      }
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    })

    if (!user || !user.profile) {
      return {
        profile: null,
        userRole: user?.role || 'USER',
        isLoggedIn: true,
        userEmail: session.user.email,
        userName: session.user.name || null,
        userImage: session.user.image || null,
      }
    }

    // Map Prisma profile to our Profile interface
    const profile: Profile = {
      id: user.profile.id,
      words_balance: user.profile.words_balance,
      extra_words_balance: user.profile.extra_words_balance,
      words_limit: user.profile.words_limit,
      words_per_request: user.profile.words_per_request,
      subscription_plan: user.profile.subscription_plan,
      subscription_status: user.profile.subscription_status,
      subscription_canceled: user.profile.subscription_canceled,
      subscription_paused: user.profile.subscription_paused,
      subscription_valid_until: user.profile.subscription_valid_until?.toISOString() || null,
      paystack_customer_code: user.profile.paystack_customer_code,
      paystack_subscription_code: user.profile.paystack_subscription_code,
      paystack_authorization_code: user.profile.paystack_authorization_code,
      paystack_plan_code: user.profile.paystack_plan_code,
      billing_period: user.profile.billing_period,
    }

    return {
      profile,
      userRole: user.role as UserRole,
      isLoggedIn: true,
      userEmail: session.user.email,
      userName: session.user.name || null,
      userImage: session.user.image || null,
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
