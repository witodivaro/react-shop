import React, { lazy, useEffect, useMemo, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { selectShopFilter } from "./redux/shop/shop.selectors";
import { setShopFilter } from "./redux/shop/shop.actions";

import GlobalStyle from "./global.styles";

const Homepage = lazy(() => import("./pages/home/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SearchResultPage = lazy(() =>
  import("./pages/search-result/search-result.component")
);
const SettingsPage = lazy(() => import("./pages/settings/settings.component"));
const SignPage = lazy(() => import("./pages/sign/sign.component"));

const App = ({ checkUserSession, shopFilter, currentUser, setShopFilter }) => {
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

  const renderedContent = useMemo(
    () =>
      shopFilter ? (
        <SearchResultPage />
      ) : (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/sign" render={renderSignPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/settings" render={renderSettingsPage} />
          </Switch>
        </Suspense>
      ),
    [shopFilter, renderSignPage, renderSettingsPage]
  );

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      {renderedContent}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  shopFilter: selectShopFilter,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setShopFilter: (filter) => dispatch(setShopFilter(filter)),
    checkUserSession: () => dispatch(checkUserSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
