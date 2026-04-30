import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductDetailActions } from "@/components/product-detail-actions";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/currency";
import { getProductBySlug, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);

  return (
    <div className="container-shell space-y-10 py-10">
      <section className="grid gap-7 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((imageUrl) => (
              <div
                key={imageUrl}
                className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
              >
                <Image
                  src={imageUrl}
                  alt={`${product.name} view`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 18vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {product.category}
          </p>
          <h1 className="serif text-4xl text-[var(--ink)] md:text-5xl">
            {product.name}
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">
            {product.longDescription}
          </p>
          <p className="text-3xl font-bold text-[var(--ink)]">
            {formatPrice(product.price)}
            {product.compareAtPrice ? (
              <span className="ml-3 text-lg font-medium text-[var(--muted)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </p>

          <ProductDetailActions
            slug={product.slug}
            sizes={product.sizes}
            inventory={product.inventory}
          />

          <ul className="space-y-1 text-sm text-[var(--muted)]">
            {product.tags.map((tag) => (
              <li key={tag}>• {tag}</li>
            ))}
          </ul>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="space-y-4">
          <h2 className="serif text-3xl text-[var(--ink)]">You may also like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
