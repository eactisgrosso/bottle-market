import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  StoreOpened,
  ProductAdded,
  ProductQuantitiesChanged,
  StoreClosed,
} from "../domain/events/store.events";

@Injectable()
@EventsHandler(StoreOpened)
export class StoreOpenedHandler implements IEventHandler<StoreOpened> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: StoreOpened) {
    await this.knex("store").insert({
      id: event.aggregateId,
      user_id: event.userId,
      name: event.name,
      store_type: event.store_type,
      street: event.street,
      country_id: event.country_id,
      state_id: event.state_id,
      city_id: event.city_id,
      date_added: event.timestamp,
    });
  }
}

@Injectable()
@EventsHandler(ProductAdded)
export class ProductAddedHandler implements IEventHandler<ProductAdded> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: ProductAdded) {
    await this.knex("store_product").insert({
      store_id: event.aggregateId,
      product_size_id: event.product_size_id,
      price: event.price,
      quantity: 1,
      date_added: event.timestamp,
    });
  }
}

@Injectable()
@EventsHandler(ProductQuantitiesChanged)
export class ProductQuantitiesChangedHandler
  implements IEventHandler<ProductQuantitiesChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: ProductQuantitiesChanged) {
    for (let product of event.products) {
      if (product.quantity > 0)
        await this.knex("store_product")
          .where({
            store_id: event.aggregateId,
            product_size_id: product.id,
          })
          .update({
            quantity: product.quantity,
          });
      else
        await this.knex("store_product")
          .where({ store_id: event.aggregateId, product_size_id: product.id })
          .del();
    }
  }
}

@Injectable()
@EventsHandler(StoreClosed)
class StoreClosedHandler implements IEventHandler<StoreClosed> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: StoreClosed) {
    await this.knex("store").where("id", event.aggregateId).del();
  }
}

export const EventHandlers = [
  StoreOpenedHandler,
  ProductAddedHandler,
  ProductQuantitiesChangedHandler,
  StoreClosedHandler,
];
