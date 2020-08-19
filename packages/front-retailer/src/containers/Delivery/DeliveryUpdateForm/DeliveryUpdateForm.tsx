import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Scrollbars } from 'react-custom-scrollbars';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import {
  useDrawerDispatch,
  useDrawerState,
} from '../../../context/DrawerContext';
import Button, { KIND } from '../../../components/Button/Button';
import DrawerBox from '../../../components/DrawerBox/DrawerBox';
import { Row, Col } from '../../../components/FlexBox/FlexBox';
import {
  FormFields,
  FormLabel,
} from '../../../components/FormFields/FormFields';
import Select from '../../../components/Select/DrawerSelect';
import Input from '../../../components/Input/Input';
import DeliveryArea from '../../../components/DeliveryArea/DeliveryArea';
import BusinessHours from '../../../components/BusinessHours/BusinessHours';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../../DrawerItems/DrawerItems.style';
import { GET_STORES } from '../../../graphql/query/store.query';
import { GET_DELIVERY_AREAS } from '../../../graphql/query/delivery.query';
import { updateStore } from '../../../graphql/mutation/store.mutation';

const CHANGE_DELIVERY_AREA = gql`
  mutation changeDeliveryArea($changeDeliveryAreaInput: ChangeDeliveryAreaInput!) {
    changeDeliveryArea(changeDeliveryAreaInput: $changeDeliveryAreaInput) {
      id
      store_id
      store
      name
      address
      radius
      monday
      monday_hours_from
      monday_hours_to
      tuesday
      tuesday_hours_from
      tuesday_hours_to
      wednesday
      wednesday_hours_from
      wednesday_hours_to
      thursday
      thursday_hours_from
      thursday_hours_to
      friday
      friday_hours_from
      friday_hours_to
      saturday
      saturday_hours_from
      saturday_hours_to
      sunday
      sunday_hours_from
      sunday_hours_to
    }
  }
`;

type Props = {};

const AddDeliveryArea: React.FC<Props & GeolocatedProps> = (props) => {
  const { data: storesData, error, loading } = useQuery(GET_STORES);

  const dispatch = useDrawerDispatch();

  const dataState = useDrawerState('data');

  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: dataState.name,
    },
  });
  const [store, setStore] = useState([
    { id: dataState.store_id, label: dataState.store },
  ]);
  const [address, setAddress] = useState(dataState.address);
  const [deliveryArea, setDeliveryArea] = useState(null);
  const [businessHours, setBusinessHours] = useState(null);

  const [changeDeliveryArea] = useMutation(CHANGE_DELIVERY_AREA, {
    update(cache, { data: { changeDeliveryArea } }) {
      const { deliveryAreas } = cache.readQuery({
        query: GET_DELIVERY_AREAS,
      });

      cache.writeQuery({
        query: GET_DELIVERY_AREAS,
        data: {
          deliveryAreas: [changeDeliveryArea, ...deliveryAreas],
        },
      });

      updateStore(cache, changeDeliveryArea.store_id, {
        delivery_areas: (value) => value + 1,
      });
    },
  });

  useEffect(() => {
    if (storesData && storesData.stores.length > 0 && store.length == 0) {
      const initialValue = storesData.stores.map((s, i) => {
        return {
          id: s.id,
          label: s.name,
        };
      });
      setStore(initialValue);
      const s = storesData.stores[0];
      setAddress(`${s.street}, ${s.city}, ${s.state}`);
    }
  }, [storesData]);

  const handleStoreChange = ({ value }) => {
    setValue('store', value);
    setStore(value);

    const s = storesData.stores.find((s) => s.id == value[0].id);
    setAddress(`${s.street}, ${s.city}, ${s.state}`);
  };

  const handleDeliveryAreaChange = (value) => {
    console.log(JSON.stringify(value));
    setDeliveryArea(value);
  };

  const handleBusinessHoursChange = (value) => {
    setBusinessHours(value);
  };

  const onSubmit = (data, e) => {
    const newDeliveryArea = {
      store_id: store[0].id,
      store: store[0].label,
      name: data.name,
      address: deliveryArea.address,
      lat: deliveryArea.lat,
      lng: deliveryArea.lng,
      radius: deliveryArea.radius,
      monday: businessHours.monday,
      monday_hours_from: businessHours.mondayFrom,
      monday_hours_to: businessHours.mondayTo,
      tuesday: businessHours.tuesday,
      tuesday_hours_from: businessHours.tuesdayFrom,
      tuesday_hours_to: businessHours.tuesdayTo,
      wednesday: businessHours.wednesday,
      wednesday_hours_from: businessHours.wednesdayFrom,
      wednesday_hours_to: businessHours.wednesdayTo,
      thursday: businessHours.thursday,
      thursday_hours_from: businessHours.thursdayFrom,
      thursday_hours_to: businessHours.thursdayTo,
      friday: businessHours.friday,
      friday_hours_from: businessHours.fridayFrom,
      friday_hours_to: businessHours.fridayTo,
      saturday: businessHours.saturday,
      saturday_hours_from: businessHours.saturdayFrom,
      saturday_hours_to: businessHours.saturdayTo,
      sunday: businessHours.sunday,
      sunday_hours_from: businessHours.sundayFrom,
      sunday_hours_to: businessHours.sundayTo,
      creation_date: new Date(),
    };
    changeDeliveryArea({
      variables: { changeDeliveryAreaInput: newDeliveryArea },
    });
    console.log(newDeliveryArea);
    e.target.reset();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Editar Delivery</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
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
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
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
              <FieldDetails>Seleccioná la tienda</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Vinoteca / Tienda de Vinos</FormLabel>
                  <Select
                    clearable={false}
                    options={
                      storesData
                        ? storesData.stores.map((s, i) => {
                            return {
                              id: s.id,
                              label: s.name,
                            };
                          })
                        : []
                    }
                    placeholder="Tienda"
                    value={store}
                    searchable={false}
                    onChange={handleStoreChange}
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
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <DeliveryArea
                  isGeolocationEnabled={props.isGeolocationEnabled}
                  coords={props.coords}
                  address={address}
                  onChange={handleDeliveryAreaChange}
                  defaultSlider={dataState.radius}
                />
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>Seleccioná la disponibilidad de envío</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'grid',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <BusinessHours
                  dataDelivery={dataState}
                  onChange={handleBusinessHoursChange}
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
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
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
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
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
