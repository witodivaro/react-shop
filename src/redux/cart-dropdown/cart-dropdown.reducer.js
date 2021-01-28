import { CartDropdownActionTypes } from "./cart-dropdown.types.js";

const INITIAL_STATE = {
  hidden: true,
};

const cartDropdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartDropdownActionTypes.setHidden:
      if (state.hidden === action.payload) return state;

      return {
        ...state,

        hidden: action.payload,
      };
    default:
      return state;
  }
};

export default cartDropdownReducer;
