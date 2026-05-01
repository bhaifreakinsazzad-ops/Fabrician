import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Sparkles, Truck, Gift, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { useAuth } from '@/store/useAuth';
import { worlds } from '@/data/worlds';

// ─── Brand palette from the Fabrician logo ───────────────────────────────────
const CREAM      = '#FAF0E3';          // warm ivory — primary surface
const CREAM_MID  = '#F4E6CC';          // slightly deeper — subtle sections
const INK        = '#1E140A';          // warm near-black — headlines
const INK_MID    = 'rgba(30,20,10,0.65)';  // body text
const INK_DIM    = 'rgba(30,20,10,0.40)';  // muted / secondary
const GOLD       = '#C9A86C';          // amber gold — primary accent
const GOLD_DEEP  = '#8A6B3A';          // deeper gold — gradients
const GOLD_SOFT  = 'rgba(201,168,108,0.18)';  // gold tint backgrounds

const NAV = [
  { label: 'Shop',        href: '/shop' },
  { label: 'Worlds',      href: '/worlds' },
  { label: '12thFAN ⚽',  href: '/12thfan', fanwear: true },
  { label: 'Gift Sets',   href: '/shop?collection=gift-picks' },
  { label: 'New In',      href: '/shop?collection=new-in' },
  { label: 'Studio',      href: '/studio', accent: true },
];

const HEADER_WORLDS = [
  { slug: 'cloud-dream',    label: 'Cloud',    emoji: '☁️' },
  { slug: 'moon-dream',     label: 'Moon',     emoji: '🌙' },
  { slug: 'bunny-garden',   label: 'Bunny',    emoji: '🐰' },
  { slug: 'safari-calm',    label: 'Safari',   emoji: '🦒' },
  { slug: 'botanical-calm', label: 'Botanical',emoji: '🌿' },
  { slug: 'cherry-bloom',   label: 'Cherry',   emoji: '🍒' },
  { slug: 'animal-parade',  label: 'Parade',   emoji: '🐘' },
  { slug: 'timeless',       label: 'Timeless', emoji: '✦' },
];

