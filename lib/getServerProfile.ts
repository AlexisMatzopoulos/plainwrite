import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { Profile, UserRole } from "@/store/profileStore"

export interface ServerProfileData {
  profile: Profile | null
  userRole: UserRole
  isLoggedIn: boolean
  userEmail: string | null
  userName: string | null
  userImage: string | null
}

/**
 * Fetches user profile data server-side using NextAuth session
 * This eliminates client-side fetching delays and localStorage hydration issues
 */
export async function getServerProfile(): Promise<ServerProfileData> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return {
      profile: null,
      userRole: 'USER',
      isLoggedIn: false,
      userEmail: null,
      userName: null,
      userImage: null,
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        role: true,
        profile: true,
      },
    })

    if (!user || !user.profile) {
      return {
        profile: null,
        userRole: 'USER',
        isLoggedIn: true,
        userEmail: session.user.email,
        userName: session.user.name,
        userImage: session.user.image,
      }
    }

    return {
      profile: user.profile as Profile,
      userRole: (user.role as UserRole) || 'USER',
      isLoggedIn: true,
      userEmail: session.user.email,
      userName: session.user.name,
      userImage: session.user.image,
    }
  } catch (error) {
    console.error('Error fetching server profile:', error)
    return {
      profile: null,
      userRole: 'USER',
      isLoggedIn: false,
      userEmail: null,
      userName: null,
      userImage: null,
    }
  }
}
