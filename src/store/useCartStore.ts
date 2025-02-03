import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useCheckoutStore } from "./useCheckoutStore";
import { updateCart, createCart } from "@/services";
import { type IProduct, type ICartStore, CheckoutOverlayType } from "@/types";

export const useCartStore = create<ICartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartId: undefined,
        items: [],
        totalItems: 0,
        totalPrice: 0,
        isCartOverlayOn: false,
        isLoading: false,
        proceedToCheckout: () => {
          set((state) => ({ ...state, isCartOverlayOn: false }));
          const { openOverlay } = useCheckoutStore.getState();
          openOverlay(CheckoutOverlayType.CHECKOUT);
        },
        clearCart: () => {
          set((state) => ({
            ...state,
            cartId: undefined,
            items: [],
            totalItems: 0,
            totalPrice: 0,
          }));
        },
        openCartOverlay: () =>
          set((state) => ({ ...state, isCartOverlayOn: true })),
        closeCartOverlay: () =>
          set((state) => ({ ...state, isCartOverlayOn: false })),
        updateQuantity: async (productId, quantity) => {
          const cartId = get().cartId;

          set({ isLoading: true });

          const response = await updateCart(cartId!, productId, quantity);

          if (!response.id) {
            set({ isLoading: false });
            return;
          }

          set((state) => {
            let updatedItems;
            if (quantity <= 0) {
              updatedItems = state.items.filter(
                (item) => item.id !== productId
              );
            } else {
              updatedItems = state.items.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item
              );
            }

            return {
              ...state,
              items: updatedItems,
              totalItems: updatedItems.reduce(
                (total, item) => total + item.quantity,
                0
              ),
              totalPrice: updatedItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ),
              isLoading: false,
            };
          });
        },
        addItem: async (product: IProduct) => {
          const items = get().items;
          const cartId = get().cartId;

          // If no items, create cart with selected product
          if (!cartId) {
            const response = await createCart(product.id, 1);
            if (response.id) {
              set((state) => {
                return {
                  cartId: response.id,
                  items: [...state.items, { ...product, quantity: 1 }],
                  totalItems: state.totalItems + 1,
                  totalPrice: state.totalPrice + product.price,
                };
              });
            }
            return;
          }

          const existingItem = items.find((item) => item.id === product.id);

          // If cart has item, updating cart instead of creating cart
          if (existingItem) {
            const response = await updateCart(
              cartId!,
              product.id,
              existingItem.quantity + 1
            );

            if (!response.id) return;

            set((state) => {
              const updatedItems = state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
              return {
                items: updatedItems,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.price,
              };
            });
          } else {
            const response = await updateCart(cartId!, product.id, 1);

            if (!response.id) return;

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
      }
    ),
    {
      name: "Cart Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
