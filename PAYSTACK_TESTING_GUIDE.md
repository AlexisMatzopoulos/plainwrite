# Paystack Subscription Integration - Testing Guide

## 🚀 Pre-Testing Setup

### Step 1: Run Database Migration
```bash
npx prisma migrate dev --name add_paystack_fields
npx prisma generate
```

### Step 2: Verify Environment Variables
Make sure `.env` has:
```
PAYSTACK_TEST_SECRET_KEY="sk_test_bb7fcfacf37ca1491d24604adb822013cf973369"
PAYSTACK_TEST_PUBLIC_KEY="pk_test_593e3d0ab8ee1226160226674619cef36131c501"
DATABASE_URL="your_database_url"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3: Start Development Server
```bash
npm run dev
```

---

## 🧪 Testing Checklist

### Test 1: Subscription Purchase Flow

#### 1.1 Monthly Subscription
1. Go to `http://localhost:3000/preise`
2. Make sure you're logged in (sign in with Google if not)
3. Toggle to "Monatlich" billing
4. Click "Abonnieren" on the **Pro** plan (€19.99/month)
5. You'll be redirected to Paystack checkout

**Paystack Test Card:**
```
Card Number: 4084 0840 8408 4081
CVV: 408
Expiry: Any future date
PIN: 0000
OTP: 123456
```

6. Complete the payment
7. You should be redirected back to `/subscribe/callback`
8. Verify:
   - ✅ Success message shows
   - ✅ Plan name is displayed correctly
   - ✅ You're redirected back to the page you were on before

#### 1.2 Yearly Subscription
Repeat steps above but:
- Toggle to "Jährlich" billing
- Test with **Ultra** plan (€19.99/month billed yearly)

---

### Test 2: Profile Updates After Subscription

1. Go to `/profile`
2. Verify:
   - ✅ Subscription card shows correct plan (Pro or Ultra)
   - ✅ Status badge shows "Aktiv" (green)
   - ✅ Billing period shows correctly (Monatlich or Jährlich)
   - ✅ Word balance updated to plan limit (15,000 for Pro, 30,000 for Ultra)
   - ✅ Words limit updated correctly

---

### Test 3: Header Subscription Badge

1. After subscribing, check the header
2. Verify:
   - ✅ Desktop: Badge shows plan name (PRO or ULTRA) next to balance
   - ✅ Tablet: Badge shows plan name
   - ✅ Mobile: Badge shows abbreviated name (PRO/ULT)
   - ✅ Badge is theme-colored

---

### Test 4: Email Notifications (Console Logs)

Since emails are currently logged to console, check terminal:

#### After successful subscription:
```
📧 Sending subscription confirmation email:
{
  to: 'your@email.com',
  subject: 'Willkommen bei EchtSchreib Pro!',
  template: 'subscription-confirmation',
  data: { ... }
}
```

#### After payment failure (webhook simulation - see below):
```
📧 Sending payment failed email:
{
  to: 'your@email.com',
  subject: 'Zahlungsproblem mit Ihrem EchtSchreib-Abonnement',
  template: 'payment-failed'
}
```

---

### Test 5: Update Payment Method

1. Go to `/profile`
2. Click "Zahlungsmethode aktualisieren"
3. Verify:
   - ✅ Redirected to Paystack management page
   - ✅ Can see subscription details
   - ✅ Can add new card

---

### Test 6: Cancel Subscription

1. Go to `/profile`
2. Click "Abonnement kündigen"
3. Confirm in modal
4. Verify:
   - ✅ Success message: "Ihr Abonnement wird am Ende des Abrechnungszeitraums beendet"
   - ✅ Page reloads
   - ✅ Status changes to "Läuft aus" (yellow badge)

---

## 🔗 Webhook Testing

### Setup Paystack Webhook

1. **Option A: Use ngrok (for local testing)**
   ```bash
   ngrok http 3000
   ```
   - Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
   - Go to Paystack Dashboard → Settings → Webhooks
   - Add webhook URL: `https://abc123.ngrok.io/api/paystack/webhook`

2. **Option B: Deploy to Vercel first**
   - Deploy your app
   - Use: `https://yourdomain.vercel.app/api/paystack/webhook`

