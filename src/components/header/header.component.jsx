import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = ({ currentUser }) => {
  console.log(currentUser);
  const renderedAuthentication = currentUser ? (
    <React.Fragment>
      <div className="option">{currentUser.displayName?.toUpperCase()}</div>
      <div className="option" onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    </React.Fragment>
  ) : (
    <Link className="option" to="/signIn">
      SIGN IN
    </Link>
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
      </div>
    </div>
  );
};

export default Header;