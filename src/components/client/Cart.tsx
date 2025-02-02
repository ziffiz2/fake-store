"use client";

import Image from "next/image";
import bagIcon from "@/assets/icons/bag.svg";
import { CartStore, useCartStore } from "@/store/useCartStore";
import useStore from "@/store/useStore";

export default function Cart() {
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <></>;
  const { totalItems } = cartStore;

  return (
    <div className="text-slate-500 flex space-x-2">
      <Image src={bagIcon} alt="Cart" width={16} height={16} />
      <span>x {totalItems}</span>
    </div>
  );
}
