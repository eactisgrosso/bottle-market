import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { GET_DELIVERY_AREAS } from "../../../graphql/query/delivery.query";
import { DeliveryIcon, GpsIcon } from "../../../components/AllSvgIcon";
import {
  Card,
  TopInfo,
  TitleWrapper,
  Title,
  SubTitle,
  IconBox,
  Detail,
  Hours,
  Address,
  PrimaryText,
  Content,
  ButtonContainer,
} from "./DeliveryCard.style";
import Button, { KIND } from "../../../components/Button/Button";
import { Tag, VARIANT } from "baseui/tag";
import { groupBy } from "lodash";
import Confirm from "../../../components/Confirm/Confirm";

const DELETE_DELIVERY_AREA = gql`
  mutation deleteDeliveryArea($id: String!) {
    deleteDeliveryArea(id: $id)
  }
`;

type DeliveryCardProps = {
  id: string;
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
  id,
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

  const getConsecutives = (arr, i, result) => {
    const current = arr[i];
    const next = arr[i + 1];
    if (next && current.i + 1 == next.i) {
      result.push(current);
      return getConsecutives(arr, i + 1, result);
    }
    result.push(current);
    return result;
  };

  useEffect(() => {
    let businessHours = [];
    if (monday)
      businessHours.push({
        i: 0,
        day: "Lunes",
        from: monday_hours_from,
        to: monday_hours_to,
      });
    if (tuesday)
      businessHours.push({
        i: 1,
        day: "Martes",
        from: tuesday_hours_from,
        to: tuesday_hours_to,
      });
    if (wednesday)
      businessHours.push({
        i: 2,
        day: "Miércoles",
        from: wednesday_hours_from,
        to: wednesday_hours_to,
      });
    if (thursday)
      businessHours.push({
        i: 3,
        day: "Jueves",
        from: thursday_hours_from,
        to: thursday_hours_to,
      });
    if (friday)
      businessHours.push({
        i: 4,
        day: "Viernes",
        from: friday_hours_from,
        to: friday_hours_to,
      });
    if (saturday)
      businessHours.push({
        i: 5,
        day: "Sábados",
        from: saturday_hours_from,
        to: saturday_hours_to,
      });
    if (sunday)
      businessHours.push({
        i: 6,
        day: "Domingos",
        from: sunday_hours_from,
        to: sunday_hours_to,
      });

    const grouped = groupBy(businessHours, function (hour) {
      return `${hour.from.substring(0, 5)} a ${hour.to.substring(0, 5)}`;
    });

    const hoursLabel = [];
    for (let schedule in grouped) {
      const values = grouped[schedule];
      if (values.length == 1)
        hoursLabel.push(`${values[0].day} de ${schedule}`);
      else {
        let start = 0;
        do {
          const consecutives = getConsecutives(values.slice(start), 0, []);
          if (consecutives.length > 2)
            hoursLabel.push(
              `${consecutives[0].day} a ${
                consecutives[consecutives.length - 1].day
              } de ${schedule}`
            );
          else
            hoursLabel.push(
              `${consecutives.map((v) => v.day).join(" y ")} de ${schedule}`
            );
          start += consecutives.length;
        } while (start < values.length);
      }
    }
    setHours(hoursLabel);
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

  const [deleteDeliveryArea] = useMutation(DELETE_DELIVERY_AREA, {
    update(cache, { data: { deleteDeliveryArea } }) {
      const { stores } = cache.readQuery({
        query: GET_DELIVERY_AREAS,
      });

      cache.writeQuery({
        query: GET_DELIVERY_AREAS,
        data: {
          stores: [...stores.filter((s) => s.id !== deleteDeliveryArea)],
        },
      });
    },
    onError: (error) => {},
  });

  const handleDelete = () => {
    deleteDeliveryArea({
      variables: { id: id },
    });
  };

  return (
    <Card>
      <TopInfo>
        <TitleWrapper>
          <Title>{area}</Title>
          <SubTitle>{store}</SubTitle>
        </TitleWrapper>
        <IconBox>{<DeliveryIcon />}</IconBox>
      </TopInfo>
      {address && (
        <Detail>
          <Content>
            <GpsIcon />
            <PrimaryText>+{radius}km</PrimaryText>
          </Content>
          <Content>
            <Address>{address}</Address>
          </Content>
        </Detail>
      )}
      {!address && (
        <Detail>
          <Content>
            <GpsIcon />
            <PrimaryText>5000km</PrimaryText>
          </Content>
          <Content>
            <Address>Envíos a todo el país</Address>
          </Content>
        </Detail>
      )}
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
        <Confirm
          message={`Se eliminará el delivery ${store}.`}
          onClick={handleDelete}
        >
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
        </Confirm>

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
