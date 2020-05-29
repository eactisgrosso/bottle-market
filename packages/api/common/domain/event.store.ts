import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { CONTEXT } from "@nestjs/graphql";
import { EventBus } from "@nestjs/cqrs";
import { Event } from "./event";
import { StorageEvent } from "./storage.event";
import { Aggregate } from "./aggregate";
import { decode } from "jsonwebtoken";
import "../helpers/date.extensions";

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export abstract class EventStore {
  private readonly user_id;
  constructor(
    private readonly eventBus: EventBus,
    @Inject(CONTEXT) private context,
    @Inject(KNEX_CONNECTION) private readonly knex: any
  ) {
    const user = decode(
      context.req.headers.authorization.replace("Bearer ", "")
    );
    if (user)
      this.user_id = user["https://app.bottlemarket.com.ar/userinfo"].bottleId;
  }

  protected abstract recreateEventFromStorage(event: StorageEvent): Event;

  async ctx<T extends Aggregate>(object: T): Promise<T> {
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", object.id);
    const userId = this.knex.raw("UUID_TO_BIN(?)", this.user_id);

    const dbEvents = await this.knex("events").where(
      "aggregateid",
      aggregateId
    );
    const events = dbEvents.map((event: StorageEvent) =>
      this.recreateEventFromStorage(event)
    );

    object.loadFromHistory(events);

    const eventBus = this.eventBus;
    object.publish = async (event: Event) => {
      event.sequence = ++object.sequence;
      event.userId = this.user_id;

      await this.knex("events").insert({
        aggregateId: aggregateId,
        aggregateType: object.constructor.name,
        eventType: event.constructor.name,
        eventData: JSON.stringify(event),
        userId: userId,
        sequence: event.sequence,
        timestamp: new Date().toMySQLString(),
      });

      eventBus.publish(event);
    };
    return object;
  }
}
