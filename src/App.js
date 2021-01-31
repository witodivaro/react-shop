import React, { useEffect, useMemo } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
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

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectShopFilter } from './redux/shop/shop.selectors';
import { setShopFilter } from './redux/shop/shop.actions';

const App = ({
  location,
  shopFilter,
  currentUser,
  setCurrentUser,
  setShopFilter,
}) => {
  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth && userAuth.emailVerified) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

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
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setShopFilter: (filter) => dispatch(setShopFilter(filter)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
