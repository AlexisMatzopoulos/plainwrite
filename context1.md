# Natural Write - Implementation Context

## Project Overview
Next.js 15 + TypeScript + Tailwind CSS application that converts AI-generated text to natural, human-like writing. Frontend is complete, backend authentication is implemented, now need to build core API functionality.

## Current Implementation Status

### ✅ Completed
1. **Database Setup (Supabase + Prisma)**
   - PostgreSQL hosted on Supabase
   - Prisma ORM configured
   - Database migrations run successfully
   - Connection: Session pooler at `aws-1-eu-central-2.pooler.supabase.com:5432`

2. **Database Schema** (`prisma/schema.prisma`)
   ```prisma
   model User {
     id            String    @id @default(cuid())
     email         String?   @unique
     name          String?
     image         String?
     accounts      Account[]
     sessions      Session[]
     profile       Profile?
   }

   model Profile {
     id                       String    @id @default(uuid())
     createdAt                DateTime  @default(now())
     updatedAt                DateTime  @updatedAt
     user_id                  String    @unique
     subscription_plan        String?
     subscription_status      String?
     words_balance            Int       @default(500)
     extra_words_balance      Int       @default(0)
     stripe_customer_id       String?
     subscription_canceled    Boolean   @default(false)
     userStyle                String?
     undetectable_style_id    String?
     words_limit              Int       @default(500)
     words_per_request        Int       @default(500)
     subscription_paused      Boolean   @default(false)
     subscription_valid_until DateTime?
     user                     User      @relation(fields: [user_id], references: [id])
   }
   ```
   - Also includes NextAuth models: Account, Session, VerificationToken

3. **Authentication (NextAuth.js + Google OAuth)**
   - `/app/api/auth/[...nextauth]/route.ts` - NextAuth handler
   - `/lib/auth.ts` - Auth configuration with Google provider
   - `/lib/prisma.ts` - Prisma client singleton
   - Auto-creates Profile with 500 free words on signup
   - Session strategy: database
   - Frontend updated to use `useSession()` hook

4. **API Routes Implemented**
   - `GET /api/profile` - Fetch user profile
   - `PATCH /api/profile` - Update profile (userStyle, undetectable_style_id)

   **Example Profile Response:**
   ```json
   {
     "profile": {
       "id": "uuid",
       "createdAt": "2025-10-06T14:42:21.954Z",
       "updatedAt": "2025-10-06T14:46:40.472Z",
       "user_id": "cuid",
       "subscription_plan": null,
       "subscription_status": null,
       "words_balance": 127,
       "extra_words_balance": 0,
       "stripe_customer_id": null,
       "subscription_canceled": false,
       "userStyle": null,
       "undetectable_style_id": null,
       "words_limit": 500,
       "words_per_request": 500,
       "subscription_paused": false,
       "subscription_valid_until": null
     }
   }
   ```

5. **Frontend Components Updated**
   - `app/page.tsx` - Uses real auth state via `useSession()`
   - `components/Header.tsx` - Shows real word balance, Google sign-in, user profile image
   - `components/AIHumanizerSection.tsx` - Dual text editor (logged-in users)
   - `components/AIHumanizerLoggedOut.tsx` - Single text area with paste button

6. **Environment Setup**
   ```env
   DATABASE_URL="postgresql://postgres.jgrhymjnaharrxogfwve:PASSWORD@aws-1-eu-central-2.pooler.supabase.com:5432/postgres"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generated-secret"
   GOOGLE_CLIENT_ID="from-google-cloud"
   GOOGLE_CLIENT_SECRET="from-google-cloud"
   ```

## 🎯 Next Steps: API Implementation Required

### 1. `/api/humanize` - Main Text Processing Endpoint

**Request:**
```json
POST /api/humanize
{
  "text": "AI-generated text to humanize",
  "style": "standard" // optional: user preference
}
```

**Response:**
```json
{
  "humanizedText": "Natural sounding output...",
  "wordsProcessed": 150,
  "remainingBalance": 350
}
```

