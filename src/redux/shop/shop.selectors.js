import memoize from 'lodash.memoize';

import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = memoize((collectionUrlParam) => {
  return createSelector([selectShopCollections], (collections) => {
    return collections[collectionUrlParam];
  });
});

export const selectItemsByFilter = (filter) =>
  createSelector([selectCollectionsForPreview], (collections) =>
    collections.filter((item) => {
      const filterMatches = filter
        .split()
        .forEach((filterLetter) => item.name.includes(filterLetter));

      return filterMatches.indexOf(false) !== -1;
    })
  );
