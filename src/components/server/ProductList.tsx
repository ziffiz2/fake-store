import ProductItemCard from "@/components/server/ProductItemCard";
import { ReactNode } from "react";
import type { IProduct } from "@/types/index";

async function ProductList(): Promise<ReactNode> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await response.json();

  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Fake Products</h1>
      {products.map((product: IProduct) => {
        return <ProductItemCard key={product.id} {...product} />;
      })}
    </div>
  );
}

export default ProductList;
