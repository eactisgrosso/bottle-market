import React, { useState, useCallback, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_STORE,
  GET_CATEGORY_TYPE,
} from "../../../graphql/query/store.query";
import {
  ADD_PRODUCT_TO_STORE,
  CHANGE_LOCAL_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_QUANTITIES,
  updateStoreProducts,
} from "../../../graphql/mutation/store.mutation";
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
  const [quantities, setQuantities] = useState<Map<string, number>>();

  const [addProductToStore] = useMutation(ADD_PRODUCT_TO_STORE, {
    update(cache, { data: { createStore } }) {
      updateStoreProducts(
        cache,
        store_id,
        category_type,
        (items) => [addProductToStore, ...items],
        (length) => length + 1
      );
    },
  });
  const [changeLocalProductQuantity] = useMutation(
    CHANGE_LOCAL_PRODUCT_QUANTITY
  );
  const [changeProductQuantities] = useMutation(CHANGE_PRODUCT_QUANTITIES);

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

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (quantities) {
        changeProductQuantities({
          variables: {
            productInput: {
              store_id: store_id,
              quantities: Array.from(quantities).map((kv) => {
                return {
                  id: kv[0],
                  quantity: kv[1],
                };
              }),
            },
          },
        });
        setQuantities(null);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [quantities]);

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
    changeLocalProductQuantity({
      variables: {
        id: id,
        quantity: 1,
      },
    });
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

  const handleChangeQuantity = (id: string, quantity: number) => {
    const pq = quantities ? new Map(quantities) : new Map<string, number>();
    pq.set(id, quantity);
    setQuantities(pq);

    changeLocalProductQuantity({
      variables: {
        id: id,
        quantity: quantity,
        store_id: store_id,
        category_type: category_type,
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
                    onChangeQuantity={handleChangeQuantity}
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
