import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { World } from '@/types';
import { products } from '@/data/products';

interface WorldCardProps {
  world: World;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function WorldCard({ world, variant = 'default', className }: WorldCardProps) {
  const worldProducts = products.filter((p) => p.world === world.slug).slice(0, 3);

  if (variant === 'compact') {
    return (
      <Link to={`/worlds/${world.slug}`}>
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={cn('relative rounded-2xl overflow-hidden cursor-pointer group', className)}
          style={{ backgroundColor: world.accent.bg }}
        >
          <div className="p-5">
            <div className="text-2xl mb-2">{world.emoji}</div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: world.accent.primary }}
            >
              World
            </div>
            <h3
              className="font-display font-semibold text-base leading-tight mb-1"
              style={{ color: world.accent.chipText }}
            >
              {world.name}
            </h3>
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: world.accent.primary, opacity: 0.8 }}>
              {world.tagline}
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color: world.accent.primary }}>
              Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          {/* mini product collage */}
          {worldProducts.length > 0 && (
            <div className="absolute bottom-3 right-3 flex gap-1">
              {worldProducts.slice(0, 2).map((p, i) => (
                <div
                  key={p.id}
                  className="w-8 h-8 rounded-lg overflow-hidden border border-white/60"
                  style={{ transform: `rotate(${i % 2 === 0 ? -4 : 3}deg)` }}
                >
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link to={`/worlds/${world.slug}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={cn('relative rounded-3xl overflow-hidden cursor-pointer group shadow-soft', className)}
          style={{ backgroundColor: world.accent.bg, minHeight: '340px' }}
        >
          {/* Product image collage in background */}
          {worldProducts.length > 0 && (
            <div className="absolute inset-0 flex items-end justify-end pr-4 pb-4 gap-2 opacity-60">
              {worldProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-24 h-32 rounded-xl overflow-hidden shadow-soft"
                  style={{ transform: `rotate(${[-3, 2, -1][i] || 0}deg) translateY(${[0, -8, 4][i] || 0}px)` }}
                >
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: `linear-gradient(135deg, ${world.accent.bg} 40%, transparent 100%)` }}
          />

          {/* Content */}
          <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: '340px' }}>
            <div className="text-4xl mb-4">{world.emoji}</div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
              style={{ color: world.accent.primary }}
            >
              Tiny World
            </div>
            <h3
              className="font-display font-semibold text-2xl leading-tight mb-2"
              style={{ color: world.accent.chipText }}
            >
              {world.name}
            </h3>
            <p className="text-sm leading-relaxed mb-4 max-w-[200px] line-clamp-3" style={{ color: world.accent.chipText, opacity: 0.7 }}>
              {world.story}
            </p>
            <div className="mt-auto flex items-center gap-1">
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                style={{ color: world.accent.primary }}
              >
                {worldProducts.length} piece{worldProducts.length !== 1 ? 's' : ''} in this world
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // default card
  return (
    <Link to={`/worlds/${world.slug}`}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 10px 36px rgba(32,36,50,0.10)' }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={cn('relative rounded-2xl overflow-hidden cursor-pointer group border', className)}
        style={{ backgroundColor: world.accent.bg, borderColor: world.accent.secondary }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-3xl mb-2">{world.emoji}</div>
              <div
                className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1"
                style={{ color: world.accent.primary }}
              >
                Tiny World
              </div>
              <h3
                className="font-display font-semibold text-lg leading-tight"
                style={{ color: world.accent.chipText }}
              >
                {world.name}
              </h3>
            </div>
            {worldProducts.length > 0 && (
              <div className="flex flex-col items-end gap-1">
                {worldProducts.slice(0, 2).map((p, i) => (
                  <div
                    key={p.id}
                    className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white/80 shadow-soft"
                    style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
                  >
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: world.accent.chipText, opacity: 0.65 }}>
            {world.tagline}
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="text-xs font-semibold group-hover:gap-2 transition-all flex items-center gap-1"
              style={{ color: world.accent.primary }}
            >
              {worldProducts.length} item{worldProducts.length !== 1 ? 's' : ''}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
