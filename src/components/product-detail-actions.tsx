"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/add-to-cart-button";

type ProductDetailActionsProps = {
  slug: string;
  sizes: string[];
  inventory: number;
};

export function ProductDetailActions({
  slug,
  sizes,
  inventory,
}: ProductDetailActionsProps) {
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Select Size
        </p>
        <p className="text-sm font-medium text-[var(--muted)]">
          {inventory > 10 ? "In stock" : `${inventory} left`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((option) => {
          const selected = option === size;
          return (
            <button
              key={option}
              type="button"
              className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                  : "border-[var(--line)] bg-[var(--sand)] text-[var(--ink)] hover:border-[var(--ink)]"
              }`}
              onClick={() => setSize(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-[var(--muted)]">Quantity</p>
        <div className="inline-flex items-center overflow-hidden rounded-full border border-[var(--line)]">
          <button
            type="button"
            className="cursor-pointer px-3 py-1 text-lg text-[var(--ink)]"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 text-center text-sm font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            className="cursor-pointer px-3 py-1 text-lg text-[var(--ink)]"
            onClick={() => setQuantity((current) => Math.min(10, current + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <AddToCartButton
        line={{ slug, size, quantity }}
        className="w-full justify-center text-center"
      />
    </div>
  );
}
