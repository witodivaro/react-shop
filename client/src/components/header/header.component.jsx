import React, { useMemo } from 'react';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from './header.styles.jsx';

import { GET_CART_DROPDOWN_HIDDEN } from '../../graphql/cart/cart.queries.js';
import {
  GET_CURRENT_USER,
  GET_USER_DROPDOWN_HIDDEN,
} from '../../graphql/user/user.queries.js';

import UserName from '../user-name/user-name.component';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import UserDropdown from '../user-dropdown/user-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { useQuery } from '@apollo/client';

const Header = () => {
  const {
    data: { cartDropdownHidden },
  } = useQuery(GET_CART_DROPDOWN_HIDDEN);
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);

  const {
    data: { userDropdownHidden },
  } = useQuery(GET_USER_DROPDOWN_HIDDEN);

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

export default Header;
