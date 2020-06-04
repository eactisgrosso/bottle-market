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
        unit
        salePrice
        discountInPercent
      }
      totalCount
      hasMore
    }
  }
`;
const CREATE_PRODUCT = gql`
  mutation createProduct($product: AddProductInput!) {
    createProduct(product: $product) {
      id
      title
      image
      slug
      type
      price
      unit
      description
      salePrice
      discountInPercent
      # per_unit
      quantity
      # creation_date
    }
  }
`;

type Products = any;
type Props = any;

const AddProduct: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const {
    data: { storeId },
  } = useQuery(GET_STORE);
  const { data, error, refetch, fetchMore } = useQuery<Products>(GET_PRODUCTS, {
    variables: {
      storeId: storeId,
      searchText: "",
    },
  });
  const { register, handleSubmit, setValue } = useForm();
  const [search, setSearch] = useState("");

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      const { products } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          products: {
            __typename: products.__typename,
            items: [createProduct, ...products.items],
            hasMore: true,
            totalCount: products.items.length + 1,
          },
        },
      });
    },
  });

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
      updateQuery: (prev, { fetchMoreResult }): Products => {
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

  const onSubmit = (data) => {
    const newProduct = {
      id: uuidv4(),
      name: data.name,
      type: data.type[0].value,
      description: data.description,
      image: data.image && data.image.length !== 0 ? data.image : "",
      price: Number(data.price),
      unit: data.unit,
      salePrice: Number(data.salePrice),
      discountInPercent: Number(data.discountInPercent),
      quantity: Number(data.quantity),
      slug: data.name,
      creation_date: new Date(),
    };
    createProduct({
      variables: { product: newProduct },
    });
    closeDrawer();
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
                  />
                </Fade>
                {index === data.products.items.length - 4 && (
                  <Waypoint onEnter={() => loadMore()} />
                )}
              </Col>
            ))}
        </Row>
        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            Confirmar
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default AddProduct;
