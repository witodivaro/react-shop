import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CategoryPage from "../collection/collection.component";
import Search from "../../components/search/search.component";

const Shop = ({ match }) => {
  return (
    <div className="shop-page">
      <Search />
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CategoryPage}
      />
    </div>
  );
};

export default Shop;
