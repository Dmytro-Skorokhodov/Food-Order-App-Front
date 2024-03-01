import { CartContext } from "../store/shop-cart-context";
import CartItem from "./CartItem";
import { useContext, useState } from "react";

export default function Cart({ onCloseModal, onChangeModalContent }) {
  const { meals, updateMealQuantity } = useContext(CartContext);
  const [isError, setIsError] = useState(false);
  const total = meals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0);

  const isCartFull = meals.length ? true : false;

  function closeModalHandler() {
    onCloseModal();
  }

  function changeModalHandler() {
    if (isCartFull) {
      setIsError(false);
      onChangeModalContent();
    } else {
      setIsError(true);
    }
  }
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {isCartFull ? (
          meals.map((meal) => (
            <CartItem
              key={meal.name}
              name={meal.name}
              price={meal.price}
              quantity={meal.quantity}
              onUpdateItemQuantity={(amount) => updateMealQuantity(meal.id, amount)}
            />
          ))
        ) : (
          <>
            <p>Nothing in the cart.</p>
            {isError && <p>Add some meals before go to checkout!</p>}
          </>
        )}
      </ul>
      <div className="cart-total">${total}</div>
      <div className="modal-actions">
        <button className="text-button button" onClick={closeModalHandler}>
          Close
        </button>
        <button className="button" onClick={changeModalHandler}>
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
