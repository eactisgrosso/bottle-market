import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderAdded } from "../domain/events/order.events";

@EventsHandler(OrderAdded)
export class OrderAddedEventHandler implements IEventHandler<OrderAdded> {
  handle(event: OrderAdded) {}
}
