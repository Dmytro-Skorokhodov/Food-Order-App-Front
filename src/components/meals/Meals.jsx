import { useEffect, useState, useContext } from "react";
import Meal from "./Meal";
import { CartContext } from "../store/shop-cart-context";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState({ state: false, message: "" });
  const { addMealToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const response = await fetch(
          "https://food-order-app-backend-gamma.vercel.app/meals"
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        setMeals(resData);
      } catch (err) {
        setFetchError({ state: true, message: err.message });
      }

      setIsFetching(false);
    }

    fetchMeals();
  }, []);

  useEffect(() => {
    if (meals.length) {
      console.log(meals[2].image);
    }
  }, []);

  return (
    <section id="meals">
      {isFetching ? (
        <p>Waiting for fetch products...</p>
      ) : fetchError.state ? (
        <p>{fetchError.message}</p>
      ) : (
        meals.map((meal) => (
          <Meal
            key={meal.id}
            name={meal.name}
            price={meal.price}
            image={`../../assets/${meal.image}`}
            description={meal.description}
            onAddToCart={() => addMealToCart(meal)}
          />
        ))
      )}
      {}
    </section>
  );
}
