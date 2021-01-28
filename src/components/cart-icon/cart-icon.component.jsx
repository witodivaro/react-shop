import React from "react";
import { connect } from "react-redux";

import { setCartDropdownHidden } from "../../redux/cart/cart.action";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CardIcon = ({ dropdownHidden, setCartDropdownHidden }) => {
  return (
    <div
      className="cart-icon"
      onClick={() => setCartDropdownHidden(!dropdownHidden)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{5}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdownHidden: state.cart.dropdownHidden,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartDropdownHidden: (dropdownHidden) =>
      dispatch(setCartDropdownHidden(dropdownHidden)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardIcon);
