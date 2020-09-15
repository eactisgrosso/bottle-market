import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import {
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './CarouselProducts.style';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import { Waypoint } from 'react-waypoint';
import { useRouter } from 'next/router';
import { SearchContext } from '../../contexts/search/search.context';
import { useQuery } from '@apollo/client';
import ProductCard from '../../components/ProductCard/ProductCard';
import gql from 'graphql-tag';
import { CURRENCY } from '../../helper/constant';
import Placeholder from 'components/Placeholder/Placeholder';
import NoResultFound from 'components/NoResult/NoResult';

const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $lat: Float
    $lng: Float
    $text: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    products(
      type: $type
      lat: $lat
      lng: $lng
      text: $text
      category: $category
      offset: $offset
      limit: $limit
    ) {
      items {
        id
        title
        slug
        size
        price
        salePrice
        description
        discountInPercent
        type
        image
        gallery {
          url
        }
        categories {
          id
          title
          slug
        }
      }
      hasMore
    }
  }
`;

type CarouselProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};

const CarouselProducts: React.FC<CarouselProductsProps> = ({
  deviceType,
  type,
  fetchLimit = 8,
  loadMore = true,
}) => {
  const { state, dispatch } = React.useContext(SearchContext);
  const { address, text } = state;

  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const { data, error, loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      type: type,
      lat: address ? address.lat : 0,
      lng: address ? address.lng : 0,
      text: text,
      category: router.query.category,
      offset: 0,
      limit: fetchLimit,
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
  if (!data || !data.products || data.products.items.length === 0) {
    return <NoResultFound />;
  }

  const infiniteScroll = () => {
    toggleLoading(true);
    fetchMore({
      variables: {
        offset: Number(data.products.items.length),
        limit: fetchLimit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          products: {
            __typename: prev.products.__typename,
            items: [...prev.products.items, ...fetchMoreResult.products.items],
            hasMore: fetchMoreResult.products.hasMore,
          },
        };
      },
    });
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      partialVisible
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 4,
          partialVisibilityGutter: 60,
        },
        mobile: {
          breakpoint: {
            max: 768,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 60,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {data.products.items.map((item: any, index: number) => (
        <ProductCardWrapper key={index}>
          <Fade duration={800} delay={index * 10} style={{ height: '100%' }}>
            <Link href="/product/[slug]" as={`/product/${item.slug}`}>
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
            </Link>
          </Fade>
        </ProductCardWrapper>
      ))}
      {loadMore && data.products.hasMore && (
        <Waypoint onEnter={() => infiniteScroll()} />
      )}
    </Carousel>
  );
};

export default CarouselProducts;
