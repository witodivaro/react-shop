import React, { useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartDropdownHidden } from "../../redux/cart/cart.actions";

import {
  CartItemsContainer,
  CartDropdownContainer,
  EmptyMessageContainer,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (dropdownRef.current.contains(e.target)) {
        return;
      }
      e.stopPropagation();
      dispatch(toggleCartDropdownHidden());
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, [dispatch]);

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
    history.push("/checkout");
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
