import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderAddedEvent } from "../../events/order/order-added.event";

@EventsHandler(OrderAddedEvent)
export class OrderAddedEventHandler implements IEventHandler<OrderAddedEvent> {
  handle(event: OrderAddedEvent) {
    console.log("Async OrderAddedEvent...");
  }
}
