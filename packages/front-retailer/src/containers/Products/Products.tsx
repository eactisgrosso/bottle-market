import React, { useState, useEffect } from "react";
import { styled } from "baseui";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../components/FlexBox/FlexBox";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useApolloClient,
  gql,
} from "@apollo/client";
import {
  GET_STORE,
  GET_CATEGORY_TYPE,
  GET_STORES,
} from "../../graphql/query/store.query";
import { updateStore } from "../../graphql/mutation/store.mutation";
import { Header, Heading } from "../../components/WrapperStyle";
import Fade from "react-reveal/Fade";
import ProductCard from "./ProductCard/ProductCard";
import NoResult from "../../components/NoResult/NoResult";
import { CURRENCY, PRODUCT_TYPES } from "../../settings/constants";
import Placeholder from "../../components/Placeholder/Placeholder";
import { Waypoint } from "react-waypoint";

const GET_STORE_PRODUCTS = gql`
  query storeProducts(
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
        product_size_id
        title
        image
        type
        price
        price_retail
        size
        promo_discount
        quantity
      }
      totalCount
      hasMore
    }
  }
`;

const CHANGE_PRODUCT_AVAILABILITY = gql`
  mutation changeProductAvailability(
    $availabilityInput: ChangeProductAvailability!
  ) {
    changeProductAvailability(availabilityInput: $availabilityInput) {
      id
      store_id
      product_size_id
      price
      quantity
    }
  }
`;

export default function Products() {
  const {
    data: storesData,
    loading: storesLoading,
    error: storesError,
  } = useQuery(GET_STORES);
  const [
    getStoreProducts,
    { data, loading, error, refetch, fetchMore },
  ] = useLazyQuery(GET_STORE_PRODUCTS);
  const [categoryType, setCategoryType] = useState([]);
  const [store, setStore] = useState([]);
  const [search, setSearch] = useState([]);

  const client = useApolloClient();
  const [changeProductAvailability] = useMutation(CHANGE_PRODUCT_AVAILABILITY, {
    update(cache, { data: { changeProductAvailability } }) {
      updateStore(cache, changeProductAvailability.store_id, {
        products: (value) =>
          changeProductAvailability.quantity > 0 ? value + 1 : value - 1,
      });
    },
    onError: (error) => {},
  });

  useEffect(() => {
    if (storesData && storesData.stores.length > 0 && store.length == 0) {
      const initialValue = storesData.stores.map((s, i) => {
        return {
          id: s.id,
          label: s.name,
        };
      });
      handleStoreChange({ value: initialValue });
    }
    if (categoryType.length == 0)
      handleCategoryTypeChange({ value: PRODUCT_TYPES });
  }, [storesData]);

  useEffect(() => {
    handleCategoryTypeChange({ value: PRODUCT_TYPES });
  }, []);

  useEffect(() => {
    if (store.length > 0 && categoryType.length > 0) {
      getStoreProducts({
        variables: {
          store_id: store[0].id,
          type: categoryType[0].id,
        },
      });
    }
  }, [store, categoryType]);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function loadMore() {
    fetchMore({
      variables: {
        offset: data.storeProducts.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          storeProducts: {
            __typename: prev.storeProducts.__typename,
            items: [
              ...prev.storeProducts.items,
              ...fetchMoreResult.storeProducts.items,
            ],
            totalCount: fetchMoreResult.storeProducts.totalCount,
            hasMore: fetchMoreResult.storeProducts.hasMore,
          },
        });
      },
    });
  }

  function handleStoreChange({ value }) {
    setStore(value);
    client.writeQuery({
      query: GET_STORE,
      data: { store_id: value[0].id },
    });
  }

  function handleCategoryTypeChange({ value }) {
    setCategoryType(value);
    client.writeQuery({
      query: GET_CATEGORY_TYPE,
      data: { category_type: value[0].id },
    });
  }

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
    refetch({ searchText: value });
  }

  const handleToggle = (
    id: string,
    sizeId: string,
    price: number,
    enabled: boolean
  ) => {
    setTimeout(() => {
      changeProductAvailability({
        variables: {
          availabilityInput: {
            id: id,
            store_id: store[0].id,
            product_size_id: sizeId,
            price: price,
            quantity: enabled ? 1 : 0,
          },
        },
      });
    }, 500);
  };

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Productos</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    clearable={false}
                    options={
                      storesData
                        ? storesData.stores.map((s, i) => {
                            return {
                              id: s.id,
                              label: s.name,
                            };
                          })
                        : []
                    }
                    value={store}
                    placeholder="Tienda"
                    searchable={false}
                    onChange={handleStoreChange}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Select
                    clearable={false}
                    options={PRODUCT_TYPES}
                    placeholder="Categoría"
                    value={categoryType}
                    searchable={false}
                    onChange={handleCategoryTypeChange}
                  />
                </Col>

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Buscá por Etiqueta, Bodega, Región..."
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Row>
            {storesLoading || loading ? (
              <LoaderWrapper>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
              </LoaderWrapper>
            ) : data &&
              data.storeProducts &&
              data.storeProducts.items.length !== 0 ? (
              data.storeProducts.items.map((item: any, index: number) => (
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
                      sizeId={item.product_size_id}
                      title={item.title}
                      size={item.size}
                      image={item.image}
                      currency={CURRENCY}
                      price={item.price}
                      priceRetail={item.price_retail}
                      discountInPercent={item.promo_discount}
                      quantity={item.quantity}
                      onToggle={handleToggle}
                    />
                  </Fade>
                  {index === data.storeProducts.items.length - 4 && (
                    <Waypoint onEnter={() => loadMore()} />
                  )}
                </Col>
              ))
            ) : (
              <NoResult />
            )}
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}

export const ProductsRow = styled("div", ({ $theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "25px",
  backgroundColor: $theme.colors.backgroundF7,
  position: "relative",
  zIndex: "1",

  "@media only screen and (max-width: 767px)": {
    marginLeft: "-7.5px",
    marginRight: "-7.5px",
    marginTop: "15px",
  },
}));

export const Col = styled(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = styled(Rows, () => ({
  "@media only screen and (min-width: 768px) and (max-width: 991px)": {
    alignItems: "center",
  },
}));

export const ProductCardWrapper = styled("div", () => ({
  height: "100%",
}));

export const LoaderWrapper = styled("div", () => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexWrap: "wrap",
}));

export const LoaderItem = styled("div", () => ({
  width: "25%",
  padding: "0 15px",
  marginBottom: "30px",
}));
