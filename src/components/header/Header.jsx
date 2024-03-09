import Cart from "../Modal/Cart";
import Checkout from "../Modal/Checkout";
import OrderResponse from "../Modal/OrderResponse";
import Modal from "../Modal/Modal";
import { CartContext } from "../store/shop-cart-context";
import HeaderTitle from "./HeaderTitle";
import { useContext, useRef, useState } from "react";
import Orders from "../Modal/Orders";
import OrdersContextProvider from "../store/shop-order-context";
import OrderView from "../Modal/OrderView";

export default function Header() {
  let modalContent;
  const [modalState, setModalState] = useState("");
  const currentOrder = useRef();
  const { meals } = useContext(CartContext);
  const total = meals.reduce((acc, meal) => acc + meal.quantity, 0);

  const modal = useRef();
  const response = useRef();

  function showModalHandler() {
    modal.current.open();
  }

  function showOrderModalHandler() {
    modal.current.open();
    setModalState("Orders");
  }

  function showOrderDetailsHandler(order) {
    setModalState("Order-details");
    currentOrder.current = order;
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
  } else if (modalState === "Orders") {
    modalContent = (
      <Orders
        onCloseModal={closeModalHandler}
        onViewOrderDetails={(order) => showOrderDetailsHandler(order)}
        onBackToOrders={showOrderModalHandler}
      />
    );
  } else if (modalState === "Order-details") {
    modalContent = (
      <OrderView order={currentOrder.current} backToOrders={showOrderModalHandler} />
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
    <OrdersContextProvider>
      <Modal ref={modal} onCloseCheckout={closeModalHandler}>
        {modalContent}
      </Modal>
      <header id="main-header">
        <HeaderTitle />
        <div className="main-header__buttons">
          <button onClick={showOrderModalHandler}>Orders</button>
          <button onClick={showModalHandler}>Cart({total})</button>
        </div>
      </header>
    </OrdersContextProvider>
  );
}
