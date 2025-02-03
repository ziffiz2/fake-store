"use client";

import CartItem from "@/components/client/Cart/CartItem";
import { useCartStore } from "@/store/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useStore from "@/hooks/useStore";
import { Button } from "@/components/ui/button";
import type { ICartStore } from "@/types";

export default function CartOverlay() {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state) => state
  );

  if (!cartStore) return <></>;
  const {
    totalItems,
    isCartOverlayOn,
    items,
    isLoading: isCartLoading,
    closeCartOverlay,
    proceedToCheckout,
  } = cartStore;

  return (
    <div>
      <Dialog open={isCartOverlayOn} onOpenChange={closeCartOverlay}>
        <DialogContent
          className="max-w-[90%] sm:max-w-[425px] px-2 rounded-lg"
          aria-describedby={undefined}
        >
          <DialogHeader className="">
            <DialogTitle className="text-lg text-left -mt-3 pb-2 font-semibold border-b">
              Cart
            </DialogTitle>
          </DialogHeader>
          {totalItems <= 0 && (
            <div className="text-center">The cart is empty</div>
          )}
          {totalItems > 0 && (
            <div className="flex flex-col max-h-[60vh]">
              <div className="overflow-y-auto flex-1 space-y-4">
                {items.map((product) => {
                  return <CartItem key={product.id} {...product} />;
                })}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              disabled={totalItems <= 0 || isCartLoading}
              className="w-full bg-green-600 hover:bg-green-600/80 active:bg-green-600/70"
              onClick={proceedToCheckout}
            >
              Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
