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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold mb-4">Fake Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product: IProduct) => {
          return <ProductItemCard key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
