import React, { useEffect, useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_CART_ITEMS } from '../../graphql/cart/cart.queries';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { toggleCartDropdownHidden } from '../../graphql/cart/cart.mutations';

import {
  CartItemsContainer,
  CartDropdownContainer,
  EmptyMessageContainer,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const {
    data: { cartItems },
  } = useQuery(GET_CART_ITEMS);

  const history = useHistory();
  const dropdownRef = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (dropdownRef.current.contains(e.target)) {
        return;
      }
      e.stopPropagation();
      toggleCartDropdownHidden();
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedItems = useMemo(
    () =>
      cartItems.length ? (
        cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} item={cartItem} />;
        })
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      ),
    [cartItems]
  );

  const handleCheckoutClick = () => {
    history.push('/checkout');
    toggleCartDropdownHidden();
  };

  return (
    <CartDropdownContainer ref={dropdownRef}>
      <CartItemsContainer>{renderedItems}</CartItemsContainer>
      <CustomButton onClick={handleCheckoutClick}>GO TO CHECKOUT</CustomButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
