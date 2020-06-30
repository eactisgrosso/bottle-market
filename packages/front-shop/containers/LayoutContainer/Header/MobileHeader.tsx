import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { openModal, closeModal } from "@redq/reuse-modal";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import MobileDrawer from "./MobileDrawer";
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from "./Header.style";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { HeaderContext } from "contexts/header/header.context";
import LogoImage from "image/Logo.svg";

import { SearchIcon, LongArrowLeft } from "components/AllSvgIcon";
import Logo from "components/Logo/Logo";
import LanguageSwitcher from "./Menu/LanguageSwitcher/LanguageSwitcher";
import AddressSwitcher from "./Menu/AddressSwitcher/AddressSwitcher";

import { isCategoryPage } from "../is-home-page";
import useDimensions from "helper/useComponentSize";
import { usePlaces } from "@bottle-market/common/helpers";

type MobileHeaderProps = {
  className?: string;
  pathname?: string;
  closeSearch?: any;
};
type SearchModalProps = {
  state?: any;
  handleSearch?: any;
  pathname?: string;
};

const SearchModal: React.FC<SearchModalProps> = ({
  pathname,
  handleSearch,
}) => {
  const {
    placeSearch,
    setPlaceSearch,
    suggestions,
    getGeocode,
    getLatLng,
    clear,
  } = usePlaces();
  const { state, dispatch } = React.useContext(SearchContext);
  const { address, text } = state;
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
    closeModal();
  };

  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <SearchBox
        className="header-modal-search"
        bordered={false}
        inputStyle={{ height: 35 }}
        intlPlaceholderId={address ? "searchPlaceholder" : "enterAddress"}
        handleSearch={handleSearchInput}
        value={search || ""}
        onSuggestionSelected={handleSuggestionSelected}
        onClick={handleClickSearchButton}
        pathname={pathname}
        intlMenuId={"navWineMenu"}
        hideType={true}
        autoSuggestion={!address}
        suggestions={suggestions}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className, pathname }) => {
  const { state, dispatch } = useContext(SearchContext);

  const [mobileHeaderRef, dimensions] = useDimensions();
  const { headerDispatch } = useContext<any>(HeaderContext);

  const headerHeight = dimensions.height;

  React.useEffect(() => {
    headerDispatch({
      type: "GET_MOBILE_HEIGHT",
      payload: {
        ...state,
        mobileHeight: headerHeight,
      },
    });
  }, [headerHeight]);

  const handleSearch = (text: string) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };
  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "search-modal-mobile",
        width: "100%",
        height: "100%",
      },
      closeOnClickOutside: false,
      component: SearchModal,
      componentProps: { state, pathname, handleSearch },
      closeComponent: () => <div />,
    });
  };

  const isHomePage = isCategoryPage(pathname);

  return (
    <DrawerProvider>
      <MobileHeaderWrapper>
        <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
          <DrawerWrapper>
            <MobileDrawer />
          </DrawerWrapper>
          {/* 
          <LogoWrapper>
            <Logo imageUrl={LogoImage} alt="shop logo" />
          </LogoWrapper> */}

          {/* <LanguageSwitcher /> */}

          <AddressSwitcher />

          {isHomePage ? (
            <SearchWrapper
              onClick={handleSearchModal}
              className="searchIconWrapper"
            >
              <SearchIcon />
            </SearchWrapper>
          ) : null}
        </MobileHeaderInnerWrapper>
      </MobileHeaderWrapper>
    </DrawerProvider>
  );
};

export default MobileHeader;
