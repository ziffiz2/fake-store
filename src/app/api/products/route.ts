export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
