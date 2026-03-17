import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItemNormalized } from '@/src/types/cart';

interface CartStore {
  items: CartItemNormalized[];
  addItem: (item: Omit<CartItemNormalized, 'itemId' | 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                ...item,
                quantity: item.quantity ?? 1,
                itemId: item.productId + '_' + Date.now(),
              },
            ],
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);
