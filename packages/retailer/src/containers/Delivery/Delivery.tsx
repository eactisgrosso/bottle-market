import React, { useState } from "react";
import { styled } from "baseui";
import gql from "graphql-tag";
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

const GET_DELIVERY_AREAS = gql`
  query getDeliveryAreas {
    delivery_areas {
      id
      name
      store
      address
      radius
      eta
      monday
      monday_hours_from
      monday_hours_to
      tuesday
      tuesday_hours_from
      tuesday_hours_to
      wednesday
      wednesday_hours_from
      wednesday_hours_to
      thursday
      thursday_hours_from
      thursday_hours_to
      friday
      friday_hours_from
      friday_hours_to
      saturday
      saturday_hours_from
      saturday_hours_to
      sunday
      sunday_hours_from
      sunday_hours_to
    }
  }
`;

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
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Zonas de Entrega</Heading>
            </Col>
          </Header>

          <Row>
            {data ? (
              data.delivery_areas && data.delivery_areas.length !== 0 ? (
                data.delivery_areas.map((delivery_area: any, index: number) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: "15px 0" }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <DeliveryCard
                        store={delivery_area.store}
                        area={delivery_area.name}
                        address={delivery_area.address}
                        radius={delivery_area.radius}
                        eta={delivery_area.eta}
                        monday={delivery_area.monday}
                        monday_hours_from={delivery_area.monday_hours_from}
                        monday_hours_to={delivery_area.monday_hours_to}
                        tuesday={delivery_area.tuesday}
                        tuesday_hours_from={delivery_area.tuesday_hours_from}
                        tuesday_hours_to={delivery_area.tuesday_hours_to}
                        wednesday={delivery_area.wednesday}
                        wednesday_hours_from={
                          delivery_area.wednesday_hours_from
                        }
                        wednesday_hours_to={delivery_area.wednesday_hours_to}
                        thursday={delivery_area.thursday}
                        thursday_hours_from={delivery_area.thursday_hours_from}
                        thursday_hours_to={delivery_area.thursday_hours_to}
                        friday={delivery_area.friday}
                        friday_hours_from={delivery_area.friday_hours_from}
                        friday_hours_to={delivery_area.friday_hours_to}
                        saturday={delivery_area.saturday}
                        saturday_hours_from={delivery_area.saturday_hours_from}
                        saturday_hours_to={delivery_area.saturday_hours_to}
                        sunday={delivery_area.sunday}
                        sunday_hours_from={delivery_area.sunday_hours_from}
                        sunday_hours_to={delivery_area.sunday_hours_to}
                      ></DeliveryCard>
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult />
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
