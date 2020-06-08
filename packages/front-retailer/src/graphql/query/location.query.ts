import gql from "graphql-tag";

export const GET_STATES = gql`
  query getStates {
    states {
      id
      name
    }
  }
`;

export const GET_CITIES = gql`
  query getCities($state_id: String!) {
    cities(state_id: $state_id) {
      id
      name
    }
  }
`;
