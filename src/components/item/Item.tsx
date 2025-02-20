import React from "react";

import "./Item.scss";

interface Props {
  name: string;
  img_url: string;
  deleteAction: () => void;
}
function Item({ name, img_url, deleteAction }: Props) {
  const classes = {
    wrapper: "shopping_cart-item-wrapper",
    image: "shopping_cart-item-image",
    name: "shopping_cart-item-name",
    button: "shopping_cart-item-button",
  };
  return (
    <div data-testid="item" className={classes.wrapper}>
      <img className={classes.image} src={img_url} alt={name} />
      <span className={classes.name}>{name}</span>
      <button data-testid="item-button" className={classes.button} onClick={deleteAction}>
        X
      </button>
    </div>
  );
}

export default Item;
