import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowUpDown, LayoutGrid, List, X, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories, priceRanges } from '@/data/products';
import { worlds } from '@/data/worlds';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { EditorialBreakCard } from '@/components/ecommerce/EditorialBreakCard';
import { FilterPanel } from '@/components/ecommerce/FilterPanel';
import type { FilterState } from '@/components/ecommerce/FilterPanel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { SortOption, ViewMode } from '@/types';

// Guided shopping entry tiles — Shop by World is dominant
const MOOD_TILES = [
  { label: 'Shop by World',    sub: '13 curated worlds',     href: '/worlds',                       bg: '#1E140A', fg: '#F8F2E8', emoji: '✦', span: 2, dominant: true },
  { label: 'Shop by Gift',     sub: 'Gift sets · ready',     href: '/shop?collection=gift-picks',   bg: '#FFF7EE', fg: '#202432', emoji: '🎁', span: 1 },
  { label: 'Shop by Age',      sub: '0–12 months',           href: '/shop?collection=newborn-essentials', bg: '#F2F5EF', fg: '#202432', emoji: '👶', span: 1 },
  { label: 'Shop by Mood',     sub: 'Calm · Wild · Bloom',   href: '/worlds',                       bg: '#F0EEF5', fg: '#202432', emoji: '☁️', span: 1 },
  { label: 'Shop by Occasion', sub: 'Eid · Shower · Birth',  href: '/shop?collection=gift-picks',   bg: '#FAF0F2', fg: '#202432', emoji: '🌙', span: 1 },
];

const COLLECTION_META: Record<string, { tagline: string; heroSubtext: string; emoji: string }> = {
  'kimono-bodysuits': {
    tagline: 'Kimono Bodysuits',
    heroSubtext: 'Side-snap kimono style. No-fuss dressing with world-class prints. Made for 0–12 months.',
    emoji: '👘',
  },
  'pajama-sets': {
    tagline: 'Pajama Sets',
    heroSubtext: 'Soft two-piece sets for the dreamiest little nights. Gentle elastic, gentle fabric, gentle worlds.',
    emoji: '🌙',
  },
  'gift-picks': {
    tagline: 'Gift Picks',
    heroSubtext: 'Beautifully curated for baby showers, naming ceremonies, and every moment worth celebrating.',
    emoji: '🎁',
  },
  'new-in': {
    tagline: 'New In',
    heroSubtext: 'Fresh worlds, just arrived. The newest prints from the Fabrician atelier.',
    emoji: '✨',
  },
  'bestsellers': {
    tagline: 'Bestsellers',
    heroSubtext: 'The worlds everyone loves. Chosen by parents across Bangladesh.',
    emoji: '⭐',
  },
  'dreamy-neutrals': {
    tagline: 'Dreamy Neutrals',
    heroSubtext: 'Muted tones, maximum softness. For when you want beauty without loudness.',
    emoji: '🤍',
  },
  'animal-worlds': {
    tagline: 'Animal Worlds',
    heroSubtext: 'Safari mornings, forest naps, jungle dreams. The wildest little wardrobes.',
    emoji: '🦁',
  },
  'moon-cloud-collection': {
    tagline: 'Moon & Cloud',
    heroSubtext: 'Celestial softnessfor the smallest dreamers under the biggest sky.',
    emoji: '☁️',
  },
  // Legacy collections — kept for URL backward compat
  'newborn-essentials': {
    tagline: 'Newborn Essentials',
    heroSubtext: 'Everything for the first precious days. Soft, safe, and ready the moment they arrive.',
    emoji: '👶',
  },
  'soft-cotton': {
    tagline: 'Soft Cotton',
    heroSubtext: 'Breathable everyday wear that moves with them. Because comfort is everything.',
    emoji: '🌿',
  },
  'premium-organic': {
    tagline: 'Premium Organic',
    heroSubtext: 'GOTS-certified organic cotton. As gentle as possible, always.',
    emoji: '🌱',
  },
};

