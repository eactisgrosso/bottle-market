import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventBus } from "@nestjs/cqrs";
import { Event } from "./event";
import { Aggregate } from "./aggregate";
import "../helpers/date.extensions";

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class EventStore {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(KNEX_CONNECTION) private readonly knex: any
  ) {}

  async context<T extends Aggregate>(object: T): Promise<T> {
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", object.id);

    const dbEvents = await this.knex("events").where(
      "aggregateid",
      aggregateId
    );
    const events = dbEvents.map((event: any) => JSON.parse(event.eventData));

    object.loadFromHistory(events);

    const eventBus = this.eventBus;
    object.publish = async (event: Event) => {
      event.sequence = ++object.sequence;

      await this.knex("events").insert({
        aggregateId: aggregateId,
        aggregateType: object.constructor.name,
        eventType: event.constructor.name,
        eventData: JSON.stringify(event),
        userId: event.userId,
        sequence: event.sequence,
        timestamp: new Date().toMySQLString(),
      });

      eventBus.publish(event);
    };
    return object;
  }
}
