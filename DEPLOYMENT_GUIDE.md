# 🚀 DEPLOYMENT GUIDE FOR NEW DOMAIN

## PlainWrite - Step-by-Step Deployment Instructions
**Branch:** paddle-final
**Target:** New production domain with Paddle integration

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Before you begin:
- [ ] New domain purchased and ready
- [ ] Vercel account created (or hosting provider chosen)
- [ ] Database ready (Supabase/Postgres)
- [ ] All environment variables documented
- [ ] Paddle account created and verified
- [ ] Google OAuth authorized redirect URIs updated for new domain

---

## 🌐 OPTION 1: DEPLOY TO VERCEL (RECOMMENDED)

Vercel is the easiest option for Next.js applications and provides automatic SSL.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from paddle-final branch

```bash
# Make sure you're on the paddle-final branch
git branch

# If not, switch to it
git checkout paddle-final

# Deploy to production
vercel --prod
```

### Step 4: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

**DNS Records (example):**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 5: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
# Authentication
NEXTAUTH_URL=https://your-new-domain.com
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (use port 6543 with pgbouncer for production)
DATABASE_URL=your-postgresql-url?pgbouncer=true

# Email (if using)
EMAIL_SERVER_USER=your-email
EMAIL_SERVER_PASSWORD=your-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@your-new-domain.com

# Paddle (add after approval)
NEXT_PUBLIC_PADDLE_VENDOR_ID=your-vendor-id
PADDLE_API_KEY=your-api-key

# Other
NEXT_PUBLIC_APP_URL=https://your-new-domain.com
```

### Step 6: Redeploy

```bash
vercel --prod
```

### Step 7: Verify Deployment

Visit your new domain:
- https://your-new-domain.com
- Check HTTPS padlock is showing
- Test all pages load correctly
- Click through all navigation links

---

## 🌐 OPTION 2: DEPLOY TO OTHER HOSTING (Netlify, AWS, etc.)

### General Steps:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Configure hosting provider:**
   - Point to `.next` output directory
   - Set Node.js version (18.x or higher)
   - Configure environment variables

3. **Set up SSL certificate:**
   - Use Let's Encrypt (free)
   - Or provider's SSL service

4. **Configure DNS:**
   - Point A record to hosting IP
   - Configure CNAME for www subdomain

---

## 🔐 SSL/HTTPS VERIFICATION

After deployment, verify SSL is working:

### Test 1: Visit Site
```
https://your-new-domain.com
```
- Should show padlock icon in browser
- No security warnings

### Test 2: SSL Labs Check
Visit: https://www.ssllabs.com/ssltest/
- Enter your domain
- Should get A or A+ rating

### Test 3: Force HTTPS
Try visiting: `http://your-new-domain.com`
- Should automatically redirect to `https://`

---

## 🗄️ DATABASE MIGRATION

If you need to migrate data to production database:

### Option A: Using Prisma

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (if needed)
npx prisma db seed
```

### Option B: Direct SQL Import

```bash
# Export from development
pg_dump dev_database > backup.sql

