# PostHog Analytics Setup Guide

PostHog has been **fully integrated** into your PlainWrite application following the official Next.js setup. The integration is **ready to use** with your PostHog project!

## ✅ What's Already Set Up

### Analytics Tracking
- **Text conversions** - Track when users convert text and which styles they use
- **Payment flows** - Monitor subscription attempts, successes, and failures
- **User behavior** - Style selections, copy actions, and more
- **Page views** - Automatic tracking of all page navigation
- **User identification** - Automatically identifies users when they sign in

### GDPR Compliance
- **Cookie consent banner** - Required opt-in before tracking starts (opt-out by default)
- **EU data hosting** - Configured to use PostHog's EU servers (`https://eu.i.posthog.com`)
- **Privacy controls** - Users can accept or reject tracking
- **Session recording disabled** - Privacy-first configuration

### Implementation Details
- ✅ PostHog SDK installed (`posthog-js`)
- ✅ Provider configured with official Next.js pattern
- ✅ Environment variables set in `.env.local` and `.env`
- ✅ User identification on sign-in
- ✅ Event tracking in key components
- ✅ Build verified successfully

## 🚀 Your PostHog is Ready!

Your PostHog project key is already configured:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_ej3gMz7UqTxAXOIItIKMDAhqTPWM1M5GZe9fPoxpzAl
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

**Just start the app and events will flow to your PostHog dashboard!**

```bash
npm run dev
```

## 📊 Testing Your Setup

1. Start your development server
2. Open the app in your browser
3. **Accept the cookie consent banner** (important!)
4. Perform some actions:
   - Convert text with different styles
   - Copy the result
   - Visit pricing page
   - Navigate between pages
5. Check your PostHog dashboard at [https://eu.i.posthog.com](https://eu.i.posthog.com)
6. Events should appear within a few seconds!

## 📊 Events Being Tracked

### Authentication Events
- `user_signup` - When a user creates an account
- `user_signin` - When a user signs in
- `user_signout` - When a user signs out

### Text Conversion Events
- `text_conversion_started` - When conversion begins
  - Properties: `style`, `word_count`
- `text_conversion_completed` - When conversion succeeds
  - Properties: `style`, `word_count`
- `text_conversion_failed` - When conversion fails
  - Properties: `style`, `word_count`, `error`
- `style_selected` - When user selects a writing style
  - Properties: `style`
- `copy_result` - When user copies the result
  - Properties: `style`, `word_count`

### Payment Events
- `payment_initiated` - When user clicks subscribe
  - Properties: `plan`, `billing_period`
- `payment_completed` - When payment succeeds
  - Properties: `plan`, `words_limit`, `billing_period`
- `payment_failed` - When payment fails
  - Properties: `plan`, `billing_period`, `error`
- `subscription_started` - When subscription is activated
  - Properties: `plan`, `words_limit`, `billing_period`

### Page Views
- `$pageview` - Automatically tracked on every page change
  - Properties: `$current_url`

## 🔧 How to Add More Events

To track additional events in your components:

```typescript
import { analytics } from '@/lib/analytics'

// Track a custom event
analytics.track('event_name', {
  property1: 'value1',
  property2: 123,
})

// Update user properties
analytics.setUserProperties({
  subscription_tier: 'pro',
  total_conversions: 50,
})
```

## 🧪 A/B Testing with PostHog

### 1. Create a Feature Flag

1. In PostHog dashboard, go to **Feature Flags**
2. Click **New Feature Flag**
3. Configure your experiment (e.g., pricing variations)
4. Set rollout percentage or targeting

### 2. Use Feature Flags in Code

```typescript
import { posthog } from '@/lib/posthog'

// Check if feature flag is enabled
const showNewPricing = posthog.isFeatureEnabled('new-pricing-test')

// Use the flag
if (showNewPricing) {
  // Show variant A
} else {
  // Show variant B
}

// Or get a multivariate flag value
const pricingVariant = posthog.getFeatureFlag('pricing-variant')
// Returns: 'control', 'test-a', 'test-b', etc.
```

### Example A/B Test Ideas

1. **Pricing Page Variants**
   - Test different price points
   - Test annual vs monthly emphasis
   - Test different feature lists

2. **CTA Button Variations**
   - Different button text
   - Different colors
   - Different positions

3. **Onboarding Flows**
   - Skip vs require tutorial
   - Different welcome messages
   - Different initial credits

## 📈 Useful PostHog Features

### Insights
- Create funnels (signup → conversion → payment)
- Track retention (how often users return)
- Analyze trends (conversions over time)

### Session Recordings
To enable session recordings (currently disabled for privacy):

```typescript
// In lib/posthog.ts, change:
disable_session_recording: false

// And after user consent:
analytics.optIn() // Already enables recordings
```

### Cohorts
Create user segments:
- Users who converted more than 10 times
- Users who subscribed to Pro plan
- Users from specific countries

### Dashboards
Create custom dashboards with:
- Conversion rates
- Most popular writing styles
- Payment success rates
- User retention metrics

## 🔒 Privacy & GDPR

### Current Implementation
- ✅ Tracking is **opt-out by default** (GDPR requirement)
- ✅ Cookie consent banner displayed to all users
- ✅ EU data hosting configured
- ✅ No automatic event capture (explicit tracking only)
- ✅ Session recordings disabled by default

### User Control
Users can:
- Accept or reject tracking via the banner
- Change preference anytime in browser localStorage
- Key: `PlainWrite_analytics_consent`

### Data Retention
Configure in PostHog:
1. Go to **Project Settings** → **Data Management**
2. Set retention period (e.g., 90 days)
3. Configure data deletion rules

## 🚀 Going to Production

### Update Environment Variables
In your production `.env`:
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_production_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

### Update Privacy Policy
Add PostHog to your `app/datenschutz/page.tsx`:
- Mention analytics tracking
- Link to PostHog privacy policy
- Explain what data is collected
- How users can opt-out

### Consider Self-Hosting
For maximum privacy compliance:
1. Self-host PostHog on your own servers
2. Update `NEXT_PUBLIC_POSTHOG_HOST` to your domain
3. All data stays in Germany

## 📚 Additional Resources

- [PostHog Docs](https://posthog.com/docs)
- [Next.js Integration](https://posthog.com/docs/libraries/next-js)
- [Feature Flags Guide](https://posthog.com/docs/feature-flags)
- [A/B Testing Tutorial](https://posthog.com/docs/experiments)
- [GDPR Compliance](https://posthog.com/docs/privacy/gdpr-compliance)

## 🐛 Troubleshooting

### Events not showing up?
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_POSTHOG_KEY` is set correctly
3. Make sure you accepted the cookie consent
4. Check PostHog debug mode in development

### Debug Mode
In development, PostHog automatically logs to console. Check for:
```
[PostHog] Event captured: text_conversion_started
```

### Test Without GDPR Consent
Temporarily bypass consent for testing:
```typescript
// In lib/posthog.ts
opt_out_capturing_by_default: false // Change to false for testing
```
**Remember to revert this before production!**

## 🎉 Next Steps

1. ✅ Complete PostHog account setup
2. ✅ Add your API key to `.env`
3. ✅ Test tracking in development
4. 📊 Create your first dashboard
5. 🧪 Set up your first A/B test
6. 📈 Monitor user behavior and iterate!
