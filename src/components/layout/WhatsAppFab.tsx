import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useCart } from '@/store/useCart';

const WA_NUMBER = '8801778307704';

// Build a context-aware WhatsApp message based on current page
function buildMessage(pathname: string, cartCount: number): { quick: string; help: string; order: string } {
  const onProduct = pathname.startsWith('/product/');
  const onCart    = pathname === '/cart';
  const onCheckout = pathname === '/checkout';
  const onStudio  = pathname.startsWith('/studio');
  const onWorld   = pathname.startsWith('/worlds/');

  let context = 'Hi Fabrician! ';
  if (onProduct)  context += `I'm looking at this piece — ${window.location.href} — and have a question.`;
  else if (onCart)     context += `I have ${cartCount} item${cartCount !== 1 ? 's' : ''} in my cart and need help completing my order.`;
  else if (onCheckout) context += `I'm on checkout and need help with bKash / Cash on Delivery.`;
  else if (onStudio)   context += `I'm exploring Fabrician Studio and want to know more about custom designs.`;
  else if (onWorld)    context += `I'm browsing one of your Worlds and would like a recommendation.`;
  else                 context += `I have a question about your collection.`;

  return {
    quick: context,
    help:  `Hi Fabrician! I need help with my order or have a question about a product.`,
    order: `Hi Fabrician! I'd like to place an order. Can you help me?`,
  };
}

export function WhatsAppFab() {
  const location = useLocation();
  const cartCount = useCart((s) => s.getItemCount());
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  // Hide on admin pages and during checkout success
  const hidden =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/order-success';

  useEffect(() => {
    // Subtle entrance after 1s
    const t = setTimeout(() => setShown(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Auto-close panel on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  if (hidden) return null;

  const msgs = buildMessage(location.pathname, cartCount);

  return (
    <>
      {/* Quick action panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-[61] w-[300px] sm:w-[340px] rounded-3xl overflow-hidden"
              style={{
                bottom: 'calc(88px + env(safe-area-inset-bottom))',
                right: '16px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 25px 50px -10px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.18)',
              }}
            >
              {/* Header — green WhatsApp surface */}
              <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <MessageCircle className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-white leading-tight">Fabrician Concierge</p>
                      <p className="text-[10px] text-white/85 mt-0.5 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Typically replies in minutes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 transition-all flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2.5">
                <p className="text-xs leading-relaxed mb-2" style={{ color: '#69707D' }}>
                  Quick help, real human. Choose a topic — we'll prefill your message.
                </p>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msgs.quick)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-2xl transition-all hover:bg-[#F6F1EA] active:scale-[0.98]"
                  style={{ backgroundColor: '#FAF6EE', border: '1px solid #E8DED2' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontSize: '18px' }}>💬</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold" style={{ color: '#202432' }}>Ask about this page</p>
                      <p className="text-[10px] truncate" style={{ color: '#9CA3AF' }}>
                        Smart message · context included
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msgs.order)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-2xl transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #C7A36A 0%, #9E7E5D 100%)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontSize: '18px' }}>🛍️</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">Order via WhatsApp</p>
                      <p className="text-[10px] text-white/85">
                        Send your order — we confirm in minutes
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msgs.help)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-2xl transition-all hover:bg-[#F6F1EA] active:scale-[0.98]"
                  style={{ backgroundColor: '#FAFAFA', border: '1px solid #E8E8E8' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontSize: '18px' }}>🤝</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold" style={{ color: '#202432' }}>General help</p>
                      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>
                        Sizing · delivery · returns · payment
                      </p>
                    </div>
                  </div>
                </a>

                <div className="flex items-center justify-center gap-2 pt-2 text-[10px]" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>
                  <span>📞 +88 01778307704</span>
                  <span>·</span>
                  <span>Sat–Thu 10am–10pm</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* The FAB itself */}
      <AnimatePresence>
        {shown && (
          <motion.button
            onClick={() => setOpen(!open)}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="fixed z-[55] flex items-center justify-center rounded-full"
            style={{
              bottom: 'calc(80px + env(safe-area-inset-bottom))',
              right: '16px',
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              boxShadow: '0 8px 24px rgba(37,211,102,0.50), 0 4px 12px rgba(0,0,0,0.15)',
            }}
            aria-label="Chat with Fabrician on WhatsApp"
          >
            {/* Pulse halo */}
            {!open && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: 'rgba(37,211,102,0.35)', animationDuration: '2.4s' }}
              />
            )}
            <span className="relative">
              {open
                ? <X className="w-6 h-6 text-white" strokeWidth={2.4} />
                : <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.2} />
              }
            </span>

            {/* Cart count micro-badge */}
            {!open && cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{ backgroundColor: '#C7A36A', color: '#020509', border: '2px solid #FFFFFF' }}
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop placement: lift FAB above mobile nav only on small screens
// (the bottom: 80px formula already clears the 68px mobile nav.
// On desktop, no mobile nav, so 80px from bottom is fine.)
