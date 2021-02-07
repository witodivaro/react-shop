import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {
  cartDropdownHiddenVar,
  cartItemsVar,
} from '../../graphql/cart/cart.variables';

import {
  CartItemsContainer,
  CartDropdownContainer,
  EmptyMessageContainer,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useReactiveVar(cartItemsVar);
  const cartDropdownHidden = useReactiveVar(cartDropdownHiddenVar);

  const toggleCartDropdownHidden = useCallback(() => {
    cartDropdownHiddenVar(!cartDropdownHidden);
  }, [cartDropdownHidden]);

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
  }, [toggleCartDropdownHidden]);

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
