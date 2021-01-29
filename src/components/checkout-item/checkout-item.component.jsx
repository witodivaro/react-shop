import React from "react";
import { connect } from "react-redux";

import "./checkout-item.styles.scss";

import {
  addCartItem,
  clearCartItem,
  removeCartItem,
} from "../../redux/cart/cart.action";

const CheckoutItem = ({
  cartItem,
  cartItem: { name, imageUrl, price, quantity },
  addCartItem,
  removeCartItem,
  clearCartItem,
}) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={() => removeCartItem(cartItem)}>
          &#10094;
        </span>
        {quantity}
        <span className="arrow" onClick={() => addCartItem(cartItem)}>
          &#10095;
        </span>
      </span>
      <span className="name">{price}</span>
      <div className="remove-button" onClick={() => clearCartItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCartItem: (item) => dispatch(clearCartItem(item)),
  removeCartItem: (item) => dispatch(removeCartItem(item)),
  addCartItem: (item) => dispatch(addCartItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
