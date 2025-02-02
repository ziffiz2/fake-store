"use client";

import CartItem from "@/components/client/CartItem";
import { ICartStore, useCartStore } from "@/store/useCartStore";
import { ICheckoutStore, useCheckoutStore } from "@/store/useCheckoutStore";

// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useStore from "@/store/useStore";
import CheckoutForm from "@/components/client/CheckoutForm";

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

  const { items } = cartStore;

  const { isCheckoutOverlayOn, closeOverlay } = checkoutStore;

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
            <div className="overflow-y-auto flex-1">
              <CheckoutForm />
              <div className="space-y-4">
                {items.map((product) => {
                  return <CartItem key={product.id} {...product} />;
                })}
              </div>
            </div>
          </div>
          <DialogHeader className="">
            {/* <Button
              className="w-full bg-green-600 hover:bg-green-600/80 active:bg-green-600/70"
              onClick={proceedToCheckout}
            >
              Checkout
            </Button> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
