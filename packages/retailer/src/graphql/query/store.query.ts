import gql from "graphql-tag";

export const GET_STORES = gql`
  query getStores {
    stores {
      id
      name
      type
      street
      state
      city
    }
  }
`;

export const GET_DELIVERY_AREAS = gql`
  query getDeliveryAreas {
    deliveryAreas {
      id
      name
      store
      address
      radius
      monday
      monday_hours_from
      monday_hours_to
      tuesday
      tuesday_hours_from
      tuesday_hours_to
      wednesday
      wednesday_hours_from
      wednesday_hours_to
      thursday
      thursday_hours_from
      thursday_hours_to
      friday
      friday_hours_from
      friday_hours_to
      saturday
      saturday_hours_from
      saturday_hours_to
      sunday
      sunday_hours_from
      sunday_hours_to
    }
  }
`;
