import { IEvent } from "@nestjs/cqrs";

export class Event implements IEvent {
  userId: number;
  sequence: number;
}
