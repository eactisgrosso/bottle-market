import React, { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch, useDrawerState } from "../../context/DrawerContext";
import Uploader from "../../components/Uploader/Uploader";
import Button, { KIND } from "../../components/Button/Button";
import DrawerBox from "../../components/DrawerBox/DrawerBox";
import { Row, Col } from "../../components/FlexBox/FlexBox";
import Input from "../../components/Input/Input";
import { Textarea } from "../../components/Textarea/Textarea";
import Select from "../../components/Select/Select";
import { FormFields, FormLabel } from "../../components/FormFields/FormFields";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";

const GET_CATEGORIES = gql`
  query getCategories($type: String) {
    categories(type: $type) {
      id
      slug
      name
    }
  }
`;

const typeOptions = [
  { value: "vino", name: "Vinos", id: "1" },
  { value: "oporto", name: "Oporto", id: "2" },
  { value: "vermouth", name: "Vermouth", id: "3" },
  { value: "spirits", name: "Spirits", id: "4" },
];

type Props = any;

const AddProduct: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch();
  const contextItem = useDrawerState("data");

  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: contextItem,
  });
  const [type, setType] = useState([{ value: contextItem.type }]);
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState(contextItem.description);

  const { data } = useQuery(GET_CATEGORIES, {
    variables: {
      type: type,
    },
  });

  let options = [];
  if (data) {
    options = data.categories.map((c) => {
      return {
        id: c.id,
        name: c.name,
        value: c.slug,
      };
    });
  }

  React.useEffect(() => {
    register({ name: "type" });
    register({ name: "categories" });
    register({ name: "image" });
    register({ name: "description" });
  }, [register]);

  const handleMultiChange = ({ value }) => {
    setValue("categories", value);
    setTag(value);
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue("description", value);
    setDescription(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue("type", value);
    setType(value);
  };
  const handleUploader = (files) => {
    setValue("image", files[0].path);
  };
  const onSubmit = (data) => {
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
    console.log(data, "newProduct data");
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Actualizar Producto</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "100%" }}
        noValidate
      >
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
              <FieldDetails>Subí las imagenes del producto</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <Uploader
                  onChange={handleUploader}
                  imageURL={contextItem.image}
                />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Completá sus datos e información adicional
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Unidad</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Precio</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="price"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Precio de Venta</FormLabel>
                  <Input type="number" inputRef={register} name="salePrice" />
                </FormFields>

                <FormFields>
                  <FormLabel>Descuento en %</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="discountInPercent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Cantidad</FormLabel>
                  <Input type="number" inputRef={register} name="quantity" />
                </FormFields>

                <FormFields>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
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

                <FormFields>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
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
                    multi
                  />
                </FormFields>
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
            Actualizar
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
