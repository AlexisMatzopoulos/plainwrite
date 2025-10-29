# Supabase Auth Implementation Notes

This document summarizes how the implementation follows the official Supabase documentation.

---

## ✅ Implementation Verified Against Official Docs

The implementation has been verified against the [official Supabase Google Auth documentation](https://supabase.com/docs/guides/auth/social-login/auth-google).

### Key Implementation Details

#### 1. OAuth Redirect Flow

**Critical Understanding**: There are TWO different redirect URIs:

1. **Google OAuth Redirect URI** (configured in Google Cloud Console):
   - Points to: `https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback`
   - This is where Google sends the user after authentication
   - This stays the same for dev and production

2. **App Redirect URI** (configured in Supabase Dashboard):
   - Points to: `http://localhost:3000/api/auth/callback` (dev)
   - Points to: `https://plainwrite.com/api/auth/callback` (production)
   - This is where Supabase sends the user after validating OAuth response

**Flow**:
```
User → Google → Supabase → Your App
```

#### 2. Sign In Implementation

**File**: `app/signin/page.tsx`

Uses `signInWithOAuth()` with PKCE flow (recommended for Server-Side Auth):

```typescript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/api/auth/callback?next=${next}`,
  },
})
```

This matches the official docs exactly.

#### 3. Callback Handler

**File**: `app/api/auth/callback/route.ts`

Implementation matches the official Next.js example from the docs:

```typescript
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'

  // Security check (from official docs)
  if (!next.startsWith('/')) {
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Handle production load balancer scenario
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

**Key Security Feature**: The `next` parameter is validated to prevent open redirect attacks, exactly as shown in official docs.

#### 4. Supabase Client Setup

**Files**:
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server client
- `lib/supabase/middleware.ts` - Middleware client

All three follow the official Supabase SSR guide patterns.

#### 5. Middleware for Session Management

**File**: `middleware.ts`

Implements automatic session refresh as recommended in official docs:

```typescript
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

The `updateSession()` function in `lib/supabase/middleware.ts` follows the official pattern for:
- Reading cookies from request
- Refreshing sessions automatically
- Setting cookies in response
- Protecting authenticated routes

---

## 📋 Google Cloud Platform Configuration

Based on official docs requirements:

### Required Scopes

In Google Auth Platform Console → OAuth consent screen → Scopes:

```
✅ openid (manually added)
✅ .../auth/userinfo.email (default)
✅ .../auth/userinfo.profile (default)
```

⚠️ Do not add additional scopes unless necessary - can trigger Google verification process.

### OAuth Client Configuration

In Google Cloud Console → OAuth 2.0 Client ID:

**Authorized JavaScript origins**:
```
http://localhost:3000
https://plainwrite.com
```

**Authorized redirect URIs**:
```
https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback
```

Note: Only the Supabase callback URL goes here, NOT your app's callback URL.

---

## 🔐 Security Best Practices Implemented

All security recommendations from official docs are implemented:

1. ✅ **PKCE Flow**: Using code exchange instead of implicit flow
2. ✅ **Open Redirect Prevention**: Validates `next` parameter is relative URL
3. ✅ **HTTP-only Cookies**: Sessions stored in secure cookies (handled by Supabase)
4. ✅ **Server-side Session Validation**: All API routes validate sessions server-side
5. ✅ **Automatic Session Refresh**: Middleware refreshes sessions transparently

---

## 🧪 Email Magic Links

Email authentication also implemented per official docs:

**Sign In**:
```typescript
await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${next}`,
  },
})
```

The same callback route handles both OAuth and email magic links.

---

## 📊 User Data Structure

Per official docs, Supabase stores user data in `user_metadata`:

**Google OAuth provides**:
- `user.user_metadata.full_name`
- `user.user_metadata.picture`
- `user.user_metadata.email` (also in `user.email`)

**Email Auth provides**:
- `user.email`

All components updated to access user data correctly:
- `Header.tsx`: Uses `user.user_metadata` for name and avatar
- `Profile page`: Uses `user.user_metadata` for display
- `getServerProfile()`: Extracts metadata server-side

---

## 🚀 Production Ready

Implementation includes all production considerations from docs:

1. ✅ **Load Balancer Support**: Handles `X-Forwarded-Host` header
2. ✅ **Environment Detection**: Different behavior for dev vs production
3. ✅ **Error Handling**: Redirects to error page when auth fails
4. ✅ **Session Persistence**: Middleware ensures sessions stay valid

---

## 📖 Differences from NextAuth.js

The Supabase implementation differs from previous NextAuth.js in these ways:

| Aspect | NextAuth.js | Supabase Auth |
|--------|-------------|---------------|
| **Auth Provider** | App manages OAuth flow | Supabase manages OAuth flow |
| **OAuth Redirect** | Directly to app | Google → Supabase → App |
| **Session Storage** | JWT in localStorage/cookies | HTTP-only cookies |
| **Session Strategy** | Client-side JWT | Server-side sessions |
| **User Table** | Custom `User`, `Account`, `Session` | Supabase `auth.users` + app `User` |
| **Code Exchange** | Handled by NextAuth | Manual `exchangeCodeForSession()` |

---

## 🔄 Additional Features Available

Features from official docs that can be added if needed:

### Google Access Tokens

To access Google APIs (Gmail, Calendar, etc.):

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})

// After sign in
const { data: { session } } = await supabase.auth.getSession()
const googleAccessToken = session?.provider_token
const googleRefreshToken = session?.provider_refresh_token
```

### Google One Tap

Can be implemented using Google's pre-built solution and `signInWithIdToken()`:

```typescript
// When Google One Tap responds
async function handleSignInWithGoogle(response) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  })
}
```

See `docs/GOOGLE-OAUTH-SETUP.md` for detailed implementation guide.

---

## ✅ Compliance Checklist

Implementation verified against official docs:

- [x] Using recommended PKCE flow
- [x] Callback route matches official Next.js example
- [x] Security checks implemented (open redirect prevention)
- [x] Session management follows SSR guide
- [x] Middleware configured correctly
- [x] Error handling in place
- [x] User metadata accessed correctly
- [x] Load balancer support included
- [x] Environment-specific behavior implemented

---

## 📚 Official Documentation References

All implementation decisions based on:

1. [Supabase Auth with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
2. [Supabase Server-Side Auth (Next.js)](https://supabase.com/docs/guides/auth/server-side/nextjs)
3. [Supabase SSR Package Guide](https://supabase.com/docs/guides/auth/server-side/auth-helpers)

---

## 🎯 Next Steps

To complete setup:

1. Add environment variables to `.env`
2. Configure Google Cloud Console OAuth client
3. Enable Google provider in Supabase Dashboard
4. Configure redirect URLs in Supabase
5. Run database migration
6. Test authentication flows

See `SUPABASE-AUTH-MIGRATION.md` for detailed setup instructions.
