import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Check, ChevronRight, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { getWorldBySlug } from '@/data/worlds';
import { useCart } from '@/store/useCart';
import { formatPriceBDT } from '@/lib/utils';
import { toast } from 'sonner';
import type { Product } from '@/types';

// ── Constants ────────────────────────────────────────────────

const kimonos  = products.filter((p) => p.category === 'kimono' && p.giftable !== false).slice(0, 6);
const pajamas  = products.filter((p) => p.category === 'pajama').slice(0, 4);

const WRAP_OPTIONS = [
  { id: 'ivory',  label: 'Ivory Ribbon',   desc: 'Classic satin ribbon in warm ivory', color: '#F8F2E8' },
  { id: 'gold',   label: 'Gold Foil Bow',  desc: 'Shimmering gold tissue wrap',        color: '#C8A57A' },
  { id: 'blush',  label: 'Blush Tissue',   desc: 'Soft pink tissue with satin band',   color: '#E8CED2' },
];

const STEPS = [
  { label: 'Bodysuit', num: 1 },
  { label: 'Pajama',   num: 2 },
  { label: 'Gift',     num: 3 },
  { label: 'Preview',  num: 4 },
];

// ── Helpers ──────────────────────────────────────────────────

function ProductThumb({ p, selected, onClick }: { p: Product; selected: boolean; onClick: () => void }) {
  const world = getWorldBySlug(p.world ?? '');
  const accent = world?.accent ?? { bg: '#F6F1EA', primary: '#B8924A', secondary: '#C8A57A' };
  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden border-2 transition-all duration-200 text-left"
      style={{
        borderColor: selected ? accent.primary : '#E8DED2',
        boxShadow: selected ? `0 0 0 2px ${accent.primary}` : 'none',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        className="relative"
        style={{ aspectRatio: '3/4', backgroundColor: accent.bg }}
      >
        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
        {selected && (
          <div
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accent.primary }}
          >
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>
      <div className="px-2.5 py-2">
        <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: '#202432' }}>{p.name}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: '#B8924A' }}>{formatPriceBDT(p.price)}</p>
      </div>
    </button>
  );
}

// ── Main Component ───────────────────────────────────────────

