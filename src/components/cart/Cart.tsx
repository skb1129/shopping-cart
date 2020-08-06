import React from "react";
import classNames from "classnames";
import { useCartContext } from "../../contexts/CartContext";

import "./Cart.scss";

function Cart() {
  const classes = {
    wrapper: "shopping_cart-cart-wrapper",
    row: "shopping_cart-cart-row",
    rowHead: "shopping_cart-cart-row-head",
    column1: "shopping_cart-cart-column1",
    column2: "shopping_cart-cart-column2",
  };
  const { items, total } = useCartContext();
  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.row, classes.rowHead)}>
        <div className={classes.column1}>Items ({total.items})</div>
        <div className={classes.column2}>Qty</div>
        <div className={classes.column2}>Price</div>
      </div>
      {items.map((item) => (
        <div key={item.id} className={classes.row}>
          <div className={classes.column1}>{item.name}</div>
          <div className={classes.column2}>{item.quantity}</div>
          <div className={classes.column2}>${item.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
