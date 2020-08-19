import { Aggregate } from '../../common/domain/aggregate';
import {
  DeliveryAreaSetup,
  DeliveryAreaClosed,
  DeliveryAreaChanged
} from './events/delivery_area.events';

export class DeliveryArea extends Aggregate {
  name: string;
  store_id: string;
  store: string;
  address: string;
  lat: number;
  lng: number;
  radius: number;
  monday: boolean;
  monday_hours_from?: number;
  monday_hours_to?: number;
  tuesday: boolean;
  tuesday_hours_from?: number;
  tuesday_hours_to?: number;
  wednesday: boolean;
  wednesday_hours_from?: number;
  wednesday_hours_to?: number;
  thursday: boolean;
  thursday_hours_from?: number;
  thursday_hours_to?: number;
  friday: boolean;
  friday_hours_from?: number;
  friday_hours_to?: number;
  saturday: boolean;
  saturday_hours_from?: number;
  saturday_hours_to?: number;
  sunday: boolean;
  sunday_hours_from?: number;
  sunday_hours_to?: number;

  constructor(readonly id: string) {
    super(id);
  }

  setup(
    name: string,
    store_id: string,
    store: string,
    address: string,
    lat: number,
    lng: number,
    radius: number,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    monday_hours_from?: number,
    monday_hours_to?: number,
    tuesday_hours_from?: number,
    tuesday_hours_to?: number,
    wednesday_hours_from?: number,
    wednesday_hours_to?: number,
    thursday_hours_from?: number,
    thursday_hours_to?: number,
    friday_hours_from?: number,
    friday_hours_to?: number,
    saturday_hours_from?: number,
    saturday_hours_to?: number,
    sunday_hours_from?: number,
    sunday_hours_to?: number
  ) {
    this.apply(
      new DeliveryAreaSetup(
        name,
        store_id,
        store,
        address,
        lat,
        lng,
        radius,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        monday_hours_from,
        monday_hours_to,
        tuesday_hours_from,
        tuesday_hours_to,
        wednesday_hours_from,
        wednesday_hours_to,
        thursday_hours_from,
        thursday_hours_to,
        friday_hours_from,
        friday_hours_to,
        saturday_hours_from,
        saturday_hours_to,
        sunday_hours_from,
        sunday_hours_to
      )
    );
  }

  onDeliveryAreaSetup(event: DeliveryAreaSetup) {
    this.name = event.name;
    this.store_id = event.store_id;
    this.store = event.store;
    this.address = event.address;
    this.lat = event.lat;
    this.lng = event.lng;
    this.radius = event.radius;
    this.monday = event.monday;
    this.tuesday = event.tuesday;
    this.wednesday = event.wednesday;
    this.thursday = event.thursday;
    this.friday = event.friday;
    this.saturday = event.saturday;
    this.sunday = event.sunday;
    this.monday_hours_from = event.monday_hours_from;
    this.monday_hours_to = event.monday_hours_to;
    this.tuesday_hours_from = event.tuesday_hours_from;
    this.tuesday_hours_to = event.tuesday_hours_to;
    this.wednesday_hours_from = event.wednesday_hours_from;
    this.wednesday_hours_to = event.wednesday_hours_to;
    this.thursday_hours_from = event.thursday_hours_from;
    this.thursday_hours_to = event.thursday_hours_to;
    this.friday_hours_from = event.friday_hours_from;
    this.friday_hours_to = event.friday_hours_to;
    this.saturday_hours_from = event.saturday_hours_from;
    this.saturday_hours_to = event.saturday_hours_to;
    this.sunday_hours_from = event.sunday_hours_from;
    this.sunday_hours_to = event.sunday_hours_to;
  }

  change(
    id: string,
    name: string,
    store_id: string,
    store: string,
    address: string,
    lat: number,
    lng: number,
    radius: number,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    monday_hours_from?: number,
    monday_hours_to?: number,
    tuesday_hours_from?: number,
    tuesday_hours_to?: number,
    wednesday_hours_from?: number,
    wednesday_hours_to?: number,
    thursday_hours_from?: number,
    thursday_hours_to?: number,
    friday_hours_from?: number,
    friday_hours_to?: number,
    saturday_hours_from?: number,
    saturday_hours_to?: number,
    sunday_hours_from?: number,
    sunday_hours_to?: number
  ) {
    this.apply(
      new DeliveryAreaChanged(
        id,
        name,
        store_id,
        store,
        address,
        lat,
        lng,
        radius,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        monday_hours_from,
        monday_hours_to,
        tuesday_hours_from,
        tuesday_hours_to,
        wednesday_hours_from,
        wednesday_hours_to,
        thursday_hours_from,
        thursday_hours_to,
        friday_hours_from,
        friday_hours_to,
        saturday_hours_from,
        saturday_hours_to,
        sunday_hours_from,
        sunday_hours_to
      )
    );
  }

  onDeliveryAreaChanged(event: DeliveryAreaChanged) {
    this.name = event.id;
    this.name = event.name;
    this.store_id = event.store_id;
    this.store = event.store;
    this.address = event.address;
    this.lat = event.lat;
    this.lng = event.lng;
    this.radius = event.radius;
    this.monday = event.monday;
    this.tuesday = event.tuesday;
    this.wednesday = event.wednesday;
    this.thursday = event.thursday;
    this.friday = event.friday;
    this.saturday = event.saturday;
    this.sunday = event.sunday;
    this.monday_hours_from = event.monday_hours_from;
    this.monday_hours_to = event.monday_hours_to;
    this.tuesday_hours_from = event.tuesday_hours_from;
    this.tuesday_hours_to = event.tuesday_hours_to;
    this.wednesday_hours_from = event.wednesday_hours_from;
    this.wednesday_hours_to = event.wednesday_hours_to;
    this.thursday_hours_from = event.thursday_hours_from;
    this.thursday_hours_to = event.thursday_hours_to;
    this.friday_hours_from = event.friday_hours_from;
    this.friday_hours_to = event.friday_hours_to;
    this.saturday_hours_from = event.saturday_hours_from;
    this.saturday_hours_to = event.saturday_hours_to;
    this.sunday_hours_from = event.sunday_hours_from;
    this.sunday_hours_to = event.sunday_hours_to;
  }

  close() {
    this.apply(new DeliveryAreaClosed());
  }
}
