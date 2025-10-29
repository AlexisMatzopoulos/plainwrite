'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Profile {
  id?: string
  words_balance: number
  extra_words_balance: number
  words_limit: number
  words_per_request?: number
  subscription_plan?: string | null
  subscription_status?: string | null
  subscription_canceled?: boolean
  subscription_paused?: boolean
  subscription_valid_until?: string | null
  paystack_customer_code?: string | null
  paystack_subscription_code?: string | null
  paystack_authorization_code?: string | null
  paystack_plan_code?: string | null
  billing_period?: string | null
}

export function SubscriptionCard({ profile }: { profile: Profile | null }) {
  const [managingSubscription, setManagingSubscription] = useState(false)
  const [cancellingSubscription, setCancellingSubscription] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  if (!profile) {
    return null
  }

  const subscriptionPlanDisplay = profile.subscription_plan
    ? profile.subscription_plan.charAt(0).toUpperCase() + profile.subscription_plan.slice(1) + '-Plan'
    : 'Free Plan'

  const wordsPerMonth = profile.words_limit || 5000

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'non-renewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'attention':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'non-renewing':
        return 'Expiring'
      case 'attention':
        return 'Payment Issue'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Inactive'
    }
  }

  const handleUpdatePaymentMethod = async () => {
    setManagingSubscription(true)
    try {
      const response = await fetch('/api/paystack/manage-subscription')
      const data = await response.json()

      if (response.ok && data.link) {
        window.location.href = data.link
      } else {
        alert('Error opening subscription management')
      }
    } catch (error) {
      console.error('Error managing subscription:', error)
      alert('Error opening subscription management')
    } finally {
      setManagingSubscription(false)
    }
  }

  const handleCancelSubscription = async () => {
    setCancellingSubscription(true)
    try {
      const response = await fetch('/api/paystack/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: profile.paystack_subscription_code,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Your subscription will end at the end of the billing period.')
        window.location.reload()
      } else {
        alert(data.error || 'Error cancelling subscription')
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('Error cancelling subscription')
    } finally {
      setCancellingSubscription(false)
      setShowCancelConfirm(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
        {profile.subscription_status && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.subscription_status)}`}>
            {getStatusText(profile.subscription_status)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-900 mb-1">{subscriptionPlanDisplay}</p>
          <p className="text-sm text-gray-500">{wordsPerMonth.toLocaleString()} words per month</p>
        </div>

        {profile.billing_period && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="text-sm">
              <span className="text-gray-500">Billing: </span>
              <span className="text-gray-900 font-medium">
                {profile.billing_period === 'month' ? 'Monthly' : 'Annually'}
              </span>
            </div>
            {profile.subscription_valid_until && (
              <div className="text-sm mt-1">
                <span className="text-gray-500">Next billing: </span>
                <span className="text-gray-900 font-medium">
                  {new Date(profile.subscription_valid_until).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        {profile.subscription_status === 'attention' && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-red-900 font-medium">
                  Payment Failed
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Please update your payment method to continue your subscription.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 flex-col sm:flex-row">
          {profile.paystack_subscription_code && profile.subscription_status === 'active' && (
            <>
              <button
                onClick={handleUpdatePaymentMethod}
                disabled={managingSubscription}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {managingSubscription ? 'Loading...' : 'Update Payment'}
              </button>
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          )}

          {profile.subscription_status === 'attention' && (
            <button
              onClick={handleUpdatePaymentMethod}
              disabled={managingSubscription}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-theme-primary hover:opacity-90 rounded-lg transition-opacity disabled:opacity-50"
            >
              {managingSubscription ? 'Loading...' : 'Update Payment Method'}
            </button>
          )}

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-theme-primary hover:opacity-90 rounded-lg transition-opacity"
          >
            {profile.subscription_plan ? 'Upgrade Plan' : 'Get Started'}
          </Link>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cancel Subscription?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Your subscription will remain active until the end of the current billing period. You can
                continue using all features until then.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancellingSubscription}
                  className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {cancellingSubscription ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
