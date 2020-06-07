import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STORE } from "../../../graphql/query/store.query";
import { useDrawerDispatch } from "../../../context/DrawerContext";
import { Grid, Row, Col } from "../../../components/FlexBox/FlexBox";
import { Header, Heading } from "../../../components/WrapperStyle";
import Button, { KIND, SIZE } from "../../../components/Button/Button";
import DrawerBox from "../../../components/DrawerBox/DrawerBox";
import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import { Tag, VARIANT } from "baseui/tag";

import Fade from "react-reveal/Fade";
import ProductCard from "../ProductCard/ProductCard";
import { Waypoint } from "react-waypoint";
import { CURRENCY, CATEGORIES } from "../../../settings/constants";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../../DrawerItems/DrawerItems.style";

const GET_PRODUCTS = gql`
  query getProducts(
    $storeId: String
    $type: String
    $searchText: String
    $offset: Int
  ) {
    products(
      storeId: $storeId
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

const INCREMENT_PRODUCT_QUANTITY = gql`
  mutation incrementProductQuantity($id: String!) {
    incrementProductQuantity(id: $id) @client
  }
`;

const DECREMENT_PRODUCT_QUANTITY = gql`
  mutation decrementProductQuantity($id: String!) {
    decrementProductQuantity(id: $id) @client
  }
`;

type Props = any;

const AddProduct: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const {
    data: { storeId },
  } = useQuery(GET_STORE);
  const { data, error, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      storeId: storeId,
      searchText: "",
    },
  });
  const { register, handleSubmit, setValue } = useForm();
  const [search, setSearch] = useState("");
  const [addProductToStore] = useMutation(ADD_PRODUCT_TO_STORE);
  const [incrementStoreProduct] = useMutation(INCREMENT_STORE_PRODUCT);
  const [decrementStoreProduct] = useMutation(DECREMENT_STORE_PRODUCT);
  const [incrementProductQuantity] = useMutation(INCREMENT_PRODUCT_QUANTITY);
  const [decrementProductQuantity] = useMutation(DECREMENT_PRODUCT_QUANTITY);

  useEffect(() => {
    const timeOutId = setTimeout(
      () => refetch({ storeId: storeId, searchText: search }),
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
          store_id: storeId,
          product_size_id: id,
          price: price,
        },
      },
    });
    incrementProductQuantity({
      variables: {
        id: id,
      },
    });
  };

  const handleIncrement = (id: string) => {
    incrementStoreProduct({
      variables: {
        productInput: {
          store_id: storeId,
          product_size_id: id,
        },
      },
    });

    incrementProductQuantity({
      variables: {
        id: id,
      },
    });
  };

  const handleDecrement = (id: string) => {
    decrementStoreProduct({
      variables: {
        productInput: {
          store_id: storeId,
          product_size_id: id,
        },
      },
    });

    decrementProductQuantity({
      variables: {
        id: id,
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
