import React from "react";
import { NextPage } from "next";
import { SEO } from "components/seo";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import ProductDetails from "containers/ProductDetails/ProductDetails";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, {
  ProductSingleContainer,
} from "styled/product-single.style";
import CartPopUp from "containers/Cart/CartPopUp";
import { withApollo } from "helper/apollo";
import { GET_PRODUCT_DETAILS } from "graphql/query/product.query";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductPage: NextPage<Props> = ({ deviceType }) => {
  const {
    query: { slug },
  } = useRouter();

  const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { slug },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <SEO
        title={`${data.product.title} - BottleMarket`}
        description={`${data.product.title} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            <ProductDetails product={data.product} deviceType={deviceType} />
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export default withApollo(ProductPage);
