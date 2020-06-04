import React from "react";
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
  OrderID,
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
  orderId?: number;
  discountInPercent?: number;
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
  ...props
}) => {
  const handleAddClick = (e) => {
    e.stopPropagation();
    // addItem(data);
    // if (!isInCart(data.id)) {
    // cartAnimation(e);
    // }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    // removeItem(data);
  };

  return (
    <ProductCardWrapper
      {...props}
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
          {true ? (
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
                      border: "1px solid " + $theme.colors.borderF1,
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
              onClick={handleAddClick}
            >
              Agregar
            </Button>
          ) : (
            <Counter
              value={1}
              onDecrement={handleRemoveClick}
              onIncrement={handleAddClick}
            />
          )}
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
