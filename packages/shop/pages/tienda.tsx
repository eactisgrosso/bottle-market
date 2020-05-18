import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import SiteFooter from "components/SiteFooter/SiteFooter";
import { FormattedMessage } from "react-intl";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { withApollo } from "helper/apollo";
import { geolocated } from "react-geolocated";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
import { withPrivatePage } from "containers/helpers/withPrivatePage";
import DeliveryArea from "containers/DeliveryArea/DeliveryArea";

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
`;

const TiendaPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 130px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const TiendaPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  height: 80vh;
  @media (min-width: 990px) {
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  isGeolocationEnabled: boolean;
  coords: any;
};

const TiendaPage: NextPage<Props> = ({
  deviceType,
  isGeolocationEnabled,
  coords,
}) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <Modal>
      <SEO
        title="Tienda de Vinos - BottleMarket"
        description="Tienda de Vinos Details"
      />
      <TiendaPageWrapper>
        <TiendaPageContainer>
          <Heading>Tienda de Vinos</Heading>
          <DeliveryArea
            isGeolocationEnabled={isGeolocationEnabled}
            coords={coords}
          />
        </TiendaPageContainer>
        <SiteFooter style={{ marginTop: 50 }}>
          <FormattedMessage
            id="siteFooter"
            defaultMessage="BottleMarket is a product of"
          />
          &nbsp; <a href="#">BottleHub, SA.</a>
        </SiteFooter>
      </TiendaPageWrapper>
    </Modal>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withPrivatePage(withApollo(TiendaPage)));
