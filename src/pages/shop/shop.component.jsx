import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import Search from "../../components/search/search.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { updateCollections } from "../../redux/shop/shop.actions";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import { connect } from "react-redux";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const Shop = ({ match, dispatch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore
      .collection("collections")
      .orderBy("title", "asc");

    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        setLoading(true);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

        dispatch(updateCollections(collectionsMap));
        setLoading(false);
      }
    );

    return () => unsubscribeFromSnapshot();
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Search />
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  );
};

export default connect()(Shop);
