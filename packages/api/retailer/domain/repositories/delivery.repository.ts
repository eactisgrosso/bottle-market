import { Injectable } from "@nestjs/common";
import { EventStore } from "../../../common/domain/event.store";
import { StorageEvent } from "../../../common/domain/storage.event";
import { Event } from "../../../common/domain/event";
import { Delivery } from "../delivery";
import { DeliveryEvents } from "../events/delivery.events";

@Injectable()
export class DeliveryRepository extends EventStore {
  protected recreateEventFromStorage(dbEvent: StorageEvent): Event {
    try {
      const event = new DeliveryEvents[dbEvent.eventType]();
      const eventProps = JSON.parse(dbEvent.eventData);

      Object.keys(eventProps).forEach(
        (key) => ((event as any)[key] = eventProps[key])
      );

      return event;
    } catch (error) {
      throw new Error("Unable to reconstruct event");
    }
  }

  async load(id: string): Promise<Delivery> {
    return await this.ctx(new Delivery(id));
  }
}
