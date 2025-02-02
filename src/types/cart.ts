import type { IProduct } from "@/types";

export interface ICartProduct extends IProduct {
  quantity: number;
}
