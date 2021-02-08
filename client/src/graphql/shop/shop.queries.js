import { gql } from "@apollo/client";

export const GET_SHOP_DATA = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const GET_SHOP_FILTER = gql`
  query GetShopFilter {
    shopFilter @client
  }
`;

export const GET_COLLECTION_ITEMS_BY_FILTER = gql`
  query GetCollectionItemsByFilter {
    collectionItemsByFilter @client
  }
`;
