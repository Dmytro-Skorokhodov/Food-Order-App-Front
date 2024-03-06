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
    ordersStateDispatch({ type: "SET_ORDERS", orders });
  }

  function deleteOrderHandler(order) {
    ordersStateDispatch({ type: "DELETE_ORDER", order: order });
  }

  const ctxValue = {
    orders: ordersState.orders,
    deleteOrder: deleteOrderHandler,
    setOrders: setOrdersHandler,
  };

  return <OrdersContext.Provider ctx={ctxValue}>{children}</OrdersContext.Provider>;
}
