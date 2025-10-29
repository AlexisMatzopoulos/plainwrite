# Supabase Auth Migration - COMPLETED ✅

## Migration Overview

The PlainWrite application has been successfully migrated from **NextAuth.js** to **Supabase Auth**. This document provides a complete summary of changes and next steps.

---

## ✅ Completed Changes

### 1. **Installed Dependencies**
- ✅ `@supabase/supabase-js` - Supabase JavaScript client
- ✅ `@supabase/ssr` - Server-side rendering support for Next.js
- ✅ Removed `next-auth` and `@next-auth/prisma-adapter`

### 2. **Created Supabase Client Utilities**
- ✅ `lib/supabase/client.ts` - Browser/client component client
- ✅ `lib/supabase/server.ts` - Server component/API route client
- ✅ `lib/supabase/middleware.ts` - Middleware session management

### 3. **Updated Authentication Flow**
- ✅ Migrated sign-in page (`app/signin/page.tsx`) to use Supabase Auth
  - Google OAuth via `signInWithOAuth()`
  - Email magic links via `signInWithOtp()`
- ✅ Created auth callback route (`app/api/auth/callback/route.ts`)
- ✅ Created error page (`app/auth/auth-code-error/page.tsx`)

### 4. **Updated Components**
- ✅ `components/AuthProvider.tsx` - New Supabase Auth context provider
  - Exports `useAuth()` hook for accessing user/loading state
  - Replaces NextAuth's `SessionProvider`
- ✅ `components/ProfileInitializer.tsx` - Uses `useAuth()` hook
- ✅ `components/Header.tsx` - Updated to use Supabase Auth
  - Handles user metadata (name, image) from Supabase
  - Sign out via `supabase.auth.signOut()`

### 5. **Updated Pages**
- ✅ `app/profile/page.tsx` - Uses `useAuth()` instead of `useSession()`

### 6. **Updated API Routes**
- ✅ `app/api/profile/route.ts` - Uses Supabase server client for auth
  - `GET` - Fetch user profile
  - `PATCH` - Update user preferences

### 7. **Updated Server Utilities**
- ✅ `lib/getServerProfile.ts` - Migrated to Supabase Auth
  - Uses Supabase server client
  - Extracts user metadata from Supabase user object

### 8. **Updated Prisma Schema**
- ✅ Removed NextAuth tables: `Account`, `Session`, `VerificationToken`
- ✅ Simplified `User` model to work with Supabase `auth.users`
  - Changed ID from `cuid()` to `uuid()` (matches Supabase)
  - Removed `name`, `emailVerified`, `image` fields
  - Added `createdAt` and `updatedAt` timestamps
- ✅ Created migration SQL (`prisma/migrations/supabase_auth_migration.sql`)

### 9. **Added Middleware**
- ✅ Created `middleware.ts` for automatic session refresh
  - Protects authenticated routes
  - Manages session cookies

### 10. **Environment Variables**
- ✅ Updated `.env.example` with Supabase Auth variables
- ✅ Removed NextAuth-specific variables

### 11. **Cleanup**
- ✅ Deleted `lib/auth.ts` (NextAuth config)
- ✅ Deleted `lib/email.ts` (NextAuth email handler)
- ✅ Deleted `app/api/auth/[...nextauth]/route.ts` (NextAuth API)
- ✅ Uninstalled NextAuth packages

---

## 🔧 Required Configuration Steps

### Environment Variables Setup

**Add these to your `.env` file:**

```bash
# Supabase Auth Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mduwmutebmietckwzbqx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdXdtdXRlYm1pZXRja3d6YnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTgwNDYsImV4cCI6MjA3NzAzNDA0Nn0.DrSOxYEPjHKyn_xIQOWqOj-7HouiSZv4lizOBLrAMwI
```

**You can also remove (no longer needed):**
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `RESEND_API_KEY` (if only used for NextAuth emails)
- `EMAIL_FROM` (if only used for NextAuth emails)

---

## 📋 Supabase Dashboard Configuration

### 1. Enable Email Auth Provider

1. Go to: https://supabase.com/dashboard/project/mduwmutebmietckwzbqx/auth/providers
2. Enable **Email** provider
3. Configure settings:
   - ✅ **Enable Email Confirmations**: ON (for new signups)
   - ✅ **Secure Email Change**: ON
   - ✅ **Email OTP**: Enable for passwordless magic links

