import React, { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  MobileText,
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
import Search from "../search/search.component";
import MobileMenuButton from "../menu-button/menu-button.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { toggleCartDropdownHidden } from "../../redux/cart/cart.actions.js";

const MOBILE_WIDTH = 800;

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const cartDropdownHidden = useSelector(selectCartDropdownHidden);
  const userDropdownHidden = useSelector(selectUserDropdownHidden);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = window.screen.width < MOBILE_WIDTH;

  const renderedAuthentication = useMemo(() => {
    return currentUser ? (
      <OptionLink as="div">
        <UserName className="option" />
      </OptionLink>
    ) : (
      <OptionLink to="/sign/signIn">SIGN IN</OptionLink>
    );
  }, [currentUser]);

  const renderedCartDropdown = useMemo(
    () => (cartDropdownHidden ? null : <CartDropdown />),
    [cartDropdownHidden]
  );

  const renderedUserDropdown = useMemo(() => {
    return userDropdownHidden ? null : <UserDropdown />;
  }, [userDropdownHidden]);

  const renderedOptions = useMemo(
    () =>
      isMenuOpen || !isMobile ? (
        <OptionsContainer>
          <OptionLink to="/shop">SHOP</OptionLink>
          {renderedAuthentication}
          {renderedUserDropdown}
          <OptionLink as="div">
            <MobileText onClick={() => dispatch(toggleCartDropdownHidden())}>
              Cart
            </MobileText>
            <CartIcon />
          </OptionLink>
        </OptionsContainer>
      ) : null,
    [isMobile, isMenuOpen, renderedAuthentication, renderedUserDropdown]
  );

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      <Route path="/shop" component={Search} />

      <MobileMenuButton open={isMenuOpen} setOpen={setIsMenuOpen} />
      {renderedOptions}
      {renderedCartDropdown}
    </HeaderContainer>
  );
};

export default memo(Header);
