import React, { useState } from "react";
import { styled } from "baseui";
import gql from "graphql-tag";
import { GET_DELIVERY_AREAS } from "../../graphql/query/store.query";
import { useQuery } from "@apollo/client";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../components/FlexBox/FlexBox";
import { Header, Heading } from "../../components/WrapperStyle";
import NoResult from "../../components/NoResult/NoResult";
import Placeholder from "../../components/Placeholder/Placeholder";
import Fade from "react-reveal/Fade";
import DeliveryCard from "../../components/DeliveryCard/DeliveryCard";

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

type Props = any;

const Delivery: React.FC<Props> = (props) => {
  const { data, error, loading } = useQuery(GET_DELIVERY_AREAS);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          {data && data.deliveryAreas && data.deliveryAreas.length > 0 && (
            <Header style={{ marginBottom: 15 }}>
              <Col md={4} xs={12}>
                <Heading>Zonas de Entrega</Heading>
              </Col>
            </Header>
          )}

          <Row>
            {data ? (
              data.deliveryAreas && data.deliveryAreas.length !== 0 ? (
                data.deliveryAreas.map((deliveryArea: any, index: number) => (
                  <Col
                    md={6}
                    lg={4}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: "15px 0" }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <DeliveryCard
                        store={deliveryArea.store}
                        area={deliveryArea.name}
                        address={deliveryArea.address}
                        radius={deliveryArea.radius}
                        monday={deliveryArea.monday}
                        monday_hours_from={deliveryArea.monday_hours_from}
                        monday_hours_to={deliveryArea.monday_hours_to}
                        tuesday={deliveryArea.tuesday}
                        tuesday_hours_from={deliveryArea.tuesday_hours_from}
                        tuesday_hours_to={deliveryArea.tuesday_hours_to}
                        wednesday={deliveryArea.wednesday}
                        wednesday_hours_from={deliveryArea.wednesday_hours_from}
                        wednesday_hours_to={deliveryArea.wednesday_hours_to}
                        thursday={deliveryArea.thursday}
                        thursday_hours_from={deliveryArea.thursday_hours_from}
                        thursday_hours_to={deliveryArea.thursday_hours_to}
                        friday={deliveryArea.friday}
                        friday_hours_from={deliveryArea.friday_hours_from}
                        friday_hours_to={deliveryArea.friday_hours_to}
                        saturday={deliveryArea.saturday}
                        saturday_hours_from={deliveryArea.saturday_hours_from}
                        saturday_hours_to={deliveryArea.saturday_hours_to}
                        sunday={deliveryArea.sunday}
                        sunday_hours_from={deliveryArea.sunday_hours_from}
                        sunday_hours_to={deliveryArea.sunday_hours_to}
                      ></DeliveryCard>
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult text={"Aun no han sido definidas zonas de entrega"} />
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
};

export default Delivery;
