import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { toggleCartDropdownHidden } from "../../graphql/cart/cart.mutations";
import {
  signOut,
  toggleUserDropdownHidden,
} from "../../graphql/user/user.mutations";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql/user/user.queries";

import "./user-dropdown.styles.scss";

const UserDropdown = () => {
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

    document.body.addEventListener("click", handleBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", handleBodyClick, {
        capture: true,
      });
    };
  }, []);

  const handleCartClick = () => {
    toggleUserDropdownHidden();
    toggleCartDropdownHidden();
  };

  const handleSignOutClick = () => {
    toggleUserDropdownHidden();
    signOut();
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

export default UserDropdown;
