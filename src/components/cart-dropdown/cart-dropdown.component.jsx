import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => {
  const renderedItems = cartItems.map(({ id, name }) => {
    return (
      <div key={id} className="cart-item">
        {name}
      </div>
    );
  });

  return (
    <div className="cart-dropdown">
      <div className="cart-items">{renderedItems}</div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps)(CartDropdown);
