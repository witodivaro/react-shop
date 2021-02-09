import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";

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
import { selectCartDropdownHidden } from "../../redux/cart/cart.selectors";

import UserName from "../user-name/user-name.component";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import UserDropdown from "../user-dropdown/user-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const cartDropdownHidden = useSelector(selectCartDropdownHidden);
  const userDropdownHidden = useSelector(selectUserDropdownHidden);

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

export default memo(Header);
