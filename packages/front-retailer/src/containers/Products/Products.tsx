import React, { useState, useEffect } from "react";
import { styled } from "baseui";
import Button from "../../components/Button/Button";
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
  GET_STORE_PRODUCTS,
} from "../../graphql/query/store.query";
import {
  CHANGE_LOCAL_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_QUANTITIES,
} from "../../graphql/mutation/store.mutation";
import { Header, Heading } from "../../components/WrapperStyle";
import Fade from "react-reveal/Fade";
import ProductCard from "./ProductCard/ProductCard";
import NoResult from "../../components/NoResult/NoResult";
import { CURRENCY, PRODUCT_TYPES } from "../../settings/constants";
import Placeholder from "../../components/Placeholder/Placeholder";

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
  const [loadingMore, toggleLoading] = useState(false);
  const [categoryType, setCategoryType] = useState([]);
  const [store, setStore] = useState([]);
  const [search, setSearch] = useState([]);
  const [quantities, setQuantities] = useState<Map<string, number>>();

  const client = useApolloClient();

  const [changeLocalProductQuantity] = useMutation(
    CHANGE_LOCAL_PRODUCT_QUANTITY
  );
  const [changeProductQuantities] = useMutation(CHANGE_PRODUCT_QUANTITIES);

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

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (quantities) {
        const map = Array.from(quantities).map((kv) => {
          return {
            id: kv[0],
            quantity: kv[1],
          };
        });
        changeProductQuantities({
          variables: {
            productInput: {
              store_id: store[0].id,
              quantities: map,
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

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function loadMore() {
    toggleLoading(true);
    fetchMore({
      variables: {
        offset: data.products.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          products: {
            __typename: prev.products.__typename,
            items: [...prev.products.items, ...fetchMoreResult.products.items],
            hasMore: fetchMoreResult.products.hasMore,
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

  const handleChangeQuantity = (id: string, quantity: number) => {
    const pq = quantities ? new Map(quantities) : new Map<string, number>();
    pq.set(id, quantity);
    setQuantities(pq);

    changeLocalProductQuantity({
      variables: {
        id: id,
        quantity: quantity,
        store_id: store[0].id,
        category_type: categoryType[0].id,
      },
    });
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
                      title={item.title}
                      size={item.size}
                      image={item.image}
                      currency={CURRENCY}
                      price={item.price}
                      priceRetail={item.priceRetail}
                      discountInPercent={item.discountInPercent}
                      quantity={item.quantity}
                      onChangeQuantity={handleChangeQuantity}
                    />
                  </Fade>
                </Col>
              ))
            ) : (
              <NoResult />
            )}
          </Row>
          {data && data.products && data.products.hasMore && (
            <Row>
              <Col
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={loadMore} isLoading={loadingMore}>
                  Ver más
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Grid>
  );
}
