# Lemon Squeezy Setup Guide for Natural Write

This guide walks you through setting up Lemon Squeezy for subscription payments and one-time word purchases.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Creating Products](#creating-products)
3. [Environment Variables](#environment-variables)
4. [Testing Webhooks](#testing-webhooks)
5. [Going Live](#going-live)

---

## 1. Initial Setup

### Store Configuration
1. Log in to your Lemon Squeezy dashboard at https://app.lemonsqueezy.com
2. Go to **Settings** → **Stores**
3. Configure your store details:
   - Store name: "Natural Write"
   - Store URL: https://naturalwrite.com
   - Currency: USD (or your preferred currency)
   - Email settings for customer receipts

### API Access
1. Go to **Settings** → **API**
2. Click **Create API Key**
3. Give it a name (e.g., "Natural Write Production")
4. Copy and save the API key securely (you'll need this for `.env`)

---

## 2. Creating Products

### A. Subscription Plans

Based on your pricing structure, create three subscription products:

#### **Basic Plan - $9.99/month**
1. Go to **Products** → **New Product**
2. Product details:
   - Name: "Basic Plan"
   - Description: "Perfect for occasional use"
   - Price: $9.99
   - Billing: Monthly (recurring)
3. Click **Create Product**
4. After creation, go to the **Variants** tab
5. Copy the **Variant ID** (format: `variant_xxxxx`)
6. Save this ID for your `.env` file as `LEMONSQUEEZY_BASIC_VARIANT_ID`

#### **Pro Plan - $19.99/month**
1. Create another product:
   - Name: "Pro Plan"
   - Description: "For regular users"
   - Price: $19.99
   - Billing: Monthly (recurring)
2. Copy the **Variant ID**
3. Save as `LEMONSQUEEZY_PRO_VARIANT_ID`

#### **Premium Plan - $39.99/month**
1. Create another product:
   - Name: "Premium Plan"
   - Description: "For power users"
   - Price: $39.99
   - Billing: Monthly (recurring)
2. Copy the **Variant ID**
3. Save as `LEMONSQUEEZY_PREMIUM_VARIANT_ID`

### B. One-Time Word Packages

Create products for word credits:

#### **Starter Pack - $4.99**
1. Go to **Products** → **New Product**
2. Product details:
   - Name: "5,000 Words"
   - Description: "One-time purchase of 5,000 words"
   - Price: $4.99
   - Billing: One-time
3. Copy the **Variant ID**
4. Save as `LEMONSQUEEZY_5K_WORDS_VARIANT_ID`

#### **Value Pack - $9.99**
- Name: "12,000 Words"
- Description: "One-time purchase of 12,000 words"
- Price: $9.99
- Billing: One-time
- Save Variant ID as `LEMONSQUEEZY_12K_WORDS_VARIANT_ID`

#### **Pro Pack - $19.99**
- Name: "25,000 Words"
- Description: "One-time purchase of 25,000 words"
- Price: $19.99
- Billing: One-time
- Save Variant ID as `LEMONSQUEEZY_25K_WORDS_VARIANT_ID`

#### **Power Pack - $39.99**
- Name: "60,000 Words"
- Description: "One-time purchase of 60,000 words"
- Price: $39.99
- Billing: One-time
- Save Variant ID as `LEMONSQUEEZY_60K_WORDS_VARIANT_ID`

#### **Ultimate Pack - $74.99**
- Name: "150,000 Words"
- Description: "One-time purchase of 150,000 words"
- Price: $74.99
- Billing: One-time
- Save Variant ID as `LEMONSQUEEZY_150K_WORDS_VARIANT_ID`

---

## 3. Environment Variables

Add the following to your `.env.local` file:

```bash
# Lemon Squeezy Configuration
LEMONSQUEEZY_API_KEY=your_api_key_here
LEMONSQUEEZY_STORE_ID=your_store_id_here
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret_here

# Subscription Variant IDs
LEMONSQUEEZY_BASIC_VARIANT_ID=variant_xxxxx
LEMONSQUEEZY_PRO_VARIANT_ID=variant_xxxxx
LEMONSQUEEZY_PREMIUM_VARIANT_ID=variant_xxxxx

# One-Time Purchase Variant IDs
LEMONSQUEEZY_5K_WORDS_VARIANT_ID=variant_xxxxx
LEMONSQUEEZY_12K_WORDS_VARIANT_ID=variant_xxxxx
LEMONSQUEEZY_25K_WORDS_VARIANT_ID=variant_xxxxx
LEMONSQUEEZY_60K_WORDS_VARIANT_ID=variant_xxxxx
LEMONSQUEEZY_150K_WORDS_VARIANT_ID=variant_xxxxx
```

### Finding Your Store ID
1. Go to **Settings** → **Stores**
2. Click on your store
3. The Store ID is in the URL: `https://app.lemonsqueezy.com/stores/{store_id}`

---

## 4. Setting Up Webhooks

Webhooks notify your app when payments occur, subscriptions renew, etc.

### Create Webhook Endpoint
1. In Lemon Squeezy dashboard, go to **Settings** → **Webhooks**
2. Click **Create Webhook**
3. Configure:
   - **URL**: `https://naturalwrite.com/api/webhooks/lemonsqueezy`
   - **Events to listen for**:
     - `order_created` - When a customer completes checkout
     - `subscription_created` - New subscription
     - `subscription_updated` - Subscription changes
     - `subscription_cancelled` - Subscription cancelled
     - `subscription_resumed` - Subscription resumed
     - `subscription_expired` - Subscription expired
     - `subscription_payment_success` - Successful renewal
     - `subscription_payment_failed` - Failed payment
4. Copy the **Signing Secret**
5. Add to `.env.local` as `LEMONSQUEEZY_WEBHOOK_SECRET`

### Testing Webhooks Locally
For local development, use a tool like ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js dev server
npm run dev

# In another terminal, create tunnel
ngrok http 3000

# Use the ngrok URL for webhook endpoint
# Example: https://abc123.ngrok.io/api/webhooks/lemonsqueezy
```

Update the webhook URL in Lemon Squeezy to your ngrok URL for testing.

---

## 5. Product Metadata (Optional but Recommended)

Add custom metadata to your products to make backend logic easier:

### For Subscriptions:
1. Edit each subscription product
2. Go to **Custom Data** section
3. Add fields:
   - `words_limit`: 50000 (for Basic), 150000 (for Pro), 500000 (for Premium)
   - `plan_type`: "basic", "pro", or "premium"

### For One-Time Purchases:
1. Edit each word package
2. Add custom data:
   - `words_amount`: 5000, 12000, 25000, etc.
   - `product_type`: "word_pack"

---

## 6. Integration Checklist

Before going live, verify:

- [ ] All product variants created
- [ ] All variant IDs added to `.env.local`
- [ ] API key configured
- [ ] Webhook endpoint created and verified
- [ ] Webhook secret added to environment variables
- [ ] Test purchases in **Test Mode** work correctly
- [ ] Webhook events are being received and processed
- [ ] Database updates correctly after purchases
- [ ] User word balance updates after purchase
- [ ] Subscription status syncs correctly

---

## 7. Going Live

### Switch to Live Mode
1. In Lemon Squeezy, toggle from **Test Mode** to **Live Mode**
2. Create new products in Live Mode (test products don't transfer)
3. Generate a new **Live API Key**
4. Create new **Live Webhook**
5. Update `.env.local` (or better, `.env.production`) with live credentials
6. Test with a real small purchase ($4.99 word pack)

### Security Notes
- Never commit `.env.local` or `.env.production` to git
- Use environment variables in your hosting platform (Vercel, etc.)
- Verify webhook signatures in your webhook handler
- Keep API keys secure and rotate them periodically

---

## 8. Testing Your Integration

### Test Checkout Flow
1. Visit your pricing page
2. Click a plan/package
3. Complete checkout with test card: `4242 4242 4242 4242`
4. Verify:
   - Webhook received
   - Database updated
   - User's word balance increased
   - Email confirmation sent

### Test Subscription Management
1. Subscribe to a plan
2. Visit `/manage-subscription` or `/profile`
3. Test cancellation
4. Test plan upgrades/downgrades
5. Verify webhook events fire correctly

---

## Helpful Resources

- [Lemon Squeezy API Documentation](https://docs.lemonsqueezy.com/api)
- [Lemon Squeezy Webhooks Guide](https://docs.lemonsqueezy.com/guides/developer-guide/webhooks)
- [Lemon Squeezy SDK](https://github.com/lmsqueezy/lemonsqueezy.js)

---

## Troubleshooting

### Webhooks Not Firing
- Check webhook URL is publicly accessible
- Verify webhook secret matches environment variable
- Check webhook logs in Lemon Squeezy dashboard

### Payments Not Updating Database
- Check webhook handler logs
- Verify variant IDs match in code and Lemon Squeezy
- Check database connection in webhook handler

### Test Mode Issues
- Make sure you're using test API key for test mode
- Test products and live products are separate
- Use test card numbers provided by Lemon Squeezy

---

## Need Help?

- Lemon Squeezy Support: https://lemonsqueezy.com/help
- Natural Write Issues: Check your application logs and database entries
