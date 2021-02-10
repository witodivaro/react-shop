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

export const cartUpdateStart = () => ({
  type: CartActionTypes.CART_UPDATE_START,
});

export const cartMergeStart = () => ({
  type: CartActionTypes.CART_MERGE_START,
});

export const cartMergeSuccess = (cartItems) => ({
  type: CartActionTypes.CART_MERGE_SUCCESS,
  payload: cartItems,
});

export const cartUpdateSuccess = () => ({
  type: CartActionTypes.CART_UPDATE_SUCCESS,
});

export const cartFailure = (errorMessage) => ({
  type: CartActionTypes.CART_FAILURE,
  payload: errorMessage,
});
