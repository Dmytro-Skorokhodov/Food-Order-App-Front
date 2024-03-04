import { useEffect, useState } from "react";

export default function Orders({ onCloseModal }) {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState({ state: false, message: "" });

  useEffect(() => {
    async function getOrders() {
      try {
        setIsFetching(true);
        const response = await fetch(
          "https://food-order-app-backend-smoky.vercel.app/orders"
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Cannot get orders");
        }
        setOrders(resData);
      } catch (err) {
        setFetchError({ state: true, message: err.message });
      }

      setIsFetching(false);
    }
  }, []);

  return (
    <div className="cart">
      <h2>Your Orders</h2>
      <ul>{orders}</ul>
      <div className="cart-total">$</div>
      <div className="modal-actions">
        <button className="text-button button" onClick={() => onCloseModal()}>
          Close
        </button>
      </div>
    </div>
  );
}
