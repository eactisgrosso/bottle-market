import { IEvent } from "@nestjs/cqrs";

export class Event implements IEvent {
  aggregateId: string;
  id: string;
  sequence: number;
  userId: number;
  timestamp: Date;
}

export interface ILegacyEvent<T extends Event> {
  isLegacy: boolean;
  upcast(): T;
}
