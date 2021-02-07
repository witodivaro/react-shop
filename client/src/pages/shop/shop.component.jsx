import React from 'react';

import { Route } from 'react-router-dom';

import CollectionPageContainer from '../../pages/collection/collection.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import Search from '../../components/search/search.component';

const Shop = ({ match }) => {
  return (
    <div className="shop-page">
      <Search />
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

export default Shop;
