import { CartActionTypes } from "./cart.types";

export const setCartDropdownHidden = (dropdownHidden) => {
  return {
    type: CartActionTypes.SET_DROPDOWN_HIDDEN,
    payload: dropdownHidden,
  };
};

export const addCartItem = (item) => {
  return {
    type: CartActionTypes.ADD_ITEM,
    payload: item,
  };
};

export const removeCartItem = (item) => {
  return {
    type: CartActionTypes.REMOVE_ITEM,
    payload: item,
  };
};
