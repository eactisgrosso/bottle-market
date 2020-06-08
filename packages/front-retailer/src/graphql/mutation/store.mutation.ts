import gql from "graphql-tag";
import { GET_STORE_PRODUCTS } from "../query/store.query";

export const INCREMENT_STORE_PRODUCT = gql`
  mutation incrementStoreProduct($productInput: ChangeStoreProduct!) {
    incrementStoreProduct(productInput: $productInput) {
      id
      quantity
    }
  }
`;

export const DECREMENT_STORE_PRODUCT = gql`
  mutation decrementStoreProduct($productInput: ChangeStoreProduct!) {
    decrementStoreProduct(productInput: $productInput) {
      id
      quantity
    }
  }
`;

export const updateStore = (cache, store_id, fields) => {
  cache.modify({
    id: cache.identify({
      __typename: "StoreDTO",
      id: store_id,
    }),
    fields: fields,
  });
};

export const updateProduct = (cache, product_id, fields) => {
  cache.modify({
    id: cache.identify({
      __typename: "ProductDTO",
      id: product_id,
    }),
    fields: fields,
  });
};

export const updateStoreProducts = (
  cache,
  store_id,
  category_type,
  update,
  updateCount
) => {
  const { storeProducts } = cache.readQuery({
    query: GET_STORE_PRODUCTS,
    variables: {
      store_id: store_id,
      type: category_type,
    },
  });

  cache.writeQuery({
    query: GET_STORE_PRODUCTS,
    variables: {
      store_id: store_id,
      type: category_type,
    },
    data: {
      storeProducts: {
        __typename: storeProducts.__typename,
        items: update(storeProducts.items),
        hasMore: true,
        totalCount: updateCount(storeProducts.items.length),
      },
    },
  });
};
