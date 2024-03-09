import { useContext } from "react";
import { OrdersContext } from "../store/shop-order-context";

export default function OrderItem({ order, onViewOrder }) {
  const { deleteOrder } = useContext(OrdersContext);

  function deleteOrderHandler() {
    deleteOrder(order.id);
  }

  return (
    <li className="order-item">
      <p className="order-item__name">
        Order #{order.id}, name: {order.name}
      </p>
      <div className="order-item__actions actions-order-item">
        <button
          className="actions-order-item__button button"
          onClick={() => onViewOrder(order)}>
          View
        </button>
        <button
          className="actions-order-item__button button"
          onClick={deleteOrderHandler}>
          Delete
        </button>
      </div>
    </li>
  );
}
