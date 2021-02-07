import { gql } from '@apollo/client';

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
