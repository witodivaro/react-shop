import React from 'react';

import './checkout-item.styles.scss';

import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from '../../graphql/cart/cart.mutations';

const CheckoutItem = ({ cartItem }) => {
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
          onClick={() => removeItemFromCart(cartItem)}
          disabled={quantity === 1}
        >
          &#10094;
        </button>
        {quantity}
        <button className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </button>
      </span>
      <span className="name">
        {price}$ ({quantity * price}$)
      </span>
      <div
        className="remove-button"
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
