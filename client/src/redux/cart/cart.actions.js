import CartActionTypes from "./cart.types";

export const toggleCartDropdownHidden = () => {
  return {
    type: CartActionTypes.TOGGLE_DROPDOWN_HIDDEN,
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

export const clearCartItem = (item) => {
  return {
    type: CartActionTypes.CLEAR_ITEM,
    payload: item,
  };
};
