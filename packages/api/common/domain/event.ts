import { IEvent } from "@nestjs/cqrs";

export class Event implements IEvent {
  aggregateId: string;
  sequence: number;
  userId: number;
  timestamp: Date;
}
