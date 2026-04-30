"use client";

import { useMemo, useState } from "react";

import { useCart } from "@/components/cart-provider";
import type { CartLine } from "@/lib/types";

type AddToCartButtonProps = {
  line: CartLine;
  className?: string;
};

export function AddToCartButton({ line, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const buttonClassName = useMemo(() => {
    const base =
      "cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition";
    const style = justAdded
      ? "bg-[var(--accent-2)] text-white"
      : "bg-[var(--ink)] text-white hover:bg-[var(--accent)]";
    return `${base} ${style} ${className ?? ""}`.trim();
  }, [className, justAdded]);

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={() => {
        addItem(line);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1200);
      }}
    >
      {justAdded ? "Added" : "Add to Cart"}
    </button>
  );
}
