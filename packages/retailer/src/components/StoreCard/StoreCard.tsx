import React from "react";
import { CartIconBig, GpsIcon } from "../../components/AllSvgIcon";
import {
  Card,
  Title,
  SubTitle,
  TopInfo,
  TitleWrapper,
  IconBox,
  Content,
  Text,
  ButtonContainer,
} from "./StoreCard.style";
import Button, { KIND } from "../../components/Button/Button";
import { Tag, VARIANT } from "baseui/tag";
import "@bottle-market/common";

type StoreCardProps = {
  store_type: string;
  name: string;
  street: string;
  state: string;
  city: string;
};

const StoreCard: React.FC<StoreCardProps> = ({
  store_type,
  name,
  street,
  state,
  city,
  ...props
}) => {
  return (
    <Card>
      <TopInfo>
        <TitleWrapper>
          <Title>{name}</Title>
          <SubTitle>{store_type}</SubTitle>
        </TitleWrapper>
        <IconBox>{<CartIconBig />}</IconBox>
      </TopInfo>
      <Content>
        <Text>{street}</Text>
        <Text>{city}</Text>
        <Text>{state}</Text>
      </Content>
      <ButtonContainer>
        <Button
          kind={KIND.minimal}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                display: "inline-block",
                width: "40%",
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
                width: "40%",
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
  );
};

export default StoreCard;
