import type { IProduct } from "@/types";

export interface ICartProduct extends IProduct {
  quantity: number;
}
export interface ICartStore {
  cartId: number | undefined;
  items: Array<ICartProduct>;
  totalItems: number;
  totalPrice: number;
  isCartOverlayOn: boolean;
  addItem: (item: IProduct) => void;
  openCartOverlay: () => void;
  closeCartOverlay: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  proceedToCheckout: () => void;
  clearCart: () => void;
}