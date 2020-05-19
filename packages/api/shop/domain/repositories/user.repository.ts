import { Injectable } from "@nestjs/common";
import { EventStore } from "../../../common/domain/event.store";
import { StorageEvent } from "../../../common/domain/storage.event";
import { Event } from "../../../common/domain/event";
import { User } from "../user";
import { UserEvents } from "../events/user.events";

@Injectable()
export class UserRepository extends EventStore {
  protected recreateEventFromStorage(dbEvent: StorageEvent): Event {
    try {
      const event = new UserEvents[dbEvent.eventType]();
      const eventProps = JSON.parse(dbEvent.eventData);

      Object.keys(eventProps).forEach(
        (key) => ((event as any)[key] = eventProps[key])
      );

      return event;
    } catch (error) {
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<User> {
    return await this.context(new User(id));
  }
}
