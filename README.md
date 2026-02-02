# Level Up! - Pre-Teen Life Skills App

A gamified web application teaching 10-12 year olds emotional intelligence, communication skills, and resilience.

## Features

- 🎮 **8 Interactive Levels** - Iceberg, Feelings Detective, Say It Right, Trust Builder, You're Awesome, Friend Zone, Chill Out, Make a Deal
- ⭐ **Gamification** - Stars, badges, streaks, and achievements
- 📊 **Progress Tracking** - Daily mood logging, mission completion
- 👨‍👩‍👧 **Parent Connection** - Share link to parent program
- 💳 **Subscription System** - Stripe payments with free trial
- 🔐 **User Authentication** - Supabase Auth

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **State**: Zustand

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Project Settings > API
3. Copy your `Project URL` and `anon public` key

### 3. Set Up Stripe

1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to Developers > API keys
3. Copy your `Publishable key` and `Secret key`
4. Create products in Stripe Dashboard:
   - Level Up! Monthly ($9.99/month)
   - Level Up! Yearly ($95.99/year)
5. Copy the Price IDs for each product

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (from Supabase > Settings > Database)
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Stripe Price IDs
STRIPE_PRICE_CHILD_MONTHLY=price_xxx
STRIPE_PRICE_CHILD_YEARLY=price_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Set Up Database

Generate Prisma client and push schema:

```bash
npm run db:generate
npm run db:push
```

### 6. Set Up Stripe Webhooks (for local development)

Install Stripe CLI:

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe
```

Forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables in Vercel dashboard
4. Deploy!

### Set Up Production Stripe Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to Vercel environment variables

---

## Project Structure

```
level-up-app/
├── app/
│   ├── api/
│   │   ├── checkout/          # Stripe checkout
│   │   ├── portal/            # Stripe customer portal
│   │   ├── webhooks/stripe/   # Stripe webhooks
│   │   └── user/
│   │       ├── progress/      # Progress sync
│   │       └── subscription/  # Subscription check
│   ├── auth/
│   │   ├── callback/          # OAuth callback
│   │   ├── login/
│   │   └── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── levels/
│   ├── screens/
│   └── ui/
├── lib/
│   ├── levels.ts              # Level data
│   ├── prisma.ts              # Database client
│   ├── store.ts               # Zustand store
│   ├── stripe.ts              # Stripe utilities
│   └── supabase.ts            # Supabase client
├── prisma/
│   └── schema.prisma          # Database schema
└── public/
```

---

## Customization

### Adding New Levels

1. Add level data to `lib/levels.ts`
2. Create component in `components/levels/`
3. Import in `components/levels/index.ts`
4. Add to `levelComponents` in `components/screens/LevelScreen.tsx`

### Changing Pricing

1. Update products in Stripe Dashboard
2. Update `PLANS` object in `lib/stripe.ts`
3. Update price display in components

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme.

---

## Support

For issues or questions, please open a GitHub issue.

## License

MIT License - Feel free to use and modify for your own projects.
