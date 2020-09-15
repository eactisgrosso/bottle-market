import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const ProductSingleContainer = styled.div`
  margin-top: 17px;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 0px 0px;
  grid-template-areas:
    'lt-carouselAndPrice lt-carouselAndPrice lt-carouselAndPrice lt-carouselAndPrice lt-availableStores lt-availableStores'
    'lt-description lt-description lt-description lt-description lt-availableStores lt-availableStores'
    'lt-relatedProducts lt-relatedProducts lt-relatedProducts lt-relatedProducts lt-availableStores lt-availableStores';

  @media (max-width: 768px) {
    margin-top: -7.5px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, auto);
    gap: 0px 0px;
    grid-template-areas:
      'lt-carouselAndPrice lt-carouselAndPrice lt-carouselAndPrice lt-carouselAndPrice'
      'lt-availableStores lt-availableStores lt-availableStores lt-availableStores'
      'lt-description lt-description lt-description lt-description'
      'lt-relatedProducts lt-relatedProducts lt-relatedProducts lt-relatedProducts';
  }
`;

export const AvailableStoresWrapper = styled.div`
  grid-area: lt-availableStores;
  background: #fff;
  border-left: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
`;

export const AvailableStoresTitle = styled.h2`
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  font-size: ${themeGet('fontSizes.4', '21')}px;
  font-weight: ${themeGet('fontWeights.6', '700')};
  color: ${themeGet('colors.darkBold', '#0D1136')};
  line-height: 1.2;
  > img {
    width: 25px;
    margin-right: 10px;
  }
`;

export const AvailableStore = styled.div`
  padding: 30px;
  border-bottom: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
`;

export const ProductDetailsWrapper = styled.div`
  grid-area: lt-carouselAndPrice;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  border-bottom: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
  box-sizing: border-box;
`;

export const DescriptionWrapper = styled.div`
  grid-area: lt-description;
  padding: 30px;
  background-color: #fff;
  border-bottom: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
  > h2 {
    font-family: 'Poppins', sans-serif;
    font-size: ${themeGet('fontSizes.4', '21')}px;
    font-weight: ${themeGet('fontWeights.6', '700')};
    color: ${themeGet('colors.darkBold', '#0D1136')};
    line-height: 1.2;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      margin-left: 0;
      margin-bottom: 25px;
    }
  }
`;

export const RelatedItemsWrapper = styled.div`
  grid-area: lt-relatedProducts;
  background-color: #fff;
  padding: 30px;
  > h2 {
    font-family: 'Poppins', sans-serif;
    font-size: ${themeGet('fontSizes.4', '21')}px;
    font-weight: ${themeGet('fontWeights.6', '700')};
    color: ${themeGet('colors.darkBold', '#0D1136')};
    line-height: 1.2;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      margin-left: 0;
      margin-bottom: 25px;
    }
  }

  > div > div {
    flex: 0 0 20%;
    max-width: 20%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;

    @media (max-width: 1500px) {
      flex: 0 0 20%;
      max-width: 20%;
    }
    @media (max-width: 1400px) {
      flex: 0 0 25%;
      max-width: 25%;
    }
    @media (max-width: 1060px) {
      flex: 0 0 33.3333333%;
      max-width: 33.3333333%;
    }
    @media (max-width: 1199px) and (min-width: 991px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    @media (max-width: 768px) {
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin-bottom: 15px;
    }
    @media (max-width: 767px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
`;

