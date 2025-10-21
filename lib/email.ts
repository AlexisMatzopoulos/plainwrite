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
    subject: `Willkommen bei EchtSchreib ${data.planName}!`,
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
        from: 'EchtSchreib <noreply@echtschreib.com>',
        to: [data.email],
        subject: `Willkommen bei EchtSchreib ${data.planName}!`,
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
    subject: 'Zahlungsproblem mit Ihrem EchtSchreib-Abonnement',
    template: 'payment-failed',
  })
}

export async function sendSubscriptionCancelledEmail(email: string, planName: string) {
  console.log('📧 Sending subscription cancelled email:', {
    to: email,
    subject: 'Ihr EchtSchreib-Abonnement wurde gekündigt',
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
          <h1 style="margin: 0;">Willkommen bei EchtSchreib!</h1>
        </div>
        <div class="content">
          <p>Hallo ${data.name},</p>
          <p>Vielen Dank für Ihr Abonnement! Wir freuen uns, Sie an Bord zu haben.</p>

          <div class="plan-details">
            <h3 style="margin-top: 0;">Ihre Abonnementdetails:</h3>
            <div class="detail-row">
              <span><strong>Plan:</strong></span>
              <span>${data.planName}</span>
            </div>
            <div class="detail-row">
              <span><strong>Wörter pro Monat:</strong></span>
              <span>${data.wordsLimit.toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span><strong>Abrechnung:</strong></span>
              <span>${data.billingPeriod === 'month' ? 'Monatlich' : 'Jährlich'}</span>
            </div>
            <div class="detail-row">
              <span><strong>Betrag:</strong></span>
              <span>€${(data.amount / 100).toFixed(2)}</span>
            </div>
          </div>

          <p>Sie können jetzt:</p>
          <ul>
            <li>Ihre Texte in verschiedene Schreibstile umwandeln</li>
            <li>Bis zu ${data.wordsLimit.toLocaleString()} Wörter pro Monat verarbeiten</li>
            <li>Alle Premium-Funktionen nutzen</li>
          </ul>

          <p style="text-align: center; margin: 30px 0;">
            <a href="https://echtschreib.com" style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Jetzt loslegen
            </a>
          </p>

          <p>Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.</p>
          <p>Viel Erfolg mit EchtSchreib!</p>
        </div>
        <div class="footer">
          <p>EchtSchreib<br>
          <a href="mailto:echtschreib@gmail.com" style="color: #10b981;">echtschreib@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}
