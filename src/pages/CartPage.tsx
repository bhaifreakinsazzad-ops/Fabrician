import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, Heart, ArrowRight, Truck, Sparkles, Gift, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { formatPriceBDT, cn } from '@/lib/utils';
import { getWorldBySlug } from '@/data/worlds';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(200,165,122,0.15)' }} />
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F6F1EA', border: '1px solid #E8DED2' }}>
              <ShoppingBag className="w-9 h-9" style={{ color: '#B8924A' }} />
            </div>
          </div>
          <h1 className="text-2xl font-display font-semibold mb-2" style={{ color: '#202432' }}>Your cart is empty</h1>
          <p className="text-sm mb-8 max-w-xs mx-auto" style={{ color: '#69707D' }}>
            Explore our collections and find something beautiful for your little one.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(184,146,74,0.25)' }}
          >
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
    >
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Review</p>
        <h1 className="text-3xl font-display font-semibold">Your Cart</h1>
        <p className="text-sm text-muted-foreground mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Items */}
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex gap-4 p-4 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-colors shadow-card"
              >
                <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                  <div className="w-24 h-28 rounded-xl overflow-hidden bg-muted/20">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {/* World chip */}
                      {item.world && (() => {
                        const w = getWorldBySlug(item.world);
                        return w ? (
                          <div
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold mb-1"
                            style={{ backgroundColor: w.accent.chip, color: w.accent.chipText }}
                          >
                            <span>{w.emoji}</span>
                            <span>{w.name}</span>
                          </div>
                        ) : null;
                      })()}
                      <h3 className="font-display font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.color} · {item.size}</p>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => { toggleItem(item.productId); toast(isInWishlist(item.productId) ? 'Removed from wishlist' : 'Saved to wishlist'); }}
                        className={cn('p-2 rounded-xl hover:bg-muted transition-colors', isInWishlist(item.productId) ? 'text-rose-500' : 'text-muted-foreground')}
                        aria-label="Save to wishlist"
                      >
                        <Heart className={cn('w-4 h-4', isInWishlist(item.productId) && 'fill-current')} />
                      </button>
                      <button
                        onClick={() => { removeItem(item.id); toast.success('Removed from cart'); }}
                        className="p-2 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center rounded-xl border border-border overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <span className="font-bold text-sm">{formatPriceBDT(item.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-1">
            Clear all items
          </button>

          {/* Gift microcopy */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 p-4 rounded-2xl border"
              style={{ backgroundColor: '#FDF9F5', borderColor: '#E8DED2' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: 'rgba(200,165,122,0.12)' }}
                >
                  <Gift className="w-4 h-4" style={{ color: '#B8924A' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#202432' }}>
                    You're building something beautiful.
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#69707D' }}>
                    Every Fabrician order arrives gift-ready.
                    {items.length === 1 && ' Add a matching piece to complete the set.'}
                  </p>
                  {items.length === 1 && (
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-1 text-xs font-semibold mt-2 transition-colors hover:opacity-80"
                      style={{ color: '#B8924A' }}
                    >
                      Pair it with a matching piece <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-24 rounded-3xl bg-card border border-border/40 shadow-card overflow-hidden">
            <div className="h-1" style={{ background: 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)' }} />
            <div className="p-6">
              <h2 className="font-display font-semibold text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span className="font-medium">{formatPriceBDT(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free ✓</span>
                </div>
              </div>

              {/* Gift wrap toggle */}
              <div className="mb-5 rounded-2xl border overflow-hidden" style={{ borderColor: giftWrap ? 'rgba(184,146,74,0.5)' : '#E8DED2' }}>
                <button
                  onClick={() => setGiftWrap((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 transition-colors"
                  style={{ backgroundColor: giftWrap ? '#FFFBF4' : '#F6F1EA' }}
                >
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 flex-shrink-0" style={{ color: '#B8924A' }} />
                    <div className="text-left">
                      <p className="text-xs font-semibold" style={{ color: '#202432' }}>Gift wrapping</p>
                      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Complimentary · Ribbon + tissue</p>
                    </div>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all"
                    style={{
                      backgroundColor: giftWrap ? '#B8924A' : 'transparent',
                      borderColor: giftWrap ? '#B8924A' : '#D1D5DB',
                    }}
                  >
                    {giftWrap && <Check style={{ width: 11, height: 11, color: '#FFFFFF' }} />}
                  </div>
                </button>
                <AnimatePresence>
                  {giftWrap && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3 pt-1 border-t" style={{ borderColor: 'rgba(184,146,74,0.2)' }}>
                        <textarea
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                          maxLength={100}
                          rows={2}
                          placeholder="Add a gift note… (optional)"
                          className="w-full resize-none rounded-xl border px-3 py-2 text-xs outline-none"
                          style={{ borderColor: '#E8DED2', backgroundColor: '#FFFFFF', color: '#202432' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-border/50 mb-5" />
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold font-display">{formatPriceBDT(subtotal)}</span>
              </div>
              <Button
                className="w-full rounded-2xl h-12 text-base font-semibold transition-shadow"
                style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', boxShadow: '0 4px 20px rgba(184,146,74,0.30)', color: '#FFFFFF' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl" style={{ backgroundColor: '#F6F1EA', border: '1px solid #E8DED2' }}>
                <Truck className="w-3.5 h-3.5" style={{ color: '#B8924A' }} />
                <p className="text-xs font-semibold" style={{ color: '#B8924A' }}>Free Delivery All Over Bangladesh</p>
              </div>
              <Link to="/shop" className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors mt-4">
                ← Continue Shopping
              </Link>
            </div>
            <div className="px-6 pb-5">
              <Link to="/studio" className="flex items-center gap-3 p-3 rounded-xl transition-colors group" style={{ backgroundColor: '#F6F1EA', border: '1px solid #E8DED2' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EDE8E1' }}>
                  <Sparkles className="w-4 h-4" style={{ color: '#B8924A' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">Can't find the right piece?</p>
                  <p className="text-[10px] text-muted-foreground">Try Studio ✦ — design your own</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors ml-auto flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
