"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useStore from "@/hooks/useStore";
import { Button } from "@/components/ui/button";
import { CheckoutOverlayType, type ICheckoutStore } from "@/types";

export default function OrderConfirmOverlay() {
  const checkoutStore = useStore<ICheckoutStore, ICheckoutStore>(
    useCheckoutStore,
    (state) => state
  );

  if (!checkoutStore) return <></>;

  const { isConfirmOverlayOn, closeOverlay } = checkoutStore;

  return (
    <div>
      <Dialog
        open={isConfirmOverlayOn}
        onOpenChange={() => closeOverlay(CheckoutOverlayType.CONFIRM)}
      >
        <DialogContent
          className="max-w-[90%] sm:max-w-[425px] px-2 rounded-lg top-40"
          aria-describedby={undefined}
        >
          <DialogHeader className="">
            <DialogTitle className="text-lg text-left -mt-3 pb-2 font-semibold border-b">
              Order confirmation
            </DialogTitle>
          </DialogHeader>
          <h1 className="text-center text-[24px] font-semibold">
            Thank you for your order!
          </h1>
          <DialogFooter className="">
            <Button
              className="w-full bg-black"
              onClick={() => closeOverlay(CheckoutOverlayType.CONFIRM)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