export function AppHeader() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [worldsOpen, setWorldsOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { items: wishItems } = useWishlist();
  const { isAuthenticated } = useAuth();

  const cartCount  = items.reduce((s, i) => s + i.quantity, 0);
  const onWorld    = location.pathname.startsWith('/worlds/');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setWorldsOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    location.pathname === href ||
    (href !== '/shop' && !href.includes('?') && location.pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: scrolled ? 'rgba(250,240,227,0.97)' : CREAM,
          backdropFilter:  scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: `1px solid rgba(201,168,108,${scrolled ? 0.30 : 0.18})`,
          boxShadow: scrolled ? '0 4px 28px rgba(30,20,10,0.10)' : 'none',
        }}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* ════════ LUXURY TOP STRIP — desktop only ════════ */}
        <div
          className="hidden lg:block"
          style={{
            backgroundColor: CREAM_MID,
            borderBottom: '1px solid rgba(201,168,108,0.18)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="flex items-center justify-between h-8 text-[10px]"
              style={{ letterSpacing: '0.16em' }}
            >
              <div
                className="flex items-center gap-5 uppercase font-medium"
                style={{ color: INK_MID }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-3 h-3" style={{ color: GOLD }} />
                  Free Delivery · All of Bangladesh
                </span>
                <span style={{ color: 'rgba(201,168,108,0.5)' }}>·</span>
                <span className="font-bold" style={{ color: GOLD }}>
                  Luxury Worlds for Little Ones
                </span>
              </div>
              <div className="flex items-center gap-5 uppercase font-medium" style={{ color: INK_MID }}>
                <Link
                  to="/#gift-builder"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A86C]"
                >
                  <Gift className="w-3 h-3" />
                  Build a Tiny Gift Set
                </Link>
                <span style={{ color: 'rgba(201,168,108,0.5)' }}>·</span>
                <Link
                  to="/studio"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A86C]"
                >
                  <Sparkles className="w-3 h-3" />
                  Studio · Trial Preview
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ════════ MAIN HEADER ════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[62px] lg:h-[66px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              <div className="flex-shrink-0 relative">
                <img
                  src="/logo.png"
                  alt="Fabrician"
                  className="h-10 w-10 rounded-full object-cover"
                  style={{
                    boxShadow: '0 2px 12px rgba(201,168,108,0.40), 0 0 0 2px rgba(201,168,108,0.18)',
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display font-bold text-[15px] leading-none tracking-[0.06em] uppercase"
                  style={{ color: INK }}
                >
                  Fabrician
                </span>
                <span
                  className="text-[7.5px] font-semibold uppercase tracking-[0.24em] leading-none mt-1 hidden sm:block"
                  style={{ color: GOLD }}
                >
                  Premium Baby Fashion
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV.map((item) => {
                const active = isActive(item.href);
                if (item.accent) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                        color: '#FFFFFF',
                        boxShadow: '0 2px 10px rgba(201,168,108,0.40)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Studio ✦
                    </Link>
                  );
                }
                if ((item as { fanwear?: boolean }).fanwear) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="ml-1 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: active ? 'linear-gradient(135deg, #0A0E1A 0%, #1A2235 100%)' : 'rgba(10,14,26,0.08)',
                        color: active ? '#C9A86C' : '#0A0E1A',
                        border: '1px solid rgba(10,14,26,0.18)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onMouseEnter={() => item.label === 'Worlds' && setWorldsOpen(true)}
                    onMouseLeave={() => item.label === 'Worlds' && setWorldsOpen(false)}
                    className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-black/[0.04]"
                    style={{ color: active ? INK : INK_MID }}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-3 right-3 h-px rounded-full"
                        style={{ backgroundColor: GOLD }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right icons ── */}
            <div className="flex items-center gap-0.5">
              <Link
                to="/shop"
                className="hidden sm:flex p-2 rounded-lg transition-all hover:bg-black/[0.04]"
                aria-label="Search"
                style={{ color: INK_DIM }}
              >
                <Search style={{ width: '18px', height: '18px' }} />
              </Link>

              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg transition-all hover:bg-black/[0.04]"
                aria-label="Wishlist"
                style={{ color: INK_DIM }}
              >
                <Heart style={{ width: '18px', height: '18px' }} />
                {wishItems.length > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: '#C46478', color: '#FFFFFF' }}
                  >
                    {wishItems.length}
                  </span>
                )}
              </Link>

              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="hidden sm:block p-2 rounded-lg transition-all hover:bg-black/[0.04]"
                aria-label="Account"
                style={{ color: INK_DIM }}
              >
                <User style={{ width: '18px', height: '18px' }} />
              </Link>

              <Link
                to="/cart"
                className="relative p-2 rounded-lg transition-all hover:bg-black/[0.04]"
                aria-label={`Cart (${cartCount})`}
                style={{ color: cartCount > 0 ? GOLD : INK_DIM }}
              >
                <ShoppingBag style={{ width: '18px', height: '18px' }} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg transition-all hover:bg-black/[0.04]"
                aria-label="Menu"
                style={{ color: INK_MID }}
              >
                {menuOpen
                  ? <X style={{ width: '18px', height: '18px', color: INK }} />
                  : <Menu style={{ width: '18px', height: '18px' }} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* ════════ WORLD CHIP STRIP — desktop only ════════ */}
        <div
          className="hidden lg:block"
          style={{
            backgroundColor: 'rgba(244,230,204,0.60)',
            borderTop: '1px solid rgba(201,168,108,0.14)',
            borderBottom: '1px solid rgba(201,168,108,0.14)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: GOLD }}
                >
                  Choose a World
                </span>
                <span className="h-px w-5" style={{ backgroundColor: 'rgba(201,168,108,0.35)' }} />
                <div className="flex items-center gap-1.5">
                  {HEADER_WORLDS.map((w) => {
                    const w_active = location.pathname === `/worlds/${w.slug}`;
                    return (
                      <Link
                        key={w.slug}
                        to={`/worlds/${w.slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all hover:scale-105"
                        style={{
                          backgroundColor: w_active ? GOLD_SOFT : 'rgba(30,20,10,0.04)',
                          color:           w_active ? GOLD : INK_MID,
                          border: `1px solid ${w_active ? 'rgba(201,168,108,0.45)' : 'rgba(30,20,10,0.08)'}`,
                        }}
                      >
                        <span style={{ fontSize: '10px' }}>{w.emoji}</span>
                        <span>{w.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <Link
                to="/worlds"
                className="text-[10px] font-bold uppercase tracking-[0.22em] transition-colors hover:text-[#1E140A]"
                style={{ color: INK_DIM }}
              >
                View All Worlds →
              </Link>
            </div>
          </div>
        </div>

        {/* ════════ WORLDS MEGA-PANEL ════════ */}
        <AnimatePresence>
          {worldsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => setWorldsOpen(true)}
              onMouseLeave={() => setWorldsOpen(false)}
              className="hidden lg:block absolute left-0 right-0 top-full"
              style={{
                backgroundColor: 'rgba(250,240,227,0.98)',
                backdropFilter: 'blur(18px)',
                borderBottom: `1px solid rgba(201,168,108,0.20)`,
                boxShadow: '0 12px 40px rgba(30,20,10,0.10)',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-4 gap-3">
                  {worlds.slice(0, 8).map((w) => (
                    <Link
                      key={w.slug}
                      to={`/worlds/${w.slug}`}
                      className="group flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-black/[0.04]"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: w.accent.chip }}
                      >
                        {w.emoji}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-semibold truncate" style={{ color: INK }}>
                          {w.name}
                        </p>
                        <p className="text-[10px] truncate" style={{ color: INK_DIM }}>
                          {w.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-[62px] lg:h-[116px]" />

      {/* ════════ MOBILE MENU ════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[62px] left-0 right-0 bottom-0 z-40 lg:hidden overflow-y-auto"
            style={{
              backgroundColor: CREAM,
              borderTop: `1px solid rgba(201,168,108,0.22)`,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5">

              {/* World chips — mobile */}
              <div className="mb-5">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.22em] mb-2.5"
                  style={{ color: GOLD }}
                >
                  Choose a World
                </p>
                <div
                  className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {HEADER_WORLDS.map((w) => (
                    <Link
                      key={w.slug}
                      to={`/worlds/${w.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all hover:scale-105"
                      style={{
                        backgroundColor: GOLD_SOFT,
                        color: INK,
                        border: '1px solid rgba(201,168,108,0.30)',
                      }}
                    >
                      <span>{w.emoji}</span>
                      <span>{w.label}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/worlds"
                  className="inline-flex items-center gap-1 mt-2.5 text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: INK_DIM }}
                >
                  View All Worlds →
                </Link>
              </div>

              <div className="h-px mb-4" style={{ backgroundColor: 'rgba(201,168,108,0.18)' }} />

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5">
                {NAV.filter(i => !i.accent).map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        color:           active ? INK : INK_MID,
                        backgroundColor: active ? GOLD_SOFT : 'transparent',
                      }}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: GOLD }}
                        />
                      )}
                    </Link>
                  );
                })}
                <Link
                  to="/about"
                  className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-colors hover:bg-black/[0.04]"
                  style={{ color: INK_MID }}
                >
                  About
                </Link>
              </nav>

              {/* CTA cards */}
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <Link
                  to="/#gift-builder"
                  className="flex flex-col gap-1 p-4 rounded-2xl transition-all"
                  style={{
                    backgroundColor: 'rgba(201,168,108,0.08)',
                    border: '1px solid rgba(201,168,108,0.22)',
                  }}
                >
                  <Gift className="w-5 h-5" style={{ color: GOLD }} />
                  <p className="text-xs font-bold mt-1" style={{ color: INK }}>Build a Gift Set</p>
                  <p className="text-[10px]" style={{ color: INK_DIM }}>Curated · 4 steps</p>
                </Link>
                <Link
                  to="/studio"
                  className="flex flex-col gap-1 p-4 rounded-2xl transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                    color: '#FFFFFF',
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  <p className="text-xs font-bold mt-1">Fabrician Studio ✦</p>
                  <p className="text-[10px] opacity-75">Trial Preview</p>
                </Link>
              </div>

              {onWorld && (
                <div
                  className="mt-5 p-3 rounded-xl text-xs"
                  style={{ backgroundColor: GOLD_SOFT, color: INK_MID }}
                >
                  Currently exploring a Fabrician World.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