export function GiftBuilder() {
  const [step, setStep] = useState(1);
  const [selectedKimono, setSelectedKimono] = useState<Product | null>(null);
  const [selectedPajama,  setSelectedPajama]  = useState<Product | null>(null);
  const [selectedWrap,    setSelectedWrap]    = useState<string>('ivory');
  const [giftNote,        setGiftNote]        = useState('');
  const [recipientName,   setRecipientName]   = useState('');
  const [adding,          setAdding]          = useState(false);
  const addItem = useCart((s) => s.addItem);

  const totalPrice = (selectedKimono?.price ?? 0) + (selectedPajama?.price ?? 0);

  const handleAddToCart = () => {
    if (!selectedKimono) return;
    setAdding(true);
    const toAdd = [selectedKimono, selectedPajama].filter(Boolean) as Product[];
    toAdd.forEach((p) => {
      addItem({
        id: `ci-gift-${Date.now()}-${p.id}`,
        productId: p.id,
        variantId: p.variants[0].id,
        name: p.name,
        image: p.images[0],
        price: p.price,
        size: p.variants[0].size,
        color: p.variants[0].color,
        quantity: 1,
      });
    });
    setTimeout(() => {
      setAdding(false);
      toast.success('Gift set added to cart!', {
        description: `${toAdd.length} ${toAdd.length === 1 ? 'piece' : 'pieces'} · ${selectedWrap} wrapping`,
      });
    }, 800);
  };

  const canProceed = step === 1 ? !!selectedKimono : true;

  return (
    <div
      className="rounded-3xl overflow-hidden border"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E8DED2', boxShadow: '0 8px 40px rgba(32,36,50,0.07)' }}
    >
      {/* Header */}
      <div
        className="px-6 sm:px-8 pt-8 pb-6"
        style={{ background: 'linear-gradient(135deg, #141B2C 0%, #191F2F 100%)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C7A36A 0%, #9E7E5D 100%)' }}
          >
            <Gift className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: '#C7A36A' }}
            >
              Fabrician Gift Sets
            </p>
            <h3
              className="font-display font-semibold leading-tight"
              style={{ color: '#F8F2E8', fontSize: '1.1rem' }}
            >
              Build a Tiny Gift Set
            </h3>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <button
                onClick={() => step > s.num && setStep(s.num)}
                className="flex items-center gap-1.5"
                disabled={step <= s.num}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                  style={{
                    backgroundColor: step > s.num ? '#C7A36A' : step === s.num ? 'rgba(199,163,106,0.25)' : 'rgba(248,242,232,0.1)',
                    color: step > s.num ? '#1E140A' : step === s.num ? '#C7A36A' : 'rgba(248,242,232,0.35)',
                    border: step === s.num ? '1.5px solid #C7A36A' : 'none',
                  }}
                >
                  {step > s.num ? <Check style={{ width: 12, height: 12 }} /> : s.num}
                </div>
                <span
                  className="text-[11px] font-medium hidden sm:block"
                  style={{
                    color: step === s.num ? '#F8F2E8' : step > s.num ? '#C7A36A' : 'rgba(248,242,232,0.35)',
                  }}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px w-6 sm:w-10 rounded-full"
                  style={{ backgroundColor: step > s.num ? 'rgba(199,163,106,0.5)' : 'rgba(248,242,232,0.1)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">

          {/* Step 1 — Choose Bodysuit */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h4 className="font-display font-semibold text-base" style={{ color: '#202432' }}>
                  Choose your bodysuit
                </h4>
                <p className="text-xs mt-0.5" style={{ color: '#69707D' }}>
                  Start with a signature Fabrician kimono bodysuit.
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {kimonos.map((p) => (
                  <ProductThumb
                    key={p.id}
                    p={p}
                    selected={selectedKimono?.id === p.id}
                    onClick={() => setSelectedKimono(p)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Add Pajama */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h4 className="font-display font-semibold text-base" style={{ color: '#202432' }}>
                  Add a matching pajama set
                </h4>
                <p className="text-xs mt-0.5" style={{ color: '#69707D' }}>
                  Optional — pair with a cozy sleep set for the complete gift.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pajamas.map((p) => (
                  <ProductThumb
                    key={p.id}
                    p={p}
                    selected={selectedPajama?.id === p.id}
                    onClick={() => setSelectedPajama(selectedPajama?.id === p.id ? null : p)}
                  />
                ))}
              </div>
              <button
                onClick={() => setSelectedPajama(null)}
                className="mt-3 text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
                style={{ color: '#9CA3AF' }}
              >
                <X style={{ width: 12, height: 12 }} />
                Skip — bodysuit only
              </button>
            </motion.div>
          )}

          {/* Step 3 — Gift wrap + note */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <h4 className="font-display font-semibold text-base" style={{ color: '#202432' }}>
                  Make it gift-ready
                </h4>
                <p className="text-xs mt-0.5" style={{ color: '#69707D' }}>
                  Every Fabrician order arrives beautifully wrapped, complimentary.
                </p>
              </div>

              {/* Wrap options */}
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#9CA3AF' }}>
                Choose wrapping style
              </p>
              <div className="space-y-2.5 mb-6">
                {WRAP_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWrap(w.id)}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border-2 text-left transition-all"
                    style={{
                      borderColor: selectedWrap === w.id ? '#B8924A' : '#E8DED2',
                      backgroundColor: selectedWrap === w.id ? '#FFFBF5' : '#FFFFFF',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 flex-shrink-0"
                      style={{ backgroundColor: w.color, borderColor: '#E8DED2' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: '#202432' }}>{w.label}</p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>{w.desc}</p>
                    </div>
                    {selectedWrap === w.id && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#B8924A' }}
                      >
                        <Check style={{ width: 12, height: 12, color: '#FFFFFF' }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Recipient name */}
              <p className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: '#9CA3AF' }}>
                For whom <span className="normal-case font-normal">(optional)</span>
              </p>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                maxLength={40}
                placeholder="e.g. Baby Aarav · or 'Our newest niece'"
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none mb-5 transition-all focus:ring-2"
                style={{
                  borderColor: '#E8DED2',
                  backgroundColor: '#FFFFFF',
                  color: '#202432',
                  // @ts-ignore
                  '--tw-ring-color': 'rgba(184,146,74,0.3)',
                }}
              />

              {/* Gift note */}
              <p className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: '#9CA3AF' }}>
                Add a gift note <span className="normal-case font-normal">(optional)</span>
              </p>
              <div className="relative">
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  maxLength={120}
                  rows={3}
                  placeholder="Write something beautiful… e.g. 'For our little miracle, with all our love.'"
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                  style={{
                    borderColor: '#E8DED2',
                    backgroundColor: '#F6F1EA',
                    color: '#202432',
                    lineHeight: 1.6,
                    // @ts-ignore
                    '--tw-ring-color': 'rgba(184,146,74,0.3)',
                  }}
                />
                <span
                  className="absolute bottom-2.5 right-3 text-[10px]"
                  style={{ color: '#9CA3AF' }}
                >
                  {giftNote.length}/120
                </span>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Preview + Add to cart */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase mb-1.5" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
                  The Atelier Concept
                </p>
                <h4 className="font-display font-semibold text-lg leading-tight" style={{ color: '#202432' }}>
                  Your gift is ready.
                  {recipientName && (
                    <>
                      <br />
                      <em className="italic font-light text-base" style={{ color: '#9CA3AF' }}>
                        For {recipientName}.
                      </em>
                    </>
                  )}
                </h4>
              </div>

              {/* Atelier-style gift card summary */}
              <div
                className="relative rounded-2xl overflow-hidden border-2 mb-5"
                style={{
                  backgroundColor: '#FFFBF4',
                  borderColor: '#C7A36A',
                  borderStyle: 'dashed',
                }}
              >
                {/* Decorative ribbon corner */}
                <div
                  className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, #C7A36A 50%, transparent 50%)',
                  }}
                />
                <div className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase" style={{ color: '#1E140A', letterSpacing: '0.18em', transform: 'rotate(-45deg)', transformOrigin: 'top left' }}>
                  Gift
                </div>

                <div className="p-5 pt-6">
                  <div className="flex items-center gap-1.5 justify-end mb-3">
                    <span className="text-[9px] font-bold uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.18em' }}>Maison Fabrician</span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#C7A36A' }} />
                    <span className="text-[9px] font-bold uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.18em' }}>№ 22</span>
                  </div>

                  {/* Items row */}
                  <div className="space-y-3">
                    {selectedKimono && (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border"
                          style={{ borderColor: '#E8DED2', backgroundColor: selectedKimono.accent.bg }}
                        >
                          <img src={selectedKimono.images[0]} alt={selectedKimono.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-display font-semibold leading-tight truncate" style={{ color: '#202432' }}>
                            {selectedKimono.name}
                          </p>
                          <p className="text-[10px] uppercase mt-0.5" style={{ color: '#9CA3AF', letterSpacing: '0.1em' }}>
                            Kimono Bodysuit
                          </p>
                        </div>
                        <p className="text-xs font-semibold" style={{ color: '#B8924A' }}>{formatPriceBDT(selectedKimono.price)}</p>
                      </div>
                    )}

                    {selectedPajama && (
                      <div className="flex items-center gap-3 pt-3 border-t border-dashed" style={{ borderColor: 'rgba(199,163,106,0.3)' }}>
                        <div
                          className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border"
                          style={{ borderColor: '#E8DED2', backgroundColor: selectedPajama.accent.bg }}
                        >
                          <img src={selectedPajama.images[0]} alt={selectedPajama.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-display font-semibold leading-tight truncate" style={{ color: '#202432' }}>
                            {selectedPajama.name}
                          </p>
                          <p className="text-[10px] uppercase mt-0.5" style={{ color: '#9CA3AF', letterSpacing: '0.1em' }}>
                            Pajama Set
                          </p>
                        </div>
                        <p className="text-xs font-semibold" style={{ color: '#B8924A' }}>{formatPriceBDT(selectedPajama.price)}</p>
                      </div>
                    )}
                  </div>

                  {/* Wrapping + note */}
                  <div className="mt-4 pt-3 border-t border-dashed space-y-1.5" style={{ borderColor: 'rgba(199,163,106,0.3)' }}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span style={{ color: '#9CA3AF' }}>Wrapping</span>
                      <span className="font-medium" style={{ color: '#202432' }}>
                        {WRAP_OPTIONS.find((w) => w.id === selectedWrap)?.label}
                      </span>
                    </div>
                    {giftNote && (
                      <div className="text-[11px] italic pt-2" style={{ color: '#69707D' }}>
                        "{giftNote}"
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-5 px-1">
                <div>
                  <p className="text-[10px] uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.18em' }}>Gift set total</p>
                  <p
                    className="font-display font-bold"
                    style={{ fontSize: '1.5rem', color: '#202432' }}
                  >
                    {formatPriceBDT(totalPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.18em' }}>Wrapping</p>
                  <p className="text-sm font-display italic" style={{ color: '#7A8F69' }}>Complimentary</p>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-semibold transition-all disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(184,146,74,0.30)',
                  letterSpacing: '0.04em',
                }}
              >
                {adding ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShoppingCart style={{ width: 18, height: 18 }} />
                )}
                {adding ? 'Adding to cart…' : 'Add gift set to cart'}
              </button>

              <p className="mt-3 text-center text-[10px] uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.16em' }}>
                ✦ Free delivery across all 64 districts of Bangladesh
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer navigation */}
      <div
        className="px-6 sm:px-8 py-4 flex items-center justify-between border-t"
        style={{ borderColor: '#E8DED2', backgroundColor: '#FAFAF9' }}
      >
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#69707D' }}
          >
            ← Back
          </button>
        ) : (
          <Link
            to="/shop?collection=gift-picks"
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: '#9CA3AF' }}
          >
            Browse all gift picks
          </Link>
        )}

        {step < 4 && (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              background: canProceed
                ? 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)'
                : '#E8DED2',
              color: canProceed ? '#FFFFFF' : '#9CA3AF',
              boxShadow: canProceed ? '0 3px 12px rgba(184,146,74,0.25)' : 'none',
            }}
          >
            {step === 2 && !selectedPajama ? 'Skip · Continue' : step === 3 ? 'Preview Gift' : 'Continue'}
            <ChevronRight style={{ width: 16, height: 16 }} />
          </button>
        )}

        {step === 4 && (
          <Link
            to="/worlds"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#B8924A' }}
          >
            Explore all worlds <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        )}
      </div>
    </div>
  );
}
