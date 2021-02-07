import { InMemoryCache } from '@apollo/client';

import { cartItemsVar, cartDropdownHiddenVar } from './cart/cart.variables';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        cartDropdownHidden: {
          read() {
            return cartDropdownHiddenVar();
          },
        },
      },
    },
  },
});

export default cache;
