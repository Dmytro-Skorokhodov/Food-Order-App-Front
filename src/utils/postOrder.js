
export async function postOrder(order) {
  const response = await fetch("https://food-order-app-backend-git-b1b21c-dmytro-skorokhodovs-projects.vercel.app/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.message;
}
