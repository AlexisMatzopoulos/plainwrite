import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-helpers'
import { prisma } from '@/lib/prisma'

/**
 * DEV ONLY: Reset subscription for testing purposes
 *
 * Usage:
 * POST /api/dev/reset-subscription
 *
 * Body (optional):
 * {
 *   "userId": "user_id_here",  // If not provided, uses current user
 *   "resetBalance": true        // Reset word balance to 500
 * }
 *
 * Or just call it to reset your own subscription:
 * fetch('/api/dev/reset-subscription', { method: 'POST' })
 */
export async function POST(request: NextRequest) {
  // ⚠️ SECURITY: Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    )
  }

  try {
    const { user: authUser, dbUser, error } = await getAuthenticatedUser()

    if (error || !authUser || !dbUser) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    // Parse request body (optional)
    let body: { userId?: string; resetBalance?: boolean } = {}
    try {
      body = await request.json()
    } catch {
      // No body provided, use defaults
    }

    const targetUserId = body.userId || dbUser.id
    const resetBalance = body.resetBalance !== false // Default to true

    // Find the profile
    const profile = await prisma.profile.findUnique({
      where: { user_id: targetUserId },
      include: { user: true }
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Reset subscription to free tier
    const updatedProfile = await prisma.profile.update({
      where: { user_id: targetUserId },
      data: {
        subscription_plan: null,
        subscription_status: null,
        subscription_canceled: false,
        subscription_paused: false,
        subscription_valid_until: null,
        paystack_customer_code: null,
        paystack_subscription_code: null,
        paystack_authorization_code: null,
        paystack_plan_code: null,
        billing_period: null,
        words_limit: 500,
        words_per_request: 500,
        ...(resetBalance && {
          words_balance: 500,
          extra_words_balance: 0,
        }),
      },
    })

    console.log(`✅ Reset subscription for user: ${profile.user.email}`)

    return NextResponse.json({
      success: true,
      message: `Subscription reset for ${profile.user.email}`,
      profile: {
        email: profile.user.email,
        subscription_plan: updatedProfile.subscription_plan,
        words_balance: updatedProfile.words_balance,
        words_limit: updatedProfile.words_limit,
      }
    })
  } catch (error) {
    console.error('Error resetting subscription:', error)
    return NextResponse.json(
      { error: 'Failed to reset subscription' },
      { status: 500 }
    )
  }
}

/**
 * DEV ONLY: Get all users with subscriptions (for testing)
 */
export async function GET(request: NextRequest) {
  // ⚠️ SECURITY: Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    )
  }

  try {
    const { user: authUser, dbUser, error } = await getAuthenticatedUser()

    if (error || !authUser || !dbUser) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const profiles = await prisma.profile.findMany({
      include: {
        user: {
          select: {
            email: true,
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    const userList = profiles.map(p => ({
      userId: p.user_id,
      email: p.user.email,
      subscription_plan: p.subscription_plan,
      subscription_status: p.subscription_status,
      words_balance: p.words_balance,
      words_limit: p.words_limit,
    }))

    return NextResponse.json({
      users: userList,
      count: userList.length
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
