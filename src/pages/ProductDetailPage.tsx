import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart, ShoppingCart, Star, Truck, Shield, Leaf, RotateCcw,
  ChevronRight, Minus, Plus, Check, Globe, Plus as PlusIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getProductBySlug, getRelatedProducts, products as allProducts } from '@/data/products';
import { getWorldBySlug } from '@/data/worlds';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { WorldChip } from '@/components/ecommerce/WorldChip';
import { DeliveryEstimate } from '@/components/ecommerce/DeliveryEstimate';
import { RecentlyViewedStrip } from '@/components/ecommerce/RecentlyViewedStrip';
import { useRecentlyViewed } from '@/store/useRecentlyViewed';
import { formatPriceBDT, getStockLabel } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const addItem = useCart((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlist();
  const trackView = useRecentlyViewed((s) => s.add);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Track product view for Recently Viewed
  useEffect(() => {
    if (product) trackView(product.id);
  }, [product, trackView]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-28 text-center" style={{ backgroundColor: '#FCF8F3' }}>
        <p className="text-5xl mb-6">🔍</p>
        <h1 className="text-2xl font-display font-semibold mb-3" style={{ color: '#202432' }}>
          Product Not Found
        </h1>
        <p className="text-sm mb-8" style={{ color: '#69707D' }}>
          This product may no longer be available.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF' }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const world = product.world ? getWorldBySlug(product.world) : null;
  const accent = world?.accent ?? {
    bg: '#F6F1EA', primary: '#B8924A', secondary: '#C8A57A',
    chip: '#F6F1EA', chipText: '#202432',
  };

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;
  const stockInfo = selectedVariant ? getStockLabel(selectedVariant.stock) : getStockLabel(0);

  const uniqueColors = [...new Map(product.variants.map((v) => [v.color, v])).values()];
  const uniqueSizes = [...new Map(product.variants.map((v) => [v.size, v])).values()];
  const relatedProducts = getRelatedProducts(product.id, 4);

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) {
      toast.error('Please select an available size');
      return;
    }
    addItem({
      id: `ci-${Date.now()}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    });
    toast.success('Added to cart', { description: `${product.name} · ${selectedVariant.size}` });
  };

  const handleWishlist = () => {
    toggleItem(product.id);
    toast(inWishlist ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ backgroundColor: '#FCF8F3', minHeight: '100vh' }}
    >
      {/* World accent top stripe */}
      {world && (
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${accent.secondary} 0%, ${accent.primary} 50%, ${accent.secondary} 100%)`,
          }}
        />
      )}

      {/* ── World-tinted editorial band ── */}
      {world && (
        <div
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${accent.bg}50 0%, transparent 100%)`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{world.emoji}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase" style={{ color: accent.primary, letterSpacing: '0.22em' }}>
                    From the {world.name} World
                  </p>
                  <p className="text-xs italic font-light mt-0.5" style={{ color: '#69707D' }}>
                    "{world.tagline}"
                  </p>
                </div>
              </div>
              <Link
                to={`/worlds/${world.slug}`}
                className="text-[10px] font-bold uppercase hidden sm:inline-flex items-center gap-1.5 transition-all hover:gap-2.5"
                style={{ color: accent.primary, letterSpacing: '0.22em' }}
              >
                Enter World <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs mb-8" style={{ color: '#9CA3AF' }}>
          <Link to="/" className="hover:text-[#202432] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-[#202432] transition-colors">Shop</Link>
          {world && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link
                to={`/worlds/${world.slug}`}
                className="hover:text-[#202432] transition-colors flex items-center gap-1"
              >
                <Globe className="w-3 h-3" />
                {world.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: '#202432', fontWeight: 500 }}>{product.name}</span>
        </nav>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-[55%_1fr] gap-10 lg:gap-16">

          {/* ── Image Gallery ── */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0.7, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-3xl overflow-hidden border"
                style={{
                  aspectRatio: '3/4',
                  backgroundColor: accent.bg,
                  borderColor: '#E8DED2',
                  boxShadow: '0 4px 32px rgba(32,36,50,0.08)',
                }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Badge overlay */}
                {product.badges.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: product.badges[0] === 'bestseller' ? '#B8924A'
                          : product.badges[0] === 'new' ? '#27324B'
                          : '#9BAA8B',
                        color: '#FFFFFF',
                      }}
                    >
                      {product.badges[0] === 'bestseller' ? 'Bestseller'
                        : product.badges[0] === 'new' ? 'New In'
                        : product.badges[0]}
                    </span>
                  </div>
                )}
                {/* Wishlist shortcut on image */}
                <button
                  onClick={handleWishlist}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: inWishlist ? '#FFF1F2' : 'rgba(255,255,255,0.88)',
                    boxShadow: '0 2px 8px rgba(32,36,50,0.12)',
                  }}
                >
                  <Heart
                    className="w-4 h-4"
                    style={{ color: inWishlist ? '#E7495D' : '#9CA3AF', fill: inWishlist ? '#E7495D' : 'none' }}
                  />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className="relative rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0"
                    style={{
                      width: 72,
                      height: 72,
                      borderColor: selectedImage === idx ? accent.primary : '#E8DED2',
                      boxShadow: selectedImage === idx ? `0 0 0 1px ${accent.primary}` : 'none',
                    }}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">

            {/* World chip + brand label */}
            <div className="flex items-center gap-2.5 mb-4 flex-wrap">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ color: '#9CA3AF' }}
              >
                Fabrician
              </p>
              {world && <WorldChip world={world} size="sm" asLink />}
              {product.fabric && (
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                  style={{
                    backgroundColor: accent.bg,
                    borderColor: accent.secondary,
                    color: accent.primary,
                  }}
                >
                  {product.fabric.split(',')[0].trim()}
                </span>
              )}
            </div>

            {/* Product name */}
            <h1
              className="font-display font-semibold leading-tight mb-3"
              style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: '#202432', letterSpacing: '-0.02em' }}
            >
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#69707D' }}>
              {product.shortDescription}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    style={{
                      fill: i <= Math.floor(product.rating) ? '#C8A57A' : '#E8DED2',
                      color: i <= Math.floor(product.rating) ? '#C8A57A' : '#E8DED2',
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: '#202432' }}>{product.rating}</span>
              <span className="text-sm" style={{ color: '#9CA3AF' }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-bold font-display"
                style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#202432' }}
              >
                {formatPriceBDT(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-base line-through" style={{ color: '#9CA3AF' }}>
                    {formatPriceBDT(product.compareAtPrice!)}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}
                  >
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Craft note */}
            <p className="text-xs italic mb-4" style={{ color: '#9CA3AF' }}>
              Ethically made in small batches · GOTS-certified fabric · No shortcuts.
            </p>

            {/* Stock badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: stockInfo.label === 'In Stock' ? '#F0FDF4' : '#FFF7ED',
                color: stockInfo.label === 'In Stock' ? '#15803D' : '#C2410C',
              }}
            >
              <Check className="w-3.5 h-3.5" />
              {stockInfo.label}
            </div>

            <div className="h-px mb-6" style={{ backgroundColor: '#E8DED2' }} />

            {/* Size Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-sm font-semibold" style={{ color: '#202432' }}>Size</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((variant) => {
                  const outOfStock = variant.stock === 0;
                  const isSelected = selectedVariant?.size === variant.size;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => !outOfStock && setSelectedVariant(variant)}
                      disabled={outOfStock}
                      className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
                      style={{
                        backgroundColor: isSelected ? accent.primary : outOfStock ? 'transparent' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : outOfStock ? '#D1D5DB' : '#202432',
                        borderColor: isSelected ? accent.primary : outOfStock ? '#E8DED2' : '#E8DED2',
                        textDecoration: outOfStock ? 'line-through' : 'none',
                        cursor: outOfStock ? 'not-allowed' : 'pointer',
                        boxShadow: isSelected ? `0 0 0 1px ${accent.primary}` : 'none',
                        opacity: outOfStock ? 0.45 : 1,
                      }}
                    >
                      {variant.size}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px]" style={{ color: '#B8924A' }}>
                Size guide — what fits best?
              </p>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-2.5 block" style={{ color: '#202432' }}>
                Color:{' '}
                <span className="font-normal" style={{ color: '#69707D' }}>{selectedVariant?.color}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {uniqueColors.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    title={variant.color}
                    className="w-9 h-9 rounded-full border-2 transition-all duration-200"
                    style={{
                      backgroundColor: variant.colorHex,
                      borderColor: selectedVariant?.color === variant.color ? accent.primary : '#E8DED2',
                      transform: selectedVariant?.color === variant.color ? 'scale(1.12)' : 'scale(1)',
                      boxShadow: selectedVariant?.color === variant.color
                        ? `0 0 0 2px #FFFFFF, 0 0 0 3px ${accent.primary}`
                        : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-2.5 block" style={{ color: '#202432' }}>Quantity</label>
              <div
                className="inline-flex items-center rounded-xl overflow-hidden border"
                style={{ borderColor: '#E8DED2' }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#F6F1EA]"
                >
                  <Minus className="w-4 h-4" style={{ color: '#69707D' }} />
                </button>
                <span className="w-12 text-center text-sm font-bold" style={{ color: '#202432' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant?.stock || 1, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#F6F1EA]"
                >
                  <Plus className="w-4 h-4" style={{ color: '#69707D' }} />
                </button>
              </div>
            </div>

            {/* Add to cart + Wishlist */}
            <div className="flex gap-3 mb-7">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-base font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(184,146,74,0.30)',
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className="w-14 flex items-center justify-center rounded-2xl border-2 transition-all"
                style={{
                  borderColor: inWishlist ? '#E7495D' : '#E8DED2',
                  backgroundColor: inWishlist ? '#FFF1F2' : '#FFFFFF',
                }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: inWishlist ? '#E7495D' : '#9CA3AF',
                    fill: inWishlist ? '#E7495D' : 'none',
                  }}
                />
              </button>
            </div>

            {/* Delivery estimate — expandable zone widget */}
            <DeliveryEstimate className="mb-3" />

            {/* Trust pillars */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Truck, text: 'Free BD Delivery', sub: 'All 64 districts' },
                { icon: Shield, text: 'Baby Safe', sub: 'Tested materials' },
                { icon: Leaf, text: 'Organic Cotton', sub: 'GOTS certified' },
                { icon: RotateCcw, text: '7-Day Returns', sub: 'Hassle-free' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 p-3 rounded-xl border"
                  style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2' }}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#B8924A' }} />
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: '#202432' }}>{item.text}</p>
                    <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── World Story section ── */}
        {world && product.descriptionStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-3xl p-8 sm:p-10 border"
            style={{ backgroundColor: accent.bg, borderColor: accent.secondary + '50' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{world.emoji}</span>
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: accent.primary }}
                >
                  Inside the {world.name} World
                </p>
                <p className="text-sm italic font-medium" style={{ color: accent.primary }}>
                  "{world.tagline}"
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#69707D' }}>
              {product.descriptionStory}
            </p>
            <Link
              to={`/worlds/${world.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold mt-5 transition-all hover:gap-2.5"
              style={{ color: accent.primary }}
            >
              Explore more {world.name} pieces →
            </Link>
          </motion.div>
        )}

        {/* ── Why Parents Love It ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl p-8 sm:p-10 border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E8DED2' }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3"
            style={{ color: '#9CA3AF' }}
          >
            Why Parents Love It
          </p>
          <h3
            className="font-display font-semibold mb-6"
            style={{ fontSize: 'clamp(1.15rem,2.5vw,1.5rem)', color: '#202432', letterSpacing: '-0.01em' }}
          >
            Comfort you can feel the moment you touch it.
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Leaf,     title: 'Soft on skin',             body: 'Baby-safe organic cotton, gentle enough for the most sensitive newborn skin.',     color: '#7A8F69' },
              { icon: Star,     title: 'Easy daily wear',          body: 'Kimono snap closure makes dressing simple, calm, and frustration-free.',           color: '#C8A57A' },
              { icon: Heart,    title: 'Gift-worthy look',         body: 'Premium quality that parents notice immediately — beautiful enough to give.',        color: '#C46478' },
              { icon: Shield,   title: 'Comfort-first construction', body: 'No rough seams, no harsh dyes. Only what belongs against a baby\'s skin.',        color: '#5A89B8' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3.5 p-4 rounded-2xl"
                style={{ backgroundColor: '#F6F1EA' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
                >
                  <item.icon className="w-4.5 h-4.5" style={{ color: item.color, width: 18, height: 18 }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#202432' }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#69707D' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── See the Pattern Up Close ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 rounded-3xl overflow-hidden border"
          style={{ borderColor: '#E8DED2' }}
        >
          <div className="grid sm:grid-cols-3 gap-0">
            {product.images.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ aspectRatio: i === 0 ? '3/2' : '3/2', backgroundColor: accent.bg }}
              >
                <img
                  src={img}
                  alt={`Pattern detail ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {i === 0 && (
                  <div
                    className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: 'rgba(32,36,50,0.65)', color: '#F8F2E8', backdropFilter: 'blur(6px)' }}
                  >
                    See the Pattern Up Close
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Pairs Beautifully With (matching pajama / kimono) ── */}
        {(() => {
          // Find the matching counterpart in same world (kimono ↔ pajama)
          const matchCategory = product.category === 'kimono' ? 'pajama' : 'kimono';
          const samePajama = allProducts.find(
            (p) => p.category === matchCategory && p.world === product.world && p.id !== product.id
          );
          const fallback = allProducts.find(
            (p) => p.category === matchCategory && p.id !== product.id
          );
          const match = samePajama || fallback;
          if (!match) return null;

          const total = product.price + match.price;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-10 rounded-3xl border overflow-hidden"
              style={{ borderColor: '#E8DED2', backgroundColor: '#FFFFFF' }}
            >
              <div className="grid sm:grid-cols-[1fr_1fr_1.2fr] gap-0">
                {/* Current product mini */}
                <div className="p-6 sm:p-7 flex flex-col justify-between" style={{ backgroundColor: accent.bg + '60' }}>
                  <p className="text-[10px] font-bold uppercase mb-3" style={{ color: accent.primary, letterSpacing: '0.22em' }}>
                    This piece
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border"
                      style={{ borderColor: '#E8DED2' }}
                    >
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-display font-medium leading-tight truncate" style={{ color: '#202432' }}>
                        {product.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
                        {formatPriceBDT(product.price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Match product mini */}
                <Link
                  to={`/product/${match.slug}`}
                  className="p-6 sm:p-7 flex flex-col justify-between transition-colors hover:bg-[#F6F1EA]"
                  style={{ borderLeft: '1px solid #E8DED2' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <PlusIcon className="w-3.5 h-3.5" style={{ color: '#C8A57A' }} />
                    <p className="text-[10px] font-bold uppercase" style={{ color: '#C8A57A', letterSpacing: '0.22em' }}>
                      Pairs beautifully with
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border"
                      style={{ borderColor: '#E8DED2', backgroundColor: match.accent.bg }}
                    >
                      <img src={match.images[0]} alt={match.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-display font-medium leading-tight truncate" style={{ color: '#202432' }}>
                        {match.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
                        {formatPriceBDT(match.price)}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Bundle CTA */}
                <div
                  className="p-6 sm:p-7 flex flex-col justify-between"
                  style={{ background: 'linear-gradient(135deg, #141B2C 0%, #27324B 100%)', color: '#F8F2E8' }}
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase mb-2" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
                      Complete the Set
                    </p>
                    <p
                      className="font-display font-semibold leading-tight mb-1"
                      style={{ fontSize: '1.4rem', color: '#F8F2E8', letterSpacing: '-0.018em' }}
                    >
                      Bundle them.
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,242,232,0.55)' }}>
                      A coordinated gift set, beautifully wrapped.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div>
                      <p className="text-[10px] uppercase" style={{ color: 'rgba(248,242,232,0.45)', letterSpacing: '0.16em' }}>Together</p>
                      <p className="text-base font-display font-bold" style={{ color: '#C7A36A' }}>{formatPriceBDT(total)}</p>
                    </div>
                    <Link
                      to="/#gift-builder"
                      onClick={(e) => {
                        if (window.location.pathname === '/') {
                          e.preventDefault();
                          document.getElementById('gift-builder')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #C7A36A 0%, #9E7E5D 100%)', color: '#1E140A', letterSpacing: '0.04em' }}
                    >
                      Build Set <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* ── Tabs ── */}
        <div className="mt-14 lg:mt-16">
          <Tabs defaultValue="description">
            <TabsList
              className="w-full sm:w-auto h-auto bg-transparent p-0 rounded-none gap-0 border-b"
              style={{ borderColor: '#E8DED2' }}
            >
              {['description', 'care', 'size', 'shipping'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent px-5 py-3 text-sm font-medium capitalize transition-colors"
                  style={{
                    color: '#9CA3AF',
                  }}
                  data-tabs-value={tab}
                >
                  {tab === 'size' ? 'Size Guide' : tab === 'care' ? 'Care Guide' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="mt-8 max-w-3xl">
              <p className="text-sm leading-relaxed" style={{ color: '#69707D' }}>{product.description}</p>
              <div
                className="mt-5 p-4 rounded-2xl border"
                style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2' }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: '#9CA3AF' }}
                >
                  Fabric
                </p>
                <p className="text-sm font-medium" style={{ color: '#202432' }}>{product.fabric}</p>
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-8 max-w-3xl">
              <ul className="space-y-3">
                {product.careInstructions.map((instr, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm" style={{ color: '#69707D' }}>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: accent.bg }}
                    >
                      <Check className="w-3.5 h-3.5" style={{ color: accent.primary }} />
                    </span>
                    {instr}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="size" className="mt-8 max-w-3xl">
              <div
                className="overflow-x-auto rounded-2xl border"
                style={{ borderColor: '#E8DED2' }}
              >
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: '#F6F1EA' }}>
                    <tr>
                      {['Size', 'Age', 'Weight', 'Height'].map((h) => (
                        <th
                          key={h}
                          className="text-left py-3 px-4 text-xs uppercase tracking-wide font-semibold"
                          style={{ color: '#9CA3AF' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeGuide.map((entry, i) => (
                      <tr
                        key={entry.size}
                        className="border-t"
                        style={{
                          backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAF9',
                          borderColor: '#E8DED2',
                        }}
                      >
                        <td className="py-3 px-4 font-semibold" style={{ color: '#202432' }}>{entry.size}</td>
                        <td className="py-3 px-4" style={{ color: '#69707D' }}>{entry.age}</td>
                        <td className="py-3 px-4" style={{ color: '#69707D' }}>{entry.weight}</td>
                        <td className="py-3 px-4" style={{ color: '#69707D' }}>{entry.height}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8 max-w-3xl">
              <div className="space-y-4 text-sm" style={{ color: '#69707D' }}>
                <p className="font-medium" style={{ color: '#202432' }}>
                  Free delivery to all 64 districts of Bangladesh.
                </p>
                <div className="space-y-2.5">
                  {[
                    { zone: 'Dhaka Metro', time: '2–3 business days' },
                    { zone: 'Other Major Cities', time: '3–5 business days' },
                    { zone: 'Rest of Bangladesh', time: '5–7 business days' },
                  ].map((row) => (
                    <div key={row.zone} className="flex items-center gap-3">
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#B8924A' }} />
                      <span>
                        <span className="font-medium" style={{ color: '#202432' }}>{row.zone}:</span>{' '}
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  className="text-xs px-4 py-3 rounded-xl border"
                  style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2', color: '#69707D' }}
                >
                  Orders placed before 3 PM are processed the same day.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 lg:mt-20">
            <div className="mb-8">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                style={{ color: '#9CA3AF' }}
              >
                More Like This
              </p>
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)', color: '#202432', letterSpacing: '-0.01em' }}
              >
                Complete the World
              </h2>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}

        {/* ── Recently Viewed ── */}
        <RecentlyViewedStrip excludeId={product.id} className="pb-24 lg:pb-6" />
      </div>

      {/* ── Mobile sticky purchase rail ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 border-t"
        style={{
          backgroundColor: 'rgba(252,248,243,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: '#E8DED2',
          boxShadow: '0 -4px 24px rgba(32,36,50,0.08)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: '#202432' }}>
              {product.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold" style={{ color: '#202432' }}>
                {formatPriceBDT(product.price)}
              </span>
              {selectedVariant && (
                <span className="text-xs" style={{ color: '#9CA3AF' }}>· {selectedVariant.size}</span>
              )}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all disabled:opacity-40 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
              color: '#FFFFFF',
              boxShadow: '0 3px 16px rgba(184,146,74,0.30)',
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
        <p className="text-center text-[10px] mt-1.5" style={{ color: '#9CA3AF' }}>
          Free delivery · All over Bangladesh
        </p>
      </div>
    </motion.div>
  );
}
