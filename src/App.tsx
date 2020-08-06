import React from "react";

import Header from "./components/header/Header";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/cart/Cart";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "shopping_cart-wrapper",
  };
  return (
    <CartProvider>
      <div data-testid="app" className={styles.wrapper}>
        <Header />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
