import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingBag, Globe, Zap, Package, Shield, ChevronRight, Star, ArrowRight, Users, Check } from 'lucide-react';
import { fanwearProducts, FANWEAR_SPEC, type FanwearProduct } from '@/data/fanwear-products';
import { useCart } from '@/store/useCart';

// ── Palette ──────────────────────────────────────────────────────────────────
const DARK   = '#0A0E1A';     // deep stadium dark
const DARK2  = '#111827';     // card surface
const DARK3  = '#1A2235';     // elevated card
const GOLD   = '#C9A86C';     // Fabrician gold
const GOLD2  = '#F0D080';     // lighter gold
const CREAM  = '#FAF0E3';     // Fabrician cream
const MUTED  = 'rgba(250,240,227,0.50)';
const DIM    = 'rgba(250,240,227,0.28)';

const COUNTRY_FLAGS: Record<string, string> = {
  'Saudi Arabia': '🇸🇦',
  'Mexico': '🇲🇽',
  'USA': '🇺🇸',
  'Argentina': '🇦🇷',
  'Bangladesh': '🇧🇩',
  'Canada': '🇨🇦',
  'Portugal': '🇵🇹',
  'Brazil': '🇧🇷',
  'Iran': '🇮🇷',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function PreorderBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ backgroundColor: 'rgba(201,168,108,0.18)', color: GOLD, border: '1px solid rgba(201,168,108,0.35)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      Preorder Open
    </span>
  );
}

function EarlyBirdBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.12em]"
      style={{ backgroundColor: 'rgba(239,68,68,0.18)', color: '#F87171', border: '1px solid rgba(239,68,68,0.30)' }}
    >
      <Zap className="w-2.5 h-2.5" />
      Early Bird
    </span>
  );
}

interface ProductSpotlightProps {
  product: FanwearProduct;
  onPreorder: (p: FanwearProduct) => void;
}

