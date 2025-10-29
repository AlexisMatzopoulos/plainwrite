import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Auth callback route for Supabase
 * Handles OAuth and email magic link redirects
 *
 * This follows the official Supabase Next.js guide:
 * https://supabase.com/docs/guides/auth/social-login/auth-google
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  console.log('🔐 Auth callback called:', {
    url: request.url,
    code: code ? 'present' : 'missing',
    origin,
  })

  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'

  // Security: prevent open redirect vulnerabilities
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    console.log('🔐 Code exchange result:', { success: !error, error: error?.message })

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
