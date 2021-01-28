import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Sign = () => {
  return (
    <Switch>
      <Route exact path="/sign/signIn" component={SignIn} />
      <Route exact path="/sign/signUp" component={SignUp} />
    </Switch>
  );
};

export default Sign;
