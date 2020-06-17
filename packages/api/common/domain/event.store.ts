import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { CONTEXT } from "@nestjs/graphql";
import { EventBus } from "@nestjs/cqrs";
import { Event } from "./event";
import { StorageEvent } from "./storage.event";
import { Aggregate } from "./aggregate";
import { decode } from "jsonwebtoken";

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
    if (user) {
      const info = user["https://app.bottlemarket.com.ar/userinfo"];
      if (info) this.user_id = info.bottleId;
    }
  }

  protected abstract recreateEventFromStorage(event: StorageEvent): Event;

  async ctx<T extends Aggregate>(object: T): Promise<T> {
    const dbEvents = await this.knex("events").where("aggregateId", object.id);
    const events = dbEvents.map((event: StorageEvent) =>
      this.recreateEventFromStorage(event)
    );

    object.loadFromHistory(events);

    const eventBus = this.eventBus;
    object.publish = async (event: Event) => {
      event.sequence = ++object.sequence;
      event.userId = this.user_id;

      await this.knex("events").insert({
        aggregateId: object.id,
        aggregateType: object.constructor.name,
        eventType: event.constructor.name,
        eventData: JSON.stringify(event),
        userId: this.user_id,
        sequence: event.sequence,
        timestamp: event.timestamp,
      });

      eventBus.publish(event);
    };
    return object;
  }
}
