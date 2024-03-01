import Cart from "../Modal/Cart";
import Checkout from "../Modal/Checkout";
import OrderResponse from "../Modal/OrderResponse";
import Modal from "../Modal/Modal";
import { CartContext } from "../store/shop-cart-context";
import HeaderTitle from "./HeaderTitle";
import { useContext, useRef, useState } from "react";

export default function Header() {
  let modalContent;
  const [modalState, setModalState] = useState("");
  const { meals } = useContext(CartContext);
  const total = meals.reduce((acc, meal) => acc + meal.quantity, 0);

  const modal = useRef();
  const response = useRef();

  function showModalHandler() {
    modal.current.open();
  }

  function closeModalHandler() {
    modal.current.close();
    setModalState("");
  }

  function openResponseModalHandler(res) {
    setModalState("OrderResponse");
    response.current = res;
  }

  if (modalState === "Checkout") {
    modalContent = (
      <Checkout
        onCloseModal={closeModalHandler}
        onSuccessSubmit={(response) => openResponseModalHandler(response)}
      />
    );
  } else if (modalState === "OrderResponse") {
    modalContent = (
      <OrderResponse response={response.current} onCloseModal={closeModalHandler} />
    );
  } else {
    modalContent = (
      <Cart
        onCloseModal={closeModalHandler}
        onChangeModalContent={() => setModalState("Checkout")}
      />
    );
  }

  return (
    <>
      <Modal ref={modal} onCloseCheckout={closeModalHandler}>
        {modalContent}
      </Modal>
      <header id="main-header">
        <HeaderTitle />
        <button onClick={showModalHandler}>Cart({total})</button>
      </header>
    </>
  );
}
