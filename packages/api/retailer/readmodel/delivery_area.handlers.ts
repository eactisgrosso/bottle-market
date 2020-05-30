import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  DeliveryAreaSetup,
  DeliveryAreaClosed,
} from "../domain/events/delivery_area.events";
import "../../common/helpers/date.extensions";

@Injectable()
@EventsHandler(DeliveryAreaSetup)
export class DeliveryAreaSetupHandler
  implements IEventHandler<DeliveryAreaSetup> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: DeliveryAreaSetup) {
    const id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    const store_id = this.knex.raw("UUID_TO_BIN(?)", event.store_id);
    const point = this.knex.raw("POINT(:lat,:lng)", {
      lat: event.lat,
      lng: event.lng,
    });

    await this.knex("delivery_area").insert({
      id: id,
      name: event.name,
      store_id: store_id,
      address: event.address,
      centroid: point,
      radius: event.radius,
      monday: event.monday,
      monday_hours_from: `${event.monday_hours_from}:00`,
      monday_hours_to: `${event.monday_hours_to}:00`,
      tuesday: event.tuesday,
      tuesday_hours_from: `${event.tuesday_hours_from}:00`,
      tuesday_hours_to: `${event.tuesday_hours_to}:00`,
      wednesday: event.wednesday,
      wednesday_hours_from: `${event.wednesday_hours_from}:00`,
      wednesday_hours_to: `${event.wednesday_hours_to}:00`,
      thursday: event.thursday,
      thursday_hours_from: `${event.thursday_hours_from}:00`,
      thursday_hours_to: `${event.thursday_hours_to}:00`,
      friday: event.friday,
      friday_hours_from: `${event.friday_hours_from}:00`,
      friday_hours_to: `${event.friday_hours_to}:00`,
      saturday: event.saturday,
      saturday_hours_from: `${event.saturday_hours_from}:00`,
      saturday_hours_to: `${event.saturday_hours_to}:00`,
      sunday: event.sunday,
      sunday_hours_from: `${event.sunday_hours_from}:00`,
      sunday_hours_to: `${event.sunday_hours_to}:00`,
      date_added: event.timestamp.toMySQLString(),
    });
  }
}

@Injectable()
@EventsHandler(DeliveryAreaClosed)
export class DeliveryAreaClosedtHandler
  implements IEventHandler<DeliveryAreaClosed> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: DeliveryAreaClosed) {
    const id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);

    await this.knex("delivery_area").where("id", id).del();
  }
}

export const EventHandlers = [
  DeliveryAreaSetupHandler,
  DeliveryAreaClosedtHandler,
];
