import { useContext } from "react";
import { CartContext } from "../store/shop-cart-context";

export default function OrderResponse({ response, onCloseModal }) {
  const { deleteAllMeals } = useContext(CartContext);
 
  if (response.ok) {
    deleteAllMeals();
  }
  return (
    <div className="cart">
      <h2>{response ? response : <p>No response.</p>}</h2>
      <div className="modal-actions">
        <button className="button" onClick={onCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
}
