import { Injectable } from "@nestjs/common";
import { EventStore } from "../event.store";
import { StorageEvent } from "../storage.event";
import { Event } from "../event";
import { User } from "./user";
import { UserEvents } from "./user.events";

@Injectable()
export class UserRepository extends EventStore {
  protected recreateEventFromStorage(dbEvent: StorageEvent): Event {
    try {
      const event = new UserEvents[dbEvent.eventType]();
      Object.keys(dbEvent.eventData).forEach(
        (key) => ((event as any)[key] = dbEvent.eventData[key])
      );

      return event;
    } catch (error) {
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<User> {
    return await this.ctx(new User(id));
  }
}
