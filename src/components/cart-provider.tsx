"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getProductBySlug } from "@/lib/products";
import type { CartLine, Product } from "@/lib/types";

type CartItem = {
  key: string;
  size: string;
  quantity: number;
  product: Product;
  lineTotal: number;
};

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (line: CartLine) => void;
  updateQuantity: (lineKey: string, quantity: number) => void;
  removeItem: (lineKey: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "fabrician-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function getLineKey(slug: string, size: string) {
  return `${slug}::${size}`;
}

function sanitizeLine(value: unknown): CartLine | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Partial<CartLine>;

  if (
    typeof candidate.slug !== "string" ||
    typeof candidate.size !== "string" ||
    typeof candidate.quantity !== "number"
  ) {
    return null;
  }

  const product = getProductBySlug(candidate.slug);
  if (!product) return null;

  if (!product.sizes.includes(candidate.size)) return null;

  const quantity = Math.max(1, Math.min(99, Math.floor(candidate.quantity)));

  return {
    slug: candidate.slug,
    size: candidate.size,
    quantity,
  };
}

function loadStoredCart() {
  if (typeof window === "undefined") return [] as CartLine[];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [] as CartLine[];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [] as CartLine[];

    return parsed.map(sanitizeLine).filter((line): line is CartLine => line !== null);
  } catch {
    return [] as CartLine[];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadStoredCart());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = useCallback((line: CartLine) => {
    setLines((current) => {
      const safeLine = sanitizeLine(line);
      if (!safeLine) return current;

      const lineKey = getLineKey(safeLine.slug, safeLine.size);
      const foundIndex = current.findIndex(
        (item) => getLineKey(item.slug, item.size) === lineKey,
      );

      if (foundIndex === -1) {
        return [...current, safeLine];
      }

      const next = [...current];
      const mergedQuantity = Math.min(
        99,
        next[foundIndex].quantity + safeLine.quantity,
      );
      next[foundIndex] = { ...next[foundIndex], quantity: mergedQuantity };
      return next;
    });
  }, []);

  const updateQuantity = useCallback((lineKey: string, quantity: number) => {
    setLines((current) => {
      const cleanedQuantity = Math.floor(quantity);
      if (cleanedQuantity <= 0) {
        return current.filter(
          (item) => getLineKey(item.slug, item.size) !== lineKey,
        );
      }

      return current.map((item) =>
        getLineKey(item.slug, item.size) === lineKey
          ? { ...item, quantity: Math.min(99, cleanedQuantity) }
          : item,
      );
    });
  }, []);

  const removeItem = useCallback((lineKey: string) => {
    setLines((current) =>
      current.filter((item) => getLineKey(item.slug, item.size) !== lineKey),
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = getProductBySlug(line.slug);
        if (!product) return null;

        return {
          key: getLineKey(line.slug, line.size),
          size: line.size,
          quantity: line.quantity,
          product,
          lineTotal: product.price * line.quantity,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [lines]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.lineTotal, 0),
    [items],
  );

  const contextValue = useMemo<CartContextValue>(
    () => ({
      lines,
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [lines, items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext value={contextValue}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
