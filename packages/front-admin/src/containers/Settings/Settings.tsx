import React, { useCallback } from "react";
import SettingsCard from "../../components/SettingsCard/SettingsCard";
import { useDrawerDispatch } from "../../context/DrawerContext";
import { STUFF_MEMBERS, SITE_SETTINGS } from "../../settings/constants";
import { styled } from "baseui";
import {
  SiteSettings,
  Members,
  OrderIcon,
  CouponIcon,
  SidebarCategoryIcon,
  ProductIcon,
} from "../../components/AllSvgIcon";
import { Grid, Row, Col as Column } from "../../components/FlexBox/FlexBox";
import { useHistory } from "react-router-dom";

const Col = styled(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

export default function Settings() {
  let history = useHistory();

  const dispatch = useDrawerDispatch();

  const openStaffForm = useCallback(
    () =>
      dispatch({ type: "OPEN_DRAWER", drawerComponent: "STAFF_MEMBER_FORM" }),
    [dispatch]
  );

  const openCategoryForm = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "CATEGORY_FORM" }),
    [dispatch]
  );

  const openProductForm = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "PRODUCT_FORM" }),
    [dispatch]
  );

  const openCouponForm = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "CAMPAING_FORM" }),
    [dispatch]
  );

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={6}>
          <SettingsCard
            icon={<Members />}
            title="Usuarios y Accesos"
            subtitle="Administrá usuarios y permisos"
            onClick={() => history.push(STUFF_MEMBERS)}
          />
        </Col>
        <Col md={6}>
          <SettingsCard
            icon={<SiteSettings />}
            title="Configuración del Sitio"
            subtitle="Revisá y actualizá las preferencias del Sitio"
            onClick={() => history.push(SITE_SETTINGS)}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <SettingsCard
            icon={<ProductIcon width="56px" height="56px" />}
            title="Agregar Productos"
            subtitle="Agregá productos desde acá"
            onClick={openProductForm}
          />
        </Col>

        <Col md={6}>
          <SettingsCard
            icon={<SidebarCategoryIcon width="56px" height="56px" />}
            title="Agregar Categorías"
            subtitle="Agregá categorías desde acá"
            onClick={openCategoryForm}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <SettingsCard
            icon={<OrderIcon width="56px" height="56px" />}
            title="Agregar Negocios"
            subtitle="Agregá bodegas y distribuidores desde acá"
            onClick={openStaffForm}
          />
        </Col>
        <Col md={6}>
          <SettingsCard
            icon={<CouponIcon width="56px" height="56px" />}
            title="Agregar Cupones"
            subtitle="Agregá cupones de descuento desde acá"
            onClick={openCouponForm}
          />
        </Col>
      </Row>
    </Grid>
  );
}
