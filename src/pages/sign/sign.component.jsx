import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import VerifyEmail from "../../components/verify-email/verify-email.component";
import { selectRedirectToVerify } from "../../redux/user/user.selectors";

import "./sign.styles.scss";

const SignPage = ({ redirectToVerify, match }) => {
  const renderSignUp = useCallback(
    (props) =>
      redirectToVerify ? <VerifyEmail {...props} /> : <SignUp {...props} />,
    [redirectToVerify]
  );

  return (
    <div className="sign">
      <Switch>
        <Route exact path={`${match.path}/signUp`} render={renderSignUp} />
        <Route exact path={`${match.path}/signIn`} component={SignIn} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  redirectToVerify: selectRedirectToVerify,
});

export default connect(mapStateToProps)(SignPage);
