import { useEffect, useState, useContext } from "react";
import { OrdersContext } from "../store/shop-order-context";
import OrderItem from "./OrderItem";

export default function Orders({ onCloseModal, onViewOrderDetails, onBackToOrders }) {
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
    <div className="orders">
      <h2>Your Orders</h2>
      <ul className="orders__block">
        {isFetching ? (
          <p>Waiting for fetch orders...</p>
        ) : fetchError.state ? (
          <p>{fetchError.message}</p>
        ) : orders.length ? (
          orders.map((order) => (
            <OrderItem
              order={order}
              key={order.id}
              onViewOrder={() => onViewOrderDetails(order)}
            />
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </ul>

      <div className="modal-actions">
        <button className="text-button button" onClick={() => onCloseModal()}>
          Close
        </button>
      </div>
    </div>
  );
}
