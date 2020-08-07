import React from "react";
import { useCartContext } from "../../contexts/CartContext";

import "./Summary.scss";

function Summary() {
  const classes = {
    wrapper: "shopping_cart-summary-wrapper",
    title: "shopping_cart-summary-title",
    field: "shopping_cart-summary-field",
    total: "shopping_cart-summary-total",
  };
  const { total } = useCartContext();
  return (
    <div data-testid="summary" className={classes.wrapper}>
      <h3 className={classes.title}>Total</h3>
      <p className={classes.field}>
        <span>Items({total.items})</span>
        <span>${total.price}</span>
      </p>
      <p className={classes.field}>
        <span>Discount</span>
        <span>${total.discount}</span>
      </p>
      <p className={classes.field}>
        <span>Type discount</span>
        <span>${total.typeDiscount}</span>
      </p>
      <p className={classes.total}>
        <span>Order total</span>
        <span>${total.price - total.discount - total.typeDiscount}</span>
      </p>
    </div>
  );
}

export default Summary;
