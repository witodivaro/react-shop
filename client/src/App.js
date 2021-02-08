import React, { useEffect, useMemo } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import Homepage from "./pages/home/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignPage from "./pages/sign/sign.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SearchResultPage from "./pages/search-result/search-result.component";
import SettingsPage from "./pages/settings/settings.component";

import { setShopFilter } from "./graphql/shop/shop.mutations";
import { checkCurrentUser } from "./graphql/user/user.mutations";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "./graphql/user/user.queries";
import { GET_SHOP_FILTER } from "./graphql/shop/shop.queries";

const App = () => {
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);
  const {
    data: { shopFilter },
  } = useQuery(GET_SHOP_FILTER);
  const location = useLocation();

  useEffect(() => {
    checkCurrentUser();
  }, []);

  useEffect(() => {
    setShopFilter("");
  }, [location]);

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
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sign" render={renderSignPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/settings" render={renderSettingsPage} />
        </Switch>
      ),
    [shopFilter, renderSignPage, renderSettingsPage]
  );

  return (
    <div className="App">
      <Header />
      {renderedContent}
    </div>
  );
};

export default App;
