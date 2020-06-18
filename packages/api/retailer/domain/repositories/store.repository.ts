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
      Object.keys(dbEvent.eventData).forEach(
        (key) => ((event as any)[key] = dbEvent.eventData[key])
      );

      return event;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<Store> {
    return await this.ctx(new Store(id));
  }
}
