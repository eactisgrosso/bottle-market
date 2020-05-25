import React, { useState } from "react";
import { styled } from "baseui";
import { geolocated } from "react-geolocated";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../components/FlexBox/FlexBox";
import { Header, Heading } from "../../components/WrapperStyle";
import DeliveryArea from "../../containers/DeliveryArea/DeliveryArea";
import { DeliveryIcon } from "../../components/AllSvgIcon";
import {
  Card,
  TopInfo,
  TitleWrapper,
  Title,
  SubTitle,
  IconBox,
  Address,
  Color,
  Text,
  PrimaryText,
  Content,
  ButtonGroup,
} from "./Delivery.style";
import Button, { KIND } from "../../components/Button/Button";

export const Col = styled(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = styled(Rows, () => ({
  "@media only screen and (min-width: 768px) and (max-width: 991px)": {
    alignItems: "center",
  },
}));

type Props = any;

const Delivery: React.FC<Props> = (props) => {
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Row>
            <Card>
              <TopInfo>
                <TitleWrapper>
                  <Title>Eze's Wines</Title>
                  <SubTitle>Lunes a Viernes de 9 a 18hs</SubTitle>
                </TitleWrapper>
                <IconBox>{<DeliveryIcon />}</IconBox>
              </TopInfo>
              <DeliveryArea
                disabled
                isGeolocationEnabled={props.isGeolocationEnabled}
                coords={props.coords}
              />
              <Address>
                <Color style={{ backgroundColor: "#03D3B5" }} />
                <Content>
                  <Text>Barracas 352, Lobos</Text>
                  <PrimaryText>+2km</PrimaryText>
                </Content>
              </Address>
              <ButtonGroup>
                <Button
                  kind={KIND.minimal}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        display: "inline-block",
                        width: "45%",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                        marginRight: "15px",
                        color: $theme.colors.red400,
                      }),
                    },
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  kind={KIND.secondary}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        display: "inline-block",
                        width: "45%",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                      }),
                    },
                  }}
                >
                  Actualizar
                </Button>
              </ButtonGroup>
            </Card>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Delivery);
