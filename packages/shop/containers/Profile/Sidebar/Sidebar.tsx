import React, { useContext } from "react";
import Router from "next/router";
import { useAuth } from "contexts/auth/useAuth";
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from "./Sidebar.style";
import { FormattedMessage } from "react-intl";

const SidebarCategory: React.FC<{}> = () => {
  const { logout } = useAuth();

  const sidebarTopMenu = [
    { link: "/order", intlId: "sidebarYourOrder" },
    { link: "/tienda", intlId: "navlinkRetailer" },
  ];

  const sidebarBottomMenu = [
    {
      link: "/profile",
      intlId: "navlinkAccountSettings",
    },
  ];
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      logout();
    }
  };
  return (
    <>
      <SidebarWrapper>
        <SidebarTop>
          {sidebarTopMenu.map((item, index) => (
            <SidebarMenu href={item.link} key={index} intlId={item.intlId} />
          ))}
        </SidebarTop>

        <SidebarBottom>
          {sidebarBottomMenu.map((item, index) => (
            <SidebarMenu href={item.link} key={index} intlId={item.intlId} />
          ))}
          <LogoutButton type="button" onClick={handleLogout}>
            <FormattedMessage id="navlinkLogout" defaultMessage="Logout" />
          </LogoutButton>
        </SidebarBottom>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;
