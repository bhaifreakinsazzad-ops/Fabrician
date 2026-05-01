import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Check, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOrders } from '@/store/useOrders';
import { formatPriceBDT } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

const ADMIN_WHATSAPP = '8801778307704';

const STATUS_STEPS: { key: Order['status'][]; label: string; icon: React.ElementType }[] = [
  { key: ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'], label: 'Order Placed',     icon: Clock },
  { key: ['confirmed', 'shipped', 'out_for_delivery', 'delivered'],           label: 'Confirmed',        icon: CheckCircle },
  { key: ['shipped', 'out_for_delivery', 'delivered'],                        label: 'Packed & Shipped', icon: Package },
  { key: ['out_for_delivery', 'delivered'],                                   label: 'Out for Delivery', icon: Truck },
  { key: ['delivered'],                                                       label: 'Delivered',        icon: MapPin },
];

const STATUS_LABELS: Record<string, string> = {
  placed:           'Order Placed',
  confirmed:        'Confirmed',
  shipped:          'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered:        'Delivered',
  cancelled:        'Cancelled',
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  placed:           { bg: '#F3F4F6', text: '#374151' },
  confirmed:        { bg: '#DBEAFE', text: '#1D4ED8' },
  shipped:          { bg: '#FEF3C7', text: '#92400E' },
  out_for_delivery: { bg: '#FEF9C3', text: '#713F12' },
  delivered:        { bg: '#D1FAE5', text: '#065F46' },
  cancelled:        { bg: '#FEE2E2', text: '#991B1B' },
};

function OrderCard({ order }: { order: Order }) {
  const steps = STATUS_STEPS.map((step) => ({
    ...step,
    done: step.key.includes(order.status),
  }));

  const statusCol = STATUS_COLORS[order.status] ?? { bg: '#F3F4F6', text: '#374151' };
  const waMsg = encodeURIComponent(
    `Hi, I'd like to track my Fabrician order *${order.orderNumber}*. Customer: ${order.customer.name}, Phone: ${order.customer.phone}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Status card */}
      <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card overflow-hidden relative">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)' }}
        />
        <div className="flex items-start justify-between mb-4 mt-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Order</p>
            <p className="font-display font-semibold text-xl">{order.orderNumber}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {order.customer.name} · {order.customer.phone}
            </p>
          </div>
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{ backgroundColor: statusCol.bg, color: statusCol.text }}
          >
            {STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>

        {/* Order items summary */}
        <div className="text-xs text-muted-foreground border-t border-border/40 pt-3 mt-3 space-y-1">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.name} ({item.size}) × {item.quantity}</span>
              <span className="font-medium">{formatPriceBDT(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border/30 text-foreground">
            <span>Total</span>
            <span>{formatPriceBDT(order.total)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
          <Truck className="w-3.5 h-3.5" style={{ color: '#B8924A' }} />
          <span>Delivered by Pathao Courier · Free delivery</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Order Progress</p>
        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
          <div className="space-y-0">
            {steps.map((step, idx) => {
              const isActive = !step.done && idx === steps.findIndex((s) => !s.done);
              return (
                <div key={step.label} className="flex gap-4 relative">
                  <div
                    className={cn(
                      'relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                      isActive && 'border-2 border-amber-400'
                    )}
                    style={
                      step.done
                        ? {
                            background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                            color: '#FFFFFF',
                            boxShadow: '0 2px 12px rgba(184,146,74,0.30)',
                          }
                        : isActive
                        ? { backgroundColor: '#FEF3C7', color: '#92400E' }
                        : { backgroundColor: '#F3F4F6', color: '#9CA3AF', border: '1px solid #E5E7EB' }
                    }
                  >
                    {step.done ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      <step.icon className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className={cn('pb-7 flex-1', idx === steps.length - 1 && 'pb-0')}>
                    <p
                      className={cn(
                        'font-medium text-sm leading-none mb-1',
                        step.done ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-xs text-amber-600">In progress…</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* WhatsApp + info */}
      <a
        href={`https://wa.me/${ADMIN_WHATSAPP}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#25D366', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(37,211,102,0.22)' }}
      >
        <MessageCircle className="w-4 h-4" />
        Message Us on WhatsApp
      </a>

      <div
        className="p-4 rounded-2xl text-xs"
        style={{ backgroundColor: '#F6F1EA', border: '1px solid #E8DED2', color: '#69707D' }}
      >
        <p>📦 Estimated delivery: <strong style={{ color: '#202432' }}>3–7 business days</strong></p>
        <p className="mt-1">✅ Check before returning — Pathao courier will wait while you inspect</p>
      </div>
    </motion.div>
  );
}

export default function TrackOrderPage() {
  const [orderInput, setOrderInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [searched,   setSearched]   = useState(false);
  const [results,    setResults]    = useState<Order[]>([]);

  const { getOrderByNumber, getOrdersByPhone } = useOrders();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput && !phoneInput) return;

    const found: Order[] = [];

    if (orderInput.trim()) {
      const o = getOrderByNumber(orderInput.trim());
      if (o) found.push(o);
    }

    if (phoneInput.trim() && found.length === 0) {
      const byPhone = getOrdersByPhone(phoneInput.trim());
      found.push(...byPhone);
    }

    setResults(found);
    setSearched(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 lg:py-14"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Live Status</p>
        <h1 className="text-3xl font-display font-semibold">Track Your Order</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Enter your order number or phone number to see where your package is.
        </p>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="p-6 rounded-2xl bg-card border border-border/40 shadow-card mb-8"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="order-number"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Order Number
            </Label>
            <Input
              id="order-number"
              placeholder="FAB-XXXXXX"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              className="mt-1.5 rounded-xl border-border/60 font-mono"
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="01XXXXXXXXX"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="mt-1.5 rounded-xl border-border/60"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 rounded-2xl gap-2 text-white"
          style={{
            background:  'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
            boxShadow:   '0 4px 16px rgba(184,146,74,0.28)',
          }}
        >
          <Search className="w-4 h-4" /> Track Order
        </Button>
      </form>

      {/* Results */}
      <AnimatePresence>
        {searched && results.length > 0 && (
          <div className="space-y-8">
            {results.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {searched && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-2xl bg-card border border-border/40 text-center shadow-card"
          >
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-display font-semibold mb-1">No order found</p>
            <p className="text-sm text-muted-foreground mb-4">
              Double-check the order number or phone, or contact us on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Hi, I need help tracking my Fabrician order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
