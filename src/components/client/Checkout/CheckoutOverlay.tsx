"use client";

import CartItem from "@/components/client/Cart/CartItem";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useStore from "@/store/useStore";
import CheckoutForm from "@/components/client/Checkout/CheckoutForm";
import CheckoutFooter from "./CheckoutFooter";
import type { ICartStore, ICheckoutStore } from "@/types";

export default function CheckoutOverlay() {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state
  );

  const checkoutStore = useStore<ICheckoutStore, ICheckoutStore>(
    useCheckoutStore,
    (state: any) => state
  );

  if (!cartStore || !checkoutStore) return <></>;

  const { items, totalPrice } = cartStore;

  const { isCheckoutOverlayOn, isValid, closeOverlay } = checkoutStore;

  return (
    <div>
      <Dialog
        open={isCheckoutOverlayOn}
        onOpenChange={() => closeOverlay("isCheckoutOverlayOn")}
      >
        <DialogContent
          className="max-w-[90%] sm:max-w-[425px] px-2 rounded-lg"
          aria-describedby={undefined}
        >
          <DialogHeader className="">
            <DialogTitle className="text-lg text-left -mt-3 pb-2 font-semibold border-b">
              Checkout
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col max-h-[60vh]">
            <div className="overflow-y-auto flex-1 space-y-6 pr-2 pl-1">
              <CheckoutForm />
              <div className="space-y-4 border-t pt-8">
                {items.map((product) => {
                  return <CartItem key={product.id} {...product} />;
                })}
              </div>
            </div>
          </div>
          <CheckoutFooter />
        </DialogContent>
      </Dialog>
    </div>
  );
}
