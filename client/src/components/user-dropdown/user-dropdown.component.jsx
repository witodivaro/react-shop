import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleCartDropdownHidden } from '../../graphql/cart/cart.mutations';
import { toggleUserDropdownHidden } from '../../graphql/user/user.mutations';
import { signOutStart } from '../../redux/user/user.actions';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/user/user.queries';

import './user-dropdown.styles.scss';

const UserDropdown = ({ signOutStart }) => {
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (dropdownRef.current.contains(e.target)) {
        return;
      }

      e.stopPropagation();

      toggleUserDropdownHidden();
    };

    document.body.addEventListener('click', handleBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', handleBodyClick, {
        capture: true,
      });
    };
  }, [toggleUserDropdownHidden]);

  const handleCartClick = () => {
    toggleUserDropdownHidden();
    toggleCartDropdownHidden();
  };

  const handleSignOutClick = () => {
    toggleUserDropdownHidden();
    signOutStart();
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <span className="name">{currentUser.displayName}</span>
      <div className="user-options">
        <Link to="/settings" onClick={() => toggleUserDropdownHidden()}>
          ⚙️ Settings
        </Link>
        <span className="user-cart" onClick={handleCartClick}>
          🛒 Cart
        </span>
        <span className="signout" onClick={handleSignOutClick}>
          Sign out
        </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(UserDropdown);
