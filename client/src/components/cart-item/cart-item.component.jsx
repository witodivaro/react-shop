import React, { useMemo, memo } from "react";
import { useDispatch } from "react-redux";

import {
  clearCartItem,
  removeCartItem,
  addCartItem,
} from "../../redux/cart/cart.actions";

import "./cart-item.styles.scss";

const MAX_NAME_LENGTH_IN_CART = 14;
const MAX_WORDS_IN_CART_ITEM_NAME = 2;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { imageUrl, price, quantity, name } = item;

  const renderedItemName = useMemo(() => {
    let cutName = name.slice();

    if (cutName.length > MAX_NAME_LENGTH_IN_CART) {
      cutName = cutName.slice(0, MAX_NAME_LENGTH_IN_CART);
    }

    if (cutName.split(" ").length > MAX_WORDS_IN_CART_ITEM_NAME) {
      cutName = cutName
        .split(" ")
        .slice(0, MAX_WORDS_IN_CART_ITEM_NAME)
        .join(" ");
    }

    if (!cutName === name) {
      cutName += "…";
    }

    return cutName;
  }, [name]);

  return (
    <div className="cart-item">
      <div className="item-container">
        <div className="image-container">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="item-info">
          <span className="name">{renderedItemName.toUpperCase()}</span>
          <span className="price">{price}$</span>
          <span className="quantity">x {quantity}</span>
        </div>
      </div>
      <div className="item-options">
        <button
          className="remove"
          disabled={quantity === 1}
          onClick={() => dispatch(removeCartItem(item))}
        >
          ❮
        </button>
        <button className="clear" onClick={() => dispatch(clearCartItem(item))}>
          X
        </button>
        <button
          className="add"
          onClick={() => {
            dispatch(addCartItem(item));
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default memo(CartItem);
