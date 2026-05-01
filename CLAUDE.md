# Fabrician — Claude Code Operating Brief

## What this repository is
This repository is a **scaffold**, not the final product direction.
It contains a working React/Vite ecommerce starter that should be treated as:
- reusable route structure
- reusable UI primitives
- reusable sample data
- reusable state stores
- reusable admin placeholders

It should **not** be treated as the final experience reference.

## What the product actually needs to become
Fabrician is a **kids-first futuristic fashion commerce experience**.
The launch focus is ready-stock 0–12 months baby bodysuit-type products in Bangladesh.
The brand must feel:
- futuristic
- premium
- soft
- emotionally warm
- memorable
- visually distinct
- mobile-first
- installable from browser

The current store is too generic. Claude should rebuild the core experience so the product feels like a **soft 3D fashion world**, not a normal ecommerce template.

## Core business rules
1. Current revenue comes from ready-stock baby clothing.
2. The AI generator is **Fabrician Studio** and is in **trial / preview mode**.
3. Fabrician Studio is not yet a live custom-manufacturing ordering engine.
4. Users may explore concepts, save designs, upload references, and join early access.
5. Bangladesh-first launch. Global-ready structure later.
6. Free delivery all over Bangladesh is currently the public offer.
7. Custom-order advance payment rules are for later when custom manufacturing opens.

## What to keep from this codebase
Keep and reuse if helpful:
- route structure in `src/App.tsx`
- UI primitives in `src/components/ui`
- basic ecommerce data models in `src/types`
- product data shape in `src/data/products.ts`
- cart / wishlist / theme / auth / studio stores in `src/store`
- general app shell structure
- manifest / installable app groundwork in `public/manifest.json`

## What must be rewritten first
Rewrite these first:
- `src/pages/HomePage.tsx`
- `src/pages/ShopPage.tsx`
- `src/pages/ProductDetailPage.tsx`
- `src/pages/StudioPage.tsx`
- header / navigation / mobile shell experience
- homepage storytelling blocks
- product presentation language
- visual system / motion system / spacing system

These pages currently feel too generic and should become the product signature.

## Experience mandate
Do **not** build a normal ecommerce homepage.
Build an experience with:
- layered depth
- soft-glow surfaces
- floating product framing
- editorial storytelling
- premium motion
- futuristic but gentle tone
- cloth-inspired curves
- immersive transitions
- stronger product drama on mobile

The product should feel like a mix of:
- premium baby boutique
- futuristic fashion lab
- soft dreamlike showroom
- editorial commerce story

Avoid:
- generic Shopify structure
- clutter
- childish chaos
- neon overload
- overly technical sci-fi
- heavy unusable 3D

## Priority order
### Phase A — Experience reset
Rebuild only the signature front-facing experience first:
1. Home
2. Shop
3. Product detail
4. Fabrician Studio landing + preview flow
5. shared motion / design system
6. mobile navigation and installable shell polish

### Phase B — Commerce refinement
Then refine:
1. Cart
2. Checkout
3. Order success
4. Track order
5. Wishlist
6. Account basics

### Phase C — Admin and controls
Then refine:
1. Admin dashboard
2. Product management
3. Studio submissions management
4. Delivery / payment toggles
5. content controls

## Acceptance standard
Claude should not consider the job successful unless the new base clearly satisfies these points:
- homepage feels distinct within first 5 seconds
- product cards and product page feel brand-specific, not template-level
- Studio feels like a signature feature, not a standard form
- mobile experience feels premium and intentional
- ready-stock store remains simple and clear
- trial generator is clearly labeled as preview / experimental
- code stays clean enough for future feature expansion

## Scope control
Do not add these now unless already trivial:
- advanced AI generation pipelines
- AR try-on
- full manufacturing workflow
- marketplace features
- global tax complexity
- adult fashion expansion
- loyalty systems
- referrals
- enterprise analytics

## Technical guidance
Prefer keeping the current stack unless a specific switch is necessary:
- React + Vite + TypeScript
- Tailwind
- shadcn UI primitives
- Zustand stores
- Framer Motion for premium transitions

If a move to Next.js is desired later, design the component architecture so migration is straightforward.

## Final instruction
Use this repository as a **starting skeleton**.
Do not preserve generic sections just because they already exist.
Rebuild toward the real objective: a unique, premium, kids-first, futuristic shopping experience for Fabrician.
