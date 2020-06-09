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
import { Counter } from "../../../components/Counter/Counter";
import { useDrawerDispatch } from "../../../context/DrawerContext";

type ProductCardProps = {
  id: string;
  title: string;
  image: any;
  size?: string;
  currency?: string;
  description?: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  quantity: number;
  onAdd?: Function;
  onChangeQuantity: Function;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  size,
  price,
  salePrice,
  discountInPercent,
  currency,
  quantity,
  onAdd,
  onChangeQuantity,
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
              {salePrice && salePrice !== 0 ? salePrice : price}
            </ProductPrice>

            {discountInPercent && discountInPercent !== 0 ? (
              <DiscountedPrice>
                {currency}
                {price}
              </DiscountedPrice>
            ) : null}
          </ProductPriceWrapper>
          {quantity == 0 ? (
            <Button
              overrides={{
                StartEnhancer: {
                  style: {
                    marginRight: "8px",
                  },
                },
                BaseButton: {
                  style: ({ $theme }) => {
                    return {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineHeight: 1.5,
                      color: $theme.colors.primary,
                      backgroundColor: "transparent",
                      borderColor: $theme.colors.backgroundF7,
                      borderBottomStyle: "solid",
                      borderTopStyle: "solid",
                      borderLeftStyle: "solid",
                      borderRightStyle: "solid",
                      borderBottomWidth: 0.5,
                      borderTopWidth: 0.5,
                      borderLeftWidth: 0.5,
                      borderRightWidth: 0.5,
                      width: "100px",
                      ":hover": {
                        color: "white",
                      },
                    };
                  },
                },
              }}
              startEnhancer={() => <CartIcon height={24} />}
              shape={SHAPE.pill}
              size={SIZE.mini}
              onClick={() => onAdd(id, price)}
            >
              Agregar
            </Button>
          ) : (
            <Counter
              value={quantity}
              onDecrement={(e) =>
                onChangeQuantity(id, quantity > 0 ? quantity - 1 : 0)
              }
              onIncrement={(e) => onChangeQuantity(id, quantity + 1)}
            />
          )}
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
