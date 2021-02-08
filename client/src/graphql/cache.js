import { InMemoryCache, makeVar } from "@apollo/client";

export const cartItemsVar = makeVar([]);
export const cartDropdownHiddenVar = makeVar(true);

export const currentUserVar = makeVar(null);
export const userDropdownHiddenVar = makeVar(true);
export const userErrorMessageVar = makeVar("");

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems() {
          return cartItemsVar();
        },
        cartItemsPrice(price, { readField }) {
          const cartItems = readField("cartItems");
          const itemsPrice = cartItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          );
          return itemsPrice;
        },
        cartItemsCount(count, { readField }) {
          const cartItems = readField("cartItems");
          return cartItems.reduce((total, item) => total + item.quantity, 0);
        },
        cartDropdownHidden() {
          return cartDropdownHiddenVar();
        },
        userDropdownHidden() {
          return userDropdownHiddenVar();
        },
        currentUser() {
          return currentUserVar();
        },
        userErrorMessage() {
          return userErrorMessageVar();
        },
      },
    },
  },
});

export default cache;
