import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { withApollo } from "helper/apollo";
import { geolocated } from "react-geolocated";
import { withPrivatePage } from "containers/helpers/withPrivatePage";
import DeliveryArea from "containers/DeliveryArea/DeliveryArea";
import StoreProducts from "containers/Products/StoreProducts";
import { useAuth } from "@bottle-market/common";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "containers/Store/Store.style";

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
  const { user } = useAuth();
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER, {
    variables: { id: user ? user.id : "" },
  });
  if (!data || loading) {
    return <div>loading...</div>;
  }

  return (
    <Modal>
      <SEO
        title="Tienda de Vinos - BottleMarket"
        description="Tienda de Vinos Details"
      />
      <PageWrapper>
        <ContentBox>
          <StoreProducts
            storeId={data.me.store[0].id}
            deviceType={deviceType}
          />
          {/* <DeliveryArea
          isGeolocationEnabled={isGeolocationEnabled}
          coords={coords}
        /> */}
        </ContentBox>
      </PageWrapper>
    </Modal>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withPrivatePage(withApollo(TiendaPage)));
