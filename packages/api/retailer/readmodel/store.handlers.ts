import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  StoreOpened,
  ProductAdded,
  ProductQuantitiesChanged,
  StoreClosed,
} from "../domain/events/store.events";
import "../../common/helpers/date.extensions";

@Injectable()
@EventsHandler(StoreOpened)
export class StoreOpenedHandler implements IEventHandler<StoreOpened> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: StoreOpened) {
    const id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    const user_id = this.knex.raw("UUID_TO_BIN(?)", event.userId);

    await this.knex("store").insert({
      id: id,
      user_id: user_id,
      name: event.name,
      store_type: event.store_type,
      street: event.street,
      country_id: event.country_id,
      state_id: event.state_id,
      city_id: event.city_id,
      date_added: event.timestamp.toMySQLString(),
    });
  }
}

@Injectable()
@EventsHandler(ProductAdded)
export class ProductAddedHandler implements IEventHandler<ProductAdded> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: ProductAdded) {
    const store_id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    const product_size_id = this.knex.raw(
      "UUID_TO_BIN(?)",
      event.product_size_id
    );

    await this.knex("store_product").insert({
      store_id: store_id,
      product_size_id: product_size_id,
      price: event.price,
      quantity: 1,
      date_added: event.timestamp.toMySQLString(),
    });
  }
}

@Injectable()
@EventsHandler(ProductQuantitiesChanged)
export class ProductQuantitiesChangedHandler
  implements IEventHandler<ProductQuantitiesChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: ProductQuantitiesChanged) {
    const store_id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    for (let product of event.products) {
      const product_size_id = this.knex.raw("UUID_TO_BIN(?)", product.id);

      if (product.quantity > 0)
        await this.knex("store_product")
          .where({ store_id: store_id, product_size_id: product_size_id })
          .update({
            quantity: product.quantity,
          });
      else
        await this.knex("store_product")
          .where({ store_id: store_id, product_size_id: product_size_id })
          .del();
    }
  }
}

@Injectable()
@EventsHandler(StoreClosed)
class StoreClosedHandler implements IEventHandler<StoreClosed> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: StoreClosed) {
    const id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    await this.knex("store").where("id", id).del();
  }
}

export const EventHandlers = [
  StoreOpenedHandler,
  ProductAddedHandler,
  ProductQuantitiesChangedHandler,
  StoreClosedHandler,
];
