import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { selectCartDropdownHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, cartDropdownHidden }) => {
  const renderedAuthentication = useMemo(
    () =>
      currentUser ? (
        <React.Fragment>
          <div className="option">{currentUser.displayName.toUpperCase()}</div>
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        </React.Fragment>
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
});

export default connect(mapStateToProps)(Header);
