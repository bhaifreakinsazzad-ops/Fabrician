import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/store/useAuth';
import {
  LayoutDashboard, Package, ShoppingCart, Palette, Settings,
  LogOut, ChevronRight, Sparkles, ArrowLeft
} from 'lucide-react';
const GOLD      = '#C7A36A';
const GOLD_DEEP = '#9E7E5D';
const NAVY      = '#141B2C';

export function AdminLayout() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package,         label: 'Products',  href: '/admin/products' },
    { icon: ShoppingCart,    label: 'Orders',    href: '/admin/orders' },
    { icon: Palette,         label: 'Studio',    href: '/admin/studio' },
    { icon: Settings,        label: 'Settings',  href: '/admin/settings' },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row bg-background">

      {/* ── Sidebar ── */}
      <aside
        className="w-full lg:w-64 lg:min-h-screen flex-shrink-0 flex flex-col"
        style={{ backgroundColor: NAVY, borderRight: '1px solid rgba(199,163,106,0.12)' }}
      >
        {/* Logo */}
        <div className="p-4 lg:p-6">
          <Link to="/" className="flex items-center gap-2.5 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)` }}
            >
              <Sparkles className="w-4 h-4" style={{ color: NAVY }} />
            </div>
            <div className="flex flex-col -gap-0.5">
              <span
                className="font-display font-semibold text-base leading-tight"
                style={{ color: '#F8F2E8' }}
              >
                Fabrician
              </span>
              <span
                className="text-[9px] font-medium uppercase tracking-[0.16em] leading-none"
                style={{ color: GOLD, opacity: 0.75 }}
              >
                Admin Panel
              </span>
            </div>
          </Link>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={isActive
                    ? {
                        background: `linear-gradient(135deg, rgba(199,163,106,0.22) 0%, rgba(158,126,93,0.18) 100%)`,
                        color: '#F8F2E8',
                        borderLeft: `2px solid ${GOLD}`,
                      }
                    : {
                        color: 'rgba(248,242,232,0.50)',
                        borderLeft: '2px solid transparent',
                      }
                  }
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F8F2E8'; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(248,242,232,0.50)'; }}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: GOLD }} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer links — pushed to bottom */}
        <div
          className="mt-auto p-4"
          style={{ borderTop: '1px solid rgba(199,163,106,0.10)' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors mb-1"
            style={{ color: 'rgba(248,242,232,0.45)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F8F2E8'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,242,232,0.45)'; }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors w-full"
            style={{ color: 'rgba(248,242,232,0.45)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F87171'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,242,232,0.45)'; }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-4 lg:p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
