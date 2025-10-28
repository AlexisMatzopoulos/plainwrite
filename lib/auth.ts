import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import { Resend } from "resend"

// Debug: Log DATABASE_URL info (not the actual value for security)
console.log('🔍 DATABASE_URL exists:', !!process.env.DATABASE_URL)
console.log('🔍 DATABASE_URL starts with postgresql://', process.env.DATABASE_URL?.startsWith('postgresql://'))
console.log('🔍 DATABASE_URL length:', process.env.DATABASE_URL?.length || 0)
console.log('🔍 DATABASE_URL first 20 chars:', process.env.DATABASE_URL?.substring(0, 20))
console.log('🔍 DIRECT_URL exists:', !!process.env.DIRECT_URL)

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  debug: true, // Enable debug logging
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    EmailProvider({
      server: "", // Not using SMTP server
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        console.log('🔧 Attempting to send email to:', email)
        console.log('🔧 Email FROM address:', process.env.EMAIL_FROM)
        console.log('🔧 Resend API key exists:', !!process.env.RESEND_API_KEY)
        console.log('🔧 Magic link URL:', url)

        try {
          // Add timestamp to subject to prevent Gmail threading
          const timestamp = new Date().toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })

          const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || "onboarding@resend.dev",
            to: email,
            subject: `Melden Sie sich bei PlainWrite an - ${timestamp}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); padding: 40px;">
                      <h1 style="color: #1f2937; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">Anmelden bei PlainWrite</h1>
                      <p style="color: #6b7280; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">
                        Klicken Sie auf die Schaltfläche unten, um sich bei Ihrem Konto anzumelden.
                      </p>
                      <a href="${url}" style="display: inline-block; background-color: #3b82f6; color: white; font-size: 16px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 10px; margin: 0 0 24px 0;">
                        Jetzt anmelden
                      </a>
                      <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                        Wenn Sie diese E-Mail nicht angefordert haben, können Sie sie ignorieren.
                      </p>
                      <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin: 8px 0 0 0;">
                        Dieser Link läuft in 24 Stunden ab.
                      </p>
                    </div>
                  </div>
                </body>
              </html>
            `,
            text: `Melden Sie sich bei PlainWrite an\n\nKlicken Sie auf den folgenden Link, um sich anzumelden:\n\n${url}\n\nWenn Sie diese E-Mail nicht angefordert haben, können Sie sie ignorieren.\n\nDieser Link läuft in 24 Stunden ab.`,
          })

          console.log('✅ Email sent successfully!', result)
        } catch (error) {
          console.error('❌ Error sending email:', error)
          console.error('❌ Error details:', JSON.stringify(error, null, 2))
          throw new Error('Failed to send verification email')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in - store user ID in token
      if (user) {
        token.id = user.id

        // Create profile for new users on first sign in
        await prisma.profile.upsert({
          where: { user_id: user.id },
          update: {}, // Don't update if profile exists
          create: {
            user_id: user.id,
            words_balance: 500,
            extra_words_balance: 0,
            words_limit: 500,
            words_per_request: 500,
            subscription_canceled: false,
            subscription_paused: false,
          },
        })
      }
      return token
    },
    async session({ session, token }) {
      // Add user ID from token to session
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt", // Use JWT instead of database - much faster!
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}
