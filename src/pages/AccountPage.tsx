import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  User, ShoppingBag, Heart, MapPin, Palette, LogOut,
  Package, ChevronRight, Sparkles, Plus, ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/store/useAuth';
import { useWishlist } from '@/store/useWishlist';
import { products } from '@/data/products';
import { formatPriceBDT, getStudioStatusLabel } from '@/lib/utils';

const WARM_GRADIENT = 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)';

const MOCK_ORDERS = [
  { id: 'FAB-ABC123', date: 'Apr 24, 2026', status: 'Shipped', items: 3, total: 1250 },
  { id: 'FAB-DEF456', date: 'Apr 20, 2026', status: 'Delivered', items: 2, total: 890 },
  { id: 'FAB-GHI789', date: 'Apr 15, 2026', status: 'Delivered', items: 1, total: 450 },
];

const MOCK_DESIGNS = [
  {
    id: 'DSG-001',
    name: 'Rainbow Dream Bodysuit',
    date: 'Apr 22, 2026',
    status: 'under_review' as const,
    style: 'Playful · Bright',
    garment: 'Bodysuit',
  },
  {
    id: 'DSG-002',
    name: 'Floral Princess Set',
    date: 'Apr 20, 2026',
    status: 'submitted' as const,
    style: 'Elegant · Soft',
    garment: 'Pajama Set',
  },
];

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const wishlistProducts = wishlistItems
    .map((w) => products.find((p) => p.id === w.productId))
    .filter(Boolean);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'designs', label: 'My Designs', icon: Palette },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">My Account</p>
        <h1 className="text-3xl font-display font-semibold" style={{ color: '#202432' }}>
          Hello, {user?.name?.split(' ')[0] || 'there'} ✦
        </h1>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Profile card */}
          <div className="rounded-2xl bg-card border border-border/40 shadow-card mb-4 overflow-hidden">
            <div className="h-1" style={{ background: WARM_GRADIENT }} />
            <div className="p-4 flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                  boxShadow: '0 4px 16px rgba(184,146,74,0.28)',
                }}
              >
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={
                  activeTab === tab.id
                    ? {
                        background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                        color: '#FFFFFF',
                        boxShadow: '0 2px 12px rgba(184,146,74,0.22)',
                      }
                    : { color: '#69707D' }
                }
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
            <Separator className="my-2" />
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: ShoppingBag,
                      label: 'Orders',
                      value: String(MOCK_ORDERS.length),
                      bg: 'rgba(59,130,246,0.08)',
                      iconColor: '#3B82F6',
                      border: '4px solid #93C5FD',
                    },
                    {
                      icon: Heart,
                      label: 'Wishlist',
                      value: String(wishlistItems.length),
                      bg: 'rgba(244,63,94,0.08)',
                      iconColor: '#F43F5E',
                      border: '4px solid #FDA4AF',
                    },
                    {
                      icon: Sparkles,
                      label: 'Designs',
                      value: String(MOCK_DESIGNS.length),
                      bg: 'rgba(200,165,122,0.12)',
                      iconColor: '#B8924A',
                      border: '4px solid #C8A57A',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-5 rounded-2xl bg-card border border-border/40 shadow-card"
                      style={{ borderLeft: stat.border }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: stat.bg }}
                      >
                        <stat.icon className="w-5 h-5" style={{ color: stat.iconColor }} />
                      </div>
                      <p className="text-2xl font-display font-semibold" style={{ color: '#202432' }}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="rounded-2xl bg-card border border-border/40 shadow-card overflow-hidden">
                  <div className="h-0.5" style={{ background: WARM_GRADIENT }} />
                  <div className="p-6">
                    <h3 className="font-display font-semibold mb-4" style={{ color: '#202432' }}>
                      Recent Orders
                    </h3>
                    <div className="space-y-3">
                      {MOCK_ORDERS.slice(0, 2).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 rounded-xl"
                          style={{ backgroundColor: '#F6F1EA' }}
                        >
                          <div>
                            <p className="font-medium text-sm" style={{ color: '#202432' }}>{order.id}</p>
                            <p className="text-xs text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="text-sm font-medium">{formatPriceBDT(order.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="mt-3 text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-80"
                      style={{ color: '#B8924A' }}
                    >
                      View all orders <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Studio teaser */}
                <div
                  className="rounded-2xl p-6 overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #1A1C28 0%, #202432 60%, #2A2040 100%)',
                    border: '1px solid rgba(200,165,122,0.20)',
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                    style={{ backgroundColor: 'rgba(200,165,122,0.12)' }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" style={{ color: '#C8A57A' }} />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C8A57A' }}>
                        Fabrician Studio
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(200,165,122,0.18)', color: '#D4B896' }}
                      >
                        Trial ✦
                      </span>
                    </div>
                    <p className="text-white font-display font-semibold text-lg mb-1">
                      Design What Doesn't Exist Yet
                    </p>
                    <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
                      Create a custom concept — describe, personalise, and preview your vision.
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        to="/studio"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{
                          background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                          boxShadow: '0 4px 16px rgba(184,146,74,0.30)',
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Open Studio
                      </Link>
                      <button
                        onClick={() => setActiveTab('designs')}
                        className="text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: '#D4B896' }}
                      >
                        My Designs ({MOCK_DESIGNS.length})
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-display font-semibold" style={{ color: '#202432' }}>Order History</h3>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="p-5 rounded-2xl bg-card border border-border/50 shadow-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(200,165,122,0.12)' }}
                        >
                          <Package className="w-5 h-5" style={{ color: '#B8924A' }} />
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#202432' }}>{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.date} · {order.items} item{order.items !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: '#202432' }}>
                        {formatPriceBDT(order.total)}
                      </span>
                      <Link
                        to="/track-order"
                        className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80"
                        style={{ color: '#B8924A' }}
                      >
                        Track <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl border border-border/40 bg-card shadow-card">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#F6F1EA' }}
                    >
                      <Heart className="w-7 h-7" style={{ color: '#C8A57A' }} />
                    </div>
                    <p className="font-display font-semibold mb-1" style={{ color: '#202432' }}>
                      Nothing saved yet
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Tap the heart on any product to save it here.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                        boxShadow: '0 4px 16px rgba(184,146,74,0.28)',
                      }}
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((product) => product && (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="flex gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors shadow-card"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-24 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-medium text-sm truncate" style={{ color: '#202432' }}>
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.shortDescription}</p>
                          <p className="text-sm font-bold mt-2" style={{ color: '#B8924A' }}>
                            {formatPriceBDT(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-display font-semibold" style={{ color: '#202432' }}>Saved Addresses</h3>
                {!user?.addresses || user.addresses.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl border border-border/40 bg-card shadow-card">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#F6F1EA' }}
                    >
                      <MapPin className="w-7 h-7" style={{ color: '#C8A57A' }} />
                    </div>
                    <p className="font-display font-semibold mb-1" style={{ color: '#202432' }}>
                      No saved addresses
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Addresses from your orders will appear here.
                    </p>
                  </div>
                ) : (
                  user.addresses.map((addr) => (
                    <div key={addr.id} className="p-5 rounded-2xl bg-card border border-border/50 shadow-card">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm" style={{ color: '#202432' }}>{addr.label}</p>
                            {addr.isDefault && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{ backgroundColor: 'rgba(200,165,122,0.15)', color: '#B8924A' }}
                              >
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{addr.name}</p>
                          <p className="text-sm text-muted-foreground">{addr.phone}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {addr.address}, {addr.thana}, {addr.district}, {addr.division}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'designs' && (
              <motion.div
                key="designs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Fabrician Studio
                    </p>
                    <h3 className="font-display font-semibold" style={{ color: '#202432' }}>
                      My Designs
                      <span
                        className="ml-2 text-xs px-2 py-0.5 rounded-full font-sans font-semibold"
                        style={{ backgroundColor: 'rgba(200,165,122,0.15)', color: '#B8924A' }}
                      >
                        Trial ✦
                      </span>
                    </h3>
                  </div>
                  <Link to="/studio">
                    <Button
                      size="sm"
                      className="rounded-xl gap-2 text-white"
                      style={{
                        background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                        boxShadow: '0 2px 12px rgba(184,146,74,0.25)',
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" /> New Design
                    </Button>
                  </Link>
                </div>

                {/* Trial disclaimer */}
                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    background: 'rgba(200,165,122,0.08)',
                    border: '1px solid rgba(200,165,122,0.25)',
                  }}
                >
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C8A57A' }} />
                  <p className="text-xs leading-relaxed" style={{ color: '#69707D' }}>
                    These are <strong style={{ color: '#202432' }}>concept previews</strong>, not production orders.
                    Studio is in trial mode. Designs saved here can be reviewed by our team for future custom collections.
                  </p>
                </div>

                {/* Design cards */}
                <div className="space-y-4">
                  {MOCK_DESIGNS.map((design) => {
                    const statusLabel = getStudioStatusLabel(design.status);
                    return (
                      <div
                        key={design.id}
                        className="rounded-2xl overflow-hidden border shadow-card"
                        style={{ borderColor: 'rgba(200,165,122,0.25)', backgroundColor: '#FDFAF6' }}
                      >
                        {/* Dark header strip — Studio aesthetic */}
                        <div
                          className="px-5 py-4 flex items-center justify-between"
                          style={{ background: 'linear-gradient(135deg, #1A1C28 0%, #202432 100%)' }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(200,165,122,0.18)', border: '1px solid rgba(200,165,122,0.30)' }}
                            >
                              <Sparkles className="w-4 h-4" style={{ color: '#C8A57A' }} />
                            </div>
                            <div>
                              <p className="font-display font-medium text-sm text-white">{design.name}</p>
                              <p className="text-[10px]" style={{ color: '#9CA3AF' }}>
                                {design.garment} · {design.style}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabel.color}`}>
                            {statusLabel.label}
                          </span>
                        </div>

                        {/* Card body */}
                        <div className="px-5 py-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{design.id} · Saved {design.date}</p>
                          </div>
                          <Link
                            to="/studio"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                            style={{ color: '#B8924A' }}
                          >
                            <ExternalLink className="w-3 h-3" /> Open in Studio
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA to Studio */}
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: 'linear-gradient(135deg, #1A1C28 0%, #202432 100%)',
                    border: '1px solid rgba(200,165,122,0.20)',
                  }}
                >
                  <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: '#C8A57A' }} />
                  <p className="font-display font-semibold text-white mb-1">Ready to imagine more?</p>
                  <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
                    Open Studio and start a new concept from scratch.
                  </p>
                  <Link
                    to="/studio"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                      boxShadow: '0 4px 16px rgba(184,146,74,0.30)',
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Enter Studio ✦
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
