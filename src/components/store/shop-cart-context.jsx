import { createContext, useReducer } from "react";

export const CartContext = createContext({
  meals: [],
  addMealToCart: () => {},
  updateMealQuantity: () => {},
});

function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedMeals = [...state.meals];
    const existingMealIndex = updatedMeals.findIndex(
      (meal) => meal.id === action.meal.id
    );
    const existingMeal = updatedMeals[existingMealIndex];
    if (existingMeal) {
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity + 1,
      };

      updatedMeals[existingMealIndex] = updatedMeal;
    } else {
      updatedMeals.push({
        id: action.meal.id,
        name: action.meal.name,
        price: action.meal.price,
        quantity: 1,
      });
    }

    return {
      meals: updatedMeals,
    };
  } else if (action.type === "UPDATE_ITEM") {
    const updatedMeals = [...state.meals];
    const existingMealIndex = updatedMeals.findIndex((meal) => meal.id === action.id);
    const existingMeal = updatedMeals[existingMealIndex];
    if (existingMeal.quantity === 1 && action.updateWay === -1) {
      const filteredMeals = updatedMeals.filter((meal) => meal.id !== existingMeal.id);
      return {
        meals: filteredMeals,
      };
    } else {
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity + action.updateWay,
      };
      updatedMeals[existingMealIndex] = updatedMeal;
      return {
        meals: updatedMeals,
      };
    }
  } else if (action.type === "DELETE_ITEMS") {
    return {
      meals: [],
    };
  }
}

export default function CartContextProvider({ children }) {
  const [cartState, cartStateDispatch] = useReducer(CartReducer, { meals: [] });

  function addMealToCartHandler(meal) {
    cartStateDispatch({ type: "ADD_ITEM", meal });
  }

  function updateMealQuantityHandler(id, updateWay) {
    cartStateDispatch({ type: "UPDATE_ITEM", id: id, updateWay: updateWay });
  }

  function deleteAllMealsHandler() {
    cartStateDispatch({ type: "DELETE_ITEMS" });
  }

  const ctxValue = {
    meals: cartState.meals,
    addMealToCart: addMealToCartHandler,
    updateMealQuantity: updateMealQuantityHandler,
    deleteAllMeals: deleteAllMealsHandler,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
