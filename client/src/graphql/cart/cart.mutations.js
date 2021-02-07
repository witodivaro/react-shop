import { cartDropdownHiddenVar, cartItemsVar } from '../cache';
import { addItem, removeItem } from './cart.utils';

export const toggleCartDropdownHidden = () =>
  cartDropdownHiddenVar(!cartDropdownHiddenVar());

export const addItemToCart = (item) => {
  const currentCartItems = cartItemsVar();

  cartItemsVar(addItem(currentCartItems, item));
};

export const removeItemFromCart = (item) => {
  const currentCartItems = cartItemsVar();

  cartItemsVar(removeItem(currentCartItems, item));
};

export const clearItemFromCart = (item) => {
  const currentCartItems = cartItemsVar();
  const newCartItems = currentCartItems.filter(
    (cartItem) => item.id !== cartItem.id
  );

  cartItemsVar(newCartItems);
};
