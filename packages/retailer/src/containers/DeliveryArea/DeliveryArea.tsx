import React, { useState, useEffect, useReducer } from "react";
import { Wrapper } from "./DeliveryArea.style";
import Input from "../../components/Input/Input";
import Slider from "../../components/Slider/Slider";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { FormFields } from "../../components/FormFields/FormFields";
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

const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";
async function fetchCoordinates(search, dispatch, cancelToken) {
  if (!search || search.split(",").length < 3) return;
  console.log(`search:${search}`);
  dispatch({ type: "FETCH_START" });
  try {
    const result = await axios(
      `${GOOGLE_API}?address=${encodeURIComponent(search)}&key=${
        process.env.REACT_APP_MAPS_API_KEY
      }&language=es&region=Argentina`,
      {
        cancelToken,
      }
    );
    if (result.data.error_message) {
      console.error(result.data.error_message);
      axios.isCancel(result.data.error_message) ||
        dispatch({ type: "FETCH_FAILURE" });
    }

    if (result.data.results.length > 0)
      dispatch({
        type: "FETCH_SUCCESS",
        payload: result.data.results[0].geometry.location,
      });
    else dispatch({ type: "FETCH_FAILURE" });
  } catch (err) {
    console.error(err);
    axios.isCancel(err) || dispatch({ type: "FETCH_FAILURE" });
  }
}

type Props = {
  isGeolocationEnabled: boolean;
  coords: any;
  searchHint?: string;
  km?: number;
};
const DeliveryArea: React.FC<Props> = ({
  isGeolocationEnabled,
  coords,
  searchHint = "Con el formato: calle y número, ciudad, provincia",
  km,
}) => {
  const [radius, setRadius] = useState(1);
  const [zoom, setZoom] = useState(14);
  const [position, setPosition] = useState({
    lat: -34.603722,
    lng: -58.381592,
  });
  const [search, setSearch] = useState("");
  const [{ location, hasError, isLoading }, dispatch] = useReducer(
    fetchReducer,
    {
      location: null,
      isLoading: true,
      hasError: false,
    }
  );

  useEffect(() => {
    if (isGeolocationEnabled && (coords || location)) {
      setPosition({
        lat: location ? location.lat : coords.latitude,
        lng: location ? location.lng : coords.longitude,
      });
    }
  }, [isGeolocationEnabled, coords, location]);

  useEffect(() => {
    if (radius != null) {
      setZoom(14 - Math.log(radius) / Math.log(2));
    }
  }, [radius]);

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

  return (
    <Wrapper>
      <FormFields>
        <Input
          value={search}
          placeholder={searchHint}
          onChange={(event) => setSearch(event.target.value)}
          clearable
        />
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
      <Slider
        max={100}
        min={1}
        unit={"km"}
        onChange={(value) => {
          setRadius(value);
        }}
      />
    </Wrapper>
  );
};

export default DeliveryArea;