# Import to production
psql production_database < backup.sql
```

---

## 🔑 ENVIRONMENT VARIABLES CHECKLIST

Make sure all these are set in production:

### Required:
- [ ] `NEXTAUTH_URL` - Your new domain URL
- [ ] `NEXTAUTH_SECRET` - Secure random string
- [ ] `DATABASE_URL` - Production database connection
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth
- [ ] `GOOGLE_CLIENT_SECRET` - Google OAuth

### Optional (but recommended):
- [ ] `EMAIL_SERVER_*` - Email configuration
- [ ] `NEXT_PUBLIC_APP_URL` - Public app URL
- [ ] `PADDLE_VENDOR_ID` - After Paddle approval
- [ ] `PADDLE_API_KEY` - After Paddle approval

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 📧 EMAIL CONFIGURATION

If using email sign-in or notifications:

### Using Gmail SMTP:

```env
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@your-new-domain.com
```

**Note:** For Gmail, you need to create an "App Password":
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Create new
4. Use that password in `EMAIL_SERVER_PASSWORD`

### Using SendGrid/Mailgun:
Configure according to their documentation.

---

## 🎨 CUSTOM DOMAIN DNS SETUP

### If using Vercel:

1. **Add Domain in Vercel:**
   - Project → Settings → Domains
   - Add your domain

2. **Update DNS at your registrar:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation:**
   - Usually 15 minutes - 2 hours
   - Can take up to 48 hours

4. **Verify:**
   ```bash
   dig your-new-domain.com
   ```

---

## 🧪 POST-DEPLOYMENT TESTING

### Test all critical paths:

1. **Homepage:**
   - [ ] Loads correctly
   - [ ] Hero section displays
   - [ ] All images load

2. **Pricing Page:**
   - [ ] All plans show correctly
   - [ ] Monthly/Yearly toggle works
   - [ ] Subscribe buttons work

3. **Legal Pages:**
   - [ ] Privacy Policy loads
   - [ ] Terms of Service loads
   - [ ] Refund Policy loads

4. **Navigation:**
   - [ ] Footer links work
   - [ ] Header links work
   - [ ] All internal links work

5. **Authentication:**
   - [ ] Google sign-in works
   - [ ] Email sign-in works
   - [ ] Sign out works

6. **User Features:**
   - [ ] Text transformation works
   - [ ] AI detection works
   - [ ] History saves correctly

---

## 🐛 TROUBLESHOOTING

### Issue: Site not loading

**Check:**
1. DNS propagation: `dig your-domain.com`
2. Vercel deployment status
3. Build logs for errors

### Issue: SSL not working

**Check:**
1. Vercel SSL certificate status
2. DNS configured correctly
3. Force HTTPS redirect enabled

### Issue: Environment variables not working

**Check:**
1. Variables set in Vercel dashboard
2. Redeployed after adding variables
3. Variable names match exactly (case-sensitive)

### Issue: Database connection fails

**Check:**
1. `DATABASE_URL` correct
2. Database allows connections from Vercel IPs
3. Prisma client generated

### Issue: OAuth not working

**Check:**
1. Google OAuth redirect URIs updated
2. Includes new domain
3. `NEXTAUTH_URL` matches exactly

---

## 🔄 UPDATING OAUTH PROVIDERS

### Google OAuth:

1. Go to Google Cloud Console
2. APIs & Services → Credentials
3. Edit OAuth 2.0 Client ID
4. Add new Authorized redirect URI:
   ```
   https://your-new-domain.com/api/auth/callback/google
   ```
5. Save changes

### Update in your code:
No changes needed - Next-Auth handles this automatically.

---

## 📦 DEPLOYMENT COMMANDS REFERENCE

### First-time deployment:
```bash
vercel --prod
```

### Subsequent deployments:
```bash
git add .
git commit -m "Update description"
git push origin paddle-final
vercel --prod
```

### Environment variables:
```bash
# Add new variable
vercel env add VARIABLE_NAME

# Pull variables to local
vercel env pull
```

### View deployment logs:
```bash
vercel logs
```

---

## 🎯 PADDLE INTEGRATION SETUP

### After domain approval from Paddle:

1. **Get Paddle credentials:**
   - Vendor ID
   - API Key
   - Sandbox keys for testing

2. **Add to environment variables:**
   ```env
   NEXT_PUBLIC_PADDLE_VENDOR_ID=your-vendor-id
   PADDLE_API_KEY=your-api-key
   PADDLE_PUBLIC_KEY=your-public-key
   ```

3. **Update Paddle checkout:**
   ```typescript
   // In your checkout component
   Paddle.Setup({
     vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
     eventCallback: handlePaddleCallback
   })
   ```

4. **Configure webhook:**
   - Paddle Dashboard → Developer Tools → Webhooks
   - Add webhook URL: `https://your-domain.com/api/paddle/webhook`

---

## ✅ FINAL DEPLOYMENT CHECKLIST

Before submitting to Paddle:

### Technical:
- [ ] Site deployed successfully
- [ ] HTTPS working with valid certificate
- [ ] All pages loading without errors
- [ ] Navigation links all working
- [ ] Database connected and working
- [ ] Authentication working
- [ ] Environment variables all set

### Content:
- [ ] Privacy Policy accessible
- [ ] Terms of Service accessible
- [ ] Refund Policy accessible
- [ ] Pricing page showing all plans
- [ ] Product description clear
- [ ] Contact email working

### Testing:
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested all user flows
- [ ] No console errors
- [ ] Performance acceptable

### Paddle Preparation:
- [ ] Screenshot of pricing page taken
- [ ] Domain ready for submission
- [ ] All compliance items checked

---

## 🚀 DEPLOYMENT TIMELINE

**Estimated total time:** 1-3 hours

- Environment setup: 15 minutes
- Vercel deployment: 10 minutes
- DNS configuration: 15 minutes
- DNS propagation wait: 15 min - 2 hours
- SSL verification: 5 minutes
- Testing: 30 minutes
- OAuth setup: 15 minutes

---

## 📞 SUPPORT RESOURCES

### Vercel:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Next.js:
- Docs: https://nextjs.org/docs
- Deployment: https://nextjs.org/docs/deployment

### Paddle:
- Docs: https://developer.paddle.com
- Support: sellers@paddle.com

---

## 🎉 YOU'RE READY TO DEPLOY!

Follow these steps in order, and your site will be live on the new domain with SSL working correctly. Once deployed, you can immediately proceed with Paddle domain submission.

**Good luck! 🚀**

---

**Document Version:** 1.0
**Last Updated:** October 24, 2025
**Branch:** paddle-final
