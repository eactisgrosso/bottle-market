import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Popover, { PLACEMENT } from "../../../components/Popover/Popover";
import Notification from "../../../components/Notification/Notification";
import { useAuth } from "@bottle-market/common";
import {
  NotificationIcon,
  AlertDotIcon,
  ArrowLeftRound,
} from "../../../components/AllSvgIcon";
import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  ProfileImg,
  Image,
  AlertDot,
  NotificationIconWrapper,
  UserDropdowItem,
  NavLink,
  LogoutBtn,
  DrawerIcon,
  CloseButton,
  DrawerWrapper,
} from "./Topbar.style";
import Logoimage from "../../../image/BottleMarket.png";
import { useDrawerDispatch } from "../../../context/DrawerContext";
import { MenuIcon } from "../../../components/AllSvgIcon";
import Drawer, { ANCHOR } from "../../../components/Drawer/Drawer";
import Sidebar from "../Sidebar/Sidebar";
import { DASHBOARD, PRODUCTS, DELIVERY } from "../../../settings/constants";

const data = [
  {
    title: "Delivery Successful",
    time: "5m",
    message: "Order #34567 had been placed",
  },
];

const Topbar = ({ refs, ...props }: any) => {
  const { location } = props;
  const dispatch = useDrawerDispatch();
  const { logout, user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="bottlehub-admin" />
        </Link>
      </Logo>

      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: "1",
              },
            },
            DrawerBody: {
              style: {
                marginRight: "0",
                marginLeft: "0",
                "@media only screen and (max-width: 767px)": {
                  marginLeft: "30px",
                },
              },
            },
            DrawerContainer: {
              style: {
                width: "270px",
                "@media only screen and (max-width: 767px)": {
                  width: "80%",
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        <Button
          onClick={() => {
            dispatch({
              type: "OPEN_DRAWER",
              drawerComponent:
                location.pathname == DELIVERY
                  ? "DELIVERY_FORM"
                  : "PRODUCT_FORM",
            });
          }}
        >
          {location.pathname == DELIVERY
            ? "Agregar Delivery"
            : "Agregar Productos"}
        </Button>

        <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: "330px",
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <NotificationIcon />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <LogoutBtn
                onClick={() => {
                  logout();
                  close();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: "220px",
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <ProfileImg>
            <Image src={user ? user.picture : ""} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default withRouter(Topbar);
