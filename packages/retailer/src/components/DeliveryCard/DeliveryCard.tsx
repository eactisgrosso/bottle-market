import React, { useEffect, useState } from "react";
import { DeliveryIcon, GpsIcon } from "../../components/AllSvgIcon";
import {
  Card,
  TopInfo,
  TitleWrapper,
  Title,
  SubTitle,
  IconBox,
  Detail,
  Hours,
  Text,
  PrimaryText,
  Content,
  ButtonContainer,
} from "./DeliveryCard.style";
import Button, { KIND } from "../../components/Button/Button";
import { Tag, VARIANT } from "baseui/tag";
import { groupBy } from "lodash";

type DeliveryCardProps = {
  store: string;
  area: string;
  address: string;
  radius: number;
  monday: boolean;
  monday_hours_from: string;
  monday_hours_to: string;
  tuesday: boolean;
  tuesday_hours_from: string;
  tuesday_hours_to: string;
  wednesday: boolean;
  wednesday_hours_from: string;
  wednesday_hours_to: string;
  thursday: boolean;
  thursday_hours_from: string;
  thursday_hours_to: string;
  friday: boolean;
  friday_hours_from: string;
  friday_hours_to: string;
  saturday: boolean;
  saturday_hours_from: string;
  saturday_hours_to: string;
  sunday: boolean;
  sunday_hours_from: string;
  sunday_hours_to: string;
};
const DeliveryCard: React.FC<DeliveryCardProps> = ({
  store,
  area,
  address,
  radius,
  monday,
  monday_hours_from,
  monday_hours_to,
  tuesday,
  tuesday_hours_from,
  tuesday_hours_to,
  wednesday,
  wednesday_hours_from,
  wednesday_hours_to,
  thursday,
  thursday_hours_from,
  thursday_hours_to,
  friday,
  friday_hours_from,
  friday_hours_to,
  saturday,
  saturday_hours_from,
  saturday_hours_to,
  sunday,
  sunday_hours_from,
  sunday_hours_to,
  ...props
}) => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    let businessHours = [];
    if (monday)
      businessHours.push({
        day: "Lunes",
        from: monday_hours_from,
        to: monday_hours_to,
      });
    if (tuesday)
      businessHours.push({
        day: "Martes",
        from: tuesday_hours_from,
        to: tuesday_hours_to,
      });
    if (wednesday)
      businessHours.push({
        day: "Miércoles",
        from: wednesday_hours_from,
        to: wednesday_hours_to,
      });
    if (thursday)
      businessHours.push({
        day: "Jueves",
        from: thursday_hours_from,
        to: thursday_hours_to,
      });
    if (friday)
      businessHours.push({
        day: "Viernes",
        from: friday_hours_from,
        to: friday_hours_to,
      });
    if (saturday)
      businessHours.push({
        day: "Sábados",
        from: saturday_hours_from,
        to: saturday_hours_to,
      });
    if (sunday)
      businessHours.push({
        day: "Domingos",
        from: sunday_hours_from,
        to: sunday_hours_to,
      });

    const grouped = groupBy(businessHours, function (hour) {
      return `${hour.from.substring(0, 5)} a ${hour.to.substring(0, 5)}`;
    });

    const h = [];
    for (let key in grouped) {
      const values = grouped[key];
      if (values.length == 1) h.push(`${values[0].day} de ${key}`);
      else
        h.push(`${values[0].day} a ${values[values.length - 1].day} de ${key}`);
    }
    setHours(h);
  }, [
    monday,
    monday_hours_from,
    monday_hours_to,
    tuesday,
    tuesday_hours_from,
    tuesday_hours_to,
    wednesday,
    wednesday_hours_from,
    wednesday_hours_to,
    thursday,
    thursday_hours_from,
    thursday_hours_to,
    friday,
    friday_hours_from,
    friday_hours_to,
    saturday,
    saturday_hours_from,
    saturday_hours_to,
    sunday,
    sunday_hours_from,
    sunday_hours_to,
  ]);

  return (
    <Card>
      <TopInfo>
        <TitleWrapper>
          <Title>{area}</Title>
          <SubTitle>{store}</SubTitle>
        </TitleWrapper>
        <IconBox>{<DeliveryIcon />}</IconBox>
      </TopInfo>
      <Detail>
        <Content>
          <GpsIcon />
          <PrimaryText>+{radius}km</PrimaryText>
        </Content>
        <Content>
          <Text>{address}</Text>
        </Content>
      </Detail>
      <Hours>
        {hours.map((day, index) => (
          <React.Fragment key={index}>
            <Tag
              closeable={false}
              variant={VARIANT.light}
              kind="neutral"
              overrides={{
                Text: {
                  style: ({ $theme }) => ({
                    maxWidth: null,
                  }),
                },
              }}
            >
              {day}
            </Tag>
          </React.Fragment>
        ))}
      </Hours>
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

export default DeliveryCard;
