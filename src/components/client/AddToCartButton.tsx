"use client";

import useStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { useCartStore, ICartStore } from "@/store/useCartStore";
import type { IProduct } from "@/types/index";

export default function AddToCartButton(props: { product: IProduct }) {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <></>;
  const { addItem } = cartStore;
  
  // const createCart = async () => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: 5,
  //       date: "2020-02-03",
  //       products: [{ productId: props.product.id, quantity: 1 }],
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to create cart");
  //   }

  //   const data = await response.json();
  //   console.log("data", data)
  // };

  return (
    <Button
      className="w-full hover:bg-blue-700/80 active:bg-blue-700/70"
      onClick={() => addItem(props.product)}
    >
      Add to cart
    </Button>
  );
};
