import React from 'react';
import Image from 'components/Image/Image';
import Button from '../Button/Button';
import { CartIcon } from '../AllSvgIcon';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  SaleTag,
  StarsWrapper,
  DiscountPercent,
} from './ProductCard.style';
import { useCart } from 'contexts/cart/use-cart';
import Rating from 'react-rating';
import StarOn from '../../image/starOn.svg';
import StarOff from '../../image/starOff.svg';
import { FormattedMessage } from 'react-intl';

type ProductCardProps = {
  title: string;
  image: any;
  weight: string;
  currency: string;
  description: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  data: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();

  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />
        {discountInPercent ? (
          <>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </>
        ) : (
          ''
        )}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {discountInPercent ? (
              <p className="price">
                {currency}
                {price}
              </p>
            ) : (
              ''
            )}

            <p className="price">
              {currency}
              {salePrice ? salePrice : price}
            </p>
          </div>
          
          <p className="weight">{weight}</p>
        </div>

        <p className="get-it-now">
          <FormattedMessage
            id="intlGetItNow"
            defaultMessage="Conseguir ahora"
          />
        </p>

        <StarsWrapper>
          <Rating
            emptySymbol={<img src={StarOff} className="icon" />}
            fullSymbol={<img src={StarOn} className="icon" />}
            initialRating={4}
          />
          <p>4.9</p>
        </StarsWrapper>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
