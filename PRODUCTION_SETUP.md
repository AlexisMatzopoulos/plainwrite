# Production Setup for plainwrite.com

## Step 1: Add Production Domain to Google OAuth

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Natural Write project
3. Go to **APIs & Services** → **Credentials**

### 1.2 Edit Your OAuth 2.0 Client ID
1. Click on your OAuth client (the one you created for localhost)
2. You'll see "Authorized JavaScript origins" and "Authorized redirect URIs"

### 1.3 Add Production URLs

**Authorized JavaScript origins:**
Add both HTTP and HTTPS (keep localhost for development):
```
http://localhost:3000
https://plainwrite.com
https://www.plainwrite.com
```

**Authorized redirect URIs:**
Add production callbacks (keep localhost for development):
```
http://localhost:3000/api/auth/callback/google
https://plainwrite.com/api/auth/callback/google
https://www.plainwrite.com/api/auth/callback/google
```

### 1.4 Save Changes
- Click **"SAVE"** at the bottom
- Wait 5-10 minutes for changes to propagate

---

## Step 2: Deploy to Vercel (Recommended)

### 2.1 Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2.2 Login to Vercel
```bash
vercel login
```

### 2.3 Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (Choose your account)
- Link to existing project? **N**
- Project name: **PlainWrite** (or any name)
- Directory: **./**
- Override settings? **N**

### 2.4 Add Domain in Vercel Dashboard
1. Go to your project on [vercel.com](https://vercel.com)
2. Click on **Settings** → **Domains**
3. Add `plainwrite.com`
4. Add `www.plainwrite.com`
5. Follow DNS instructions to point your domain to Vercel

---

## Step 3: Set Environment Variables in Vercel

### 3.1 Go to Project Settings
1. In Vercel dashboard, click **Settings** → **Environment Variables**

### 3.2 Add All Environment Variables

Copy from your local `.env` file and add these:

```env
# Database
DATABASE_URL=your-database-connection-string

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# NextAuth - IMPORTANT: Change NEXTAUTH_URL to your domain!
NEXTAUTH_URL=https://plainwrite.com
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth - Same credentials as localhost
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Important Notes:**
- Set `NEXTAUTH_URL` to `https://plainwrite.com` (NOT localhost!)
- Use the **same** Google OAuth credentials (Client ID and Secret)
- Select **Production** for all variables

### 3.3 Redeploy
After adding environment variables:
```bash
vercel --prod
```

---

## Step 4: Configure DNS for plainwrite.com

You need to point your domain to Vercel's servers.

### If using a domain registrar (e.g., GoDaddy, Namecheap):

1. Go to your domain registrar's DNS settings
2. Add these records:

**For root domain (plainwrite.com):**
- Type: **A**
- Name: **@**
- Value: **76.76.21.21** (Vercel's IP)

**For www subdomain:**
- Type: **CNAME**
- Name: **www**
- Value: **cname.vercel-dns.com**

3. Save changes (DNS propagation takes 1-48 hours)

---

## Step 5: Test Production Login

Once DNS is propagated and deployment is complete:

1. Visit `https://plainwrite.com`
2. Click "Try for free" or "Log in"
3. Sign in with Google
4. Should work perfectly! ✅

---

## Quick Deployment Checklist

- [ ] Added production URLs to Google Cloud Console OAuth
- [ ] Deployed to Vercel
- [ ] Added domain in Vercel dashboard
- [ ] Set all environment variables in Vercel
- [ ] Changed `NEXTAUTH_URL` to production domain
- [ ] Configured DNS records
- [ ] Tested login on production

---

## Troubleshooting

### "redirect_uri_mismatch" error on production
- Make sure you added `https://plainwrite.com/api/auth/callback/google` to Google OAuth
- Wait 5-10 minutes after saving in Google Cloud Console
- Check that `NEXTAUTH_URL` in Vercel is set to `https://plainwrite.com`

### Login works but profile not loading
- Check that `DATABASE_URL` is set correctly in Vercel
- Verify database is accessible from external connections (Supabase should work)

### "Invalid NEXTAUTH_URL" error
- Make sure `NEXTAUTH_URL` uses `https://` not `http://`
- Should be `https://plainwrite.com` without trailing slash

### Images not loading
- Check `next.config.js` has Google images configured (already done)

---

## Alternative: Deploy to Another Platform

If you prefer a different platform:

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### DigitalOcean App Platform
1. Connect your GitHub repo
2. Select "Next.js" app
3. Add environment variables
4. Deploy

### Your Own VPS (Advanced)
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Environment Variable Summary

| Variable | Local Value | Production Value |
|----------|-------------|------------------|
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://plainwrite.com` |
| `NEXTAUTH_SECRET` | Same | Same |
| `GOOGLE_CLIENT_ID` | Same | Same |
| `GOOGLE_CLIENT_SECRET` | Same | Same |
| `DATABASE_URL` | Same | Same |
| `OPENAI_API_KEY` | Same | Same |

Only `NEXTAUTH_URL` changes for production!

---

## Post-Deployment

After successful deployment:

1. **Test all features:**
   - [ ] Google login
   - [ ] Text humanization (streaming)
   - [ ] Word balance deduction
   - [ ] Profile page
   - [ ] History (if implemented)

2. **Monitor:**
   - Check Vercel logs for errors
   - Test from different devices/browsers
   - Verify SSL certificate is active

3. **Optional improvements:**
   - Set up custom email (hello@plainwrite.com)
   - Add analytics (Google Analytics, Plausible)
   - Set up monitoring (Sentry, LogRocket)
   - Configure CDN for images

---

Good luck with your production deployment! 🚀
