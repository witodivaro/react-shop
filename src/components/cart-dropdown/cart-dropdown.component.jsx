import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartDropdownHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, toggleCartDropdownHidden, history }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (dropdownRef.current.contains(e.target)) {
        return;
      }
      e.stopPropagation();
      toggleCartDropdownHidden();
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, [toggleCartDropdownHidden]);

  const renderedItems = cartItems.length ? (
    cartItems.map((cartItem) => {
      return <CartItem key={cartItem.id} item={cartItem} />;
    })
  ) : (
    <span className="empty-message">Your cart is empty</span>
  );

  const handleCheckoutClick = () => {
    history.push("/checkout");
    toggleCartDropdownHidden();
  };

  return (
    <div className="cart-dropdown" ref={dropdownRef}>
      <div className="cart-items">{renderedItems}</div>
      <CustomButton onClick={handleCheckoutClick}>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartDropdownHidden: () => dispatch(toggleCartDropdownHidden()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
