import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
