import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  DeliveryAreaSetup,
  DeliveryAreaClosed,
  DeliveryAreaChanged,
} from '../domain/events/delivery_area.events';
const knexPostgis = require('knex-postgis');

@Injectable()
@EventsHandler(DeliveryAreaSetup)
export class DeliveryAreaSetupHandler
  implements IEventHandler<DeliveryAreaSetup> {
  private readonly st;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {
    this.st = knexPostgis(knex);
  }

  async handle(event: DeliveryAreaSetup) {
    await this.knex('delivery_area').insert({
      id: event.aggregateId,
      name: event.name,
      store_id: event.store_id,
      address: event.address,
      geom: this.st.geomFromText(`Point(${event.lng} ${event.lat})`, 4326),
      radius: event.radius,
      monday: event.monday,
      monday_hours_from: event.monday_hours_from,
      monday_hours_to: event.monday_hours_to,
      tuesday: event.tuesday,
      tuesday_hours_from: event.tuesday_hours_from,
      tuesday_hours_to: event.tuesday_hours_to,
      wednesday: event.wednesday,
      wednesday_hours_from: event.wednesday_hours_from,
      wednesday_hours_to: event.wednesday_hours_to,
      thursday: event.thursday,
      thursday_hours_from: event.thursday_hours_from,
      thursday_hours_to: event.thursday_hours_to,
      friday: event.friday,
      friday_hours_from: event.friday_hours_from,
      friday_hours_to: event.friday_hours_to,
      saturday: event.saturday,
      saturday_hours_from: event.saturday_hours_from,
      saturday_hours_to: event.saturday_hours_to,
      sunday: event.sunday,
      sunday_hours_from: event.sunday_hours_from,
      sunday_hours_to: event.sunday_hours_to,
      date_added: event.timestamp,
    });
  }
}

@Injectable()
@EventsHandler(DeliveryAreaClosed)
export class DeliveryAreaClosedtHandler
  implements IEventHandler<DeliveryAreaClosed> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: DeliveryAreaClosed) {
    await this.knex('delivery_area').where('id', event.aggregateId).del();
  }
}

@Injectable()
@EventsHandler(DeliveryAreaChanged)
export class DeliveryAreaChangedHandler
  implements IEventHandler<DeliveryAreaChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}
  async handle(event: DeliveryAreaChanged) {
    await this.knex('delivery_area')
      .where({ id: event.aggregateId })
      .update({
        id: event.aggregateId,
        name: event.name,
        store_id: event.store_id,
        address: event.address,
        geom: this.st.geomFromText(`Point(${event.lng} ${event.lat})`, 4326),
        radius: event.radius,
        monday: event.monday,
        monday_hours_from: event.monday_hours_from,
        monday_hours_to: event.monday_hours_to,
        tuesday: event.tuesday,
        tuesday_hours_from: event.tuesday_hours_from,
        tuesday_hours_to: event.tuesday_hours_to,
        wednesday: event.wednesday,
        wednesday_hours_from: event.wednesday_hours_from,
        wednesday_hours_to: event.wednesday_hours_to,
        thursday: event.thursday,
        thursday_hours_from: event.thursday_hours_from,
        thursday_hours_to: event.thursday_hours_to,
        friday: event.friday,
        friday_hours_from: event.friday_hours_from,
        friday_hours_to: event.friday_hours_to,
        saturday: event.saturday,
        saturday_hours_from: event.saturday_hours_from,
        saturday_hours_to: event.saturday_hours_to,
        sunday: event.sunday,
        sunday_hours_from: event.sunday_hours_from,
        sunday_hours_to: event.sunday_hours_to,
        date_added: event.timestamp,
      });
  }
}
export const EventHandlers = [
  DeliveryAreaSetupHandler,
  DeliveryAreaClosedtHandler,
];
