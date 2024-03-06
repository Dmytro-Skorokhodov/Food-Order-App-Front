import { useEffect, useState, useContext } from "react";
import { OrdersContext } from "../store/shop-order-context";

export default function Orders({ onCloseModal }) {
  const { orders, setOrders } = useContext(OrdersContext);

  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState({ state: false, message: "" });

  useEffect(() => {
    async function getOrders() {
      try {
        setIsFetching(true);
        const response = await fetch(
          "https://food-order-app-backend-git-b1b21c-dmytro-skorokhodovs-projects.vercel.app/orders"
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Cannot get orders");
        }
        setOrders(resData);
        setFetchError({ state: false, message: "" });
      } catch (err) {
        setFetchError({ state: true, message: err.message });
      }

      setIsFetching(false);
    }

    getOrders();
  }, []);

  return (
    <div className="cart">
      <h2>Your Orders</h2>
      <ul>
        {" "}
        {isFetching ? (
          <p>Waiting for fetch products...</p>
        ) : fetchError.state ? (
          <p>{fetchError.message}</p>
        ) : (
          <p>{orders}</p>
        )}
      </ul>
      <div className="cart-total">$</div>
      <div className="modal-actions">
        <button className="text-button button" onClick={() => onCloseModal()}>
          Close
        </button>
      </div>
    </div>
  );
}
