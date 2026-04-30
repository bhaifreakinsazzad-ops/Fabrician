import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice } from "@/lib/currency";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {product.category}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-2 text-lg font-bold text-[var(--ink)] transition hover:text-[var(--accent)]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-[var(--muted)]">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-[var(--ink)]">
            {formatPrice(product.price)}
            {product.compareAtPrice ? (
              <span className="ml-2 text-sm font-medium text-[var(--muted)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </p>
          <AddToCartButton
            line={{
              slug: product.slug,
              size: product.sizes[0],
              quantity: 1,
            }}
          />
        </div>
      </div>
    </article>
  );
}
