import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderAddedEvent } from "../domain/events/order.events";

@EventsHandler(OrderAddedEvent)
export class OrderAddedEventHandler implements IEventHandler<OrderAddedEvent> {
  handle(event: OrderAddedEvent) {
    console.log("Async OrderAddedEvent...");
  }
}
