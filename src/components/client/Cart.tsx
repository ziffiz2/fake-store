"use client";

import { useState } from "react";
import Image from "next/image";
import bagIcon from "@/assets/icons/bag.svg";
import CartItem from "@/components/client/CartItem";
import { ICartStore, useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useStore from "@/store/useStore";

export default function Cart() {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <></>;
  const {
    totalItems,
    isCartOverlayOn,
    items,
    openCartOverlay,
    closeCartOverlay,
    proceedToCheckout,
  } = cartStore;

  return (
    <div>
      <Button
        variant="ghost"
        size="md"
        className="relative"
        onClick={openCartOverlay}
      >
        <div className="text-slate-500 flex space-x-2">
          <Image src={bagIcon} alt="Cart" width={16} height={16} />
          <span>x {totalItems}</span>
        </div>
      </Button>
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
          <div className="flex flex-col max-h-[60vh]">
            <div className="overflow-y-auto flex-1 space-y-4">
              {items.map((product) => {
                return <CartItem key={product.id} {...product} />;
              })}
            </div>
          </div>
          <DialogHeader className="">
            <Button className="w-full bg-green-600 hover:bg-green-600/80 active:bg-green-600/70" onClick={proceedToCheckout}>
              Checkout
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
