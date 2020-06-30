import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { GET_STORES } from "../../../graphql/query/store.query";
import {
  CartIconBig,
  ProductIcon,
  SidebarCategoryIcon,
} from "../../../components/AllSvgIcon";
import {
  Card,
  Title,
  SubTitle,
  TopInfo,
  TitleWrapper,
  IconBox,
  Content,
  Footer,
  Text,
  ButtonContainer,
} from "./StoreCard.style";
import Button, { KIND } from "../../../components/Button/Button";
import Confirm from "../../../components/Confirm/Confirm";
import Tooltip from "../../../components/Tooltip/Tooltip";

const DELETE_STORE = gql`
  mutation deleteStore($id: String!) {
    deleteStore(id: $id)
  }
`;

type StoreCardProps = {
  id: string;
  store_type: string;
  name: string;
  street: string;
  state: string;
  city: string;
  delivery_areas: number;
  products: number;
};

const StoreCard: React.FC<StoreCardProps> = ({
  id,
  store_type,
  name,
  street,
  state,
  city,
  delivery_areas,
  products,
}) => {
  const [deleteStore] = useMutation(DELETE_STORE, {
    update(cache, { data: { deleteStore } }) {
      const { stores } = cache.readQuery({
        query: GET_STORES,
      });

      cache.writeQuery({
        query: GET_STORES,
        data: {
          stores: [...stores.filter((s) => s.id !== deleteStore)],
        },
      });
    },
    onError: (error) => {},
  });

  const handleDelete = () => {
    deleteStore({
      variables: { id: id },
    });
  };

  const renderDelete = (disabled = false) => {
    return (
      <Button
        disabled={disabled}
        kind={KIND.minimal}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              width: "100px",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
              borderBottomLeftRadius: "3px",
              color: $theme.colors.red400,
            }),
          },
        }}
      >
        Eliminar
      </Button>
    );
  };

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
      <Footer>
        <Text style={{ textAlign: "end", marginBottom: "7px" }}>
          <ProductIcon />
          <b> {products}</b>
        </Text>
        <Text style={{ textAlign: "end" }}>
          <SidebarCategoryIcon /> <b> {delivery_areas}</b>
        </Text>
      </Footer>
      <ButtonContainer>
        {(delivery_areas > 0 || products > 0) && (
          <Tooltip
            message={
              "No pueden eliminarse tiendas con productos o zonas de entrega asociadas."
            }
          >
            {renderDelete(true)}
          </Tooltip>
        )}
        {delivery_areas == 0 && products == 0 && (
          <Confirm
            message={`Se eliminará la tienda ${name}`}
            onClick={handleDelete}
          >
            {renderDelete()}
          </Confirm>
        )}
        <Button
          kind={KIND.secondary}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                display: "inline-block",
                width: "100px",
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
