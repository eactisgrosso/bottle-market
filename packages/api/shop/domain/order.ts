import { Aggregate } from "../../common/aggregate";
import { OrderAddedEvent } from "../events/order/order-added.event";

export class Order extends Aggregate {
  constructor(readonly id: string) {
    super(id);
  }

  add(orderInput: string) {
    // logic
    this.apply(new OrderAddedEvent(this.id, orderInput));
  }
}