export default function ShopPage() {
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection');
  const worldParam = searchParams.get('world');

  const [filters, setFilters] = useState<FilterState>({
    categories: category ? [category] : [],
    sizes: [],
    colors: [],
    priceRange: null,
  });
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const activeWorld = worldParam ? worlds.find((w) => w.slug === worldParam) : null;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (collectionParam) {
      result = result.filter((p) => p.collection.includes(collectionParam));
    }
    if (worldParam) {
      result = result.filter((p) => (p as any).world === worldParam);
    }
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.variants.some((v) => filters.sizes.includes(v.size)));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.variants.some((v) => filters.colors.includes(v.color)));
    }
    if (filters.priceRange) {
      const range = priceRanges.find((r) => r.label === filters.priceRange);
      if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    switch (sortBy) {
      case 'price_low': result.sort((a, b) => a.price - b.price); break;
      case 'price_high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [filters, sortBy, collectionParam, worldParam]);

  const activeCategory = category ? categories.find((c) => c.slug === category) : null;

  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange ? 1 : 0) +
    (worldParam ? 1 : 0);

  const clearFilter = (type: string, value?: string) => {
    switch (type) {
      case 'category': setFilters({ ...filters, categories: filters.categories.filter((c) => c !== value) }); break;
      case 'size': setFilters({ ...filters, sizes: filters.sizes.filter((s) => s !== value) }); break;
      case 'color': setFilters({ ...filters, colors: filters.colors.filter((c) => c !== value) }); break;
      case 'price': setFilters({ ...filters, priceRange: null }); break;
      case 'world': {
        const next = new URLSearchParams(searchParams);
        next.delete('world');
        setSearchParams(next);
        break;
      }
    }
  };

  const setWorldFilter = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    if (worldParam === slug) {
      next.delete('world');
    } else {
      next.set('world', slug);
    }
    setSearchParams(next);
  };

  const collectionMeta = collectionParam ? COLLECTION_META[collectionParam] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FCF8F3' }}>

      {/* ── Page header ── */}
      {collectionMeta ? (
        <div
          className="relative overflow-hidden border-b"
          style={{
            background:
              'radial-gradient(ellipse at 70% 40%, rgba(200,165,122,0.14) 0%, transparent 55%),' +
              'radial-gradient(ellipse at 15% 70%, rgba(155,170,139,0.10) 0%, transparent 55%),' +
              '#FCF8F3',
            borderColor: '#E8DED2',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-4xl block mb-4">{collectionMeta.emoji}</span>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                style={{ color: '#B8924A' }}
              >
                Collection
              </p>
              <h1
                className="font-display font-semibold tracking-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', color: '#202432', letterSpacing: '-0.02em' }}
              >
                {collectionMeta.tagline}
              </h1>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: '#69707D' }}>
                {collectionMeta.heroSubtext}
              </p>
            </motion.div>
          </div>
        </div>
      ) : activeWorld ? (
        <div
          className="relative overflow-hidden border-b"
          style={{
            background:
              `radial-gradient(ellipse at 65% 35%, ${activeWorld.accent.bg} 0%, transparent 60%),` +
              '#FCF8F3',
            borderColor: '#E8DED2',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <Link
                  to="/worlds"
                  className="inline-flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: '#B8924A' }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  All Worlds
                </Link>
                <span style={{ color: '#E8DED2' }}>·</span>
                <span className="text-xs" style={{ color: '#9CA3AF' }}>Filtering by world</span>
              </div>
              <div className="text-4xl mb-3">{activeWorld.emoji}</div>
              <h1
                className="font-display font-semibold mb-2"
                style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: '#202432', letterSpacing: '-0.02em' }}
              >
                {activeWorld.name}
              </h1>
              <p className="text-sm italic mb-1" style={{ color: activeWorld.accent.primary }}>
                "{activeWorld.tagline}"
              </p>
            </motion.div>
          </div>
        </div>
      ) : (
        <div
          className="border-b"
          style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-display italic font-light leading-none"
                  style={{ fontSize: '2rem', color: '#C7A36A', letterSpacing: '-0.02em' }}
                >
                  ✦
                </span>
                <span className="h-px w-10" style={{ backgroundColor: 'rgba(199,163,106,0.45)' }} />
                <span className="text-[10px] font-bold uppercase" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
                  The Collection
                </span>
              </div>
              <h1
                className="font-display font-semibold leading-[0.98] mb-3"
                style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#202432', letterSpacing: '-0.025em' }}
              >
                {activeCategory ? activeCategory.name : (
                  <>The full edit, <em className="italic font-light">curated.</em></>
                )}
              </h1>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: '#69707D', maxWidth: '50ch' }}>
                {activeCategory
                  ? activeCategory.description
                  : '22 signature designs · 13 soft worlds · 0–12 months · Free delivery across Bangladesh.'}
              </p>
            </motion.div>

            {/* Mood entry tiles */}
            {!activeCategory && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-8"
              >
                {MOOD_TILES.map((t) => (
                  <Link
                    key={t.label}
                    to={t.href}
                    className={`group relative rounded-2xl overflow-hidden p-5 border transition-all hover:translate-y-[-2px] ${t.span === 2 ? 'col-span-2' : ''}`}
                    style={{
                      backgroundColor: t.bg,
                      color: t.fg,
                      borderColor: t.dominant ? 'rgba(199,163,106,0.25)' : 'rgba(0,0,0,0.05)',
                      minHeight: t.dominant ? '180px' : '140px',
                      boxShadow: t.dominant ? '0 8px 32px rgba(20,27,44,0.18)' : 'none',
                    }}
                  >
                    {t.dominant && (
                      <div
                        className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.35) 0%, transparent 70%)' }}
                      />
                    )}
                    <span
                      className="absolute opacity-15 pointer-events-none"
                      style={{ fontSize: t.dominant ? '7rem' : '4rem', right: '0.5rem', bottom: t.dominant ? '-1.5rem' : '-1rem', lineHeight: 1 }}
                    >
                      {t.emoji}
                    </span>
                    <p className="text-[10px] font-bold uppercase mb-1 relative" style={{ color: t.dominant ? '#C7A36A' : '#9CA3AF', letterSpacing: '0.22em' }}>
                      {t.dominant ? '✦ Signature Path' : 'Curated'}
                    </p>
                    <p className="font-display font-semibold relative" style={{ color: t.fg, fontSize: t.dominant ? '1.4rem' : '1rem', lineHeight: 1.15 }}>
                      {t.label}
                    </p>
                    <p className="text-xs mt-1 opacity-70 relative" style={{ color: t.fg }}>
                      {t.sub}
                    </p>
                    <span className="text-[10px] uppercase mt-3 inline-flex items-center gap-1 opacity-80 relative" style={{ color: t.dominant ? '#C7A36A' : '#B8924A', letterSpacing: '0.16em' }}>
                      Enter <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ── World filter strip ── */}
      <div
        className="border-b overflow-x-auto hide-scrollbar"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E8DED2' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] mr-1 shrink-0" style={{ color: '#9CA3AF' }}>
              World
            </span>
            <button
              onClick={() => { const next = new URLSearchParams(searchParams); next.delete('world'); setSearchParams(next); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all"
              style={{
                backgroundColor: !worldParam ? '#202432' : '#F6F1EA',
                color: !worldParam ? '#FFFFFF' : '#69707D',
              }}
            >
              All
            </button>
            {worlds.map((w) => {
              const isActive = worldParam === w.slug;
              return (
                <motion.button
                  key={w.slug}
                  onClick={() => setWorldFilter(w.slug)}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all"
                  style={{
                    backgroundColor: isActive ? w.accent.chip : '#F6F1EA',
                    color: isActive ? w.accent.chipText : '#69707D',
                  }}
                >
                  <span>{w.emoji}</span>
                  <span>{w.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <FilterPanel filters={filters} onFilterChange={setFilters} productCount={filteredProducts.length} />
            <span className="text-sm" style={{ color: '#69707D' }}>
              <span className="font-semibold" style={{ color: '#202432' }}>{filteredProducts.length}</span> products
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger
                className="w-[168px] rounded-xl h-9 text-sm"
                style={{ borderColor: '#E8DED2', backgroundColor: '#FFFFFF' }}
              >
                <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" style={{ color: '#9CA3AF' }} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>

            <div
              className="hidden sm:flex items-center rounded-xl overflow-hidden h-9 border"
              style={{ borderColor: '#E8DED2' }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={cn('px-3 h-full flex items-center transition-colors duration-150')}
                style={{
                  backgroundColor: viewMode === 'grid' ? '#C8A57A' : 'transparent',
                  color: viewMode === 'grid' ? '#FFFFFF' : '#9CA3AF',
                }}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn('px-3 h-full flex items-center transition-colors duration-150')}
                style={{
                  backgroundColor: viewMode === 'list' ? '#C8A57A' : 'transparent',
                  color: viewMode === 'list' ? '#FFFFFF' : '#9CA3AF',
                }}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Active filter chips ── */}
        <AnimatePresence>
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              {worldParam && (
                <button
                  onClick={() => clearFilter('world')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={{
                    backgroundColor: activeWorld ? activeWorld.accent.chip : '#F6F1EA',
                    color: activeWorld ? activeWorld.accent.chipText : '#202432',
                    borderColor: activeWorld ? activeWorld.accent.chip : '#E8DED2',
                  }}
                >
                  {activeWorld?.emoji} {activeWorld?.label}
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => clearFilter('category', cat)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2', color: '#202432' }}
                >
                  {categories.find((c) => c.id === cat)?.name || cat}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {filters.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => clearFilter('size', size)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2', color: '#202432' }}
                >
                  Size: {size}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {filters.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => clearFilter('color', color)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2', color: '#202432' }}
                >
                  {color}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {filters.priceRange && (
                <button
                  onClick={() => clearFilter('price')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2', color: '#202432' }}
                >
                  {filters.priceRange}
                  <X className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Content ── */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar — hidden on mobile (FilterPanel handles sheet) */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterPanel filters={filters} onFilterChange={setFilters} productCount={filteredProducts.length} />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24"
              >
                <div className="text-5xl mb-4">{activeWorld ? activeWorld.emoji : '🔍'}</div>
                <h3
                  className="font-display font-semibold text-xl mb-2"
                  style={{ color: '#202432' }}
                >
                  {activeWorld ? `No pieces in ${activeWorld.name} yet` : 'No products found'}
                </h3>
                <p className="text-sm mb-6" style={{ color: '#69707D' }}>
                  {activeWorld
                    ? `New ${activeWorld.name} pieces are on the way.`
                    : 'Try adjusting your filters.'}
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF' }}
                >
                  Browse all products
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {filteredProducts.map((product, idx) => {
                  const items: React.ReactNode[] = [
                    <ProductCard key={product.id} product={product} />,
                  ];

                  // Inject editorial break cards at strategic positions —
                  // only on the default (no-filter) view to preserve focus
                  // when browsing a specific world or collection.
                  const noFilters = !worldParam && !collectionParam && activeFiltersCount === 0;
                  if (noFilters) {
                    if (idx === 5) {
                      items.push(
                        <EditorialBreakCard
                          key="break-gift"
                          number="✦"
                          label="The Gift Atelier"
                          title="Build a Tiny Gift Set."
                          italic="four soft steps."
                          body="Choose a bodysuit, add a pajama, pick wrapping, write a note. Complimentary atelier wrapping on every order."
                          ctaLabel="Build a Gift"
                          ctaHref="/#gift-builder"
                          bgColor="#141B2C"
                          textColor="#F8F2E8"
                          emoji="🎁"
                        />
                      );
                    }
                    if (idx === 11) {
                      items.push(
                        <EditorialBreakCard
                          key="break-worlds"
                          number="✦"
                          label="The Atlas"
                          title="Browse by feeling,"
                          italic="not just by product."
                          body="Each Fabrician design lives in a curated emotional world — a soft palette, a quiet mood."
                          ctaLabel="Open the Atlas"
                          ctaHref="/worlds"
                          bgColor="#FFF7EE"
                          textColor="#202432"
                          emoji="✦"
                        />
                      );
                    }
                    if (idx === 17) {
                      items.push(
                        <EditorialBreakCard
                          key="break-studio"
                          number="✦"
                          label="The Studio · Trial"
                          title="Imagine a design"
                          italic="that doesn't exist yet."
                          body="Co-create with the Fabrician Atelier. A private, experimental concept flow — six gentle steps."
                          ctaLabel="Enter Studio"
                          ctaHref="/studio"
                          bgColor="#27324B"
                          textColor="#F8F2E8"
                          emoji="✦"
                        />
                      );
                    }
                  }

                  return items;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
