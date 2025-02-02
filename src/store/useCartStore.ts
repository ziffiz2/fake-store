import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ICartProduct, IProduct } from "@/types";

export type CartStore = {
  items: Array<ICartProduct>;
  totalItems: number;
  totalPrice: number;
  isCartOverlayOn: boolean;
  addItem: (item: IProduct) => void;
  //   removeItem: (itemId: number) => void;
  //   updateQuantity: (itemId: number, quantity: number) => void;
  //   clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        totalItems: 0,
        totalPrice: 0,
        isCartOverlayOn: false,
        addItem: async (product) => {
          const items = get().items;

          if (!items.length) {
            const response = await createCart(product.id, 1);
            console.log("response", response);
            if (response.id) {
              set((state) => {
                return {
                  items: [...state.items, { ...product, quantity: 1 }],
                  totalItems: state.totalItems + 1,
                  totalPrice: state.totalPrice + product.price,
                };
              });
            }
            return;
          }

          const existingItem = items.find((i) => i.id === product.id);

          if (existingItem) {
            set((state) => {
              const updatedItems = state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              );
              return {
                items: updatedItems,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.price,
              };
            });
          } else {
            // const response = await createCart(product.id, 1)
            // console.log("response", response)
            set((state) => {
              return {
                items: [...state.items, { ...product, quantity: 1 }],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.price,
              };
            });
          }
        },
      }),
      {
        name: "cart-storage",
        // skipHydration: true,
      }
    ),
    {
      name: "Cart Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);

export async function createCart(productId: number, quantity: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 5,
      products: [{ productId, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