function ProductSpotlight({ product, onPreorder }: ProductSpotlightProps) {
  const flag = COUNTRY_FLAGS[product.country] || '🌍';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
      >
        {/* Product Image */}
        <div className="relative flex items-center justify-center">
          {/* Glow ring */}
          <div
            className="absolute inset-8 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: product.accent.primary }}
          />
          {/* Floating product frame */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-[340px] mx-auto"
            style={{ perspective: '800px' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${product.accent.primary}22 0%, ${DARK2} 100%)`,
                border: `1px solid ${product.accent.primary}44`,
                boxShadow: `0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px ${product.accent.primary}22, 0 8px 32px ${product.accent.primary}33`,
                transform: 'rotateY(-4deg) rotateX(2deg)',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain"
                style={{ minHeight: '280px' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Shine overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-5">
          {/* Country + sub-brand */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl" role="img" aria-label={product.country}>{flag}</span>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: `${product.accent.primary}33`, color: product.accent.secondary, border: `1px solid ${product.accent.primary}55` }}
            >
              {product.country}
            </div>
            <EarlyBirdBadge />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: GOLD }}>
              12thFAN Outfit by FABrician Global
            </p>
            <h2
              className="font-display font-bold leading-tight mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: CREAM }}
            >
              {product.tagline}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              {product.descriptionShort}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: GOLD }}>Early Bird Price</p>
              <span className="font-display font-bold text-3xl" style={{ color: GOLD2 }}>${product.earlyBirdPrice}</span>
            </div>
            <div className="pb-1">
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: DIM }}>Main Retail</p>
              <span className="text-lg line-through" style={{ color: DIM }}>${product.price}</span>
            </div>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-2">
            {['Oversized / Drop-Shoulder', '175 GSM Performance Jersey', 'Full Sublimation Print', 'Made in Bangladesh'].map((spec) => (
              <div key={spec} className="flex items-center gap-2 text-xs" style={{ color: MUTED }}>
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                {spec}
              </div>
            ))}
          </div>

          {/* Size row */}
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: DIM }}>Sizes Available</p>
            <div className="flex gap-2 flex-wrap">
              {FANWEAR_SPEC.sizes.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ backgroundColor: 'rgba(250,240,227,0.07)', color: MUTED, border: '1px solid rgba(250,240,227,0.12)' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap pt-1">
            <button
              onClick={() => onPreorder(product)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${product.accent.secondary} 100%)`,
                color: DARK,
                boxShadow: `0 8px 28px rgba(201,168,108,0.40)`,
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              Preorder Now — ${product.earlyBirdPrice}
            </button>
            <Link
              to={`/product/${product.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold transition-all"
              style={{ color: MUTED, border: '1px solid rgba(250,240,227,0.18)', backgroundColor: 'rgba(250,240,227,0.05)' }}
            >
              Full Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] leading-relaxed" style={{ color: DIM }}>
            ⚠ Unofficial fan-support outfit. Not affiliated with any federation, team, or event body.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface FanCardProps {
  product: FanwearProduct;
  isActive: boolean;
  onSelect: () => void;
  onPreorder: (p: FanwearProduct) => void;
}

function FanCard({ product, isActive, onSelect, onPreorder }: FanCardProps) {
  const flag = COUNTRY_FLAGS[product.country] || '🌍';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.35 }}
      onClick={onSelect}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: isActive
          ? `linear-gradient(145deg, ${product.accent.primary}44 0%, ${DARK2} 100%)`
          : `linear-gradient(145deg, ${DARK3} 0%, ${DARK2} 100%)`,
        border: isActive
          ? `1px solid ${product.accent.primary}88`
          : '1px solid rgba(250,240,227,0.08)',
        boxShadow: isActive
          ? `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${product.accent.primary}44`
          : '0 8px 24px rgba(0,0,0,0.30)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${product.accent.primary}, ${product.accent.secondary})` }}
        />
      )}

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', backgroundColor: `${product.accent.primary}18` }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0) 50%)' }} />

        {/* Country chip */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-base" role="img" aria-label={product.country}>{flag}</span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{ backgroundColor: `${product.accent.primary}cc`, color: '#fff' }}
          >
            {product.country}
          </span>
        </div>

        {/* Early bird badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(239,68,68,0.80)', color: '#fff' }}
          >
            Early ${product.earlyBirdPrice}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: GOLD }}>
            12thFAN Limited Edition
          </p>
          <h3 className="font-display font-semibold text-sm leading-tight" style={{ color: CREAM }}>
            {product.tagline}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg" style={{ color: GOLD2 }}>${product.earlyBirdPrice}</span>
          <span className="text-xs line-through" style={{ color: DIM }}>${product.price}</span>
          <span className="text-[9px] font-bold uppercase ml-auto" style={{ color: '#F87171' }}>Preorder</span>
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onPreorder(product); }}
          className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${product.accent.primary} 0%, ${product.accent.secondary} 100%)`
              : 'rgba(250,240,227,0.08)',
            color: isActive ? '#fff' : MUTED,
            border: isActive ? 'none' : '1px solid rgba(250,240,227,0.12)',
          }}
        >
          {isActive ? 'Preorder · Select Size Below' : 'View & Preorder'}
        </button>

        <p className="text-[9px] text-center" style={{ color: DIM }}>
          Unofficial fan-support outfit
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FanwearPage() {
  const [activeProduct, setActiveProduct] = useState<FanwearProduct>(fanwearProducts[2]); // default USA
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [addedToCart, setAddedToCart] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
  const addItem = useCart((s) => s.addItem);

  const handlePreorder = (product: FanwearProduct) => {
    setActiveProduct(product);
    // Scroll to spotlight
    document.getElementById('fan-spotlight')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleAddToCart = () => {
    addItem({
      id: `${activeProduct.id}-${selectedSize}-${Date.now()}`,
      productId: activeProduct.id,
      variantId: `${activeProduct.id}-${selectedSize}`,
      name: activeProduct.title,
      price: activeProduct.earlyBirdPrice,
      image: activeProduct.image,
      size: selectedSize,
      color: activeProduct.colors,
      quantity: 1,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div style={{ backgroundColor: DARK, color: CREAM, minHeight: '100vh' }} className="overflow-x-hidden">

      {/* ── §0 ANNOUNCEMENT BAR ─────────────────────────────────────── */}
      <div
        className="hidden lg:block text-center py-2.5 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ backgroundColor: '#0D1220', borderBottom: '1px solid rgba(201,168,108,0.18)', color: GOLD }}
      >
        ✦ 12thFAN Limited Fanwear Drop · Early Bird $79 · Global Preorder Open · Made in Bangladesh ✦
      </div>

      {/* ── §1 HERO ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, ${activeProduct.accent.primary}28 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, ${activeProduct.accent.secondary}18 0%, transparent 50%),
            linear-gradient(180deg, #0A0E1A 0%, #080C14 100%)
          `,
          transition: 'background 0.7s ease',
        }}
      >
        {/* Stadium light rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/4 w-px h-full opacity-[0.06]"
            style={{ background: 'linear-gradient(180deg, rgba(201,168,108,0.8) 0%, transparent 100%)' }}
          />
          <div
            className="absolute top-0 right-1/3 w-px h-full opacity-[0.04]"
            style={{ background: 'linear-gradient(180deg, rgba(201,168,108,0.8) 0%, transparent 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Copy column */}
            <div className="order-2 lg:order-1 flex flex-col gap-7">
              {/* Sub-brand label */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <PreorderBadge />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: DIM }}>
                  12thFAN Outfit by FABrician Global
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.12 }}
              >
                <h1
                  className="font-display font-bold leading-[0.96]"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: CREAM, letterSpacing: '-0.03em' }}
                >
                  Limited
                  <br />
                  <span style={{ color: GOLD }}>Fanwear</span>
                  <br />
                  <span className="font-light italic">for the</span>{' '}
                  <span style={{ color: GOLD2 }}>12th Player.</span>
                </h1>
              </motion.div>

              {/* Sub-copy */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="text-base leading-relaxed max-w-[440px]"
                style={{ color: MUTED }}
              >
                Premium sublimation fanwear for global supporters — 9 country drops,
                unisex oversized fit, made in Bangladesh.
                Unofficial fan-support, collectible-grade quality.
              </motion.p>

              {/* Country selector pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.30 }}
                className="flex flex-col gap-3"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                  ✦ Choose Your Nation
                </p>
                <div className="flex flex-wrap gap-2">
                  {fanwearProducts.map((p) => {
                    const isActive = p.id === activeProduct.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveProduct(p)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? p.accent.primary : 'rgba(250,240,227,0.06)',
                          color: isActive ? '#fff' : MUTED,
                          border: `1px solid ${isActive ? p.accent.primary : 'rgba(250,240,227,0.12)'}`,
                          boxShadow: isActive ? `0 4px 18px ${p.accent.primary}66` : 'none',
                          transform: isActive ? 'translateY(-1px)' : 'none',
                        }}
                      >
                        <span style={{ fontSize: '13px' }}>{COUNTRY_FLAGS[p.country]}</span>
                        <span>{p.country}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active country tagline */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeProduct.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="font-display italic font-light text-lg"
                    style={{ color: activeProduct.accent.secondary || GOLD }}
                  >
                    "{activeProduct.tagline}"
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => document.getElementById('fan-spotlight')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, #8A6B3A 100%)`,
                    color: DARK,
                    boxShadow: '0 8px 28px rgba(201,168,108,0.40)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop the Drop
                </button>
                <button
                  onClick={() => document.getElementById('fan-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold transition-all hover:bg-white/10"
                  style={{ color: MUTED, border: '1px solid rgba(250,240,227,0.20)' }}
                >
                  All 9 Nations
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex gap-8 pt-2"
              >
                {[
                  { n: '9', label: 'Countries' },
                  { n: '$79', label: 'Early Bird' },
                  { n: 'XS–XXL', label: 'Sizes' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-bold text-xl" style={{ color: GOLD2 }}>{s.n}</p>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: DIM }}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero image — active product */}
            <div className="order-1 lg:order-2 relative flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 0.92, rotateY: 12 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.92, rotateY: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[420px]"
                  style={{ perspective: '1000px' }}
                >
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 blur-3xl rounded-full opacity-40"
                    style={{ backgroundColor: activeProduct.accent.primary }}
                  />
                  {/* Card */}
                  <div
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${activeProduct.accent.primary}30 0%, ${DARK2} 100%)`,
                      border: `1px solid ${activeProduct.accent.primary}55`,
                      boxShadow: `0 40px 80px rgba(0,0,0,0.60), 0 0 60px ${activeProduct.accent.primary}30`,
                      transform: 'rotateY(-6deg) rotateX(2deg)',
                    }}
                  >
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.title}
                      className="w-full h-auto object-contain"
                      style={{ minHeight: '320px' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)' }} />
                  </div>
                  {/* Number 12 badge */}
                  <div
                    className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center font-display font-black text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD} 0%, #8A6B3A 100%)`,
                      color: DARK,
                      boxShadow: '0 8px 24px rgba(201,168,108,0.45)',
                    }}
                  >
                    12
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── §2 PRODUCT SPOTLIGHT ─────────────────────────────────────── */}
      <section
        id="fan-spotlight"
        className="py-20 lg:py-28"
        style={{ backgroundColor: '#0D1220', borderTop: '1px solid rgba(201,168,108,0.12)', borderBottom: '1px solid rgba(201,168,108,0.12)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-display italic text-2xl" style={{ color: GOLD }}>✦</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-1" style={{ color: GOLD }}>Selected Nation</p>
              <h2 className="font-display font-bold text-2xl" style={{ color: CREAM }}>
                {activeProduct.country} — {activeProduct.tagline}
              </h2>
            </div>
          </div>

          <ProductSpotlight product={activeProduct} onPreorder={handlePreorder} />

          {/* Add to cart flow */}
          <div
            className="mt-10 p-6 rounded-2xl"
            style={{ backgroundColor: DARK3, border: '1px solid rgba(250,240,227,0.10)' }}
          >
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: CREAM }}>Size — Preorder</p>
                <div className="flex gap-2 flex-wrap">
                  {FANWEAR_SPEC.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{
                        backgroundColor: selectedSize === s ? GOLD : 'rgba(250,240,227,0.08)',
                        color: selectedSize === s ? DARK : MUTED,
                        border: selectedSize === s ? 'none' : '1px solid rgba(250,240,227,0.14)',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-[0.97] whitespace-nowrap"
                style={{
                  background: addedToCart
                    ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                    : `linear-gradient(135deg, ${GOLD} 0%, #8A6B3A 100%)`,
                  color: addedToCart ? '#fff' : DARK,
                  boxShadow: '0 8px 28px rgba(201,168,108,0.35)',
                }}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart — ${activeProduct.earlyBirdPrice} Early Bird
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── §3 PRODUCT GRID — All 9 Nations ─────────────────────────── */}
      <section id="fan-grid" ref={gridRef} className="py-20 lg:py-28" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-end justify-between gap-4 mb-12 flex-wrap"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-2" style={{ color: GOLD }}>The Collection</p>
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM }}>
                9 Nations. 9 Drops.
              </h2>
              <p className="text-sm mt-2" style={{ color: MUTED }}>
                Choose your country — all pieces ship as preorder from Bangladesh.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: DARK3, border: '1px solid rgba(201,168,108,0.18)' }}>
              <Globe className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-xs font-bold" style={{ color: GOLD }}>Global Fanwear Drop</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {fanwearProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <FanCard
                  product={product}
                  isActive={product.id === activeProduct.id}
                  onSelect={() => {
                    setActiveProduct(product);
                    document.getElementById('fan-spotlight')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onPreorder={handlePreorder}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §4 BUNDLE SECTION ────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: '#0D1220', borderTop: '1px solid rgba(201,168,108,0.12)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-3" style={{ color: GOLD }}>Squad Goals</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: CREAM }}>
              Fan Bundle Offers
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: MUTED }}>
              Order for the full squad. Mix any two or three nations — perfect for families, supporter groups, and match-day crews.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* 2-Pack */}
            <div
              className="relative p-8 rounded-3xl flex flex-col gap-5"
              style={{
                background: 'linear-gradient(145deg, #1A2235 0%, #111827 100%)',
                border: `1px solid ${GOLD}44`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${GOLD}22`,
              }}
            >
              <div
                className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}
              >
                Save $19
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5" style={{ color: GOLD }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>2-Pack Bundle</span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-2" style={{ color: CREAM }}>Fan Pair</h3>
                <p className="text-sm" style={{ color: MUTED }}>Two limited fan jerseys — choose any 2 countries.</p>
              </div>
              <div className="flex items-end gap-3">
                <span className="font-display font-bold text-4xl" style={{ color: GOLD2 }}>$179</span>
                <span className="text-sm pb-1 line-through" style={{ color: DIM }}>$198 (2×$99)</span>
              </div>
              <ul className="flex flex-col gap-2">
                {['Any 2 country editions', 'Full size selection per piece', 'Ships together · Made in Bangladesh', 'Preorder pricing secured'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold transition-all"
                style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #8A6B3A 100%)`, color: DARK }}
              >
                <ShoppingBag className="w-4 h-4" />
                Preorder 2-Pack — $179
              </Link>
            </div>

            {/* 3-Pack */}
            <div
              className="relative p-8 rounded-3xl flex flex-col gap-5"
              style={{
                background: 'linear-gradient(145deg, #1E1030 0%, #111827 100%)',
                border: '1px solid rgba(168,100,255,0.30)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(168,100,255,0.15)',
              }}
            >
              <div
                className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: 'rgba(168,100,255,0.18)', color: '#C084FC', border: '1px solid rgba(168,100,255,0.35)' }}
              >
                Best Value
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5" style={{ color: '#C084FC' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C084FC' }}>3-Pack Bundle</span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-2" style={{ color: CREAM }}>Supporters Group</h3>
                <p className="text-sm" style={{ color: MUTED }}>Three premium fanwear jerseys — any 3 nations, one shipment.</p>
              </div>
              <div className="flex items-end gap-3">
                <span className="font-display font-bold text-4xl" style={{ color: '#C084FC' }}>$249</span>
                <span className="text-sm pb-1 line-through" style={{ color: DIM }}>$297 (3×$99)</span>
              </div>
              <ul className="flex flex-col gap-2">
                {['Any 3 country editions', 'Full size selection per piece', 'Ships together · Made in Bangladesh', 'Preorder pricing secured', 'Avg. $83/piece — best group rate'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C084FC' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold transition-all"
                style={{ background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', color: '#fff' }}
              >
                <ShoppingBag className="w-4 h-4" />
                Preorder 3-Pack — $249
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── §5 PREORDER INFO ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-24" style={{ backgroundColor: DARK }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-3" style={{ color: GOLD }}>How It Works</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: CREAM }}>
              Preorder Process
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Globe, n: '01', title: 'Choose Your Nation', body: 'Select your country edition and size. Secure your early bird price of $79 per piece.' },
              { icon: Package, n: '02', title: 'We Produce in Bangladesh', body: 'Your preorder triggers production. Premium sublimation jersey, unisex oversized fit, crafted in Bangladesh.' },
              { icon: ShoppingBag, n: '03', title: 'Global Delivery', body: 'Your limited fan edition ships to you. Delivery timelines provided on confirmation. Open and check before returning.' },
            ].map(({ icon: Icon, n, title, body }) => (
              <div
                key={n}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ backgroundColor: DARK3, border: '1px solid rgba(250,240,227,0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display italic text-xl" style={{ color: GOLD }}>{n}</span>
                  <div className="h-px flex-1" style={{ backgroundColor: 'rgba(201,168,108,0.20)' }} />
                  <Icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <h3 className="font-bold text-base" style={{ color: CREAM }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §6 PRODUCT DETAIL — Specs & Design Stories ──────────────── */}
      <section
        className="py-20 lg:py-24"
        style={{ backgroundColor: '#0D1220', borderTop: '1px solid rgba(201,168,108,0.12)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-3" style={{ color: GOLD }}>Design Notes</p>
            <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: CREAM }}>
              The Making of {activeProduct.country}
            </h2>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-10"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Design Story</p>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{activeProduct.description}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Design Details</p>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{activeProduct.designDetails}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Colors</p>
                  <p className="text-sm" style={{ color: MUTED }}>{activeProduct.colors}</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Fabric & Fit</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Fabric', value: '175 GSM premium polyester single jersey' },
                      { label: 'Print', value: 'Full sublimation — all-over artwork' },
                      { label: 'Fit', value: 'Unisex oversized / drop-shoulder' },
                      { label: 'Sizes', value: 'XS · S · M · L · XL · XXL' },
                      { label: 'Origin', value: 'Made in Bangladesh' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid rgba(250,240,227,0.07)' }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider w-20 flex-shrink-0 pt-0.5" style={{ color: DIM }}>{label}</span>
                        <span className="text-sm" style={{ color: MUTED }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Care Instructions</p>
                  <ul className="flex flex-col gap-1.5">
                    {activeProduct.careInstructions.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-xs" style={{ color: MUTED }}>
                        <Check className="w-3 h-3 flex-shrink-0" style={{ color: GOLD }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── §7 LEGAL DISCLAIMER ──────────────────────────────────────── */}
      <section
        className="py-10"
        style={{ backgroundColor: '#07090F', borderTop: '1px solid rgba(250,240,227,0.06)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-4 h-4" style={{ color: DIM }} />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>Legal Notice</p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: DIM }}>
            {FANWEAR_SPEC.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
