import React from "react";

import Header from "./components/header/Header";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/cart/Cart";
import Summary from "./components/summary/Summary";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "shopping_cart-wrapper",
  };
  return (
    <CartProvider>
      <Header />
      <div className={styles.wrapper}>
        <Cart />
        <Summary />
      </div>
    </CartProvider>
  );
}

export default App;
