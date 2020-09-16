import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Button from 'components/Button/Button';
import {
  StarsWrapper,
  DescriptionWrapper,
  AvailableStoresWrapper,
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
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
  AvailableStoresTitle,
  AvailableStore,
  StoreWrapper,
  BreadcrumbWrapper,
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
import Rating from 'react-rating';
import StarOn from '../../image/starOn.svg';
import StarOff from '../../image/starOff.svg';
import shopIcon from '../../image/shopIcon.png';
import CarouselProducts from '../CarouselProducts/CarouselProducts';
import { background } from 'styled-system';
import { cartAnimation } from '../../helper/cart-animation';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';

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

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(product);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const hardcodeStores = [
    { name: 'Winery', price: '980' },
    { name: 'Tonel Privado', price: '860' },
    { name: 'Picasso Vinoteca', price: '750' },
  ];

  console.log('product', product);

  return (
    <ProductSingleContainer>
     
      <BreadcrumbWrapper>
        <Breadcrumb deviceType={deviceType} categories={product.categories} />
      </BreadcrumbWrapper>

      <ProductDetailsWrapper dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitle>{product.title}</ProductTitle>

          <StarsWrapper>
            <Rating
              emptySymbol={<img src={StarOff} className="icon" />}
              fullSymbol={<img src={StarOn} className="icon" />}
              initialRating={4}
            />
            <h3>4.9</h3>
          </StarsWrapper>

          <ProductWeightWrapper>
            <Button title={product.size} variant={'outlined'} />
          </ProductWeightWrapper>

          {/* <ProductMeta>
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
          </ProductMeta> */}
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

        <CarouselProducts
          type={product.type.toLowerCase()}
          deviceType={deviceType}
          loadMore={false}
          fetchLimit={10}
        />
      </RelatedItemsWrapper>

      <AvailableStoresWrapper>
        <AvailableStoresTitle>
          <img src={shopIcon} />
          <FormattedMessage
            id="intlAvailableStores"
            defaultMessage="Tiendas Disponibles"
          />
        </AvailableStoresTitle>
        {hardcodeStores.map((store: any) => (
          <AvailableStore>
            <ProductPriceWrapper>
              {product.discountInPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {store.price}
                </SalePrice>
              ) : (
                ''
              )}

              <ProductPrice>
                {CURRENCY}
                {product.salePrice ? product.salePrice : store.price}
              </ProductPrice>
            </ProductPriceWrapper>

            <StoreWrapper>
              <p className="storeName">{store.name}</p>
              <p className="quantityProducts">| 4k de productos</p>
            </StoreWrapper>

            <ProductCartWrapper>
              <ProductCartBtn>
                {!isInCart(product.id) ? (
                  <Button
                    title="Add to Cart"
                    intlButtonId="addToCartButton"
                    iconPosition="left"
                    className="cart-button"
                    size="small"
                    icon={<CartIcon />}
                    onClick={handleAddClick}
                  />
                ) : (
                  <Counter
                    value={getItem(product.id).quantity}
                    onDecrement={handleRemoveClick}
                    onIncrement={handleAddClick}
                  />
                )}
              </ProductCartBtn>
            </ProductCartWrapper>
          </AvailableStore>
        ))}
      </AvailableStoresWrapper>
    </ProductSingleContainer>
  );
};

export default ProductDetails;
