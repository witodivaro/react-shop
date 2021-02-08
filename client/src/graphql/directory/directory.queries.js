import { gql } from "@apollo/client";

export const GET_DIRECTORIES_DATA = gql`
  query GetDirectoriesData {
    directories @client
  }
`;
