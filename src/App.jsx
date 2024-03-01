import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import CartContextProvider from "./components/store/shop-cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
