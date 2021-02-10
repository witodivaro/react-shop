import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartActionTypes from "./cart.types.js";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  dropdownHidden: true,
  cartItems: [],
  errorMessage: "",
};

const cartDropdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_DROPDOWN_HIDDEN:
      return {
        ...state,
        dropdownHidden: !state.dropdownHidden,
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case CartActionTypes.CART_MERGE_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        errorMessage: "",
      };

    case CartActionTypes.CART_UPDATE_SUCCESS:
      return {
        ...state,
        errorMessage: "",
      };

    case CartActionTypes.CART_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
};

export default persistReducer(persistConfig, cartDropdownReducer);
