import React, { useEffect, lazy, Suspense, useMemo } from "react";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Search from "../../components/search/search.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectShopFilter } from "../../redux/shop/shop.selectors";

const SearchResultPage = lazy(() =>
  import("../../pages/search-result/search-result.component")
);
const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../../pages/collection/collection.container")
);

const Shop = ({ match }) => {
  const dispatch = useDispatch();
  const shopFilter = useSelector(selectShopFilter);

  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  const renderedContent = useMemo(() => {
    if (shopFilter) {
      return <SearchResultPage />;
    } else {
      return (
        <>
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
        </>
      );
    }
  }, [shopFilter, match.path]);

  return (
    <div className="shop-page">
      <Search />
      <Switch>
        <Suspense>{renderedContent}</Suspense>
      </Switch>
    </div>
  );
};

export default Shop;
