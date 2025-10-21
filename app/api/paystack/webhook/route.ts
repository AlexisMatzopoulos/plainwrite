import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPlanByCode } from '@/lib/paystack-config'
import { sendPaymentFailedEmail, sendSubscriptionCancelledEmail } from '@/lib/email'
import crypto from 'crypto'

// Verify Paystack webhook signature
function verifySignature(payload: string, signature: string): boolean {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_TEST_SECRET_KEY!)
    .update(payload)
    .digest('hex')
  return hash === signature
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-paystack-signature')
    const body = await req.text()

    // Verify webhook signature
    if (!signature || !verifySignature(body, signature)) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    console.log('Paystack webhook event:', event.event)

    switch (event.event) {
      case 'subscription.create':
        await handleSubscriptionCreate(event.data)
        break

      case 'charge.success':
        await handleChargeSuccess(event.data)
        break

      case 'invoice.create':
        console.log('Invoice created for subscription:', event.data.subscription?.subscription_code)
        // You can send email notification to customer here
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data)
        break

      case 'invoice.update':
        await handleInvoiceUpdate(event.data)
        break

      case 'subscription.disable':
        await handleSubscriptionDisable(event.data)
        break

      case 'subscription.not_renew':
        await handleSubscriptionNotRenew(event.data)
        break

      default:
        console.log('Unhandled webhook event:', event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionCreate(data: any) {
  try {
    const { subscription_code, customer, plan_code, status } = data

    const planConfig = getPlanByCode(plan_code)
    if (!planConfig) {
      console.error('Unknown plan code in subscription.create:', plan_code)
      return
    }

    // Find user by customer email
    const user = await prisma.user.findUnique({
      where: { email: customer.email },
      include: { profile: true },
    })

    if (!user) {
      console.error('User not found for subscription.create:', customer.email)
      return
    }

    // Update profile with subscription details
    await prisma.profile.upsert({
      where: { user_id: user.id },
      update: {
        paystack_subscription_code: subscription_code,
        paystack_customer_code: customer.customer_code,
        subscription_status: status,
        subscription_plan: planConfig.tier,
        paystack_plan_code: plan_code,
        billing_period: planConfig.period,
      },
      create: {
        user_id: user.id,
        paystack_subscription_code: subscription_code,
        paystack_customer_code: customer.customer_code,
        subscription_status: status,
        subscription_plan: planConfig.tier,
        paystack_plan_code: plan_code,
        billing_period: planConfig.period,
        words_limit: planConfig.wordsLimit,
        words_per_request: planConfig.wordsPerRequest,
      },
    })

    console.log('Subscription created for user:', customer.email)
  } catch (error) {
    console.error('Error handling subscription.create:', error)
  }
}

async function handleChargeSuccess(data: any) {
  try {
    const { customer, plan } = data

    if (!plan) {
      // Not a subscription charge, ignore
      return
    }

    const planConfig = getPlanByCode(plan)
    if (!planConfig) {
      console.error('Unknown plan code in charge.success:', plan)
      return
    }

    // Find user and reset their word balance
    const user = await prisma.user.findUnique({
      where: { email: customer.email },
      include: { profile: true },
    })

    if (!user) {
      console.error('User not found for charge.success:', customer.email)
      return
    }

    // Reset words balance to plan limit on successful charge
    await prisma.profile.update({
      where: { user_id: user.id },
      data: {
        words_balance: planConfig.wordsLimit,
        subscription_status: 'active',
      },
    })

    console.log('Words balance reset for user:', customer.email)
  } catch (error) {
    console.error('Error handling charge.success:', error)
  }
}

async function handleInvoicePaymentFailed(data: any) {
  try {
    const { customer, subscription } = data

    if (!subscription) {
      return
    }

    // Find user and update subscription status
    const user = await prisma.user.findUnique({
      where: { email: customer.email },
      include: { profile: true },
    })

    if (!user || !user.profile) {
      return
    }

    await prisma.profile.update({
      where: { user_id: user.id },
      data: {
        subscription_status: 'attention',
      },
    })

    console.log('Subscription marked as attention for user:', customer.email)

    // Send payment failed email notification
    const planName = user.profile?.subscription_plan || 'Unknown'
    await sendPaymentFailedEmail(customer.email, planName)
  } catch (error) {
    console.error('Error handling invoice.payment_failed:', error)
  }
}

async function handleInvoiceUpdate(data: any) {
  try {
    const { customer, subscription, status, paid } = data

    if (!subscription) {
      return
    }

    const user = await prisma.user.findUnique({
      where: { email: customer.email },
      include: { profile: true },
    })

    if (!user || !user.profile) {
      return
    }

    // Update subscription status based on invoice status
    if (paid && status === 'success') {
      await prisma.profile.update({
        where: { user_id: user.id },
        data: {
          subscription_status: 'active',
        },
      })
    }
  } catch (error) {
    console.error('Error handling invoice.update:', error)
  }
}

async function handleSubscriptionDisable(data: any) {
  try {
    const { subscription_code, status, customer } = data

    // Find profile by subscription code
    const profile = await prisma.profile.findFirst({
      where: { paystack_subscription_code: subscription_code },
      include: { user: true },
    })

    if (!profile) {
      console.error('Profile not found for subscription.disable:', subscription_code)
      return
    }

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        subscription_status: status, // 'complete' or 'cancelled'
        subscription_canceled: true,
      },
    })

    console.log('Subscription disabled for user:', profile.user.email)

    // Send cancellation confirmation email
    const planName = profile.subscription_plan || 'Unknown'
    await sendSubscriptionCancelledEmail(profile.user.email!, planName)
  } catch (error) {
    console.error('Error handling subscription.disable:', error)
  }
}

async function handleSubscriptionNotRenew(data: any) {
  try {
    const { subscription_code } = data

    // Find profile by subscription code
    const profile = await prisma.profile.findFirst({
      where: { paystack_subscription_code: subscription_code },
    })

    if (!profile) {
      return
    }

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        subscription_status: 'non-renewing',
      },
    })

    console.log('Subscription set to non-renewing:', subscription_code)
  } catch (error) {
    console.error('Error handling subscription.not_renew:', error)
  }
}
