# Natural Write - Technical Summary

## Project Overview
Natural Write is an AI Humanizer web application built with Next.js 15, TypeScript, and Tailwind CSS. The application converts AI-generated text into human-like writing that bypasses AI detection tools.

## Technology Stack

### Core Technologies
- **Next.js 15.5.4** - React framework with App Router architecture
- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 3.4.0** - Utility-first CSS framework (Note: Using v3.4, not v4 due to PostCSS plugin compatibility)

### Development Tools
- **npm** - Package manager
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Project Structure

```
naturalwrite/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage (with auth state logic)
│   ├── pricing/
│   │   └── page.tsx         # Pricing page
│   └── globals.css          # Global styles and Tailwind directives
├── components/
│   ├── Header.tsx           # Navigation header (auth-aware)
│   ├── Footer.tsx           # Footer with links
│   ├── HeroSection.tsx      # Hero section (auth-aware)
│   ├── AIHumanizerSection.tsx          # Dual text editor (logged-in)
│   ├── AIHumanizerLoggedOut.tsx        # Single text area (logged-out)
│   ├── DetectorsSection.tsx            # AI detector logos
│   ├── StepsSection.tsx                # 3-step process cards
│   ├── FeaturesSection.tsx             # Feature highlights
│   ├── UniversitiesSection.tsx         # University logos
│   ├── TestimonialsSection.tsx         # User testimonials (auth-aware)
│   ├── CTASection.tsx                  # CTA before FAQ (logged-out only)
│   ├── FAQSection.tsx                  # Accordion FAQ
│   ├── PricingCard.tsx                 # Reusable pricing tier card
│   └── PricingSection.tsx              # Pricing with monthly/annual toggle
├── public/
│   └── images/              # All static images
├── tailwind.config.js       # Tailwind configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Authentication States

The application supports two authentication states, controlled by the `isLoggedIn` boolean prop:

### Logged-Out State (Default)
- Header shows "Log in" and "Try for free" buttons
- Hero section displays "Trusted by 350,000+ users" badge with gradient text
- Single text area with overlay "Paste Text" button
- Testimonials section has radial gradient background
- CTA section appears before FAQ
- Hero CTA button says "Start for free"

### Logged-In State
- Header shows balance (500 words), "Get more words" button, history icon, and user profile
- Hero section has no badge
- Dual text editor interface (input/output)
- Testimonials section has simple gradient background
- No CTA section before FAQ
- Hero CTA button says "Get more words"

**Current State:** Application is set to logged-out (`isLoggedIn = false` in `app/page.tsx:19`)

## Component Details

### Layout Components

#### Header (`components/Header.tsx`)
- **Props:** `isLoggedIn?: boolean` (default: false)
- **Features:**
  - Responsive navigation with mobile menu
  - Logo and navigation links (AI Humanizer, Blog, Contact, Pricing, API)
  - Conditional rendering based on authentication
  - Mobile, tablet, and desktop breakpoints
- **Auth States:**
  - Logged out: "Log in" and "Try for free" buttons
  - Logged in: Balance display, "Get more words" button, history link, user profile

#### Footer (`components/Footer.tsx`)
- **Props:** None
- **Features:**
  - Logo and description
  - Product links (AI Humanizer, AI Detector, Pricing)
  - Company links (Blog, Contact, Affiliate Program)
  - Legal links (Terms of Service, Privacy Policy)
  - Copyright notice

### Hero & Main Sections

#### HeroSection (`components/HeroSection.tsx`)
- **Props:** `isLoggedIn?: boolean` (default: false)
- **Features:**
  - Main heading and description
  - CTA button (changes based on auth state)
  - Conditional badge for logged-out users
- **Styling:** Background gradient from `/images/gradient.webp`

#### AIHumanizerSection (`components/AIHumanizerSection.tsx`)
- **Props:** None (shown only when logged in)
- **Features:**
  - Client component with state management
  - Dual text areas (input/output)
  - Word counter for input text
  - "Humanize" button (primary action)
  - "AI Check" button (secondary action)
  - Output controls: Copy and Download buttons

#### AIHumanizerLoggedOut (`components/AIHumanizerLoggedOut.tsx`)
- **Props:** None (shown only when logged out)
- **Features:**
  - Client component with state management
  - Single text area
  - Centered "Paste Text" button overlay (visible when empty)
  - Clipboard API integration for pasting

### Content Sections

#### DetectorsSection (`components/DetectorsSection.tsx`)
- **Props:** None
- **Features:**
  - Displays logos of AI detectors (Turnitin, Copyleaks, Originality.ai, GPTZero, ZeroGPT, Writer)
  - Responsive grid layout
  - Uses Next.js Image component for optimization

#### StepsSection (`components/StepsSection.tsx`)
- **Props:** None
- **Features:**
  - 3-step process cards
  - Each card has step number, title, description, and image
  - Responsive grid layout

#### FeaturesSection (`components/FeaturesSection.tsx`)
- **Props:** None
- **Features:**
  - Alternating image/text layout
  - 4 feature highlights
  - Left/right image positioning based on config

#### UniversitiesSection (`components/UniversitiesSection.tsx`)
- **Props:** None
- **Features:**
  - University logos in responsive grid
  - Demonstrates credibility and reach

#### TestimonialsSection (`components/TestimonialsSection.tsx`)
- **Props:** `isLoggedIn?: boolean` (default: false)
- **Features:**
  - 3 user testimonials in card layout
  - Quote icon, testimonial text, and author name
  - Conditional background styling based on auth state
- **Auth States:**
  - Logged out: Radial gradient with gradient.webp background
  - Logged in: Simple gradient background

#### CTASection (`components/CTASection.tsx`)
- **Props:** None (shown only when logged out)
- **Features:**
  - "Make Your Text Sound Human — Instantly" heading
  - Description text
  - "Start for free" CTA button
  - "500 words for free. No credit card required" subtext
  - Gradient background

#### FAQSection (`components/FAQSection.tsx`)
- **Props:** None
- **Features:**
  - Client component with accordion functionality
  - 9 FAQ items
  - Expandable/collapsible answers
  - Smooth transitions

### Pricing Components

#### PricingSection (`components/PricingSection.tsx`)
- **Props:** None
- **Features:**
  - Client component with billing period toggle
  - Monthly/Annual pricing switch
  - "Save 50%" badge on annual option
  - Renders 3 PricingCard components
  - Gradient background
  - Contact and legal links in footer

#### PricingCard (`components/PricingCard.tsx`)
- **Props:**
  - `name: string` - Plan name (Basic, Pro, Ultra)
  - `wordsPerMonth: string` - Word limit display
  - `originalPrice?: string` - Strikethrough price (optional, for annual only)
  - `price: string` - Current price
  - `features: string[]` - List of features
  - `isPopular?: boolean` - Shows "MOST POPULAR" badge
  - `billingPeriod: 'month' | 'year'` - Affects pricing text
- **Features:**
  - Responsive card design
  - Conditional pricing display (strikethrough for annual)
  - Feature list with checkmarks
  - "Subscribe" CTA button
  - Popular badge for Pro plan

## Pricing Tiers

### Monthly Pricing
- **Basic:** R79.99/month (5,000 words/month, 500 words/request)
- **Pro:** R239.99/month (15,000 words/month, 1,500 words/request) - MOST POPULAR
- **Ultra:** R479.99/month (30,000 words/month, 3,000 words/request)

### Annual Pricing (50% off)
- **Basic:** ~~R79.99~~ R39.99/month (billed annually)
- **Pro:** ~~R239.99~~ R119.99/month (billed annually) - MOST POPULAR
- **Ultra:** ~~R479.99~~ R239.99/month (billed annually)

## Styling Approach

### Tailwind Configuration
- Content paths configured for `app/**` and `components/**`
- Custom font family using CSS variables
- Extended theme capabilities

### Design System
- **Primary Color:** Green-500 (#10b981 equivalent)
- **Text Colors:**
  - Primary: slate-900/slate-950
  - Secondary: slate-700
  - Muted: slate-500
- **Borders:** slate-300
- **Backgrounds:** White with gradient overlays
- **Gradients:**
  - Orange to green (badges, accents)
  - Radial gradients (testimonials)
  - Background gradient image (`/images/gradient.webp`)

### Responsive Breakpoints
- Mobile-first approach
- sm: 640px
- md: 768px
- lg: 1024px
- Container max-width with padding

## Key Features Implemented

### 1. Authentication-Aware UI
- Components conditionally render based on `isLoggedIn` prop
- Different user experiences for logged-in and logged-out states
- Centralized state management in `app/page.tsx`

### 2. Interactive Components
- Mobile menu toggle (Header)
- FAQ accordion (FAQSection)
- Pricing period toggle (PricingSection)
- Clipboard paste functionality (AIHumanizerLoggedOut)
- Word counter (AIHumanizerSection)

### 3. Image Optimization
- Using Next.js Image component throughout
- Proper width/height attributes
- Lazy loading by default

### 4. SEO & Metadata
- Configured OpenGraph and Twitter cards
- Page-specific metadata (Homepage, Pricing)
- Favicon configured

## Routes

### Implemented
- `/` - Homepage (logged-out state by default)
- `/pricing` - Pricing page

### Referenced (Not Yet Implemented)
- `/api/auth/signin` - Authentication endpoint
- `/history` - Generation history
- `/profile` - User profile
- `/blog` - Blog page
- `/terms-of-service` - Terms of Service
- `/privacy-policy` - Privacy Policy

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Server runs on http://localhost:3000 (or next available port)

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Known Issues & Notes

### Tailwind CSS Version
- **Issue:** Initial setup used Tailwind v4 which caused PostCSS plugin errors
- **Resolution:** Downgraded to Tailwind CSS v3.4.0
- **Command Used:** `npm uninstall tailwindcss && npm install -D tailwindcss@^3.4.0`

### Port Conflicts
- Dev server may use port 3001 if 3000 is occupied
- Multiple lockfiles warning (bun.lockb and package-lock.json) - can be safely ignored for now

### Monthly Pricing Display
- **Issue:** Monthly pricing initially showed strikethrough prices
- **Resolution:** Made `originalPrice` optional in PricingCard, removed from monthly data

## Next Steps (Backend Integration)

### Authentication
1. Implement actual authentication system (NextAuth.js recommended)
2. Replace hardcoded `isLoggedIn = false` with real auth state
3. Protect authenticated routes
4. Add login/signup flows

### API Integration
1. Connect "Humanize" button to backend API
2. Implement AI text processing endpoint
3. Add word balance tracking and deduction
4. Implement history saving
5. Add AI detection checking functionality

### Database
1. User accounts and authentication
2. Word balance tracking
3. Generation history storage
4. Subscription management

### Payment Integration
1. Stripe/PayPal integration for subscriptions
2. Subscription tier management
3. Word package purchases
4. Billing history

### Additional Features
1. User profile management
2. Generation history page
3. Download functionality for humanized text
4. Copy to clipboard functionality
5. API access for developers
6. Blog CMS integration
7. Admin dashboard

## File References

### Configuration Files
- `package.json` - Dependencies: next@15.5.4, react@19, tailwindcss@3.4.0
- `tailwind.config.js` - Content paths, theme extensions
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript strict mode enabled

### Key Components to Modify for Auth Integration
- `app/page.tsx:19` - Update `isLoggedIn` state with real auth
- `components/Header.tsx` - Update auth links and user profile
- `components/AIHumanizerSection.tsx` - Connect to backend API
- `components/AIHumanizerLoggedOut.tsx` - Add sign-up prompts

## Assets Location
All images are stored in `public/images/`:
- Logo: `logo.fd02a639.svg`
- Background: `gradient.webp`
- Detectors: `turnitin.webp`, `copyleaks.webp`, etc.
- Steps: `step1.webp`, `step2.webp`, `step3.webp`
- Features: `feature1.webp` through `feature4.webp`
- Universities: `oxford.webp`, `harvard.webp`, etc.
- Metadata: `opengraph-image.png`, `twitter-image.png`

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- Clipboard API (for paste functionality)
- CSS Grid and Flexbox

---

**Last Updated:** 2025-10-06
**Version:** 1.0.0 (Initial Implementation)
