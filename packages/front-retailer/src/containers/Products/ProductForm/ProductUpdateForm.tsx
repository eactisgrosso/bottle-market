import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, gql } from '@apollo/client';
import Input, { SIZE as SizeInput } from '../../../components/Input/Input';
import Button, { KIND } from '../../../components/Button/Button';
import Toogle from '../../../components/Toggle/Toggle';
import ModalProduct from '../../../components/ModalProduct/ModalProduct';
import { Grid, Cell } from 'baseui/layout-grid';
import {
  Title,
  Description,
  ButtonsWrapper,
  DetailsWrapper,
  CarouselWrapper,
  Subtitle,
  PurchasedPrice,
  TitlePriceWrapper,
  SalePriceWrapper,
  ToogleWrapper,
  ControlsWrapper,
} from './ProductUpdateForm.style';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { number } from 'yup';

/* const GET_PRODUCT_DETAILS = gql`
  query getStoreProduct($id: String!) {
    storeProduct(id: $id) {
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
`; */

type Props = any;

const ProductUpdateForm: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  //console.log(JSON.stringify(product));

  //Price
  const [price, setPrice] = useState('');
  const handlePrice = (e) => {
    if (!isNaN(e.target.value)) {
      setPrice(e.target.value);
      console.log(`price update: ${price}`);
    }
  };

  //Toogle
  const [enabled, setEnabled] = useState(
    product ? product.quantity > 0 : false
  );
  const handleEnabled = (e) => {
    setEnabled(e.target.value);
    console.log(`quantity update: ${enabled}`);
  };

  // const id = product.id;
  // const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
  //   variables: { id },
  // });
  //const [gallery, setGallery] = useState([]);
  //const [description, setDescription] = useState('');

  // useEffect(() => {
  //   if (data && data.storeProduct) {
  //     setGallery(data.storeProduct.gallery);
  //     setDescription(data.storeProduct.description);
  //   }
  // }, [data]);

  // const { register, handleSubmit, setValue } = useForm({
  //   defaultValues: data,
  // });

  // if (loading) return <></>;

  //const onSubmit = (data) => {
  // const newProduct = {
  //   id: uuidv4(),
  //   name: data.name,
  //   type: data.type[0].value,
  //   description: data.description,
  //   image: data.image,
  //   price: Number(data.price),
  //   unit: data.unit,
  //   salePrice: Number(data.salePrice),
  //   discountInPercent: Number(data.discountInPercent),
  //   quantity: Number(data.quantity),
  //   slug: data.name,
  //   creation_date: new Date(),
  // };
  //console.log(data, 'newProduct data');
  // closeDrawer();
  //};

  if (!product) return <></>;

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
            <Carousel showThumbs={true} infiniteLoop={true} showArrows={true}>
              {hardCodeData.map((imagen) => (
                <div>
                  <img
                    style={{
                      maxHeight: '400px',
                      objectFit: 'contain',
                      background: '#ffff',
                    }}
                    src={imagen.url}
                  />
                </div>
              ))}
            </Carousel>
          </CarouselWrapper>
        </Cell>
        <Cell span={[4, 4, 6]}>
          <DetailsWrapper>
            <TitlePriceWrapper>
              <Title>{product.title}</Title>
              <PurchasedPrice>${product.price_retail}</PurchasedPrice>
            </TitlePriceWrapper>

            <Description>{product.description}</Description>

            <ControlsWrapper>
              <SalePriceWrapper>
                <Subtitle>Precio</Subtitle>
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
                <Subtitle>Disponible</Subtitle>
                <Toogle onChange={handleEnabled} />
              </ToogleWrapper>
            </ControlsWrapper>

            <ButtonsWrapper>
              <Button
                onClick={() => {
                  onSave({ enabled, price, product });
                  console.log(
                    `enabled: ${enabled} || price: ${price} || product${product}`
                  );
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

const hardCodeData = [
  {
    key: '1',
    url:
      'data:image/jpeg;base64,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',
  },
  {
    key: '2',
    url:
      'data:image/jpeg;base64,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',
  },
];
