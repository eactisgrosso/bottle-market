import React, { useState, useEffect, useRef } from "react";
import { Wrapper } from "./DeliveryArea.style";
import Radio from "../Radio/Radio";
import Input from "../Input/Input";
import Slider from "../Slider/Slider";
import { FormFields } from "../FormFields/FormFields";
import Suggestions from "./Suggestions";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { usePlaces } from "@bottle-market/common/helpers";

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
  const {
    placeSearch,
    setPlaceSearch,
    suggestions,
    status,
    getGeocode,
    getLatLng,
    clear,
  } = usePlaces();
  const [radius, setRadius] = useState(1);
  const [zoom, setZoom] = useState(14);
  const [position, setPosition] = useState(ARG_POSITION);
  const [search, setSearch] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("1");
  const [toggleSuggestion, setToggleSuggestion] = useState(false);

  let searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const zoomFromRadius = (r) => {
    return 14 - Math.log(r) / Math.log(2);
  };

  useEffect(() => {
    if (isGeolocationEnabled && coords && !address) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      setZoom(zoomFromRadius(radius));
      if (onChange)
        onChange({
          lat: coords.latitude,
          lng: coords.longitude,
          address: search,
          radius: radius,
        });
    }
  }, [isGeolocationEnabled, coords]);

  useEffect(() => {
    if (address) {
      setSearch(address);
      setPlaceSearch(address);
    }
  }, [address]);

  useEffect(() => {
    if (suggestions && suggestions.length == 1 && !toggleSuggestion) {
      handleSelectSuggestion(suggestions[0]);
    }
  }, [suggestions]);

  useEffect(() => {
    if (deliveryOption == "2") {
      setZoom(4);
      if (onChange)
        onChange({
          lat: ARG_POSITION.lat,
          lng: ARG_POSITION.lng,
          address: "",
          radius: 1,
        });
    } else {
      setZoom(zoomFromRadius(radius));
      if (onChange)
        onChange({
          lat: position.lat,
          lng: position.lng,
          address: address,
          radius: radius,
        });
    }
  }, [deliveryOption]);

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

  const handleSearchInput = (text) => {
    setSearch(text);
    setToggleSuggestion(true);
    setPlaceSearch(text);
  };

  const handleClickOutside = (event: any) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setToggleSuggestion(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion.description);
    clear();

    getGeocode({ address: suggestion.description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPosition({
          lat: lat,
          lng: lng,
        });
        onChange({
          lat: lat,
          lng: lng,
          address: suggestion.description,
          radius: radius,
        });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const handleChangeDeliveryOption = (event: any) => {
    setDeliveryOption(event.target.value);
    setToggleSuggestion(false);
  };

  return (
    <Wrapper ref={searchRef}>
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
            value={search || ""}
            placeholder={searchHint}
            onChange={(event) => {
              handleSearchInput(event.target.value);
            }}
          />
        )}
        {toggleSuggestion ? (
          <Suggestions
            suggestions={suggestions}
            setSuggestionValue={(suggestion) =>
              handleSelectSuggestion(suggestion)
            }
          />
        ) : null}
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
