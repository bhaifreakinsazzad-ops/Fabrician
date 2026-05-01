import { Truck, Gift, Leaf, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_PILLARS = [
  { icon: Truck,       label: 'Free delivery',      note: 'All over Bangladesh' },
  { icon: Leaf,        label: 'Soft organic cotton', note: 'Baby-safe fabrics'   },
  { icon: Gift,        label: 'Gift-ready',          note: 'Every order'         },
  { icon: ShieldCheck, label: 'Gentle for newborns', note: 'Skin-safe inks'      },
];

interface Pillar { icon: React.ElementType; label: string; note: string }

interface SoftTrustBarProps {
  pillars?: Pillar[];
  variant?: 'strip' | 'cards';
  className?: string;
}

export function SoftTrustBar({ pillars = DEFAULT_PILLARS, variant = 'strip', className }: SoftTrustBarProps) {
  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-4', className)}>
        {pillars.map((p) => (
          <div
            key={p.label}
            className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl"
            style={{ backgroundColor: '#F6F1EA' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E8DED2' }}
            >
              <p.icon className="w-4 h-4" style={{ color: '#B8924A' }} />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: '#202432' }}>{p.label}</div>
              <div className="text-[10px] mt-0.5" style={{ color: '#69707D' }}>{p.note}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // strip variant
  return (
    <div
      className={cn('flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 px-6 rounded-2xl', className)}
      style={{ backgroundColor: '#F6F1EA' }}
    >
      {pillars.map((p, i) => (
        <div key={p.label} className="flex items-center gap-2">
          <p.icon className="w-3.5 h-3.5 shrink-0" style={{ color: '#B8924A' }} />
          <span className="text-xs font-medium" style={{ color: '#202432' }}>{p.label}</span>
          {i < pillars.length - 1 && (
            <span className="hidden sm:block w-px h-3 ml-4" style={{ backgroundColor: '#E8DED2' }} />
          )}
        </div>
      ))}
    </div>
  );
}
