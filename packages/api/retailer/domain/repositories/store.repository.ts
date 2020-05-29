import { Injectable } from "@nestjs/common";
import { EventStore } from "../../../common/domain/event.store";
import { StorageEvent } from "../../../common/domain/storage.event";
import { Event } from "../../../common/domain/event";
import { Store } from "../store";
import { StoreEvents } from "../events/store.events";

@Injectable()
export class StoreRepository extends EventStore {
  protected recreateEventFromStorage(dbEvent: StorageEvent): Event {
    try {
      const event = new StoreEvents[dbEvent.eventType]();
      const eventProps = JSON.parse(dbEvent.eventData);

      Object.keys(eventProps).forEach(
        (key) => ((event as any)[key] = eventProps[key])
      );

      return event;
    } catch (error) {
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<Store> {
    return await this.ctx(new Store(id));
  }
}
