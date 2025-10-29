import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-helpers'
import { PAYSTACK_CONFIG, getPlanByCode } from '@/lib/paystack-config'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { user: authUser, dbUser, error } = await getAuthenticatedUser()

    if (error || !authUser || !dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const reference = req.nextUrl.searchParams.get('reference')

    if (!reference) {
      return NextResponse.json(
        { error: 'Transaction reference is required' },
        { status: 400 }
      )
    }

    // Verify transaction with Paystack
    const response = await fetch(
      `${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error('Paystack verification error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to verify payment' },
        { status: response.status }
      )
    }

    const transaction = data.data

    // Check if transaction was successful
    if (transaction.status !== 'success') {
      return NextResponse.json(
        { error: 'Transaction was not successful', status: transaction.status },
        { status: 400 }
      )
    }

    // Get plan details
    const planCode = transaction.plan
    const planConfig = getPlanByCode(planCode)

    if (!planConfig) {
      console.error('Unknown plan code:', planCode)
      return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })
    }

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get current word balance before updating
    const currentBalance = user.profile?.words_balance || 0

    // Update or create profile with subscription details
    const profile = await prisma.profile.upsert({
      where: { user_id: user.id },
      update: {
        subscription_plan: planConfig.tier,
        subscription_status: 'active',
        words_limit: planConfig.wordsLimit,
        words_per_request: planConfig.wordsPerRequest,
        words_balance: currentBalance + planConfig.wordsLimit, // Add plan limit to existing balance
        paystack_customer_code: transaction.customer.customer_code,
        paystack_subscription_code: transaction.subscription?.subscription_code || null,
        paystack_authorization_code: transaction.authorization?.authorization_code || null,
        paystack_plan_code: planCode,
        billing_period: planConfig.period,
        subscription_canceled: false,
        subscription_paused: false,
      },
      create: {
        user_id: user.id,
        subscription_plan: planConfig.tier,
        subscription_status: 'active',
        words_limit: planConfig.wordsLimit,
        words_per_request: planConfig.wordsPerRequest,
        words_balance: planConfig.wordsLimit, // For new users, just use plan limit
        paystack_customer_code: transaction.customer.customer_code,
        paystack_subscription_code: transaction.subscription?.subscription_code || null,
        paystack_authorization_code: transaction.authorization?.authorization_code || null,
        paystack_plan_code: planCode,
        billing_period: planConfig.period,
      },
    })

    // TODO: Re-implement subscription confirmation email
    // await sendSubscriptionConfirmationEmail({
    //   email: user.email!,
    //   name: user.name || 'Kunde',
    //   planName: planConfig.name,
    //   planTier: planConfig.tier,
    //   billingPeriod: planConfig.period,
    //   wordsLimit: planConfig.wordsLimit,
    //   amount: transaction.amount,
    // })

    return NextResponse.json({
      success: true,
      transaction: {
        reference: transaction.reference,
        amount: transaction.amount / 100, // Convert from kobo to main currency
        status: transaction.status,
      },
      subscription: {
        plan: planConfig.name,
        tier: planConfig.tier,
        period: planConfig.period,
        wordsLimit: planConfig.wordsLimit,
      },
    })
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
