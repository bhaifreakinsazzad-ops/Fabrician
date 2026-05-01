import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Truck, MessageCircle } from 'lucide-react';

const BKASH_PHONE  = '01778307704';
const WA_LINK      = `https://wa.me/88${BKASH_PHONE}`;
const WA_LINK_HELP = `${WA_LINK}?text=${encodeURIComponent('Hi, I need help with my Fabrician order.')}`;

// Warm dark palette — from logo's deep gold shadows (warm near-black, not cold navy)
const WARM_DARK  = '#1E140A';
const WARM_DARK2 = '#2A1A0A';
const CREAM_DIM  = 'rgba(250,240,227,0.70)';
const CREAM_DIM2 = 'rgba(250,240,227,0.40)';
const GOLD       = '#C9A86C';

const SHOP_LINKS = [
  { label: 'Kimono Bodysuits', href: '/shop?category=kimono' },
  { label: 'Pajama Sets',      href: '/shop?category=pajama' },
  { label: 'New In',           href: '/shop?collection=new-in' },
  { label: 'Bestsellers',      href: '/shop?collection=bestsellers' },
  { label: 'Gift Sets',        href: '/shop?collection=gift-picks' },
];

const WORLDS_LINKS = [
  { label: 'Cloud Dream',  href: '/worlds/cloud-dream' },
  { label: 'Moon Dream',   href: '/worlds/moon-dream' },
  { label: 'Safari Calm',  href: '/worlds/safari-calm' },
  { label: 'Bunny Garden', href: '/worlds/bunny-garden' },
  { label: 'All Worlds →', href: '/worlds' },
];

const HELP_LINKS = [
  { label: 'About Us',    href: '/about' },
  { label: 'FAQ',         href: '/faq' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'WhatsApp Us', href: 'https://wa.me/8801778307704' },
  { label: 'Contact',     href: '/about#contact' },
  { label: 'Studio ✦',   href: '/studio' },
];

export function AppFooter() {
  return (
    <footer style={{ backgroundColor: WARM_DARK, color: '#FAF0E3' }}>

      {/* Free delivery banner */}
      <div
        className="border-b"
        style={{ backgroundColor: WARM_DARK2, borderColor: 'rgba(201,168,108,0.18)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Truck className="w-4 h-4" style={{ color: GOLD }} />
            <span style={{ color: CREAM_DIM }} className="font-medium">
              Free home delivery all over Bangladesh
            </span>
            <span style={{ color: 'rgba(201,168,108,0.4)' }}>·</span>
            <span style={{ color: CREAM_DIM2 }} className="text-xs">
              Via Pathao Courier · Open &amp; check before returning
            </span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="Fabrician"
                className="h-12 w-12 rounded-full object-cover"
                style={{
                  boxShadow: '0 2px 12px rgba(201,168,108,0.35), 0 0 0 2px rgba(201,168,108,0.20)',
                }}
              />
              <div>
                <span
                  className="font-display font-bold text-base uppercase tracking-[0.06em] block leading-none"
                  style={{ color: '#FAF0E3' }}
                >
                  Fabrician
                </span>
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.20em] block mt-1"
                  style={{ color: GOLD }}
                >
                  Premium Fashion
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: CREAM_DIM2 }}>
              Premium fashion for everyone.
              Now launching with our kids collection — soft worlds, beautifully crafted.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/fabrician"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgba(201,168,108,0.12)', border: '1px solid rgba(201,168,108,0.22)' }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" style={{ color: GOLD }} />
              </a>
              <a
                href="https://facebook.com/fabrician"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgba(201,168,108,0.12)', border: '1px solid rgba(201,168,108,0.22)' }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" style={{ color: GOLD }} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: GOLD }}>
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm transition-all hover:opacity-90"
                    style={{ color: CREAM_DIM }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Worlds */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: GOLD }}>
              Worlds
            </h4>
            <ul className="flex flex-col gap-2.5">
              {WORLDS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm transition-all hover:opacity-90"
                    style={{ color: CREAM_DIM }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help + Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: GOLD }}>
              Help
            </h4>
            <ul className="flex flex-col gap-2.5 mb-5">
              {HELP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm transition-all hover:opacity-90"
                    style={{ color: CREAM_DIM }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              <a
                href={WA_LINK_HELP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs transition-all hover:opacity-80"
                style={{ color: CREAM_DIM }}
              >
                <MessageCircle className="w-3.5 h-3.5" style={{ color: '#25D366' }} />
                WhatsApp: {BKASH_PHONE}
              </a>
              <a
                href="mailto:hello@fabrician.com"
                className="flex items-center gap-2 text-xs transition-all hover:opacity-80"
                style={{ color: CREAM_DIM2 }}
              >
                <Mail className="w-3.5 h-3.5" />
                hello@fabrician.com
              </a>
              <a
                href={`tel:+88${BKASH_PHONE}`}
                className="flex items-center gap-2 text-xs transition-all hover:opacity-80"
                style={{ color: CREAM_DIM2 }}
              >
                <Phone className="w-3.5 h-3.5" />
                +88 {BKASH_PHONE}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(201,168,108,0.15)' }}
        >
          <p className="text-xs" style={{ color: CREAM_DIM2 }}>
            © 2026 Fabrician · Premium Fashion Atelier · Bangladesh
          </p>
          <p className="text-xs font-display italic" style={{ color: 'rgba(201,168,108,0.55)' }}>
            Soft worlds for small moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
