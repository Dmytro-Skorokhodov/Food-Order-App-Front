import { useContext } from "react";
import { OrdersContext } from "../store/shop-order-context";

export default function OrderItem({ name, id }) {
  const { deleteOrder } = useContext(OrdersContext);

  function deleteOrderHandler() {
    deleteOrder(id);
  }

  return (
    <li className="cart-item">
      <p>
        {name} - {id}
      </p>
      <div className="cart-item-actions">
        <button className="text-button" onClick={deleteOrderHandler}>
          Delete
        </button>
      </div>
    </li>
  );
}
