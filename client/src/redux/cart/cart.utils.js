import uniqWith from "lodash.uniqwith";

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItemToRemove.id === cartItem.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItemToRemove, quantity: existingCartItem.quantity - 1 }
      : cartItem
  );
};

const cartItemsComparator = (left, right) => left.id === right.id;

export const mergeCarts = (localCart, remoteCart) => {
  const unsortedMergedCart = [...localCart, ...remoteCart];
  const sortedMergedCart = uniqWith(unsortedMergedCart, cartItemsComparator);

  return sortedMergedCart;
};
