export async function postOrder(order) {
  const response = await fetch(
    "https://food-order-app-backend-git-b1b21c-dmytro-skorokhodovs-projects.vercel.app/orders",
    {
      method: "POST",
      body:  JSON.parse(order),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://food-order-app-front.vercel.app",
      },
    }
  );

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.message;
}
