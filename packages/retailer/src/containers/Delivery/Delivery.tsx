import React, { useState } from "react";
import { styled } from "baseui";
import { geolocated } from "react-geolocated";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../components/FlexBox/FlexBox";
import { DeliveryIcon, GpsIcon } from "../../components/AllSvgIcon";
import {
  Card,
  TopInfo,
  TitleWrapper,
  Title,
  SubTitle,
  IconBox,
  Detail,
  Color,
  Text,
  PrimaryText,
  Content,
  ButtonContainer,
} from "./Delivery.style";
import Button, { KIND, SHAPE } from "../../components/Button/Button";
import { ButtonGroup } from "baseui/button-group";
import { Tag, VARIANT } from "baseui/tag";

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

const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

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
                  <SubTitle>Zona de Entrega 1</SubTitle>
                </TitleWrapper>
                <IconBox>{<DeliveryIcon />}</IconBox>
              </TopInfo>
              <Detail>
                <Content>
                  <GpsIcon />
                  <PrimaryText>+2km</PrimaryText>
                </Content>
                <Content>
                  <Text>Barracas 352, Lobos, Buenos Aires </Text>
                </Content>
              </Detail>
              <Detail>
                {daysOfWeek.map((day, index) => (
                  <React.Fragment key={index}>
                    <Tag
                      closeable={false}
                      variant={VARIANT.outlined}
                      kind="primary"
                    >
                      {day}
                    </Tag>
                  </React.Fragment>
                ))}
                <Content>
                  <Tag closeable={false} variant={VARIANT.light} kind="neutral">
                    9 a 18 hs
                  </Tag>
                </Content>
              </Detail>
              <ButtonContainer>
                <Button
                  kind={KIND.minimal}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        display: "inline-block",
                        width: "47%",
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
                        width: "47%",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                      }),
                    },
                  }}
                >
                  Editar
                </Button>
              </ButtonContainer>
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
