import { Event } from "../../../common/domain/event";

export class StoreOpened extends Event {
  constructor(
    public readonly name: string,
    public readonly store_type: string,
    public readonly country_id: string,
    public readonly country: string,
    public readonly state_id: string,
    public readonly state: string,
    public readonly city_id: string,
    public readonly city: string,
    public readonly street: string
  ) {
    super();
  }
}

export const StoreEvents = {
  StoreOpened,
};
