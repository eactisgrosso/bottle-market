import React, { useState, useEffect } from "react";
import { Wrapper } from "./DeliveryArea.style";
import Slider from "components/Slider/Slider";
import { GoogleMap, Marker, Circle, LoadScript } from "@react-google-maps/api";

type Props = {
  isGeolocationEnabled: boolean;
  coords: any;
};

const libraries = ["places"];

const DeliveryArea: React.FC<Props> = ({ isGeolocationEnabled, coords }) => {
  const [radius, setRadius] = useState(1);
  const [zoom, setZoom] = useState(14);
  const [position, setPosition] = useState({
    lat: -34.603722,
    lng: -58.381592,
  });

  useEffect(() => {
    if (isGeolocationEnabled && coords) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    }
  }, [isGeolocationEnabled, coords]);

  useEffect(() => {
    if (radius != null) {
      setZoom(14 - Math.log(radius) / Math.log(2));
    }
  }, [radius]);

  return (
    <Wrapper>
      <LoadScript
        googleMapsApiKey={process.env.MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          zoom={zoom}
          center={position}
          mapContainerStyle={{
            height: "50vh",
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
      </LoadScript>
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
