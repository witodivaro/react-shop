import { gql } from '@apollo/client';

export const GET_CART_DROPDOWN_HIDDEN = gql`
  query GetCartDropdownHidden {
    cartDropdownHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const GET_CART_ITEMS_PRICE = gql`
  query GetCartItemsPrice {
    cartItemsPrice @client
  }
`;

export const GET_CART_ITEMS_COUNT = gql`
  query GetCartItemsCount {
    cartItemsCount @client
  }
`;
