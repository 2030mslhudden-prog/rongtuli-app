import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
  licenseType: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, licenseType: string) => void;
  updateQuantity: (id: string, licenseType: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(
          (i) => i.id === item.id && i.licenseType === item.licenseType
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.licenseType === item.licenseType
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id, licenseType) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.licenseType === licenseType)
          ),
        });
      },

      updateQuantity: (id, licenseType, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.id === id && i.licenseType === licenseType
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'rongtuli-cart-storage',
    }
  )
);
