type CartProduct = {
  productId: number;
  quantity: number;
};

type CartRequest = {
  userId: number;
  date: string;
  products: CartProduct[];
};

export async function POST(request: Request) {
  try {
    const body: CartRequest = await request.json();

    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: body.userId,
        products: body.products,
      }),
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create cart" }, { status: 500 });
  }
}
