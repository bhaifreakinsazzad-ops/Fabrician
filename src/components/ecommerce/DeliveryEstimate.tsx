import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Check, ChevronDown } from 'lucide-react';

const ZONES = [
  { name: 'Inside Dhaka',         days: '1–2 days', icon: '🏙️', highlight: true },
  { name: 'Dhaka Metro Suburbs',  days: '2–3 days', icon: '🌆' },
  { name: 'Chittagong',           days: '2–3 days', icon: '🏖️' },
  { name: 'Sylhet · Khulna · Rajshahi', days: '3–4 days', icon: '🌾' },
  { name: 'All Other Districts',  days: '3–5 days', icon: '🌿' },
];

interface Props {
  className?: string;
}

export function DeliveryEstimate({ className = '' }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl overflow-hidden border ${className}`} style={{ backgroundColor: '#FAF6EE', borderColor: '#E8DED2' }}>
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 transition-all hover:bg-[#F6F1EA]"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #C7A36A 0%, #9E7E5D 100%)' }}
        >
          <Truck className="w-4 h-4" style={{ color: '#1E140A' }} />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-bold uppercase" style={{ color: '#9E7E5D', letterSpacing: '0.14em' }}>
            Free Delivery · Bangladesh
          </p>
          <p className="text-sm font-display font-semibold" style={{ color: '#202432' }}>
            Arrives in <span style={{ color: '#9E7E5D' }}>1–5 days</span> via Pathao
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" style={{ color: '#9CA3AF' }} />
        </motion.div>
      </button>

      {/* Expandable zones */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              <div className="space-y-1.5">
                {ZONES.map((zone) => (
                  <div
                    key={zone.name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                    style={{
                      backgroundColor: zone.highlight ? 'rgba(199,163,106,0.10)' : 'transparent',
                      border: zone.highlight ? '1px solid rgba(199,163,106,0.25)' : '1px solid transparent',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span style={{ fontSize: '15px' }}>{zone.icon}</span>
                      <span className="text-xs font-medium" style={{ color: '#202432' }}>{zone.name}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: zone.highlight ? '#9E7E5D' : '#69707D' }}>
                      {zone.days}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-start gap-2 text-[11px] leading-relaxed" style={{ borderColor: '#E8DED2', color: '#69707D' }}>
                <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#7A8F69' }} />
                <span>
                  <strong style={{ color: '#202432' }}>Open & check before returning</strong> — you can inspect every Fabrician piece before the courier leaves.
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px]" style={{ color: '#69707D' }}>
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#9E7E5D' }} />
                <span>Delivered by <strong style={{ color: '#202432' }}>Pathao Courier</strong> · Cash on Delivery available</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
