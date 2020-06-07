import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_STORE,
  GET_CATEGORY_TYPE,
  GET_STORE_PRODUCTS,
} from "../../../graphql/query/store.query";
import { useDrawerDispatch } from "../../../context/DrawerContext";
import { Grid, Row, Col } from "../../../components/FlexBox/FlexBox";
import Input from "../../../components/Input/Input";

import Fade from "react-reveal/Fade";
import ProductCard from "../ProductCard/ProductCard";
import { Waypoint } from "react-waypoint";
import { CURRENCY } from "../../../settings/constants";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../../DrawerItems/DrawerItems.style";

const GET_PRODUCTS = gql`
  query getProducts(
    $store_id: String!
    $type: String
    $searchText: String
    $offset: Int
  ) {
    products(
      store_id: $store_id
      type: $type
      searchText: $searchText
      offset: $offset
    ) {
      items {
        id
        title
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

const ADD_PRODUCT_TO_STORE = gql`
  mutation addProductToStore($productInput: AddStoreProduct!) {
    addProductToStore(productInput: $productInput) {
      id
      price
      quantity
    }
  }
`;

const INCREMENT_STORE_PRODUCT = gql`
  mutation incrementStoreProduct($productInput: ChangeStoreProduct!) {
    incrementStoreProduct(productInput: $productInput) {
      id
      quantity
    }
  }
`;

const DECREMENT_STORE_PRODUCT = gql`
  mutation decrementStoreProduct($productInput: ChangeStoreProduct!) {
    decrementStoreProduct(productInput: $productInput) {
      id
      quantity
    }
  }
`;

type Props = any;

const AddProduct: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const {
    data: { store_id },
  } = useQuery(GET_STORE);
  const {
    data: { category_type },
  } = useQuery(GET_CATEGORY_TYPE);
  const { data, error, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      store_id: store_id,
      type: category_type,
      searchText: "",
    },
  });
  const [search, setSearch] = useState("");
  const [addProductToStore] = useMutation(ADD_PRODUCT_TO_STORE, {
    update(cache, { data: { addProductToStore } }) {
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
            items: [addProductToStore, ...storeProducts.items],
            hasMore: true,
            totalCount: storeProducts.items.length + 1,
          },
        },
      });
      cache.modify({
        id: cache.identify({
          __typename: "ProductDTO",
          id: addProductToStore.id,
        }),
        fields: {
          quantity: (value) => value + 1,
        },
      });
    },
  });
  const [incrementStoreProduct] = useMutation(INCREMENT_STORE_PRODUCT, {
    update(cache, { data: { incrementStoreProduct } }) {
      cache.modify({
        id: cache.identify({
          __typename: "ProductDTO",
          id: incrementStoreProduct.id,
        }),
        fields: {
          quantity: (value) => value + 1,
        },
      });
    },
  });
  const [decrementStoreProduct] = useMutation(DECREMENT_STORE_PRODUCT, {
    update(cache, { data: { decrementStoreProduct } }) {
      const { storeProducts } = cache.readQuery({
        query: GET_STORE_PRODUCTS,
        variables: {
          store_id: store_id,
          type: category_type,
        },
      });

      cache.modify({
        id: cache.identify({
          __typename: "ProductDTO",
          id: decrementStoreProduct.id,
        }),
        fields: {
          quantity: (value) => value - 1,
        },
      });

      if (decrementStoreProduct.quantity == 0) {
        cache.writeQuery({
          query: GET_STORE_PRODUCTS,
          variables: {
            store_id: store_id,
            type: category_type,
          },
          data: {
            storeProducts: {
              __typename: storeProducts.__typename,
              items: [
                ...storeProducts.items.filter(
                  (sp) => sp.id !== decrementStoreProduct.id
                ),
              ],
              hasMore: true,
              totalCount: storeProducts.items.length + 1,
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        refetch({
          store_id: store_id,
          type: category_type,
          searchText: search,
        }),
      1000
    );
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);

  function loadMore() {
    fetchMore({
      variables: {
        offset: data.products.items.length,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          products: {
            __typename: prev.products.__typename,
            items: [...prev.products.items, ...fetchMoreResult.products.items],
            totalCount: fetchMoreResult.products.totalCount,
            hasMore: fetchMoreResult.products.hasMore,
          },
        });
      },
    });
  }

  const handleAddProduct = (id: string, price: number) => {
    addProductToStore({
      variables: {
        productInput: {
          store_id: store_id,
          product_size_id: id,
          price: price,
        },
      },
    });
  };

  const handleIncrement = (id: string) => {
    incrementStoreProduct({
      variables: {
        productInput: {
          store_id: store_id,
          product_size_id: id,
        },
      },
    });
  };

  const handleDecrement = (id: string) => {
    decrementStoreProduct({
      variables: {
        productInput: {
          store_id: store_id,
          product_size_id: id,
        },
      },
    });
  };

  return (
    <>
      <DrawerTitleWrapper>
        <Input
          overrides={{
            Input: {
              style: ({ $theme }) => {
                return {
                  color: $theme.colors.textDark,
                  ...$theme.typography.fontBold14,
                  width: "320px",
                };
              },
            },
          }}
          value={search}
          placeholder="Buscá por Etiqueta, Bodega, Región..."
          onChange={(event) => setSearch(event.target.value)}
          clearable
        />
      </DrawerTitleWrapper>

      <Grid fluid={true}>
        <Row>
          {data &&
            data.products &&
            data.products.items.length !== 0 &&
            data.products.items.map((item: any, index: number) => (
              <Col
                md={4}
                lg={3}
                sm={6}
                xs={12}
                key={index}
                style={{ margin: "15px 0" }}
              >
                <Fade bottom duration={800} delay={index * 10}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    size={item.size}
                    image={item.image}
                    currency={CURRENCY}
                    price={item.price}
                    salePrice={item.salePrice}
                    discountInPercent={item.discountInPercent}
                    quantity={item.quantity}
                    onAdd={handleAddProduct}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                </Fade>
                {index === data.products.items.length - 4 && (
                  <Waypoint onEnter={() => loadMore()} />
                )}
              </Col>
            ))}
        </Row>
      </Grid>
    </>
  );
};

export default AddProduct;
