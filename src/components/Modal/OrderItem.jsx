import { useContext } from "react";
import { OrdersContext } from "../store/shop-order-context";

export default function OrderItem({ order }) {
  const { deleteOrder } = useContext(OrdersContext);

  function deleteOrderHandler() {
    deleteOrder(order.id);
  }

  return (
    <li className="cart-item">
      <p>
        Order #{order.id}, name: {order.name}
      </p>
      <div className="cart-item-actions">
        <button className="button order-button" onClick={deleteOrderHandler}>
          Delete
        </button>
      </div>
    </li>
  );
}
