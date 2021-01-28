import React from "react";
import { connect } from "react-redux";

import { setCartDropdownHidden } from "../../redux/cart/cart.action";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = ({ dropdownHidden, setCartDropdownHidden, itemCount }) => {
  return (
    <div
      className="cart-icon"
      onClick={() => setCartDropdownHidden(!dropdownHidden)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdownHidden: state.cart.dropdownHidden,
    itemCount: selectCartItemsCount(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartDropdownHidden: (dropdownHidden) =>
      dispatch(setCartDropdownHidden(dropdownHidden)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
