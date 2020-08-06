import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Input, { SIZE as SizeInput } from '../../../components/Input/Input';
import Button, { KIND } from '../../../components/Button/Button';
import Toogle from '../../../components/Toggle/Toggle';
import ModalProduct from '../../../components/ModalProduct/ModalProduct';

import { useStyletron, styled } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import {
  Title,
  Description,
  ButtonsWrapper,
  DetailsWrapper,
  CarouselWrapper,
  PurchasedPrice,
  TitlePriceWrapper,
  SalePriceWrapper,
  ToogleWrapper,
  ControlsWrapper,
  SubtitlePrice,
  SubtitleToogle,
} from './ProductUpdateForm.style';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContentLoader from 'react-content-loader';

const GET_PRODUCT_DETAILS = gql`
  query getStoreProduct($id: String!, $product_size_id: String!) {
    storeProduct(id: $id, product_size_id: $product_size_id) {
      id
      title
      gallery {
        url
      }
      description
      price
      price_retail
      quantity
    }
  }
`;

type Props = any;

const ProductUpdateForm: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [css, theme] = useStyletron();
  const image = css({
    maxHeight: '400px',
    objectFit: 'contain',
    background: '#ffff',
  });

  const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      id: product.id,
      product_size_id: product.product_size_id,
    },
  });

  //Price
  const [price, setPrice] = useState(0);
  const handlePrice = (e) => {
    if (!isNaN(e.target.value)) {
      setPrice(+e.target.value);
    }
  };

  //Toogle
  const [enabled, setEnabled] = useState(false);
  const handleEnabled = (e) => {
    setEnabled(e.target.value);
  };

  useEffect(() => {
    setPrice(product.price > 0 ? product.price : product.price_retail);
    setEnabled(product.quantity > 0);
  }, [product]);

  return (
    <ModalProduct isOpen={isOpen} onClose={onClose}>
      <Grid
        overrides={{
          Grid: {
            style: {
              padding: '30px 0px',

              '@media only screen and (max-width: 767px)': {
                paddingBottom: '0px',
              },
            },
          },
        }}
      >
        <Cell span={[4, 4, 6]}>
          <CarouselWrapper>
            <Carousel>
              {!loading ? (
                data &&
                data.storeProduct.gallery.map((imagen) => (
                  <div key={data.storeProduct.id}>
                    <img className={image} src={imagen.url} />
                  </div>
                ))
              ) : (
                <div>
                  <img className={image} src={product.image} />
                </div>
              )}
            </Carousel>
          </CarouselWrapper>
        </Cell>
        <Cell span={[4, 4, 6]}>
          <DetailsWrapper>
            <TitlePriceWrapper>
              <Title>{product.title}</Title>
              <PurchasedPrice>${product.price_retail}</PurchasedPrice>
            </TitlePriceWrapper>

            {loading && <LoadingDescription />}
            {!loading && data && (
              <Description>{data.storeProduct.description}</Description>
            )}

            <ControlsWrapper>
              <SalePriceWrapper>
                <SubtitlePrice>Precio</SubtitlePrice>
                <Input
                  autoFocus
                  size={SizeInput.compact}
                  overrides={{
                    InputContainer: {
                      style: ({ $theme }) => {
                        return {
                          maxWidth: '80px',
                        };
                      },
                    },
                  }}
                  startEnhancer="$"
                  placeholder="Precio"
                  value={price}
                  onChange={handlePrice}
                />
              </SalePriceWrapper>

              <ToogleWrapper>
                <SubtitleToogle>Disponible</SubtitleToogle>
                <Toogle defaultValue={enabled} onChange={handleEnabled} />
              </ToogleWrapper>
            </ControlsWrapper>

            <ButtonsWrapper>
              <Button
                onClick={() => {
                  onSave({
                    id: product.id,
                    product_size_id: product.product_size_id,
                    quantity: enabled ? 1 : 0,
                    price,
                  });
                }}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => {
                      return {
                        margin: '18px',
                      };
                    },
                  },
                }}
              >
                Aceptar
              </Button>
              <Button
                onClick={onClose}
                kind={KIND.secondary}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => {
                      return {
                        margin: '18px',
                      };
                    },
                  },
                }}
              >
                Cancelar
              </Button>
            </ButtonsWrapper>
          </DetailsWrapper>
        </Cell>
      </Grid>
    </ModalProduct>
  );
};

export default ProductUpdateForm;

const LoadingDescription: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ContentLoader
        style={{ width: '100%', height: '80%' }}
        width={'100%'}
        speed={1}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="2" y="0" rx="0" ry="0" width="100%" height="14" />
        <rect x="2" y="26" rx="0" ry="0" width="100%" height="14" />
        <rect x="2" y="52" rx="0" ry="0" width="100%" height="14" />
        <rect x="2" y="78" rx="0" ry="0" width="20%" height="14" />
      </ContentLoader>
    </div>
  );
};
