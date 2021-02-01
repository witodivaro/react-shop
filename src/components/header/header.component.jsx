import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./header.styles.scss";

import {
  selectCurrentUser,
  selectUserDropdownHidden,
} from "../../redux/user/user.selectors";

import UserName from "../user-name/user-name.component";
import Search from "../search/search.component";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import UserDropdown from "../user-dropdown/user-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { selectCartDropdownHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, cartDropdownHidden, userDropdownHidden }) => {
  const renderedAuthentication = useMemo(
    () =>
      currentUser ? (
        <UserName className="option" />
      ) : (
        <Link className="option" to="/sign/signIn">
          SIGN IN
        </Link>
      ),
    [currentUser]
  );

  const renderedCartDropdown = useMemo(
    () => (cartDropdownHidden ? null : <CartDropdown />),
    [cartDropdownHidden]
  );

  const renderedUserDropdown = useMemo(
    () => (userDropdownHidden ? null : <UserDropdown />),
    [userDropdownHidden]
  );

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {renderedAuthentication}
        {renderedUserDropdown}
        <div className="option">
          <CartIcon />
        </div>
      </div>
      {renderedCartDropdown}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartDropdownHidden: selectCartDropdownHidden,
  userDropdownHidden: selectUserDropdownHidden,
});

export default connect(mapStateToProps)(Header);
