import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventBus } from "@nestjs/cqrs";
import { Event } from "./event";
import { Aggregate } from "./aggregate";

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
    const dbEvents = await this.knex("events").where("aggregateid", object.id);
    const events = dbEvents.map((event: any) => JSON.parse(event.eventData));

    object.loadFromHistory(events);

    const eventBus = this.eventBus;
    object.publish = async (event: Event) => {
      event.sequence = ++object.sequence;

      await this.knex("events").insert({
        aggregateId: object.id,
        aggregateType: object.constructor.name,
        eventType: event.constructor.name,
        eventData: JSON.stringify(event),
        userId: event.userId,
        sequence: event.sequence,
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      });

      eventBus.publish(event);
    };
    return object;
  }
}
