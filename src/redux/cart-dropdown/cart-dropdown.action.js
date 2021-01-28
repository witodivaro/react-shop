import { CartDropdownActionTypes } from "./cart-dropdown.types";

export const setCartDropdownHidden = (hidden) => {
  return {
    type: CartDropdownActionTypes.setHidden,
    payload: hidden,
  };
};
