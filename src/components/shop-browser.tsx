"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import type { Product, ProductCategory } from "@/lib/types";

type ShopBrowserProps = {
  products: Product[];
  categories: ProductCategory[];
};

type SortOption = "featured" | "price-low" | "price-high" | "name";

export function ShopBrowser({ products, categories }: ShopBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const scoped = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });

    return [...scoped].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (a.featured === b.featured) return a.name.localeCompare(b.name);
      return a.featured ? -1 : 1;
    });
  }, [category, products, query, sortBy]);

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-3xl border border-[var(--line)] bg-white p-4 md:grid-cols-[1fr_220px_220px]">
        <label className="flex flex-col text-sm font-semibold text-[var(--muted)]">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or tag"
            className="mt-2 rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none ring-0 transition focus:border-[var(--ink)]"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-[var(--muted)]">
          Category
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as ProductCategory | "All")
            }
            className="mt-2 rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none transition focus:border-[var(--ink)]"
          >
            <option value="All">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm font-semibold text-[var(--muted)]">
          Sort
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="mt-2 rounded-xl border border-[var(--line)] bg-[var(--sand)] px-4 py-2 text-[var(--ink)] outline-none transition focus:border-[var(--ink)]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <p className="text-sm font-medium text-[var(--muted)]">
        {filteredProducts.length} item
        {filteredProducts.length === 1 ? "" : "s"} found
      </p>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white p-10 text-center">
          <p className="text-lg font-semibold text-[var(--ink)]">No matches yet</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Try another keyword or clear your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
