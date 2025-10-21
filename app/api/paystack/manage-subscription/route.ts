import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PAYSTACK_CONFIG } from '@/lib/paystack-config'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile with subscription code
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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
