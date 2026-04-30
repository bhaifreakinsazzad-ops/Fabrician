import type { Metadata } from "next";

import { ShopBrowser } from "@/components/shop-browser";
import { productCategories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Fabrician's full premium clothing catalog.",
};

export default function ShopPage() {
  return (
    <section className="container-shell space-y-6 py-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Catalog
        </p>
        <h1 className="serif mt-2 text-4xl text-[var(--ink)] md:text-5xl">
          Explore the collection
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
          Filter by category, search by name, and sort by price or featured status.
        </p>
      </div>
      <ShopBrowser products={products} categories={productCategories} />
    </section>
  );
}

