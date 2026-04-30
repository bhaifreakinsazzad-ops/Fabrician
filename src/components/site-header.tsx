"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/components/cart-provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="container-shell flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="serif text-2xl tracking-wide text-[var(--ink)]">
            Fabrician
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Crafted Streetwear
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--ink)] hover:bg-[var(--sand)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/cart"
          className="relative rounded-full border border-[var(--line)] bg-white px-5 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ink)]"
        >
          Cart
          <span className="ml-2 rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-bold text-white">
            {itemCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
