# Google OAuth Setup for Supabase Auth

This guide follows the [official Supabase documentation](https://supabase.com/docs/guides/auth/social-login/auth-google) for setting up Google Sign-In.

---

## Quick Setup Checklist

- [ ] Create OAuth client ID in Google Cloud Console
- [ ] Configure required scopes in Google Auth Platform
- [ ] Add Supabase callback to Google OAuth redirect URIs
- [ ] Enable Google provider in Supabase Dashboard
- [ ] Configure app callback URLs in Supabase redirect allow list
- [ ] Test sign-in flow locally

---

## Step 1: Google Cloud Platform Setup

### Create OAuth 2.0 Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create or select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Select **Web application**

### Configure Required Scopes

Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent):

**Required Scopes:**
- `openid` (add manually)
- `.../auth/userinfo.email` (default)
- `.../auth/userinfo.profile` (default)

⚠️ **Warning**: Adding additional scopes (especially sensitive/restricted ones) may require Google verification which can take weeks.

### Configure Authorized URLs

**Authorized JavaScript origins:**
```
http://localhost:3000
https://plainwrite.com
```

**Authorized redirect URIs:**
```
https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback
http://localhost:54321/auth/v1/callback (if using local Supabase)
```

**Important Notes:**
- ✅ DO add the Supabase callback URL here
- ❌ DO NOT add your app's callback URL here
- The Supabase URL stays the same for dev and production

### Save Credentials

After creating the OAuth client:
1. Copy the **Client ID**
2. Copy the **Client Secret**
3. Save both - you'll need them for Supabase Dashboard

---

## Step 2: Supabase Dashboard Setup

### Enable Google Provider

1. Go to [Supabase Auth Providers](https://supabase.com/dashboard/project/mduwmutebmietckwzbqx/auth/providers)
2. Find **Google** in the provider list
3. Toggle it to **Enabled**
4. Enter your credentials:
   - **Client ID**: Paste from Google Cloud Console
   - **Client Secret**: Paste from Google Cloud Console
5. Click **Save**

### Configure Redirect URLs

Go to [URL Configuration](https://supabase.com/dashboard/project/mduwmutebmietckwzbqx/auth/url-configuration):

**Site URL:**
```
http://localhost:3000 (development)
https://plainwrite.com (production)
```

**Redirect URLs (allow list):**
```
http://localhost:3000/api/auth/callback
https://plainwrite.com/api/auth/callback
```

---

## Step 3: Implementation

The implementation is already complete in your codebase. Here's how it works:

### Sign-In Flow

**File**: `app/signin/page.tsx`

```typescript
const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback?next=${next}`,
    },
  })
}
```

### Callback Handler

**File**: `app/api/auth/callback/route.ts`

```typescript
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to app
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Handle error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

---

## Authentication Flow Diagram

```
┌─────────┐
│  User   │
│ clicks  │
│ "Google"│
└────┬────┘
     │
     ▼
┌─────────────────────────────────────┐
│ app/signin/page.tsx                 │
│ signInWithOAuth({ provider: 'google' })
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ User redirected to Google           │
│ consent screen                      │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ Google authenticates user           │
│ Redirects to:                       │
│ mduwmutebmietckwzbqx.supabase.co/  │
│ auth/v1/callback                    │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ Supabase validates OAuth response   │
│ Redirects to your app:              │
│ localhost:3000/api/auth/callback    │
│ ?code=xxxxx                         │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ app/api/auth/callback/route.ts      │
│ exchangeCodeForSession(code)        │
│ → Saves session to HTTP-only cookies
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ User redirected to home page        │
│ ✅ Authenticated!                   │
└─────────────────────────────────────┘
```

---

## Testing

### Local Development Testing

1. Ensure `.env` has the Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://mduwmutebmietckwzbqx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:3000/signin`

4. Click "Sign in with Google"

5. Verify the flow:
   - ✅ Redirected to Google consent screen
   - ✅ After consent, redirected back to app
   - ✅ User is authenticated
   - ✅ Profile data loads
   - ✅ Header shows user info

### Test Checklist

- [ ] Sign up with new Google account
- [ ] Sign in with existing Google account
- [ ] Sign out and sign back in
- [ ] Check session persists on refresh
- [ ] Verify profile data is saved to database
- [ ] Test protected routes require auth
- [ ] Test API routes validate session

---

## Troubleshooting

### Error: "redirect_uri_mismatch"

**Problem**: Google returns error saying redirect URI doesn't match.

**Solution**:
1. Check Google Cloud Console → OAuth client → Authorized redirect URIs
2. Ensure it includes: `https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback`
3. No trailing slash!

### Error: "Invalid redirect URL"

**Problem**: Supabase rejects the redirect after authentication.

**Solution**:
1. Check Supabase Dashboard → Auth → URL Configuration → Redirect URLs
2. Ensure it includes: `http://localhost:3000/api/auth/callback`
3. For production: `https://yourdomain.com/api/auth/callback`

### User data not showing

**Problem**: After sign in, user name/image not displaying.

**Solution**:
- Check `user.user_metadata` object in console
- Google provides: `user_metadata.full_name` and `user_metadata.picture`
- Update components to use correct field names

### Session not persisting

**Problem**: User signed out after page refresh.

**Solution**:
1. Ensure middleware is configured (should already be)
2. Check browser cookies - should see `sb-*-auth-token` cookies
3. Verify `middleware.ts` is in project root

---

## Advanced: Getting Google Access Tokens

If you need to access Google APIs on behalf of the user (Gmail, Calendar, etc.), you need the Google access token.

### Request offline access

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
```

### Extract the provider token

After successful sign in:

```typescript
const { data: { session } } = await supabase.auth.getSession()
const googleAccessToken = session?.provider_token
const googleRefreshToken = session?.provider_refresh_token
```

Store these securely if you need to make Google API calls.

---

## Production Checklist

Before going live:

- [ ] Google OAuth client has production URL in authorized origins
- [ ] Supabase redirect URLs include production callback
- [ ] Environment variables set in hosting platform
- [ ] Test sign-in flow on production domain
- [ ] Configure custom domain for auth (optional but recommended)
- [ ] Set up Google consent screen branding
- [ ] Consider applying for brand verification

---

## Resources

- [Supabase Auth with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com)
- [Supabase Dashboard](https://supabase.com/dashboard)
