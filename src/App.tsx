import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';

// Eagerly loaded — core commerce flow
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderSuccessPage from '@/pages/OrderSuccessPage';

// Lazy loaded pages
const WorldsPage       = lazy(() => import('@/pages/WorldsPage'));
const WorldDetailPage  = lazy(() => import('@/pages/WorldDetailPage'));
const StudioPage       = lazy(() => import('@/pages/StudioPage'));
const AboutPage        = lazy(() => import('@/pages/AboutPage'));
const FaqPage          = lazy(() => import('@/pages/FaqPage'));
const LoginPage        = lazy(() => import('@/pages/LoginPage'));
const AccountPage      = lazy(() => import('@/pages/AccountPage'));
const TrackOrderPage   = lazy(() => import('@/pages/TrackOrderPage'));
const WishlistPage     = lazy(() => import('@/pages/WishlistPage'));
const FanwearPage      = lazy(() => import('@/pages/FanwearPage'));
const AdminDashboard   = lazy(() => import('@/pages/AdminDashboard'));
const AdminProducts    = lazy(() => import('@/pages/AdminProducts'));
const AdminOrders      = lazy(() => import('@/pages/AdminOrders'));
const AdminStudio      = lazy(() => import('@/pages/AdminStudio'));
const AdminSettings    = lazy(() => import('@/pages/AdminSettings'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-6 h-6 border-2 border-fab-gold rounded-full animate-spin border-t-transparent" style={{ borderColor: '#C8A57A', borderTopColor: 'transparent' }} />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
          <Route path="products" element={<Suspense fallback={<PageLoader />}><AdminProducts /></Suspense>} />
          <Route path="orders"   element={<Suspense fallback={<PageLoader />}><AdminOrders /></Suspense>} />
          <Route path="studio"   element={<Suspense fallback={<PageLoader />}><AdminStudio /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageLoader />}><AdminSettings /></Suspense>} />
        </Route>

        {/* Public Routes */}
        <Route element={<AppShell />}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/shop"           element={<ShopPage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/worlds"         element={<Suspense fallback={<PageLoader />}><WorldsPage /></Suspense>} />
          <Route path="/worlds/:worldSlug" element={<Suspense fallback={<PageLoader />}><WorldDetailPage /></Suspense>} />
          <Route path="/product/:slug"  element={<ProductDetailPage />} />
          <Route path="/cart"           element={<CartPage />} />
          <Route path="/checkout"       element={<CheckoutPage />} />
          <Route path="/order-success"  element={<OrderSuccessPage />} />
          <Route path="/studio"         element={<Suspense fallback={<PageLoader />}><StudioPage /></Suspense>} />
          <Route path="/about"          element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path="/faq"            element={<Suspense fallback={<PageLoader />}><FaqPage /></Suspense>} />
          <Route path="/login"          element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />
          <Route path="/account"        element={<Suspense fallback={<PageLoader />}><AccountPage /></Suspense>} />
          <Route path="/track-order"    element={<Suspense fallback={<PageLoader />}><TrackOrderPage /></Suspense>} />
          <Route path="/wishlist"       element={<Suspense fallback={<PageLoader />}><WishlistPage /></Suspense>} />
          <Route path="/12thfan"        element={<Suspense fallback={<PageLoader />}><FanwearPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
