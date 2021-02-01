import shopActionTypes from "./shop.types";

export const setShopFilter = (filter) => {
  return {
    type: shopActionTypes.SET_FILTER,
    payload: filter,
  };
};

export const updateCollections = (collectionsMap) => ({
  type: shopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
