import { posthog } from './posthog'

// Event types for type safety
export type AnalyticsEvent =
  // Authentication
  | 'user_signup'
  | 'user_signin'
  | 'user_signout'
  | 'magic_link_sent'
  | 'magic_link_clicked'

  // Text conversion
  | 'text_conversion_started'
  | 'text_conversion_completed'
  | 'text_conversion_failed'
  | 'style_selected'
  | 'copy_result'

  // Payment & Credits
  | 'payment_modal_opened'
  | 'payment_initiated'
  | 'payment_completed'
  | 'payment_failed'
  | 'credits_purchased'
  | 'subscription_started'
  | 'subscription_cancelled'

  // Engagement
  | 'pricing_page_viewed'
  | 'how_it_works_viewed'
  | 'example_clicked'
  | 'cta_clicked'

interface AnalyticsProperties {
  [key: string]: string | number | boolean | null | undefined
}

class Analytics {
  /**
   * Track a custom event
   */
  track(event: AnalyticsEvent, properties?: AnalyticsProperties) {
    if (typeof window === 'undefined') return

    try {
      posthog.capture(event, properties)
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  /**
   * Identify a user
   */
  identify(userId: string, traits?: AnalyticsProperties) {
    if (typeof window === 'undefined') return

    try {
      posthog.identify(userId, traits)
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: AnalyticsProperties) {
    if (typeof window === 'undefined') return

    try {
      posthog.people?.set(properties)
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  /**
   * Reset user identity (on logout)
   */
  reset() {
    if (typeof window === 'undefined') return

    try {
      posthog.reset()
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  /**
   * Enable tracking after user consent
   */
  optIn() {
    if (typeof window === 'undefined') return

    try {
      posthog.opt_in_capturing()
      // Optionally enable session recording
      // posthog.startSessionRecording()
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  /**
   * Disable tracking
   */
  optOut() {
    if (typeof window === 'undefined') return

    try {
      posthog.opt_out_capturing()
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  /**
   * Check if user has opted in
   */
  hasOptedIn(): boolean {
    if (typeof window === 'undefined') return false

    try {
      return posthog.has_opted_in_capturing()
    } catch (error) {
      console.error('Analytics error:', error)
      return false
    }
  }

  /**
   * Check if user has opted out
   */
  hasOptedOut(): boolean {
    if (typeof window === 'undefined') return false

    try {
      return posthog.has_opted_out_capturing()
    } catch (error) {
      console.error('Analytics error:', error)
      return false
    }
  }
}

export const analytics = new Analytics()
