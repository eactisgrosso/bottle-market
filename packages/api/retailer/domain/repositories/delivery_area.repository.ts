import { Injectable } from "@nestjs/common";
import { EventStore } from "../../../common/domain/event.store";
import { StorageEvent } from "../../../common/domain/storage.event";
import { Event } from "../../../common/domain/event";
import { DeliveryArea } from "../delivery_area";
import { DeliveryEvents } from "../events/delivery_area.events";

@Injectable()
export class DeliveryAreaRepository extends EventStore {
  protected recreateEventFromStorage(dbEvent: StorageEvent): Event {
    try {
      const event = new DeliveryEvents[dbEvent.eventType]();
      Object.keys(dbEvent.eventData).forEach(
        (key) => ((event as any)[key] = dbEvent.eventData[key])
      );

      return event;
    } catch (error) {
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<DeliveryArea> {
    return await this.ctx(new DeliveryArea(id));
  }
}
