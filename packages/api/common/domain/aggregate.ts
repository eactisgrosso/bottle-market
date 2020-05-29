import { AggregateRoot } from "@nestjs/cqrs";
import { Event } from "./event";

export class Aggregate extends AggregateRoot {
  sequence: number = 0;

  constructor(readonly id: string) {
    super();
  }

  apply(event: Event, isFromHistory = false) {
    event.aggregateId = this.id;
    event.timestamp = new Date();
    super.apply(event, isFromHistory);
    if (isFromHistory) this.sequence = event.sequence;
  }
}
