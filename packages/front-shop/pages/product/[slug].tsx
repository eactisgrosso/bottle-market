import React from 'react';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import ProductDetails from 'containers/ProductDetails/ProductDetails';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper from 'styled/product-single.style';
import CartPopUp from 'containers/Cart/CartPopUp';
import { initializeApollo } from 'helper/apollo';
import { GET_PRODUCT_DETAILS } from 'graphql/query/product.query';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {
  return (
    <>
      <SEO
        title={`${data.product.title} - BottleMarket`}
        description={`${data.product.title} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductDetails deviceType={deviceType} product={data.product} />
          <CartPopUp deviceType={deviceType} />
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCT_DETAILS,
    variables: {
      slug: params.slug,
    },
  });
  return {
    props: {
      data,
    },
  };
}
export default ProductPage;
