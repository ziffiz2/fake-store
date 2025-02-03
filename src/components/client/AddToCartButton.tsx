"use client";

import useStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import type { IProduct, ICartStore } from "@/types";

export default function AddToCartButton(props: { product: IProduct }) {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <></>;
  const { addItem } = cartStore;

  return (
    <Button
      className="w-full hover:bg-blue-700/80 active:bg-blue-700/70"
      onClick={() => addItem(props.product)}
    >
      Add to cart
    </Button>
  );
};
