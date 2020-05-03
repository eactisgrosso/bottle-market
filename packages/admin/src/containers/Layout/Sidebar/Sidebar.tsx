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
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
} from "../../../settings/constants";
import { AuthContext } from "../../../context/auth";
import {
  DashboardIcon,
  ProductIcon,
  SidebarCategoryIcon,
  OrderIcon,
  CustomerIcon,
  CouponIcon,
  SettingIcon,
  LogoutIcon,
} from "../../../components/AllSvgIcon";

const sidebarMenus = [
  {
    name: "Dashboard",
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },
  {
    name: "Productos",
    path: PRODUCTS,
    exact: false,
    icon: <ProductIcon />,
  },
  {
    name: "Categorías",
    path: CATEGORY,
    exact: false,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: "Órdenes",
    path: ORDERS,
    exact: false,
    icon: <OrderIcon />,
  },
  {
    name: "Clientes",
    path: CUSTOMERS,
    exact: false,
    icon: <CustomerIcon />,
  },
  {
    name: "Cupones",
    path: COUPONS,
    exact: false,
    icon: <CouponIcon />,
  },
  {
    name: "Preferencias",
    path: SETTINGS,
    exact: false,
    icon: <SettingIcon />,
  },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const { signout } = useContext(AuthContext);
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
          signout();
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
