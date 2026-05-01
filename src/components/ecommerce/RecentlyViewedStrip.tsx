import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/store/useRecentlyViewed';
import { products } from '@/data/products';

interface Props {
  excludeId?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function RecentlyViewedStrip({ excludeId, className = '', variant = 'light' }: Props) {
  const ids = useRecentlyViewed((s) => s.productIds);
  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is typeof products[number] => Boolean(p))
    .slice(0, 6);

  if (items.length === 0) return null;

  const dark = variant === 'dark';
  const labelColor   = dark ? '#C7A36A' : '#B8924A';
  const titleColor   = dark ? '#F8F2E8' : '#202432';
  const subtleColor  = dark ? 'rgba(248,242,232,0.55)' : '#69707D';
  const cardBg       = dark ? 'rgba(248,242,232,0.04)' : '#FFFFFF';
  const cardBorder   = dark ? 'rgba(199,163,106,0.18)' : '#E8DED2';

  return (
    <section className={`py-10 lg:py-14 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-5">
          <Clock className="w-3.5 h-3.5" style={{ color: labelColor }} />
          <span className="text-[10px] font-bold uppercase" style={{ color: labelColor, letterSpacing: '0.22em' }}>
            Recently Viewed
          </span>
          <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(199,163,106,0.20)' }} />
          <span className="text-[10px] font-medium" style={{ color: subtleColor }}>
            {items.length} piece{items.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'thin' }}>
          {items.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.slug}`}
              className="group flex-shrink-0 w-[140px] sm:w-[160px] rounded-2xl overflow-hidden transition-all hover:translate-y-[-3px]"
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${cardBorder}`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', backgroundColor: p.accent.bg }}
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-2.5">
                <p
                  className="font-display text-xs font-medium leading-tight line-clamp-2 mb-1"
                  style={{ color: titleColor }}
                >
                  {p.name}
                </p>
                <p className="text-[11px] font-bold" style={{ color: labelColor }}>
                  ৳{p.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
