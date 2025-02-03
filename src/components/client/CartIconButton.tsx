"use client";

import Image from "next/image";
import bagIcon from "@/assets/icons/bag.svg";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import type { ICartStore } from "@/types"

export default function Cart() {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state) => state
  );

  if (!cartStore) return <></>;
  const { totalItems, openCartOverlay } = cartStore;

  return (
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
  );
}
