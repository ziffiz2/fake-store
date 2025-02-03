"use server";

import ProductItemCard from "@/components/server/ProductItemCard";
import type { IProduct } from "@/types/index";

function getBaseUrl() {
  // In Docker/production, use the container's internal URL
  if (process.env.NODE_ENV === "production") {
    return "http://0.0.0.0:3000";
  }
  return "http://localhost:3000";
}

async function ProductList() {
  try {
    const response = await fetch(`${getBaseUrl()}/api/store`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return <div>Error loading products. Please try again later.</div>;
    }

    const { products } = await response.json();

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold mb-4">Fake Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product: IProduct) => (
            <ProductItemCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error loading products. Please try again later.</div>;
  }
}

export default ProductList;
