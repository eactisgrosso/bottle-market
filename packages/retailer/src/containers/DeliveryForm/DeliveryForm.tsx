import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { geolocated } from "react-geolocated";
import { useDrawerDispatch } from "../../context/DrawerContext";
import Button, { KIND } from "../../components/Button/Button";
import DrawerBox from "../../components/DrawerBox/DrawerBox";
import { Row, Col } from "../../components/FlexBox/FlexBox";
import DeliveryArea from "../../components/DeliveryArea/DeliveryArea";
import { FormFields, FormLabel } from "../../components/FormFields/FormFields";
import Select from "../../components/Select/Select";
import Input from "../../components/Input/Input";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";

const GET_STORES = gql`
  query getStores {
    stores {
      id
      name
      street
      city
      state
    }
  }
`;

type Props = any;

const AddDeliveryArea: React.FC<Props> = (props) => {
  const { data, error, loading } = useQuery(GET_STORES);

  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm();
  const [store, setStore] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (data && data.stores.length > 0 && store.length == 0) {
      const initialValue = data.stores.map((s, i) => {
        return {
          id: i,
          name: s.name,
          value: s.id,
        };
      });
      setStore(initialValue);
      const s = data.stores[0];
      setAddress(`${s.street}, ${s.city.toTitleCase()}, ${s.state}`);
    }
  }, [data]);

  const handleStoreChange = ({ value }) => {
    setValue("store", value);
    setStore(value);

    const s = data.stores[value[0].id];
    setAddress(`${s.street}, ${s.city.toTitleCase()}, ${s.state}`);
  };

  const onSubmit = (data) => {
    // const newProduct = {
    //   id: uuidv4(),
    //   name: data.name,
    //   type: data.type[0].value,
    //   description: data.description,
    //   image: data.image && data.image.length !== 0 ? data.image : "",
    //   price: Number(data.price),
    //   unit: data.unit,
    //   salePrice: Number(data.salePrice),
    //   discountInPercent: Number(data.discountInPercent),
    //   quantity: Number(data.quantity),
    //   slug: data.name,
    //   creation_date: new Date(),
    // };
    // console.log(newProduct, "newProduct data");
    // createProduct({
    //   variables: { product: newProduct },
    // });
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Agregar Delivery</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Seleccioná la tienda</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Vinoteca / Tienda de Vinos</FormLabel>
                  <Select
                    options={
                      data
                        ? data.stores.map((s, i) => {
                            return {
                              id: i,
                              name: s.name,
                              value: s.id,
                            };
                          })
                        : []
                    }
                    labelKey="name"
                    valueKey="value"
                    placeholder="Tienda"
                    value={store}
                    searchable={false}
                    onChange={handleStoreChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Definí un nombre para la zona de entrega
              </FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                    },
                  },
                }}
              >
                <FormFields>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>Seleccioná el radio de entrega</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              >
                <DeliveryArea
                  isGeolocationEnabled={props.isGeolocationEnabled}
                  coords={props.coords}
                  address={address}
                />
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            Confirmar
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(AddDeliveryArea);
