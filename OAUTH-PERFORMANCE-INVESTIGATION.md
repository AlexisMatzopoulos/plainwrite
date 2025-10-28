# OAuth Performance Investigation & Optimization Plan

## Current Problem
- **Current OAuth time:** ~5 seconds
- **Competitor OAuth time:** ~1 second
- **Target:** < 2 seconds
- **Gap to close:** 3-4 seconds

---

## What Happens During OAuth (Detailed Timeline)

### Step 1: User clicks "Sign in with Google" (~0ms)
- Browser redirects to Google

### Step 2: Google OAuth (~500-1000ms)
- User approves (if not already approved)
- Google validates
- Google redirects to `/api/auth/callback/google`

### Step 3: NextAuth Callback Processing (~3000-4000ms) ⚠️ BOTTLENECK
This is where the 5 seconds comes from:

```typescript
// What PrismaAdapter does sequentially:
1. Cold start serverless function         (~500-1000ms on Vercel)
2. Initialize Prisma client                (~300-500ms)
3. Connect to database via pgbouncer       (~200-400ms)
4. Query: Check if account exists          (~200-400ms)
5. Query: Get user by email                (~200-400ms)
6. Query: Create/update user               (~200-400ms)
7. Query: Create/update account link       (~200-400ms)
8. JWT creation                            (~50ms)
9. Redirect to homepage                    (~100ms)

TOTAL: ~2500-4500ms just for database operations
```

### Step 4: Homepage Load
- Already slow from Step 3

---

## Root Causes Identified

### 1. **Serverless Cold Starts** (~500-1000ms)
- Vercel Edge/Serverless functions need to "wake up"
- Prisma client initialization adds overhead
- Connection pooling doesn't help cold starts

### 2. **Sequential Database Queries** (~1000-1600ms)
- PrismaAdapter makes 4-6 queries in sequence
- Each query = network round trip to EU North (Stockholm)
- Pgbouncer adds transaction overhead (~100ms per query)

### 3. **Geographic Latency** (~200-800ms)
- Database in EU North (Stockholm)
- If user is in US/Asia/Africa = high latency
- Each query has ping time

### 4. **Pgbouncer Overhead** (~400-800ms total)
- Using connection pooler (port 6543)
- Transaction mode adds latency
- Not using direct connection (port 5432)

### 5. **No Query Optimization**
- Sequential instead of parallel where possible
- No caching layer
- No optimistic user creation

---

## Why Competitors Are Faster

### What fast competitors do:
1. **Edge functions** - Run auth logic at CDN edge (closer to users)
2. **In-memory sessions** - No database during OAuth callback
3. **Lazy user creation** - Create user record AFTER redirect
4. **Batched queries** - Single query instead of 4-6
5. **Better indexes** - Optimized database lookups
6. **Regional databases** - Multiple regions, route to nearest

### What we're doing wrong:
1. **Serverless in single region** - All requests go to one region
2. **Database-backed adapter** - Requires multiple queries
3. **Sequential operations** - Everything waits for everything
4. **No caching** - Every OAuth callback hits database
5. **Pgbouncer overhead** - Using pooler for latency-sensitive ops

---

## Optimization Plan (Ordered by Impact)

### 🔥 HIGH IMPACT (Can save 2-3 seconds)

#### Option A: Remove PrismaAdapter + Lazy User Creation
**Impact:** -2000ms
**Effort:** Medium
**Risk:** Medium

```typescript
// Remove database adapter entirely
export const authOptions: NextAuthOptions = {
  // NO ADAPTER!
  providers: [GoogleProvider({...})],
  callbacks: {
    async signIn({ user, account }) {
      // Just return true - don't create anything yet
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Store minimal info in JWT
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        token.sub = user.id // Google user ID
      }
      return token
    }
  }
}

// Create user record lazily on first API call
// In /api/profile or ProfileInitializer
async function ensureUserExists(email, googleId) {
  let user = await prisma.user.findUnique({ where: { email }})
  if (!user) {
    user = await prisma.user.create({
      data: { email, /* ... */ }
    })
  }
  return user
}
```

**Pros:**
- OAuth callback becomes instant (no DB queries)
- User creation happens in background after redirect
- Scales better (no DB bottleneck)

**Cons:**
- User doesn't exist in DB until first API call
- Need to handle user creation in multiple places
- Lose some NextAuth features

---

#### Option B: Use Direct Connection + Batched Queries
**Impact:** -1000ms
**Effort:** Low
**Risk:** Low

```typescript
// Create optimized Prisma client for auth
export const prismaAuth = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL // Port 5432, not pgbouncer
    }
  }
})

// Use in auth.ts
adapter: PrismaAdapter(prismaAuth)
```

