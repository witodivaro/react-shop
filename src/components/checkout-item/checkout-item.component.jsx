import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';

import {
  addCartItem,
  clearCartItem,
  removeCartItem,
} from '../../redux/cart/cart.actions';

const CheckoutItem = ({
  cartItem,
  addCartItem,
  removeCartItem,
  clearCartItem,
}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <button
          className="arrow"
          onClick={() => removeCartItem(cartItem)}
          disabled={quantity === 1}
        >
          &#10094;
        </button>
        {quantity}
        <button className="arrow" onClick={() => addCartItem(cartItem)}>
          &#10095;
        </button>
      </span>
      <span className="name">
        {price}$ ({quantity * price}$)
      </span>
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
