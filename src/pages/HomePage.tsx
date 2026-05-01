import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Gift, Truck, Leaf, Award, Heart } from 'lucide-react';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { WorldCard } from '@/components/ecommerce/WorldCard';
import { SoftTrustBar } from '@/components/ecommerce/SoftTrustBar';
import { GiftBuilder } from '@/components/ecommerce/GiftBuilder';
import { RecentlyViewedStrip } from '@/components/ecommerce/RecentlyViewedStrip';
import { Chapter, EditorialQuote, EditorialRule } from '@/components/editorial/Chapter';
import { products, getFeaturedProducts } from '@/data/products';
import { worlds, getFeaturedWorlds } from '@/data/worlds';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
});

const stagger = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  },
};

const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] } },
  },
};

// World preview data — interactive hero selector
const HERO_WORLDS = ['cloud-dream', 'moon-dream', 'bunny-garden', 'safari-calm', 'cherry-bloom', 'animal-parade'];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const featuredWorlds = getFeaturedWorlds();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.55]);

  // Active world for the interactive hero — drives accent, copy, preview product
  const [activeWorldSlug, setActiveWorldSlug] = useState<string>('moon-dream');
  const activeWorld = worlds.find((w) => w.slug === activeWorldSlug) || worlds[1];
  const activeWorldProduct = products.find((p) => p.world === activeWorldSlug) || products[0];

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#FCF8F3', color: '#202432' }}>

      {/* ════════ §0 BRAND BAR — luxury announcement strip ════════ */}
      <div
        className="hidden lg:block"
        style={{ backgroundColor: '#1E140A', borderBottom: '1px solid rgba(199,163,106,0.18)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-[10px]" style={{ color: 'rgba(248,242,232,0.55)', letterSpacing: '0.16em' }}>
            <span className="font-bold uppercase" style={{ color: '#C7A36A' }}>Fabrician · Fashion Atelier</span>
            <div className="flex items-center gap-6 uppercase font-medium">
              <span>Free Delivery · All 64 Districts of Bangladesh</span>
              <span className="w-1 h-1 rounded-full bg-[#C7A36A]" />
              <span>Fashion for dreamers of all ages · Spring 2026</span>
            </div>
            <span className="uppercase">EN · BN</span>
          </div>
        </div>
      </div>

      {/* ════════ §1 HERO — World Entrance: interactive world selector ════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[94vh] flex items-center overflow-hidden transition-colors duration-700 atelier-grain atelier-grain-dark"
        style={{
          background:
            'radial-gradient(ellipse at 78% 28%, rgba(199,163,106,0.20) 0%, transparent 52%),' +
            'radial-gradient(ellipse at 12% 72%, rgba(199,163,106,0.10) 0%, transparent 50%),' +
            'radial-gradient(ellipse at 50% 100%, rgba(25,31,47,0.85) 0%, transparent 60%),' +
            '#1E140A',
        }}
      >
        {/* Vertical edge label — fashion house signature */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-20" style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: 'rgba(199,163,106,0.65)', letterSpacing: '0.4em' }}>
            Spring · Summer · 26
          </span>
        </div>

        {/* Right edge serial label */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-20" style={{ writingMode: 'vertical-rl' }}>
          <span className="text-[10px] font-medium uppercase" style={{ color: 'rgba(248,242,232,0.30)', letterSpacing: '0.4em' }}>
            № 022 · Volume One
          </span>
        </div>

        {/* Luxury ambient glow + grain */}
        <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ y: heroParallax }}>
          <div
            className="absolute top-[8%] right-[5%] w-[460px] h-[460px] rounded-full opacity-20 animate-fabric-wave"
            style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.35) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[16%] left-[3%] w-[320px] h-[320px] rounded-full opacity-15 animate-blob"
            style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.25) 0%, transparent 70%)', animationDelay: '3s' }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
          />
        </motion.div>

        <motion.div style={{ opacity: heroFade }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center py-16 lg:py-24">

            {/* ── Copy column — World Entrance ── */}
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <span
                  className="font-display italic font-light leading-none"
                  style={{ fontSize: '2rem', color: '#C7A36A', letterSpacing: '-0.02em' }}
                >
                  01
                </span>
                <span className="h-px w-10" style={{ backgroundColor: 'rgba(199,163,106,0.45)' }} />
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{ color: '#C7A36A', letterSpacing: '0.22em' }}
                >
                  The World Entrance
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-semibold leading-[0.98]"
                style={{ fontSize: 'clamp(2.6rem,6.4vw,5rem)', color: '#F8F2E8', letterSpacing: '-0.03em' }}
              >
                Luxury Fashion
                <br />
                <span className="font-display italic font-light" style={{ color: '#F8F2E8' }}>
                  for
                </span>{' '}
                <span className="gold-foil">
                  Everyone.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.34 }}
                className="text-base leading-[1.7] max-w-[440px] font-light"
                style={{ color: 'rgba(248,242,232,0.62)' }}
              >
                Choose a world below — every design lives in its own soft universe.
                Tap a world to see its mood, its featured piece, and its accent of light.
              </motion.p>

              {/* ★ INTERACTIVE WORLD SELECTOR — the signature interaction ★ */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.42 }}
                className="flex flex-col gap-3"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(199,163,106,0.85)' }}>
                  ✦ Choose Your World
                </p>
                <div className="flex flex-wrap gap-2">
                  {HERO_WORLDS.map((slug) => {
                    const w = worlds.find((ww) => ww.slug === slug);
                    if (!w) return null;
                    const active = activeWorldSlug === slug;
                    return (
                      <button
                        key={slug}
                        onClick={() => setActiveWorldSlug(slug)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: active ? w.accent.chip : 'rgba(248,242,232,0.05)',
                          color: active ? w.accent.chipText : 'rgba(248,242,232,0.7)',
                          border: `1px solid ${active ? w.accent.primary : 'rgba(248,242,232,0.10)'}`,
                          boxShadow: active ? `0 4px 18px ${w.accent.primary}55` : 'none',
                          transform: active ? 'translateY(-1px)' : 'none',
                        }}
                      >
                        <span style={{ fontSize: '13px' }}>{w.emoji}</span>
                        <span>{w.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active world copy reveal */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWorld.slug}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="pt-2"
                  >
                    <p
                      className="font-display italic font-light text-base sm:text-lg leading-snug"
                      style={{ color: '#F8F2E8' }}
                    >
                      "{activeWorld.tagline}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* CTA row — driven by active world */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-wrap gap-3 items-center">
                  <Link
                    to={`/worlds/${activeWorld.slug}`}
                    className="btn-magnetic inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-95 active:scale-[0.97]"
                    style={{
                      background: `linear-gradient(135deg, ${activeWorld.accent.primary} 0%, ${activeWorld.accent.chipText} 100%)`,
                      color: '#FFFFFF',
                      boxShadow: `0 6px 28px ${activeWorld.accent.primary}66`,
                      letterSpacing: '0.02em',
                    }}
                  >
                    Enter {activeWorld.label} World
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-full transition-all"
                    style={{ color: '#F8F2E8', border: '1px solid rgba(199,163,106,0.45)' }}
                  >
                    Shop Collection
                  </Link>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: 'rgba(248,242,232,0.55)' }}>
                  <Link
                    to="#gift-builder"
                    onClick={(e) => { e.preventDefault(); document.getElementById('gift-builder')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C7A36A]"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    Build a Tiny Gift Set
                  </Link>
                  <Link to="/studio" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C7A36A]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Try Fabrician Studio
                  </Link>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    Free delivery · all of Bangladesh
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── Live World Preview Card ── */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[440px] lg:min-h-[560px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWorld.slug}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[420px]"
                >
                  {/* Ambient glow matching active world */}
                  <div
                    className="absolute -inset-12 rounded-full blur-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse, ${activeWorld.accent.primary}55 0%, transparent 70%)`,
                      opacity: 0.6,
                    }}
                  />

                  <div
                    className="relative rounded-[2rem] overflow-hidden"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: `0 40px 80px -20px ${activeWorld.accent.primary}66, 0 12px 24px rgba(0,0,0,0.25)`,
                    }}
                  >
                    {/* Top world ribbon */}
                    <div
                      className="px-5 py-3 flex items-center justify-between"
                      style={{ backgroundColor: activeWorld.accent.chip, color: activeWorld.accent.chipText }}
                    >
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: '18px' }}>{activeWorld.emoji}</span>
                        <span className="font-display font-semibold text-sm">{activeWorld.name} World</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-70">Featured</span>
                    </div>

                    {/* Product image */}
                    <div
                      style={{ aspectRatio: '4/5', backgroundColor: activeWorld.accent.bg }}
                      className="relative"
                    >
                      <img
                        src={activeWorldProduct.images[0]}
                        alt={activeWorldProduct.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Floating chip */}
                      <div
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.85)',
                          color: activeWorld.accent.chipText,
                          letterSpacing: '0.14em',
                        }}
                      >
                        ✦ Signature
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <p
                          className="font-display font-medium text-base leading-tight"
                          style={{ color: '#202432' }}
                        >
                          {activeWorldProduct.name}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#69707D' }}>
                          ৳ {activeWorldProduct.price.toLocaleString()} · {activeWorldProduct.category === 'kimono' ? 'Kimono Bodysuit' : 'Pajama Set'}
                        </p>
                      </div>
                      <Link
                        to={`/product/${activeWorldProduct.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] transition-all hover:gap-2"
                        style={{ color: activeWorld.accent.primary }}
                      >
                        View →
                      </Link>
                    </div>
                  </div>

                  {/* Floating mini-context — story + best-for */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="mt-4 px-4 py-3 rounded-2xl backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(248,242,232,0.06)',
                      border: '1px solid rgba(199,163,106,0.22)',
                    }}
                  >
                    <p className="text-xs leading-relaxed font-light" style={{ color: 'rgba(248,242,232,0.7)' }}>
                      {activeWorld.story.split('. ')[0]}.
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] font-bold uppercase" style={{ color: 'rgba(199,163,106,0.55)', letterSpacing: '0.32em' }}>
            Scroll · Enter the Worlds
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(180deg, rgba(199,163,106,0.45) 0%, transparent 100%)' }}
          />
        </div>
      </section>

      {/* ════════ §2 REAL TRUST STRIP — no fabricated press ════════ */}
      <section
        className="border-y py-6"
        style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs" style={{ color: '#69707D' }}>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5" style={{ color: '#C7A36A' }} />
              Free Delivery · All 64 Districts
            </span>
            <span style={{ color: '#E8DED2' }}>·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Leaf className="w-3.5 h-3.5" style={{ color: '#7A8F69' }} />
              Soft Organic Cotton
            </span>
            <span style={{ color: '#E8DED2' }}>·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5" style={{ color: '#C8A57A' }} />
              Atelier Finishing
            </span>
            <span style={{ color: '#E8DED2' }}>·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Heart className="w-3.5 h-3.5" style={{ color: '#C46478' }} />
              Open & Check Before Returning
            </span>
          </div>
        </div>
      </section>

      {/* ════════ §3 WORLD SELECTOR — atelier strip ════════ */}
      <section style={{ backgroundColor: '#FCF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[10px] font-bold uppercase shrink-0" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
              The Atlas →
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(199,163,106,0.25)' }} />
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {worlds.map((w) => (
              <Link key={w.slug} to={`/worlds/${w.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer shrink-0"
                  style={{ backgroundColor: w.accent.chip, color: w.accent.chipText }}
                >
                  <span>{w.emoji}</span>
                  <span>{w.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ §4 WORLDS GRID — Chapter 02 ════════ */}
      <section className="fab-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <Chapter
              number="02"
              label="The Worlds"
              title={<>Browse by feeling,<br/><em className="italic font-light">not just by product.</em></>}
              subtitle="Each Fabrician design lives in a curated emotional world — a soft palette, a mood, a story that wraps around the smallest dreamers."
            />
            <Link
              to="/worlds"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
              style={{ color: '#B8924A' }}
            >
              The full atlas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredWorlds.slice(0, 6).map((world) => (
              <motion.div key={world.id} {...staggerItem}>
                <WorldCard world={world} variant="default" />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 sm:hidden flex justify-center">
            <Link
              to="/worlds"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: '#F6F1EA', color: '#B8924A', border: '1px solid #E8DED2' }}
            >
              The full atlas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ §5 EDITORIAL QUOTE BREAK ════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FCF8F3 0%, #F6F1EA 100%)',
          padding: 'clamp(3rem,8vw,6rem) 0',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditorialQuote attribution="Fabrician Atelier · Spring 2026">
            We design soft worlds for everyone. Beginning with our kids collection —
            garments quiet enough to be remembered, beautiful enough to be cherished and saved.
          </EditorialQuote>
        </div>
      </section>

      {/* ════════ §6 FEATURED PRODUCTS — Chapter 03 ════════ */}
      <section className="fab-section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <Chapter
              number="03"
              label="The Edit"
              title={<>The signature pieces<br/><em className="italic font-light">parents return to.</em></>}
              subtitle="Bestsellers from across the worlds — the prints, fabrics, and silhouettes worth giving."
            />
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
              style={{ color: '#B8924A' }}
            >
              Shop all 22 designs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div {...stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.slice(0, 8).map((product) => (
              <motion.div key={product.id} {...staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(200,165,122,0.35)', letterSpacing: '0.02em' }}
            >
              View the full collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ §7 INTERACTIVE GIFT BUILDER — Chapter 04 ════════ */}
      <section
        id="gift-builder"
        className="fab-section"
        style={{ background: 'linear-gradient(165deg, #27324B 0%, #202432 55%, #1A1E30 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_600px] gap-12 lg:gap-20 items-start">

            {/* Left — editorial copy */}
            <div className="lg:pt-2">
              <Chapter
                number="04"
                label="The Gift Atelier"
                tone="dark"
                title={<>The gift they will<br/><em className="italic font-light" style={{ color: '#C8A57A' }}>grow into.</em></>}
                subtitle="Curate the perfect tiny gift in four steps. Choose a bodysuit, add a pajama, pick your wrapping, add a personal note — then it's ready."
              />

              <EditorialRule label="Gifting Occasions" tone="dark" />

              <div className="flex flex-wrap gap-2.5 mb-6">
                {['Eid Gift', 'New Arrival', 'Milestone Moments', 'Birthday Gifts', 'Celebrations'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(246,241,234,0.06)', color: 'rgba(246,241,234,0.72)', border: '1px solid rgba(246,241,234,0.15)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 max-w-[400px]">
                {[
                  { icon: '✦', text: 'Pick from 22 world-themed signature designs' },
                  { icon: '🎁', text: 'Complimentary atelier wrapping on every order' },
                  { icon: '✍︎', text: 'Add a hand-set personal gift note' },
                  { icon: '🚚', text: 'Free delivery across all 64 districts of Bangladesh' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span style={{ color: '#C7A36A', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.icon}</span>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,234,0.6)' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — interactive builder */}
            <motion.div {...fadeUp(0.15)}>
              <GiftBuilder />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ §8 STUDIO TEASER — Chapter 05 ════════ */}
      <section className="fab-section" style={{ backgroundColor: '#FCF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Chapter
              number="05"
              label="The Studio · Trial Preview"
              title={<>Imagine the design<br/><em className="italic font-light">that doesn't exist yet.</em></>}
              subtitle="Fabrician Studio is a private, experimental atelier where you can co-create a fashion concept — uploaded inspirations, custom names, gentle preferences. A future custom-order foundation."
            />

            <motion.div
              {...fadeUp(0.2)}
              className="relative rounded-[2rem] overflow-hidden p-8 lg:p-10"
              style={{
                background: 'linear-gradient(135deg, #141B2C 0%, #27324B 100%)',
                boxShadow: '0 30px 80px -30px rgba(20,27,44,0.5)',
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-25 animate-fabric-wave"
                style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.45) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-5">
                  <div
                    className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase"
                    style={{ backgroundColor: 'rgba(199,163,106,0.18)', color: '#C7A36A', letterSpacing: '0.18em', border: '1px solid rgba(199,163,106,0.35)' }}
                  >
                    Trial · Preview
                  </div>
                  <div
                    className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase"
                    style={{ backgroundColor: 'rgba(248,242,232,0.06)', color: 'rgba(248,242,232,0.55)', letterSpacing: '0.18em', border: '1px solid rgba(248,242,232,0.10)' }}
                  >
                    Concierge
                  </div>
                </div>

                <h3
                  className="font-display font-semibold leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: '#F8F2E8', letterSpacing: '-0.02em' }}
                >
                  Co-create with the
                  <br />
                  <span className="font-display italic font-light" style={{ color: '#C7A36A' }}>Fabrician Atelier.</span>
                </h3>

                <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(248,242,232,0.55)' }}>
                  Six gentle steps — your inspirations, palette, preferences, and a private concept summary.
                  Save designs, request review, or join early access.
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-7">
                  {['Style', 'Mood', 'Print', 'Palette', 'Note', 'Concept'].map((step, i) => (
                    <div
                      key={step}
                      className="px-3 py-2.5 rounded-xl text-center"
                      style={{ backgroundColor: 'rgba(248,242,232,0.04)', border: '1px solid rgba(199,163,106,0.18)' }}
                    >
                      <p className="text-[9px] font-bold uppercase" style={{ color: '#C7A36A', letterSpacing: '0.16em' }}>0{i+1}</p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: 'rgba(248,242,232,0.85)' }}>{step}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-95 active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, #C7A36A 0%, #9E7E5D 100%)', color: '#1E140A', boxShadow: '0 4px 20px rgba(199,163,106,0.4)', letterSpacing: '0.02em' }}
                >
                  <Sparkles className="w-4 h-4" />
                  Enter the Studio
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ §8.5 12thFAN TEASER — Limited Fanwear Drop ════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A0E1A 0%, #111827 60%, #1A2235 100%)',
          padding: 'clamp(3rem,8vw,5.5rem) 0',
        }}
      >
        {/* Subtle gold light ray */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 w-px h-full opacity-[0.08]" style={{ background: 'linear-gradient(180deg, #C9A86C 0%, transparent 100%)' }} />
          <div className="absolute -top-20 right-0 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#C9A86C' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Product preview strip */}
            <div className="flex gap-3 lg:gap-4 shrink-0 order-2 lg:order-1">
              {[0, 2, 7].map((idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5 + idx * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 sm:w-28 rounded-2xl overflow-hidden"
                  style={{
                    background: '#1A2235',
                    border: '1px solid rgba(201,168,108,0.22)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                    transform: `rotate(${idx === 0 ? -4 : idx === 1 ? 0 : 4}deg) translateY(${idx === 1 ? 10 : 0}px)`,
                  }}
                >
                  <img
                    src={`/assets/12thfan/${['12thfan-usa-united-in-the-stands.png','12thfan-argentina-voice-of-the-stands.png','12thfan-brazil-for-the-passion.png'][idx === 0 ? 0 : idx === 2 ? 1 : 2]}`}
                    alt="12thFAN fanwear"
                    className="w-full h-auto object-contain"
                    style={{ aspectRatio: '3/4', minHeight: '80px' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Copy */}
            <div className="flex flex-col gap-5 order-1 lg:order-2 text-center lg:text-left">
              <div>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] mb-4"
                  style={{ backgroundColor: 'rgba(201,168,108,0.15)', color: '#C9A86C', border: '1px solid rgba(201,168,108,0.30)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  New Drop · Preorder Open
                </span>
                <h2
                  className="font-display font-bold leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: '#FAF0E3', letterSpacing: '-0.02em' }}
                >
                  12thFAN Limited
                  <br />
                  <span style={{ color: '#C9A86C' }}>Global Fanwear Drop</span>
                </h2>
                <p className="text-base leading-relaxed max-w-[440px] mx-auto lg:mx-0" style={{ color: 'rgba(250,240,227,0.60)' }}>
                  9 country editions. Premium sublimation fanwear jersey.
                  Unisex oversized fit. Made in Bangladesh.
                  Unofficial fan-support, collectible-grade quality.
                </p>
              </div>
              <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                <span style={{ color: 'rgba(240,208,128,0.90)' }} className="font-display font-bold text-3xl">$79</span>
                <span className="text-sm line-through" style={{ color: 'rgba(250,240,227,0.30)' }}>$99</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F87171' }}>Early Bird Price</span>
              </div>
              <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                <Link
                  to="/12thfan"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, #C9A86C 0%, #8A6B3A 100%)', color: '#0A0E1A', boxShadow: '0 6px 24px rgba(201,168,108,0.35)' }}
                >
                  ⚽ Shop the Drop
                </Link>
                <Link
                  to="/12thfan"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold transition-all"
                  style={{ color: 'rgba(250,240,227,0.70)', border: '1px solid rgba(250,240,227,0.18)' }}
                >
                  Choose Your Nation →
                </Link>
              </div>
              <p className="text-[10px]" style={{ color: 'rgba(250,240,227,0.30)' }}>
                Unofficial fan-support outfit by 12thFAN Outfit by FABrician Global.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ §9 THE PROMISE — Chapter 06 ════════ */}
      <section className="fab-section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Chapter
            number="06"
            label="The Promise"
            title={<>Tiny comfort,<br/><em className="italic font-light">beautifully made.</em></>}
            subtitle="Every Fabrician piece is built to four quiet standards — what we never compromise."
            align="center"
            className="mb-12 mx-auto items-center"
          />

          <motion.div {...stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              { icon: Leaf,     n: '01', title: 'Soft Organic Cotton',   body: 'GOTS-certified fibre, baby-safe inks, gentle on the most sensitive newborn skin.', bg: '#F2F5EF', iconColor: '#7A8F69' },
              { icon: Heart,    n: '02', title: 'Comfort-First Make',    body: 'Flat seams, kimono snaps, breathable weaves — engineered for daily wear.',         bg: '#F2EEEC', iconColor: '#9A7E63' },
              { icon: Award,    n: '03', title: 'Atelier Finishing',     body: 'Hand-finished hems, gift-ready packaging, and quality parents notice immediately.', bg: '#FFF7EE', iconColor: '#C8A57A' },
              { icon: Sparkles, n: '04', title: 'A World per Print',     body: "We don't just design clothes. Each print is a curated emotional world.",           bg: '#FAF0F2', iconColor: '#C46478' },
            ].map((p) => (
              <motion.div
                key={p.title}
                {...staggerItem}
                className="flex flex-col gap-4 p-6 rounded-3xl border"
                style={{ backgroundColor: p.bg, borderColor: 'rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                    <p.icon className="w-5 h-5" style={{ color: p.iconColor }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.22em' }}>
                    № {p.n}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base mb-1.5 leading-tight" style={{ color: '#202432' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#69707D' }}>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ §10 RECENTLY VIEWED — only shows if user has history ════════ */}
      <RecentlyViewedStrip />

      {/* ════════ §11 FINAL CTA ════════ */}
      <section className="pb-24 lg:pb-28 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SoftTrustBar className="mb-10" />

          <motion.div
            {...fadeUp(0)}
            className="relative rounded-[2rem] overflow-hidden p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
            style={{ background: 'linear-gradient(135deg, #FCF8F3 0%, #F6F1EA 50%, #EEF5FA 100%)', border: '1px solid #E8DED2' }}
          >
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(200,165,122,0.12) 0%, transparent 70%)', transform: 'translate(25%,-25%)' }}
            />
            <div className="relative z-10 max-w-md">
              <p className="text-[10px] font-bold uppercase mb-3" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
                Begin Here
              </p>
              <h3
                className="font-display font-semibold mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.75rem,4vw,2.6rem)', color: '#202432', letterSpacing: '-0.022em' }}
              >
                Dreamy little
                <br />
                <em className="italic font-light">essentials.</em>
              </h3>
              <p className="text-sm leading-relaxed mb-7" style={{ color: '#69707D' }}>
                22 designs across 13 tiny worlds. Every order arrives beautifully — every time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(200,165,122,0.35)' }}
                >
                  Shop the Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/worlds"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:bg-[#F6F1EA]"
                  style={{ color: '#202432', border: '1px solid #E8DED2', backgroundColor: 'white' }}
                >
                  Enter a World
                </Link>
              </div>
            </div>

            <div className="hidden md:flex shrink-0 gap-3 items-end">
              {[products[1], products[13]].map((p, i) => (
                <motion.div
                  key={p.id}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 overflow-hidden rounded-2xl shadow-soft"
                  style={{ transform: `rotate(${i === 0 ? -3 : 3}deg) translateY(${i === 0 ? 8 : 0}px)` }}
                >
                  <div style={{ aspectRatio: '3/4', backgroundColor: p.accent.bg }}>
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
