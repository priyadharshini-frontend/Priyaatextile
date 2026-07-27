export async function addToCart(productId: string, quantity: number) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getCart() {
  const response = await fetch("/api/cart");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getCartCount() {
  const response = await fetch("/api/cart/count");

  return response.json();
}