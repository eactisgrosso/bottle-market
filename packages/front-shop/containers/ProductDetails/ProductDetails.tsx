import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Button from 'components/Button/Button';
import {
  DescriptionWrapper,
  AvailableStoresWrapper,
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  BackButton,
  ProductDescription,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  RelatedItemsWrapper,
  ProductSingleContainer,
  ProductWeightWrapper,
} from './ProductDetails.style';
import { LongArrowLeft, CartIcon } from 'components/AllSvgIcon';
import ReadMore from 'components/Truncate/Truncate';
import CarouselWithCustomDots from 'components/MultiCarousel/MultiCarousel';
import Products from 'containers/Products/Products';
import { CURRENCY } from 'helper/constant';
import { Product } from 'interfaces';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/Counter/Counter';
import { AvailableStores } from 'components/AvailableStores/AvailableStores';

type ProductDetailsProps = {
  product: Product | any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem, items } = useCart();
  const data = product;

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <ProductSingleContainer>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.title}</ProductTitle>
          </ProductTitlePriceWrapper>
          
          <ProductWeightWrapper>
            <Button title={product.size} colors="primary" variant="outlined" />
          </ProductWeightWrapper>

          <ProductMeta>
            <MetaSingle>
              {product.categories
                ? product.categories.map((item: any) => (
                    <Link
                      href={`/${product.type.toLowerCase()}?category=${
                        item.slug
                      }`}
                      key={`link-${item.id}`}
                    >
                      {
                        <a>
                          <MetaItem>{item.title}</MetaItem>
                        </a>
                      }
                    </Link>
                  ))
                : ''}
            </MetaSingle>
          </ProductMeta>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                title="Back"
                intlButtonId="backBtn"
                iconPosition="left"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                icon={<LongArrowLeft />}
                onClick={Router.back}
              />
            </BackButton>

            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>

      <DescriptionWrapper>
        <h2>
          <FormattedMessage
            id="intlDescriptionProduct"
            defaultMessage="Related Items"
          />
        </h2>
        <ProductDescription>
          <ReadMore character={600}>{product.description}</ReadMore>
        </ProductDescription>
      </DescriptionWrapper>

      <RelatedItemsWrapper>
        <h2>
          <FormattedMessage
            id="intlReletedItems"
            defaultMessage="Related Items"
          />
        </h2>
        <Products
          type={product.type.toLowerCase()}
          deviceType={deviceType}
          loadMore={false}
          fetchLimit={10}
        />
      </RelatedItemsWrapper>

      <AvailableStoresWrapper></AvailableStoresWrapper>
    </ProductSingleContainer>
  );
};

export default ProductDetails;
