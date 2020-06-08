import gql from "graphql-tag";

export const GET_STORE = gql`
  query GetCurrentStore {
    store_id
  }
`;

export const GET_CATEGORY_TYPE = gql`
  query GetCurrentCategoryType {
    category_type
  }
`;

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

export const GET_STORE_PRODUCTS = gql`
  query getStoreProducts(
    $store_id: String!
    $type: String
    $searchText: String
    $offset: Int
  ) {
    storeProducts(
      store_id: $store_id
      type: $type
      searchText: $searchText
      offset: $offset
    ) {
      items {
        id
        title
        description
        image
        type
        price
        size
        salePrice
        discountInPercent
        quantity
      }
      totalCount
      hasMore
    }
  }
`;
