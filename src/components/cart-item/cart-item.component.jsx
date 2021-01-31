import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import {
  clearCartItem,
  removeCartItem,
  addCartItem,
} from '../../redux/cart/cart.actions';

import './cart-item.styles.scss';

const MAX_NAME_LENGTH_IN_CART = 14;
const MAX_WORDS_IN_CART_ITEM_NAME = 2;

const CartItem = ({
  item,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
}) => {
  const { imageUrl, price, quantity, name } = item;

  const renderedItemName = useMemo(() => {
    let cutName = name.slice();

    if (cutName.length > MAX_NAME_LENGTH_IN_CART) {
      cutName = cutName.slice(0, MAX_NAME_LENGTH_IN_CART);
    }

    if (cutName.split(' ').length > MAX_WORDS_IN_CART_ITEM_NAME) {
      cutName = cutName
        .split(' ')
        .slice(0, MAX_WORDS_IN_CART_ITEM_NAME)
        .join(' ');
    }

    if (!cutName === name) {
      cutName += '…';
    }

    return cutName;
  }, [name]);

  return (
    <div className="cart-item">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="item-info">
        <span className="name">{renderedItemName.toUpperCase()}</span>
        <span className="price">{price}$</span>
        <span className="quantity">x {quantity}</span>
      </div>
      <div className="item-options">
        <button
          className="remove"
          disabled={quantity === 1}
          onClick={() => removeItemFromCart(item)}
        >
          ❮
        </button>
        <button className="clear" onClick={() => clearItemFromCart(item)}>
          X
        </button>
        <button
          className="add"
          onClick={() => {
            addItemToCart(item);
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearCartItem(item)),
  removeItemFromCart: (item) => dispatch(removeCartItem(item)),
  addItemToCart: (item) => dispatch(addCartItem(item)),
});

export default connect(null, mapDispatchToProps)(CartItem);
