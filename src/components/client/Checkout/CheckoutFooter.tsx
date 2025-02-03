"use client";

import { ICartStore, useCartStore } from "@/store/useCartStore";
import { ICheckoutStore, useCheckoutStore } from "@/store/useCheckoutStore";
import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";

export default function CheckoutFooter() {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state
  );

  const checkoutStore = useStore<ICheckoutStore, ICheckoutStore>(
    useCheckoutStore,
    (state: any) => state
  );

  if (!cartStore || !checkoutStore) return <></>;

  const { totalPrice } = cartStore;

  const { isValid } = checkoutStore;

  return (
    <div className="border-t py-2 space-y-2">
      <div className="flex justify-center text-lg font-semibold">
        Order Summary: ${totalPrice.toFixed(2)}
      </div>
      <Button
        disabled={!isValid}
        className="w-full bg-green-600 hover:bg-green-600/80 active:bg-green-600/70"
      >
        Confirm order
      </Button>
    </div>
  );
}
