import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartDropdownHidden = createSelector(
  [selectCart],
  (cart) => cart.dropdownHidden
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulated, cartItem) => accumulated + cartItem.quantity,
      0
    )
);
