# Google OAuth Setup Guide

You're getting a 500 error because the Google OAuth credentials are not configured. Follow these steps to set up Google Sign-In:

## Step 1: Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account

## Step 2: Create a New Project (or Select Existing)

1. Click the project dropdown at the top
2. Click "New Project"
3. Name it "Natural Write" (or any name you prefer)
4. Click "Create"
5. Wait for the project to be created and select it

## Step 3: Enable Google+ API

1. In the left sidebar, go to **"APIs & Services" > "Library"**
2. Search for "Google+ API"
3. Click on it and press **"Enable"**

## Step 4: Configure OAuth Consent Screen

1. Go to **"APIs & Services" > "OAuth consent screen"**
2. Select **"External"** (unless you have a Google Workspace)
3. Click **"Create"**

4. Fill in the required fields:
   - **App name**: `Natural Write`
   - **User support email**: Your email address
   - **Developer contact email**: Your email address

5. Click **"Save and Continue"**

6. **Scopes**: Click "Add or Remove Scopes"
   - Add these scopes:
     - `userinfo.email`
     - `userinfo.profile`
   - Click "Update" then "Save and Continue"

7. **Test users** (if in testing mode):
   - Click "Add Users"
   - Add your email address and any other test users
   - Click "Save and Continue"

8. Click **"Back to Dashboard"**

## Step 5: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services" > "Credentials"**
2. Click **"Create Credentials" > "OAuth client ID"**
3. Choose **"Web application"**

4. Fill in the details:
   - **Name**: `Natural Write Web Client`

   - **Authorized JavaScript origins**:
     ```
     http://localhost:3000
     ```

   - **Authorized redirect URIs**:
     ```
     http://localhost:3000/api/auth/callback/google
     ```

5. Click **"Create"**

## Step 6: Copy Your Credentials

You'll see a popup with your credentials:

- **Client ID**: Something like `123456789-abc123def456.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-abc123def456...`

**⚠️ Keep these secret! Don't share them publicly.**

## Step 7: Add Credentials to .env File

1. Open `/Users/alexismatzopoulos/naturalwrite/.env`

2. Replace the placeholder values:
   ```env
   GOOGLE_CLIENT_ID="your-actual-client-id-here"
   GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
   ```

3. Save the file

## Step 8: Restart Your Dev Server

1. Stop the dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

## Step 9: Test Login

1. Go to `http://localhost:3000`
2. Click "Try for free" or "Log in"
3. You should see the Google sign-in screen
4. Sign in with your Google account
5. You should be redirected back to the app, logged in!

---

## For Production Deployment

When you deploy to production (e.g., Vercel):

1. Go back to Google Cloud Console > Credentials
2. Edit your OAuth client
3. Add your production URLs:

   **Authorized JavaScript origins:**
   ```
   https://yourdomain.com
   ```

   **Authorized redirect URIs:**
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

4. Update your production environment variables on Vercel:
   ```env
   NEXTAUTH_URL="https://yourdomain.com"
   NEXTAUTH_SECRET="KNWqqGB7l1LC1cIlz+vAj17ieDQNlauPPqd4qMVnErU="
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure `http://localhost:3000/api/auth/callback/google` is added to Authorized redirect URIs
- Make sure there are no trailing slashes

### Error: "access_denied"
- If app is in testing mode, make sure your email is added as a test user
- Or publish the app (OAuth consent screen > Publish App)

### Error: 500 Internal Server Error
- Check that all environment variables are set in `.env`
- Restart the dev server after changing `.env`
- Check terminal for detailed error messages

### Login works but profile not loading
- Make sure database is connected
- Check that Profile model exists in database
- Verify `lib/auth.ts` callback creates profile for new users

---

## Current .env Status

✅ `DATABASE_URL` - Set
✅ `OPENAI_API_KEY` - Set
✅ `NEXTAUTH_URL` - Set
✅ `NEXTAUTH_SECRET` - Generated
❌ `GOOGLE_CLIENT_ID` - **YOU NEED TO SET THIS**
❌ `GOOGLE_CLIENT_SECRET` - **YOU NEED TO SET THIS**

After setting up Google OAuth credentials, your login should work!
