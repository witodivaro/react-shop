import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import { toggleCartDropdownHidden } from "../../redux/cart/cart.actions";
import {
  signOutStart,
  toggleUserDropdownHidden,
} from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./user-dropdown.styles.scss";

const UserDropdown = ({
  toggleUserDropdownHidden,
  toggleCartDropdownHidden,
  signOutStart,
  currentUser,
}) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (dropdownRef.current.contains(e.target)) {
        return;
      }

      e.stopPropagation();

      toggleUserDropdownHidden();
    };

    document.body.addEventListener("click", handleBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", handleBodyClick, {
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
  toggleUserDropdownHidden: () => dispatch(toggleUserDropdownHidden()),
  toggleCartDropdownHidden: () => dispatch(toggleCartDropdownHidden()),
  signOutStart: () => dispatch(signOutStart()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