**Logic Required:**
- Verify user authentication (`getServerSession`)
- Count words in input text
- Check user has sufficient balance (`words_balance + extra_words_balance >= wordsProcessed`)
- Verify doesn't exceed `words_per_request` limit
- **Process text with AI** (integration point - OpenAI/Claude/custom)
- Deduct words from balance (prioritize `words_balance` first, then `extra_words_balance`)
- Save to history (need to create History model)
- Return humanized text + updated balance

### 2. History System

**Need to add to `prisma/schema.prisma`:**
```prisma
model History {
  id               String   @id @default(uuid())
  createdAt        DateTime @default(now())
  user_id          String
  original_text    String   @db.Text
  humanized_text   String   @db.Text
  words_count      Int
  style_used       String?
  user             User     @relation(fields: [user_id], references: [id])

  @@index([user_id, createdAt])
}
```

### 3. `/api/history` Endpoint

**GET Request:**
```json
GET /api/history?limit=10&offset=0
```

**Response:**
```json
{
  "history": [
    {
      "id": "uuid",
      "createdAt": "2025-10-07T...",
      "original_text": "...",
      "humanized_text": "...",
      "words_count": 150
    }
  ],
  "total": 45
}
```

### 4. `/api/ai-check` - AI Detection Endpoint

**Request:**
```json
POST /api/ai-check
{
  "text": "Text to check for AI detection"
}
```

**Response:**
```json
{
  "aiScore": 85, // percentage
  "isLikelyAI": true,
  "detectors": {
    "turnitin": 90,
    "copyleaks": 80,
    "gptzero": 85
  }
}
```

## Important Technical Notes

1. **Word Counting**: Use simple split by whitespace or integrate library like `word-count`
2. **Balance Deduction Logic**:
   - If `words_balance >= wordsNeeded`: deduct from `words_balance`
   - Else: deduct what's available from `words_balance`, remainder from `extra_words_balance`
3. **Frontend Integration**:
   - `components/AIHumanizerSection.tsx` has "Humanize" and "AI Check" buttons that need connecting
   - Update word balance in Header after each operation
4. **Error Handling**: Return appropriate errors for insufficient balance, rate limits, etc.

## Frontend Files to Connect
- `components/AIHumanizerSection.tsx:114` - "Humanize" button click handler
- `components/AIHumanizerSection.tsx:119` - "AI Check" button click handler
- `components/Header.tsx:24` - Profile fetch (already implemented)

## Pricing Tiers (for reference)
- **Free**: 500 words (one-time)
- **Basic**: R79.99/month → 5,000 words/month, 500 words/request
- **Pro**: R239.99/month → 15,000 words/month, 1,500 words/request
- **Ultra**: R479.99/month → 30,000 words/month, 3,000 words/request

## AI Integration Options
User hasn't specified which AI service to use. Options:
1. OpenAI GPT-4/3.5 with custom prompt for humanization
2. Anthropic Claude with humanization prompt
3. Custom fine-tuned model
4. Third-party humanization API

**Recommendation**: Create endpoint structure with placeholder AI processing, make it easy to swap AI provider.

## Files Structure
```
naturalwrite/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts ✅
│   │   ├── profile/route.ts ✅
│   │   ├── humanize/route.ts ⬜ TODO
│   │   ├── history/route.ts ⬜ TODO
│   │   └── ai-check/route.ts ⬜ TODO
├── lib/
│   ├── auth.ts ✅
│   ├── prisma.ts ✅
│   └── wordCounter.ts ⬜ TODO (utility)
├── prisma/
│   └── schema.prisma ✅ (needs History model added)
└── components/
    ├── AIHumanizerSection.tsx (needs API integration)
    └── Header.tsx ✅
```

## Database Connection String Format
```
postgresql://postgres.jgrhymjnaharrxogfwve:PASSWORD@aws-1-eu-central-2.pooler.supabase.com:5432/postgres
```
- Using Session pooler (not Direct connection)
- Port: 5432
- Password needs URL encoding (@ becomes %40)

## Start Implementation With
1. Add History model to Prisma schema
2. Run migration: `npx prisma migrate dev --name add_history`
3. Create `/api/humanize` endpoint with all logic
4. Create `/api/history` endpoint
5. Update `AIHumanizerSection.tsx` to call `/api/humanize`
6. Optionally: Create `/api/ai-check` endpoint

This should give you everything needed to continue from this exact point.
