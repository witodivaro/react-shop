import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Sign = ({ match }) => {
  console.log(match);
  return (
    <Switch>
      <Route exact path={`${match.path}/signIn`} component={SignIn} />
      <Route exact path={`${match.path}/signUp`} component={SignUp} />
    </Switch>
  );
};

export default Sign;
