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
