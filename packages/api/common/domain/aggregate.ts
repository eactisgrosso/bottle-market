import { AggregateRoot } from "@nestjs/cqrs";
import { Event } from "./event";
const { v4: uuidv4 } = require("uuid");

export class Aggregate extends AggregateRoot {
  sequence: number = 0;

  constructor(readonly id: string) {
    super();
  }

  apply(event: Event, isFromHistory = false) {
    event.aggregateId = this.id;
    event.id = uuidv4();
    event.timestamp = new Date();
    super.apply(event, isFromHistory);
    if (isFromHistory) this.sequence = event.sequence;
  }
}
