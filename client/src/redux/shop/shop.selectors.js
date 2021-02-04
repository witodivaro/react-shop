import memoize from "lodash.memoize";

import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopFilter = createSelector(
  [selectShop],
  (shop) => shop.filter
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) => {
  return createSelector([selectShopCollections], (collections) => {
    return collections ? collections[collectionUrlParam] : null;
  });
});

export const selectItemsByFilter = createSelector(
  [selectCollectionsForPreview, selectShopFilter],
  (collections, filter) => {
    const filteredItems = [];

    collections.forEach((collection) => {
      filteredItems.push(
        ...collection.items.filter((item) => {
          const filterMatches = filter
            .split()
            .map((filterLetter) =>
              item.name.toLowerCase().includes(filterLetter.toLowerCase())
            );

          return filterMatches.indexOf(false) === -1;
        })
      );
    });

    return filteredItems;
  }
);

export const selectIsCollectionsFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
