interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface StoreData {
  categories: string[];
  products: Product[];
}

export async function GET() {
  try {
    const [categoriesResponse, productsResponse] = await Promise.all([
      fetch("https://fakestoreapi.com/products/categories"),
      fetch("https://fakestoreapi.com/products"),
    ]);

    if (!categoriesResponse.ok || !productsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const categories = await categoriesResponse.json();
    const products = await productsResponse.json();

    const storeData: StoreData = {
      categories,
      products,
    };

    return Response.json(storeData);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch store data" },
      { status: 500 }
    );
  }
}
