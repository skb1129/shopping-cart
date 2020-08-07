import React from "react";
import classNames from "classnames";

import Item from "../item/Item";
import { useCartContext } from "../../contexts/CartContext";

import "./Cart.scss";

function Cart() {
  const classes = {
    wrapper: "shopping_cart-cart-wrapper",
    row: "shopping_cart-cart-row",
    rowHead: "shopping_cart-cart-row-head",
    column1: "shopping_cart-cart-column1",
    column2: "shopping_cart-cart-column2",
    button: "shopping_cart-cart-button",
    reset: "shopping_cart-cart-reset",
  };
  const { isLoading, reset, items, total, deleteItem, updateQuantity } = useCartContext();
  if (isLoading) return null;
  return (
    <div data-testid="cart" className={classes.wrapper}>
      <div data-testid="cart-head" className={classNames(classes.row, classes.rowHead)}>
        <div className={classes.column1}>Items({total.items})</div>
        <div className={classes.column2}>Qty</div>
        <div className={classes.column2}>Price</div>
      </div>
      {items?.length ? (
        items.map((item) => (
          <div key={item.id} className={classes.row}>
            <div className={classes.column1}>
              <Item name={item.name} img_url={item.img_url} deleteAction={() => deleteItem(item.id)} />
            </div>
            <div className={classes.column2}>
              <button className={classes.button} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button className={classes.button} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className={classes.column2}>${item.price}</div>
          </div>
        ))
      ) : (
        <button className={classes.reset} onClick={reset}>
          Reset Cart
        </button>
      )}
    </div>
  );
}

export default Cart;
