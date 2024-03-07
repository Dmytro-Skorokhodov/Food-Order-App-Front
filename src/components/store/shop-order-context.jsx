import { createContext, useReducer } from "react";

export const OrdersContext = createContext({
  orders: [],
  cancelOrder: () => {},
  setOrders: () => {},
});

function OrdersReducer(state, action) {
  if (action.type === "SET_ORDERS") {
    let newOrders = [...action.orders];

    return {
      orders: newOrders,
    };
  }
}

export default function OrdersContextProvider({ children }) {
  const [ordersState, ordersStateDispatch] = useReducer(OrdersReducer, { orders: [] });

  function setOrdersHandler(orders) {
    ordersStateDispatch({ type: "SET_ORDERS", orders: orders });
  }

  function deleteOrderHandler(order) {
    ordersStateDispatch({ type: "DELETE_ORDER", order: order });
  }

  const ctxValue = {
    orders: ordersState.orders,
    deleteOrder: deleteOrderHandler,
    setOrders: setOrdersHandler,
  };

  // console.log(ordersState.orders);
  console.log(ctxValue.orders);

  return <OrdersContext.Provider value={ctxValue}>{children}</OrdersContext.Provider>;
}
