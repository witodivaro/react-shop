import React, { useMemo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles.jsx";

import {
  selectCurrentUser,
  selectUserDropdownHidden,
} from "../../redux/user/user.selectors";

import UserName from "../user-name/user-name.component";
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
        <OptionLink to="/sign/signIn">SIGN IN</OptionLink>
      ),
    [currentUser]
  );

  const renderedCartDropdown = useMemo(
    () => (cartDropdownHidden ? null : <CartDropdown />),
    [cartDropdownHidden]
  );

  const renderedUserDropdown = useMemo(() => {
    return userDropdownHidden ? null : <UserDropdown />;
  }, [userDropdownHidden]);

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        {renderedAuthentication}
        {renderedUserDropdown}
        <OptionLink as="div">
          <CartIcon />
        </OptionLink>
      </OptionsContainer>

      {renderedCartDropdown}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartDropdownHidden: selectCartDropdownHidden,
  userDropdownHidden: selectUserDropdownHidden,
});

export default connect(mapStateToProps)(Header);
