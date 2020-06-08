import React, { useEffect } from "react";
import { NextPage } from "next";
import { useLazyQuery } from "@apollo/client";
import { Modal } from "@redq/reuse-modal";
import { withApollo } from "helper/apollo";
import { SEO } from "components/seo";
import Checkout from "containers/Checkout/Checkout";
import { useAuth } from "@bottle-market/common/auth";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";

import { ProfileProvider } from "contexts/profile/profile.provider";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { user } = useAuth();
  const [getUser, { loading, error, data }] = useLazyQuery(
    GET_LOGGED_IN_CUSTOMER
  );

  useEffect(() => {
    if (user) {
      getUser({
        variables: {
          id: user.id,
        },
      });
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  const token = "true";

  return (
    <>
      <SEO title="Checkout - BottleMarket" description="Checkout Details" />
      {data && (
        <ProfileProvider initData={data.me}>
          <Modal>
            <Checkout token={token} deviceType={deviceType} />
          </Modal>
        </ProfileProvider>
      )}
    </>
  );
};

export default withApollo(CheckoutPage);
