import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ProductAvailabilityChanged,
  ProductPriceChanged,
} from '../domain/events/store_product.events';

@Injectable()
@EventsHandler(ProductAvailabilityChanged)
export class ProductAvailabilityChangedHandler
  implements IEventHandler<ProductAvailabilityChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: ProductAvailabilityChanged) {
    await this.knex.raw(
      `? ON CONFLICT (store_id, product_size_id)
            DO UPDATE SET
              quantity = EXCLUDED.quantity,
            RETURNING *;`,
      [
        this.knex('store_product').insert({
          id: event.aggregateId,
          store_id: event.store_id,
          product_size_id: event.product_size_id,
          quantity: event.quantity,
          date_added: event.timestamp,
        }),
      ]
    );
  }
}

@Injectable()
@EventsHandler(ProductPriceChanged)
export class ProductPriceChangedHandler
  implements IEventHandler<ProductPriceChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: ProductPriceChanged) {
    await this.knex.raw(
      `? ON CONFLICT (store_id, product_size_id)
            DO UPDATE SET
              price = EXCLUDED.price,
            RETURNING *;`,
      [
        this.knex('store_product').insert({
          id: event.aggregateId,
          store_id: event.store_id,
          product_size_id: event.product_size_id,
          price: event.price,
          date_added: event.timestamp,
        }),
      ]
    );
  }
}

export const EventHandlers = [
  ProductAvailabilityChangedHandler,
  ProductPriceChangedHandler,
];
