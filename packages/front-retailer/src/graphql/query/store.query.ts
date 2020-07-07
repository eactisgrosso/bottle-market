import gql from "graphql-tag";

export const GET_STORES = gql`
  query getStores {
    stores {
      id
      name
      store_type
      street
      state
      city
      delivery_areas
      products
    }
  }
`;
