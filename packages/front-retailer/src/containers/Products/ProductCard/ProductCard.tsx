import React, { useState } from 'react';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  SaleTag,
  DiscountPercent,
  Image,
  ProductTitle,
  ProductWeight,
  ProductMeta,
  ProductPriceWrapper,
  ProductPrice,
  DiscountedPrice,
} from './ProductCard.style';
import Toogle from '../../../components/Toggle/Toggle';

type ProductCardProps = {
  id: string;
  sizeId: string;
  title: string;
  image: any;
  size?: string;
  currency?: string;
  description?: string;
  price: number;
  priceRetail?: number;
  discountInPercent?: number;
  quantity: number;
  onClick?: Function;
  onToggle?: Function;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  sizeId,
  title,
  image,
  size,
  price,
  priceRetail,
  discountInPercent,
  currency,
  quantity,
  onClick,
  onToggle,
}) => {
  return (
    <ProductCardWrapper
      className="product-card"
      style={{
        boxShadow: quantity > 0 ? 'rgb(0, 197, 141) 0px 0px 2px 1px' : '',
      }}
    >
      <ProductImageWrapper onClick={onClick}>
        <Image url={image} className="product-image" />
        {discountInPercent && discountInPercent !== 0 ? (
          <>
            <SaleTag>Sale</SaleTag>
            <DiscountPercent>{discountInPercent}% Off</DiscountPercent>
          </>
        ) : null}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle onClick={onClick}>{title}</ProductTitle>
        <ProductWeight onClick={onClick}>{size} ml</ProductWeight>
        <ProductMeta>
          <ProductPriceWrapper onClick={onClick}>
            <ProductPrice>
              {currency}
              {price > 0 ? price : priceRetail}
            </ProductPrice>

            {discountInPercent && discountInPercent !== 0 ? (
              <DiscountedPrice>
                {currency}
                {price}
              </DiscountedPrice>
            ) : null}
          </ProductPriceWrapper>
          <Toogle
            defaultValue={quantity > 0}
            onChange={(e) => onToggle(e.target.value)}
          />
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
