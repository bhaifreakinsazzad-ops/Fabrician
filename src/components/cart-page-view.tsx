"use client";

import Link from "next/link";
import Image from "next/image";

import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/currency";

export function CartPageView() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="container-shell py-16">
        <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white p-12 text-center">
          <p className="serif text-3xl text-[var(--ink)]">Your cart is empty</p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Add a few items and they will appear here.
          </p>
          <Link href="/shop" className="fabric-btn mt-6 inline-flex">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell space-y-8 py-10">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Cart
          </p>
          <h1 className="serif mt-2 text-4xl text-[var(--ink)]">Review your bag</h1>
        </div>
        <button
          type="button"
          className="cursor-pointer text-sm font-semibold text-[var(--muted)] underline transition hover:text-[var(--ink)]"
          onClick={clearCart}
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.key}
              className="flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-white p-4 sm:flex-row"
            >
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={160}
                height={160}
                className="h-36 w-full rounded-2xl object-cover sm:w-28"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[var(--ink)]">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-[var(--muted)]">Size: {item.size}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center overflow-hidden rounded-full border border-[var(--line)]">
                    <button
                      type="button"
                      className="cursor-pointer px-3 py-1 text-lg text-[var(--ink)]"
                      onClick={() =>
                        updateQuantity(item.key, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="cursor-pointer px-3 py-1 text-lg text-[var(--ink)]"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer text-sm font-semibold text-[var(--muted)] underline transition hover:text-[var(--ink)]"
                    onClick={() => removeItem(item.key)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-base font-bold text-[var(--ink)] sm:min-w-24 sm:text-right">
                {formatPrice(item.lineTotal)}
              </p>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-[var(--line)] bg-white p-6">
          <h2 className="text-xl font-bold text-[var(--ink)]">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span className="font-semibold text-[var(--ink)]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Shipping</span>
              <span className="font-semibold text-[var(--ink)]">
                {subtotal >= 120 ? "Free" : formatPrice(8)}
              </span>
            </div>
            <div className="flex justify-between border-t border-[var(--line)] pt-3 text-base">
              <span className="font-semibold text-[var(--ink)]">Estimated total</span>
              <span className="font-bold text-[var(--ink)]">
                {formatPrice(subtotal >= 120 ? subtotal : subtotal + 8)}
              </span>
            </div>
          </div>

          <Link href="/checkout" className="fabric-btn mt-6 inline-flex w-full justify-center">
            Checkout Securely
          </Link>
        </aside>
      </div>
    </section>
  );
}
