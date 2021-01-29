import memoize from "lodash.memoize";

import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = memoize((collectionUrlParam) => {
  return createSelector([selectShopCollections], (collections) => {
    return collections.find((collection) => {
      return collection.id === COLLECTION_ID_MAP[collectionUrlParam];
    });
  });
});
