export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="serif text-xl text-[var(--ink)]">Fabrician</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Timeless streetwear with premium fabrics, clean silhouettes, and
            crafted finishes.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Support
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink)]">
            <li>support@fabrician.store</li>
            <li>+1 (347) 555-1044</li>
            <li>Mon - Sat, 10:00 AM - 7:00 PM</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Shipping
          </p>
          <p className="mt-3 text-sm text-[var(--ink)]">
            Free shipping over $120 in the US. Returns accepted within 14 days
            for unworn items.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Fabrician. All rights reserved.
      </div>
    </footer>
  );
}
