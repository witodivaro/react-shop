import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client
  }
`;

export const GET_USER_DROPDOWN_HIDDEN = gql`
  query GetUserDropdownHidden {
    userDropdownHidden @client
  }
`;

export const GET_USER_ERROR_MESSAGE = gql`
  query GetUserErrorMessage {
    userErrorMessage @client
  }
`;
