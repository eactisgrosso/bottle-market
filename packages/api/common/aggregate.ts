import { AggregateRoot } from "@nestjs/cqrs";
import { Event } from "./event";

export class Aggregate extends AggregateRoot {
  sequence: number = 1;

  constructor(readonly id: string) {
    super();
  }

  apply(event: Event, isFromHistory = false) {
    super.apply(event, isFromHistory);
    if (isFromHistory) this.sequence = event.sequence;
  }
}
