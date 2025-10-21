// Paystack configuration and plan mappings

export const PAYSTACK_PLANS = {
  month: {
    basis: {
      code: 'PLN_0zr6fzmmg0mtah1',
      name: 'Basis',
      amount: 599, // in cents (€5.99)
      wordsLimit: 5000,
      wordsPerRequest: 500,
    },
    pro: {
      code: 'PLN_76oyah2ua3rnjm4',
      name: 'Pro',
      amount: 1999, // in cents (€19.99)
      wordsLimit: 15000,
      wordsPerRequest: 1500,
    },
    ultra: {
      code: 'PLN_efls1vvauzavmmv',
      name: 'Ultra',
      amount: 3999, // in cents (€39.99)
      wordsLimit: 30000,
      wordsPerRequest: 3000,
    },
  },
  year: {
    basis: {
      code: 'PLN_oif6pyjwwry3xh6',
      name: 'Basis',
      amount: 299, // in cents (€2.99/month when billed yearly)
      wordsLimit: 5000,
      wordsPerRequest: 500,
    },
    pro: {
      code: 'PLN_7gbys6bj93c3qu9',
      name: 'Pro',
      amount: 999, // in cents (€9.99/month when billed yearly)
      wordsLimit: 15000,
      wordsPerRequest: 1500,
    },
    ultra: {
      code: 'PLN_9zq226e5s9efxu5',
      name: 'Ultra',
      amount: 1999, // in cents (€19.99/month when billed yearly)
      wordsLimit: 30000,
      wordsPerRequest: 3000,
    },
  },
} as const

export type PlanTier = 'basis' | 'pro' | 'ultra'
export type BillingPeriod = 'month' | 'year'

export function getPlanConfig(tier: PlanTier, period: BillingPeriod) {
  return PAYSTACK_PLANS[period][tier]
}

export function getPlanByCode(planCode: string) {
  for (const period of ['month', 'year'] as const) {
    for (const tier of ['basis', 'pro', 'ultra'] as const) {
      const plan = PAYSTACK_PLANS[period][tier]
      if (plan.code === planCode) {
        return { ...plan, tier, period }
      }
    }
  }
  return null
}

// Subscription status mapping
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  NON_RENEWING: 'non-renewing',
  ATTENTION: 'attention',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const PAYSTACK_CONFIG = {
  secretKey: process.env.PAYSTACK_TEST_SECRET_KEY!,
  publicKey: process.env.PAYSTACK_TEST_PUBLIC_KEY!,
  baseUrl: 'https://api.paystack.co',
}
