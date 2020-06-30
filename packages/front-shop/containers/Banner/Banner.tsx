import React, { useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { Waypoint } from "react-waypoint";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { usePlaces } from "@bottle-market/common/helpers";
import { useStickyDispatch } from "contexts/app/app.provider";
import { FormattedMessage } from "react-intl";
import {
  BannerWrapper,
  BannerHeading,
  BannerSubHeading,
  BannerComponent,
} from "./Banner.style";

type BannerProps = {
  imageUrl: string;
  intlTitleId: string;
  intlDescriptionId: string;
  intlMenuId: string;
};

const Banner: React.FC<BannerProps> = ({
  imageUrl,
  intlTitleId,
  intlMenuId,
  intlDescriptionId,
}) => {
  const {
    placeSearch,
    setPlaceSearch,
    suggestions,
    getGeocode,
    getLatLng,
    clear,
  } = usePlaces();

  const { state, dispatch } = useContext(SearchContext);
  const { address, text } = state;

  const router = useRouter();
  const { pathname } = router;

  const [search, setSearch] = useState("");

  const handleSearchInput = (text: string) => {
    setSearch(text);
    if (!address) setPlaceSearch(text);
  };

  const handleSuggestionSelected = (suggestion: any) => {
    setSearch(suggestion.description);
    clear();
  };

  const handleClickSearchButton = () => {
    if (!address)
      getGeocode({ address: search })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          dispatch({
            type: "UPDATE ADDRESS",
            payload: {
              ...state,
              address: {
                description: search,
                lat: lat,
                lng: lng,
              },
            },
          });
          setSearch("");
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    else {
      dispatch({
        type: "UPDATE TEXT",
        payload: {
          ...state,
          text: search,
        },
      });
    }

    router.push(
      {
        pathname: pathname,
      },
      {
        pathname: pathname === "/" ? `${pathname}vinos` : pathname,
      },
      { shallow: true }
    );
  };

  const useDispatch = useStickyDispatch();
  const setSticky = useCallback(() => useDispatch({ type: "SET_STICKY" }), [
    useDispatch,
  ]);
  const removeSticky = useCallback(
    () => useDispatch({ type: "REMOVE_STICKY" }),
    [useDispatch]
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };

  return (
    <BannerWrapper
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <BannerComponent>
        <BannerHeading>
          <FormattedMessage
            id={intlTitleId}
            defaultMessage="Set Your Title Through Language File"
            values={{ minute: 90 }}
          />
        </BannerHeading>
        <BannerSubHeading>
          <FormattedMessage
            id={intlDescriptionId}
            defaultMessage="Set Your Description Through Language File"
          />
        </BannerSubHeading>

        <SearchBox
          style={{
            width: 700,
            boxShadow: "0 21px 36px rgba(0,0,0,0.05)",
            borderRadius: "6px",
          }}
          handleSearch={(value: string) => handleSearchInput(value)}
          value={search || ""}
          onSuggestionSelected={handleSuggestionSelected}
          onClick={handleClickSearchButton}
          className="banner-search"
          pathname={pathname}
          intlMenuId={intlMenuId}
          intlPlaceholderId={address ? "searchPlaceholder" : "enterAddress"}
          intlButtonId={address ? "searchButtonText" : "continueBtn"}
          autoSuggestion={!address}
          suggestions={suggestions}
        />
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </BannerComponent>
    </BannerWrapper>
  );
};
export default Banner;
