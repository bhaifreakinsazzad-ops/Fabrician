import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Banknote, Check, Shield, Copy, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/store/useCart';
import { useOrders } from '@/store/useOrders';
import { divisions } from '@/data/site';
import { formatPriceBDT, generateOrderId } from '@/lib/utils';
import type { Order } from '@/types';
import { toast } from 'sonner';

const BKASH_NUMBER = '01778307704';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'cod'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bkashCopied, setBkashCopied] = useState(false);

  // Delivery form
  const nameRef     = useRef<HTMLInputElement>(null);
  const phoneRef    = useRef<HTMLInputElement>(null);
  const emailRef    = useRef<HTMLInputElement>(null);
  const divisionRef = useRef<HTMLSelectElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const thanaRef    = useRef<HTMLInputElement>(null);
  const addressRef  = useRef<HTMLTextAreaElement>(null);
  const postalRef   = useRef<HTMLInputElement>(null);
  const notesRef    = useRef<HTMLTextAreaElement>(null);

  // bKash
  const bkashSenderRef = useRef<HTMLInputElement>(null);
  const bkashTrxRef    = useRef<HTMLInputElement>(null);

  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-display font-semibold mb-3">Nothing to checkout</h1>
        <p className="text-muted-foreground text-sm mb-6">Your cart is empty.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#FFFFFF' }}
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  const copyBkashNumber = () => {
    navigator.clipboard.writeText(BKASH_NUMBER).catch(() => {});
    setBkashCopied(true);
    toast.success('bKash number copied!');
    setTimeout(() => setBkashCopied(false), 2500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const name     = nameRef.current?.value?.trim() ?? '';
    const phone    = phoneRef.current?.value?.trim() ?? '';
    const division = divisionRef.current?.value ?? '';
    const district = districtRef.current?.value?.trim() ?? '';
    const thana    = thanaRef.current?.value?.trim() ?? '';
    const address  = addressRef.current?.value?.trim() ?? '';
    const bkashTrx = bkashTrxRef.current?.value?.trim() ?? '';
    const bkashSender = bkashSenderRef.current?.value?.trim() ?? '';

    if (!name || !phone || !division || !district || !thana || !address) {
      toast.error('Please fill in all required delivery fields.');
      return;
    }

    if (paymentMethod === 'bkash' && !bkashTrx) {
      toast.error('Please enter your bKash Transaction ID (TrxID).');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = generateOrderId();
    const orderId     = `order_${Date.now()}`;

    const notesParts = [
      notesRef.current?.value?.trim(),
      bkashSender ? `bKash from: ${bkashSender}` : '',
      bkashTrx    ? `TrxID: ${bkashTrx}` : '',
    ].filter(Boolean);

    const order: Order = {
      id: orderId,
      orderNumber,
      customer: {
        name,
        phone,
        email: emailRef.current?.value?.trim() ?? '',
      },
      items: items.map((item) => ({
        productId: item.productId,
        name:      item.name,
        image:     item.image,
        price:     item.price,
        size:      item.size,
        color:     item.color,
        quantity:  item.quantity,
      })),
      subtotal,
      discount:    0,
      deliveryFee: 0,
      total:       subtotal,
      status:      'placed',
      paymentMethod,
      paymentStatus: 'pending',
      shippingAddress: {
        id:       orderId,
        label:    'Delivery',
        name,
        phone,
        division,
        district,
        thana,
        address,
        isDefault: true,
      },
      notes:     notesParts.join(' | '),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // WhatsApp message for admin
    const itemsSummary = items
      .map((i) => `${i.name} (${i.size}) ×${i.quantity}`)
      .join(', ');

    const waText = encodeURIComponent(
      `🛍️ *New Fabrician Order!*\n\n` +
      `Order: *${orderNumber}*\n` +
      `Customer: ${name}\n` +
      `Phone: ${phone}\n` +
      `Total: ৳${subtotal.toLocaleString()}\n` +
      `Payment: ${paymentMethod === 'bkash' ? `bKash (TrxID: ${bkashTrx})` : 'Cash on Delivery'}\n` +
      `Address: ${address}, ${thana}, ${district}, ${division}\n\n` +
      `Items: ${itemsSummary}`
    );

    setTimeout(() => {
      addOrder(order);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(
        `/order-success?id=${orderNumber}&method=${paymentMethod}&trx=${encodeURIComponent(bkashTrx)}&wa=${waText}`
      );
    }, 1300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8 max-w-xs">
        <Link
          to="/cart"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Cart
        </Link>
        <div className="flex-1 h-px rounded-full" style={{ backgroundColor: 'rgba(200,165,122,0.4)' }} />
        <span className="text-xs font-semibold" style={{ color: '#B8924A' }}>Checkout</span>
        <div className="flex-1 h-px bg-border rounded-full" />
        <span className="text-xs text-muted-foreground">Confirmed</span>
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Secure</p>
        <h1 className="text-3xl font-display font-semibold">Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder} noValidate>
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* ── Left column ── */}
          <div className="space-y-5">

            {/* 1 · Contact */}
            <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card">
              <h2 className="font-display font-semibold text-base mb-4 flex items-center gap-2.5">
                <span
                  className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)' }}
                >
                  1
                </span>
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Full Name *
                  </Label>
                  <Input
                    ref={nameRef}
                    id="name"
                    required
                    placeholder="Enter your full name"
                    className="mt-1.5 rounded-xl border-border/60"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    ref={phoneRef}
                    id="phone"
                    required
                    placeholder="01XXXXXXXXX"
                    className="mt-1.5 rounded-xl border-border/60"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email <span className="font-normal text-muted-foreground/60">(optional)</span>
                  </Label>
                  <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-1.5 rounded-xl border-border/60"
                  />
                </div>
              </div>
            </div>

            {/* 2 · Address */}
            <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card">
              <h2 className="font-display font-semibold text-base mb-4 flex items-center gap-2.5">
                <span
                  className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)' }}
                >
                  2
                </span>
                Delivery Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="division" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Division *
                  </Label>
                  <select
                    ref={divisionRef}
                    id="division"
                    required
                    className="w-full mt-1.5 h-10 px-3 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400/40 transition-colors"
                  >
                    <option value="">Select Division</option>
                    {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="district" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    District *
                  </Label>
                  <Input ref={districtRef} id="district" required placeholder="e.g. Dhaka" className="mt-1.5 rounded-xl border-border/60" />
                </div>
                <div>
                  <Label htmlFor="thana" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Thana / Upazila *
                  </Label>
                  <Input ref={thanaRef} id="thana" required placeholder="e.g. Mirpur" className="mt-1.5 rounded-xl border-border/60" />
                </div>
                <div>
                  <Label htmlFor="postal" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Postal Code
                  </Label>
                  <Input ref={postalRef} id="postal" placeholder="e.g. 1216" className="mt-1.5 rounded-xl border-border/60" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Full Address *
                  </Label>
                  <textarea
                    ref={addressRef}
                    id="address"
                    required
                    rows={3}
                    placeholder="House no, Road no, Area, Landmark..."
                    className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400/40 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 3 · Payment */}
            <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card">
              <h2 className="font-display font-semibold text-base mb-4 flex items-center gap-2.5">
                <span
                  className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)' }}
                >
                  3
                </span>
                Payment Method
              </h2>

              {/* Method cards */}
              <div className="grid sm:grid-cols-2 gap-3 mb-0">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className="relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200"
                  style={{
                    borderColor:     paymentMethod === 'bkash' ? '#E2136E' : '#E8DED2',
                    backgroundColor: paymentMethod === 'bkash' ? '#FFF5F9' : 'transparent',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#E2136E' }}
                  >
                    <span className="text-white font-bold text-xs leading-none">bK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">bKash</p>
                    <p className="text-xs text-muted-foreground">Mobile wallet</p>
                  </div>
                  {paymentMethod === 'bkash' && (
                    <div
                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#E2136E' }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className="relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200"
                  style={{
                    borderColor:     paymentMethod === 'cod' ? '#C8A57A' : '#E8DED2',
                    backgroundColor: paymentMethod === 'cod' ? '#FFFBF4' : 'transparent',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: paymentMethod === 'cod' ? '#C8A57A' : '#F6F1EA' }}
                  >
                    <Banknote
                      className="w-5 h-5"
                      style={{ color: paymentMethod === 'cod' ? '#FFFFFF' : '#9CA3AF' }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when received</p>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div
                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)' }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              </div>

              {/* ── bKash instructions (animated) ── */}
              <AnimatePresence initial={false}>
                {paymentMethod === 'bkash' && (
                  <motion.div
                    key="bkash-panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mt-4 p-5 rounded-2xl border"
                      style={{ backgroundColor: '#FFF5F9', borderColor: 'rgba(226,19,110,0.20)' }}
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-4"
                        style={{ color: '#E2136E' }}
                      >
                        bKash Payment Instructions
                      </p>

                      {/* Steps */}
                      <ol className="space-y-2 mb-4">
                        {[
                          'Open your bKash app',
                          'Tap "Send Money"',
                          `Enter number: ${BKASH_NUMBER}`,
                          `Enter amount: ৳${subtotal.toLocaleString()}`,
                          'Enter your bKash PIN and confirm',
                          'Note the Transaction ID (TrxID) from the SMS',
                          'Enter the TrxID below and place your order',
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs">
                            <span
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[9px] mt-0.5"
                              style={{ backgroundColor: '#E2136E' }}
                            >
                              {i + 1}
                            </span>
                            <span style={{ color: '#202432' }}>{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Number to copy */}
                      <div
                        className="flex items-center justify-between p-3.5 rounded-xl mb-4"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(226,19,110,0.15)' }}
                      >
                        <div>
                          <p className="text-[9px] text-muted-foreground mb-0.5 uppercase tracking-wide font-semibold">
                            Send Money to (Personal)
                          </p>
                          <p
                            className="font-bold text-xl tracking-widest"
                            style={{ color: '#E2136E' }}
                          >
                            {BKASH_NUMBER}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={copyBkashNumber}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            backgroundColor: bkashCopied ? '#E2136E' : '#FFF0F6',
                            color:           bkashCopied ? '#FFFFFF' : '#E2136E',
                            border:          '1px solid rgba(226,19,110,0.3)',
                          }}
                        >
                          {bkashCopied
                            ? <Check className="w-3 h-3" />
                            : <Copy className="w-3 h-3" />
                          }
                          {bkashCopied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>

                      {/* TrxID + sender */}
                      <div className="space-y-3">
                        <div>
                          <Label
                            className="text-xs font-semibold uppercase tracking-wide"
                            style={{ color: '#C11960' }}
                          >
                            Transaction ID (TrxID) *
                          </Label>
                          <Input
                            ref={bkashTrxRef}
                            placeholder="e.g. 8N5K2P3A4B"
                            className="mt-1.5 rounded-xl font-mono tracking-wider"
                            style={{ borderColor: 'rgba(226,19,110,0.30)' }}
                          />
                          <p className="text-[10px] text-muted-foreground mt-1">
                            From your bKash SMS after sending money
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Your bKash Number{' '}
                            <span className="font-normal">(optional, for reference)</span>
                          </Label>
                          <Input
                            ref={bkashSenderRef}
                            placeholder="01XXXXXXXXX"
                            className="mt-1.5 rounded-xl border-border/60"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── COD note (animated) ── */}
              <AnimatePresence initial={false}>
                {paymentMethod === 'cod' && (
                  <motion.div
                    key="cod-panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mt-4 p-4 rounded-xl text-xs"
                      style={{ backgroundColor: '#F6F1EA', border: '1px solid #E8DED2', color: '#69707D' }}
                    >
                      <p className="font-semibold mb-1" style={{ color: '#202432' }}>
                        How Cash on Delivery works
                      </p>
                      <ul className="space-y-1">
                        <li>• Our <strong style={{ color: '#202432' }}>Pathao Courier</strong> will call you before delivery</li>
                        <li>• Have the exact amount ready: <strong style={{ color: '#B8924A' }}>৳{subtotal.toLocaleString()}</strong></li>
                        <li className="font-medium" style={{ color: '#B8924A' }}>
                          ✓ You may open and check your order before accepting
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notes */}
            <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card">
              <h2 className="font-display font-semibold text-base mb-3">
                Order Notes{' '}
                <span className="font-normal text-muted-foreground text-sm">(Optional)</span>
              </h2>
              <textarea
                ref={notesRef}
                rows={3}
                placeholder="Gift message, colour preference, delivery instructions..."
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400/40 transition-colors"
              />
            </div>
          </div>

          {/* ── Right column — summary ── */}
          <div>
            <div className="sticky top-24 rounded-3xl bg-card border border-border/40 shadow-card overflow-hidden">
              <div
                className="h-1"
                style={{ background: 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)' }}
              />
              <div className="p-6">
                <h2 className="font-display font-semibold text-lg mb-4">Your Order</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-medium leading-tight truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {item.color} · {item.size} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold flex-shrink-0 mt-0.5">
                        {formatPriceBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border/50 mb-4" />

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPriceBDT(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold" style={{ color: '#16A34A' }}>Free ✓</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Courier</span>
                    <span className="font-medium">Pathao</span>
                  </div>
                </div>

                <div className="h-px bg-border/50 mb-4" />

                <div className="flex justify-between items-center mb-5">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold font-display">{formatPriceBDT(subtotal)}</span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl h-12 text-sm font-semibold transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                    color:       '#FFFFFF',
                    boxShadow:   '0 4px 20px rgba(184,146,74,0.28)',
                    opacity:     isSubmitting ? 0.75 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {paymentMethod === 'bkash' ? 'Confirm bKash Order' : 'Place Order — COD'}
                    </span>
                  )}
                </Button>

                {/* Trust pills */}
                <div className="mt-4 space-y-2">
                  {[
                    { icon: Truck,    text: 'Free delivery via Pathao' },
                    { icon: Shield,   text: 'Open & check before returning' },
                    { icon: MessageCircle, text: 'WhatsApp support: ' + BKASH_NUMBER },
                  ].map((t) => (
                    <div
                      key={t.text}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                      style={{ backgroundColor: '#F6F1EA', color: '#69707D' }}
                    >
                      <t.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#B8924A' }} />
                      {t.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </motion.div>
  );
}
