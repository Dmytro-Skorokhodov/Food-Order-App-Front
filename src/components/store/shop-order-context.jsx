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
  } else if (action.type === "DELETE_ORDER") {
    async function deleteOrderHandler() {
      try {
        await fetch(
          `https://food-order-app-backend-git-b1b21c-dmytro-skorokhodovs-projects.vercel.app/orders/${action.order_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://food-order-app-front.vercel.app",
            },
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }

    deleteOrderHandler();

    let newOrders = [...state.orders];

    newOrders = newOrders.filter((order) => order.id !== action.order_id);

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

  function deleteOrderHandler(id) {
    ordersStateDispatch({ type: "DELETE_ORDER", order_id: id });
  }

  const ctxValue = {
    orders: ordersState.orders,
    deleteOrder: deleteOrderHandler,
    setOrders: setOrdersHandler,
  };

  return <OrdersContext.Provider value={ctxValue}>{children}</OrdersContext.Provider>;
}
