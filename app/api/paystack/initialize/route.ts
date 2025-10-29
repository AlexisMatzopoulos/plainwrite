import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-helpers'
import { PAYSTACK_CONFIG, getPlanConfig, type PlanTier, type BillingPeriod } from '@/lib/paystack-config'

export async function POST(req: NextRequest) {
  try {
    const { user: authUser, dbUser, error } = await getAuthenticatedUser()

    if (error || !authUser || !dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { planTier, billingPeriod, callbackUrl } = body as {
      planTier: PlanTier
      billingPeriod: BillingPeriod
      callbackUrl?: string
    }

    if (!planTier || !billingPeriod) {
      return NextResponse.json(
        { error: 'Plan tier and billing period are required' },
        { status: 400 }
      )
    }

    const plan = getPlanConfig(planTier, billingPeriod)

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Initialize transaction with Paystack
    const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authUser.email,
        amount: plan.amount * 100, // Paystack expects amount in kobo (smallest currency unit)
        plan: plan.code,
        callback_url: callbackUrl || `${process.env.NEXTAUTH_URL}/subscribe/callback`,
        metadata: {
          user_email: authUser.email,
          plan_tier: planTier,
          billing_period: billingPeriod,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error('Paystack initialization error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to initialize payment' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    })
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
