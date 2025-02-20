import React from "react";

import icons from "../../assets/icons";

import "./Header.scss";

function Header() {
  const classes = {
    wrapper: "shopping_cart-header-wrapper",
    icon: "shopping_cart-header-icon",
    title: "shopping_cart-header-title",
  };
  return (
    <div data-testid="header" className={classes.wrapper}>
      {icons.backArrow({ className: classes.icon })}
      <h1 data-testid="header-title" className={classes.title}>
        Order Summary
      </h1>
    </div>
  );
}

export default Header;
