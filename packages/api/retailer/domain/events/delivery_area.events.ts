import { Event } from "../../../common/domain/event";

export class DeliveryAreaSetup extends Event {
  constructor(
    public readonly name: string,
    public readonly store_id: string,
    public readonly address: string,
    public readonly lat: number,
    public readonly lng: number,
    public readonly radius: number,
    public readonly monday: boolean,
    public readonly tuesday: boolean,
    public readonly wednesday: boolean,
    public readonly thursday: boolean,
    public readonly friday: boolean,
    public readonly saturday: boolean,
    public readonly sunday: boolean,
    public readonly monday_hours_from?: string,
    public readonly monday_hours_to?: string,
    public readonly tuesday_hours_from?: string,
    public readonly tuesday_hours_to?: string,
    public readonly wednesday_hours_from?: string,
    public readonly wednesday_hours_to?: string,
    public readonly thursday_hours_from?: string,
    public readonly thursday_hours_to?: string,
    public readonly friday_hours_from?: string,
    public readonly friday_hours_to?: string,
    public readonly saturday_hours_from?: string,
    public readonly saturday_hours_to?: string,
    public readonly sunday_hours_from?: string,
    public readonly sunday_hours_to?: string
  ) {
    super();
  }
}

export class DeliveryAreaClosed extends Event {
  constructor() {
    super();
  }
}

export const DeliveryEvents = {
  DeliveryAreaSetup,
  DeliveryAreaClosed,
};
