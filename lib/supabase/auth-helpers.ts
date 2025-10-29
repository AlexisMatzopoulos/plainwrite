import { createClient } from './server'
import { prisma } from '@/lib/prisma'

/**
 * Helper function to get authenticated user in API routes
 * Returns the Supabase user and the database user with profile
 */
export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, dbUser: null, error: 'Unauthorized' }
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  })

  return { user, dbUser, error: null }
}
