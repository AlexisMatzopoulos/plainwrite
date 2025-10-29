# Authentication Debug Guide

## Issue: Authorization code appearing on homepage

The URL shows: `https://www.plainwrite.com/?code=8e75bf58-1d18-4d85-b1a8-3c9b5fb440be`

This means the OAuth flow completed, but Supabase is redirecting to the homepage instead of the callback route.

## Solution: Configure Supabase Redirect URLs

### 1. Supabase Dashboard Configuration

Go to: **Supabase Dashboard → Authentication → URL Configuration**

**Settings to check:**
- **Site URL**: `https://www.plainwrite.com`
- **Redirect URLs** (must include your callback route):
  ```
  http://localhost:3000/api/auth/callback
  https://www.plainwrite.com/api/auth/callback
  ```

### 2. Google Cloud Console Configuration

The Google OAuth redirect URIs should point to **Supabase**, not your app:

**Authorized redirect URIs:**
```
https://mduwmutebmietckwzbqx.supabase.co/auth/v1/callback
```

**NOT** your app callback (`https://www.plainwrite.com/api/auth/callback`)

### 3. How the Flow Works

```
User → Google → Supabase → Your App
                   ↓          ↓
            /auth/v1/callback  /api/auth/callback
```

1. User clicks "Sign in with Google" on your site
2. Redirects to Google OAuth consent screen
3. Google redirects to **Supabase** callback: `https://[project].supabase.co/auth/v1/callback`
4. Supabase processes auth and redirects to **your app** callback: `https://www.plainwrite.com/api/auth/callback?code=...`
5. Your app callback exchanges code for session

### 4. Testing After Configuration

1. Save the Supabase configuration
2. Clear your browser cookies/cache
3. Try signing in again
4. You should be redirected to `/api/auth/callback` (you won't see this URL, it happens quickly)
5. Then redirected to the homepage (now logged in)

## Verification Checklist

- [ ] Supabase Site URL is correct
- [ ] Supabase Redirect URLs includes `/api/auth/callback` for both localhost and production
- [ ] Google OAuth redirect URI points to Supabase (not your app)
- [ ] Tested with cleared cookies

## Still Not Working?

If the issue persists, check the browser's Network tab:
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try signing in with Google
4. Look for the redirect chain
5. Check if `/api/auth/callback` is being called
