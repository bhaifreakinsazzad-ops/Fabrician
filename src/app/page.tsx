import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { featuredProducts, productCategories } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      <section className="container-shell grid gap-8 py-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            New Season Drop
          </p>
          <h1 className="serif text-5xl leading-[1.05] text-[var(--ink)] md:text-6xl">
            Built for everyday movement.
          </h1>
          <p className="max-w-xl text-base text-[var(--muted)] md:text-lg">
            Fabrician blends street-ready silhouettes with premium materials to
            create pieces that wear easy and age beautifully.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="fabric-btn">
              Shop Collection
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ink)]"
            >
              Open Admin
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-[var(--line)] shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
            alt="Fabrician collection showcase"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="container-shell py-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <article
              key={category}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Category
              </p>
              <p className="mt-2 text-xl font-bold text-[var(--ink)]">{category}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Featured
            </p>
            <h2 className="serif mt-2 text-4xl text-[var(--ink)]">
              Popular right now
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-[var(--ink)] underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