export const ProductPreview = styled.div`
  width: 30%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    display: block;
    max-width: 100%;
    max-height: 250px;
    height: auto;
    @media (max-width: 767px) {
      max-height: 200px;
    }
  }
  .react-multi-carousel-list {
    padding: 0;
    .react-multi-carousel-dot-list {
      display: none;
    }
  }

  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const StarsWrapper = styled.div`
  padding-top: 10px;
  display: inline-flex;
  place-items: center;

  > span > span > span > img {
    width: 20px;
    margin-right: 2px;

    @media (max-width: 767px) {
      width: 14px;
    }
  }

  > h3 {
    font-family: 'Poppins', sans-serif;
    font-size: ${themeGet('fontSizes.2', '15')}px;
    font-weight: ${themeGet('fontWeights.6', '700')};
    color: ${themeGet('colors.darkBold', '#0D1136')};
    line-height: 1.2;
    margin-left: 8px;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 999;

  @media (max-width: 990px) {
    top: 20px;
    left: 25px;
  }
  .reusecore__button {
    font-family: 'Lato', sans-serif;
    font-size: ${themeGet('fontSizes.1', '13')}px;
    font-weight: ${themeGet('fontWeights.6', '700')};
    color: ${themeGet('colors.darkRegular', '#77798C')};
    height: 30px;
    .btn-icon {
      margin-right: 5px;
    }
    .btn-text {
      padding: 0;
    }
  }
`;

export const ProductInfo = styled.div`
  width: 70%;
  padding: 30px;
   >p
  @media (max-width: 990px) {
    padding: 30px 40px;
  }
  @media (max-width: 767px) {
    display: inline-flex;
    flex-direction: column;
    padding: 30px 30px;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #c5c8cb;
  }
`;

export const SaleTag = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  background-color: #f4c243;
  padding: 0 10px;
  line-height: 24px;
  border-radius: 12px;
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const DiscountPercent = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  line-height: 24px;
  background-color: #fc5c63;
  padding-left: 20px;
  padding-right: 15px;
  position: relative;
  display: inline-block;
  position: absolute;
  bottom: 180px;
  right: -60px;
  -webkit-transform: translate3d(0, 0, 1px);
  transform: translate3d(0, 0, 1px);

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 12px 0;
    border-color: transparent #fc5c63 transparent transparent;
  }

  &:after {
    content: '';
    position: absolute;
    left: -8px;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 12px 8px;
    border-color: transparent transparent #fc5c63 transparent;
  }
`;

export const ProductTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: ${themeGet('fontSizes.5', '30')}px;
  font-weight: ${themeGet('fontWeights.6', '700')};
  color: ${themeGet('colors.darkBold', '#0D1136')};
  line-height: 1.5;
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    word-break: break-word;
    font-family: 'Poppins', sans-serif;
    font-size: ${themeGet('fontSizes.4', '21')}px;
    font-weight: ${themeGet('fontWeights.6', '700')};
    color: ${themeGet('colors.darkBold', '#0D1136')};
    line-height: 1.2;
    text-align: center;
    place-content: center;
  }
`;

export const ProductPriceWrapper = styled.div``;

export const ProductPrice = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: ${themeGet('fontSizes.5', '30')}px;
  font-weight: ${themeGet('fontWeights.8', '900')};
`;

export const SalePrice = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: ${themeGet('fontSizes.5', '30')}px;
  font-weight: ${themeGet('fontWeights.6', '700')};
  color: ${themeGet('colors.yellow', '#FBB979')};
  font-style: italic;
  padding: 0 5px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;

  &:before {
    content: '';
    width: 100%;
    height: 1px;
    display: inline-block;
    background-color: ${themeGet('colors.yellow', '#FBB979')};
    position: absolute;
    top: 50%;
    left: 0;
  }
`;

export const StoreWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  > p {
    &.storeName {
      font-family: 'Poppins', sans-serif;
      font-size: ${themeGet('fontSizes.2', '15')}px;
      font-weight: ${themeGet('fontWeights.8', '900')};
      color: ${themeGet('colors.darkBold', '#0D1136')};
      line-height: 1.5;
      display: flex;
      margin-right: 10px;
      @media (max-width: 767px) {
        word-break: break-word;
      }
    }
    &.quantityProducts {
      font-size: ${themeGet('fontSizes.1', '13')}px;
    }
  }
`;

export const ProductWeightWrapper = styled.div`
  margin-top: 20px;

  > button > span {
    font-family: 'Poppins', sans-serif;
    font-size: ${themeGet('fontSizes.3', '21')}px;
    font-weight: ${themeGet('fontWeights.4', '700')};
    color: ${themeGet('colors.darkBold', '#0D1136')};
    line-height: 1.2;
  }
`;

export const ProductDescription = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: ${themeGet('fontSizes.2', '15')}px;
  font-weight: ${themeGet('fontWeights.3', '400')};
  color: ${themeGet('colors.darkMedium', '#424561')};
  line-height: 2;
  text-align: justify;
`;

export const ProductCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const ProductCartBtn = styled.div`
  .reusecore__button {
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;

    .btn-icon {
      margin-right: 5px;

      svg {
        width: 14px;
        height: auto;
        @media (max-width: 990px) {
          width: 14px;
        }
      }
    }
  }
  .quantity {
    width: 115px;
    height: 38px;
  }
`;

export const ProductMeta = styled.div`
  margin-top: 60px;

  @media (max-width: 767px) {
    margin-top: 40px;
  }
`;

export const MetaSingle = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
`;

export const MetaItem = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: ${themeGet('fontSizes.1', '13')}px;
  font-weight: ${themeGet('fontWeights.6', '700')};
  color: ${themeGet('colors.darkBold', '#0D1136')};
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${themeGet('colors.lightColor', '#f7f7f7')};
  padding: 0 15px;
  border-radius: 6px;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
