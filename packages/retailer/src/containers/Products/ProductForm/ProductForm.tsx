import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch } from "../../../context/DrawerContext";
import Button, { KIND } from "../../../components/Button/Button";
import DrawerBox from "../../../components/DrawerBox/DrawerBox";
import { Grid, Row, Col } from "../../../components/FlexBox/FlexBox";
import { Header, Heading } from "../../../components/WrapperStyle";
import Select from "../../../components/Select/Select";
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
    $type: String
    $sortByPrice: String
    $searchText: String
    $offset: Int
  ) {
    products(
      type: $type
      sortByPrice: $sortByPrice
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
type Props = any;

const AddProduct: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { data, error, refetch, fetchMore } = useQuery(GET_PRODUCTS);
  const { register, handleSubmit, setValue } = useForm();
  const [search, setSearch] = useState([]);

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

  function loadMore() {
    fetchMore({
      variables: {
        offset: data.products.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
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
        <DrawerTitle>Agregar Productos</DrawerTitle>
      </DrawerTitleWrapper>

      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <Header>
              <Col md={6} xs={12}>
                <Input
                  value={search}
                  placeholder="Buscá por Etiqueta, Bodega, Región..."
                  clearable
                />
              </Col>
            </Header>
          </Col>
        </Row>
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
                    title={item.title}
                    weight={item.size}
                    image={item.image}
                    currency={CURRENCY}
                    price={item.price}
                    salePrice={item.salePrice}
                    discountInPercent={item.discountInPercent}
                    data={item}
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
