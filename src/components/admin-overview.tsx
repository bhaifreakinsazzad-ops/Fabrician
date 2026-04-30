import { products } from "@/lib/products";

function readEnvState() {
  return {
    stripeSecret: Boolean(process.env.STRIPE_SECRET_KEY),
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  };
}

export function AdminOverview() {
  const envState = readEnvState();
  const inStock = products.filter((product) => product.inventory > 0).length;
  const lowStock = products.filter((product) => product.inventory > 0 && product.inventory < 10).length;
  const outOfStock = products.filter((product) => product.inventory === 0).length;

  return (
    <section className="container-shell space-y-6 py-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Admin
        </p>
        <h1 className="serif mt-2 text-4xl text-[var(--ink)]">Store operations</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          This panel gives you live config checks and catalog health before you
          redeploy publicly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total products" value={products.length.toString()} />
        <StatCard label="In stock" value={inStock.toString()} />
        <StatCard label="Low stock" value={lowStock.toString()} />
        <StatCard label="Out of stock" value={outOfStock.toString()} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--ink)]">Deployment checklist</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <CheckItem
              ok={envState.stripeSecret}
              label="Stripe secret key configured"
            />
            <CheckItem
              ok={envState.siteUrl}
              label="Public site URL configured"
            />
            <CheckItem ok={inStock > 0} label="Products available for purchase" />
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--ink)]">Live inventory</h2>
          <div className="mt-4 space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl bg-[var(--sand)] px-3 py-2 text-sm"
              >
                <span className="font-medium text-[var(--ink)]">{product.name}</span>
                <span
                  className={`font-semibold ${
                    product.inventory < 10 ? "text-amber-700" : "text-[var(--ink)]"
                  }`}
                >
                  {product.inventory} units
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-[var(--line)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-[var(--ink)]">{value}</p>
    </article>
  );
}

function CheckItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-[var(--line)] px-3 py-2">
      <span className="font-medium text-[var(--ink)]">{label}</span>
      <span
        className={`rounded-full px-2 py-1 text-xs font-bold ${
          ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {ok ? "OK" : "Needs setup"}
      </span>
    </li>
  );
}
