import { Event } from '../../../common/domain/event';

export class DeliveryAreaSetup extends Event {
  constructor(
    public readonly name: string,
    public readonly store_id: string,
    public readonly store: string,
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
    public readonly monday_hours_from?: number,
    public readonly monday_hours_to?: number,
    public readonly tuesday_hours_from?: number,
    public readonly tuesday_hours_to?: number,
    public readonly wednesday_hours_from?: number,
    public readonly wednesday_hours_to?: number,
    public readonly thursday_hours_from?: number,
    public readonly thursday_hours_to?: number,
    public readonly friday_hours_from?: number,
    public readonly friday_hours_to?: number,
    public readonly saturday_hours_from?: number,
    public readonly saturday_hours_to?: number,
    public readonly sunday_hours_from?: number,
    public readonly sunday_hours_to?: number
  ) {
    super();
  }
}

export class DeliveryAreaChanged extends Event {
  constructor(
    public readonly name: string,
    public readonly store_id: string,
    public readonly store: string,
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
    public readonly monday_hours_from?: number,
    public readonly monday_hours_to?: number,
    public readonly tuesday_hours_from?: number,
    public readonly tuesday_hours_to?: number,
    public readonly wednesday_hours_from?: number,
    public readonly wednesday_hours_to?: number,
    public readonly thursday_hours_from?: number,
    public readonly thursday_hours_to?: number,
    public readonly friday_hours_from?: number,
    public readonly friday_hours_to?: number,
    public readonly saturday_hours_from?: number,
    public readonly saturday_hours_to?: number,
    public readonly sunday_hours_from?: number,
    public readonly sunday_hours_to?: number
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
  DeliveryAreaChanged
};
