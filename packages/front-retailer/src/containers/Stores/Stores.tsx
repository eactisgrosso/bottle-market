import React from "react";
import { styled } from "baseui";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../components/FlexBox/FlexBox";
import { STORE_TYPES } from "../../settings/constants";
import { GET_STORES } from "../../graphql/query/store.query";
import { useQuery } from "@apollo/client";
import { Header, Heading } from "../../components/WrapperStyle";
import Fade from "react-reveal/Fade";
import NoResult from "../../components/NoResult/NoResult";
import Placeholder from "../../components/Placeholder/Placeholder";
import StoreCard from "./StoreCard/StoreCard";

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

export default function Stores() {
  const { data, error, loading } = useQuery(GET_STORES);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Tiendas</Heading>
            </Col>
          </Header>

          <Row>
            {data ? (
              data.stores && data.stores.length !== 0 ? (
                data.stores.map((store: any, index: number) => (
                  <Col
                    md={6}
                    lg={4}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: "15px 0" }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <StoreCard
                        id={store.id}
                        store_type={STORE_TYPES[store.store_type]}
                        name={store.name}
                        street={store.street}
                        city={store.city}
                        state={store.state}
                        delivery_areas={store.delivery_areas}
                        products={store.products}
                      ></StoreCard>
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult text={"Agregá una tienda y empezá a vender ya!"} />
              )
            ) : (
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
            )}
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}
