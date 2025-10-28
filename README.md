# Natural Write - AI Humanizer

A Next.js application that converts AI-generated content into humanized, undetectable writing.

## Features

- 🔐 Google OAuth authentication
- 👤 User profiles with word balance tracking
- 🎯 AI text humanization (UI ready, backend integration pending)
- 📊 AI detection checking (UI ready, backend integration pending)
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Built with Next.js 15 and TypeScript
- 📱 Mobile-first design
- 💳 Subscription tiers with pricing page

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project ([Create one free](https://supabase.com/))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com/)
   - Go to Project Settings > Database
   - Copy the "Connection string" (URI format, not Transaction pooler)
   - Use the "Connection pooling" URL for better performance

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required values:
     - `DATABASE_URL`: Your Supabase connection string from step 2
     - `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
     - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
     - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Get from [Google Cloud Console](https://console.cloud.google.com/)

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (creates tables in Supabase)
npx prisma migrate dev --name init
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
plainwrite/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer component
│   ├── HeroSection.tsx       # Hero banner
│   ├── AIHumanizerSection.tsx # Main text editor
│   ├── DetectorsSection.tsx  # AI detector logos
│   ├── StepsSection.tsx      # 3-step process
│   ├── FeaturesSection.tsx   # Feature highlights
│   ├── UniversitiesSection.tsx # University logos
│   ├── TestimonialsSection.tsx # User testimonials
│   └── FAQSection.tsx        # FAQ accordion
├── public/
│   └── images/               # Static images
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React 19** - UI library
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **Supabase** - PostgreSQL database hosting

## Features to Implement

- [x] User authentication (Google OAuth)
- [x] User profile management with word balance
- [ ] Backend API integration for AI humanization
- [ ] AI text processing endpoint
- [ ] Payment processing (Stripe integration)
- [ ] Text history storage and retrieval
- [ ] Multiple AI detection integrations
- [ ] Word balance deduction on usage

## License

MIT
