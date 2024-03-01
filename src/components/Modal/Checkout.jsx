import { useContext, useState, useRef, useEffect } from "react";

import Input from "../UI/Input";
import { CartContext } from "../store/shop-cart-context";
import { postOrder } from "../../utils/postOrder";

export default function Checkout({ onCloseModal, onSuccessSubmit }) {
  const emailRef = useRef();
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const { meals } = useContext(CartContext);
  const [isError, setIsError] = useState({ state: false, message: "" });
  const total = meals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0);

  async function submitFormHandler(e) {
    e.preventDefault();
    let response;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;
    const order = { items: meals, name, email, street, city };
    order["postal-code"] = postal;

    try {
      response = await postOrder(order);

      setIsError((prevValue) => {
        return {
          ...prevValue,
          state: false,
        };
      });
    } catch (err) {
      response = err.message;
      setIsError(() => {
        return {
          state: true,
          message: err.message,
        };
      });
    }

    onSuccessSubmit(response);
  }

  return (
    <>
      <form onSubmit={submitFormHandler} className="control">
        <h2>Checkout</h2>
        <div className="total">Total Amount: ${total}</div>

        <Input name="name" ref={nameRef} label="Full Name" />
        <Input name="email" ref={emailRef} label="E-Mail Address" />
        <Input name="street" ref={streetRef} label="Street" />
        <div className="control-row">
          <Input name="postal-code" ref={postalRef} label="Postal Code" />
          <Input name="city" ref={cityRef} label="City" />
        </div>
        {isError.state && <p>{isError.message}</p>}
        <div className="modal-actions">
          <button
            className="text-button button"
            type="button"
            onClick={() => onCloseModal()}>
            Close
          </button>
          <button className="button" type="submit">
            Send Order
          </button>
        </div>
      </form>
    </>
  );
}
