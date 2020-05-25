import gql from "graphql-tag";

export const GET_LOGGED_IN_USER = gql`
  query getUser($id: String!) {
    me(id: $id) {
      id
      name
      email
      store {
        id
        name
      }
    }
  }
`;