### Test Webhook Events

#### Test Invoice Payment Failed
1. In Paystack Dashboard, go to your test subscription
2. Trigger a payment failure (or wait for monthly renewal and use invalid card)
3. Check:
   - ✅ Profile status changes to "Zahlungsproblem" (red)
   - ✅ Warning appears on profile page
   - ✅ "Zahlungsmethode aktualisieren" button highlighted
   - ✅ Email log in console

#### Test Subscription Renewal (charge.success)
1. Wait for monthly renewal OR manually trigger in Paystack
2. Check:
   - ✅ Word balance reset to plan limit
   - ✅ Status remains "active"
   - ✅ Webhook logged in console

---

## 💳 Test Cards

### Successful Payment
```
4084 0840 8408 4081 - Success
CVV: 408
PIN: 0000
OTP: 123456
```

### Failed Payment (Insufficient Funds)
```
5060 6666 6666 6666 4
CVV: 123
Expiry: Any future date
```

### Test Different Scenarios
1. **Card with PIN**: Use 5060 6666 6666 6666 4 (requires PIN: 0000)
2. **Card with OTP**: Use 408408... (requires OTP: 123456)
3. **International Card**: Use 4111 1111 1111 1111

Full list: https://paystack.com/docs/payments/test-payments

---

## 📋 Expected Database Changes

After successful subscription, check database:

```sql
SELECT
  subscription_plan,
  subscription_status,
  words_limit,
  words_balance,
  billing_period,
  paystack_subscription_code,
  paystack_plan_code
FROM "Profile"
WHERE user_id = 'your_user_id';
```

Expected values:
- `subscription_plan`: 'pro' or 'ultra'
- `subscription_status`: 'active'
- `words_limit`: 15000 (Pro) or 30000 (Ultra)
- `words_balance`: Same as words_limit
- `billing_period`: 'month' or 'year'
- `paystack_subscription_code`: 'SUB_xxxxxxxxxx'
- `paystack_plan_code`: 'PLN_xxxxxxxxxx'

---

## 🐛 Troubleshooting

### Issue: "Failed to initialize payment"
**Solution**: Check that PAYSTACK_TEST_SECRET_KEY is set correctly in `.env`

### Issue: Webhook not receiving events
**Solution**:
1. Make sure ngrok is running
2. Check webhook URL in Paystack dashboard
3. Verify signature validation in webhook handler

### Issue: Subscription not showing in profile
**Solution**:
1. Check browser console for errors
2. Verify transaction was successful in Paystack dashboard
3. Check database to see if profile was updated
4. Look at server logs for verification errors

### Issue: Email notifications not appearing
**Solution**: Currently emails only log to console. To enable real emails:
1. Integrate with Resend, SendGrid, or another service
2. Update `/lib/email.ts` with actual email sending logic
3. Add API keys to `.env`

---

## ✅ Complete Test Sequence

1. **Database Migration** ✓
2. **Environment Setup** ✓
3. **Purchase Monthly Subscription** ✓
4. **Verify Profile Update** ✓
5. **Check Header Badge** ✓
6. **Update Payment Method** ✓
7. **Test Using Service** (process some words) ✓
8. **Cancel Subscription** ✓
9. **Verify Cancellation** ✓
10. **Purchase Yearly Subscription** ✓
11. **Setup Webhook** ✓
12. **Test Payment Failure Webhook** ✓

---

## 📞 Support

If you encounter issues:
1. Check server console logs
2. Check browser console
3. Verify Paystack dashboard for transaction status
4. Check database for profile updates

---

## 🚢 Production Deployment

Before going live:

1. **Switch to Live Keys**
   ```env
   PAYSTACK_SECRET_KEY="sk_live_..."
   PAYSTACK_PUBLIC_KEY="pk_live_..."
   ```

2. **Update Webhook URL** in Paystack Dashboard to production URL

3. **Enable Real Emails** in `/lib/email.ts`

4. **Test thoroughly** with real cards in small amounts

5. **Monitor** webhooks and transactions closely for first week

---

Good luck with testing! 🎉
