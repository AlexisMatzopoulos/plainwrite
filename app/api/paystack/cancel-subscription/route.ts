import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-helpers'
import { PAYSTACK_CONFIG } from '@/lib/paystack-config'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { user: authUser, dbUser, error } = await getAuthenticatedUser()

    if (error || !authUser || !dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { token } = await req.json()

    // Get user profile with subscription code
    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
      include: { profile: true },
    })

    if (!user || !user.profile?.paystack_subscription_code) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      )
    }

    const subscriptionCode = user.profile.paystack_subscription_code

    // Disable subscription on Paystack
    const response = await fetch(
      `${PAYSTACK_CONFIG.baseUrl}/subscription/disable`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: subscriptionCode,
          token, // Email token for confirmation
        }),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error('Paystack cancel subscription error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to cancel subscription' },
        { status: response.status }
      )
    }

    // Update local database
    await prisma.profile.update({
      where: { user_id: user.id },
      data: {
        subscription_status: 'non-renewing',
        subscription_canceled: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription will not renew on next payment date',
    })
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
