import React from "react";

import Header from "./components/header/Header";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "shopping_cart-wrapper",
  };
  return (
    <div data-testid="app" className={styles.wrapper}>
      <Header />
    </div>
  );
}

export default App;
