import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import VerifyEmail from '../../components/verify-email/verify-email.component';

import './sign.styles.scss';

const SignPage = ({ match }) => {
  return (
    <div className="sign">
      <Switch>
        <Route exact path={`${match.path}/signUp`} component={SignUp} />
        <Route exact path={`${match.path}/signIn`} component={SignIn} />
        <Route exact path={`${match.path}/verify`} component={VerifyEmail} />
      </Switch>
    </div>
  );
};

export default SignPage;
