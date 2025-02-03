export async function createCart(productId: number, quantity: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 5,
      products: [{ productId, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function updateCart(
  cartId: number,
  productId: number,
  quantity: number
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
      products: [{ productId, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
