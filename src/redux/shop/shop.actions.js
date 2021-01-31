import shopActionTypes from './shop.types';

export const setShopFilter = (filter) => {
  return {
    type: shopActionTypes.SET_FILTER,
    payload: filter,
  };
};
