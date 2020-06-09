import gql from "graphql-tag";
import { GET_STORE_PRODUCTS } from "../query/store.query";

export const CHANGE_PRODUCT_QUANTITIES = gql`
  mutation changeProductQuanties($productInput: ChangeProductQuantities!) {
    changeProductQuantities(productInput: $productInput)
  }
`;

export const ADD_PRODUCT_TO_STORE = gql`
  mutation addProductToStore($productInput: AddStoreProduct!) {
    addProductToStore(productInput: $productInput) {
      id
      quantity
      price
    }
  }
`;

export const CHANGE_LOCAL_PRODUCT_QUANTITY = gql`
  mutation changeLocalProductQuantity(
    $id: String!
    $quantity: Number!
    $store_id: String!
    $category_type: String!
  ) {
    changeLocalProductQuantity(
      id: $id
      quantity: $quantity
      store_id: $store_id
      category_type: $category_type
    ) @client
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

export const updateStoreProduct = (cache, product_size_id, fields) => {
  cache.modify({
    id: cache.identify({
      __typename: "StoreProductDTO",
      id: product_size_id,
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
