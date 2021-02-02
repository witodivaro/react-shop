import shopActionTypes from "./shop.types";

export const setShopFilter = (filter) => {
  return {
    type: shopActionTypes.SET_FILTER,
    payload: filter,
  };
};

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
  payload: "",
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchConnectionsFailure = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const doSagaAction = () => ({
  type: "SAGA",
});
