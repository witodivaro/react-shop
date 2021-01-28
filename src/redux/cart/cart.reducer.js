import { CartActionTypes } from "./cart.types.js";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  dropdownHidden: true,
  cartItems: [],
};

const cartDropdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.SET_DROPDOWN_HIDDEN:
      if (state.dropdownHidden === action.payload) return state;

      return {
        ...state,
        dropdownHidden: action.payload,
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    // to-do. does nothing rn
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    default:
      return state;
  }
};

export default cartDropdownReducer;
