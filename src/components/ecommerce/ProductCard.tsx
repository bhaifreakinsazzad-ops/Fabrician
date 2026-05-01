import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { cn } from '@/lib/utils';
import { WorldChip } from '@/components/ecommerce/WorldChip';
import { worlds } from '@/data/worlds';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
}

const BADGE_MAP: Record<string, { label: string; bg: string; text: string }> = {
  bestseller: { label: 'Bestseller', bg: '#C8A57A', text: '#FFFFFF' },
  new:        { label: 'New In',     bg: '#27324B', text: '#FFFFFF' },
  sale:       { label: 'Sale',       bg: '#C46478', text: '#FFFFFF' },
  organic:    { label: 'Organic',    bg: '#7A8F69', text: '#FFFFFF' },
  limited:    { label: 'Limited',    bg: '#4A4A52', text: '#FFFFFF' },
  giftable:   { label: 'Gift ✦',    bg: '#E7C9CF', text: '#7A2535' },
};

export function ProductCard({ product, className, featured }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const { addItem } = useCart();
  const { toggleItem: wishlistToggle, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const world = worlds.find((w) => w.slug === product.world);
  const accent = product.accent;
  const badge = product.badges[0];
  const firstVariant = product.variants[0];
  const displayPrice = `৳${product.price.toLocaleString()}`;
  const comparePrice = product.compareAtPrice ? `৳${product.compareAtPrice.toLocaleString()}` : null;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    addItem({
      id: `${product.id}-${firstVariant.id}`,
      productId: product.id,
      variantId: firstVariant.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: firstVariant.size,
      color: firstVariant.color,
      quantity: 1,
      world: product.world,
    });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    wishlistToggle(product.id);
  }

  return (
    <Link to={`/product/${product.slug}`}>
      <motion.div
        className={cn(
          'group relative flex flex-col rounded-[1.25rem] overflow-hidden bg-white cursor-pointer',
          'border transition-colors duration-300',
          featured && 'shadow-soft',
          className
        )}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(32,36,50,0.10), 0 4px 10px rgba(32,36,50,0.05)' }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{ borderColor: hovered ? accent.secondary : '#E8DED2' }}
      >
        {/* ── Image ── */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '3 / 4',
            backgroundColor: hovered ? accent.bg : '#F6F1EA',
            transition: 'background-color 400ms ease',
          }}
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />

          {badge && BADGE_MAP[badge] && (
            <div
              className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
              style={{ backgroundColor: BADGE_MAP[badge].bg, color: BADGE_MAP[badge].text }}
            >
              {BADGE_MAP[badge].label}
            </div>
          )}

          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 shadow-soft"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className="w-3.5 h-3.5 transition-all"
              style={{
                fill: wishlisted ? '#C46478' : 'none',
                stroke: wishlisted ? '#C46478' : '#202432',
                strokeWidth: 1.5,
              }}
            />
          </button>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-0 left-0 right-0 p-3"
              >
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
                  style={{ backgroundColor: addedFlash ? '#7A8F69' : accent.primary, color: '#FFFFFF' }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {addedFlash ? 'Added ✓' : `Quick Add · ${firstVariant?.size}`}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col gap-1.5 p-3.5 pb-4 flex-1">
          {world && <WorldChip world={world} size="sm" />}

          <h3
            className="font-display font-medium text-sm leading-snug line-clamp-2"
            style={{ color: '#202432' }}
          >
            {product.name}
          </h3>

          {product.reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" style={{ color: '#C8A57A' }} />
              <span className="text-[10px] font-medium" style={{ color: '#69707D' }}>
                {product.rating.toFixed(1)} · {product.reviewCount}
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-sm font-bold" style={{ color: '#202432' }}>{displayPrice}</span>
            {comparePrice && (
              <span className="text-[11px] line-through" style={{ color: '#9CA3AF' }}>{comparePrice}</span>
            )}
          </div>

          <div className="text-[10px] uppercase tracking-widest font-medium mt-0.5" style={{ color: '#C8A57A' }}>
            {product.category === 'kimono' ? 'Kimono Bodysuit' : 'Pajama Set'}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
