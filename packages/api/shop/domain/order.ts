import { Aggregate } from "../../common/domain/aggregate";
import { OrderAddedEvent } from "./events/order.events";

export class Order extends Aggregate {
  constructor(readonly id: string) {
    super(id);
  }

  add(orderInput: string) {
    // logic
    this.apply(new OrderAddedEvent(this.id, orderInput));
  }
}
