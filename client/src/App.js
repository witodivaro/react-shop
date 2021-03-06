import React, { lazy, useEffect, useMemo, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import PageNotFound from "./components/page-not-found/page-not-found.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { setShopFilter } from "./redux/shop/shop.actions";

import GlobalStyle from "./global.styles";

const Homepage = lazy(() => import("./pages/home/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SettingsPage = lazy(() => import("./pages/settings/settings.component"));
const SignPage = lazy(() => import("./pages/sign/sign.component"));

const App = ({ checkUserSession, currentUser, setShopFilter }) => {
  const location = useLocation();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  useEffect(() => {
    setShopFilter("");
  }, [location, setShopFilter]);

  const renderSignPage = useMemo(
    () => (props) =>
      currentUser ? <Redirect to="/" /> : <SignPage {...props} />,
    [currentUser]
  );

  const renderSettingsPage = useMemo(
    () => () => (currentUser ? <SettingsPage /> : <Redirect to="/" />),
    [currentUser]
  );

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/sign" render={renderSignPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/settings" render={renderSettingsPage} />
            <Route path="/" component={PageNotFound} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setShopFilter: (filter) => dispatch(setShopFilter(filter)),
    checkUserSession: () => dispatch(checkUserSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
