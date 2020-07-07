import React, { useState } from "react";
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
} from "./ProductCard.style";
import Button, { KIND, SIZE, SHAPE } from "../../../components/Button/Button";
import { CartIcon } from "../../../components/AllSvgIcon";
import Toogle from "../../../components/Toggle/Toggle";
import { useDrawerDispatch } from "../../../context/DrawerContext";

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
  onToggle,
}) => {
  return (
    <ProductCardWrapper
      className="product-card"
      // onClick={openDrawer}
    >
      <ProductImageWrapper>
        <Image url={image} className="product-image" />
        {discountInPercent && discountInPercent !== 0 ? (
          <>
            <SaleTag>Sale</SaleTag>
            <DiscountPercent>{discountInPercent}% Off</DiscountPercent>
          </>
        ) : null}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductWeight>{size}</ProductWeight>
        <ProductMeta>
          <ProductPriceWrapper>
            <ProductPrice>
              {currency}
              {priceRetail && priceRetail !== 0 ? priceRetail : price}
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
            onChange={(e) => onToggle(id, sizeId, price, e.target.value)}
          />
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
