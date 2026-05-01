import { Link, useSearchParams } from 'react-router-dom';
import { Check, Truck, ShoppingBag, Sparkles, Package, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/store/useOrders';

const ADMIN_WHATSAPP = '8801778307704';

const deliverySteps = [
  { icon: Check,   label: 'Order Placed',  done: true },
  { icon: Package, label: 'Being Packed',  done: false },
  { icon: Truck,   label: 'On The Way',    done: false },
  { icon: MapPin,  label: 'Delivered',     done: false },
];

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('id') || 'FAB-XXXXXX';
  const waMessage   = searchParams.get('wa') || '';
  const method      = searchParams.get('method') || 'cod';
  const trxId       = searchParams.get('trx') || '';

  const { getOrderByNumber } = useOrders();
  const order = getOrderByNumber(orderNumber);

  const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${
    waMessage ||
    encodeURIComponent(`Hi, I placed order *${orderNumber}* on Fabrician. Please confirm.`)
  }`;

  const isBkash = method === 'bkash';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, rgba(199,163,106,0.10) 0%, transparent 55%),' +
          '#FCF8F3',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg"
      >
        <div className="bg-card rounded-3xl border border-border/40 shadow-card-hover overflow-hidden">
          {/* Gold strip */}
          <div
            className="h-1"
            style={{ background: 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)' }}
          />

          {/* Header */}
          <div
            className="px-8 pt-10 pb-8 text-center border-b border-border/40"
            style={{ background: 'linear-gradient(180deg, rgba(200,165,122,0.06) 0%, transparent 100%)' }}
          >
            <div className="relative inline-flex mb-5">
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: 'rgba(200,165,122,0.22)' }}
              />
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(200,165,122,0.15)',
                  border: '2px solid rgba(200,165,122,0.35)',
                }}
              >
                <Check className="w-8 h-8" style={{ color: '#B8924A' }} strokeWidth={2.5} />
              </div>
            </div>

            <h1
              className="text-2xl sm:text-3xl font-display font-semibold mb-2"
              style={{ color: '#202432' }}
            >
              Order Received ✦
            </h1>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#69707D' }}>
              {isBkash
                ? "We'll verify your bKash payment and confirm your order within 1–2 hours."
                : 'Your order is confirmed. Our team will process it right away.'}
            </p>
          </div>

          <div className="px-8 py-6 space-y-4">
            {/* Order number */}
            <div
              className="flex items-center justify-between p-4 rounded-2xl border"
              style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2' }}
            >
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: '#69707D' }}
                >
                  Order Number
                </p>
                <p
                  className="font-display font-semibold text-xl tracking-wide"
                  style={{ color: '#202432' }}
                >
                  {orderNumber}
                </p>
                {order && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {order.customer.name} · {order.customer.phone}
                  </p>
                )}
              </div>
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                style={{
                  backgroundColor: isBkash ? '#FEF9C3' : '#D4EDDA',
                  color: isBkash ? '#854D0E' : '#155724',
                }}
              >
                {isBkash ? 'Verifying Payment' : 'Confirmed'}
              </div>
            </div>

            {/* bKash confirmation */}
            {isBkash && trxId && (
              <div
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ backgroundColor: '#FFF5F9', borderColor: 'rgba(226,19,110,0.20)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E2136E' }}
                >
                  <span className="text-white font-bold text-xs">bK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#202432' }}>
                    bKash TrxID Submitted
                  </p>
                  <p
                    className="font-mono font-bold text-sm tracking-wider"
                    style={{ color: '#E2136E' }}
                  >
                    {trxId}
                  </p>
                  <p className="text-[10px]" style={{ color: '#69707D' }}>
                    We'll verify this and update you on WhatsApp
                  </p>
                </div>
              </div>
            )}

            {/* COD note */}
            {!isBkash && (
              <div
                className="p-4 rounded-xl border text-xs"
                style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2', color: '#69707D' }}
              >
                <p className="font-semibold mb-1.5" style={{ color: '#202432' }}>
                  Cash on Delivery
                </p>
                <ul className="space-y-1">
                  <li>• Pathao Courier will call you before delivery</li>
                  <li>• Have the exact amount ready in cash</li>
                  <li className="font-semibold" style={{ color: '#B8924A' }}>
                    ✓ Open & check your order before the courier leaves
                  </li>
                </ul>
              </div>
            )}

            {/* Delivery timeline */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: '#69707D' }}
              >
                Delivery Progress
              </p>
              <div className="flex items-center justify-between">
                {deliverySteps.map((step, i) => (
                  <div key={step.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={
                          step.done
                            ? {
                                background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                                color:      '#FFFFFF',
                                boxShadow:  '0 2px 12px rgba(184,146,74,0.30)',
                              }
                            : { backgroundColor: '#F0EDE9', border: '1px solid #E8DED2', color: '#9CA3AF' }
                        }
                      >
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <p
                        className="text-[9px] font-medium text-center leading-tight max-w-[52px]"
                        style={{ color: step.done ? '#B8924A' : '#9CA3AF' }}
                      >
                        {step.label}
                      </p>
                    </div>
                    {i < deliverySteps.length - 1 && (
                      <div
                        className="flex-1 h-px mx-1 mb-4"
                        style={{ backgroundColor: step.done ? 'rgba(200,165,122,0.40)' : '#E8DED2' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info strip */}
            <div
              className="p-4 rounded-2xl text-xs space-y-1.5"
              style={{ backgroundColor: '#F6F1EA', border: '1px solid #E8DED2', color: '#69707D' }}
            >
              <p>📦 Estimated delivery: <strong style={{ color: '#202432' }}>3–7 business days</strong></p>
              <p>🚚 Delivered by <strong style={{ color: '#202432' }}>Pathao Courier</strong></p>
              <p>✅ Open &amp; check your order before the courier leaves</p>
              <p>✈ Free home delivery to all 64 districts of Bangladesh</p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(37,211,102,0.22)' }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us for Order Updates
            </a>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-2xl border-border/60 hover:border-primary/30"
              >
                <Link to="/track-order">
                  <Truck className="mr-2 w-4 h-4" /> Track Order
                </Link>
              </Button>
              <Button
                asChild
                className="flex-1 rounded-2xl text-white"
                style={{
                  background:  'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                  boxShadow:   '0 4px 16px rgba(184,146,74,0.28)',
                }}
              >
                <Link to="/shop">
                  <ShoppingBag className="mr-2 w-4 h-4" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Studio teaser */}
          <div className="px-8 pb-8">
            <Link
              to="/studio"
              className="flex items-center gap-3 p-3.5 rounded-2xl border transition-colors group"
              style={{ backgroundColor: '#F6F1EA', borderColor: '#E8DED2' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#EDE8E1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F6F1EA'; }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#202432' }}>
                  Want something truly custom?
                </p>
                <p className="text-[10px]" style={{ color: '#69707D' }}>
                  Explore Fabrician Studio ✦ — design your own piece
                </p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
