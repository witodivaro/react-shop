import React from "react";
import { connect } from "react-redux";

import { setCartDropdownHidden } from "../../redux/cart-dropdown/cart-dropdown.action";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CardIcon = ({ hidden, setCartDropdownHidden }) => {
  return (
    <div className="cart-icon" onClick={() => setCartDropdownHidden(!hidden)}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{5}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hidden: state.cartDropdown.hidden,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartDropdownHidden: (hidden) => dispatch(setCartDropdownHidden(hidden)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardIcon);
