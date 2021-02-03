import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setRedirectToFalse } from "../../redux/user/user.actions";

import "./verify-email.styles.scss";

const VerifyEmail = ({ setRedirectToFalse, match }) => {
  useEffect(() => {
    return () => setRedirectToFalse();
  }, [setRedirectToFalse]);

  const parentPath = match.url.split("/").slice(0, -1).join("/");

  return (
    <div className="verify-email">
      <h2 className="title">📩 Verify your email</h2>
      <p className="text">
        Please, verify your email. Then proceed to sign in page and enter your
        credentials.
      </p>
      <Link className="link" to={`${parentPath}/signIn`}>
        Sign in
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setRedirectToFalse: () => dispatch(setRedirectToFalse()),
});

export default connect(null, mapDispatchToProps)(VerifyEmail);