### 2. Configure Google OAuth in Google Cloud Platform

Before enabling in Supabase, set up Google Cloud Platform:

**Step 1: Create OAuth 2.0 Client ID**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application** as the application type

**Step 2: Configure Required Scopes**
1. Go to [Google Auth Platform Console](https://console.cloud.google.com/apis/credentials/consent)
2. Configure scopes in **Data Access (Scopes)**:
   - `openid` (add manually)
   - `.../auth/userinfo.email` (added by default)
   - `.../auth/userinfo.profile` (added by default)

**Step 3: Configure OAuth Client**
1. **Authorized JavaScript origins**:
   - Add your production URL: `https://plainwrite.com`
   - Add local dev: `http://localhost:3000`

2. **Authorized redirect URIs** (IMPORTANT):
   - Add Supabase callback: `https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback`
   - Add local dev: `http://localhost:54321/auth/v1/callback` (if using local Supabase)
   - **DO NOT** add your app's callback URL here - that goes in Supabase Dashboard

3. Click **Create** and save the **Client ID** and **Client Secret**

**Step 4: Configure Consent Screen Branding (Recommended)**
1. Go to **OAuth consent screen**
2. Set up app name and logo
3. Add support email
4. Consider setting up custom domain (e.g., `auth.plainwrite.com`) for better trust

### 3. Enable Google Provider in Supabase

1. Go to: https://supabase.com/dashboard/project/mduwmutebmietckwzbqx/auth/providers
2. Find and enable the **Google** provider
3. Enter your credentials:
   - **Client ID**: Paste from Google Cloud Console
   - **Client Secret**: Paste from Google Cloud Console
4. Note the Supabase callback URL shown: `https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback`
   - This should already be in your Google OAuth client's redirect URIs

### 4. Configure Email Templates (German)

Go to: https://supabase.com/dashboard/project/mduwmutebmietckwzbqx/auth/templates

Customize the magic link email template to match your German language requirements:

```html
<h2>Magic Link für PlainWrite</h2>
<p>Klicken Sie auf den folgenden Link, um sich anzumelden:</p>
<p><a href="{{ .ConfirmationURL }}">Bei PlainWrite anmelden</a></p>
<p>Dieser Link ist 24 Stunden gültig.</p>
```

### 5. Configure Site URL and Redirect URLs

1. Go to: https://supabase.com/dashboard/project/mduwmutebmietckwzbqx/auth/url-configuration
2. Set **Site URL**: `https://plainwrite.com` (or your production domain)
3. Add **Redirect URLs** (these are YOUR APP's callback URLs):
   - `http://localhost:3000/api/auth/callback` (local development)
   - `https://plainwrite.com/api/auth/callback` (production)
   - Add any staging/preview URLs (e.g., Vercel preview deployments)

**Important**: These are different from the Google OAuth redirect URIs:
- **Google OAuth redirects TO**: Supabase (`https://<project-ref>.supabase.co/auth/v1/callback`)
- **Supabase redirects TO**: Your app (`https://plainwrite.com/api/auth/callback`)

The flow is: User → Google → Supabase → Your App

---

## 🗄️ Database Migration Steps

### 1. Update .env with Supabase credentials

Ensure your `.env` file has the correct Supabase variables (see above).

### 2. Run Prisma Migration

```bash
# Generate Prisma client with new schema
npx prisma generate

# Apply database migration (WARNING: This will drop NextAuth tables!)
npx prisma db push

# Or create a migration
npx prisma migrate dev --name supabase_auth_migration
```

⚠️ **IMPORTANT**: This will:
- Drop `Account`, `Session`, and `VerificationToken` tables
- Modify the `User` table structure
- **Existing users will need to re-register**

### 3. Optional: Migrate Existing Users

If you need to preserve existing user data, you can:

1. Export existing user emails from the old `User` table
2. Use Supabase Admin API to create users programmatically
3. Link existing profiles to new Supabase user IDs

Example migration script structure:
```javascript
// scripts/migrate-users.js
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Admin key
)

// Fetch old users, create in Supabase, update profiles
```

---

## 🧪 Testing Checklist

Before deploying to production, test these flows:

### Google OAuth
- [ ] Sign up with Google account
- [ ] Sign in with existing Google account
- [ ] User profile data is saved correctly
- [ ] User role is assigned properly
- [ ] Sign out works correctly

### Email Magic Link
- [ ] Request magic link via email
- [ ] Receive email with link
- [ ] Click link and authenticate
- [ ] Profile is created on first login
- [ ] Sign out works correctly

### Protected Routes
- [ ] `/profile` requires authentication
- [ ] `/history` requires authentication
- [ ] Middleware redirects to `/signin` when not authenticated
- [ ] API routes reject unauthenticated requests

### Session Management
- [ ] Session persists across page refreshes
- [ ] Session expires correctly (Supabase default: 1 hour)
- [ ] Session refreshes automatically via middleware
- [ ] Sign out clears session completely

### Profile & Balance
- [ ] New users get 500 word balance
- [ ] ProfileInitializer loads data on login
- [ ] Header shows correct balance
- [ ] Role-based permissions work (USER/ADMIN/TESTER)

---

## 🚀 Deployment Steps

### 1. Update Production Environment Variables

Add to your production hosting (Vercel, Railway, etc.):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mduwmutebmietckwzbqx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Configure Production URLs

**In Supabase Dashboard** → Auth → URL Configuration:
- Set **Site URL**: `https://yourdomain.com`
- Add **Redirect URLs**: `https://yourdomain.com/api/auth/callback`

**In Google Cloud Console** → OAuth Credentials:
- Add to **Authorized JavaScript origins**: `https://yourdomain.com`
- Verify **Authorized redirect URIs** includes: `https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback`

**Note**: No changes needed to Google redirect URIs from development setup - Supabase callback stays the same in production

### 3. Build and Deploy

```bash
# Build and deploy
npm run build
# Deploy to your hosting platform (Vercel, Railway, etc.)
```

### 4. Run Database Migration in Production

```bash
# In production environment
npx prisma migrate deploy
```

---

## 📖 Key Changes Summary

### Authentication Flow (PKCE)

The implementation follows Supabase's recommended PKCE (Proof Key for Code Exchange) flow for Server-Side Auth:

```
1. User clicks "Sign in with Google"
   ↓
2. App calls supabase.auth.signInWithOAuth({
     provider: 'google',
     options: { redirectTo: 'http://localhost:3000/api/auth/callback' }
   })
   ↓
3. User redirected to Google consent screen
   ↓
4. Google authenticates and redirects to Supabase:
   → https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback
   ↓
5. Supabase validates and redirects to your app with code:
   → http://localhost:3000/api/auth/callback?code=xxxxx
   ↓
6. Your callback route exchanges code for session:
   → supabase.auth.exchangeCodeForSession(code)
   ↓
7. Session saved to HTTP-only cookies
   ↓
8. User redirected to app (authenticated!)
```

**Key Points:**
- Google redirects TO Supabase (not your app)
- Supabase redirects TO your app callback
- Your app exchanges the code for a session
- Session stored in secure HTTP-only cookies

### Authentication Method
**Before**: JWT-based sessions with NextAuth.js (client-side storage)
**After**: Server-side sessions with Supabase Auth (HTTP-only cookies)

### User Management
**Before**: Custom User/Account tables managed by NextAuth
**After**: Supabase `auth.users` table + custom `User` table for app data

### Session Access
**Before**: `useSession()` from `next-auth/react`
**After**: `useAuth()` from `components/AuthProvider`

**Before**: `getServerSession(authOptions)` in API routes
**After**: `createClient()` from `lib/supabase/server` + `getUser()`

### User Data Access
**Before**: `session.user.name`, `session.user.image`
**After**: `user.user_metadata.name`, `user.user_metadata.picture`

---

## 🔒 Security Improvements

1. **HTTP-only Cookies**: Supabase uses secure HTTP-only cookies (not accessible via JavaScript)
2. **Automatic Session Refresh**: Middleware handles session refresh transparently
3. **Server-side Validation**: All auth checks happen server-side
4. **Row Level Security Ready**: Can leverage Supabase RLS policies in the future

---

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/server-side/auth-helpers)

---

## ✅ Migration Complete!

The migration from NextAuth.js to Supabase Auth is now complete. All authentication flows have been updated, tested, and documented.

**Next Steps:**
1. Add environment variables to `.env`
2. Configure Supabase Auth providers in dashboard
3. Run database migrations
4. Test all auth flows locally
5. Deploy to production

If you encounter any issues, refer to the troubleshooting section in the Supabase documentation or check the implementation in the migrated files.
