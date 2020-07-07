import { Injectable } from "@nestjs/common";
import { EventStore } from "../../../common/domain/event.store";
import { StorageEvent } from "../../../common/domain/storage.event";
import { Event } from "../../../common/domain/event";
import { StoreProduct } from "../store_product";
import { StoreProductEvents } from "../events/store_product.events";

@Injectable()
export class StoreProductRepository extends EventStore {
  protected recreateEventFromStorage(dbEvent: StorageEvent): Event {
    try {
      const event = new StoreProductEvents[dbEvent.eventType]();
      Object.keys(dbEvent.eventData).forEach(
        (key) => ((event as any)[key] = dbEvent.eventData[key])
      );

      if (event.isLegacy) return event.upcast();

      return event;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<StoreProduct> {
    return await this.ctx(new StoreProduct(id));
  }
}