**Pros:**
- Easy to implement
- Bypasses pgbouncer overhead
- Still keeps PrismaAdapter features

**Cons:**
- Only saves ~500-800ms
- Still has sequential query problem
- Doesn't solve cold start

---

#### Option C: Move to Supabase Auth
**Impact:** -3000ms
**Effort:** High
**Risk:** High

Use Supabase's built-in auth instead of NextAuth:

```typescript
// Use Supabase Auth SDK
import { createClient } from '@supabase/supabase-js'

// OAuth is handled by Supabase (fast, optimized)
const supabase = createClient(url, anonKey)
await supabase.auth.signInWithOAuth({ provider: 'google' })
```

**Pros:**
- Supabase Auth is highly optimized
- Edge functions available
- User management built-in
- Sub-second OAuth

**Cons:**
- Complete rewrite of auth system
- Lose NextAuth features
- Migration effort

---

### ⚡ MEDIUM IMPACT (Can save 500-1000ms)

#### Option D: Add Database Indexes
**Impact:** -200-400ms
**Effort:** Very Low
**Risk:** None

```sql
-- Check if these indexes exist
CREATE INDEX IF NOT EXISTS idx_account_provider_id
ON "Account" (provider, "providerAccountId");

CREATE INDEX IF NOT EXISTS idx_user_email
ON "User" (email);

-- Check query performance
EXPLAIN ANALYZE SELECT * FROM "Account"
WHERE provider = 'google' AND "providerAccountId" = 'xxx';
```

---

#### Option E: Edge Functions (Vercel)
**Impact:** -500-1000ms
**Effort:** Medium
**Risk:** Medium

Move OAuth callback to Edge runtime:

```typescript
// app/api/auth/[...nextauth]/route.ts
export const runtime = 'edge' // Run at CDN edge
```

**Note:** Prisma doesn't fully support Edge yet, so would need Option A first

---

### 🎯 RECOMMENDED APPROACH

**Phase 1: Quick Win (1-2 hours)**
1. Switch to Direct Connection (Option B)
2. Verify database indexes (Option D)
3. Test and measure improvement

**Expected Result:** 3-4 seconds → 2-3 seconds

---

**Phase 2: Major Fix (4-6 hours)**
1. Remove PrismaAdapter (Option A)
2. Implement lazy user creation
3. Update all auth-dependent code
4. Test thoroughly

**Expected Result:** 2-3 seconds → 1-2 seconds

---

**Phase 3: Edge Optimization (Future)**
1. Move to Edge functions (Option E)
2. Consider Supabase Auth (Option C)

**Expected Result:** 1-2 seconds → < 1 second

---

## Testing Plan

### Measure Current Performance
```bash
# Add timing logs to lib/auth.ts
console.time('oauth-callback-total')
console.time('prisma-init')
// ... in callbacks
console.timeEnd('prisma-init')
console.timeEnd('oauth-callback-total')
```

### Compare Before/After
- Current: ~5000ms
- After Option B: ~3000ms (target)
- After Option A: ~1500ms (target)
- After Option A + E: ~800ms (target)

---

## Decision Matrix

| Option | Impact | Effort | Risk | Timeline | Recommendation |
|--------|--------|--------|------|----------|----------------|
| A - Remove Adapter | ⭐⭐⭐ | Medium | Medium | 4-6h | **DO THIS** |
| B - Direct Connection | ⭐⭐ | Low | Low | 1h | **START HERE** |
| C - Supabase Auth | ⭐⭐⭐ | High | High | 2-3d | Future consideration |
| D - Indexes | ⭐ | Very Low | None | 30min | **DO THIS** |
| E - Edge Functions | ⭐⭐ | Medium | Medium | 2-4h | After Option A |

---

## Immediate Action Items

1. **Add performance logging** - See what's actually slow
2. **Test direct connection** - Quick win
3. **Check database indexes** - Quick win
4. **Prototype Option A** - Biggest impact
5. **Measure each change** - Data-driven optimization

---

## Questions to Answer

1. ✅ Are we using pgbouncer? **YES - Port 6543**
2. ✅ Is database in right region? **EU North - may be far from users**
3. ❓ What's actual breakdown of 5 seconds? **Need to measure**
4. ❓ Are competitors using database-backed auth? **Probably not**
5. ❓ Can we cache OAuth results? **JWT = already kind of cached**

---

## Next Steps

**RIGHT NOW:**
1. Implement Option B (direct connection) - 30 minutes
2. Add performance logging - 15 minutes
3. Test and measure - 15 minutes

**IF STILL SLOW:**
4. Implement Option A (remove adapter) - 4 hours
5. Test and measure - 1 hour

**Target:** Get to < 2 seconds by end of today.
