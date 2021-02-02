import React, { useEffect } from "react";

import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionPageContainer from "../../pages/collection/collection.container";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import Search from "../../components/search/search.component";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

const Shop = ({ match, fetchCollectionsStartAsync }) => {
  useEffect(() => {
    fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync]);

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

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(Shop);
