import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleUserDropdownHidden } from '../../redux/user/user.actions';
import {
  selectCurrentUser,
  selectUserDropdownHidden,
} from '../../redux/user/user.selectors';
import { toggleCartDropdownHidden } from '../../redux/cart/cart.actions';

import './user-name.styles.scss';

const UserName = ({
  className,
  currentUser,
  userDropdownHidden,
  toggleUserDropdownHidden,
  toggleCartDropdownHidden,
}) => {
  return (
    <div
      className={`user-name ${className}`}
      onClick={() => toggleUserDropdownHidden()}
    >
      {currentUser.displayName.toUpperCase()}
      <span className={`dropdown-arrow ${userDropdownHidden ? '' : 'active'}`}>
        ❮
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userDropdownHidden: selectUserDropdownHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUserDropdownHidden: () => dispatch(toggleUserDropdownHidden()),
  toggleCartDropdownHidden: () => dispatch(toggleCartDropdownHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserName);
