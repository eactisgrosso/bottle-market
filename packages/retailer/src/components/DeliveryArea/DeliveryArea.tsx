import React, { useState, useEffect, useReducer } from "react";
import { Wrapper } from "./DeliveryArea.style";
import Radio from "../Radio/Radio";
import Input from "../Input/Input";
import Slider from "../Slider/Slider";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { FormFields } from "../FormFields/FormFields";

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

//const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";
const GOB_AR_API = `https://apis.datos.gob.ar/georef/api/direcciones`;
async function fetchCoordinates(search, dispatch, cancelToken) {
  if (!search) return;
  const address = search.split(",");
  if (address.length < 3) return;

  dispatch({ type: "FETCH_START" });
  try {
    const result = await axios(
      `${GOB_AR_API}?provincia=${encodeURIComponent(
        address[2]
      )}&localidad=${encodeURIComponent(
        address[1]
      )}&direccion=${encodeURIComponent(address[0])}`,
      {
        cancelToken,
      }
    );
    console.log(JSON.stringify(result));
    if (result.data.direcciones.length > 0)
      dispatch({
        type: "FETCH_SUCCESS",
        payload: result.data.direcciones[0].ubicacion,
      });
    else dispatch({ type: "FETCH_FAILURE" });
  } catch (err) {
    console.error(err);
    axios.isCancel(err) || dispatch({ type: "FETCH_FAILURE" });
  }
}

const ARG_POSITION = {
  lat: -34.603722,
  lng: -58.381592,
};

type Props = {
  isGeolocationEnabled: boolean;
  coords: any;
  searchHint?: string;
  km?: number;
  address?: string;
  onChange: Function;
};
const DeliveryArea: React.FC<Props> = ({
  isGeolocationEnabled,
  coords,
  searchHint = "Calle y número, ciudad, provincia",
  km,
  address,
  onChange,
}) => {
  const [radius, setRadius] = useState(1);
  const [zoom, setZoom] = useState(14);
  const [position, setPosition] = useState(ARG_POSITION);
  const [search, setSearch] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("1");
  const [{ location, hasError, isLoading }, dispatch] = useReducer(
    fetchReducer,
    {
      location: null,
      isLoading: true,
      hasError: false,
    }
  );

  const zoomFromRadius = (r) => {
    return 14 - Math.log(r) / Math.log(2);
  };

  useEffect(() => {
    if (deliveryOption == "2") {
      setPosition(ARG_POSITION);
      setZoom(4);
      if (onChange)
        onChange({
          lat: ARG_POSITION.lat,
          lng: ARG_POSITION.lng,
          address: "",
          radius: 0,
        });
      return;
    }
    if (location || (!address && isGeolocationEnabled && coords)) {
      const lat = location ? location.lat : coords.latitude;
      const lng = location ? location.lon : coords.longitude;
      setPosition({
        lat: lat,
        lng: lng,
      });
      setZoom(zoomFromRadius(radius));
      if (onChange)
        onChange({
          lat: lat,
          lng: lng,
          address: search,
          radius: radius,
        });
    }
  }, [isGeolocationEnabled, coords, location, deliveryOption]);

  useEffect(() => {
    if (radius != null) {
      setZoom(zoomFromRadius(radius));
      if (onChange)
        onChange({
          lat: position.lat,
          lng: position.lng,
          address: search,
          radius: radius,
        });
    }
  }, [radius]);

  useEffect(() => {
    if (address != null) {
      setSearch(address);
    }
  }, [address]);

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeOutId = setTimeout(
      () => fetchCoordinates(search, dispatch, token),
      1000
    );
    return () => {
      cancel("No longer needed");
      clearTimeout(timeOutId);
    };
  }, [search]);

  const handleChangeDeliveryOption = (event: any) => {
    setDeliveryOption(event.target.value);
  };

  return (
    <Wrapper>
      <FormFields>
        <Radio
          options={[
            { value: "1", name: "Envíos locales" },
            { value: "2", name: "Envíos a todo el país" },
          ]}
          defaultValue="1"
          onChange={handleChangeDeliveryOption}
        ></Radio>
        {deliveryOption == "1" && (
          <Input
            value={search}
            placeholder={searchHint}
            onChange={(event) => setSearch(event.target.value)}
          />
        )}
      </FormFields>
      <GoogleMap
        zoom={zoom}
        center={position}
        mapContainerStyle={{
          minHeight: "50vh",
        }}
      >
        <Marker
          position={position}
          draggable={true}
          onDragEnd={(e) => {
            console.log(`drag end`);
            setPosition({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }}
        >
          <Circle
            center={{
              lat: position.lat,
              lng: position.lng,
            }}
            radius={radius * 1000}
            options={{
              strokeColor: "transparent",
              fillColor: "#009E7F",
            }}
          />
        </Marker>
      </GoogleMap>
      {deliveryOption == "1" && (
        <Slider
          max={100}
          min={1}
          initialValue={radius}
          unit={"km"}
          onChange={(value) => {
            setRadius(value);
          }}
        />
      )}
    </Wrapper>
  );
};

export default DeliveryArea;
