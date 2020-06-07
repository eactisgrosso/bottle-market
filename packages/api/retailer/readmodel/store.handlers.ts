import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StoreOpened, StoreClosed } from "../domain/events/store.events";
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
@EventsHandler(StoreClosed)
export class StoreClosedHandler implements IEventHandler<StoreClosed> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: StoreClosed) {
    const id = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    await this.knex("store").where("id", id).del();
  }
}

export const EventHandlers = [StoreOpenedHandler, StoreClosedHandler];


