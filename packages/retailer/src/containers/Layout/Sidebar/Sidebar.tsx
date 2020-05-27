import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from "./Sidebar.style";
import {
  DASHBOARD,
  STORES,
  PRODUCTS,
  DELIVERY,
} from "../../../settings/constants";
import { useAuth } from "@bottle-market/common";
import {
  DashboardIcon,
  ProductIcon,
  SidebarCategoryIcon,
  LogoutIcon,
  Vino,
} from "../../../components/AllSvgIcon";

const sidebarMenus = [
  {
    name: "Dashboard",
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },
  {
    name: "Tiendas",
    path: STORES,
    exact: false,
    icon: <Vino />,
  },
  {
    name: "Productos",
    path: PRODUCTS,
    exact: false,
    icon: <ProductIcon />,
  },
  {
    name: "Delivery",
    path: DELIVERY,
    exact: false,
    icon: <SidebarCategoryIcon />,
  },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const { logout } = useAuth();
  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {sidebarMenus.map((menu: any, index: number) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: "#00C58D",
              backgroundColor: "#f7f7f7",
              borderRadius: "50px 0 0 50px",
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? <Svg>{menu.icon}</Svg> : ""}
            {menu.name}
          </NavLink>
        ))}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          logout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Cerrar sesión
      </LogoutBtn>
    </SidebarWrapper>
  );
});
