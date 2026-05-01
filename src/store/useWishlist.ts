import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCount: () => number;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (productId) => {
        const { items } = get();
        const exists = items.find((i) => i.productId === productId);
        if (exists) {
          set({ items: items.filter((i) => i.productId !== productId) });
        } else {
          set({
            items: [...items, { id: `w${Date.now()}`, productId, addedAt: new Date().toISOString() }],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      getCount: () => get().items.length,
    }),
    {
      name: 'fabrician-wishlist',
    }
  )
);
