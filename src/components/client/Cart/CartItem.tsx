"use client";

import Image from "next/image";
import type { ICartProduct, ICartStore } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "@/hooks/useStore";
import { useCartStore } from "@/store/useCartStore";

export default function CartItem(props: ICartProduct) {
  const cartStore = useStore<ICartStore, ICartStore>(
    useCartStore,
    (state) => state
  );

  if (!cartStore) return <></>;
  const { updateQuantity } = cartStore;

  return (
    <div className="flex w-full">
      <div className="border p-4 rounded-xl">
        <div className="relative h-[76px] w-[76px]">
          <Image
            src={props.image}
            alt={props.title}
            fill
            sizes="96px"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="text-sm text-store-gray mt-1 ml-2">{props.title}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateQuantity(props.id, 0)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-store-gray mt-1 ml-2">
            ${(props.quantity * props.price).toFixed(2)}
          </div>
          <Input
            type="number"
            className="w-14 h-6 text-center mr-2 text-sm"
            defaultValue={props.quantity}
            onBlur={(e) => updateQuantity(props.id, Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
