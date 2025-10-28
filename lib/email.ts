// Email notification utility
// You can integrate with SendGrid, Resend, or any email service

interface SubscriptionEmailData {
  email: string
  name: string
  planName: string
  planTier: string
  billingPeriod: string
  wordsLimit: number
  amount: number
}

export async function sendSubscriptionConfirmationEmail(data: SubscriptionEmailData) {
  // For now, we'll just log. You can integrate with your email service
  console.log('📧 Sending subscription confirmation email:', {
    to: data.email,
    subject: `Welcome to PlainWrite ${data.planName}!`,
    template: 'subscription-confirmation',
    data,
  })

  // Example with fetch to an email service API:
  /*
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PlainWrite <noreply@plainwrite.com>',
        to: [data.email],
        subject: `Welcome to PlainWrite ${data.planName}!`,
        html: getSubscriptionConfirmationHTML(data),
      }),
    })
  } catch (error) {
    console.error('Error sending subscription confirmation email:', error)
  }
  */
}

export async function sendPaymentFailedEmail(email: string, planName: string) {
  console.log('📧 Sending payment failed email:', {
    to: email,
    subject: 'Payment Issue with Your PlainWrite Subscription',
    template: 'payment-failed',
  })
}

export async function sendSubscriptionCancelledEmail(email: string, planName: string) {
  console.log('📧 Sending subscription cancelled email:', {
    to: email,
    subject: 'Your PlainWrite Subscription Has Been Cancelled',
    template: 'subscription-cancelled',
  })
}

function getSubscriptionConfirmationHTML(data: SubscriptionEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #10b981;
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #ffffff;
          padding: 30px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .plan-details {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Welcome to PlainWrite!</h1>
        </div>
        <div class="content">
          <p>Hello ${data.name},</p>
          <p>Thank you for subscribing! We're excited to have you on board.</p>

          <div class="plan-details">
            <h3 style="margin-top: 0;">Your Subscription Details:</h3>
            <div class="detail-row">
              <span><strong>Plan:</strong></span>
              <span>${data.planName}</span>
            </div>
            <div class="detail-row">
              <span><strong>Words per Month:</strong></span>
              <span>${data.wordsLimit.toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span><strong>Billing:</strong></span>
              <span>${data.billingPeriod === 'month' ? 'Monthly' : 'Yearly'}</span>
            </div>
            <div class="detail-row">
              <span><strong>Amount:</strong></span>
              <span>$${(data.amount / 100).toFixed(2)}</span>
            </div>
          </div>

          <p>You can now:</p>
          <ul>
            <li>Transform your texts into various writing styles</li>
            <li>Process up to ${data.wordsLimit.toLocaleString()} words per month</li>
            <li>Access all premium features</li>
          </ul>

          <p style="text-align: center; margin: 30px 0;">
            <a href="https://plainwrite.com" style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Get Started
            </a>
          </p>

          <p>If you have any questions, we're here to help anytime.</p>
          <p>Best of luck with PlainWrite!</p>
        </div>
        <div class="footer">
          <p>PlainWrite<br>
          <a href="mailto:support@plainwrite.com" style="color: #10b981;">support@plainwrite.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}
