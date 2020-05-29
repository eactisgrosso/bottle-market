import React, { useState, useCallback, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { geolocated, GeolocatedProps } from "react-geolocated";
import { useDrawerDispatch } from "../../context/DrawerContext";
import Button, { KIND } from "../../components/Button/Button";
import DrawerBox from "../../components/DrawerBox/DrawerBox";
import { Row, Col } from "../../components/FlexBox/FlexBox";
import {
  FormFields,
  FormLabel,
  Error as ErrorField,
} from "../../components/FormFields/FormFields";
import Select from "../../components/Select/DrawerSelect";
import Searchable from "../../components/Select/Searchable";
import Input from "../../components/Input/Input";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";
import { GET_STORES } from "../../graphql/query/store.query";
import { GET_STATES, GET_CITIES } from "../../graphql/query/location.query";
import axios from "axios";

function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        hasError: false,
        location: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      throw new Error();
  }
}

const GOB_AR_API = `https://apis.datos.gob.ar/georef/api/ubicacion`;
async function fetchAddress(lat, lng, dispatch) {
  dispatch({ type: "FETCH_START" });
  try {
    const result = await axios(`${GOB_AR_API}?lat=${lat}&lon=${lng}`);
    console.log(`result:${JSON.stringify(result)}`);
    if (result.data.ubicacion.provincia.id)
      dispatch({
        type: "FETCH_SUCCESS",
        payload: result.data.ubicacion,
      });
    else dispatch({ type: "FETCH_FAILURE" });
  } catch (err) {
    console.error(err);
    dispatch({ type: "FETCH_FAILURE" });
  }
}

const CREATE_STORE = gql`
  mutation createStore($store: AddStoreInput!) {
    createStore(store: $store) {
      id
      name
      type
      state
      city
      street
    }
  }
`;

const typeOptions = [
  { id: "winestore", label: "Vinoteca" },
  { id: "winebar", label: "Wine Bar" },
  { id: "restaurant", label: "Restaurant" },
  { id: "distributor", label: "Distribuidor" },
];

interface Props {}

const AddStore: React.FC<Props & GeolocatedProps> = (props) => {
  const { data: state_data } = useQuery(GET_STATES);
  const [getCities, { loading, data: cities_data }] = useLazyQuery(GET_CITIES);

  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const [
    { location, hasError, isLoading },
    fetchDispatch = dispatch,
  ] = useReducer(fetchReducer, {
    location: null,
    isLoading: true,
    hasError: false,
  });
  const { register, handleSubmit, setValue, errors } = useForm();

  const [type, setType] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [createStore] = useMutation(CREATE_STORE, {
    update(cache, { data: { createStore } }) {
      const { stores } = cache.readQuery({
        query: GET_STORES,
      });

      cache.writeQuery({
        query: GET_STORES,
        data: {
          stores: [createStore, ...stores],
        },
      });
    },
  });

  useEffect(() => {
    register({ name: "type" }, { required: true });
    register({ name: "state" }, { required: true });
    register({ name: "city" }, { required: true });
    const value = [typeOptions[0]];
    handleTypeChange({ value });
  }, [register]);

  useEffect(() => {
    if (props.isGeolocationEnabled && props.coords) {
      fetchAddress(
        props.coords.latitude,
        props.coords.longitude,
        fetchDispatch
      );
    }
  }, [props]);

  useEffect(() => {
    if (location) {
      const value = [
        {
          id: location.provincia.id,
          label: location.provincia.nombre,
        },
      ];
      handleStateChange({ value });
    }
  }, [location]);

  useEffect(() => {
    if (state && state.length > 0) {
      getCities({
        variables: {
          state_id: state[0].id,
        },
      });
    }
  }, [state]);

  const handleTypeChange = ({ value }) => {
    setValue("type", value);
    setType(value);
  };

  const handleStateChange = ({ value }) => {
    setValue("state", value);
    setState(value);
  };

  const handleCityChange = ({ value }) => {
    setValue("city", value);
    setCity(value);
  };

  const onSubmit = (data) => {
    const newStore = {
      id: uuidv4(),
      name: data.name,
      type: type[0].id,
      state_id: state[0].id,
      state: state[0].label,
      city_id: city[0].id,
      city: city[0].label,
      street: data.street,
      creation_date: new Date(),
    };
    createStore({
      variables: { store: newStore },
    });
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Agregar Tienda</DrawerTitle>
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
              <FieldDetails>Definí un nombre para la tienda</FieldDetails>
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
                    inputRef={register({ required: true, maxLength: 50 })}
                    name="name"
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>Seleccioná el tipo de tienda</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    clearable={false}
                    options={typeOptions}
                    placeholder="Tienda"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>Ingresá la dirección del local</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Provincia</FormLabel>
                  <Select
                    clearable={false}
                    options={
                      state_data
                        ? state_data.states.map((s) => {
                            return {
                              id: s.id,
                              label: s.name,
                            };
                          })
                        : []
                    }
                    placeholder="Provincia"
                    value={state}
                    searchable={false}
                    onChange={handleStateChange}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Localidad</FormLabel>
                  <Searchable
                    clearable={false}
                    options={
                      cities_data && cities_data.cities
                        ? cities_data.cities.map((s) => {
                            return {
                              id: s.id,
                              label: s.name,
                            };
                          })
                        : []
                    }
                    placeholder="Localidad"
                    value={city}
                    onChange={handleCityChange}
                  />
                  {errors.city && (
                    <ErrorField>Seleccioná una Localidad</ErrorField>
                  )}
                </FormFields>
                <FormFields>
                  <FormLabel>Calle y Número</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 250 })}
                    name="street"
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
})(AddStore);
