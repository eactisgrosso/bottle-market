import React from "react";
import { styled } from "baseui";
import { Grid, Row, Col as Column } from "../../components/FlexBox/FlexBox";
import RadialBarChart from "../../components/Widgets/RadialBarChart/RadialBarChart";
import LineChart from "../../components/Widgets/LineChart/LineChart";
import ColumnChart from "../../components/Widgets/ColumnChart/ColumnChart";
import DonutChart from "../../components/Widgets/DonutChart/DonutChart";
import GraphChart from "../../components/Widgets/GraphChart/GraphChart";
import GradiantGraphChart from "../../components/Widgets/GradiantGraphChart/GradiantGraphChart";
import MapWidget from "../../components/Widgets/MapWidget/MapWidget";
import StickerCard from "../../components/Widgets/StickerCard/StickerCard";
import {
  Revenue,
  Refund,
  CoinIcon,
  CartIconBig,
  UserIcon,
  DeliveryIcon,
} from "../../components/AllSvgIcon";

const Col = styled(Column, (props) => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },

  "@media only screen and (max-width: 990px)": {
    marginBottom: props.className === "mb-30" ? "30px" : "0",
  },
}));

const Dashboard = () => (
  <Grid fluid={true}>
    <Row>
      <Col md={5} lg={4} sm={6}>
        <RadialBarChart
          widgetTitle="Objetivo"
          series={[43, 75]}
          label={["$1,342", "$8,908"]}
          colors={["#03D3B5", "#666d92"]}
          helperText={["Objetivo Semanal", "Objetivo Mensual"]}
        />
      </Col>
      <Col md={7} lg={8} sm={6}>
        <LineChart
          widgetTitle="Adquisición de Usuarios"
          color={["#03D3B5"]}
          categories={[
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ]}
          seriesName="Visitas Únicas"
          series={[200, 150, 430, 320, 600, 468, 309, 500, 273, 370, 260, 180]}
        />
      </Col>
    </Row>

    <Row>
      <Col lg={3} sm={6} xs={12} className="mb-30">
        <StickerCard
          title="Ingreso Total"
          subtitle="(Últimos 30 Días)"
          icon={<CoinIcon />}
          price="$711.66"
          indicator="up"
          indicatorText="Ingreso up"
          note="(período anterior)"
          link="#"
          linkText="Detalles"
        />
      </Col>
      <Col lg={3} sm={6} xs={12} className="mb-30">
        <StickerCard
          title="Órdenes totales"
          subtitle="(Últimos 30 Días)"
          icon={<CartIconBig />}
          price="88,568"
          indicator="down"
          indicatorText="Órdenes down"
          note="(período anterior)"
          link="#"
          linkText="Detalle"
        />
      </Col>
      <Col lg={3} sm={6} xs={12}>
        <StickerCard
          title="Nuevos clientes"
          subtitle="(Últimos 30 días)"
          icon={<UserIcon />}
          price="5,678"
          indicator="up"
          indicatorText="Clientes up"
          note="(período anterior)"
          link="#"
          linkText="Detalle"
        />
      </Col>
      <Col lg={3} sm={6} xs={12}>
        <StickerCard
          title="Total de Envíos"
          subtitle="(Últimos 30 días)"
          icon={<DeliveryIcon />}
          price="78,000"
          indicator="up"
          indicatorText="Envíos up"
          note="(período anterior)"
          link="#"
          linkText="Detalle"
        />
      </Col>
    </Row>

    <Row>
      <Col md={7} lg={8}>
        <GraphChart
          widgetTitle="Venta por Redes Sociales"
          colors={["#03D3B5"]}
          series={[25, 30, 14, 30, 55, 60, 48]}
          labels={[
            "2019-05-12",
            "2019-05-13",
            "2019-05-14",
            "2019-05-15",
            "2019-05-16",
            "2019-05-17",
            "2019-05-18",
          ]}
        />
      </Col>

      <Col md={5} lg={4}>
        <DonutChart
          widgetTitle="Objetivo"
          series={[30634, 6340]}
          labels={["Ingreso del Día", "Reembolsos del Día"]}
          colors={["#03D3B5", "#666d92"]}
          helperText={["Objetivo Semanal", "Objetivo Mensual"]}
          icon={[<Revenue />, <Refund />]}
          prefix="$"
        />
      </Col>
    </Row>

    <Row>
      <Col md={12} lg={12}>
        <ColumnChart
          widgetTitle="Historial de Ventas"
          colors={["#03D3B5"]}
          prefix="$"
          totalValue="1,92,564"
          position="up"
          percentage="1.38%"
          text="Más que el último año"
          series={[44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]}
          categories={[
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Deciembre",
          ]}
        />
      </Col>
    </Row>
    <Row>
      <Col md={5} lg={4}>
        <GradiantGraphChart
          colors={["#03D3B5"]}
          series={[25, 30, 14, 30, 55, 60, 48]}
          labels={[
            "2019-05-12",
            "2019-05-13",
            "2019-05-14",
            "2019-05-15",
            "2019-05-16",
            "2019-05-17",
            "2019-05-18",
          ]}
          topRowTitle="Performance"
          bottomRowData={[
            {
              label: "Ganancia Última Semana",
              valueText: "+29.7%",
              value: 29.7,
              color: "#03D3B5",
            },
            {
              label: "Pérdidas de la Semana",
              valueText: "-53.4%",
              value: 53.4,
              color: "#FC747A",
            },
          ]}
        />
      </Col>

      <Col md={7} lg={8}>
        <MapWidget
          data={[
            {
              name: "Capital Federal",
              value: 69922,
              color: "#2170FF",
            },
            {
              name: "GCBA",
              value: 41953,
              color: "#29CAE4",
            },
            {
              name: "Mendoza",
              value: 23307,
              color: "#666D92",
            },
            {
              name: "Salta",
              value: 20200,
              color: "#03D3B5",
            },
          ]}
          totalText="Total de Clientes"
        />
      </Col>
    </Row>
  </Grid>
);

export default Dashboard;
