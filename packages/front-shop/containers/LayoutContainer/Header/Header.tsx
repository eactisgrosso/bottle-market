import React from "react";
import Router, { useRouter } from "next/router";
import { openModal } from "@redq/reuse-modal";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { useAuth } from "@bottle-market/common";
import { RightMenu } from "./Menu/RightMenu/RightMenu";
import { LeftMenu } from "./Menu/LeftMenu/LeftMenu";
import HeaderWrapper from "./Header.style";
import LogoImage from "image/Logo.svg";
import { isCategoryPage } from "../is-home-page";
import SignInForm from "../../SignInOutForm/SignIn";
import { setCookie } from "helper/session";

type Props = {
  className?: string;
  token?: string;
  pathname?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const { signIn, logout, isAuthenticated, user } = useAuth();
  const { state, dispatch } = React.useContext(SearchContext);
  const { pathname, query } = useRouter();

  const handleLogout = () => {
    logout();
  };

  const handleJoin = () => {
    setCookie("returnUrl", "/");
    signIn();
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: SignInForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const onSearch = (text: any) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };

  const { text } = state;
  const onClickHandler = () => {
    const updatedQuery = query.category
      ? { text: text, category: query.category }
      : { text };
    Router.push({
      pathname: pathname,
      query: updatedQuery,
    });
  };
  const showSearch = isCategoryPage(pathname);
  return (
    <HeaderWrapper className={className}>
      <LeftMenu logo={LogoImage} />
      {showSearch && (
        <SearchBox
          className="headerSearch"
          handleSearch={(value: any) => onSearch(value)}
          onClick={onClickHandler}
          placeholder="Search anything..."
          hideType={true}
          minimal={true}
          showSvg={true}
          style={{ width: "100%" }}
          value={text || ""}
          intlMenuId={"navWineMenu"}
        />
      )}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={user ? user.picture : ""}
      />
    </HeaderWrapper>
  );
};

export default Header;
