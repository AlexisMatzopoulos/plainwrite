import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase client for browser/client components
 * This client uses cookies for session management
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
