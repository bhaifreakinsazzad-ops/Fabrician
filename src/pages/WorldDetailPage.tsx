import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { WorldCard } from '@/components/ecommerce/WorldCard';
import { getWorldBySlug, worlds } from '@/data/worlds';
import { getNewInProducts, getProductsByWorld } from '@/data/products';

export default function WorldDetailPage() {
  const { worldSlug } = useParams<{ worldSlug: string }>();
  const world = getWorldBySlug(worldSlug || '');

  if (!world) return <Navigate to="/worlds" replace />;

  const worldProducts = getProductsByWorld(world.slug);
  const recommendedProducts = getNewInProducts().filter((product) => product.world !== world.slug).slice(0, 4);
  const relatedWorlds = worlds.filter((w) => w.slug !== world.slug).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#FCF8F3', minHeight: '100vh' }}>

      {/* ── Hero banner with world accent ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            `radial-gradient(ellipse at 65% 35%, ${world.accent.bg} 0%, transparent 60%),` +
            `radial-gradient(ellipse at 20% 70%, ${world.accent.secondary}40 0%, transparent 55%),` +
            '#FCF8F3',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link
              to="/worlds"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
              style={{ color: '#B8924A' }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Worlds
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="text-6xl mb-4">{world.emoji}</div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3"
                style={{ color: world.accent.primary }}
              >
                Tiny World
              </p>
              <h1
                className="font-display font-semibold leading-tight mb-4"
                style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', color: '#202432', letterSpacing: '-0.02em' }}
              >
                {world.name}
              </h1>
              <p
                className="text-base font-medium italic mb-3"
                style={{ color: world.accent.primary }}
              >
                "{world.tagline}"
              </p>
              <p className="text-sm leading-relaxed max-w-[420px]" style={{ color: '#69707D' }}>
                {world.story}
              </p>

              {/* accent palette chips */}
              <div className="flex items-center gap-2 mt-6">
                {[world.accent.bg, world.accent.primary, world.accent.secondary, world.accent.chip].map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-white/60 shadow-soft"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
                <span className="text-xs ml-1" style={{ color: '#9CA3AF' }}>World palette</span>
              </div>
            </motion.div>

            {/* mini product collage */}
            {worldProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex items-center justify-center h-56 sm:h-64"
              >
                {worldProducts.slice(0, 3).map((p, i) => (
                  <motion.div
                    key={p.id}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
                    className="absolute w-32 h-44 rounded-2xl overflow-hidden shadow-soft-md"
                    style={{
                      left: `${[16, 38, 58][i]}%`,
                      top: `${[10, 0, 15][i]}%`,
                      transform: `rotate(${[-5, 0, 4][i]}deg)`,
                      zIndex: [1, 3, 2][i],
                    }}
                  >
                    <div style={{ width: '100%', height: '100%', backgroundColor: world.accent.bg }}>
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Products in this world ── */}
      <section className="fab-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-label-upper mb-1.5" style={{ color: world.accent.primary }}>
                {world.name}
              </p>
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', color: '#202432', letterSpacing: '-0.015em' }}
              >
                {worldProducts.length} piece{worldProducts.length !== 1 ? 's' : ''} in this world
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: '#B8924A' }}
            >
              Shop all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {worldProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {worldProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center py-6" style={{ color: '#69707D' }}>
                <div className="text-5xl mb-4">{world.emoji}</div>
                <p className="font-display font-medium text-lg mb-2" style={{ color: '#202432' }}>This world is being curated</p>
                <p className="text-sm">Explore fresh arrivals while we prepare this world’s full edit.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {recommendedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF' }}
                >
                  Browse all products
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Explore other worlds ── */}
      <section className="pb-20" style={{ backgroundColor: '#F6F1EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="mb-7"
          >
            <p className="text-label-upper mb-1.5">Explore more</p>
            <h2
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)', color: '#202432', letterSpacing: '-0.01em' }}
            >
              Other tiny worlds
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedWorlds.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <WorldCard world={w} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
