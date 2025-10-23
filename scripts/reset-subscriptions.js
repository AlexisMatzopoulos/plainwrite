const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Resetting all subscriptions...')

  const result = await prisma.profile.updateMany({
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
      words_balance: 500,
      extra_words_balance: 0,
    },
  })

  console.log(`✅ Reset ${result.count} subscription(s) to free tier`)
  console.log('📝 All users now have:')
  console.log('   - No active subscription')
  console.log('   - 500 words balance')
  console.log('   - 500 words limit')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
