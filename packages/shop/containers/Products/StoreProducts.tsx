import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import ProductCard from "components/ProductCard/ProductCard";
import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./Products.style";
import { CURRENCY } from "helper/constant";
import { useQuery } from "@apollo/client";
import Placeholder from "components/Placeholder/Placeholder";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

const GET_STORE_PRODUCTS = gql`
  query getStoreProducts($storeId: String!) {
    storeProducts(storeId: $storeId) {
      items {
        id
        title
        slug
        size
        price
        description
        discountInPercent
        image
      }
      hasMore
    }
  }
`;

type StoreProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  storeId: string;
  fetchLimit?: number;
  loadMore?: boolean;
};
export const StoreProducts: React.FC<StoreProductsProps> = ({
  deviceType,
  storeId,
  fetchLimit = 8,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const { data, error, loading, fetchMore } = useQuery(GET_STORE_PRODUCTS, {
    variables: {
      storeId: storeId,
    },
  });

  if (loading) {
    return (
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
      </LoaderWrapper>
    );
  }

  if (error) return <div>{error.message}</div>;
  if (!data || !data.storeProducts || data.storeProducts.items.length === 0) {
    return <NoResultFound />;
  }

  return (
    <>
      <ProductsRow>
        {data.storeProducts.items.map((item: any, index: number) => (
          <ProductsCol key={index}>
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: "100%" }}
              >
                <ProductCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  weight={item.size}
                  currency={CURRENCY}
                  price={item.price}
                  salePrice={item.salePrice}
                  discountInPercent={item.discountInPercent}
                  data={item}
                  deviceType={deviceType}
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
    </>
  );
};
export default StoreProducts;
