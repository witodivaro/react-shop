import shopActionTypes from './shop.types';

import SHOP_DATA from './shop.data';

const INITIAL_STATE = {
  collections: SHOP_DATA,
  filter: '',
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.SET_FILTER:
      if (state.filter === action.payload) return state;

      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
