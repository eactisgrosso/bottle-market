import { IEvent } from "@nestjs/cqrs";

export class Event implements IEvent {
  aggregateId: string;
  userId: number;
  sequence: number;
}
