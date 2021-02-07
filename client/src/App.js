import React, { useEffect, useMemo } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import Homepage from './pages/home/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignPage from './pages/sign/sign.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SearchResultPage from './pages/search-result/search-result.component';
import SettingsPage from './pages/settings/settings.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { selectShopFilter } from './redux/shop/shop.selectors';
import { setShopFilter } from './redux/shop/shop.actions';

const App = ({ checkUserSession, shopFilter, currentUser, setShopFilter }) => {
  const location = useLocation();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  useEffect(() => {
    setShopFilter('');
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
