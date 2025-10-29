import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-helpers'
import { PAYSTACK_CONFIG } from '@/lib/paystack-config'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { user: authUser, dbUser, error } = await getAuthenticatedUser()

    if (error || !authUser || !dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    // Generate management link
    const response = await fetch(
      `${PAYSTACK_CONFIG.baseUrl}/subscription/${subscriptionCode}/manage/link`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error('Paystack manage subscription error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to generate management link' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      link: data.data.link,
    })
  } catch (error) {
    console.error('Error generating subscription management link:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
