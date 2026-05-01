import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Globe, Sparkles, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/store/useCart';

const CREAM     = '#FAF0E3';
const INK       = '#1E140A';
const INK_DIM   = 'rgba(30,20,10,0.38)';
const GOLD      = '#C9A86C';
const GOLD_DEEP = '#8A6B3A';

export function MobileNav() {
  const location  = useLocation();
  const cartCount = useCart((s) => s.getItemCount());

  const navItems = [
    { icon: Home,         label: 'Home',   href: '/',       center: false },
    { icon: ShoppingBag,  label: 'Shop',   href: '/shop',   center: false },
    { icon: Sparkles,     label: 'Studio', href: '/studio', center: true  },
    { icon: Globe,        label: 'Worlds', href: '/worlds', center: false },
    { icon: ShoppingCart, label: 'Cart',   href: '/cart',   center: false, badge: cartCount > 0 ? cartCount : 0 },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div
        className="border-t"
        style={{
          backgroundColor: 'rgba(250,240,227,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(201,168,108,0.28)',
          boxShadow: '0 -6px 24px rgba(30,20,10,0.08)',
        }}
      >
        <div className="flex items-end justify-around h-[68px] max-w-md mx-auto px-2 relative">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href.split('?')[0]);

            if (item.center) {
              // Elevated Studio tab — signature gold center button
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative flex flex-col items-center justify-end gap-1 -mt-5 px-2 pb-2"
                >
                  <motion.div
                    animate={{ y: isActive ? -2 : 0 }}
                    transition={{ type: 'spring', bounce: 0.4, duration: 0.3 }}
                    className="relative"
                  >
                    {/* Glow behind button */}
                    <div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{
                        backgroundColor: 'rgba(201,168,108,0.55)',
                        opacity: isActive ? 0.85 : 0.45,
                      }}
                    />
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                        boxShadow: `0 4px 16px rgba(201,168,108,0.55), 0 0 0 3px rgba(250,240,227,0.97)`,
                      }}
                    >
                      <item.icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                    </div>
                  </motion.div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.14em] leading-none"
                    style={{ color: isActive ? GOLD : INK_DIM }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 min-w-[52px] transition-all duration-200"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-line"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ backgroundColor: GOLD }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.35 }}
                  />
                )}

                <motion.div
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.25 }}
                  className="relative"
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: isActive ? GOLD : INK_DIM }}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {item.badge && item.badge > 0 ? (
                    <span
                      className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  ) : null}
                </motion.div>

                <span
                  className="text-[9px] font-medium leading-none uppercase tracking-[0.08em]"
                  style={{ color: isActive ? INK : INK_DIM }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

void CREAM;
