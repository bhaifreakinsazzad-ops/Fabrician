# Fabrician Store Platform

Production-ready Next.js 16 storefront for Fabrician with:

- Landing + full shop browsing flow
- Product detail pages
- Persistent cart (browser local storage)
- Checkout handoff to Stripe Checkout
- Admin operations page with config readiness checks
- SEO essentials (`sitemap.xml`, `robots.txt`, metadata)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Stripe Node SDK
- Zod request validation

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy environment file and set values:

```bash
cp .env.example .env.local
```

3. Run locally:

```bash
npm run dev
```

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`
  - Example: `https://your-domain.com`
- `STRIPE_SECRET_KEY`
  - Stripe secret key for server-side checkout session creation.

Without `STRIPE_SECRET_KEY`, checkout is blocked intentionally and admin will show "Needs setup".

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Add env vars in Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL`
   - `STRIPE_SECRET_KEY`
4. Deploy.
5. Verify:
   - `/api/health`
   - `/admin` readiness cards
   - checkout flow from `/cart` -> `/checkout`

## Core Routes

- `/` - Home
- `/shop` - Catalog with filters/sort
- `/product/[slug]` - Product page
- `/cart` - Cart review
- `/checkout` - Checkout form + Stripe redirect
- `/checkout/success` - Payment success
- `/admin` - Store/admin checks
- `/api/checkout` - Stripe session creation
- `/api/health` - Basic runtime health
