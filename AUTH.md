# Current Auth Setup

## What We're Using

**NextAuth.js** with **PrismaAdapter** + **JWT strategy**

- `lib/auth.ts` - Auth configuration
- `lib/prisma.ts` - Database client
- Database: **Supabase Postgres** (via Prisma)
- Session: **JWT** (stored in encrypted cookie)

---

## Providers

1. **Google OAuth** - Sign in with Google
2. **Email Magic Link** - Passwordless email login (via Resend)

---

## How It Works

### 1. User Clicks "Sign in with Google"

```
User → /api/auth/signin/google → Redirects to Google
```

### 2. Google OAuth Flow

```
Google approval → Google redirects back to:
/api/auth/callback/google?code=xxx
```

### 3. NextAuth Callback Processing ⚠️ (THE SLOW PART)

```typescript
// What happens in /api/auth/callback/google:

1. PrismaAdapter connects to Supabase (via pgbouncer)
2. Query: Find user by email
3. Query: Find Google account link
4. Query: Create/update user if needed
5. Query: Create/update account link
6. Create JWT with user ID
7. Set JWT cookie
8. Redirect to homepage

// 4-6 database queries = ~5 seconds total
```

### 4. Homepage Loads

```
- JWT cookie contains user ID
- No database query needed (JWT strategy)
- ProfileInitializer fetches profile data in background
```

---

## Database Schema

### User Table
```sql
User {
  id: String (cuid)
  email: String (unique)
  name: String?
  image: String?
  role: UserRole (USER/ADMIN/TESTER)
}
```

### Account Table (OAuth Links)
```sql
Account {
  userId: String
  provider: String ('google')
  providerAccountId: String (Google's user ID)
  access_token: String?
  refresh_token: String?
}
```

### Profile Table (App Data)
```sql
Profile {
  user_id: String (unique)
  words_balance: Int
  subscription_plan: String?
  subscription_status: String?
  ...
}
```

---

## Session Management

### JWT Strategy
- Session stored in **encrypted HTTP-only cookie**
- No database queries to check auth
- Contains: user ID, email, name
- Expires: 30 days

### Checking if User is Logged In

**Client-side:**
```typescript
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()
// status: 'loading' | 'authenticated' | 'unauthenticated'
```

**Server-side:**
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const session = await getServerSession(authOptions)
```

---

## Profile Data Flow

### 1. User Signs In
- User record created in database
- Profile record created in database (via `/api/profile` lazy creation)
- JWT cookie set with user ID

### 2. Homepage Loads
- `ProfileInitializer` component runs (client-side)
- Fetches from `/api/profile`
- Stores in Zustand store

### 3. Subsequent Page Loads
- Profile data read from Zustand store (instant)
- No database queries needed
- Header shows balance immediately

---

## Key Files

```
lib/
├── auth.ts              # NextAuth configuration
├── prisma.ts            # Prisma client

app/
├── api/
│   ├── auth/[...nextauth]/route.ts  # NextAuth API routes (auto-generated)
│   └── profile/route.ts             # Profile CRUD API

components/
├── AuthProvider.tsx     # Wraps app with SessionProvider
└── ProfileInitializer.tsx  # Loads profile data on login

store/
└── profileStore.ts      # Zustand store for profile data
```

---

## Auth Callbacks

### JWT Callback
```typescript
async jwt({ token, user, account }) {
  if (user) {
    token.id = user.id  // Store user ID in JWT
  }
  return token
}
```

### Session Callback
```typescript
async session({ session, token }) {
  if (token.id) {
    session.user.id = token.id  // Add user ID to session object
  }
  return session
}
```

---

## Current Problems

1. **PrismaAdapter makes 4-6 database queries during OAuth** (~2-3 seconds)
2. **Using pgbouncer connection pooler** (adds ~100ms per query)
3. **Sequential database operations** (not parallelized)
4. **Database in EU North** (latency if user is far away)
5. **Serverless cold starts** (~500-1000ms)

**Total OAuth time: ~5 seconds** ⚠️

---

## Why It's Slow

```
OAuth Callback Timeline:
├─ 500-1000ms: Serverless function cold start
├─ 300-500ms: Initialize Prisma client
├─ 200-400ms: Connect to database (pgbouncer)
├─ 200-400ms: Query user
├─ 200-400ms: Query account
├─ 200-400ms: Create/update user
├─ 200-400ms: Create/update account
├─ 50ms: Create JWT
└─ 100ms: Redirect

TOTAL: ~2550-4050ms (just for database operations)
```

---

## How Other Sites Do It Faster

They **DON'T query the database during OAuth callback**:

1. Accept OAuth token from Google
2. Create JWT immediately (no DB)
3. Redirect user instantly (~1 second)
4. Create user record in background (async)

We're doing all database operations **before** redirecting, which blocks the user.

---

## Potential Solutions

### Quick Win (~1 second improvement)
- Use direct database connection instead of pgbouncer
- Add database indexes

### Big Fix (~3 second improvement)
- Remove PrismaAdapter
- Don't create user during OAuth callback
- Create user lazily on first API request
- Store minimal data in JWT

### Nuclear Option (most complex)
- Switch to Supabase Auth entirely
- Replace NextAuth
