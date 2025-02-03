"use client";

import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import type { ICartStore, ICheckoutStore } from "@/types";

export default function CheckoutFooter() {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state) => state
  );

  const checkoutStore = useStore<ICheckoutStore, ICheckoutStore>(
    useCheckoutStore,
    (state) => state
  );

  if (!cartStore || !checkoutStore) return <></>;

  const { totalPrice, isLoading: isCartLoading } = cartStore;

  const { isValid, isLoading: isCheckoutLoading, confirmOrder } = checkoutStore;

  return (
    <div className="border-t py-2 space-y-2">
      <div className="flex justify-center text-lg font-semibold">
        Order Summary: ${totalPrice.toFixed(2)}
      </div>
      <Button
        disabled={!isValid || isCartLoading || isCheckoutLoading}
        onClick={confirmOrder}
        className="w-full bg-green-600 hover:bg-green-600/80 active:bg-green-600/70"
      >
        Confirm order
      </Button>
    </div>
  );
}
