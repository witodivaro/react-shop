import shopActionTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null,
  filter: "",
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.SET_FILTER:
      if (state.filter === action.payload) return state;

      return {
        ...state,
        filter: action.payload,
      };

    case shopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
