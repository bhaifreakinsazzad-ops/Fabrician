# Keep / Rewrite Map

## Keep as reusable foundation
- `src/components/ui/*`
- `src/store/useCart.ts`
- `src/store/useWishlist.ts`
- `src/store/useTheme.ts`
- `src/store/useStudio.ts`
- `src/types/index.ts`
- `src/data/products.ts` data shape
- `src/components/layout/AppShell.tsx` as a shell reference
- `public/manifest.json` as installable-app groundwork

## Rewrite aggressively
- `src/pages/HomePage.tsx`
- `src/pages/ShopPage.tsx`
- `src/pages/ProductDetailPage.tsx`
- `src/pages/StudioPage.tsx`
- `src/components/layout/AppHeader.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/ecommerce/ProductCard.tsx`
- `src/components/ecommerce/ProductGrid.tsx`

## Keep but simplify/refine later
- `src/pages/CartPage.tsx`
- `src/pages/CheckoutPage.tsx`
- `src/pages/OrderSuccessPage.tsx`
- `src/pages/TrackOrderPage.tsx`
- `src/pages/AccountPage.tsx`

## Keep only as admin placeholders
- `src/pages/AdminDashboard.tsx`
- `src/pages/AdminProducts.tsx`
- `src/pages/AdminOrders.tsx`
- `src/pages/AdminStudio.tsx`
- `src/pages/AdminSettings.tsx`

## Clean up candidates
- `src/pages/Home.tsx` likely redundant
- `info.md` not useful for product direction
- replace generic README and leave project-specific instructions only
