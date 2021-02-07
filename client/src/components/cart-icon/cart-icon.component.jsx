import { useQuery } from '@apollo/client';
import React from 'react';

import { GET_CART_ITEMS_COUNT } from '../../graphql/cart/cart.queries';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartDropdownHidden } from '../../graphql/cart/cart.mutations';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const {
    data: { cartItemsCount },
  } = useQuery(GET_CART_ITEMS_COUNT);

  return (
    <div className="cart-icon" onClick={() => toggleCartDropdownHidden()}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;
