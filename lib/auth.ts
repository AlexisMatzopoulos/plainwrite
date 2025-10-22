import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

// Debug: Log DATABASE_URL info (not the actual value for security)
console.log('🔍 DATABASE_URL exists:', !!process.env.DATABASE_URL)
console.log('🔍 DATABASE_URL starts with postgresql://', process.env.DATABASE_URL?.startsWith('postgresql://'))
console.log('🔍 DATABASE_URL length:', process.env.DATABASE_URL?.length || 0)
console.log('🔍 DATABASE_URL first 20 chars:', process.env.DATABASE_URL?.substring(0, 20))
console.log('🔍 DIRECT_URL exists:', !!process.env.DIRECT_URL)

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
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }

      // Create profile for new users (after user is created in DB)
      if (user?.id) {
        const existingProfile = await prisma.profile.findUnique({
          where: { user_id: user.id },
        })

        if (!existingProfile) {
          await prisma.profile.create({
            data: {
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
      }

      return session
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "database",
  },
}
