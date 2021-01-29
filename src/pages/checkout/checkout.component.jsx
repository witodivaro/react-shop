import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./checkout.styles.scss";

import {
  selectCartItems,
  selectCartItemsPrice,
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({ cartItems, cartItemsPrice }) => {
  const renderedItems = cartItems.map((cartItem) => {
    return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
  });

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Decription</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {renderedItems}
      <span className="total">TOTAL: ${cartItemsPrice}</span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemsPrice: selectCartItemsPrice,
});

export default connect(mapStateToProps)(CheckoutPage);
