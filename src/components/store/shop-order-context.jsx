import { createContext, useReducer } from "react";

export const OrdersContext = createContext({
  orders: [],
  cancelOrder: () => {},
});

function OrdersReducer(state, action) {}

export default function OrdersContextProvider({ children }) {
  const [ordersState, ordersStateDispatch] = useReducer(OrdersReducer, { orders: [] });

  

   function deleteOrderHandler(order){
      ordersStateDispatch({type: "DELETE_ORDER", order: order})
   }

  const ctxValue = {
   orders: ordersState.orders,
   deleteOrder: deleteOrderHandler,
  };

  return <OrdersContext.Provider ctx={ctxValue}>{children}</OrdersContext.Provider>;
}
