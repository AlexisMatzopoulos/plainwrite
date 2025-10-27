# Prisma + Supabase Setup Guide

This guide follows the official [Supabase Prisma Quickstart](https://supabase.com/docs/guides/database/connecting-to-postgres#prisma).

## Prerequisites

- Active Supabase project
- Database credentials from Supabase Dashboard

## Step 1: Create Custom Prisma User

**Why?** Using a custom user gives you better control and makes it easier to monitor queries in Supabase tools.

### 1.1 Generate a Strong Password

```bash
openssl rand -base64 32
```

Save this password securely - you'll need it for your `.env` file.

### 1.2 Run SQL in Supabase

Go to your Supabase Dashboard → **SQL Editor** and execute:

```sql
-- Create custom prisma user (REPLACE 'your_strong_password_here' with actual password!)
create user "prisma" with password 'your_strong_password_here' bypassrls createdb;

-- Extend prisma's privileges to postgres (view changes in Dashboard)
grant "prisma" to "postgres";

-- Grant permissions on public schema
grant usage on schema public to prisma;
grant create on schema public to prisma;
grant all on all tables in schema public to prisma;
grant all on all routines in schema public to prisma;
grant all on all sequences in schema public to prisma;

-- Set default privileges for future objects
alter default privileges for role postgres in schema public grant all on tables to prisma;
alter default privileges for role postgres in schema public grant all on routines to prisma;
alter default privileges for role postgres in schema public grant all on sequences to prisma;
```

✅ **Confirm Success:** You should see "Success. No rows returned" message.

## Step 2: Get Your Connection Strings

### 2.1 Find Your Connection Info

In Supabase Dashboard:
1. Go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab

### 2.2 Connection String Format

Your connection strings will use the `prisma` user you just created.

**Base format:**
```
postgres://prisma.[PROJECT-REF]:[PRISMA-PASSWORD]@[REGION].pooler.supabase.com:[PORT]/postgres
```

**Ports:**
- **5432** = Session mode (server deployments, migrations)
- **6543** = Transaction mode (serverless deployments with `?pgbouncer=true`)

### 2.3 Find Your Values

Replace these placeholders:
- `[PROJECT-REF]`: Your Supabase project reference (e.g., `mduwmutebmietckwzbqx`)
- `[PRISMA-PASSWORD]`: Password you created in Step 1.1
- `[REGION]`: Your database region (e.g., `aws-1-eu-north-1`)
- `[PORT]`: Either 5432 or 6543 depending on deployment type

## Step 3: Update Your .env File

**Choose the configuration based on your deployment type:**

### Option A: Server-Based Deployment (VPS, Dedicated Server, Docker)

Use Session mode (port 5432) for your application:

```env
# Used for Prisma Migrations and within your application
DATABASE_URL="postgres://prisma.[PROJECT-REF]:[PRISMA-PASSWORD]@[REGION].pooler.supabase.com:5432/postgres"
```

**That's it!** You only need DATABASE_URL for server-based deployments.

---

### Option B: Serverless Deployment (Vercel, Netlify, AWS Lambda)

Use Transaction mode (port 6543) with `pgbouncer=true` for your application:

```env
# Used for your serverless application (Transaction mode with pgbouncer)
DATABASE_URL="postgres://prisma.[PROJECT-REF]:[PRISMA-PASSWORD]@[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Used for Prisma Migrations (Session mode)
DIRECT_URL="postgres://prisma.[PROJECT-REF]:[PRISMA-PASSWORD]@[REGION].pooler.supabase.com:5432/postgres"
```

**Important:**
- DATABASE_URL uses port **6543** with `?pgbouncer=true` parameter
- DIRECT_URL uses port **5432** for running migrations

---

### Placeholder Replacements

For both options, replace:
- `[PROJECT-REF]`: Your Supabase project reference (e.g., `mduwmutebmietckwzbqx`)
- `[PRISMA-PASSWORD]`: Password from Step 1.1
- `[REGION]`: Your database region (e.g., `aws-1-eu-north-1`)

**⚠️ Security:** Never commit your `.env` file to git!

## Step 4: Update Prisma Schema

### For Server-Based Deployment:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### For Serverless Deployment:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

✅ **Already configured for serverless** in your schema! If you're doing server-based deployment, you can remove the `directUrl` line.

## Step 5: Test the Connection

### 5.1 Generate Prisma Client

```bash
npx prisma generate
```

### 5.2 Test Database Connection

```bash
npx prisma db pull
```

This should show your existing tables without errors.

### 5.3 Push Schema (if starting fresh)

```bash
npx prisma db push
```

Or create a migration:

```bash
npx prisma migrate dev --name init
```

## Troubleshooting

### Error: "Can't reach database server"

**Causes:**
- Incorrect connection string
- Wrong password
- Database not accessible

**Fix:**
1. Verify your connection string format
2. Check password doesn't contain special characters that need URL encoding
3. Ensure Supabase project is running

### Error: "permission denied for schema public"

**Cause:** Prisma user doesn't have proper permissions.

**Fix:** Re-run the SQL from Step 1.2

### Error: "password authentication failed"

**Cause:** Wrong password in connection string.

**Fix:**
1. Verify password in `.env` matches Step 1.1
2. URL-encode special characters if needed:
   - `/` → `%2F`
   - `?` → `%3F`
   - `@` → `%40`

### Connection String URL Encoding

If your password contains special characters, encode them:

```bash
# Example with special characters
password: my/pass?word

# Encoded:
my%2Fpass%3Fword
```

## Best Practices

✅ **DO:**
- Use the custom `prisma` user (not `postgres`)
- Use Session pooler (5432) for application
- Use Transaction pooler (6543) for migrations
- Store passwords securely
- URL-encode special characters in passwords

❌ **DON'T:**
- Commit `.env` file to git
- Use `postgres` user in production
- Hard-code connection strings

## Additional Resources

- [Supabase Prisma Guide](https://supabase.com/docs/guides/database/connecting-to-postgres#prisma)
- [Prisma Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#pgbouncer)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
