import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  productIds: string[];
  add: (id: string) => void;
  clear: () => void;
}

const MAX = 8;

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      add: (id) => {
        const current = get().productIds.filter((p) => p !== id);
        set({ productIds: [id, ...current].slice(0, MAX) });
      },
      clear: () => set({ productIds: [] }),
    }),
    { name: 'fabrician-recently-viewed' }
  )
);
